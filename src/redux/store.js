import { configureStore } from '@reduxjs/toolkit'
import playerReducer from './features/playerSlice'

import { spotifyCoreApi } from './services/spotifyCore'
export const store = configureStore({
  reducer: {
    api: spotifyCoreApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(spotifyCoreApi.middleware),
})
