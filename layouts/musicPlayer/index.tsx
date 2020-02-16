import { Fragment, useEffect, useState } from 'react'

import Head from 'next/head'

import store from 'stores'

import ErrorBoundary from 'components/atoms/errorBoundary'
import Slider from 'components/atoms/slider'
import Overlay from 'components/atoms/overlay'
import Cover from 'components/molecules/cover'
import Controller from 'components/molecules/controller'
import Info from 'components/molecules/info'
import Playlists from 'components/molecules/playlists'
import Footer from 'components/molecules/footer'

import './music-player.styl'

import MusicPlayerType from './types'

const MusicPlayerLayout: MusicPlayerType = () => {
    let [isLight, updateTheme] = useState(false),
        [isCollapse, updateCollapse] = useState(false)

    useEffect(() => {
        store.subscribe('isLight', (state: boolean) => {
            updateTheme(state)

            if (state) document.body.style.backgroundColor = '#fff'
            else document.body.style.backgroundColor = '#000'
        })

        store.subscribe('showPlaylist', (state: boolean) =>
            updateCollapse(state)
        )
    }, [])

    return (
        <ErrorBoundary>
            <Fragment>
                <Head>
                    <title>Prism</title>
                </Head>
                <main
                    id="music-player"
                    style={{
                        backgroundColor: isLight
                            ? `rgba(255,255,255,.2)`
                            : `rgba(0,0,0,.2)`,
                    }}
                >
                    <Cover />
                    <div id="music-visual">
                        <section
                            id="music-detail"
                            style={{ display: isCollapse ? 'none' : 'flex' }}
                        >
                            <Info />
                            <Slider />
                            <Controller />
                        </section>
                        <Footer />
                        {isCollapse ? <Playlists /> : null}
                    </div>
                </main>
                <Overlay />
            </Fragment>
        </ErrorBoundary>
    )
}

export default MusicPlayerLayout
