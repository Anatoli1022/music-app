import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: null,
  genreListId: '',
}
const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      state.activeSong = action.payload.song

      if (action.payload?.tracks) {
        state.currentSongs = action.payload.tracks
      } else if (action.payload?.data?.properties) {
        state.currentSongs = action.payload?.tracks
      } else {
        state.currentSongs = action.payload.tracks
      }

      state.currentIndex = action.payload.i
      state.isActive = true
    },
    nextSong: (state, action) => {
      const nextIndex = action.payload
      const currentTracks = state.currentSongs?.tracks

      if (currentTracks[nextIndex]) {
        state.activeSong = currentTracks[nextIndex]
      } else {
        state.activeSong = null
      }

      state.currentIndex = nextIndex
      state.isPlaying = true
    },

    updateCurrentSongs: (state, action) => {
      state.currentSongs = action.payload
    },

    prevSong: (state, action) => {
      const nextIndex = action.payload
      const currentTracks = state.currentSongs?.tracks

      if (currentTracks[nextIndex]) {
        state.activeSong = currentTracks[nextIndex]
      } else {
        state.activeSong = null
      }

      state.currentIndex = nextIndex
      state.isPlaying = true
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload
    },

    selectGenreListId: (state, action) => {
      state.genreListId = action.payload
    },
  },
})

export const { setActiveSong, nextSong, prevSong, playPause, selectGenreListId, updateCurrentSongs } =
  playerSlice.actions
export default playerSlice.reducer
