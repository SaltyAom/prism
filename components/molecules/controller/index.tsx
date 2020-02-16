import { memo } from 'react'

import Skip from 'components/atoms/skip'
import Previous from 'components/atoms/previous'
import Play from 'components/atoms/play'

import './controller.styl'

const Controller = memo(() => (
    <section id="controller">
        <Previous />
        <Play />
        <Skip />
    </section>
))

export default Controller
