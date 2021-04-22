import React, { useContext } from 'react'
import { MusicPlayListContext } from '../context/MusicPlayListContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBackward,
  faForward,
  faPlay,
  faPause
} from '@fortawesome/free-solid-svg-icons'

const Navigation = ({ currentTrack }) => {
  //destructure dependencies from media playlist context
  const { nextSong, previousSong, playButton, setPlayButton } = useContext(
    MusicPlayListContext
  )

  /**
   * side effect - change play button boolean value
   * @param {boolean} playState boolean value for play or pause
   */
  const togglePlay = (playState) => {
    setPlayButton(playState)
  }

  return (
    <div className="navigation">
      <button
        onClick={() => previousSong(currentTrack)}
        id="prev"
        className="action-btn"
      >
        <FontAwesomeIcon icon={faBackward} />
      </button>
      <button id="play" className="action-btn action-btn-big">
        {playButton ? (
          <FontAwesomeIcon onClick={() => togglePlay(false)} icon={faPause} />
        ) : (
          <FontAwesomeIcon onClick={() => togglePlay(true)} icon={faPlay} />
        )}
      </button>
      <button
        onClick={() => nextSong(currentTrack)}
        id="next"
        className="action-btn"
      >
        <FontAwesomeIcon icon={faForward} />
      </button>
    </div>
  )
}

export default Navigation
