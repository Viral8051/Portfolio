import { useState } from 'react'
import { BrowserRouter as Router, Link, Route, Routes, useLocation } from 'react-router-dom';

import './App.css'
import './customcss.css'
import Header from './Components/Header/Header'
import Hero from './Components/Hero/Hero'
import Navbar from './Components/Navbar/Navbar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Hero/>
      <Router>
        <Navbar/>
      </Router>
      
    </>
  )
}

export default App
