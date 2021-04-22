import React, { useContext } from 'react'
import Song from './Song'
import { MusicPlayListContext } from '../context/MusicPlayListContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRandom } from '@fortawesome/free-solid-svg-icons'

const PlayList = () => {
  const { music, shuffle, handleShuffle } = useContext(MusicPlayListContext) //dependencies from music player context

  const handleShuffleClick = () => {
    handleShuffle(!shuffle) // toggle shuffle state
  }
  return (
    <div className="playlist">
      <button onClick={() => handleShuffleClick()}>
        <FontAwesomeIcon icon={faRandom}></FontAwesomeIcon>
      </button>
      {music && music.map((music) => <Song music={music} key={music.id} />)}
    </div>
  )
}

export default PlayList
