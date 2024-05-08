import { useState } from "react"

export function Player () {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="flex flex-row justify-between w-full px-4 z-50">
      <div className="">
        current song...
      </div>

      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex justify-center">
          <button 
            className="bg-white rounded-full p-2"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying}
          </button>
        </div>
      </div>

      <div className="">
        volumen
      </div>
    </div>
    
  )
}
