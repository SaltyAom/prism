import { useState, useEffect, useCallback } from 'react'

import store from 'stores'

import { isServer } from 'libs/helpers'

import './volume-modifier.styl'

const VolumeModifier = () => {
    let [isLight, updateTheme] = useState(store.get('isLight')),
        [volume, updateVolume] = useState(100)

    useEffect(() => {
        if (isServer) return

        updateVolume(window.music.volume * 100)
        updateTheme(store.get('isLight'))
        store.subscribe('isLight', (state: any) => updateTheme(state))
    }, [])

    let handleDrag = useCallback(() => {
        let slider = document.getElementById('volume-slider') as HTMLInputElement,
            value = +slider.value
        
        updateVolume(value)
        store.set("volume", value / 100)
        window.music.volume = value / 100
    }, [])

    return (
        <section id="volume-modifier">
            <input
                id="volume-slider"
                className={isLight ? '-light' : ''}
                type="range"
                min={0}
                max={100}
                value={volume}
                onInput={() => handleDrag()}
            />
            <div
                id="volume-intensity"
                className={isLight ? '-light' : ''}
                style={{ width: `${volume * .92}%` }}
            />
        </section>
    )
}

export default VolumeModifier