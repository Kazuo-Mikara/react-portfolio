import React from 'react'
import Home from './pages/Home'
import { ReactLenis } from 'lenis/react'
import "./App.css"

const App = () => {
  return (
    <div className='home-app'>
      <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }} />
      <Home />
    </div>
  )
}

export default App
