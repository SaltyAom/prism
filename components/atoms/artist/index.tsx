import { useContext, memo } from 'react'

import { Metadata } from 'components/atoms/metadataProvider'

import './artist.styl'

const Artist = memo(({ children }) => (
    <p
        id="music-artist"
        style={{
            color: useContext(Metadata).isLight
                ? 'var(--dark-text)'
                : 'var(--light-text)',
        }}
    >
        {children}
    </p>
))

export default Artist
