import { useContext, useRef, useEffect } from 'react'

import store from 'stores'

import { Metadata } from 'components/atoms/metadataProvider'

import { isServer } from 'libs/helpers'

import './play.styl'

import './types'

const Skip = () => {
    let { isLight, isPlaying } = useContext(Metadata)

    let initIsPlaying = useRef(true)

    useEffect(() => {
        if (isServer) return

        document.addEventListener('keydown', ({ code }) => {
            if (code !== 'Space') return

            store.set('isPlaying', false)
            ;(document.activeElement as HTMLElement).blur()
        })

        return () => window.music.pause()
    }, [])

    useEffect(() => {
        if (isServer) return
        if (initIsPlaying.current) {
            initIsPlaying.current = false
            return
        }

        // Synchronous with isPlaying
        if (isPlaying) window.music.play()
        else window.music.pause()
    }, [isPlaying])

    return isPlaying ? (
        <button
            id="play-track-button"
            onClick={() => store.set('isPlaying', false)}
        >
            <svg
                id="play-track"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
            >
                <path
                    className="fill"
                    fill={isLight ? 'var(--dark-text)' : 'var(--light-text)'}
                    d="M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2zm6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2z"
                />
            </svg>
        </button>
    ) : (
        <button
            id="play-track-button"
            onClick={() => store.set('isPlaying', true)}
        >
            <svg
                id="play-track"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
            >
                <path
                    className="fill"
                    fill={isLight ? 'var(--dark-text)' : 'var(--light-text)'}
                    d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"
                />
            </svg>
        </button>
    )
}

export default Skip
