import MusicPlaylistsToggler from 'components/atoms/playlists-toggler'
import VolumeController from '../volumeController'

import './music-playlists.styl'

const Footer = () => {
    return (
        <footer id="music-footer">
            <MusicPlaylistsToggler />
            <VolumeController />
        </footer>
    )
}

export default Footer
