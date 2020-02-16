import { useState, useEffect } from "react"

import store from "stores"
 
import Title from 'components/atoms/title'
import Artist from 'components/atoms/artist'

import "./music-info.styl"

import MusicInfoType from "./types"

const MusicInfo: MusicInfoType = ({ alignLeft = false }) => {
    let [title, updateTitle] = useState(""),
        [artist, updateArtist] = useState("")

    useEffect(() => {
        updateTitle(store.get('track')[+store.get('active')].title)
        updateArtist(store.get('track')[+store.get('active')].artist)

        store.subscribe('active', (index: number) => {
            updateTitle(store.get('track')[index].title)
            updateArtist(store.get('track')[index].artist)
        })
    }, [])

    return (
        <article id="music-info" className={alignLeft ? "-align-left" : ""}>
            <Title>{title}</Title>
            <Artist>{artist}</Artist>
        </article>
    )
}

export default MusicInfo
