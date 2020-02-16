import { NextPage } from "next"

import MusicPlayerLayout from "layouts/musicPlayer"

import ILanding from "pageTypes/index"

const Landing: NextPage<ILanding> = () => <MusicPlayerLayout />

export default Landing