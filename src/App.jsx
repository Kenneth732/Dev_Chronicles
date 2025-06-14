

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Contact from './pages/Contact'
import Subscribe from './components/Subscribe'
import ArticlePage from './components/ArticlePage'
import AboutPage from './pages/About'



function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
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


