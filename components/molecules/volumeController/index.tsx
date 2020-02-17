import { useContext } from 'react'

import { Metadata } from 'components/atoms/metadataProvider'

import VolumeIcon from 'components/atoms/volumeIcon'
import VolumeModifier from 'components/atoms/volumeModifier'

import './volume-controller.styl'

const VolumeController = () => {
    let { editingVolume } = useContext(Metadata)

    return (
        <section
            id="volume-controller"
            className={editingVolume ? '-expanded' : ''}
        >
            {editingVolume ? <VolumeModifier /> : null}
            <VolumeIcon />
        </section>
    )
}

export default VolumeController
