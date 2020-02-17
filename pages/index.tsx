import { memo } from 'react'

import { NextPage } from 'next'

import MusicPlayer from 'layouts/musicPlayer'
import MetadataProvider from 'components/atoms/metadataProvider'

import ILanding from 'pageTypes/index'

const Landing: NextPage<ILanding> = memo(() => (
    <MetadataProvider>
        <MusicPlayer />
    </MetadataProvider>
))

export default Landing
