import Store from "arkflows"

const store = new Store()

const track = [
    {
        title: "Tower Light Firework",
        cover: "/images/mock.jpg",
        artist: "iMeiden",
        src: "/music/tower_light_firework.m4a",
    },
    {
        title: "Kimi wa Melody",
        cover: "/images/mock2.jpg",
        artist: "BNK48",
        src: "/music/kimi_wa_melody.m4a",
    }
]

store.create("isPlaying", false)
store.create("isLight", true)
store.create("active", 0)
store.create("track", track)
store.create("time", 0)
store.create("showPlaylist", false)
store.create("volume", 0)
store.create("editVolume", false)

export default store