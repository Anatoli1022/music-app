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
  }),
})

export const { useGetTopChartsQuery } = spotifyCoreApi
