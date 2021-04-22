import React from 'react'
import NowPlaying from './NowPlaying'
import PlayList from './PlayListComponent'
import { MusicProvider } from '../context/MusicPlayListContext'

const MediaPlayer = () => {
  return (
    <div className="media-container">
      <MusicProvider>
        <NowPlaying />
        <PlayList />
      </MusicProvider>
    </div>
  )
}

export default MediaPlayer
