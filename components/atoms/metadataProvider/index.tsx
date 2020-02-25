import { createContext, useState, useEffect, useCallback } from 'react'

import store from 'stores'

import preImage from 'pre-image'
import { isServer } from 'libs/helpers'

import {
    updateTrack as requestTrack,
    getNextTrack,
    getPreviousTrack,
} from 'libs/track'
import { emitTime } from 'libs/time'

export const Metadata = createContext(null)

declare global {
    interface Navigator {
        mediaSession: any
    }
}

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

    let reflectToMediaControl = useCallback(() => {
        if ('mediaSession' in navigator) {
            let track = store.get('track'),
                active = store.get('active')

            // @ts-ignore
            navigator.mediaSession.metadata = new MediaMetadata({
                title: track[active].title,
                artist: track[active].artist,
                // album: '',
                artwork: [
                    {
                        src: track[active].cover,
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
            })

            navigator.mediaSession.setActionHandler('play', () => {
                store.set('isPlaying', true)
                emitTime()
            })
            navigator.mediaSession.setActionHandler('pause', () => {
                store.set('isPlaying', false)
                emitTime()
            })
            navigator.mediaSession.setActionHandler('seekbackward', () => {
                window.music.currentTime = window.music.currentTime - 5
                emitTime()
            })
            navigator.mediaSession.setActionHandler('seekforward', () => {
                window.music.currentTime = window.music.currentTime + 5
                emitTime()
            })
            navigator.mediaSession.setActionHandler('previoustrack', () =>
                requestTrack(getPreviousTrack())
            )
            navigator.mediaSession.setActionHandler('nexttrack', () =>
                requestTrack(getNextTrack())
            )
        }
    }, [])

    let setGlobalTrack = useCallback((selected: number) => {
        if (document.getElementById('music') !== null)
            document.body.removeChild(window.music)

        let currentTrack = store.get('track')[selected]

        updateTrack(currentTrack)
        window.music = new Audio(currentTrack.src)
        window.music.onended = () => musicEndHandler()
        reflectToMediaControl()

        if (document.getElementById('music') === null)
            document.body.appendChild(window.music)
    }, [])

    useEffect(() => {
        if (isServer) return

        let preImage$ = () =>
            store.get('track').forEach(track => preImage(track.cover))
        window.addEventListener('load', preImage$)

        setGlobalTrack(0)
        let isLight$ = store.subscribe('isLight', (state: boolean) => {
                updateLight(state)

                if (state) document.body.style.background = '#fff'
                else document.body.style.background = '#000'
            }),
            active$ = store.subscribe('active', (next: number) => {
                document.body.appendChild(window.music)
                // Preserve value
                let volume = window.music.volume.valueOf()

                if (!window.music.paused) window.music.pause()

                // Bootstrap
                setGlobalTrack(next)
                window.music.play()
                window.music.volume = volume
                window.music.setAttribute('id', 'music')

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
            window.removeEventListener('load', preImage$)
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
