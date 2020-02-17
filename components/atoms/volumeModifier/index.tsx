import { useCallback, useContext } from 'react'

import store from 'stores'

import { Metadata } from 'components/atoms/metadataProvider'

import './volume-modifier.styl'

const VolumeModifier = () => {
    let { isLight, volume } = useContext(Metadata)

    let handleDrag = useCallback(() => {
        let slider = document.getElementById('volume-slider') as HTMLInputElement,
            value = +slider.value
        
        store.set("volume", value)
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
                onChange={() => handleDrag()}
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