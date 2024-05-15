import { useEffect, useState, useRef } from 'react'
import { Pause } from '#@/icons/Pause'
import { Play } from '#@/icons/Play'
import { VolumeMute } from '#@/icons/VolumeMute'
import { VolumeHigh } from '#@/icons/VolumeHigh'
import { usePlayerStore } from '#@/store/playerStore'
import { Slider } from './Slider'


const CurrentSong = ({ image, title, artists }) => {
  return (
    <div className={`flex items-center gap-5 relative overflow-hidden`}>
      
      <picture className='w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden'>
        <img src={image} alt={title} />
      </picture>

      <div className='flex flex-col'>
        <h3 className='font-semibold text-sm block'>{title}</h3>
        <span className='text-xs opacity-80'>
          {artists?.join(', ')}
        </span>
      </div>
    </div>
  )
}

const VolumenControl = () => {
  const volume = usePlayerStore(state => state.volume)
  const setVolume = usePlayerStore(state => state.setVolume)

  return (
    <div className='flex justify-center gap-x-2'>
      {
        volume < 0.1 ? <VolumeMute /> : <VolumeHigh />
      }
      <Slider 
        defaultValue={[100]}
        max={100}
        min={0}
        className='w-[100px]'
        onValueChange={(value) => {
          const [newVolume] = value
          const volumeValue = newVolume / 100
          setVolume(volumeValue)
        }}
      />
    </div>
  )
}

export function Player () {
  const { isPlaying, currentMusic, setIsPlaying } = usePlayerStore(state => state)
  const audioRef = useRef()

  const handleClick = () => {
    setIsPlaying(!isPlaying)
  }

  useEffect (() => {
    isPlaying
      ? audioRef.current.play()
      : audioRef.current.pause()
  }, [isPlaying])

  useEffect (() => {
    const { song, playlist, songs } = currentMusic
    if (song) {
      const src = `/music/${playlist?.id}/0${song.id}.mp3`
      audioRef.current.src = src
      audioRef.current.play()
    }
  }, [currentMusic])

  return (
    <div className="flex flex-row justify-between w-full px-4 z-50">
      <div>
        <CurrentSong {... currentMusic.song}/>
      </div>

      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex justify-center">
          <button 
            className="bg-white rounded-full p-3"
            onClick={handleClick}
          >
            {isPlaying ? <Pause /> : <Play />}
          </button>
        </div>
      </div>

      <div className="grid place-content-center">
        <VolumenControl />
      </div>

    <audio ref={audioRef} />

    </div>
    
  )
}
