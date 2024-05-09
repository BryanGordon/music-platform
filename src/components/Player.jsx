import { useEffect, useRef, useState } from "react"
/* Añadir una ternaria en la parte de isplaying (dentro del boton), 
colocando los iconos de pause y play */
/*Crear todos los iconos del player*/

export function Player () {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState(null)
  const audioRef = useRef()

  const handleClick = () => {
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }

    setIsPlaying(!isPlaying)
  }

  useEffect(() => {
    audioRef.current.src = `/music/1/01.mp3`
  }, [])

  return (
    <div className="flex flex-row justify-between w-full px-4 z-50">
      <div className="">
        current song...
      </div>

      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex justify-center">
          <button 
            className="bg-white rounded-full p-5"
            onClick={handleClick}
          >
            {isPlaying}
          </button>
        </div>
      </div>

      <div className="grid place-content-center">
        volumen
      </div>

    <audio ref={audioRef} />

    </div>
    
  )
}
