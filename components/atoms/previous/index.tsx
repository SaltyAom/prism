import { useState, useEffect, useCallback } from 'react'

import store from 'stores'

import './previous.styl'

const Previous = () => {
    let [isLight, updateTheme] = useState(store.get('isLight'))

    useEffect(() => {
        updateTheme(store.get('isLight'))
        store.subscribe('isLight', (state: any) => updateTheme(state))
    })

    let goBackward = useCallback(() => {
        if (window.music.currentTime > 5) {
            window.music.currentTime = 0
            return store.set("time", window.music.currentTime)
        }

        if (store.get('active') + 1 < store.get('track').length)
            store.set('active', `${+store.get('active') + 1}`)
        else store.set('active', '0')

        return store.set("time", window.music.currentTime)
    }, [])

    return (
        <button id="previous-track-button" onClick={() => goBackward()}>
            <svg
                id="previous-track"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
            >
                <path
                    className="fill"
                    fill={isLight ? 'var(--dark-text)' : 'var(--light-text)'}
                    d="M7 6c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1zm3.66 6.82l5.77 4.07c.66.47 1.58-.01 1.58-.82V7.93c0-.81-.91-1.28-1.58-.82l-5.77 4.07c-.57.4-.57 1.24 0 1.64z"
                />
            </svg>
        </button>
    )
}

export default Previous
