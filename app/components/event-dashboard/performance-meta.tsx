import type { PerformanceItem } from "~/counter"

// Helper to format durations
const formatDuration = (d?: number | string) => {
	if (d == null) return undefined
	if (typeof d === "number") {
		const m = Math.floor(d / 60)
		const s = d % 60
		return m > 0 ? `${m}m ${s}s` : `${s}s`
	}
	return String(d)
}

interface PerformanceMetaProps {
	performance: PerformanceItem
}

export const PerformanceMeta: React.FC<PerformanceMetaProps> = ({ performance }) => {
	const duration = formatDuration(
		(performance as unknown as { durationSeconds?: number }).durationSeconds ??
			(performance.duration as unknown as number) ??
			performance.duration
	)

	const hasMeta = Boolean(performance.style || performance.teamSize || performance.choreographers || duration)

	if (!hasMeta) return null

	return (
		<>
			{performance.style && (
				<div className="flex">
					<span className="w-32 flex-shrink-0 text-xs font-medium">Style:</span>
					<span className="text-xs text-muted-foreground">{performance.style}</span>
				</div>
			)}
			{typeof performance.teamSize === "number" && (
				<div className="flex">
					<span className="w-32 flex-shrink-0 text-xs font-medium">Team Size:</span>
					<span className="text-xs text-muted-foreground">{performance.teamSize}</span>
				</div>
			)}
			{performance.choreographers && (
				<div className="flex">
					<span className="w-32 flex-shrink-0 text-xs font-medium">Choreographers:</span>
					<span className="text-xs text-muted-foreground">{performance.choreographers}</span>
				</div>
			)}
			{duration && (
				<div className="flex">
					<span className="w-32 flex-shrink-0 text-xs font-medium">Duration:</span>
					<span className="text-xs text-muted-foreground">{duration}</span>
				</div>
			)}
		</>
	)
}
