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

const SongControl = ({ audio }) => {
  const [currentTime, setCurrentTime] = useState(0)
  const duration = audio?.current?.duration ?? 0

  const handleTimeUpdate = () => {
    setCurrentTime(audio.current.currentTime)
  }

  const formatTime = time => {
    if (time == null) return '0:00'

    const seconds = Math.floor(time % 60)
    const minutes = Math.floor(time / 60)

    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  } 

  useEffect(() => {
    audio.current.addEventListener('timeupdate', handleTimeUpdate)

    return () => {
      audio.current.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [])

  return (
    <div className='flex gap-x-3 text-xs pt-2 pb-4'>
      <span className='opacity-50 w-12 text-right'>{formatTime(currentTime)}</span>
      <Slider 
        defaultValue={[0]}
        value={[currentTime]}
        max={duration}
        min={0}
        className='w-[400px]'
        onValueChange={(value) => {
          audio.current.currentTime = value
        }}
      />
      <span className='opacity-50 w-12'>
        { duration ? formatTime(duration) : '0:00' }
      </span>
    </div>
  )


}

const VolumenControl = () => {
  const volume = usePlayerStore(state => state.volume)
  const setVolume = usePlayerStore(state => state.setVolume)
  const previousVolumenRef = useRef(volume)

  const isVolumeSilenced = volume < 0.1

  const handleClickVolume = () => {
    if (isVolumeSilenced) {
      setVolume(previousVolumenRef.current)
    } else {
      previousVolumenRef.current = volume
      setVolume(0)
    }
    
  }

  return (
    <div className='flex justify-center gap-x-2'>
      <button className='opacity-70 hover:opacity-100 transition' onClick={handleClickVolume}>
        {
          isVolumeSilenced ? <VolumeMute /> : <VolumeHigh />
        }  
      </button>
      
      <Slider 
        defaultValue={[100]}
        value={[volume * 100]}
        max={100}
        min={0}
        className='w-[95px]'
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
  const { isPlaying, currentMusic, setIsPlaying, volume } = usePlayerStore(state => state)
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

  useEffect(() => {
    audioRef.current.volume = volume
  }, [volume])

  return (
    <div className="flex flex-row justify-between w-full px-4 z-50">
      <div className=''>
        <CurrentSong {... currentMusic.song}/>
      </div>

      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex justify-center flex-col items-center">
          <button 
            className="bg-white rounded-full p-3"
            onClick={handleClick}
          >
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <SongControl audio={audioRef}/>
          <audio ref={audioRef} />
        </div>
      </div>

      <div className="grid place-content-center">
        <VolumenControl />
      </div>

    </div>
    
  )
}
