import React, { useState, createContext } from 'react'
import musicList from '../../../playlist'

import { songIndexLookUp } from '../../../utils/helpers'

export const MusicPlayListContext = createContext()

export const MusicProvider = (props) => {
    const [music] = useState(musicList)
    const [shuffle, setShuffle] = useState(false)
    const [playButton, setPlayButton] = useState(false)
    const [nowPlaying, setNowPlaying] = useState(music[0])
    const [favorites, setfavorites] = useState([])

    /**
     * shuffle
     * @returns random song from playlist
     */
    const shufflePlaylist = () => {
        return (music[Math.floor(Math.random() * music.length)])
    }

    /**
     * side effect- set shuffle boolean value
     * @param {boolean} isShuffle shuffle true or false value
     */
    const handleShuffle = (isShuffle) => {
        setShuffle(isShuffle)
    }

    /**
     * side effect - set now playing and play button to true
     * @param {object} song current song to be played
     */
    const handlePlayMusic = (song) => {
        setNowPlaying(song)
        setPlayButton(true)
    }

    const handleAddToFavorites = (song) => {
        setfavorites(favoritesPlayList => [...favoritesPlayList, song])
    }


    // navagaition controlls

    const previousSong = (currentSong) => {
        setNowPlaying(music[prevTrackIndex(songIndexLookUp(currentSong))])
    }
    /**
     *
     * @param {number} index current track index
     * @returns {number} index of previous track
     */
    const prevTrackIndex = (index) => {
        if (index === 0) return music.length - 1 //loop playlist if track is at begining
        return index - 1
    }

    /**
     * takes in the current song and looks up its index in the playlist
     * side effect - set now playing base on shuffle boolean
     *
     * @param {object} currentSong
     */
    const nextSong = (currentSong) => {
        if (shuffle) return setNowPlaying(shufflePlaylist()) // exit early if shuffle is true

        setNowPlaying(music[nextTrackIndex(songIndexLookUp(currentSong))])
    }

    const nextTrackIndex = (index) => {
        if (index === music.length - 1) return 0 // start playlist over if last track
        return index + 1
    }

    //[END]

    return (
        <MusicPlayListContext.Provider
            value={{
                music,
                nowPlaying,
                playButton,
                shuffle,
                favorites,
                handleAddToFavorites,
                handlePlayMusic,
                handleShuffle,
                nextSong,
                previousSong,
                setPlayButton
            }}
        >
            {props.children}
        </MusicPlayListContext.Provider>
    )
}
