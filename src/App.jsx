import { useState } from 'react'

import './App.css'
import './customcss.css'
import Header from './Components/Header/Header'
import Hero from './Components/Hero/Hero'
import PortData from './Components/portfolioinfo/PortData'
import AboutMe from './Components/AboutMe/AboutMe'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Hero/>
      <AboutMe/>
      <PortData/>
      
    </>
  )
}

export default App
