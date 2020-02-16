import { memo } from 'react'

import store from 'stores'

import Title from 'components/atoms/title'
import Artist from 'components/atoms/artist'

import ListType from './types'

import './list.styl'

const List: ListType = memo(({ title, artist, cover, isLight, index }) => (
    <li
        className={`music-list ${isLight ? '-light' : ''}`}
        onClick={() => store.set('active', `${index}`)}
        tabIndex={0}
    >
        <img className="cover" src={cover} />
        <section className="info">
            <Title>{title}</Title>
            <Artist>{artist}</Artist>
        </section>
    </li>
))

export default List
