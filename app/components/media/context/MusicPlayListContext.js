import React, { useState, useEffect, createContext } from 'react';
import musicList from "../../../playlist"

export const MusicPlayListContext = createContext()

export const MusicProvider = (props) => {
    const [music, setMusic] = useState(musicList);

    const [nowPlaying, setNowPlaying] = useState(music[0])

    const handlePlayMusic = (song) => {
        setNowPlaying(song)
    }

    return (
        <MusicPlayListContext.Provider value={{ music, nowPlaying, handlePlayMusic }}>
            {props.children}
        </MusicPlayListContext.Provider>
    )

}