import React, { useContext } from 'react'
import Song from './Song'

import { MusicPlayListContext } from '../context/MusicPlayListContext'

const PlayList = () => {
  const { music } = useContext(MusicPlayListContext)

  return (
    <div className="playlist">
      <button>shuffle</button>
      {music && music.map((music) => <Song music={music} key={music.id} />)}
    </div>
  )
}

export default PlayList
