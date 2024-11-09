import { useState } from 'react'

import './App.css'
import './customcss.css'
import Header from './Components/Header/Header'
import Hero from './Components/Hero/Hero'
import PortData from './Components/portfolioinfo/PortData'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Hero/>
      <PortData/>
    </>
  )
}

export default App
