import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import { Spinner } from "~/components/spinner"
import type { Item } from "~/counter"
import { STATE_STYLES } from "./event-constants"

interface StateBadgeProps {
	state: Item["state"]
}

export const StateBadge: React.FC<StateBadgeProps> = ({ state }) => {
	// Type cast to ensure state is one of the known states
	const style = STATE_STYLES[state as keyof typeof STATE_STYLES] || STATE_STYLES.NONE

	// Return nothing for NONE state
	if (state === "NONE") return null

	return (
		<div
			className={`flex items-center gap-4 px-6 py-3 rounded-md ${style.bg} ${style.text} shadow-md border-2 border-slate-200 dark:border-slate-700`}
		>
			{state === "PERFORMING" ? (
				<Spinner className="w-6 h-6 text-emerald-600 dark:text-emerald-300" />
			) : (
				style.icon && <Icon icon={style.icon} className="w-6 h-6" aria-hidden />
			)}
			{/* smaller default text on mobile, same on md+ */}
			<span className="font-bold uppercase text-lg md:text-2xl tracking-wider">{style.label || state}</span>
		</div>
	)
}
