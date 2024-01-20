import React, { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import PlayPause from '../../shared/PlayPause'
import { useDispatch } from 'react-redux'
import { playPause, nextSong, prevSong } from '../../../redux/features/playerSlice'
import repeat from '../../../images/repeat.svg'
import random from '../../../images/random.svg'
import '../../../types/types'

const Player: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const song = useSelector((state: { player: PlayerState }) => state.player)
  const active = useSelector((state: { player: PlayerState }) => state.player.isPlaying)
  const activeSong = useSelector((state: { player: PlayerState }) => state.player.activeSong)
  const isMounted = useRef(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [currentVolume, setCurrentVolume] = useState(100)
  const [isRepeat, setIsRepeat] = useState(false)
  const [isRandom, setIsRandom] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isMounted.current) {
      if (active) {
        play()
      } else {
        pause()
      }
    } else {
      isMounted.current = true
    }
  }, [active, activeSong])

  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(audioRef.current?.currentTime || 0)
    }

    const handleEnded = () => {
      setCurrentTime(0)

      if (isRepeat) {
        play()
      } else if (isRandom) {
        const totalSongs = song.currentSongs.length
        const randomIndex = Math.floor(Math.random() * totalSongs)

        console.log(randomIndex)
        pause()
        dispatch(nextSong(randomIndex))
        play()
      } else {
        dispatch(playPause(false))
        playNextSong()
      }
    }

    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate)

      audioRef.current.addEventListener('ended', handleEnded)
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate)

        audioRef.current.removeEventListener('ended', handleEnded)
      }
    }
  }, [activeSong, isRepeat, isRandom])

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  }
  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }

  const playNextSong = () => {
    const newIndex = song.currentIndex + 1

    pause()
    dispatch(nextSong(newIndex))
    play()
  }

  const playPrevSong = () => {
    pause()
    const newIndex = song.currentIndex - 1
    if (newIndex > 0 || newIndex === 0) {
      dispatch(prevSong(newIndex))
    }
    play()
  }

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat)
  }

  const playRandomSong = () => {
    setIsRandom(!isRandom)
    console.log(isRandom)
  }

  const setVolume = (e) => {
    const newValue = Number(e.target.value)

    setCurrentVolume(newValue)
    audioRef.current.volume = newValue
  }

  const handleSeekChange = (e) => {
    const newTime = Number(e.target.value)
    setCurrentTime(newTime)
    audioRef.current.currentTime = newTime
  }

  return (
    <MainPlayer>
      <Button onClick={playPrevSong}>
        <Triangle style={{ transform: 'rotate(-90deg)' }} />
      </Button>
      {isMounted.current && <PlayPause />}
      <Button onClick={playNextSong}>
        <Triangle style={{ transform: 'rotate(90deg)' }} />
      </Button>
      {activeSong && (activeSong.hub.actions[1].uri || activeSong.attributes.previews[0].url) && (
        <audio ref={audioRef} src={activeSong.hub.actions[1]?.uri || activeSong.attributes.previews[0].url}></audio>
      )}
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
        value={currentVolume}
        onChange={setVolume}
      />
      <Button onClick={playRandomSong}>
        <RandomImage src={random} alt='Random' isRandom={isRandom} />
      </Button>
      <Button onClick={toggleRepeat}>
        <RepeatImage src={repeat} alt='Repeat' isRepeat={isRepeat} />
      </Button>
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
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  position: fixed;
`

const Button = styled.button`
  padding-left: 5px;
  padding-right: 5px;
  margin-left: 15px;
  margin-right: 15px;
  cursor: pointer;
`

const RandomImage = styled.img<{ isRandom: boolean }>`
  filter: ${(props) =>
    props.isRandom
      ? 'invert(50%) sepia(100%) saturate(5494%) hue-rotate(270deg) brightness(110%) contrast(117%)'
      : 'none'};
`

const RepeatImage = styled.img<{ isRepeat: boolean }>`
  filter: ${(props) =>
    props.isRepeat
      ? 'invert(50%) sepia(100%) saturate(5494%) hue-rotate(270deg) brightness(110%) contrast(117%)'
      : 'none'};
`
const Triangle = styled.div`
  width: 0px;
  height: 0px;
  border-style: solid;
  position: relative;
  border-width: 0 11px 19px 11px;
  border-radius: 2px;
  border-color: transparent transparent rgb(184, 184, 184) transparent;
  &::after {
    content: '';
    height: 22px;
    width: 2px;
    top: -10px;
    right: 0;
    position: absolute;
    background: rgb(184, 184, 184);
    transform: rotate(90deg);
  }
`

const InputVolume = styled.input`
  cursor: pointer;
  border-radius: 20px;
  -webkit-appearance: none;
  appearance: none;
  background-color: #464646;
  height: 5px;
  width: 100px;
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
      `linear-gradient( #B5179E 0%, #7209B7 ${props.value * 1.1}%,  #B5179E ${props.value * 1.1}%,#B5179E 0%);`};

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
      `linear-gradient(to right, #B5179E 0%, #7209B7 ${props.value * 1.1}%,  #B5179E ${
        props.value * 1.1
      }%,#464646  0%);`};

    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    height: 5px;
  }
`
