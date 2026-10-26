import React from 'react'
import Home from './pages/Home'
import { ReactLenis } from 'lenis/react'
import { ViewModeProvider } from './context/ViewModeContext'
import "./App.css"

const App = () => {
  return (
    <ViewModeProvider>
      <div className='home-app'>
        <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }} />
        <Home />
      </div>
    </ViewModeProvider>
  )
}

export default App
