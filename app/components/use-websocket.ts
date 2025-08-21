import { useEffect, useState } from "react";
import type { EventState, Item } from "~/counter";

export const useWebSocket = (workerPath: string) => {
  const [eventState, setEventState] = useState<EventState | null>(null);

  useEffect(() => {
    // ensure this runs only in the browser
    if (typeof window === 'undefined') return;

    // choose ws or wss based on the page protocol
    const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host;
    const path = workerPath.startsWith('/') ? workerPath : `/${workerPath}`;
    const wsUrl = `${wsProtocol}//${host}${path}`;

    const ws = new WebSocket(wsUrl);

    ws.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        if (typeof parsed !== 'object' || parsed === null) return;
        const msg = parsed as Record<string, unknown>;

        if (msg.type === 'initial_state' && msg.state && typeof msg.state === 'object') {
          setEventState(msg.state as EventState);
          return;
        }

        if (msg.type === 'item_updated' && msg.item && typeof msg.item === 'object') {
          const itemObj = msg.item as Record<string, unknown>;
          if (typeof itemObj.itemId === 'string') {
            const item = (itemObj as unknown) as Item;
            setEventState(prev => {
              if (!prev) return prev;
              const itemsArr: Item[] = Array.isArray(prev.items) ? prev.items.slice() : Object.values(prev.items as Record<string, Item>);
              const idx = itemsArr.findIndex(it => it.itemId === item.itemId);
              if (idx >= 0) itemsArr[idx] = item;
              else itemsArr.push(item);
              return { ...prev, items: itemsArr };
            });
          }
          return;
        }

        if (msg.type === 'order_updated' && Array.isArray(msg.order)) {
          const safeOrder = (msg.order as unknown[]).filter(x => typeof x === 'string') as string[];
          setEventState(prev => {
            if (!prev) return prev;
            const itemsArr: Item[] = Array.isArray(prev.items) ? prev.items.slice() : Object.values(prev.items as Record<string, Item>);
            const reordered: Item[] = [];
            for (const id of safeOrder) {
              const found = itemsArr.find(it => it.itemId === id);
              if (found) reordered.push(found);
            }
            for (const it of itemsArr) {
              if (!reordered.find(r => r.itemId === it.itemId)) reordered.push(it);
            }
            return { ...prev, items: reordered };
          });
          return;
        }
      } catch {
          // ignore malformed messages
      }
    };

    return () => {
      try {
        ws.close();
      } catch {
        // ignore
      }
    };
  }, [workerPath]);

  return eventState;
};