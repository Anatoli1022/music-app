import React from 'react'
import { useSelector } from 'react-redux'

import styled from 'styled-components'
import PlayPause from './PlayPause'

const ListCard: React.FC = ({ item, i, data }) => {
  const { title, images } = item
  const activeTrack = useSelector((state) => state.player.activeSong)
  const active = useSelector((state) => state.player.isPlaying)

  console.log(active)
  console.log(activeTrack)

  return (
    <Item isActive={activeTrack === item && active}>
      <TrackInfoContainer>
        <TrackNumber>{i}</TrackNumber>
        <TrackImage src={images.coverart} />
        <TrackTitle>{title}</TrackTitle>
      </TrackInfoContainer>

      <PlayPause activeTrack={activeTrack} item={item} i={i} />
    </Item>
  )
}

export default ListCard

const Item = styled.li<{ isActive: boolean }>`
  color: ${({ isActive }) => (isActive ? '#7209B7' : '#b8b8b8;')};
  background: rgba(35, 35, 35, 0.3);
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
const TrackImage = styled.img`
  border-radius: 50%;
  margin-right: 20px;
  max-width: 58px;
`
