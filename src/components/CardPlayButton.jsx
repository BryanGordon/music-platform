import { Pause } from '#@/icons/Pause.jsx';
import { Play } from '#@/icons/Play.jsx';
import { usePlayerStore } from '#@/store/playerStore';

export function CardPlayButton ({ id, size = 'small' }) {
  const { currentMusic, isPlaying, setCurrentMusic, setIsPlaying } = usePlayerStore(state => state)
  const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id
  
  const handleClick = () => {
    if (isPlayingPlaylist) {
      setIsPlaying(false)
      return
    }

    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then(res => res.json())
      .then(data => {
        const { songs, playlist } = data
        setIsPlaying(true)
        setCurrentMusic({ songs, playlist, song: songs[0] })

      })
  }

  const iconClassName = size === 'small' ? 'w-6 h-6' : 'w-7 h-7'

  return (
    <button onClick={handleClick} className='card-play-button rounded-full bg-green-500 p-2 hover:scale-105 transition hover:bg-green-400'>
      { isPlayingPlaylist ? <Pause className={iconClassName}/> : <Play className={iconClassName}/> }
    </button>
  )
}
