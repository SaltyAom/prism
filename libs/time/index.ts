import store from "stores"

export const emitTime = () => store.set("time", +store.get("time") + 1)