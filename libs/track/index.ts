import store from 'stores'

export const getNextTrack = () => {
    let currentTrackIndex = +store.get('active')

    if(currentTrackIndex + 1 < store.get('track').length)
        return currentTrackIndex + 1
    else 
        return 0
},
    getPreviousTrack = () => {
        let currentTrackIndex = +store.get('active')

        if(currentTrackIndex > 0)
            return currentTrackIndex - 1
        else 
            return store.get("track").length - 1
    },
    updateTrack = (newTrack: number) => { 
        store.set("active", newTrack) 
        store.set("time", 0)
    }