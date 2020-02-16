import { useState, useEffect, useCallback } from 'react'

import store from 'stores'

import TrackName from 'components/atoms/trackName'

import './music-playlists-toggler.styl'

const MusicPlaylistsToggler = () => {
    let [isLight, updateTheme] = useState(false),
        [isToggle, updateToggle] = useState(false),
        [isEditing, updateEditing] = useState(false)

    useEffect(() => {
        updateTheme(store.get('isLight'))
        store.subscribe('isLight', (state: boolean) => updateTheme(state))

        store.subscribe('editVolume', (state: boolean) => updateEditing(state))
    }, [])

    let handleToggle = useCallback(() => {
        store.set('showPlaylist', !isToggle)
        updateToggle(!isToggle)
    }, [isToggle])

    return (
        <div
            id="music-playlists-toggler"
            className={`${isEditing ? "-hidden" : ""} ${isLight ? "-light" : ""}`}
            onClick={() => handleToggle()}
        >
            <TrackName />
            <svg
                id="toggle-icon"
                className={`${isToggle ? '-close' : ''} ${isLight ? '-light' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
            >
                <path
                    className="fill"
                    fill={isLight ? 'var(--dark-text)' : 'var(--light-text)'}
                    d="M11.29 8.71L6.7 13.3c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 10.83l3.88 3.88c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L12.7 8.71c-.38-.39-1.02-.39-1.41 0z"
                />
            </svg>
        </div>
    )
}

export default MusicPlaylistsToggler
