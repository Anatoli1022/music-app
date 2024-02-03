import React from 'react'
import GlobalStyle from './theme/globalStyles'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import MainPage from './pages/MainPage'

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<MainPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
