import React, { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import PlayPause from '../../shared/PlayPause'
import { playPause } from '../../../redux/features/playerSlice'
import { useDispatch } from 'react-redux'
interface PlayerState {
  isPlaying: boolean
}

interface PlayerSong {
  song: object
  activeSong: object
}

const Player: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const song = useSelector((state: { player: PlayerSong }) => state.player)
  const active = useSelector((state: { player: PlayerState }) => state.player.isPlaying)
  const activeSong = useSelector((state: { player: PlayerSong }) => state.player.activeSong)
  const isMounted = useRef(false)
  const [currentTime, setCurrentTime] = useState(0)

  const dispatch = useDispatch()

  useEffect(() => {
    if (isMounted.current) {
      if (active) {
        pause()
      } else {
        play()
      }
    } else {
      isMounted.current = true
    }
  }, [active, activeSong])

  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(audioRef.current?.currentTime || 0)
    }

    const handleLoadedMetadata = () => {
      console.log('Длительность аудиофайла:', audioRef.current?.duration, 'секунд')
    }

    const handleEnded = () => {
      console.log('Песня завершена')
      setCurrentTime(0)
      dispatch(playPause(false))
      // Выполните дополнительные действия, когда песня завершена
    }

    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate)
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata)
      audioRef.current.addEventListener('ended', handleEnded)
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate)
        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata)
        audioRef.current.removeEventListener('ended', handleEnded)
      }
    }
  }, [active])

  const play = () => audioRef.current.pause()
  const pause = () => audioRef.current.play()
  const setVolume = (value) => (audioRef.current.volume = value)

  const handleSeekChange = (e) => {
    const newTime = Number(e.target.value)
    setCurrentTime(newTime)
    audioRef.current.currentTime = newTime
  }

  return (
    <MainPlayer>
      {isMounted.current && <PlayPause />}

      {song.currentIndex && <audio ref={audioRef} src={song.activeSong.hub.actions[1].uri}></audio>}
      <InputCurrent
        type='range'
        min='0'
        max={audioRef.current?.duration || 0}
        value={currentTime}
        onChange={handleSeekChange}
      />
      <InputVolume
        type='range'
        min='0'
        max='1'
        step='0.01'
        defaultValue='1'
        onChange={(e) => setVolume(e.target.value)}
      />
    </MainPlayer>
  )
}

export default Player

const MainPlayer = styled.div`
  background: #111;
  padding-top: 35px;
  padding-bottom: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const InputVolume = styled.input`
  cursor: pointer;
  border-radius: 20px;
  -webkit-appearance: none;
  appearance: none;
  background-color: #464646;
  height: 5px;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    background-color: #7209b7;
    width: 12px;
    height: 12px;
    margin-top: -3px;
    border-radius: 20px;
  }

  &::-webkit-slider-runnable-track {
    background: ${(props) =>
      `linear-gradient( #B5179E 0%, #7209B7 ${props.value * 100}%,  #B5179E ${props.value * 100}%,#B5179E 0%);`};

    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    height: 5px;
  }
`

const InputCurrent = styled.input`
  cursor: pointer;
  border-radius: 20px;
  -webkit-appearance: none;
  appearance: none;
  background-color: #464646;
  height: 5px;
  width: 400px;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    background-color: #7209b7;
    width: 12px;
    height: 12px;
    margin-top: -3px;
    border-radius: 20px;
  }

  &::-webkit-slider-runnable-track {
    background: ${(props) =>
      `linear-gradient(to right, #B5179E 0%, #7209B7 ${props.value}%,  #B5179E ${props.value}%,#464646  0%);`};

    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    height: 5px;
  }
`
