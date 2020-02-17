import { useContext } from 'react'

import Head from 'next/head'

import { Metadata } from 'components/atoms/metadataProvider'
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
    let { showingPlaylist, isLight } = useContext(Metadata)

    return (
        <ErrorBoundary>
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
                        style={{
                            display: showingPlaylist ? 'none' : 'flex',
                        }}
                    >
                        <Info />
                        <Slider />
                        <Controller />
                    </section>
                    <Footer />
                    {showingPlaylist ? <Playlists /> : null}
                </div>
            </main>
            <Overlay />
        </ErrorBoundary>
    )
}

export default MusicPlayerLayout
