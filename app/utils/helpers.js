import music from '../playlist'
/**
 * look up the index of current song in playlist
 * @param {object} currentSong current song that is playing
 * @returns {number} the index of the current song
 */
export const songIndexLookUp = (currentSong) => {
    return (music.findIndex((music) => music.id === currentSong.id))
}