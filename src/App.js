/**
 * React Portfolio Application
 * Subhashish Tarafdar – Senior React Native Engineer | Mobile & Full-Stack
 */

import './App.css';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

function App() {
  const [activePage, setActivePage] = useState('about');
  const [sidebarActive, setSidebarActive] = useState(false);
  const [resumeZoom, setResumeZoom] = useState(1);
  const ZOOM_STEP = 0.1;
  const ZOOM_MIN = 0.5;
  const ZOOM_MAX = 2;

  const handlePageChange = (page) => {
    setActivePage(page);
    window.scrollTo(0, 0);
  };

  const handleSidebarToggle = () => {
    setSidebarActive(!sidebarActive);
  };

  useEffect(() => {
    let ioniconsESM, ioniconsNoModule;
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
    }
    return () => {
      if (ioniconsESM && ioniconsESM.parentNode) document.head.removeChild(ioniconsESM);
      if (ioniconsNoModule && ioniconsNoModule.parentNode) document.head.removeChild(ioniconsNoModule);
    };
  }, []);

  const sidebarVariants = {
    hidden: { x: -300, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  const mainContentVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 } }
  };

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay }
  });

  const stats = [
    { value: '6+', label: 'Years Experience' },
    { value: '10+', label: 'Apps Shipped' },
    { value: 'iOS & Android', label: 'Platforms' },
    { value: '3', label: 'Companies' },
  ];

  const impactAreas = [
    'Shipped 10+ apps on iOS & Android',
    'Maps, geolocation & GPS tracking',
    'Social login (Google, Apple, Facebook)',
    'Real-time via WebSockets & STOMP',
    'Push notifications (FCM, APNs, OneSignal)',
    'Biometric auth (Face ID, Touch ID)',
    'Offline-first (SQLite + sync)',
    'CI/CD: EAS, GitHub Actions, CodePush',
    'Sentry crash monitoring & Firebase Analytics',
    'Redux Toolkit, Zustand & React Query',
    'Payment, AdMob & in-app purchases',
    'App Store Connect & Play Console releases',
  ];

  const skillCategories = [
    {
      title: 'Mobile Development',
      tags: ['React Native', 'Flutter', 'Expo SDK', 'iOS (Swift)', 'Android', 'Hermes Engine'],
    },
    {
      title: 'Navigation & Routing',
      tags: ['React Navigation', 'Expo Router', 'Deep Linking', 'Universal Links', 'App Links', 'URL Schemes'],
    },
    {
      title: 'State Management',
      tags: ['Redux Toolkit', 'Zustand', 'React Query', 'TanStack Query', 'Context API', 'MobX'],
    },
    {
      title: 'Maps & Location',
      tags: ['React Native Maps', 'Google Maps SDK', 'Geolocation API', 'Background Location', 'GPS Tracking', 'Geofencing'],
    },
    {
      title: 'Auth & Social Login',
      tags: ['Google Sign-In', 'Apple Sign-In', 'Facebook Login', 'OAuth 2.0 / JWT', 'Face ID / Touch ID', 'Biometric Auth'],
    },
    {
      title: 'Firebase',
      tags: ['Firebase Auth', 'Firestore', 'FCM', 'Firebase Storage', 'Analytics', 'Crashlytics', 'Remote Config'],
    },
    {
      title: 'Push Notifications',
      tags: ['FCM (Android)', 'APNs (iOS)', 'Expo Notifications', 'OneSignal', 'Local Notifications'],
    },
    {
      title: 'Animations & UI',
      tags: ['Reanimated 2/3', 'Lottie', 'Gesture Handler', 'Animated API', 'Haptics'],
    },
    {
      title: 'Real-Time & Security',
      tags: ['WebSockets', 'STOMP / StompJS', 'Data Encryption', 'Secure Storage', 'Encrypted SQLite'],
    },
    {
      title: 'DevOps & Release',
      tags: ['EAS CI/CD', 'GitHub Actions', 'CodePush OTA', 'App Store Connect', 'Play Console', 'Vercel'],
    },
    {
      title: 'Monitoring & Testing',
      tags: ['Sentry', 'Firebase Crashlytics', 'Jest', 'RNTL', 'Flipper'],
    },
    {
      title: 'Frontend',
      tags: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'GraphQL'],
    },
    {
      title: 'Backend',
      tags: ['Node.js', 'Express.js', 'REST API', 'Prisma', 'TypeORM'],
    },
    {
      title: 'Databases',
      tags: ['PostgreSQL', 'MongoDB', 'SQLite', 'Supabase', 'Firebase Firestore'],
    },
    {
      title: 'AI & Dev Tools',
      tags: ['Cursor', 'Claude Code', 'GitHub Copilot', 'Xcode', 'Android Studio', 'VS Code'],
    },
    {
      title: 'Device Features',
      tags: ['Camera / Video', 'QR Scanning', 'ML Kit (Face Detection)', 'File System', 'Document Picker', 'Background Tasks'],
    },
    {
      title: 'Integrations',
      tags: ['Payment Gateway', 'AdMob', 'In-App Purchases', 'Social Sharing', 'i18n / l10n'],
    },
    {
      title: 'MCP Integrations',
      tags: ['GitHub MCP', 'Stitch MCP', 'Supabase MCP'],
      accent: true,
    },
  ];

  const projects = [
    {
      title: 'RippleStreet',
      label: 'Project Aurora',
      description: 'Consumer lifestyle app enabling users to participate in marketing campaigns and brand activities with deep linking and push notification flows.',
      image: '/assets/images/Ripplestreet.png',
      tech: ['React Native', 'AWS Amplify', 'Deep Linking', 'Push Notifications'],
      links: [
        { label: 'App Store', icon: 'logo-apple', url: 'https://apps.apple.com/us/app/ripple-street/id1623388148' },
        { label: 'Play Store', icon: 'logo-google-playstore', url: 'https://play.google.com/store/apps/details?id=com.ripplestreetfun' },
      ],
      featured: true,
    },
    {
      title: 'Noritz Connect',
      label: 'Project Helix',
      description: 'IoT mobile app enabling real-time monitoring and remote control of smart water heating systems with geolocation and background tasks.',
      image: '/assets/images/Noritz-Connect.png',
      tech: ['React Native', 'IoT', 'Geolocation', 'Background Tasks', 'Real-time'],
      links: [
        { label: 'App Store', icon: 'logo-apple', url: 'https://apps.apple.com/us/app/noritz-connect/id1227949334' },
        { label: 'Play Store', icon: 'logo-google-playstore', url: 'https://play.google.com/store/apps/details?id=com.noritz.iot&hl=en_IN' },
      ],
    },
    {
      title: 'Sandlines',
      label: 'Project Atlas',
      description: 'Mobile platform enabling political engagement through campaigns and real-time location-aware updates using React Native Maps and WebSockets.',
      image: '/assets/images/Sandlines.png',
      tech: ['React Native', 'TypeScript', 'Firebase', 'WebSockets', 'Maps'],
      links: [{ label: 'App Store', icon: 'logo-apple', url: 'https://apps.apple.com/us/app/sandlines/id6469634537' }],
    },
    {
      title: 'Noritz Procard',
      label: 'Project Keystone',
      description: 'Business app for members: lead management, warranties, service calls, installation guides, and companion WiFi adapter setup with QR scanning.',
      image: '/assets/images/Noritz-Procard.png',
      tech: ['React Native', 'SQLite', 'Encryption', 'Offline-first', 'QR Scan'],
      links: [
        { label: 'App Store', icon: 'logo-apple', url: 'https://apps.apple.com/us/app/procard/id1110311645' },
        { label: 'Play Store', icon: 'logo-google-playstore', url: 'https://play.google.com/store/apps/details?id=com.org.noritz' },
      ],
    },
    {
      title: 'Chromaflo',
      label: 'Project Spectrum',
      description: 'Industrial mobile tool for color formulation and pigment selection with offline-first SQLite sync and camera-based color capture.',
      image: '/assets/images/Chromaflo.png',
      tech: ['React Native', 'Camera', 'SQLite', 'Offline-first', 'Flutter'],
      links: [{ label: 'Website', icon: 'globe-outline', url: 'https://bluepony.com/pages/chromaflo' }],
    },
  ];

  const experience = [
    {
      role: 'Senior Software Engineer – Mobile & Full-Stack',
      company: 'Bacancy Technology · Remote',
      period: 'Jan 2024 – Present',
      bullets: [
        'Led full-stack delivery for enterprise products across iOS/Android and web backends (Next.js/Node.js) deployed on Vercel; managed App Store Connect and Play Console pipelines end-to-end.',
        'Integrated Google Maps, geolocation, and GPS tracking enabling real-time location workflows and geofencing for field-facing mobile users.',
        'Implemented Social Login (Google, Apple) and biometric auth (Face ID/Touch ID) to streamline and secure user onboarding flows.',
        'Delivered real-time features using WebSockets/STOMP; set up push notifications via FCM/APNs and OneSignal.',
        'Accelerated releases by automating CI/CD with EAS, GitHub Actions, and CodePush OTA across dev/staging/production environments.',
      ],
    },
    {
      role: 'Software Engineer – Mobile & Full-Stack',
      company: 'Bacancy Software LLP · Remote',
      period: 'Jan 2022 – Jan 2024',
      bullets: [
        'Contributed to delivery of 10+ production apps using React Native, React, Next.js, and Node.js.',
        'Built map and geolocation modules using React Native Maps and the Geolocation API for location-aware features.',
        'Integrated Firebase Auth with OAuth 2.0 / JWT flows (Google, Apple, Facebook) and Firebase FCM for push notifications.',
        'Built offline-first data flows with SQLite and background sync for low-connectivity scenarios.',
        'Implemented AdMob, in-app purchases, and deep linking / Universal Links for monetization and navigation continuity.',
      ],
    },
    {
      role: 'Junior Software Engineer',
      company: 'ISOL Systems · Bikaner, India',
      period: 'Jan 2020 – Jan 2022',
      bullets: [
        'Delivered cross-platform mobile features in React Native with React Navigation across multiple client projects.',
        'Built native Swift modules to unlock platform-specific capabilities beyond standard React Native libraries.',
        'Implemented ML Kit-powered face detection and biometric authentication (Face ID/Touch ID).',
        'Integrated AdMob, Firebase services (Auth, Firestore), and encrypted SQLite workflows with Lottie animations.',
      ],
    },
  ];

  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
      }}
    >
      {/* ── SIDEBAR ── */}
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
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          >
            <img src="./assets/images/my-avatar.jpeg" alt="Subhashish Tarafdar" width="80" />
          </motion.figure>

          <motion.div
            className="info-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <h1 className="name" title="Subhashish Tarafdar">Subhashish<br />Tarafdar</h1>
            <p className="title">Senior Software Engineer</p>
          </motion.div>

          <motion.button
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
              <div className="icon-box"><ion-icon name="mail-outline"></ion-icon></div>
              <div className="contact-info">
                <p className="contact-title">Email</p>
                <a href="mailto:iamanshu97@gmail.com" className="contact-link">iamanshu97@gmail.com</a>
              </div>
            </li>
            <li className="contact-item">
              <div className="icon-box"><ion-icon name="phone-portrait-outline"></ion-icon></div>
              <div className="contact-info">
                <p className="contact-title">Phone</p>
                <a href="tel:+918107951997" className="contact-link">+91 81079 51997</a>
              </div>
            </li>
            <li className="contact-item">
              <div className="icon-box"><ion-icon name="logo-linkedin"></ion-icon></div>
              <div className="contact-info">
                <p className="contact-title">LinkedIn</p>
                <a href="https://www.linkedin.com/in/subhashish-tarafdar-1692331a4/" className="contact-link" target="_blank" rel="noopener noreferrer">Subhashish Tarafdar</a>
              </div>
            </li>
            <li className="contact-item">
              <div className="icon-box"><ion-icon name="logo-github"></ion-icon></div>
              <div className="contact-info">
                <p className="contact-title">GitHub</p>
                <a href="https://github.com/suburaj97" className="contact-link" target="_blank" rel="noopener noreferrer">suburaj97</a>
              </div>
            </li>
            <li className="contact-item">
              <div className="icon-box"><ion-icon name="location-outline"></ion-icon></div>
              <div className="contact-info">
                <p className="contact-title">Location</p>
                <address>Bikaner (Rajasthan)</address>
              </div>
            </li>
          </ul>

          <div className="separator"></div>
          <ul className="social-list">
            <li className="social-item">
              <a href="https://www.linkedin.com/in/subhashish-tarafdar-1692331a4/" className="social-link" target="_blank" rel="noopener noreferrer">
                <ion-icon name="logo-linkedin"></ion-icon>
              </a>
            </li>
            <li className="social-item">
              <a href="https://github.com/suburaj97" className="social-link" target="_blank" rel="noopener noreferrer">
                <ion-icon name="logo-github"></ion-icon>
              </a>
            </li>
          </ul>
        </div>
      </motion.aside>

      {/* ── MAIN CONTENT ── */}
      <motion.div className="main-content" variants={mainContentVariants} initial="hidden" animate="visible">

        {/* Navigation */}
        <motion.nav
          className="navbar"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.ul
            className="navbar-list"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.9 } } }}
            initial="hidden"
            animate="visible"
          >
            {['about', 'projects', 'skills', 'resume', 'contact'].map((page) => (
              <motion.li
                key={page}
                className="navbar-item"
                variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }}
              >
                <motion.button
                  className={`navbar-link ${activePage === page ? 'active' : ''}`}
                  onClick={() => handlePageChange(page)}
                  whileHover={{ scale: 1.05, color: '#fad76e' }}
                  whileTap={{ scale: 0.95 }}
                >
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                </motion.button>
              </motion.li>
            ))}
          </motion.ul>
        </motion.nav>

        {/* ── ABOUT ── */}
        <motion.article
          className={`about ${activePage === 'about' ? 'active' : ''}`}
          data-page="about"
          style={{ display: activePage === 'about' ? 'block' : 'none' }}
          variants={pageVariants}
          initial="hidden"
          animate={activePage === 'about' ? 'visible' : 'hidden'}
        >
          <motion.header {...fadeUp(0.2)}>
            <h2 className="h2 article-title">About me</h2>
          </motion.header>

          {/* Stats Bar */}
          <motion.div className="stats-bar" {...fadeUp(0.3)}>
            {stats.map((s, i) => (
              <div className="stat-item" key={i}>
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.section className="about-text" {...fadeUp(0.4)}>
            <p>
              Senior Software Engineer with <strong>6+ years</strong> delivering production-grade mobile and full-stack applications. Shipped <strong>10+ apps</strong> across iOS and Android using React Native and Flutter; built web backends with Next.js and Node.js.
            </p>
            <p>
              Experienced across the full mobile lifecycle — from architecture and state management to CI/CD automation (EAS, GitHub Actions, CodePush), crash monitoring (Sentry, Crashlytics), real-time communication (WebSockets/STOMP), maps and geolocation, social authentication, push notifications, and App Store / Play Store release management.
            </p>
          </motion.section>

          {/* Core Impact Areas */}
          <motion.section className="impact-section" {...fadeUp(0.5)}>
            <h3 className="h3 service-title">Core Impact Areas</h3>
            <div className="impact-grid">
              {impactAreas.map((item, i) => (
                <motion.div
                  key={i}
                  className="impact-pill"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.05 }}
                  whileHover={{ y: -3, scale: 1.02 }}
                >
                  <ion-icon name="checkmark-circle-outline"></ion-icon>
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Experience Timeline */}
          <motion.section className="experience-section" {...fadeUp(0.6)}>
            <h3 className="h3 service-title">Professional Experience</h3>
            <div className="timeline">
              {experience.map((job, i) => (
                <motion.div
                  key={i}
                  className="timeline-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + i * 0.15 }}
                >
                  <div className="timeline-header">
                    <div className="timeline-left">
                      <h4 className="timeline-role">{job.role}</h4>
                      <p className="timeline-company">{job.company}</p>
                    </div>
                    <span className="timeline-period">{job.period}</span>
                  </div>
                  <ul className="timeline-bullets">
                    {job.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* What I'm Doing */}
          <motion.section className="service" {...fadeUp(0.7)}>
            <h3 className="h3 service-title">What I'm Doing</h3>
            <ul className="service-list">
              {[
                { icon: 'phone-portrait-outline', title: 'Mobile Apps', text: 'Cross-platform production apps for iOS & Android using React Native and Flutter — from architecture to App Store release.' },
                { icon: 'globe-outline', title: 'Web Development', text: 'Responsive web apps and backends with React, Next.js, and Node.js deployed on Vercel and cloud platforms.' },
                { icon: 'cloud-outline', title: 'Cloud & DevOps', text: 'Scalable infrastructure with Firebase, Supabase, and EAS CI/CD; automated releases with GitHub Actions and CodePush OTA.' },
                { icon: 'shield-checkmark-outline', title: 'Auth & Security', text: 'OAuth 2.0, biometric authentication, encrypted local storage, and secure API integration across platforms.' },
              ].map((s, i) => (
                <motion.li
                  key={i}
                  className="service-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 + i * 0.15 }}
                  whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.3 } }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="service-icon-box">
                    <ion-icon name={s.icon} style={{ fontSize: '36px', color: '#fad76e' }}></ion-icon>
                  </div>
                  <div className="service-content-box">
                    <h4 className="h4 service-item-title">{s.title}</h4>
                    <p className="service-item-text">{s.text}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.section>
        </motion.article>

        {/* ── PROJECTS ── */}
        <article
          className={`portfolio ${activePage === 'projects' ? 'active' : ''}`}
          data-page="projects"
          style={{ display: activePage === 'projects' ? 'block' : 'none' }}
        >
          <header>
            <h2 className="h2 article-title">Projects</h2>
          </header>
          <section className="projects">
            <div className="project-grid-premium">
              {projects.map((proj, i) => (
                <ProjectCard key={i} project={proj} index={i} />
              ))}
            </div>
          </section>
        </article>

        {/* ── SKILLS ── */}
        <article
          className={`skills ${activePage === 'skills' ? 'active' : ''}`}
          data-page="skills"
          style={{ display: activePage === 'skills' ? 'block' : 'none' }}
        >
          <header>
            <h2 className="h2 article-title">Skills</h2>
          </header>
          <section className="skills-content">
            {skillCategories.map((cat, i) => (
              <motion.div
                key={i}
                className="skills-category"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
              >
                <h3 className="skills-category-title">{cat.title}</h3>
                <div className="skill-tags">
                  {cat.tags.map((tag, j) => (
                    <motion.span
                      key={j}
                      className={`skill-tag ${cat.accent ? 'skill-tag--accent' : ''}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 + i * 0.06 + j * 0.03 }}
                      whileHover={{ y: -3, scale: 1.05 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </section>
        </article>

        {/* ── RESUME ── */}
        <article
          className={`resume ${activePage === 'resume' ? 'active' : ''}`}
          data-page="resume"
          style={{ display: activePage === 'resume' ? 'block' : 'none' }}
        >
          <header>
            <h2 className="h2 article-title">Resume</h2>
          </header>

          <motion.div className="resume-actions" {...fadeUp(0.2)}>
            <a
              href="/assets/resume/Subhashish_Tarafdar_Resume.pdf"
              download
              className="resume-download-btn"
            >
              <ion-icon name="download-outline"></ion-icon>
              Download Resume (PDF)
            </a>
          </motion.div>

          <motion.section className="resume-preview" {...fadeUp(0.3)}>
            <div className="resume-preview-header">
              <h3 className="h3">Resume Preview</h3>
              <div className="zoom-controls">
                <button
                  className="zoom-btn"
                  onClick={() => setResumeZoom(z => Math.max(ZOOM_MIN, parseFloat((z - ZOOM_STEP).toFixed(1))))}
                  disabled={resumeZoom <= ZOOM_MIN}
                  title="Zoom out"
                >
                  <ion-icon name="remove-outline"></ion-icon>
                </button>
                <span className="zoom-label">{Math.round(resumeZoom * 100)}%</span>
                <button
                  className="zoom-btn"
                  onClick={() => setResumeZoom(z => Math.min(ZOOM_MAX, parseFloat((z + ZOOM_STEP).toFixed(1))))}
                  disabled={resumeZoom >= ZOOM_MAX}
                  title="Zoom in"
                >
                  <ion-icon name="add-outline"></ion-icon>
                </button>
                <button
                  className="zoom-btn zoom-reset"
                  onClick={() => setResumeZoom(1)}
                  title="Reset zoom"
                >
                  <ion-icon name="refresh-outline"></ion-icon>
                </button>
              </div>
            </div>
            <div className="pdf-preview">
              <div className="iframe-zoom-wrapper" style={{ height: `${900 * resumeZoom}px` }}>
                <iframe
                  src="/assets/resume/Subhashish_Tarafdar_Resume.html"
                  width="100%"
                  height="900"
                  style={{
                    border: 'none',
                    borderRadius: '16px',
                    backgroundColor: '#fff',
                    transform: `scale(${resumeZoom})`,
                    transformOrigin: 'top left',
                    width: `${100 / resumeZoom}%`,
                  }}
                  title="Resume Preview"
                >
                  <p>Unable to load preview. <a href="/assets/resume/Subhashish_Tarafdar_Resume.pdf">Download the PDF</a>.</p>
                </iframe>
              </div>
            </div>
          </motion.section>
        </article>

        {/* ── CONTACT ── */}
        <article
          className={`contact ${activePage === 'contact' ? 'active' : ''}`}
          data-page="contact"
          style={{ display: activePage === 'contact' ? 'block' : 'none' }}
        >
          <header>
            <h2 className="h2 article-title">Contact</h2>
          </header>

          <section className="mapbox" data-mapbox>
            <figure>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d226697.52002081395!2d73.03059944726562!3d28.01783080!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393744e7c5c33db1%3A0x73328ac51ac3d7c8!2sBikaner%2C%20Rajasthan%2C%20India!5e0!3m2!1sen!2sin!4v1647608789441!5m2!1sen!2sin"
                width="400" height="300" loading="lazy" title="Google Map"
              ></iframe>
            </figure>
          </section>

          <section className="contact-cta">
            <p className="contact-cta-text">Have a project in mind or want to hire me?</p>
            <a
              href="mailto:iamanshu97@gmail.com?subject=Hiring%20Opportunity&body=Hi%20Subhashish%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect."
              className="contact-me-btn"
            >
              <ion-icon name="mail-outline"></ion-icon>
              Contact Me
            </a>
          </section>
        </article>

      </motion.div>
    </motion.main>
  );
}

export default App;
