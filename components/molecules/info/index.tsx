import { useContext } from "react"

import { Metadata } from "components/atoms/metadataProvider"
 
import Title from 'components/atoms/title'
import Artist from 'components/atoms/artist'

import "./music-info.styl"

import MusicInfoType from "./types"

const MusicInfo: MusicInfoType = ({ alignLeft = false }) => {
    let { track: { title, artist } } = useContext(Metadata)

    return (
        <article id="music-info" className={alignLeft ? "-align-left" : ""}>
            <Title>{title}</Title>
            <Artist>{artist}</Artist>
        </article>
    )
}

export default MusicInfo
