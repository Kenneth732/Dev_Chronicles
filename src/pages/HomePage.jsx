import React from 'react'
import Hero from './Hero'
import FeaturedArticles from '../components/FeaturedArticles'
import Newsletter from '../components/Newsletter'
import PodcastSection from '../components/PodcastSection'
import TopicsSection from '../components/TopicsSection'
import ProjectsSection from '../components/ProjectsSection'
import Testimonials from '../components/Testimonials'
import Contact from './Contact'

const HomePage = () => {
  return (
    <div>
      <Hero />
      <FeaturedArticles />
      <PodcastSection />
      <TopicsSection />
      <ProjectsSection />
      <Newsletter />
      <Testimonials />
      <Contact />
    </div>
  )
}

export default HomePage
