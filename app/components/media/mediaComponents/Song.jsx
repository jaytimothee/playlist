import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import { MusicPlayListContext } from '../context/MusicPlayListContext'

const Song = ({ music }) => {
  const { handlePlayMusic } = useContext(MusicPlayListContext)

  const favorites = music
  function addToFavorites() {
    favorites.fav = true
  }

  return (
    <div onClick={() => handlePlayMusic(music)} className="music">
      <h3>{music.artist}</h3>
      <div className="song-container">
        <p>
          {music.track} - {music.album}
        </p>
        <FontAwesomeIcon
          onClick={() => addToFavorites(music)}
          className={`${favorites.fav ? 'favorites' : 'heart'}`}
          icon={faHeart}
        />
      </div>
    </div>
  )
}

export default Song
