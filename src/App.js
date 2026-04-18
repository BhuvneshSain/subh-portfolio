/**
 * React Portfolio – Subhashish Tarafdar
 * Premium revamp: particles, splash, spotlight, pill nav, counters, shimmer, timeline
 */

/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useInView,
} from "framer-motion";
import ProjectCard from "./ProjectCard";

/* ─── Animated counter ─── */
function useCounter(target, inView, duration = 1.2) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const num = parseFloat(String(target).replace(/[^0-9.]/g, ""));
    if (isNaN(num)) return;
    let start = null;
    const tick = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * num));
      if (p < 1) requestAnimationFrame(tick);
      else setCount(num);
    };
    requestAnimationFrame(tick);
  }, [inView]);
  return count;
}

function StatItem({ value, label, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const count = useCounter(value, inView);
  const suffix = String(value).replace(/[0-9]/g, "");
  const isNumeric = !isNaN(parseFloat(String(value).replace(/[^0-9.]/g, "")));
  return (
    <motion.div
      ref={ref}
      className="stat-item"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <span className="stat-value">
        {isNumeric ? `${count}${suffix}` : value}
      </span>
      <span className="stat-label">{label}</span>
    </motion.div>
  );
}

/* ─── Particle canvas ─── */
function ParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext("2d");
    const pts = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      dx: (Math.random() - 0.5) * 0.28,
      dy: (Math.random() - 0.5) * 0.28,
      a: Math.random() * 0.45 + 0.08,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(250,215,110,${p.a})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={canvasRef} className="particle-canvas" />;
}

/* ─── Ripple wrapper ─── */
function RippleBtn({ children, className, href, download, onClick }) {
  const [ripples, setRipples] = useState([]);
  const fire = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((r) => [
      ...r,
      { id, x: e.clientX - rect.left, y: e.clientY - rect.top },
    ]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 650);
    onClick && onClick(e);
  };
  if (href) {
    return (
      <a
        href={href}
        download={download}
        className={`ripple-wrap ${className || ""}`}
        onClick={fire}
      >
        {children}
        {ripples.map((rp) => (
          <span
            key={rp.id}
            className="ripple"
            style={{ left: rp.x, top: rp.y }}
          />
        ))}
      </a>
    );
  }
  return (
    <button className={`ripple-wrap ${className || ""}`} onClick={fire}>
      {children}
      {ripples.map((rp) => (
        <span
          key={rp.id}
          className="ripple"
          style={{ left: rp.x, top: rp.y }}
        />
      ))}
    </button>
  );
}

/* ─── Back-to-top with SVG ring ─── */
function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setPct(total ? Math.min(scrolled / total, 1) : 0);
      setVisible(scrolled > 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const R = 18;
  const circ = 2 * Math.PI * R;
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className="back-to-top"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <svg width="44" height="44" viewBox="0 0 44 44">
            <circle
              cx="22"
              cy="22"
              r={R}
              fill="none"
              stroke="rgba(250,215,110,0.15)"
              strokeWidth="3"
            />
            <circle
              cx="22"
              cy="22"
              r={R}
              fill="none"
              stroke="#fad76e"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={circ * (1 - pct)}
              transform="rotate(-90 22 22)"
            />
          </svg>
          <ion-icon name="chevron-up-outline" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ─── Intro splash curtain ─── */
function IntroSplash({ onDone }) {
  useEffect(() => {
    // panels slide at 1.35s delay + 0.85s duration = 2.2s total
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="intro-splash"
      exit={{ opacity: 0, transition: { duration: 0.35 } }}
    >
      <motion.div
        className="intro-top"
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ duration: 0.85, delay: 1.35, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="intro-bottom"
        initial={{ y: 0 }}
        animate={{ y: "100%" }}
        transition={{ duration: 0.85, delay: 1.35, ease: [0.76, 0, 0.24, 1] }}
      />
      <div className="intro-content">
        <motion.p
          className="intro-name"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          Subhashish Tarafdar
        </motion.p>
        <motion.p
          className="intro-title-text"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          Senior Software Engineer
        </motion.p>
      </div>
    </motion.div>
  );
}

/* ─── Staggered letter reveal ─── */
function LetterReveal({ text, delay = 0 }) {
  return (
    <span style={{ display: "block" }} aria-label={text}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          style={{
            display: "inline-block",
            whiteSpace: ch === " " ? "pre" : "normal",
          }}
          initial={{ opacity: 0, y: 16, rotate: (Math.random() - 0.5) * 12 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: delay + i * 0.042,
          }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Impact pills ─── */
function ImpactSection({ items }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const rots = useRef(items.map(() => (Math.random() - 0.5) * 5));
  return (
    <section className="impact-section" ref={ref}>
      <h3 className="h3 service-title">Core Impact Areas</h3>
      <div className="impact-grid">
        {items.map((item, i) => (
          <motion.div
            key={i}
            className="impact-pill"
            initial={{ opacity: 0, y: 18, rotate: rots.current[i] }}
            animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
            transition={{
              duration: 0.42,
              delay: i * 0.05,
              type: "spring",
              stiffness: 220,
              damping: 22,
            }}
            whileHover={{
              y: -4,
              scale: 1.04,
              boxShadow: "0 8px 24px rgba(250,215,110,0.2)",
            }}
          >
            <ion-icon name="checkmark-circle-outline" />
            <span>{item}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─── Timeline ─── */
function TimelineSection({ experience }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <section className="experience-section" ref={ref}>
      <h3 className="h3 service-title">Professional Experience</h3>
      <div className="timeline">
        <motion.div
          className="timeline-line"
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        />
        {experience.map((job, i) => (
          <motion.div
            key={i}
            className="timeline-item"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.55,
              delay: 0.3 + i * 0.18,
              ease: [0.22, 1, 0.36, 1],
            }}
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
    </section>
  );
}

/* ─── Shimmer service cards ─── */
function WhatImDoing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const services = [
    {
      icon: "phone-portrait-outline",
      title: "Mobile Apps",
      text: "Cross-platform production apps for iOS & Android using React Native and Flutter — from architecture to App Store release.",
    },
    {
      icon: "globe-outline",
      title: "Web Development",
      text: "Responsive web apps and backends with React, Next.js, and Node.js deployed on Vercel and cloud platforms.",
    },
    {
      icon: "cloud-outline",
      title: "Cloud & DevOps",
      text: "Scalable infrastructure with Firebase, Supabase, and EAS CI/CD; automated releases with GitHub Actions and CodePush OTA.",
    },
    {
      icon: "shield-checkmark-outline",
      title: "Auth & Security",
      text: "OAuth 2.0, biometric authentication, encrypted local storage, and secure API integration across platforms.",
    },
  ];
  return (
    <section className="service" ref={ref}>
      <h3 className="h3 service-title">What I'm Doing</h3>
      <ul className="service-list">
        {services.map((s, i) => (
          <motion.li
            key={i}
            className="service-item shimmer-card"
            initial={{ opacity: 0, scale: 0.93 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.5,
              delay: 0.1 + i * 0.11,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.25 } }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="shimmer-sweep" />
            <div className="service-icon-box">
              <ion-icon
                name={s.icon}
                style={{ fontSize: "36px", color: "#fad76e" }}
              />
            </div>
            <div className="service-content-box">
              <h4 className="h4 service-item-title">{s.title}</h4>
              <p className="service-item-text">{s.text}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

/* ─── Skill category ─── */
function SkillCategory({ cat, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const fromLeft = index % 2 === 0;
  return (
    <motion.div
      ref={ref}
      className="skills-category"
      initial={{ opacity: 0, x: fromLeft ? -28 : 28 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: 0.04 + index * 0.035,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <h3 className="skills-category-title">{cat.title}</h3>
      <div className="skill-tags">
        {cat.tags.map((tag, j) => (
          <motion.span
            key={j}
            className={`skill-tag${cat.accent ? " skill-tag--accent" : ""}`}
            initial={{ opacity: 0, y: 12, scale: 0.82 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 24,
              delay: 0.08 + index * 0.035 + j * 0.038,
            }}
            whileHover={{ y: -3, scale: 1.09 }}
          >
            {tag}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════
   MAIN APP
════════════════════════════════════════ */
function App() {
  const [activePage, setActivePage] = useState("about");
  const [sidebarActive, setSidebarActive] = useState(false);
  const [resumeZoom, setResumeZoom] = useState(1);
  const [showSplash, setShowSplash] = useState(true);
  const [splashGone, setSplashGone] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef(null);
  const btnRefs = useRef({});
  const ZOOM_STEP = 0.1;
  const ZOOM_MIN = 0.5;
  const ZOOM_MAX = 2;

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const handleMouseMove = useCallback((e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  /* sliding pill */
  useEffect(() => {
    const btn = btnRefs.current[activePage];
    const nav = navRef.current;
    if (!btn || !nav) return;
    const navRect = nav.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setPillStyle({
      left: btnRect.left - navRect.left,
      width: btnRect.width,
    });
  }, [activePage, splashGone]);

  const handlePageChange = (page) => {
    setActivePage(page);
    window.scrollTo(0, 0);
  };

  /* ionicons */
  useEffect(() => {
    let esm, nomod;
    if (!document.querySelector('script[src*="ionicons.esm.js"]')) {
      esm = document.createElement("script");
      esm.type = "module";
      esm.src =
        "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js";
      document.head.appendChild(esm);
    }
    if (!document.querySelector('script[src*="ionicons.js"]')) {
      nomod = document.createElement("script");
      nomod.setAttribute("nomodule", "");
      nomod.src = "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js";
      document.head.appendChild(nomod);
    }
    return () => {
      if (esm?.parentNode) document.head.removeChild(esm);
      if (nomod?.parentNode) document.head.removeChild(nomod);
    };
  }, []);

  /* ── Data ── */
  const stats = [
    { value: "6+", label: "Years Experience" },
    { value: "10+", label: "Apps Shipped" },
    { value: "Mobile & Web", label: "Platforms" },
    { value: "3", label: "Companies" },
  ];

  const impactAreas = [
    "Shipped 10+ apps on iOS & Android",
    "Maps, geolocation & GPS tracking",
    "Social login (Google, Apple, Facebook)",
    "Real-time via WebSockets & STOMP",
    "Push notifications (FCM, APNs, OneSignal)",
    "Biometric auth (Face ID, Touch ID)",
    "Offline-first (SQLite + sync)",
    "CI/CD: EAS, GitHub Actions, CodePush",
    "Sentry crash monitoring & Firebase Analytics",
    "Redux Toolkit, Zustand & React Query",
    "Payment, AdMob & in-app purchases",
    "App Store Connect & Play Console releases",
  ];

  const skillCategories = [
    {
      title: "Mobile Development",
      tags: [
        "React Native",
        "Flutter",
        "Expo SDK",
        "iOS (Swift)",
        "Android",
        "Hermes Engine",
      ],
    },
    {
      title: "Navigation & Routing",
      tags: [
        "React Navigation",
        "Expo Router",
        "Deep Linking",
        "Universal Links",
        "App Links",
        "URL Schemes",
      ],
    },
    {
      title: "State Management",
      tags: [
        "Redux Toolkit",
        "Zustand",
        "React Query",
        "TanStack Query",
        "Context API",
        "MobX",
      ],
    },
    {
      title: "Maps & Location",
      tags: [
        "React Native Maps",
        "Google Maps SDK",
        "Geolocation API",
        "Background Location",
        "GPS Tracking",
        "Geofencing",
      ],
    },
    {
      title: "Auth & Social Login",
      tags: [
        "Google Sign-In",
        "Apple Sign-In",
        "Facebook Login",
        "OAuth 2.0 / JWT",
        "Face ID / Touch ID",
        "Biometric Auth",
      ],
    },
    {
      title: "Firebase",
      tags: [
        "Firebase Auth",
        "Firestore",
        "FCM",
        "Firebase Storage",
        "Analytics",
        "Crashlytics",
        "Remote Config",
      ],
    },
    {
      title: "Push Notifications",
      tags: [
        "FCM (Android)",
        "APNs (iOS)",
        "Expo Notifications",
        "OneSignal",
        "Local Notifications",
      ],
    },
    {
      title: "Animations & UI",
      tags: [
        "Reanimated 2/3",
        "Lottie",
        "Gesture Handler",
        "Animated API",
        "Haptics",
      ],
    },
    {
      title: "Real-Time & Security",
      tags: [
        "WebSockets",
        "STOMP / StompJS",
        "Data Encryption",
        "Secure Storage",
        "Encrypted SQLite",
      ],
    },
    {
      title: "DevOps & Release",
      tags: [
        "EAS CI/CD",
        "GitHub Actions",
        "CodePush OTA",
        "App Store Connect",
        "Play Console",
        "Vercel",
      ],
    },
    {
      title: "Monitoring & Testing",
      tags: ["Sentry", "Firebase Crashlytics", "Jest", "RNTL", "Flipper"],
    },
    {
      title: "Frontend",
      tags: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Tailwind CSS",
        "GraphQL",
      ],
    },
    {
      title: "Backend",
      tags: ["Node.js", "Express.js", "REST API", "Prisma", "TypeORM"],
    },
    {
      title: "Databases",
      tags: [
        "PostgreSQL",
        "MongoDB",
        "SQLite",
        "Supabase",
        "Firebase Firestore",
      ],
    },
    {
      title: "AI & Dev Tools",
      tags: [
        "Cursor",
        "Claude Code",
        "GitHub Copilot",
        "Xcode",
        "Android Studio",
        "VS Code",
      ],
    },
    {
      title: "Device Features",
      tags: [
        "Camera / Video",
        "QR Scanning",
        "ML Kit (Face Detection)",
        "File System",
        "Document Picker",
        "Background Tasks",
      ],
    },
    {
      title: "Integrations",
      tags: [
        "Payment Gateway",
        "AdMob",
        "In-App Purchases",
        "Social Sharing",
        "i18n / l10n",
      ],
    },
    {
      title: "MCP Integrations",
      tags: ["GitHub MCP", "Stitch MCP", "Supabase MCP"],
      accent: true,
    },
  ];

  const projects = [
    {
      title: "RippleStreet",
      label: "Project Aurora",
      description:
        "Consumer lifestyle app enabling users to participate in marketing campaigns and brand activities with deep linking and push notification flows.",
      image: "/assets/images/Ripplestreet.png",
      tech: [
        "React Native",
        "AWS Amplify",
        "Deep Linking",
        "Push Notifications",
      ],
      links: [
        {
          label: "App Store",
          icon: "logo-apple",
          url: "https://apps.apple.com/us/app/ripple-street/id1623388148",
        },
        {
          label: "Play Store",
          icon: "logo-google-playstore",
          url: "https://play.google.com/store/apps/details?id=com.ripplestreetfun",
        },
      ],
      featured: true,
    },
    {
      title: "Noritz Connect",
      label: "Project Helix",
      description:
        "IoT mobile app enabling real-time monitoring and remote control of smart water heating systems with geolocation and background tasks.",
      image: "/assets/images/Noritz-Connect.png",
      tech: [
        "React Native",
        "IoT",
        "Geolocation",
        "Background Tasks",
        "Real-time",
      ],
      links: [
        {
          label: "App Store",
          icon: "logo-apple",
          url: "https://apps.apple.com/us/app/noritz-connect/id1227949334",
        },
        {
          label: "Play Store",
          icon: "logo-google-playstore",
          url: "https://play.google.com/store/apps/details?id=com.noritz.iot&hl=en_IN",
        },
      ],
    },
    {
      title: "Sandlines",
      label: "Project Atlas",
      description:
        "Mobile platform enabling political engagement through campaigns and real-time location-aware updates using React Native Maps and WebSockets.",
      image: "/assets/images/Sandlines.png",
      tech: ["React Native", "TypeScript", "Firebase", "WebSockets", "Maps"],
      links: [
        {
          label: "App Store",
          icon: "logo-apple",
          url: "https://apps.apple.com/us/app/sandlines/id6469634537",
        },
      ],
    },
    {
      title: "Noritz Procard",
      label: "Project Keystone",
      description:
        "Business app for members: lead management, warranties, service calls, installation guides, and companion WiFi adapter setup with QR scanning.",
      image: "/assets/images/Noritz-Procard.png",
      tech: [
        "React Native",
        "SQLite",
        "Encryption",
        "Offline-first",
        "QR Scan",
      ],
      links: [
        {
          label: "App Store",
          icon: "logo-apple",
          url: "https://apps.apple.com/us/app/procard/id1110311645",
        },
        {
          label: "Play Store",
          icon: "logo-google-playstore",
          url: "https://play.google.com/store/apps/details?id=com.org.noritz",
        },
      ],
    },
    {
      title: "Site Service Mobile",
      label: "Project Sentinel",
      description:
        "Offline-first field inspection app for fire & life safety, elevator, and municipal compliance teams. Real-time inspections, violation capture, dispatch management, and report generation — synced via WebSocket.",
      image: "/assets/images/SiteServiceMobile.png",
      tech: [
        "React Native 0.79",
        "Expo SDK 53",
        "Redux Toolkit",
        "Drizzle ORM",
        "SQLite",
        "WebSocket",
        "Firebase",
        "NativeWind",
        "TypeScript",
      ],
      links: [
        {
          label: "Play Store",
          icon: "logo-google-playstore",
          url: "https://play.google.com/store/apps/details?id=com.siteservice.mobile&hl=en_IN",
        },
      ],
    },
    {
      title: "Chromaflo",
      label: "Project Spectrum",
      description:
        "Industrial mobile tool for color formulation and pigment selection with offline-first SQLite sync and camera-based color capture.",
      image: "/assets/images/Chromaflo.png",
      tech: ["React Native", "Camera", "SQLite", "Offline-first", "Flutter"],
      links: [
        {
          label: "Website",
          icon: "globe-outline",
          url: "https://bluepony.com/pages/chromaflo",
        },
      ],
    },
  ];

  const experience = [
    {
      role: "Senior Software Engineer – Mobile & Full-Stack",
      company: "Bacancy Technology · Remote",
      period: "Jan 2024 – Present",
      bullets: [
        "Led full-stack delivery for enterprise products across iOS/Android and web backends (Next.js/Node.js) deployed on Vercel; managed App Store Connect and Play Console pipelines end-to-end.",
        "Integrated Google Maps, geolocation, and GPS tracking enabling real-time location workflows and geofencing for field-facing mobile users.",
        "Implemented Social Login (Google, Apple) and biometric auth (Face ID/Touch ID) to streamline and secure user onboarding flows.",
        "Delivered real-time features using WebSockets/STOMP; set up push notifications via FCM/APNs and OneSignal.",
        "Accelerated releases by automating CI/CD with EAS, GitHub Actions, and CodePush OTA across dev/staging/production environments.",
      ],
    },
    {
      role: "Software Engineer – Mobile & Full-Stack",
      company: "Bacancy Software LLP · Remote",
      period: "Jan 2022 – Jan 2024",
      bullets: [
        "Contributed to delivery of 10+ production apps using React Native, React, Next.js, and Node.js.",
        "Built map and geolocation modules using React Native Maps and the Geolocation API for location-aware features.",
        "Integrated Firebase Auth with OAuth 2.0 / JWT flows (Google, Apple, Facebook) and Firebase FCM for push notifications.",
        "Built offline-first data flows with SQLite and background sync for low-connectivity scenarios.",
        "Implemented AdMob, in-app purchases, and deep linking / Universal Links for monetization and navigation continuity.",
      ],
    },
    {
      role: "Junior Software Engineer",
      company: "ISOL Systems · Bikaner, India",
      period: "Jan 2020 – Jan 2022",
      bullets: [
        "Delivered cross-platform mobile features in React Native with React Navigation across multiple client projects.",
        "Built native Swift modules to unlock platform-specific capabilities beyond standard React Native libraries.",
        "Implemented ML Kit-powered face detection and biometric authentication (Face ID/Touch ID).",
        "Integrated AdMob, Firebase services (Auth, Firestore), and encrypted SQLite workflows with Lottie animations.",
      ],
    },
  ];

  const pages = ["about", "projects", "skills", "resume", "contact"];

  const SPLASH_DELAY = 0.1;

  return (
    <>
      {/* cursor spotlight */}
      <div
        className="cursor-spotlight"
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      {/* scroll progress bar */}
      <motion.div className="scroll-progress" style={{ scaleX }} />

      {/* intro splash */}
      <AnimatePresence onExitComplete={() => setSplashGone(true)}>
        {showSplash && <IntroSplash onDone={() => setShowSplash(false)} />}
      </AnimatePresence>

      <BackToTop />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: splashGone ? 1 : 0 }}
        transition={{ duration: 0.45 }}
      >
        {/* ── SIDEBAR ── */}
        <motion.aside
          className={`sidebar ${sidebarActive ? "active" : ""}`}
          data-sidebar
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: SPLASH_DELAY, ease: "easeOut" }}
        >
          <ParticleField />

          <div className="sidebar-info">
            <motion.figure
              className="avatar-box avatar-glow"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 18,
                delay: SPLASH_DELAY + 0.1,
              }}
            >
              <img
                src="./assets/images/my-avatar.png"
                alt="Subhashish Tarafdar"
                width="80"
              />
            </motion.figure>

            <div className="info-content">
              <h1 className="name" title="Subhashish Tarafdar">
                <LetterReveal text="Subhashish" delay={0.3} />
                <LetterReveal text="Tarafdar" delay={0.7} />
              </h1>
              <motion.p
                className="title"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: SPLASH_DELAY + 0.9 }}
              >
                Senior Software Engineer
              </motion.p>
            </div>

            <motion.button
              className="info_more-btn"
              data-sidebar-btn
              onClick={() => setSidebarActive(!sidebarActive)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: SPLASH_DELAY + 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Show Contacts</span>
              <ion-icon name="chevron-down" />
            </motion.button>
          </div>

          <div className="sidebar-info_more">
            <div className="separator" />
            <ul className="contacts-list">
              {[
                {
                  icon: "mail-outline",
                  title: "Email",
                  content: (
                    <a
                      href="mailto:iamanshu97@gmail.com"
                      className="contact-link"
                    >
                      iamanshu97@gmail.com
                    </a>
                  ),
                },
                {
                  icon: "phone-portrait-outline",
                  title: "Phone",
                  content: (
                    <a href="tel:+918107951997" className="contact-link">
                      +91 81079 51997
                    </a>
                  ),
                },
                {
                  icon: "logo-linkedin",
                  title: "LinkedIn",
                  content: (
                    <a
                      href="https://www.linkedin.com/in/subhashish-tarafdar-1692331a4/"
                      className="contact-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Subhashish Tarafdar
                    </a>
                  ),
                },
                {
                  icon: "logo-github",
                  title: "GitHub",
                  content: (
                    <a
                      href="https://github.com/suburaj97"
                      className="contact-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      suburaj97
                    </a>
                  ),
                },
                {
                  icon: "location-outline",
                  title: "Location",
                  content: <address>Bikaner (Rajasthan)</address>,
                },
              ].map((item, i) => (
                <motion.li
                  key={i}
                  className="contact-item"
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: SPLASH_DELAY + 0.2 + i * 0.07,
                  }}
                >
                  <div className="icon-box">
                    <ion-icon name={item.icon} />
                  </div>
                  <div className="contact-info">
                    <p className="contact-title">{item.title}</p>
                    {item.content}
                  </div>
                </motion.li>
              ))}
            </ul>
            <div className="separator" />
            <ul className="social-list">
              {[
                {
                  href: "https://www.linkedin.com/in/subhashish-tarafdar-1692331a4/",
                  icon: "logo-linkedin",
                },
                { href: "https://github.com/suburaj97", icon: "logo-github" },
              ].map((s, i) => (
                <motion.li
                  key={i}
                  className="social-item"
                  whileHover={{ y: -5, scale: 1.2 }}
                  whileTap={{ scale: 0.88 }}
                >
                  <a
                    href={s.href}
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ion-icon name={s.icon} />
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.aside>

        {/* ── MAIN CONTENT ── */}
        <motion.div
          className="main-content"
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: SPLASH_DELAY, ease: "easeOut" }}
        >
          {/* Navbar with sliding pill */}
          <nav className="navbar" ref={navRef}>
            <motion.span
              className="nav-pill"
              animate={{ left: pillStyle.left, width: pillStyle.width }}
              transition={{ type: "spring", stiffness: 380, damping: 36 }}
            />
            <ul className="navbar-list">
              {pages.map((page) => (
                <li key={page} className="navbar-item">
                  <button
                    ref={(el) => {
                      if (el) btnRefs.current[page] = el;
                    }}
                    className={`navbar-link${activePage === page ? " active" : ""}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Pages */}
          <div key={activePage}>
            {/* ABOUT */}
            {activePage === "about" && (
              <article className="about active" data-page="about">
                <header style={{ overflow: "hidden" }}>
                  <motion.h2
                    className="h2 article-title"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    About me
                  </motion.h2>
                </header>

                <div className="stats-bar">
                  {stats.map((s, i) => (
                    <StatItem
                      key={i}
                      value={s.value}
                      label={s.label}
                      delay={0.1 + i * 0.1}
                    />
                  ))}
                </div>

                <motion.section
                  className="about-text"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.28 }}
                >
                  <p>
                    Senior Software Engineer with <strong>6+ years</strong>{" "}
                    delivering production-grade mobile and full-stack
                    applications. Shipped <strong>10+ apps</strong> across iOS
                    and Android using React Native and Flutter; built web
                    backends with Next.js and Node.js.
                  </p>
                  <p>
                    Experienced across the full mobile lifecycle — from
                    architecture and state management to CI/CD automation (EAS,
                    GitHub Actions, CodePush), crash monitoring (Sentry,
                    Crashlytics), real-time communication (WebSockets/STOMP),
                    maps and geolocation, social authentication, push
                    notifications, and App Store / Play Store release
                    management.
                  </p>
                </motion.section>

                <ImpactSection items={impactAreas} />
                <TimelineSection experience={experience} />
                <WhatImDoing />
              </article>
            )}

            {/* PROJECTS */}
            {activePage === "projects" && (
              <article className="portfolio active" data-page="projects">
                <header style={{ overflow: "hidden" }}>
                  <motion.h2
                    className="h2 article-title"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    Projects
                  </motion.h2>
                </header>
                <section className="projects">
                  <div className="project-grid-premium">
                    {projects.map((proj, i) => (
                      <ProjectCard key={i} project={proj} index={i} />
                    ))}
                  </div>
                </section>
              </article>
            )}

            {/* SKILLS */}
            {activePage === "skills" && (
              <article className="skills active" data-page="skills">
                <header style={{ overflow: "hidden" }}>
                  <motion.h2
                    className="h2 article-title"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    Skills
                  </motion.h2>
                </header>
                <section className="skills-content">
                  {skillCategories.map((cat, i) => (
                    <SkillCategory key={i} cat={cat} index={i} />
                  ))}
                </section>
              </article>
            )}

            {/* RESUME */}
            {activePage === "resume" && (
              <article className="resume active" data-page="resume">
                <header style={{ overflow: "hidden" }}>
                  <motion.h2
                    className="h2 article-title"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    Resume
                  </motion.h2>
                </header>
                <motion.div
                  className="resume-actions"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <RippleBtn
                    href="/assets/resume/Subhashish_Tarafdar_Resume.pdf"
                    download
                    className="resume-download-btn"
                  >
                    <ion-icon name="download-outline" />
                    Download Resume (PDF)
                  </RippleBtn>
                </motion.div>
                <motion.section
                  className="resume-preview"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="resume-preview-header">
                    <h3 className="h3">Resume Preview</h3>
                    <div className="zoom-controls">
                      <button
                        className="zoom-btn"
                        onClick={() =>
                          setResumeZoom((z) =>
                            Math.max(
                              ZOOM_MIN,
                              parseFloat((z - ZOOM_STEP).toFixed(1)),
                            ),
                          )
                        }
                        disabled={resumeZoom <= ZOOM_MIN}
                        title="Zoom out"
                      >
                        <ion-icon name="remove-outline" />
                      </button>
                      <span className="zoom-label">
                        {Math.round(resumeZoom * 100)}%
                      </span>
                      <button
                        className="zoom-btn"
                        onClick={() =>
                          setResumeZoom((z) =>
                            Math.min(
                              ZOOM_MAX,
                              parseFloat((z + ZOOM_STEP).toFixed(1)),
                            ),
                          )
                        }
                        disabled={resumeZoom >= ZOOM_MAX}
                        title="Zoom in"
                      >
                        <ion-icon name="add-outline" />
                      </button>
                      <button
                        className="zoom-btn zoom-reset"
                        onClick={() => setResumeZoom(1)}
                        title="Reset zoom"
                      >
                        <ion-icon name="refresh-outline" />
                      </button>
                    </div>
                  </div>
                  <div className="pdf-preview">
                    <div
                      className="iframe-zoom-wrapper"
                      style={{ height: `${900 * resumeZoom}px` }}
                    >
                      <iframe
                        src="/assets/resume/Subhashish_Tarafdar_Resume.html"
                        width="100%"
                        height="900"
                        style={{
                          border: "none",
                          borderRadius: "16px",
                          backgroundColor: "#fff",
                          transform: `scale(${resumeZoom})`,
                          transformOrigin: "top left",
                          width: `${100 / resumeZoom}%`,
                        }}
                        title="Resume Preview"
                      >
                        <p>
                          Unable to load preview.{" "}
                          <a href="/assets/resume/Subhashish_Tarafdar_Resume.pdf">
                            Download the PDF
                          </a>
                          .
                        </p>
                      </iframe>
                    </div>
                  </div>
                </motion.section>
              </article>
            )}

            {/* CONTACT */}
            {activePage === "contact" && (
              <article className="contact active" data-page="contact">
                <header style={{ overflow: "hidden" }}>
                  <motion.h2
                    className="h2 article-title"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    Contact
                  </motion.h2>
                </header>
                <section className="mapbox" data-mapbox>
                  <figure>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d226697.52002081395!2d73.03059944726562!3d28.01783080!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393744e7c5c33db1%3A0x73328ac51ac3d7c8!2sBikaner%2C%20Rajasthan%2C%20India!5e0!3m2!1sen!2sin!4v1647608789441!5m2!1sen!2sin"
                      width="400"
                      height="300"
                      loading="lazy"
                      title="Google Map"
                    />
                  </figure>
                </section>
                <section className="contact-cta">
                  <p className="contact-cta-text">
                    Have a project in mind or want to hire me?
                  </p>
                  <RippleBtn
                    href="mailto:iamanshu97@gmail.com?subject=Hiring%20Opportunity&body=Hi%20Subhashish%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect."
                    className="contact-me-btn"
                  >
                    <ion-icon name="mail-outline" />
                    Contact Me
                  </RippleBtn>
                </section>
              </article>
            )}
          </div>
        </motion.div>
      </motion.main>
    </>
  );
}

export default App;
