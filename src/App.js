/**
 * React Portfolio Application
 * 
 * This is the main component for Subhashish Tarafdar's portfolio website.
 * Features include:
 * - Single-page application with smooth navigation
 * - Responsive design with mobile-first approach
 * - Interactive animations using Framer Motion
 * - Five main sections: About, Projects, Skills, Resume, Contact
 * - Dynamic skill icons with unified golden color scheme
 * - Netlify deployment ready with proper meta tags
 * 
 * @author Subhashish Tarafdar
 * @version 2.0
 */

import './App.css';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function App() {
  // State management for active page navigation
  const [activePage, setActivePage] = useState('about');
  // State management for sidebar toggle (mobile)
  const [sidebarActive, setSidebarActive] = useState(false);
  /**
   * Handles page navigation and scroll behavior
   * @param {string} page - The target page identifier
   */
  const handlePageChange = (page) => {
    setActivePage(page);
    window.scrollTo(0, 0); // Smooth scroll to top on page change
  };

  /**
   * Handles sidebar toggle for mobile devices
   */
  const handleSidebarToggle = () => {
    setSidebarActive(!sidebarActive);
  };/**
   * Effect hook for loading external scripts and resources
   * Handles dynamic loading of:
   * - Ionicons for UI icons
   * Note: Removed script.js loading to prevent conflicts with React navigation
   */
  useEffect(() => {
    let ioniconsESM, ioniconsNoModule;

    // Note: CSS is now loaded directly via index.css import - no dynamic loading needed

    // Load Ionicons only if not already loaded
    if (!document.querySelector('script[src*="ionicons.esm.js"]')) {
      ioniconsESM = document.createElement('script');
      ioniconsESM.type = 'module';
      ioniconsESM.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js';
      document.head.appendChild(ioniconsESM);
    }

    if (!document.querySelector('script[src*="ionicons.js"]')) {
      ioniconsNoModule = document.createElement('script');
      ioniconsNoModule.setAttribute('nomodule', '');
      ioniconsNoModule.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js';
      document.head.appendChild(ioniconsNoModule);
    }    // Cleanup function for Ionicons if needed
    return () => {
      if (ioniconsESM && ioniconsESM.parentNode) {
        document.head.removeChild(ioniconsESM);
      }
      if (ioniconsNoModule && ioniconsNoModule.parentNode) {
        document.head.removeChild(ioniconsNoModule);
      }
    };}, []);

  /**
   * Animation variants for Framer Motion
   * These define the entrance animations for different components
   */
  
  // Sidebar animation: slides in from left
  const sidebarVariants = {
    hidden: { x: -300, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Main content animation: slides in from right with delay
  const mainContentVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2
      }
    }  };
  
  // Page transition animation: fade and slide up effect
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3
      }
    }  };

  /**
   * Main JSX Return - Portfolio Layout
   * Structure:
   * - Main container with entrance animation
   * - Sidebar with personal info and navigation
   * - Main content area with dynamic page rendering
   * - Mobile-responsive navigation bar
   */
  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { 
            staggerChildren: 0.1,
            delayChildren: 0.3 
          }
        }
      }}
    >      {/* Sidebar */}
      <motion.aside 
        className={`sidebar ${sidebarActive ? 'active' : ''}`}
        data-sidebar
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="sidebar-info">
          <motion.figure 
            className="avatar-box"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            <img src="./assets/images/my-avatar.png" alt="Richard hanrick" width="80" />
          </motion.figure>

          <motion.div 
            className="info-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >            <h1 className="name" title="Subhashish Tarafdar">Subhashish <br/>Tarafdar</h1>
            <p className="title">React Native Developer</p>
          </motion.div>          <motion.button 
            className="info_more-btn" 
            data-sidebar-btn
            onClick={handleSidebarToggle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Show Contacts</span>
            <ion-icon name="chevron-down"></ion-icon>
          </motion.button>
        </div>

        <div className="sidebar-info_more">
          <div className="separator"></div>

          <ul className="contacts-list">
            <li className="contact-item">
              <div className="icon-box">
                <ion-icon name="mail-outline"></ion-icon>
              </div>              <div className="contact-info">
                <p className="contact-title">Email</p>
                <a href="mailto:anshfitness143@gmail.com" className="contact-link">anshfitness143@gmail.com</a>
              </div>
            </li>

            <li className="contact-item">
              <div className="icon-box">
                <ion-icon name="phone-portrait-outline"></ion-icon>
              </div>              <div className="contact-info">
                <p className="contact-title">Phone</p>
                <a href="tel:+918107951997" className="contact-link">+91 81079 51997</a>
              </div>
            </li>

            <li className="contact-item">
              <div className="icon-box">
                <ion-icon name="logo-linkedin"></ion-icon>
              </div>
              <div className="contact-info">
                <p className="contact-title">LinkedIn</p>
                <a href="https://in.linkedin.com/in/subhashish-tarafdar-1692331a4" className="contact-link" target="_blank" rel="noopener noreferrer">Subhashish Tarafdar</a>
              </div>
            </li>

            <li className="contact-item">
              <div className="icon-box">
                <ion-icon name="location-outline"></ion-icon>
              </div>
              <div className="contact-info">
                <p className="contact-title">Location</p>
                <address>Bikaner, Rajasthan</address>
              </div>
            </li>
          </ul>

          <div className="separator"></div>          <ul className="social-list">
            <li className="social-item">
              <a href="https://in.linkedin.com/in/subhashish-tarafdar-1692331a4" className="social-link" target="_blank" rel="noopener noreferrer">
                <ion-icon name="logo-linkedin"></ion-icon>
              </a>
            </li>
            <li className="social-item">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#" className="social-link" onClick={(e) => e.preventDefault()}>
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
            </li>
            <li className="social-item">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#" className="social-link" onClick={(e) => e.preventDefault()}>
                <ion-icon name="logo-twitter"></ion-icon>
              </a>
            </li>
            <li className="social-item">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#" className="social-link" onClick={(e) => e.preventDefault()}>
                <ion-icon name="logo-instagram"></ion-icon>
              </a>
            </li>
          </ul>
        </div>
      </motion.aside>

      {/* Main Content */}
      <motion.div 
        className="main-content"
        variants={mainContentVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Navigation */}
        <motion.nav 
          className="navbar"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >          <motion.ul 
            className="navbar-list"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.9
                }
              }
            }}
            initial="hidden"
            animate="visible"
          >
            <motion.li 
              className="navbar-item"
              variants={{
                hidden: { opacity: 0, y: -10 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <motion.button 
                className={`navbar-link ${activePage === 'about' ? 'active' : ''}`}
                data-nav-link="about"
                onClick={() => handlePageChange('about')}
                whileHover={{ scale: 1.05, color: "#fad76e" }}
                whileTap={{ scale: 0.95 }}
              >
                About
              </motion.button>
            </motion.li>
   
            <motion.li 
              className="navbar-item"
              variants={{
                hidden: { opacity: 0, y: -10 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <motion.button 
                className={`navbar-link ${activePage === 'projects' ? 'active' : ''}`}
                data-nav-link="projects"
                onClick={() => handlePageChange('projects')}
                whileHover={{ scale: 1.05, color: "#fad76e" }}
                whileTap={{ scale: 0.95 }}
              >
                Projects
              </motion.button>
            </motion.li>

            <motion.li 
              className="navbar-item"
              variants={{
                hidden: { opacity: 0, y: -10 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <motion.button 
                className={`navbar-link ${activePage === 'skills' ? 'active' : ''}`}
                data-nav-link="skills"
                onClick={() => handlePageChange('skills')}
                whileHover={{ scale: 1.05, color: "#fad76e" }}
                whileTap={{ scale: 0.95 }}
              >
                Skills
              </motion.button>
            </motion.li>

            <motion.li 
              className="navbar-item"
              variants={{
                hidden: { opacity: 0, y: -10 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <motion.button 
                className={`navbar-link ${activePage === 'resume' ? 'active' : ''}`}
                data-nav-link="resume"
                onClick={() => handlePageChange('resume')}
                whileHover={{ scale: 1.05, color: "#fad76e" }}
                whileTap={{ scale: 0.95 }}
              >
                Resume
              </motion.button>
            </motion.li>

            <motion.li 
              className="navbar-item"
              variants={{
                hidden: { opacity: 0, y: -10 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <motion.button 
                className={`navbar-link ${activePage === 'contact' ? 'active' : ''}`}
                data-nav-link="contact"
                onClick={() => handlePageChange('contact')}
                whileHover={{ scale: 1.05, color: "#fad76e" }}
                whileTap={{ scale: 0.95 }}
              >
                Contact
              </motion.button>
            </motion.li>
          </motion.ul>
        </motion.nav>        {/* About Section */}
        <motion.article 
          className={`about ${activePage === 'about' ? 'active' : ''}`}
          data-page="about"
          style={{ display: activePage === 'about' ? 'block' : 'none' }}
          variants={pageVariants}
          initial="hidden"
          animate={activePage === 'about' ? "visible" : "hidden"}
        >
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="h2 article-title">About me</h2>
          </motion.header>          <motion.section 
            className="about-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p>
              Over 6+ years in the IT industry with expertise in mobile and web development. Proven ability to manage projects from planning through production in cross-functional teams. Proficient in React Native, Flutter, and Node.js, with strong experience using AWS Amplify for scalable backend services.
            </p>
            <p>
              Skilled in Firebase (Firestore, Authentication, Cloud Functions) and integrated social logins (Google, Facebook, Apple). Developed and consumed RESTful APIs, implemented push notifications and monetization strategies with Google AdMob and Stripe. Demonstrated architect-level design and native iOS development with Swift, alongside unit testing to ensure application stability. Excellent communicator and team player with a robust problem-solving foundation.
            </p>
          </motion.section>

          {/* What I'm Doing Section */}
          <motion.section 
            className="service"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="h3 service-title">What I'm Doing</h3>

            <ul className="service-list">              <motion.li 
                className="service-item"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.03,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="service-icon-box">
                  <img src="./assets/images/icon-dev.svg" alt="Mobile Apps icon" width="40" />
                </div>
                <div className="service-content-box">
                  <h4 className="h4 service-item-title">Mobile Apps</h4>
                  <p className="service-item-text">
                    Professional development of cross-platform applications using React Native and Flutter for iOS and Android platforms.
                  </p>
                </div>
              </motion.li>              <motion.li 
                className="service-item"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.03,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="service-icon-box">
                  <img src="./assets/images/icon-design.svg" alt="Web Development icon" width="40" />
                </div>
                <div className="service-content-box">
                  <h4 className="h4 service-item-title">Web Development</h4>
                  <p className="service-item-text">
                    High-quality development of responsive websites and web applications using modern technologies like React and Node.js.
                  </p>
                </div>
              </motion.li>              <motion.li 
                className="service-item"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.03,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="service-icon-box">
                  <img src="./assets/images/icon-app.svg" alt="Cloud Solutions icon" width="40" />
                </div>
                <div className="service-content-box">
                  <h4 className="h4 service-item-title">Cloud Solutions</h4>
                  <p className="service-item-text">
                    Scalable backend services and cloud architecture using AWS Amplify, Firebase, and Azure for robust application infrastructure.
                  </p>
                </div>
              </motion.li>              <motion.li 
                className="service-item"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.03,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="service-icon-box">
                  <img src="./assets/images/icon-photo.svg" alt="API Integration icon" width="40" />
                </div>
                <div className="service-content-box">
                  <h4 className="h4 service-item-title">API Integration</h4>
                  <p className="service-item-text">
                    Expert integration of third-party APIs, payment gateways like Stripe, and social authentication systems for enhanced functionality.
                  </p>
                </div>
              </motion.li>
            </ul>
          </motion.section>        </motion.article>     
             {/* Resume Section */}
     
          {/* Projects Section */}
        <article className={`portfolio ${activePage === 'projects' ? 'active' : ''}`} data-page="projects" style={{ display: activePage === 'projects' ? 'block' : 'none' }}>
          <header>
            <h2 className="h2 article-title">Projects</h2>
          </header>          <section className="projects">
            <div className="project-grid">
              <motion.div 
                className="project-card active" 
                data-filter-item 
                data-category="react native"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.03,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="project-content">
                  <h3 className="project-title">Sandlines</h3>
                  <p className="project-description">Voter engagement platform built with React Native, TypeScript, Firebase, and Stripe integration for secure payments and real-time data synchronization.</p>
                  <div className="project-technologies">
                    <span className="tech-badge">React Native</span>
                    <span className="tech-badge">TypeScript</span>
                    <span className="tech-badge">Firebase</span>
                    <span className="tech-badge">Stripe</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="project-card active" 
                data-filter-item 
                data-category="react native"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.03,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="project-content">
                  <h3 className="project-title">RippleStreet</h3>
                  <p className="project-description">Social event platform leveraging React Native and AWS Amplify for scalable backend services, user authentication, and real-time event management.</p>
                  <div className="project-technologies">
                    <span className="tech-badge">React Native</span>
                    <span className="tech-badge">AWS Amplify</span>
                    <span className="tech-badge">Authentication</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="project-card active" 
                data-filter-item 
                data-category="react native"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.03,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="project-content">
                  <h3 className="project-title">Noritz Procard</h3>
                  <p className="project-description">Professional installer tool with local database management, data encryption, and offline functionality for field technicians.</p>
                  <div className="project-technologies">
                    <span className="tech-badge">React Native</span>
                    <span className="tech-badge">SQLite</span>
                    <span className="tech-badge">Encryption</span>
                    <span className="tech-badge">Offline</span>
                  </div>
                </div>              </motion.div>

              <motion.div 
                className="project-card active" 
                data-filter-item 
                data-category="flutter"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.03,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="project-content">
                  <h3 className="project-title">Face App</h3>
                  <p className="project-description">Face detection application built with Flutter and Google ML Kit for real-time facial recognition and analysis features.</p>
                  <div className="project-technologies">
                    <span className="tech-badge">Flutter</span>
                    <span className="tech-badge">Google ML Kit</span>
                    <span className="tech-badge">Computer Vision</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="project-card active" 
                data-filter-item 
                data-category="react native"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.03,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="project-content">
                  <h3 className="project-title">Identify That</h3>
                  <p className="project-description">Plant identification app using React Native with Wikipedia API integration for comprehensive plant information and recognition capabilities.</p>
                  <div className="project-technologies">
                    <span className="tech-badge">React Native</span>
                    <span className="tech-badge">Wikipedia API</span>
                    <span className="tech-badge">Image Recognition</span>
                  </div>                </div>
              </motion.div>
            </div>
          </section>
        </article>{/* Skills Section */}
        <article className={`skills ${activePage === 'skills' ? 'active' : ''}`} data-page="skills" style={{ display: activePage === 'skills' ? 'block' : 'none' }}>
          <header>
            <h2 className="h2 article-title">Skills</h2>
          </header>

          <section className="skills-content">
            {/* Cross-platform & Native Development */}
            <motion.div 
              className="skills-category"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >              <h3 className="skills-category-title">Cross-platform & Native Development</h3>
              <div className="skills-grid">
                <motion.div 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.03,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="skill-icon react-native">
                    <ion-icon name="phone-portrait-outline"></ion-icon>
                  </div>
                  <span className="skill-name">React Native</span>
                </motion.div>
                <motion.div 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.03,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="skill-icon ios">
                    <ion-icon name="logo-apple"></ion-icon>
                  </div>                  <span className="skill-name">iOS (Swift)</span>
                </motion.div>
                <motion.div 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.03,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="skill-icon flutter">
                    <ion-icon name="diamond-outline"></ion-icon>
                  </div>
                  <span className="skill-name">Flutter</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Languages & Packages */}
            <motion.div 
              className="skills-category"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >              <h3 className="skills-category-title">Languages & Packages</h3>
              <div className="skills-grid">
                <motion.div 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.03,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="skill-icon javascript">
                    <ion-icon name="logo-javascript"></ion-icon>
                  </div>
                  <span className="skill-name">JavaScript</span>
                </motion.div>
                <motion.div 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.03,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="skill-icon typescript">
                    <ion-icon name="code-slash-outline"></ion-icon>
                  </div>
                  <span className="skill-name">TypeScript</span>
                </motion.div>
              </div>
            </motion.div>            {/* State Management & Navigation */}
            <motion.div 
              className="skills-category"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="skills-category-title">State Management & Navigation</h3>
              <div className="skills-grid">
                <motion.div 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.03,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="skill-icon redux">
                    <ion-icon name="logo-react"></ion-icon>
                  </div>
                  <span className="skill-name">React Redux</span>
                </motion.div>
                <motion.div 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.03,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="skill-icon navigation">
                    <ion-icon name="navigate-outline"></ion-icon>
                  </div>
                  <span className="skill-name">React Navigation</span>
                </motion.div>
              </div>
            </motion.div>            {/* Backend & Cloud Services */}
            <motion.div 
              className="skills-category"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3 className="skills-category-title">Backend & Cloud Services</h3>
              <div className="skills-grid">
                <motion.div 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.03,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="skill-icon nodejs">
                    <ion-icon name="logo-nodejs"></ion-icon>
                  </div>
                  <span className="skill-name">Node.js</span>
                </motion.div>
                <motion.div 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.03,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="skill-icon express">
                    <ion-icon name="server-outline"></ion-icon>
                  </div>
                  <span className="skill-name">Express.js</span>
                </motion.div>
                <motion.div 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.03,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="skill-icon aws">
                    <ion-icon name="cloud-outline"></ion-icon>
                  </div>
                  <span className="skill-name">AWS Amplify</span>
                </motion.div>
                <motion.div 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.3 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.03,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="skill-icon azure">
                    <ion-icon name="layers-outline"></ion-icon>
                  </div>
                  <span className="skill-name">MS Azure</span>
                </motion.div>
              </div>
            </motion.div>            {/* Databases & Authentication */}
            <motion.div 
              className="skills-category"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <h3 className="skills-category-title">Databases & Authentication</h3>
              <div className="skills-grid">
                <motion.div 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.03,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="skill-icon firestore">
                    <ion-icon name="flame-outline"></ion-icon>
                  </div>
                  <span className="skill-name">Firebase Firestore</span>
                </motion.div>
                <motion.div 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.5 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.03,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="skill-icon auth">
                    <ion-icon name="shield-checkmark-outline"></ion-icon>
                  </div>
                  <span className="skill-name">Firebase Authentication</span>
                </motion.div>
                <motion.div 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.03,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="skill-icon functions">
                    <ion-icon name="flash-outline"></ion-icon>
                  </div>
                  <span className="skill-name">Cloud Functions</span>
                </motion.div>
              </div>
            </motion.div>            {/* Push & Notifications */}
            <motion.div 
              className="skills-category"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <h3 className="skills-category-title">Push & Notifications</h3>
              <div className="skills-grid">
                <motion.div 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.7 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.03,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="skill-icon notifications">
                    <ion-icon name="notifications-outline"></ion-icon>
                  </div>
                  <span className="skill-name">Firebase Push Notifications</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Monetization & Payments */}
            <motion.div 
              className="skills-category"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <h3 className="skills-category-title">Monetization & Payments</h3>
              <div className="skills-grid">
                <motion.div 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.8 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.03,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="skill-icon stripe">
                    <ion-icon name="card-outline"></ion-icon>
                  </div>
                  <span className="skill-name">Stripe</span>
                </motion.div>
                <motion.div 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.9 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.03,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="skill-icon admob">
                    <ion-icon name="trending-up-outline"></ion-icon>
                  </div>
                  <span className="skill-name">Google AdMob</span>
                </motion.div>
              </div>
            </motion.div>

            {/* APIs & Integrations */}
            <motion.div 
              className="skills-category"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              <h3 className="skills-category-title">APIs & Integrations</h3>
              <div className="skills-grid">
                <motion.div 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 2.0 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.03,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="skill-icon places">
                    <ion-icon name="location-outline"></ion-icon>
                  </div>
                  <span className="skill-name">Google Places Autocomplete</span>
                </motion.div>
                <motion.div 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 2.1 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.03,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="skill-icon woocommerce">
                    <ion-icon name="storefront-outline"></ion-icon>
                  </div>
                  <span className="skill-name">WooCommerce API</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Development Tools & Collaboration */}
            <motion.div 
              className="skills-category"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.8 }}
            >
              <h3 className="skills-category-title">Development Tools & Collaboration</h3>
              <div className="skills-grid">
                <motion.div 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 2.2 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.03,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="skill-icon xcode">
                    <ion-icon name="logo-apple"></ion-icon>
                  </div>
                  <span className="skill-name">Xcode</span>
                </motion.div>
                <motion.div 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 2.3 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.03,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="skill-icon android-studio">
                    <ion-icon name="logo-android"></ion-icon>
                  </div>
                  <span className="skill-name">Android Studio</span>
                </motion.div>
                <motion.div 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 2.4 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.03,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="skill-icon vscode">
                    <ion-icon name="code-slash-outline"></ion-icon>
                  </div>
                  <span className="skill-name">VSCode</span>
                </motion.div>
                <motion.div 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 2.5 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.03,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="skill-icon git">
                    <ion-icon name="git-branch-outline"></ion-icon>
                  </div>
                  <span className="skill-name">Git</span>
                </motion.div>
                <motion.div 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 2.6 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.03,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="skill-icon devops">
                    <ion-icon name="people-outline"></ion-icon>
                  </div>
                  <span className="skill-name">Azure DevOps</span>
                </motion.div>
                <motion.div 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 2.7 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.03,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="skill-icon github">
                    <ion-icon name="logo-github"></ion-icon>
                  </div>
                  <span className="skill-name">GitHub</span>
                </motion.div>
              </div>
            </motion.div>
          </section>
        </article>   
                <article className={`resume ${activePage === 'resume' ? 'active' : ''}`} data-page="resume" style={{ display: activePage === 'resume' ? 'block' : 'none' }}>
          <header>
            <h2 className="h2 article-title">Resume</h2>
          </header>

 

          <section className="resume-preview">
            <div className="title-wrapper">
              <div className="icon-box">
                <ion-icon name="document-text-outline"></ion-icon>
              </div>
              <h3 className="h3">Resume Preview</h3>
            </div>
            <div className="pdf-preview">
              <iframe
                src="/assets/resume/Subhashish_Tarafdar.pdf"
                width="100%"
                height="600"
                style={{
                  border: '1px solid var(--jet)',
                  borderRadius: '16px',
                  backgroundColor: 'var(--eerie-black-2)'
                }}
                title="Resume Preview">
                <p>Your browser does not support PDFs. <a href="/assets/resume/Subhashish_Tarafdar.pdf">Download the PDF</a>.</p>
              </iframe>
            </div>
          </section>        </article>   
               {/* Contact Section */}
        <article className={`contact ${activePage === 'contact' ? 'active' : ''}`} data-page="contact" style={{ display: activePage === 'contact' ? 'block' : 'none' }}>
          <header>
            <h2 className="h2 article-title">Contact</h2>
          </header>          <section className="mapbox" data-mapbox>
            <figure>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d226697.52002081395!2d73.03059944726562!3d28.01783080!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393744e7c5c33db1%3A0x73328ac51ac3d7c8!2sBikaner%2C%20Rajasthan%2C%20India!5e0!3m2!1sen!2sin!4v1647608789441!5m2!1sen!2sin"
                width="400" height="300" loading="lazy" title="Google Map"></iframe>
            </figure>
          </section>

          <section className="contact-form">
            <h3 className="h3 form-title">Contact Form</h3>

            <form action="#" className="form" data-form>
              <div className="input-wrapper">
                <input type="text" name="fullname" className="form-input" placeholder="Full name" required data-form-input />
                <input type="email" name="email" className="form-input" placeholder="Email address" required data-form-input />
              </div>

              <textarea name="message" className="form-input" placeholder="Your Message" required data-form-input></textarea>

              <button className="form-btn" type="submit" data-form-btn>
                <ion-icon name="paper-plane"></ion-icon>
                <span>Send Message</span>
              </button>
            </form>
          </section>
        </article>
      </motion.div>
    </motion.main>
  );
}

export default App;

