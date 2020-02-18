import { memo, useContext, useMemo } from 'react'

import store from 'stores'

import { Metadata } from 'components/atoms/metadataProvider'
import List from 'components/molecules/list'

import './playlists.styl'

const Playlists = memo(() => {
    let playlists = useMemo(() => store.get("track"), [])

    return (
        <ol id="music-playlists">
            {playlists.map(({ title, artist, cover }, index) => (
                <List
                    title={title}
                    artist={artist}
                    cover={cover}
                    isLight={useContext(Metadata).isLight}
                    index={index}
                    key={index}
                />
            ))}
        </ol>
    )
})

export default Playlists
