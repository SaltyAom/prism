import { useEffect, useState, useCallback, useContext } from 'react'

import store from 'stores'

import Info from 'components/molecules/info'

import FastAverageColor from 'fast-average-color/dist'
import { Metadata } from 'components/atoms/metadataProvider'

import { isServer } from 'libs/helpers'

import './music-cover.styl'

const MusicCover = () => {
    let [width, updateWidth] = useState(0)

    let { showingPlaylist, track } = useContext(Metadata)

    useEffect(() => {
        if (isServer) return

        updateWidth(window.innerWidth)
        window.addEventListener('resize', () => {
            requestAnimationFrame(() => updateWidth(window.innerWidth))
        })
    }, [])

    let loaded = useCallback(image => {
        let color = new FastAverageColor()

        setTimeout(
            () => store.set('isLight', color.getColor(image).isLight),
            100
        )
    }, [])

    return (
        <header id="music-header">
            <img
                id="music-cover"
                className={showingPlaylist ? '-collapse' : ''}
                src={track.cover}
                onLoad={() => loaded(event.target)}
                style={{
                    width: width * 0.85,
                    height: width * 0.85,
                    boxShadow: `0 12px 40px rgba(0,0,0,.625)`,
                }}
            />
            {showingPlaylist ? <Info alignLeft /> : null}
        </header>
    )
}

export default MusicCover
