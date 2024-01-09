import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { KEY } from './key'

export const spotifyCoreApi = createApi({
  reducerPatch: 'spotifyCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', KEY)

      return headers
    },
  }),

  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => 'charts/track' }),
    getSongsBySearch: builder.query({
      query: ({ searchTerm, locale, offset }) => {
        return `search?term=${searchTerm}&locale=${locale}&offset=${offset}`
      },
    }),
  }),
})

export const { useGetTopChartsQuery, useGetSongsBySearchQuery } = spotifyCoreApi
