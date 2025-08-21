import { useState, useEffect, useMemo } from "react";
import type { Item, PerformanceState, BreakState, PerformanceItem } from "~/counter";
import { useWebSocket } from "./use-websocket";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { Spinner } from "~/components/spinner";
import optimisticAction from "~/lib/optimistic";
import { Toaster } from 'sonner';
import { Progress } from "./ui/progress";

const dedupe = (arr: string[]) => Array.from(new Set(arr));

// Small presentational countdown that doesn't schedule timers.
const CountdownDisplay: React.FC<{ timerStart: number; durationSeconds: number; now: number }> = ({ timerStart, durationSeconds, now }) => {
  const endAt = timerStart + durationSeconds * 1000;
  const remaining = Math.max(0, Math.round((endAt - now) / 1000));
  const mins = Math.floor(remaining / 60).toString().padStart(1, '0');
  const secs = (remaining % 60).toString().padStart(2, '0');
  return <div className="text-xs text-right mt-1"><span className="text-xs font-mono">{`${mins}:${secs}`}</span></div>;
};

// New helper to format durations and a small presentational component for performance metadata
const formatDuration = (d?: number | string) => {
  if (d == null) return undefined;
  if (typeof d === 'number') {
    const m = Math.floor(d / 60);
    const s = d % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  }
  return String(d);
};

const PerformanceMeta: React.FC<{ p: PerformanceItem }> = ({ p }) => {
  const duration = formatDuration((p as unknown as { durationSeconds?: number }).durationSeconds ?? (p.duration as unknown as number) ?? p.duration);
  // Exclude description from metadata presence check per request
  const hasMeta = Boolean(p.style || p.teamSize || p.choreographers || duration);
  if (!hasMeta) return null;

  return (
    // added min-w-0 so this can shrink inside flex containers and avoid overflow
    <div className="mt-4 min-w-0">
      {/* description removed as requested */}
      {/* Use a consistent table-like layout for metadata */}
      <div className="grid gap-2 overflow-hidden max-w-full">
        {p.style ? (
          <div className="flex">
            <span className="w-32 flex-shrink-0 text-xs font-medium">Style:</span>
            <span className="text-xs text-muted-foreground">{p.style}</span>
          </div>
        ) : null}
        {typeof p.teamSize === 'number' ? (
          <div className="flex">
            <span className="w-32 flex-shrink-0 text-xs font-medium">Team Size:</span>
            <span className="text-xs text-muted-foreground">{p.teamSize}</span>
          </div>
        ) : null}
        {p.choreographers ? (
          <div className="flex">
            <span className="w-32 flex-shrink-0 text-xs font-medium">Choreographers:</span>
            <span className="text-xs text-muted-foreground">{p.choreographers}</span>
          </div>
        ) : null}
        {duration ? (
          <div className="flex">
            <span className="w-32 flex-shrink-0 text-xs font-medium">Duration:</span>
            <span className="text-xs text-muted-foreground">{duration}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

interface ItemProps {
  item: Item;
  onUpdateState: (itemId: string, newState: PerformanceState | BreakState) => void;
  onStartTimer: (itemId: string) => void;
  now?: number;
  role?: "registration" | "backstage" | null;
}

const SortableItemCard = ({ item, onUpdateState, onStartTimer, now, role }: ItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.itemId });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  return (
    <div ref={setNodeRef} style={style} className="w-full">
      {/* added overflow-hidden & min-h-0 to prevent internal content from overflowing the card */}
      <Card className={`relative w-full pt-8 overflow-hidden min-h-0 shadow-md ${item.type === 'BREAK' ? 'bg-yellow-50 dark:bg-yellow-900/30' : ''}`}> {/* top padding to accommodate handle */}
        {/* State indicator on the left side */}
        <div className="absolute left-0 top-0 bottom-0 h-full">
          {/* Vertical color bar with centered text */}
          <div className={`w-10 h-full ${getStateBgColor(item.state)} flex items-center justify-center overflow-visible`}>
            {item.state !== 'NONE' && (
              <span 
                className="absolute text-[12px] font-bold text-white uppercase tracking-wider select-none"
                style={{ 
                  writingMode: 'vertical-rl', 
                  transform: 'rotate(180deg)',
                  textOrientation: 'mixed'
                }}
              >
                {item.state === 'PERFORMING' ? 'On Stage' : 
                 item.state === 'CHECKED IN' ? 'Checked In' : 
                 item.state === 'IN PROGRESS' ? 'In Progress' : 
                 item.state}
              </span>
            )}
          </div>
        </div>

        {/* absolutely positioned handle slightly inside the top-center */}
        {role !== 'registration' && (
          <div className="absolute left-1/2 top-3 -translate-x-1/2">
            <div className="flex items-center justify-center cursor-grab" {...attributes} {...listeners} aria-hidden>
              <Icon icon="teenyicons:drag-horizontal-outline" className="w-5 h-5" />
            </div>
          </div>
        )}
        <CardHeader className="px-8 pb-0 ml-10"> {/* Increased ml-10 to give more space for the wider vertical bar */}
          <CardTitle className="flex items-center w-full mb-2">
            <div className="flex items-center gap-3 min-w-0">
              <span className="truncate mr-4 pr-6 text-lg">{item.name}</span>
              {item.type === 'BREAK' && (
                <span className="text-xs font-medium px-2 py-1 rounded bg-yellow-200 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-100">BREAK</span>
              )}
            </div>
            {/* Removed the ItemStateBadge from here */}
          </CardTitle>
          <CardDescription className="px-8 pt-2 mb-1"> {/* Increased ml-10 to match header */}
            <div className="flex items-center justify-between w-full">
              {/* make left side a shrinkable flex container with overflow handling */}
              <div className="text-sm text-muted-foreground pr-4 flex-1 min-w-0 overflow-hidden break-words">
                <div className="flex">
                  <span className="w-32 flex-shrink-0 text-xs font-medium">Timer:</span>
                  <span className="text-xs text-muted-foreground">
                    {item.timer_start_time 
                      ? (item.timer_end_time 
                          ? `Ended at ${new Date(item.timer_end_time).toLocaleTimeString()}` 
                          : `Running since ${new Date(item.timer_start_time).toLocaleTimeString()}`)
                      : (item.state === 'DONE' ? 'Completed without timing' : 'Not started')}
                  </span>
                </div>

                {/* Show performance metadata (description, style, teamSize, choreographers, duration) */}
                {item.type === 'PERFORMANCE' && (() => {
                  const p = item as PerformanceItem;
                  return <PerformanceMeta p={p} />;
                })()}
              </div>
              
              {/* right side kept non-shrinking so the countdown never collapses into the left content */}
              {item.type === 'PERFORMANCE' && item.timer_start_time && (item as PerformanceItem).durationSeconds && !(item as PerformanceItem).timer_end_time ? (
                (() => {
                  const p = item as PerformanceItem;
                  const nowMs = now ?? Date.now();
                  // Safe access since we already checked timer_start_time is defined in the condition above
                  const elapsedMs = Math.max(0, nowMs - (p.timer_start_time || 0));
                  const elapsedSec = Math.floor(elapsedMs / 1000);
                  const durationSec = p.durationSeconds || 1;
                  const pct = Math.min(100, Math.round((elapsedSec / durationSec) * 100));
                  return (
                    <div className="text-sm text-muted-foreground flex-shrink-0 ml-4 w-40">
                      <div className="mt-2">
                        {/* turn progress bar red when >= 80% elapsed (last 20%) */}
                        <Progress
                          value={pct}
                          className={
                            // default: keep height; when pct >= 80, target inner bar and set red
                            pct >= 80
                              ? 'h-2 [&>div]:bg-red-600 dark:[&>div]:bg-red-400'
                              : 'h-2'
                          }
                        />
                        <CountdownDisplay 
                          timerStart={item.timer_start_time} 
                          durationSeconds={durationSec} 
                          now={nowMs} 
                        />
                       </div>
                     </div>
                  );
                })()
              ) : null}
            </div>
          </CardDescription>
        </CardHeader>
        <div className="px-8 pb-6 pt-4 ml-10"> {/* Increased ml-10 to match other sections */}
          <div className="flex flex-row flex-wrap gap-3">
            {item.type === 'PERFORMANCE' ? (
              <>
                <Button
                  variant="secondary"
                  onClick={() => onUpdateState(item.itemId, item.state === 'CHECKED IN' ? 'NONE' : 'CHECKED IN')}
                  title="Mark Team as Checked In"
                  aria-label="Mark Team as Checked In"
                  className="w-12 h-12 p-0 flex items-center justify-center md:w-auto md:h-auto md:px-3 md:py-2"
                >
                  <Icon icon="mdi:account-check" />
                  <span className="hidden md:inline ml-2 text-sm">Check In</span>
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => onUpdateState(item.itemId, 'BACKSTAGE')}
                  title="Backstage"
                  aria-label="Backstage"
                  className="w-12 h-12 p-0 flex items-center justify-center md:w-auto md:h-auto md:px-3 md:py-2"
                >
                  <Icon icon="mdi:door" />
                  <span className="hidden md:inline ml-2 text-sm">Backstage</span>
                </Button>

                {/* Show all buttons if role is 'backstage', otherwise restrict for 'registration' */}
                {(role === 'backstage' || !role) && <>
                  <Button
                    variant="secondary"
                    onClick={() => onStartTimer(item.itemId)}
                    title="Start Timer / Performing"
                    aria-label="Start Timer"
                    className="w-12 h-12 p-0 flex items-center justify-center md:w-auto md:h-auto md:px-3 md:py-2"
                  >
                    <Icon icon="mdi:play" className="w-5 h-5 text-emerald-600 dark:text-emerald-300" aria-hidden />
                    <span className="hidden md:inline ml-2 text-sm">Start</span>
                  </Button>

                  <Button
                    variant="secondary"
                    onClick={() => onUpdateState(item.itemId, 'DONE')}
                    title="Mark as Done"
                    aria-label="Mark as Done"
                    className="w-12 h-12 p-0 flex items-center justify-center md:w-auto md:h-auto md:px-3 md:py-2"
                  >
                    <Icon icon="mdi:done" />
                    <span className="hidden md:inline ml-2 text-sm">Done</span>
                  </Button>

                  <Button
                    variant="outline"
                    title="Load item on screen"
                    aria-label="Load item on screen"
                    className="w-12 h-12 p-0 flex items-center justify-center md:w-auto md:h-auto md:px-3 md:py-2"
                    onClick={() => onUpdateState(item.itemId, 'READY TO GO')}
                  >
                    <Icon icon="gg:screen" />
                    <span className="hidden md:inline ml-2 text-sm">Load</span>
                  </Button>
                </>}
              </>
            ) : (
              // BREAK item: only show NONE | IN PROGRESS | DONE related buttons
              <>
                <Button
                  variant="secondary"
                  onClick={() => onUpdateState(item.itemId, 'IN PROGRESS')}
                  title="Start Break"
                  aria-label="Start Break"
                  className="w-12 h-12 p-0 flex items-center justify-center md:w-auto md:h-auto md:px-3 md:py-2"
                >
                  <Icon icon="mdi:timer" />
                  <span className="hidden md:inline ml-2 text-sm">Start Break</span>
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => onUpdateState(item.itemId, 'DONE')}
                  title="Done"
                  aria-label="Done"
                  className="w-12 h-12 p-0 flex items-center justify-center md:w-auto md:h-auto md:px-3 md:py-2"
                >
                  <Icon icon="mdi:done" />
                  <span className="hidden md:inline ml-2 text-sm">Done</span>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => onUpdateState(item.itemId, 'NONE')}
                  title="Reset"
                  aria-label="Reset"
                  className="w-12 h-12 p-0 flex items-center justify-center md:w-auto md:h-auto md:px-3 md:py-2"
                >
                  <Icon icon="mdi:reload" />
                  <span className="hidden md:inline ml-2 text-sm">Reset</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

// Shared state styles for consistent color scheme
const stateStyles = {
  NONE: { text: 'text-muted-foreground', bg: 'bg-transparent', barColor: 'bg-gray-200 dark:bg-gray-700', icon: '', label: '' },
  'CHECKED IN': { text: 'text-sky-700 dark:text-sky-200', bg: 'bg-sky-100 dark:bg-sky-900/30', barColor: 'bg-sky-500 dark:bg-sky-600', icon: 'mdi:account-check', label: 'CHECKED IN' },
  BACKSTAGE: { text: 'text-violet-700 dark:text-violet-200', bg: 'bg-violet-100 dark:bg-violet-900/30', barColor: 'bg-violet-500 dark:bg-violet-600', icon: 'mdi:door', label: 'BACKSTAGE' },
  PERFORMING: { text: 'text-emerald-700 dark:text-emerald-200', bg: 'bg-emerald-100 dark:bg-emerald-900/30', barColor: 'bg-emerald-500 dark:bg-emerald-600', icon: 'mdi:human-female-dance', label: 'PERFORMING (ON STAGE)' },
  // New state for pre-loading an item onto the main timer/screen
  'READY TO GO': { text: 'text-amber-700 dark:text-amber-200', bg: 'bg-amber-100 dark:bg-amber-900/30', barColor: 'bg-amber-500 dark:bg-amber-600', icon: 'mdi:bullseye', label: 'READY TO GO' },
  DONE: { text: 'text-emerald-800 dark:text-emerald-300', bg: 'bg-emerald-100 dark:bg-emerald-900/40', barColor: 'bg-emerald-600 dark:bg-emerald-700', icon: 'mdi:check-circle', label: 'DONE' },
  'IN PROGRESS': { text: 'text-amber-800 dark:text-amber-200', bg: 'bg-amber-100 dark:bg-amber-900/30', barColor: 'bg-amber-500 dark:bg-amber-600', icon: 'mdi:clock-start', label: 'IN PROGRESS' },
};

// Helper function to get the state bar color
const getStateBgColor = (state: Item['state']) => {
  return (stateStyles[state as keyof typeof stateStyles] || stateStyles.NONE).barColor;
};

// Kept for reference but no longer used since we display state in the vertical bar
// biome-ignore lint: This component is no longer used but kept for reference
const ItemStateBadge: React.FC<{ state: Item['state'] }> = ({ state }) => {
  // define a concrete type so style can't be undefined
  type Style = { text: string; bg: string; barColor: string; icon?: string; label?: string };

  // Explicitly type style and provide a guaranteed fallback
  const styleRaw = (stateStyles as Record<string, Style>)[state as string];
  const style = (styleRaw || stateStyles.NONE) as Style;
  const displayLabel = style.label ?? (state === 'NONE' ? '' : state);

  // compact pill with icon or spinner
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md font-medium ${style.text} ${style.bg} shadow-sm`}>
      {state === 'PERFORMING' ? (
        <Spinner className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />
      ) : (
        style.icon ? <Icon icon={style.icon} className="w-4 h-4" aria-hidden /> : null
      )}
      <span className="text-xs leading-none">{displayLabel}</span>
    </span>
  );
};

export const EventDashboard: React.FC<{ role: "registration" | "backstage" | null }> = ({ role }) => {
  const workerUrl = '/api/durable'; // Or your deployed worker URL
  const eventState = useWebSocket(workerUrl);

  // single global tick for countdown displays (avoids per-item timers)
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // normalize eventState.items to an array (memoized)
  const items = useMemo(() => {
    if (!eventState) return [] as Item[];
    const maybe = (eventState as unknown) as { items?: unknown };
    const raw = maybe.items;
    if (!raw) return [] as Item[];
    if (Array.isArray(raw)) return raw as Item[];
    return Object.values(raw as Record<string, Item>);
  }, [eventState]);

  // local copy of items for optimistic updates
  const [localItems, setLocalItems] = useState<Item[]>(items);
  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  // Ensure hooks are called unconditionally to keep hook order stable
  const pointerSensor = useSensor(PointerSensor);
  const sensors = useSensors(pointerSensor);

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [jsonState, setJsonState] = useState<any>(null);
  useEffect(() => {
    fetch('/api/durable/state')
      .then(res => res.json())
      .then(setJsonState)
      .catch(() => setJsonState({ error: 'Failed to load state' }));
  }, []);

  // Move itemOrder state here so it's always declared on every render
  const [itemOrder, setItemOrder] = useState<string[]>(() => dedupe(items.map(i => i.itemId)));

  // Ensure this effect is always registered (hooks must be called in the same order)
  useEffect(() => {
    if (eventState) setItemOrder(dedupe(items.map(i => i.itemId)));
  }, [eventState, items]);

  const updateItem = async (itemId: string, partialUpdate: Partial<Item>) => {
    return await fetch('/api/durable/updateItem', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemId, ...partialUpdate }),
    });
  };

  const handleUpdateState = async (itemId: string, newState: PerformanceState | BreakState) => {
    const now = Date.now();
    
    // Check if we're setting state to DONE
    const isDone = newState === 'DONE';
    
    // optimistic UI update with centralized helper
    await optimisticAction(
      () => {
        const previous = localItems;
        setLocalItems(prev => prev.map(it => {
          if (it.itemId === itemId) {
            const updates: Partial<Item> = { state: newState };
            
            // For optimistic UI updates
            if (isDone && it.timer_start_time) {
              // Only set end time if timer was previously started
              updates.timer_end_time = now;
            }
            
            return { ...it, ...updates } as Item;
          }
          return it;
        }));
        return () => setLocalItems(previous);
      },
      () => {
        // When state is DONE, handle timer values appropriately
        const updates: Partial<Item> = { state: newState };
        
        if (isDone) {
          const item = localItems.find(it => it.itemId === itemId);
          // Only set end time if timer was previously started
          if (item?.timer_start_time) {
            updates.timer_end_time = now;
          }
        }
        
        return updateItem(itemId, updates);
      },
      'Failed to update state'
    );
    
    // Force UI update to reflect the change
    if (isDone) {
      setNow(Date.now());
    }
  };

  const handleStartTimer = async (itemId: string) => {
    // Force immediate UI refresh
    setNow(Date.now());
    
    // Get fresh timestamp
    const now = Date.now();
    
    // Single API call approach: clear timers and set new values in one operation
    await optimisticAction(
      () => {
        const previous = localItems;
        // For UI optimistic update, first show the reset state
        setLocalItems(prev => prev.map(it => {
          if (it.itemId === itemId) {
            return {
              ...it,
              timer_start_time: now,    // Set fresh timestamp
              timer_end_time: null,     // Explicitly clear end time
              state: 'PERFORMING'       // Always set to PERFORMING
            } as Item;
          }
          return it;
        }));
        return () => setLocalItems(previous);
      },
      // For server update, send all fields in one request
      () => updateItem(itemId, { 
        timer_start_time: now,
        timer_end_time: null,  // Explicitly set end time to null to ensure it's cleared on server
        state: 'PERFORMING' 
      } as Partial<Item>),
      'Failed to start timer'
    );
    
    // Force another UI update after completion
    setNow(Date.now());
  };

  if (!eventState) {
    return <div className="flex items-center justify-center min-h-40 text-muted-foreground">Loading dashboard...</div>;
  }

  // typed DragEndEvent instead of any
  const handleDragEndOptimistic = async (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIndex = itemOrder.indexOf(active.id as string);
    const newIndex = itemOrder.indexOf(over.id as string);
    if (oldIndex === -1 || newIndex === -1) return;

    const previous = [...itemOrder];
    const newOrder = arrayMove(previous, oldIndex, newIndex);

    // optimistic update using helper
    await optimisticAction(
      () => {
        setItemOrder(dedupe(newOrder));
        return () => setItemOrder(previous);
      },
      () => fetch('/api/durable/reorderItems', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ itemOrder: newOrder }) }),
      'Failed to reorder items'
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Toaster />
      <h1 className="text-3xl font-bold mb-6">{(eventState as unknown as { name?: string })?.name}</h1>
      {role === 'registration' ? (
        <div className="flex flex-col gap-6">
          {itemOrder.map(id => {
            const item = localItems.find(i => i.itemId === id);
            if (!item) return null;
            return (
              <SortableItemCard
                key={item.itemId}
                item={item}
                now={now}
                onUpdateState={handleUpdateState}
                onStartTimer={handleStartTimer}
                role={role}
              />
            );
          })}
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndOptimistic}>
          <SortableContext items={itemOrder} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-6">
              {itemOrder.map(id => {
                const item = localItems.find(i => i.itemId === id);
                if (!item) return null;
                return (
                  <SortableItemCard
                    key={item.itemId}
                    item={item}
                    now={now}
                    onUpdateState={handleUpdateState}
                    onStartTimer={handleStartTimer}
                    role={role}
                  />
                );
              })}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};