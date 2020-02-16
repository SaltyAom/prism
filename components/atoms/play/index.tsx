import { useState, useEffect, memo, useCallback } from 'react'

import store from 'stores'

import { isServer } from 'libs/helpers'

import './play.styl'

import './types'

const Skip = memo(() => {
    let [isLight, updateTheme] = useState(store.get('isLight')),
        [isPlaying, setPlaying] = useState(false)

    useEffect(() => {
        updateTheme(store.get('isLight'))
        store.subscribe('isLight', (state: boolean) => updateTheme(state))

        if (isServer) return

        window.music = new Audio(store.get('track')[store.get('active')].src)
        store.subscribe('active', (index: number) => {
            let volume = `${window.music.volume}`

            window.music.pause()
            window.music = new Audio(store.get('track')[+index].src)
            window.music.play()
            window.music.volume = +volume

            setPlaying(true)
            window.music.onended = () => musicEnded()
        })

        window.music.onended = () => musicEnded()

        store.subscribe('isPlaying', (state: boolean) => {
            if (!state) window.music.pause()
            else window.music.play()

            setPlaying(state)
        })

        document.addEventListener('keydown', ({ code }) => {
            if (code !== 'Space') return

            document.getElementById('play-track-button').click()
            ;(document.activeElement as HTMLElement).blur()
        })

        return () => window.music.pause()
    }, [])

    let musicEnded = useCallback(() => {
        setPlaying(false)
    }, [])

    return isPlaying ? (
        <button
            id="play-track-button"
            onClick={() => store.set('isPlaying', !isPlaying)}
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
            onClick={() => store.set('isPlaying', !isPlaying)}
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
})

export default Skip
