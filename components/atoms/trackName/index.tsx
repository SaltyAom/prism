import { useContext, useState, useEffect } from 'react'

import store from "stores"

import { Metadata } from 'components/atoms/metadataProvider'

import { getNextTrack } from 'libs/track'

import './track-name.styl'

const TrackName = () => {
    let { isLight, active } = useContext(Metadata)

    let [ nextTrack, updateNextTrack ] = useState("")

    useEffect(() => {
        updateNextTrack(store.get("track")[getNextTrack()].title)
    }, [active])

    return (
        <article id="track-next">
            <svg
                id="track-icon"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
            >
                <path
                    className="fill"
                    fill={isLight ? 'var(--dark-text)' : 'var(--light-text)'}
                    d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z"
                />
            </svg>
            <h2
                id="track-name"
                style={{
                    color: isLight ? 'var(--dark-text)' : 'var(--light-text)',
                }}
            >
                {nextTrack}
            </h2>
        </article>
    )
}

export default TrackName
