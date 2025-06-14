

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Contact from './pages/Contact'
import Subscribe from './components/Subscribe'
import ArticlePage from './components/ArticlePage'
import AboutPage from './pages/About'
import FrontendDevelopment from './pages/FrontendDevelopment'
import BackendEngineering from './pages/BackendEngineering'
import DevOpsCloud from './pages/DevOpsCloud'



function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/frontend" element={<FrontendDevelopment />} />
          <Route path="/backend" element={<BackendEngineering />} />
          <Route path="/devops" element={<DevOpsCloud />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/subscribe" element={<Subscribe />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App


