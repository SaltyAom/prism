import { useState, useEffect, useCallback } from 'react'

import store from 'stores'

import './skip.styl'

const Skip = () => {
    let [isLight, updateTheme] = useState(store.get('isLight'))

    useEffect(() => {
        updateTheme(store.get('isLight'))
        store.subscribe('isLight', (state: any) => updateTheme(state))
    })

    let goForward = useCallback(() => {
        if (store.get('active') + 1 < store.get('track').length)
            store.set('active', `${+store.get('active') + 1}`)
        else store.set('active', '0')
    }, [])

    return (
        <button id="skip-track-button" onClick={() => goForward()}>
            <svg
                id="skip-track"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
            >
                <path
                    className="fill"
                    fill={isLight ? 'var(--dark-text)' : 'var(--light-text)'}
                    d="M7.58 16.89l5.77-4.07c.56-.4.56-1.24 0-1.63L7.58 7.11C6.91 6.65 6 7.12 6 7.93v8.14c0 .81.91 1.28 1.58.82zM16 7v10c0 .55.45 1 1 1s1-.45 1-1V7c0-.55-.45-1-1-1s-1 .45-1 1z"
                />
            </svg>
        </button>
    )
}

export default Skip
