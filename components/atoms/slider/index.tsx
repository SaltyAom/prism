import { useState, useEffect, useRef, useCallback } from 'react'

import store from 'stores'

import { isServer, toTimeFormat } from 'libs/helpers'

import './slider.styl'

const Slider = () => {
    let [isLight, updateTheme] = useState(false),
        [process, updateProcess] = useState(0),
        [timer, updateTimer] = useState(0),
        [end, updateEnd] = useState(0)

    let initialEnd = useRef(1)

    let isDragging = useRef(false)

    useEffect(() => {
        if (isServer) return

        updateTheme(store.get('isLight'))
        store.subscribe('isLight', (state: any) => updateTheme(state))

        setTimeout(() => init(), 50)
        store.subscribe('active', () => init())

        store.subscribe(['isPlaying', 'time'], () => updateTime())

        setInterval(() => {
            if (isDragging.current || window.music.paused) return

            updateTime()
        }, 500)
    }, [])

    let init = useCallback(
        () =>
            setTimeout(() => {
                let slider = document.getElementById(
                        'slider'
                    ) as HTMLInputElement,
                    value = +slider.value

                if (isNaN(window.music.duration)) return init()

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
                onInput={() => handleDrag()}
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