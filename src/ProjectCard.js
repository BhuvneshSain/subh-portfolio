/**
 * ProjectCard – 3D tilt + border trace + parallax + image-click preview modal
 */

import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";

/* ── Project Preview Modal ── */
function ProjectModal({ project, onClose }) {
  const { title, label, description, image, tech, links } = project;

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-card"
        initial={{ opacity: 0, scale: 0.88, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.91, y: 28 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <ion-icon name="close-outline" />
        </button>

        {image && (
          <div className="modal-image-wrap">
            <img src={image} alt={title} className="modal-image" />
            <div className="modal-image-overlay" />
          </div>
        )}

        <div className="modal-body">
          {label && <span className="pcp-label">{label}</span>}
          <h2 className="modal-title">{title}</h2>
          <p className="modal-description">{description}</p>

          <div className="modal-section-label">Tech Stack</div>
          <div className="pcp-tech-row modal-tech-row">
            {tech.map((t, i) => (
              <span key={i} className="pcp-tech-pill">{t}</span>
            ))}
          </div>

          {links.length > 0 && (
            <>
              <div className="modal-section-label">Links</div>
              <div className="pcp-actions">
                {links.map((link, i) => (
                  <motion.a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={i === 0 ? "pcp-btn-primary" : "pcp-btn-secondary"}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.icon && <ion-icon name={link.icon} style={{ fontSize: "15px" }} />}
                    <span>{link.label}</span>
                    {i === 0 && <ion-icon name="arrow-forward-outline" style={{ fontSize: "13px" }} />}
                  </motion.a>
                ))}
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Project Card ── */
const ProjectCard = ({ project, index }) => {
  const { title, label, description, image, tech, links, featured } = project;
  const primaryLink = links[0];
  const secondaryLinks = links.slice(1);

  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  /* 3D tilt */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [7, -7]), { stiffness: 280, damping: 28 });
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-7, 7]), { stiffness: 280, damping: 28 });

  /* parallax image */
  const imgX = useSpring(useTransform(mouseX, [-1, 1], [5, -5]), { stiffness: 180, damping: 24 });
  const imgY = useSpring(useTransform(mouseY, [-1, 1], [5, -5]), { stiffness: 180, damping: 24 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  /* SVG border trace */
  const [pathLen, setPathLen] = useState(0);
  const borderRef = useRef(null);
  useEffect(() => {
    if (borderRef.current) setPathLen(borderRef.current.getTotalLength());
  }, []);

  /* cap delay so row-2 cards don't wait too long */
  const delay = 0.05 + (index % 3) * 0.1;

  return (
    <>
      <motion.div
        ref={cardRef}
        className={`project-card-premium${featured ? " featured" : ""}`}
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 900 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.98 }}
      >
        {/* SVG border trace */}
        <svg
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            borderRadius: "20px", pointerEvents: "none", zIndex: 10, overflow: "visible",
          }}
        >
          <rect
            ref={borderRef}
            x="1" y="1"
            width="calc(100% - 2px)" height="calc(100% - 2px)"
            rx="19" ry="19"
            fill="none" stroke="#fad76e" strokeWidth="1.5"
            style={{
              strokeDasharray: pathLen || 9999,
              strokeDashoffset: hovered ? 0 : pathLen || 9999,
              transition: "stroke-dashoffset 0.65s cubic-bezier(0.22,1,0.36,1)",
              opacity: hovered ? 0.65 : 0,
            }}
          />
        </svg>

        {/* Image — click opens modal */}
        <div
          className="pcp-image-wrap pcp-image-clickable"
          onClick={() => setModalOpen(true)}
          title="Click to preview"
        >
          {image ? (
            <motion.img
              src={image}
              alt={`${title} preview`}
              className={`pcp-image${imgLoaded ? " pcp-image--loaded" : ""}`}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              style={{ x: imgX, y: imgY, scale: hovered ? 1.06 : 1 }}
              transition={{ scale: { duration: 0.4 } }}
            />
          ) : (
            <div className="pcp-image-placeholder" />
          )}
          <div className="pcp-image-overlay" />
          <div className="pcp-vignette" />

          {/* hover hint */}
          <motion.div
            className="pcp-image-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ion-icon name="expand-outline" />
          </motion.div>

          {featured && (
            <motion.span
              className="pcp-featured-badge"
              animate={{ boxShadow: ["0 0 8px rgba(250,215,110,0.4)", "0 0 22px rgba(250,215,110,0.8)", "0 0 8px rgba(250,215,110,0.4)"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ion-icon name="star" style={{ fontSize: "10px" }} />
              Featured
            </motion.span>
          )}
        </div>

        {/* Body */}
        <div className="pcp-body" style={{ transform: "translateZ(16px)" }}>
          {label && <span className="pcp-label">{label}</span>}
          <h3 className="pcp-title">{title}</h3>
          <p className="pcp-description">{description}</p>

          {/* Tech pills */}
          <div className="pcp-tech-row">
            {tech.map((t, i) => (
              <span key={i} className="pcp-tech-pill">{t}</span>
            ))}
          </div>

          {/* Action buttons — no Preview button */}
          <div className="pcp-actions">
            {primaryLink && (
              <motion.a
                href={primaryLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pcp-btn-primary"
                whileHover={{ boxShadow: "0 6px 22px rgba(250,215,110,0.5)", y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {primaryLink.icon && <ion-icon name={primaryLink.icon} style={{ fontSize: "14px" }} />}
                <span>{primaryLink.label}</span>
                <ion-icon name="arrow-forward-outline" style={{ fontSize: "13px" }} />
              </motion.a>
            )}
            {secondaryLinks.map((link, i) => (
              <motion.a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pcp-btn-secondary"
                whileHover={{ borderColor: "rgba(250,215,110,0.5)", color: "#fad76e" }}
              >
                {link.icon && <ion-icon name={link.icon} style={{ fontSize: "14px" }} />}
                <span>{link.label}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

      {createPortal(
        <AnimatePresence>
          {modalOpen && (
            <ProjectModal project={project} onClose={() => setModalOpen(false)} />
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default ProjectCard;
