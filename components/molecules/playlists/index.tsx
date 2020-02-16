import { useState, useEffect } from 'react'

import store from 'stores'

import List from '../list'

import './playlists.styl'

const Playlists = () => {
    let [playlist, updatePlaylist] = useState([]),
        [isLight, updateLight] = useState(store.get("isLight"))

    useEffect(() => {
        updatePlaylist(store.get('track'))
        store.subscribe('track', (state: any) => updatePlaylist(state))

        updateLight(store.get('isLight'))
        store.subscribe('isLight', (state: boolean) => updateLight(state))
    }, [])

    return (
        <ol id="music-playlists">
            {playlist.map(({ title, artist, cover }, index) => (
                <List
                    title={title}
                    artist={artist}
                    cover={cover}
                    isLight={isLight}
                    index={index}
                />
            ))}
        </ol>
    )
}

export default Playlists
