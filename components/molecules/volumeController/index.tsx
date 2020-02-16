import { useState, useEffect } from 'react'

import store from 'stores'

import VolumeIcon from 'components/atoms/volumeIcon'
import VolumeModifier from 'components/atoms/volumeModifier'

import "./volume-controller.styl"

const VolumeController = () => {
    let [isEditing, updateEditing] = useState(false)

    useEffect(() => {
        store.subscribe('editVolume', (state: boolean) => updateEditing(state))
    }, [])

    return (
        <section id="volume-controller" className={isEditing ? "-expanded" : ""}>
            {isEditing ? <VolumeModifier /> : null}
            <VolumeIcon />
        </section>
    )
}

export default VolumeController
