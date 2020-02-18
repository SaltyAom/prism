import { useContext } from 'react'

import dynamic from "next/dynamic"

import { Metadata } from 'components/atoms/metadataProvider'

import VolumeIcon from 'components/atoms/volumeIcon'

import './volume-controller.styl'

const VolumeModifier = dynamic(() => import("components/atoms/volumeModifier"))

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
