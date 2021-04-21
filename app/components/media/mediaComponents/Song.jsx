import React, { useContext } from 'react'

import { MusicPlayListContext } from '../context/MusicPlayListContext'

const Song = ({ music }) => {
  const { handlePlayMusic } = useContext(MusicPlayListContext)

  return (
    <div onClick={() => handlePlayMusic(music)} className="music">
      <h3>{music.artist}</h3>
      <p>
        {music.track} - {music.album}
      </p>
    </div>
  )
}

export default Song
