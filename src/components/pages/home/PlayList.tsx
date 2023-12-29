import React from 'react'
import styled from 'styled-components'
import { useGetTopChartsQuery } from '../../../redux/services/spotifyCore'

import Loader from '../../shared/Loader'

import ListCard from '../../shared/ListCard'

const PlayList: React.FC = () => {
  const { data, isFetching, error } = useGetTopChartsQuery()

  if (isFetching)
    return (
      <PlaylistPlayerContainer>
        <Loader />
      </PlaylistPlayerContainer>
    )
  if (error) return <div>Error</div>
  return (
    <PlaylistPlayerContainer>
      <TrackList>
        {data?.tracks.slice(0, 5).map((item, i) => {
          {
            console.log(item)
          }
          return <ListCard item={item} i={i} data={data} key={i} />
        })}
      </TrackList>
    </PlaylistPlayerContainer>
  )
}

export default PlayList

const PlaylistPlayerContainer = styled.div`
  margin-top: 66px;
`

const TrackList = styled.ul`
  margin-top: 20px;
  max-width: 600px;
  margin: auto;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`
