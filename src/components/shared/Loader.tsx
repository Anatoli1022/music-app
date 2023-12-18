import React from 'react'
import styled from 'styled-components'
const Loader: React.FC = () => {
  return <MainLoader></MainLoader>
}

export default Loader

const MainLoader = styled.span`
width: 48px;
height: 48px;
border: 5px solid #FFF;
border-bottom-color: transparent;
border-radius: 50%;
box-sizing: border-box;
animation: rotation 1s linear infinite;
display:block;
margin:auto;
@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`
