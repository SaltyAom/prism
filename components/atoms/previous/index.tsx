import { memo, useCallback, useContext } from 'react'

import { Metadata } from "components/atoms/metadataProvider"

import { updateTrack, getPreviousTrack } from 'libs/track'
import { emitTime } from "libs/time"

import './previous.styl'

const Previous = memo(() => {
    let goBackward = useCallback(() => {
        if (window.music.currentTime <= 5){
            updateTrack(getPreviousTrack())
            return emitTime()
        }
        
        window.music.currentTime = 0
        return emitTime()
    }, [])

    return (
        <button id="previous-track-button" onClick={() => goBackward()}>
            <svg
                id="previous-track"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
            >
                <path
                    className="fill"
                    fill={useContext(Metadata).isLight ? 'var(--dark-text)' : 'var(--light-text)'}
                    d="M7 6c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1zm3.66 6.82l5.77 4.07c.66.47 1.58-.01 1.58-.82V7.93c0-.81-.91-1.28-1.58-.82l-5.77 4.07c-.57.4-.57 1.24 0 1.64z"
                />
            </svg>
        </button>
    )
})

export default Previous
