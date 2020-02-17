import { createContext, useState, useEffect, useCallback } from 'react'

import store from 'stores'

import { isServer } from 'libs/helpers'

export const Metadata = createContext(null)

const MetadataProvider = ({ children }) => {
    let [isLight, updateLight] = useState(false),
        [track, updateTrack] = useState({}),
        [isPlaying, updatePlaying] = useState(false),
        [showingPlaylist, updateShowingPlaylist] = useState(false),
        [editingVolume, updateEditingVolume] = useState(false),
        [active, updateActive] = useState(0),
        [currentTime, updateCurrentTime] = useState(0),
        [volume, updateVolume] = useState(100)

    let musicEndHandler = useCallback(
        () => store.update('isPlaying', false),
        []
    )

    let setGlobalTrack = (selected: number) => {
        let currentTrack = store.get('track')[selected]

        updateTrack(currentTrack)
        window.music = new Audio(currentTrack.src)
        window.music.onended = () => musicEndHandler()
    }

    useEffect(() => {
        if (isServer) return

        setGlobalTrack(0)
        let isLight$ = store.subscribe('isLight', (state: boolean) => {
                updateLight(state)

                if (state) document.body.style.background = '#fff'
                else document.body.style.background = '#000'
            }),
            active$ = store.subscribe('active', (next: number) => {
                // Preserve value
                let volume = window.music.volume.valueOf()

                if (!window.music.paused) window.music.pause()

                // Bootstrap
                setGlobalTrack(next)
                window.music.play()
                window.music.volume = volume

                store.update('isPlaying', true)
                updateActive(next)
            }),
            isPlaying$ = store.subscribe('isPlaying', (state: boolean) =>
                updatePlaying(state)
            ),
            showPlaylist$ = store.subscribe('showPlaylist', (state: boolean) =>
                requestAnimationFrame(() => updateShowingPlaylist(state))
            ),
            editVolume$ = store.subscribe('editVolume', (state: boolean) =>
                updateEditingVolume(state)
            ),
            time$ = store.subscribe('time', (updatedTime: number) =>
                updateCurrentTime(updatedTime)
            ),
            volume$ = store.subscribe('volume', (volume: number) =>
                updateVolume(volume)
            )

        return () => {
            isLight$.unsubscribe()
            active$.unsubscribe()
            isPlaying$.unsubscribe()
            showPlaylist$.unsubscribe()
            editVolume$.unsubscribe()
            time$.unsubscribe()
            volume$.unsubscribe()
        }
    }, [])

    return (
        <Metadata.Provider
            value={{
                isLight,
                track,
                isPlaying,
                showingPlaylist,
                editingVolume,
                active,
                currentTime,
                volume,
            }}
        >
            {children}
        </Metadata.Provider>
    )
}

export default MetadataProvider
