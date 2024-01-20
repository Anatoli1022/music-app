import React, { useEffect, useState } from 'react'
import { useGetListQuery, useGetAlbumsQuery } from '../../../redux/services/spotifyCore'
// import { useDispatch } from 'react-redux'
// import { updateSearch } from '../../../redux/features/playerSlice'
import styled from 'styled-components'
import Loader from '../../shared/Loader'
import PlayPause from '../../shared/PlayPause'

const GenreList: React.FC = () => {
  const { data, isFetching, error } = useGetListQuery({
    id: 'track-similarities-id-424767377',
    locale: 'en-US',
  })

  return (
    <>
      {data ? (
        <AlbumList albums={data.resources.albums} />
      ) : isFetching ? (
        <Loader />
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : null}
    </>
  )
}

interface AlbumListProps {
  albums: Record<string, any>[]
}

const AlbumList: React.FC<AlbumListProps> = ({ albums }) => {
  const [visibleAlbums, setVisibleAlbums] = useState(3) // Измените начальное количество видимых альбомов по вашему усмотрению
  const albumsArray = []
  const handleShowMore = () => {
    setVisibleAlbums((prevVisibleAlbums) => prevVisibleAlbums + 3) // Измените шаг по вашему усмотрению
  }

  //изменить количество ключей альбомов
  const albumIds = Object.values(albums)
    .slice(0, 1)
    .map((album) => album.id)
  const albumsIdsArray = albumIds.map((item, i) => {
    const {
      data: albumData,
      isFetching: isAlbumFetching,
      error: albumError,
    } = useGetAlbumsQuery({
      id: item,
      locale: 'en-US',
    })
    if (isAlbumFetching) {
      return <Loader />
    }

    if (albumData) {
      albumsArray.push(albumData)
      // console.log(albumsArray)
    }
    // console.log(albumsArray)
  })

  // const dispatch = useDispatch()
  // const handleClick = () => {
  //   dispatch(updateSearch(''))
  //   console.log('delte ')
  // }
  return (
    <>
      <MainGenreList>
        {albumsArray.slice(0, visibleAlbums).map((albumData, i) => {
          console.log(albumData)

          // if (isAlbumFetching) {
          //   return <Loader />
          // }

          // if (albumError) {
          //   return <div>Error fetching albums: {albumError.message}</div>
          // }

          const artworkUrl = albumData?.data[0]?.attributes?.artwork.url
          const modifiedUrl = artworkUrl.replace('{w}', '269').replace('{h}', '239')
          // console.log(albumData?.data[0].relationships.tracks.data)
          console.log(albumData)
          return (
            <GenreCard key={i}>
              {/* {albumData?.data[0]?.id} */}
              <ImageAlbum src={modifiedUrl} alt='' />

              <ButtonWrapper>
                {/* <div onClick={handleClick}> */}
                <PlayPause
                  activeSong={albumData?.data[0].relationships.tracks.data[0]}
                  // i={i}

                  data={albumData?.data[0].relationships.tracks.data}
                />
                {/* </div> */}
              </ButtonWrapper>
              <Background></Background>
              <TracksWrapper>
                <Tracks>{albumData?.data[0].relationships.tracks.data.length} Tracks</Tracks>
              </TracksWrapper>
            </GenreCard>
          )
        })}
      </MainGenreList>{' '}
      <ShowMoreButton onClick={handleShowMore} style={{ color: 'white' }}>
        show more &gt; &gt;
      </ShowMoreButton>
    </>
  )
}

export default GenreList

const ShowMoreButton = styled.button`
  cursor: pointer;
  margin-top: 20px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.28px;
  text-decoration-line: underline;
  text-transform: capitalize;
  background: var(--A, linear-gradient(94deg, #b5179e -13.04%, #7209b7 124.22%));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const MainGenreList = styled.div`
  display: flex;
  column-gap: 24px;
  margin-top: 100px;
  flex-wrap: wrap;
  row-gap: 24px;
`

const GenreCard = styled.div`
  position: relative;
`

const ImageAlbum = styled.img`
  border-radius: 20px;
`
const ButtonWrapper = styled.div`
  position: absolute;
  right: 28px;
  bottom: 14px;
  z-index: 2;
`

const TracksWrapper = styled.div`
  padding: 0 28px 12px 28px;
  z-index: 1;
  position: relative;
`
const Tracks = styled.p`
  color: #fff;

  font-size: 12px;
`

const Background = styled.div`
  background: rgba(69, 69, 69, 0.7);
  border-radius: 0px 0px 20px 20px;
  backdrop-filter: blur(15.5px);
  position: absolute;
  width: 100%;
  height: 68px;

  bottom: 2px;
`
