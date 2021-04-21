import React, { useContext } from 'react'

import { MusicPlayListContext } from '../context/MusicPlayListContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBackward,
  faForward,
  faPlay
} from '@fortawesome/free-solid-svg-icons'

const Navigation = ({ currentTrack }) => {
  const { nextSong, prevSong } = useContext(MusicPlayListContext)
  return (
    <div className="navigation">
      <button
        onClick={() => prevSong(currentTrack)}
        id="prev"
        className="action-btn"
      >
        <FontAwesomeIcon icon={faBackward} />
      </button>
      <button id="play" className="action-btn action-btn-big">
        <FontAwesomeIcon icon={faPlay} />
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
