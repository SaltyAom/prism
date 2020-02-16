import { useEffect, useState } from 'react'

import store from 'stores'

import './title.styl'

const Title = ({ children }) => {
    let [isLight, updateTheme] = useState(false)

    useEffect(() => {
        updateTheme(store.get("isLight"))
        store.subscribe('isLight', (state: any) => updateTheme(state))
    }, [])

    return (
        <h1
            id="music-title"
            style={{ color: isLight ? 'var(--dark-text)' : 'var(--light-text)' }}
        >
            {children}
        </h1>
    )
}

export default Title