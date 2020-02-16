import { NextPage } from "next"

import MusicPlayer from "layouts/musicPlayer"

import ILanding from "pageTypes/index"

const Landing: NextPage<ILanding> = () => <MusicPlayer />

export default Landing