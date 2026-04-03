/**
 * ProjectCard – Premium reusable project card component
 * Dark-themed, image-first, with Framer Motion animations
 */

import { motion } from 'framer-motion';

const ProjectCard = ({ project, index }) => {
  const { title, label, description, image, tech, links, featured } = project;

  const primaryLink = links[0];
  const secondaryLinks = links.slice(1);

  return (
    <motion.div
      className={`project-card-premium${featured ? ' featured' : ''}`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.08 + index * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -8, transition: { duration: 0.25, ease: 'easeOut' } }}
      whileTap={{ scale: 0.98 }}
    >
      {/* ── Image Preview ── */}
      <div className="pcp-image-wrap">
        {image ? (
          <img
            src={image}
            alt={`${title} preview`}
            className="pcp-image"
            loading="lazy"
          />
        ) : (
          <div className="pcp-image-placeholder" />
        )}
        <div className="pcp-image-overlay" />
        {featured && (
          <span className="pcp-featured-badge">
            <ion-icon name="star" style={{ fontSize: '10px' }}></ion-icon>
            Featured
          </span>
        )}
      </div>

      {/* ── Card Body ── */}
      <div className="pcp-body">
        {label && <span className="pcp-label">{label}</span>}

        <h3 className="pcp-title">{title}</h3>

        <p className="pcp-description">{description}</p>

        {/* Tech Stack Pills */}
        <div className="pcp-tech-row">
          {tech.map((t, i) => (
            <span key={i} className="pcp-tech-pill">
              {t}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="pcp-actions">
          {primaryLink && (
            <a
              href={primaryLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="pcp-btn-primary"
            >
              {primaryLink.icon && (
                <ion-icon name={primaryLink.icon} style={{ fontSize: '14px' }}></ion-icon>
              )}
              <span>View Project</span>
              <ion-icon name="arrow-forward-outline" style={{ fontSize: '13px' }}></ion-icon>
            </a>
          )}

          {secondaryLinks.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="pcp-btn-secondary"
            >
              {link.icon && (
                <ion-icon name={link.icon} style={{ fontSize: '14px' }}></ion-icon>
              )}
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
