import { useState, useEffect } from 'react'

import store from 'stores'

import './overlay.styl'

const Overlay = () => {
    let [coverImage, updateCover] = useState('')

    useEffect(() => {
        updateCover(store.get('track')[+store.get('active')].cover)
        store.subscribe('active', (index: number) =>
            updateCover(store.get('track')[index].cover)
        )
    }, [])

    return <img id="music-overlay" src={coverImage} />
}

export default Overlay
