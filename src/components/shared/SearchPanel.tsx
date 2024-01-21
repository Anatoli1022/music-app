import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import search from '../../images/search.svg'
import close from '../../images/close.svg'
import { useDispatch } from 'react-redux'
import { updateSearch } from '../../redux/features/playerSlice'
import { useDebounce } from 'use-debounce'


const SearchPanel = () => {
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500)

  const handleSubmit = (e) => {
    setSearchTerm(e)
  }

  useEffect(() => {
    dispatch(updateSearch(debouncedSearchTerm))
  }, [debouncedSearchTerm, dispatch])

  const handleClick = () => {
    setSearchTerm('')
  }

  return (
    <SearchWrapper>
      <form autoComplete='off'>
        <Input
          type='text'
          placeholder='Search Music, Artist, Genre'
          onChange={(e) => handleSubmit(e.target.value)}
          value={searchTerm}
        />
        <SearchImage src={search} alt='' loading='eager' aria-hidden='true' />
        {searchTerm && <CloseImage src={close} alt='' loading='eager' aria-hidden='true' onClick={handleClick} />}
      </form>
    </SearchWrapper>
  )
}

export default SearchPanel

const SearchWrapper = styled.div`
  position: relative;
`
const Input = styled.input`
  padding-top: 15px;
  width: 91%;
  padding-bottom: 15px;
  padding-left: 66px;
  font-size: 16px;
  max-width: 770px;
  border-radius: 36px;
  background: rgba(65, 65, 65, 0.65);
  color: #b8b8b8;
  transition: 0.3s;
  border: none;
  &:focus-visible {
    outline: none;
  }
  &::placeholder {
    color: #b8b8b8;
    font-size: 16px;
    letter-spacing: 1px;
  }
`

const SearchImage = styled.img`
  position: absolute;
  top: 15px;
  left: 15px;
`

const CloseImage = styled.img`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
`
const ButtonClose = styled.button``
