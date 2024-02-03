import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0 0 123px 0;
    background:#111111;
    font-family: 'Inter', sans-serif;
  }



  p,h1,h2,h3,h4,h5,h6,span,ul,a,button{
    list-style:none;
    background:none;
    outline:none;
    border:none;
    padding:0;
    margin:0;
    text-decoration:none;
  }
  
`

export default GlobalStyle
