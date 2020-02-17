import { useContext } from 'react'

import { Metadata } from 'components/atoms/metadataProvider'

import './overlay.styl'

const Overlay = () => (
    <img id="music-overlay" src={useContext(Metadata).track.cover} />
)

export default Overlay
