interface ListItem {
  attributes: {
    name: string
    artwork: {
      url: string
    }
  }
  title?: string
  images: {
    coverart: string
  }
}

interface ListCardProps {
  item: ListItem
  i: number
  data: []
  activeSong: object
  key: number
}

interface PlayerState {
  activeSong: object
  isPlaying: boolean
  search: string
  currentSongs: []
}
interface RootState {
  player: PlayerState
}

interface PlayPauseProps {
  activeSong: any
  item: any
  i: number
  data: []
}

interface PlayListProps {
  data: []
}


interface AlbumListProps {
  albums: Record<string, ListItem>
}