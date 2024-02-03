import React, { useEffect, useState } from 'react'

import SearchPanel from '../components/shared/SearchPanel'
import GenreList from '../components/pages/home/GenreList'
import PlayList from '../components/pages/home/PlayList'
import styled from 'styled-components'

const Home = () => {
  return (
    <>
      <Container>
        <SearchPanel />
        <GenreList />
        <PlayList />
      </Container>
    </>
  )
}

export default Home

const Container = styled.div`
  max-width: 770px;
  margin: auto;
`
