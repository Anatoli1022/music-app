import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { playPause, setActiveSong } from '../../redux/features/playerSlice'
import styled from 'styled-components'

interface PlayPauseProps {
  activeTrack: any
  item: any
  i: number
}

interface PlayerState {
  isPlaying: boolean
}

const PlayPause: React.FC<PlayPauseProps> = ({ activeTrack, item, i }) => {
  const dispatch = useDispatch()
  const active = useSelector((state: { player: PlayerState }) => state.player.isPlaying)

  const handlePlayPause = () => {
    if (active) {
      dispatch(playPause(false))
      if (activeTrack !== item) {
        dispatch(setActiveSong({ song: item, i }))
        dispatch(playPause(true))
      }
    } else {
      dispatch(playPause(true))
      if (activeTrack !== item) {
        dispatch(setActiveSong({ song: item, i }))
      }
    }
  }

  return (
    <TrackButton type='button' onClick={handlePlayPause}>
      {activeTrack === item && active ? (
        <svg xmlns='http://www.w3.org/2000/svg' width='18' height='22' viewBox='0 0 18 26' fill='none'>
          <rect width='5' height='26' rx='2.5' fill='url(#paint0_linear_9_59)' />
          <rect x='13' width='5' height='26' rx='2.5' fill='url(#paint1_linear_9_59)' />
          <defs>
            <linearGradient
              id='paint0_linear_9_59'
              x1='-0.644654'
              y1='-4.00001'
              x2='6.63814'
              y2='-3.91413'
              gradientUnits='userSpaceOnUse'
            >
              <stop stop-color='#B5179E' />
              <stop offset='1' stop-color='#7209B7' />
            </linearGradient>
            <linearGradient
              id='paint1_linear_9_59'
              x1='12.3553'
              y1='-4.00001'
              x2='19.6381'
              y2='-3.91413'
              gradientUnits='userSpaceOnUse'
            >
              <stop stop-color='#B5179E' />
              <stop offset='1' stop-color='#7209B7' />
            </linearGradient>
          </defs>
        </svg>
      ) : (
        <svg xmlns='http://www.w3.org/2000/svg' width='19' height='22' viewBox='0 0 19 22' fill='none'>
          <path
            d='M18.5 10.134C19.1667 10.5189 19.1667 11.4811 18.5 11.866L2 21.3923C1.33333 21.7772 0.5 21.2961 0.5 20.5263L0.5 1.47372C0.5 0.703919 1.33333 0.222795 2 0.607695L18.5 10.134Z'
            fill='#B8B8B8'
          />
        </svg>
      )}
    </TrackButton>
  )
}

export default PlayPause

const TrackButton = styled.button`
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
`
