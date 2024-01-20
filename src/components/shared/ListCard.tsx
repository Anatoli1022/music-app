import React from 'react'
import { useSelector } from 'react-redux'

import styled from 'styled-components'
import PlayPause from './PlayPause'

const ListCard: React.FC<ListCardProps> = ({ item, i, data }) => {
  const { title, images } = item
  const name = () => (item.attributes ? item.attributes.name : null)
  const image = () => (item.attributes ? item.attributes.artwork.url.replace('{w}', '58').replace('{h}', '58') : null)
  const activeSong = useSelector((state: RootState) => state.player.activeSong)
  const active = useSelector((state: RootState) => state.player.isPlaying)

  return (
    <Item isActive={activeSong === item && active}>
      <TrackInfoContainer>
        <TrackNumber>{i + 1}</TrackNumber>
        <TrackImage src={item.images ? images.coverart : image()} isActive={activeSong === item && active} />
        <TrackTitle>{item.title ? title : name()}</TrackTitle>
      </TrackInfoContainer>

      <PlayPause activeSong={activeSong} item={item} i={i} data={data} />
    </Item>
  )
}

export default ListCard

const Item = styled.li<{ isActive: boolean }>`
  color: #b8b8b8;
  background: rgba(35, 35, 35, 0.3);
  box-shadow: ${({ isActive }) => (isActive ? '6px 4px 100px 0px rgba(0, 0, 0, 0.4)' : 'none')};
  background-image: ${({ isActive }) =>
    isActive ? 'linear-gradient(94deg, #b5179e -13.04%, #7209b7 124.22%)' : 'none'};
  background-clip: ${({ isActive }) => (isActive ? 'text' : 'none')};
  -webkit-background-clip: ${({ isActive }) => (isActive ? 'text' : 'none')};
  -webkit-text-fill-color: ${({ isActive }) => (isActive ? ' transparent' : 'none')};
  display: flex;
  align-items: center;
  transition: 0.3s;
  justify-content: space-between;
  padding: 12px 17px 12px 17px;
`

const TrackInfoContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 40px;
`
const TrackTitle = styled.p`
  font-size: 18px;
`

const TrackNumber = styled.span`
  font-family: Inter;
  font-size: 27px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.54px;
  text-transform: capitalize;
`
const TrackImage = styled.img<{ isActive: boolean }>`
  border-radius: 50%;
  border: ${({ isActive }) => (isActive ? '2px solid #B5179E' : 'none')};
  max-width: 58px;
`
