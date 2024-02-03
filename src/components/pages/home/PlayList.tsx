import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import headphones from '../../../images/headphones.svg'
import Loader from '../../shared/Loader'
import { useGetSongsBySearchQuery, useGetTopChartsQuery } from '../../../redux/services/spotifyCore'
import '../../../types/types'

import ListCard from '../../shared/ListCard'

const PlayList: React.FC = () => {
  const searchTerm = useSelector((state: { player: PlayerState }) => state.player.search)
  const musicPlayerSongs = useSelector((state: { player: PlayerState }) => state.player.currentSongs)
  const activeSong = useSelector((state: RootState) => state.player.activeSong)
  let information

 

  switch (true) {
    case searchTerm === '':
      information = useGetTopChartsQuery()
      break

    case searchTerm !== undefined:
      information = useGetSongsBySearchQuery({
        searchTerm,
        locale: 'en-US',
        offset: '0',
        limit: '5',
      })

      break
  }
 
  const { data, isFetching, error } = information

  const songs: [] = data?.tracks?.hits?.map((song) => song.track)

  if (isFetching)
    return (
      <PlaylistPlayerContainer>
        <Loader />
      </PlaylistPlayerContainer>
    )
  if (error) return <div>Error</div>

  function renderListCards() {
    if (songs && Array.isArray(songs)) {
 

      return songs.map((item, i) => <ListCard item={item} i={i} data={songs} key={i} activeSong={activeSong} />)
    } else if (musicPlayerSongs.length > 0) {
      return musicPlayerSongs.map((item, i) => {
    
        return <ListCard item={item} i={i} data={musicPlayerSongs} key={i} activeSong={activeSong} />
      })
    } else if (data && data.tracks && Array.isArray(data.tracks)) {
    
      return data.tracks.map((item, i) => (
        <ListCard item={item} i={i} data={data.tracks} key={i} activeSong={activeSong} />
      ))
    } else {
      return null 
    }
  }

  return (
    <PlaylistPlayerContainer>
      <img src={headphones} alt='' loading='eager' aria-hidden='true' />
      <Title>top music</Title>

      <TrackList>{renderListCards()}</TrackList>
    </PlaylistPlayerContainer>
  )
}

export default PlayList

const PlaylistPlayerContainer = styled.div`
  margin: auto;
  margin-top: 66px;
  max-width: 600px;
`

const TrackList = styled.ul`
  margin-top: 16px;

  margin-top: 30px;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`

const Title = styled.h2`
  display: inline-block;
  color: #f1f1f1;
  font-size: 26px;
  font-weight: 600;
  letter-spacing: 0.52px;
  text-transform: capitalize;
  margin-left: 23px;
`
