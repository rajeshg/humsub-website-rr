import { ClipboardCheck, Tent, Monitor, Play, CheckCircle, Undo } from "lucide-react"
import type { BreakState, Item, PerformanceState } from "~/counter"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog"
import { Button } from "../ui/button"

interface ActionButtonsProps {
  item: Item
  role?: "registration" | "backstage" | null
  onUpdateState: (itemId: string, newState: PerformanceState | BreakState) => void
  onStartTimer: (itemId: string) => void
}

// Defined at module scope on purpose: a component declared inside ActionButtons gets a
// new identity on every render, which remounts the dialog and wipes its open state.
// ActionButtons re-renders once a second (the countdown clock), so the dialog would
// open and instantly vanish.
const ConfirmDoneButton = ({
  itemId,
  itemName,
  className,
  onConfirm,
}: {
  itemId: string
  itemName: string
  className?: string
  onConfirm: () => void
}) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button variant="outline" title="Mark as Done" aria-label="Mark as Done" className={className}>
        <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
        <span>Done</span>
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Mark as done?</AlertDialogTitle>
        <AlertDialogDescription>
          {itemId} {itemName} will leave the queue and stop showing on the stage screen. You can bring it back with
          &ldquo;Show Completed&rdquo; &rarr; Reset.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={onConfirm}
          className="bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20"
        >
          Yes, mark done
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
)

// Completed items only offer Reset: it drops back into the queue in its original slot,
// with no Check In / Backstage / timer state attached.
const ResetButton = ({ className, onReset }: { className?: string; onReset: () => void }) => (
  <Button
    variant="outline"
    onClick={onReset}
    title="Put back in the queue"
    aria-label="Put back in the queue"
    className={className}
  >
    <Undo className="w-3.5 h-3.5 flex-shrink-0" />
    <span>Reset</span>
  </Button>
)

export const ActionButtons: React.FC<ActionButtonsProps> = ({ item, role, onUpdateState, onStartTimer }) => {
  // Compact buttons for the xl+ side column (mouse); roomy 44px targets below that (touch)
  const buttonClasses =
    "flex items-center justify-center gap-1.5 px-2.5 py-1.5 h-auto text-xs font-medium whitespace-normal"
  const touchButtonClasses =
    "flex items-center justify-center gap-1.5 px-3 py-2.5 h-auto min-h-[44px] text-sm font-medium whitespace-normal"

  const primaryButtonClasses =
    "flex items-center justify-center gap-1.5 px-3 py-2 h-auto text-sm font-medium whitespace-normal"

  if (item.type === "PERFORMANCE") {
    // Already completed: the only useful action is putting it back in the queue
    if (item.state === "DONE") {
      return (
        <div className="w-full">
          <ResetButton
            className={`${touchButtonClasses} w-full xl:w-auto`}
            onReset={() => onUpdateState(item.itemId, "NONE")}
          />
        </div>
      )
    }

    return (
      <div className="w-full">
        {/* Desktop: Organized button layout - Order: Check In, Backstage, Load, Start, Done */}
        {/* allow wrapping on narrower desktop widths */}
        <div className="hidden xl:flex xl:flex-col xl:flex-wrap xl:gap-1.5">
          {/* State management buttons */}
          <Button
            variant="secondary"
            onClick={() => onUpdateState(item.itemId, item.state === "CHECKED IN" ? "NONE" : "CHECKED IN")}
            title="Mark Team as Checked In"
            aria-label="Mark Team as Checked In"
            className={buttonClasses}
          >
            <ClipboardCheck className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Check In</span>
          </Button>

          <Button
            variant="secondary"
            onClick={() => onUpdateState(item.itemId, "BACKSTAGE")}
            title="Move to Backstage"
            aria-label="Move to Backstage"
            className={buttonClasses}
          >
            <Tent className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Backstage</span>
          </Button>

          {(role === "backstage" || !role) && (
            <>
              {(item.state === "CHECKED IN" || item.state === "BACKSTAGE") && (
                <Button
                  variant="secondary" // changed from "outline" -> "secondary" to match other buttons
                  title="Load on Screen"
                  aria-label="Load on Screen"
                  className={buttonClasses}
                  onClick={() => onUpdateState(item.itemId, "READY TO GO")}
                >
                  <Monitor className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Load</span>
                </Button>
              )}

              {(item.state === "CHECKED IN" || item.state === "BACKSTAGE" || item.state === "READY TO GO") && (
                <Button
                  variant="default"
                  onClick={() => onStartTimer(item.itemId)}
                  title="Start Performance"
                  aria-label="Start Performance"
                  className={`${primaryButtonClasses} bg-emerald-600 hover:bg-emerald-700 text-white`}
                >
                  <Play className="w-4 h-4 flex-shrink-0" />
                  <span>Start</span>
                </Button>
              )}

              <ConfirmDoneButton
                itemId={item.itemId}
                itemName={item.name}
                className={buttonClasses}
                onConfirm={() => onUpdateState(item.itemId, "DONE")}
              />
            </>
          )}
        </div>

        {/* Touch: roomy buttons, 2 per row - Order: Check In, Backstage, Load, Start, Done */}
        <div className="flex flex-col gap-1.5 xl:hidden">
          {/* Row 1: Check In, Backstage */}
          <div className="flex gap-1.5">
            <Button
              variant="secondary"
              onClick={() => onUpdateState(item.itemId, item.state === "CHECKED IN" ? "NONE" : "CHECKED IN")}
              title="Mark Team as Checked In"
              aria-label="Mark Team as Checked In"
              className={`${touchButtonClasses} flex-1`}
            >
              <ClipboardCheck className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Check In</span>
            </Button>

            <Button
              variant="secondary"
              onClick={() => onUpdateState(item.itemId, "BACKSTAGE")}
              title="Move to Backstage"
              aria-label="Move to Backstage"
              className={`${touchButtonClasses} flex-1`}
            >
              <Tent className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Backstage</span>
            </Button>
          </div>

          {(role === "backstage" || !role) && (
            <>
              {(item.state === "CHECKED IN" || item.state === "BACKSTAGE") && (
                /* Row 2: Load, Start */
                <div className="flex gap-1.5">
                  <Button
                    variant="secondary"
                    title="Load on Screen"
                    aria-label="Load on Screen"
                    className={`${touchButtonClasses} flex-1`}
                    onClick={() => onUpdateState(item.itemId, "READY TO GO")}
                  >
                    <Monitor className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Load</span>
                  </Button>

                  <Button
                    variant="default"
                    onClick={() => onStartTimer(item.itemId)}
                    title="Start Performance"
                    aria-label="Start Performance"
                    className={`${touchButtonClasses} flex-1 bg-emerald-600 hover:bg-emerald-700 text-white`}
                  >
                    <Play className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Start</span>
                  </Button>
                </div>
              )}

              {item.state === "READY TO GO" && (
                /* Row 2: Start only (after loaded) */
                <div className="flex gap-1.5">
                  <Button
                    variant="default"
                    onClick={() => onStartTimer(item.itemId)}
                    title="Start Performance"
                    aria-label="Start Performance"
                    className={`${touchButtonClasses} flex-1 bg-emerald-600 hover:bg-emerald-700 text-white`}
                  >
                    <Play className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Start</span>
                  </Button>
                </div>
              )}

              {/* Row 3: Done (centered) */}
              <div className="flex justify-center">
                <ConfirmDoneButton
                  itemId={item.itemId}
                  itemName={item.name}
                  className={`${touchButtonClasses} w-1/2`}
                  onConfirm={() => onUpdateState(item.itemId, "DONE")}
                />
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  // Break buttons - responsive layout
  // Already completed: only offer Reset, same as performances
  if (item.state === "DONE") {
    return (
      <div className="w-full">
        <ResetButton
          className={`${touchButtonClasses} w-full xl:w-auto`}
          onReset={() => onUpdateState(item.itemId, "NONE")}
        />
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Desktop: Compact row layout - allow wrapping on smaller desktops */}
      <div className="hidden xl:flex xl:flex-wrap xl:gap-1.5">
        <ConfirmDoneButton
          itemId={item.itemId}
          itemName={item.name}
          className={buttonClasses}
          onConfirm={() => onUpdateState(item.itemId, "DONE")}
        />
      </div>

      {/* Touch layout */}
      <div className="flex flex-col gap-1.5 xl:hidden">
        <ConfirmDoneButton
          itemId={item.itemId}
          itemName={item.name}
          className={`${touchButtonClasses} w-full`}
          onConfirm={() => onUpdateState(item.itemId, "DONE")}
        />
      </div>
    </div>
  )
}
