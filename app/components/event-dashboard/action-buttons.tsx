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
	const buttonClasses = "flex items-center justify-center md:w-auto md:h-auto md:px-3 md:py-2"

	if (item.type === "PERFORMANCE") {
		return (
			<>
				<Button
					variant="secondary"
					onClick={() => onUpdateState(item.itemId, item.state === "CHECKED IN" ? "NONE" : "CHECKED IN")}
					title="Mark Team as Checked In"
					aria-label="Mark Team as Checked In"
					className={buttonClasses}
				>
					<Icon icon="mdi:account-check" />
					<span className="hidden md:inline ml-2 text-sm">Check In</span>
				</Button>
				<Button
					variant="secondary"
					onClick={() => onUpdateState(item.itemId, "BACKSTAGE")}
					title="Backstage"
					aria-label="Backstage"
					className={buttonClasses}
				>
					<Icon icon="mdi:door" />
					<span className="hidden md:inline ml-2 text-sm">Backstage</span>
				</Button>
				{(role === "backstage" || !role) && (
					<>
						<Button
							variant="secondary"
							onClick={() => onStartTimer(item.itemId)}
							title="Start Timer / Performing"
							aria-label="Start Timer"
							className={buttonClasses}
						>
							<Icon icon="mdi:play" className="w-5 h-5 text-emerald-600 dark:text-emerald-300" aria-hidden />
							<span className="hidden md:inline ml-2 text-sm">Start</span>
						</Button>
						<Button
							variant="secondary"
							onClick={() => onUpdateState(item.itemId, "DONE")}
							title="Mark as Done"
							aria-label="Mark as Done"
							className={buttonClasses}
						>
							<Icon icon="mdi:done" />
							<span className="hidden md:inline ml-2 text-sm">Done</span>
						</Button>
						<Button
							variant="outline"
							title="Load item on screen"
							aria-label="Load item on screen"
							className={buttonClasses}
							onClick={() => onUpdateState(item.itemId, "READY TO GO")}
						>
							<Icon icon="gg:screen" />
							<span className="hidden md:inline ml-2 text-sm">Load</span>
						</Button>
					</>
				)}
			</>
		)
	}

	// Break buttons
	return (
		<>
			<Button
				variant="secondary"
				onClick={() => onUpdateState(item.itemId, "IN PROGRESS")}
				title="Start Break"
				aria-label="Start Break"
				className={buttonClasses}
			>
				<Icon icon="mdi:timer" />
				<span className="hidden md:inline ml-2 text-sm">Start Break</span>
			</Button>
			<Button
				variant="secondary"
				onClick={() => onUpdateState(item.itemId, "DONE")}
				title="Done"
				aria-label="Done"
				className={buttonClasses}
			>
				<Icon icon="mdi:done" />
				<span className="hidden md:inline ml-2 text-sm">Done</span>
			</Button>
			<Button
				variant="outline"
				onClick={() => onUpdateState(item.itemId, "NONE")}
				title="Reset"
				aria-label="Reset"
				className={buttonClasses}
			>
				<Icon icon="mdi:reload" />
				<span className="hidden md:inline ml-2 text-sm">Reset</span>
			</Button>
		</>
	)
}
