export const isServer = typeof window === "undefined",
    toTimeFormat = (number: number) => {
        if(isNaN(number)) return "00:00"

        let time = new Date(0)

        time.setSeconds(number)
        return time.toISOString().substr(11, 8).substr(3, 8)
    }