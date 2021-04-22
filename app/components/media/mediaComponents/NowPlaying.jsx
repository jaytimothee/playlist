import React, { useContext, useRef, useEffect } from 'react'
import Navigation from './NavigationComponent'
import { MusicPlayListContext } from '../context/MusicPlayListContext'

const NowPlaying = () => {
  const { nowPlaying, playButton } = useContext(MusicPlayListContext)

  const audioElement = useRef(null)

  useEffect(() => {
    playButton ? audioElement.current.play() : audioElement.current.pause()
  }, [playButton, nowPlaying])

  return (
    <div className={`music-container ${playButton ? 'play' : ''}`}>
      <div className="music-info">
        <h4 id="title">{nowPlaying.track}</h4>
        <div className="progress-container">
          <div className="progress"></div>
        </div>
      </div>
      <audio ref={audioElement} src={nowPlaying.url} id="audio"></audio>
      <div className="img-container">
        <img src={nowPlaying.cover} alt="music-cover" id="cover" />
      </div>
      <Navigation currentTrack={nowPlaying} />
    </div>
  )
}

export default NowPlaying
