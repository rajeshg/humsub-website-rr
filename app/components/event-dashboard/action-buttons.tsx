import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import type { BreakState, Item, PerformanceState } from "~/counter"
import { Button } from "../ui/button"

interface ActionButtonsProps {
	item: Item
	role?: "registration" | "backstage" | null
	onUpdateState: (itemId: string, newState: PerformanceState | BreakState) => void
	onStartTimer: (itemId: string) => void
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ item, role, onUpdateState, onStartTimer }) => {
	// Clean button styling with proper text and icon alignment
	const buttonClasses = "flex items-center justify-center gap-1.5 px-2.5 py-1.5 h-auto text-xs font-medium"
	const primaryButtonClasses = "flex items-center justify-center gap-1.5 px-3 py-2 h-auto text-sm font-medium"

	if (item.type === "PERFORMANCE") {
		return (
			<div className="w-full">
				{/* Desktop: Organized button layout - Order: Check In, Backstage, Load, Start, Done */}
				<div className="hidden md:flex md:gap-1.5">
					{/* State management buttons */}
					<Button
						variant="secondary"
						onClick={() => onUpdateState(item.itemId, item.state === "CHECKED IN" ? "NONE" : "CHECKED IN")}
						title="Mark Team as Checked In"
						aria-label="Mark Team as Checked In"
						className={buttonClasses}
					>
						<Icon icon="mdi:clipboard-check" className="w-3.5 h-3.5 flex-shrink-0" />
						<span>Check In</span>
					</Button>

					<Button
						variant="secondary"
						onClick={() => onUpdateState(item.itemId, "BACKSTAGE")}
						title="Move to Backstage"
						aria-label="Move to Backstage"
						className={buttonClasses}
					>
						<Icon icon="mdi:arrow-right" className="w-3.5 h-3.5 flex-shrink-0" />
						<span>Backstage</span>
					</Button>

					{(role === "backstage" || !role) && (
						<>
							<Button
								variant="outline"
								title="Load on Screen"
								aria-label="Load on Screen"
								className={buttonClasses}
								onClick={() => onUpdateState(item.itemId, "READY TO GO")}
							>
								<Icon icon="mdi:monitor" className="w-3.5 h-3.5 flex-shrink-0" />
								<span>Load</span>
							</Button>

							<Button
								variant="default"
								onClick={() => onStartTimer(item.itemId)}
								title="Start Performance"
								aria-label="Start Performance"
								className={`${primaryButtonClasses} bg-emerald-600 hover:bg-emerald-700 text-white`}
							>
								<Icon icon="mdi:play" className="w-4 h-4 flex-shrink-0" />
								<span>Start</span>
							</Button>

							<Button
								variant="secondary"
								onClick={() => onUpdateState(item.itemId, "DONE")}
								title="Mark as Done"
								aria-label="Mark as Done"
								className={buttonClasses}
							>
								<Icon icon="mdi:check-circle" className="w-3.5 h-3.5 flex-shrink-0" />
								<span>Done</span>
							</Button>
						</>
					)}
				</div>

				{/* Mobile: Compact layout - Order: Check In, Backstage, Load, Start, Done */}
				<div className="flex flex-col gap-1.5 md:hidden">
					{/* Top row - workflow actions */}
					<div className="flex gap-1.5">
						<Button
							variant="secondary"
							onClick={() => onUpdateState(item.itemId, item.state === "CHECKED IN" ? "NONE" : "CHECKED IN")}
							title="Mark Team as Checked In"
							aria-label="Mark Team as Checked In"
							className={`${buttonClasses} flex-1`}
						>
							<Icon icon="mdi:clipboard-check" className="w-3.5 h-3.5 flex-shrink-0" />
							<span>Check In</span>
						</Button>

						<Button
							variant="secondary"
							onClick={() => onUpdateState(item.itemId, "BACKSTAGE")}
							title="Move to Backstage"
							aria-label="Move to Backstage"
							className={`${buttonClasses} flex-1`}
						>
							<Icon icon="mdi:arrow-right" className="w-3.5 h-3.5 flex-shrink-0" />
							<span>Backstage</span>
						</Button>

						{(role === "backstage" || !role) && (
							<Button
								variant="outline"
								title="Load on Screen"
								aria-label="Load on Screen"
								className={`${buttonClasses} flex-1`}
								onClick={() => onUpdateState(item.itemId, "READY TO GO")}
							>
								<Icon icon="mdi:monitor" className="w-3.5 h-3.5 flex-shrink-0" />
								<span>Load</span>
							</Button>
						)}
					</div>

					{/* Bottom row - action buttons */}
					{(role === "backstage" || !role) && (
						<div className="flex gap-1.5">
							<Button
								variant="default"
								onClick={() => onStartTimer(item.itemId)}
								title="Start Performance"
								aria-label="Start Performance"
								className={`${buttonClasses} flex-1 bg-emerald-600 hover:bg-emerald-700 text-white`}
							>
								<Icon icon="mdi:play" className="w-3.5 h-3.5 flex-shrink-0" />
								<span>Start</span>
							</Button>

							<Button
								variant="secondary"
								onClick={() => onUpdateState(item.itemId, "DONE")}
								title="Mark as Done"
								aria-label="Mark as Done"
								className={`${buttonClasses} flex-1`}
							>
								<Icon icon="mdi:check-circle" className="w-3.5 h-3.5 flex-shrink-0" />
								<span>Done</span>
							</Button>
						</div>
					)}
				</div>
			</div>
		)
	}

	// Break buttons - responsive layout
	return (
		<div className="w-full">
			{/* Desktop: Compact row layout */}
			<div className="hidden md:flex md:gap-1.5">
				<Button
					variant="default"
					onClick={() => onUpdateState(item.itemId, "IN PROGRESS")}
					title="Start Break"
					aria-label="Start Break"
					className={`${primaryButtonClasses} bg-blue-600 hover:bg-blue-700 text-white`}
				>
					<Icon icon="mdi:timer" className="w-4 h-4 flex-shrink-0" />
					<span>Start Break</span>
				</Button>

				<Button
					variant="secondary"
					onClick={() => onUpdateState(item.itemId, "DONE")}
					title="Mark as Done"
					aria-label="Mark as Done"
					className={buttonClasses}
				>
					<Icon icon="mdi:check-circle" className="w-3.5 h-3.5 flex-shrink-0" />
					<span>Done</span>
				</Button>

				<Button
					variant="outline"
					onClick={() => onUpdateState(item.itemId, "NONE")}
					title="Reset"
					aria-label="Reset"
					className={buttonClasses}
				>
					<Icon icon="mdi:undo" className="w-3.5 h-3.5 flex-shrink-0" />
					<span>Reset</span>
				</Button>
			</div>

			{/* Mobile: Compact layout */}
			<div className="flex gap-1.5 md:hidden">
				<Button
					variant="default"
					onClick={() => onUpdateState(item.itemId, "IN PROGRESS")}
					title="Start Break"
					aria-label="Start Break"
					className={`${buttonClasses} flex-1 bg-blue-600 hover:bg-blue-700 text-white`}
				>
					<Icon icon="mdi:timer" className="w-3.5 h-3.5 flex-shrink-0" />
					<span>Start</span>
				</Button>

				<Button
					variant="secondary"
					onClick={() => onUpdateState(item.itemId, "DONE")}
					title="Mark as Done"
					aria-label="Mark as Done"
					className={`${buttonClasses} flex-1`}
				>
					<Icon icon="mdi:check-circle" className="w-3.5 h-3.5 flex-shrink-0" />
					<span>Done</span>
				</Button>

				<Button
					variant="outline"
					onClick={() => onUpdateState(item.itemId, "NONE")}
					title="Reset"
					aria-label="Reset"
					className={`${buttonClasses} flex-1`}
				>
					<Icon icon="mdi:undo" className="w-3.5 h-3.5 flex-shrink-0" />
					<span>Reset</span>
				</Button>
			</div>
		</div>
	)
}
