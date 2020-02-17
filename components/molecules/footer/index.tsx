import MusicPlaylistsToggler from 'components/atoms/playlists-toggler'
import VolumeController from 'components/molecules/volumeController'

import './music-playlists.styl'

const Footer = () => (
    <footer id="music-footer">
        <MusicPlaylistsToggler />
        <VolumeController />
    </footer>
)

export default Footer
