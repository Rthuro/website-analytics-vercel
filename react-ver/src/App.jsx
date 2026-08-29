import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Analytics } from "@vercel/analytics/react"
import { Home } from './routes/Home'
import { Projects } from './routes/Projects'
import { Experiences } from './routes/Experiences'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/experience" element={<Experiences/>}/>
      </Routes>
    </Router>
    <Analytics />
    </>
  )
}

export default App
