import { FunctionComponent } from "react"

interface ListProps {
    title: string
    artist: string
    cover: string
    isLight: boolean
    index: number
}

type ListType = FunctionComponent<ListProps>
export default ListType