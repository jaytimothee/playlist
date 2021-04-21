import React, { useEffect, useState } from 'react';
const PlayList = () => {
    const [handlePlayList, sethandlePlayList] = useState()

    useEffect(() => {
        console.log(1)
        console.log('use effect')

    }, [])
    return (<h1>music playlist</h1>);
}

export default PlayList;