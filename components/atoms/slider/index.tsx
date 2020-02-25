import { useState, useEffect, useRef, useCallback, useContext } from 'react'

import { Metadata } from 'components/atoms/metadataProvider'

import { isServer, toTimeFormat } from 'libs/helpers'
import { emitTime } from 'libs/time'

import './slider.styl'
import store from 'stores'

const Slider = () => {
    let [process, updateProcess] = useState(0),
        [timer, updateTimer] = useState(0),
        [end, updateEnd] = useState(0)

    let isDragging = useRef(false),
        initialEnd = useRef(1),
        playBeforeDrag = useRef(false)

    let { isLight, active, currentTime, isPlaying } = useContext(Metadata)

    useEffect(() => {
        if (isServer) return

        let updateSlider = setInterval(() => {
            if (!window.music.paused && !isDragging.current) updateTime()
        }, 500)

        return () => clearInterval(updateSlider)
    }, [])

    useEffect(() => {
        if (!isServer) init()
    }, [active])

    useEffect(() => {
        if (!isServer && typeof window.music !== 'undefined') updateTime()
    }, [isPlaying, currentTime])

    let init = useCallback(
        () =>
            setTimeout(() => {
                if (isNaN(window.music.duration)) return init()

                let slider = document.getElementById(
                        'slider'
                    ) as HTMLInputElement,
                    value = +slider.value

                updateEnd(window.music.duration)
                initialEnd.current = window.music.duration
                updateProcess((value / initialEnd.current) * 100)
            }, 50),
        []
    )

    let handleDrag = useCallback(() => {
        let slider = document.getElementById('slider') as HTMLInputElement,
            value = +slider.value

        updateTimer(value)
        window.music.currentTime = value
        updateProcess((value / initialEnd.current) * 100)
    }, [])

    let handleDragStart = useCallback(() => {
        if(!isDragging.current)
            playBeforeDrag.current = store.get("isPlaying")

        isDragging.current = true

        if (!window.music.paused) window.music.pause()
    }, [])

    let handleDragEnd = useCallback(() => {
        setTimeout(() => {
            if (playBeforeDrag.current) window.music.play()
            isDragging.current = false
            emitTime()
        }, 50)
    }, [])

    let updateTime = useCallback(() => {
        updateTimer(window.music.currentTime)
        updateProcess((window.music.currentTime / initialEnd.current) * 100)
    }, [])

    return (
        <section id="track-slider">
            <input
                id="slider"
                className={isLight ? '-light' : ''}
                type="range"
                min={0}
                max={end}
                value={timer}
                onChange={() => handleDrag()}
                onInput={() => handleDrag()}
                onMouseDown={() => handleDragStart()}
                onMouseUp={() => handleDragEnd()}
            />
            <div
                id="process"
                className={isLight ? '-light' : ''}
                style={{ width: `calc(${process}% + 8px)` }}
            />
            <div id="track-time">
                <p
                    id="track-current-time"
                    style={{
                        color: isLight
                            ? 'var(--dark-text)'
                            : 'var(--light-text)',
                    }}
                >
                    {toTimeFormat(timer)}
                </p>
                <p
                    id="track-end-time"
                    style={{
                        color: isLight
                            ? 'var(--dark-text)'
                            : 'var(--light-text)',
                    }}
                >
                    {toTimeFormat(end)}
                </p>
            </div>
        </section>
    )
}

export default Slider
