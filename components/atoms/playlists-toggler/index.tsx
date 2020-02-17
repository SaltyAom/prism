import { useContext } from 'react'

import store from 'stores'

import { Metadata } from 'components/atoms/metadataProvider'

import TrackName from 'components/atoms/trackName'

import './music-playlists-toggler.styl'

const MusicPlaylistsToggler = () => {
    let { isLight, showingPlaylist, editingVolume } = useContext(Metadata)

    return (
        <div
            id="music-playlists-toggler"
            className={`${editingVolume ? '-hidden' : ''} ${
                isLight ? '-light' : ''
            }`}
            onClick={() => store.set('showPlaylist', !showingPlaylist)}
        >
            <TrackName />
            <svg
                id="toggle-icon"
                className={`${showingPlaylist ? '-close' : ''} ${
                    isLight ? '-light' : ''
                }`}
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
