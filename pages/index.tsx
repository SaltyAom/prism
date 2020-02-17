import { memo } from "react"

import { NextPage } from "next"

import MusicPlayer from "layouts/musicPlayer"

import ILanding from "pageTypes/index"

const Landing: NextPage<ILanding> = memo(() => <MusicPlayer />)

export default Landing