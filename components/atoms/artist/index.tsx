import { useEffect, useState } from 'react'

import store from 'stores'

import './artist.styl'

const Artist = ({ children }) => {
    let [isLight, updateTheme] = useState(false)

    useEffect(() => {
        updateTheme(store.get("isLight"))
        store.subscribe('isLight', (state: any) => updateTheme(state))
    }, [])

    return (
        <p
            id="music-artist"
            style={{ color: isLight ? 'var(--dark-text)' : 'var(--light-text)' }}
        >
            {children}
        </p>
    )
}

export default Artist
