import { useState } from 'react';
import styles from '../styles/Testimonials.module.css';

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      quote: "One of the most insightful technical minds I've worked with. Their deep understanding of distributed systems helped us scale our platform to handle 10x more traffic.",
      author: "Alex Chen",
      role: "CTO at TechScale Inc.",
      avatar: "https://i.pinimg.com/736x/ed/83/b6/ed83b60896c9e6e89d638db27d55be62.jpg"
    },
    {
      id: 2,
      quote: "Their workshops on Rust performance optimization transformed our engineering team's approach to systems programming. Measurable 40% improvement in our core services.",
      author: "Maria Rodriguez",
      role: "Engineering Director, FinTech Corp",
      avatar: "https://i.pinimg.com/736x/c7/c3/a0/c7c3a0d41bb412dab9c8979281ba3065.jpg"
    },
    {
      id: 3,
      quote: "As a conference speaker, they have this rare ability to make complex architectural concepts accessible to engineers at all levels. Standing ovation at DevConf 2023!",
      author: "Jamal Williams",
      role: "Organizer, DevConf",
      avatar: "https://i.pinimg.com/736x/6f/8c/fd/6f8cfdaeca75e26e2da81199d71cd4c9.jpg"
    }
  ];

  // Company logos data
  const companies = [
    { name: "TechScale", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaGW0HPS7ql3sTaXR5TvJX3YusGn1OYN3fng&s" },
    { name: "FinTech Corp", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE-XUV2Fxi1cU3aHdgxtKKXYW1QVzAzjbI6g&s" },
    { name: "DevConf", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvX0KxLKtEgUamFjnPrVFKyIwTCa4IsXTfpg&s" },
    { name: "React Summit", logo: "https://do3z7e6uuakno.cloudfront.net/uploads/event/logo/1141375/3d4c7371506642e70923d1a4c91cf957.png" },
    { name: "Rust Foundation", logo: "https://repository-images.githubusercontent.com/318562088/5810b900-69ff-11eb-894b-12e342b9dcf1" }
  ];

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section className={styles.testimonialsSection} id="testimonials">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>🧾 Peer Endorsements</h2>
          <p className={styles.sectionSubtitle}>What industry leaders and collaborators say about my work</p>
        </div>

        <div className={styles.testimonialContainer}>
          <button 
            onClick={prevTestimonial}
            className={styles.navButton}
            aria-label="Previous testimonial"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className={styles.testimonialContent}>
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`${styles.testimonial} ${index === activeTestimonial ? styles.active : ''}`}
              >
                <blockquote className={styles.quote}>
                  <p>"{testimonial.quote}"</p>
                </blockquote>
                <div className={styles.author}>
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author} 
                    className={styles.avatar}
                    loading="lazy"
                  />
                  <div className={styles.authorInfo}>
                    <p className={styles.authorName}>{testimonial.author}</p>
                    <p className={styles.authorRole}>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={nextTestimonial}
            className={styles.navButton}
            aria-label="Next testimonial"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className={styles.indicators}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${index === activeTestimonial ? styles.active : ''}`}
              onClick={() => setActiveTestimonial(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <div className={styles.companiesSection}>
          <p className={styles.companiesTitle}>Featured & Worked With</p>
          <div className={styles.companiesGrid}>
            {companies.map((company) => (
              <div key={company.name} className={styles.companyLogo}>
                <img 
                  src={company.logo} 
                  alt={company.name} 
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;