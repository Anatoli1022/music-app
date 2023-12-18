import React from 'react'
import styled from 'styled-components'
const Error: React.FC = () => {
  return <MainError>Something went wrong. Please try again</MainError>
}

export default Error

const MainError = styled.span`
  display: block;
  font-size: 20px;
  color: white;
  margin: auto;
  text-align: center;
`
