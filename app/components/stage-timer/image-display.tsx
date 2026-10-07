import { useEffect, useRef, useState } from "react"
import { Spinner } from "~/components/spinner"

interface ImageDisplayProps {
  imagePath: string | null
  isCollection?: boolean
  collectionInterval?: number
  collectionLastRotation?: number
  now?: number
}

// How long the incoming slide takes to fade over the outgoing one (ms)
const FADE_MS = 700

interface Layer {
  src: string
  key: number
}

export function ImageDisplay({
  imagePath,
  isCollection,
  collectionInterval,
  collectionLastRotation,
  now,
}: ImageDisplayProps) {
  // Crossfade instead of swapping the img src: the previous slide stays mounted
  // underneath while the next one fades in, so rotating fillers never flash a
  // spinner or a blank frame (which read as flicker on the stage screen).
  const [layers, setLayers] = useState<Layer[]>([])
  const [error, setError] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)
  const keyRef = useRef(0)
  const timersRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set())

  useEffect(() => {
    if (!imagePath) {
      setLayers([])
      setError(false)
      return
    }

    let cancelled = false
    setError(false)

    // Preload first; only put it on screen once it is decoded.
    const img = new Image()
    img.onload = () => {
      if (cancelled) return
      const key = ++keyRef.current
      // Keep at most two layers (outgoing + incoming)
      setLayers((prev) => [...prev, { src: imagePath, key }].slice(-2))

      // Drop the outgoing layer once the fade has finished. slice(-1) always keeps
      // the newest, so overlapping rotations can't remove the wrong layer.
      const timer = setTimeout(() => {
        timersRef.current.delete(timer)
        setLayers((prev) => prev.slice(-1))
      }, FADE_MS + 100)
      timersRef.current.add(timer)
    }
    img.onerror = () => {
      // Keep whatever is already on screen rather than blanking the stage
      if (!cancelled) setError(true)
    }
    img.src = imagePath

    return () => {
      cancelled = true
    }
  }, [imagePath])

  useEffect(() => {
    const timers = timersRef.current
    return () => {
      for (const t of timers) clearTimeout(t)
      timers.clear()
    }
  }, [])

  // Countdown timer for collection mode
  useEffect(() => {
    if (!isCollection || !collectionInterval || !collectionLastRotation || !now) {
      setCountdown(null)
      return
    }

    const updateCountdown = () => {
      const nextRotation = collectionLastRotation + collectionInterval * 1000
      const remaining = Math.max(0, Math.ceil((nextRotation - now) / 1000))
      setCountdown(remaining)
    }

    updateCountdown()

    // Update countdown every second
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [isCollection, collectionInterval, collectionLastRotation, now])

  const hasImage = layers.length > 0

  if (!hasImage && !imagePath) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No image selected</p>
      </div>
    )
  }

  if (!hasImage && error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">Failed to load image</p>
      </div>
    )
  }

  if (!hasImage) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner className="w-12 h-12" />
      </div>
    )
  }

  return (
    <div className="w-full h-full relative bg-[#5f2f83] overflow-hidden">
      {/* Stacked layers: the newest fades in over the one it replaces */}
      {layers.map((layer, index) => {
        const isIncoming = index === layers.length - 1 && layers.length > 1
        return (
          <img
            key={layer.key}
            src={layer.src}
            alt="Stage display"
            className={`absolute inset-0 w-full h-full object-contain${
              isIncoming ? " animate-in fade-in duration-700 ease-out" : ""
            }`}
          />
        )
      })}

      {isCollection && (
        <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">Collection Mode</div>
      )}
      {isCollection && countdown !== null && (
        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-2 rounded-lg text-lg font-mono font-bold">
          {countdown}s
        </div>
      )}
    </div>
  )
}
