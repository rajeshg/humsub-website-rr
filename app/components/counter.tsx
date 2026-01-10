import { useState } from "react"

export function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div className="text-black flex gap-4 items-center">
      <button className="py-1 px-2 text-white bg-cyan-700 rounded" type="button" onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <span>
        Count:
        {count}
      </span>
    </div>
  )
}
