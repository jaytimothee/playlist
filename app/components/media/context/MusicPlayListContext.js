import React, { useState, createContext } from 'react'
import musicList from '../../../playlist'

export const MusicPlayListContext = createContext()

export const MusicProvider = (props) => {
    const [music] = useState(musicList)
    const [playButton, setPlayButton] = useState(false)
    const [nowPlaying, setNowPlaying] = useState(music[0])

    const handlePlayMusic = (song) => {
        setNowPlaying(song)
        setPlayButton(true)
    }

    const nextSong = (currentSong) => {
        const index = music.findIndex((music) => music.id === currentSong.id)
        setNowPlaying(music[nextTrackIndex(index)])
    }

    const prevSong = (currentSong) => {
        const index = music.findIndex((music) => music.id === currentSong.id)
        setNowPlaying(music[prevTrackIndex(index)])
    }

    const prevTrackIndex = (index) => {
        if (index === 0) return music.length - 1
        return index - 1
    }

    const nextTrackIndex = (index) => {
        if (index === music.length - 1) return 0
        return index + 1
    }
    return (
        <MusicPlayListContext.Provider
            value={{ music, nowPlaying, handlePlayMusic, nextSong, prevSong, playButton, setPlayButton }}
        >
            {props.children}
        </MusicPlayListContext.Provider>
    )
}
