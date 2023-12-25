import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
     min-height: 100vh;
    background:#111111;
    font-family: 'Inter', sans-serif;
  }



  p,h1,h2,h3,h4,h5,h6,span,ul,a{
    list-style:none;
    padding:0;
    margin:0;
    text-decoration:none;
  }
  
`

export default GlobalStyle
