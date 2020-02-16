import { useEffect, useState, useCallback } from 'react'

import store from 'stores'

import FastAverageColor from 'fast-average-color/dist'

import Info from "components/molecules/info"

import { isServer } from 'libs/helpers'

import './music-cover.styl'

const MusicCover = () => {
    let [width, updateWidth] = useState(0),
        [coverImage, updateCover] = useState(''),
        [isCollapse, updateCollapse] = useState(false)

    useEffect(() => {
        if (isServer) return

        updateWidth(window.innerWidth)

        window.addEventListener('resize', () => updateWidth(window.innerWidth))

        updateCover(store.get('track')[+store.get('active')].cover)

        let active$ = store.subscribe('active', (index: number) =>
            updateCover(store.get('track')[index].cover)
        ),
        showPlaylist$ = store.subscribe("showPlaylist", (state: boolean) => {
            updateCollapse(state)
        })

        loaded(document.getElementById("music-cover"))

        return () => {
            active$.unsubscribe()
            showPlaylist$.unsubscribe()
        }
    }, [])

    let loaded = useCallback(image => {
        let color = new FastAverageColor(),
            { isLight } = color.getColor(image)

        setTimeout(() => store.set('isLight', isLight), 100)
    }, [])

    return (
        <header id="music-header">
            <img
                id="music-cover"
                className={isCollapse ? "-collapse" : ""}
                src={coverImage}
                onLoad={() => loaded(event.target)}
                style={{
                    width: width * 0.85,
                    height: width * 0.85,
                    boxShadow: `0 12px 40px rgba(0,0,0,.625)`,
                }}
            />
            { isCollapse ? <Info alignLeft /> : null }
        </header>
    )
}

export default MusicCover
