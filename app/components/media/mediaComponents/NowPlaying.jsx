import React, { useContext, useRef, useEffect } from 'react'
import Navigation from './NavigationComponent'
import { MusicPlayListContext } from '../context/MusicPlayListContext'

const NowPlaying = () => {
  const { nowPlaying, playButton, nextSong } = useContext(MusicPlayListContext) //dependencies from music player context

  const audioElement = useRef(null) //audio element reference
  const progressBar = useRef(null)
  const setProgress = useRef(null)

  useEffect(() => {
    playButton ? audioElement.current.play() : audioElement.current.pause()
  }, [playButton, nowPlaying])

  function handleTimeChange() {
    const { currentTime, duration } = audioElement.current
    const timeChange = (currentTime / duration) * 100
    progressBar.current.style.width = `${timeChange}%`
  }

  function handleSetProgress(e) {
    const width = setProgress.current.offsetWidth
    const setTime = e.nativeEvent.offsetX
    const duration = audioElement.current.duration

    audioElement.current.currentTime = (setTime / width) * duration
  }

  function handleNextSong() {
    nextSong(nowPlaying)
  }

  return (
    <div className={`music-container ${playButton ? 'play' : ''}`}>
      <div className="music-info">
        <h4 id="title">{nowPlaying.track}</h4>
        <div
          onClick={handleSetProgress}
          ref={setProgress}
          className="progress-container"
        >
          <div ref={progressBar} className="progress"></div>
        </div>
      </div>
      <audio
        onTimeUpdate={handleTimeChange}
        onEnded={handleNextSong}
        ref={audioElement}
        src={nowPlaying.url}
        id="audio"
      ></audio>
      <div className="img-container">
        <img src={nowPlaying.cover} alt="music-cover" id="cover" />
      </div>
      <Navigation currentTrack={nowPlaying} />
    </div>
  )
}

export default NowPlaying
