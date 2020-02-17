import { memo, useContext } from 'react'

import { Metadata } from 'components/atoms/metadataProvider'

import './title.styl'

const Title = memo(({ children }) => (
        <h1
            id="music-title"
            style={{
                color: useContext(Metadata).isLight ? 'var(--dark-text)' : 'var(--light-text)',
            }}
        >
            {children}
        </h1>
    )
)

export default Title
