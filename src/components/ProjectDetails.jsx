import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const ProjectDetails = ({
  title,
  description,
  subDescription = [],
  image,
  tags,
  href,
  liveHref,
  closeModal,
}) => {
  const hasLinks = Boolean(href) || Boolean(liveHref);
  const scrollRef = useRef(null);
  const [imageOpacity, setImageOpacity] = useState(1);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    // Fade the image out over the first 220px of scroll
    const fade = Math.max(0, 1 - el.scrollTop / 220);
    setImageOpacity(fade);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={closeModal} />

      <motion.div
        className="relative w-full max-w-2xl mx-4 h-[90vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
        initial={{ opacity: 0, scale: 0.92, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 22, stiffness: 280 }}
      >
        {/* ── Fixed hero image behind the scroll container ── */}
        <div
          className="absolute inset-x-0 top-0 h-72 z-0 transition-opacity duration-75"
          style={{ opacity: imageOpacity }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          {/* Bottom gradient so content slides in cleanly */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-midnight" />
        </div>

        {/* ── Scrollable content panel ── */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="absolute inset-0 overflow-y-auto z-10"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {/* Spacer that matches the hero image height so content starts below */}
          <div className="h-60" />

          {/* Content card */}
          <div className="relative bg-gradient-to-b from-midnight to-navy rounded-t-3xl px-6 pt-8 pb-10 min-h-[60vh]">
            {/* Drag handle hint */}
            <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-6" />

            <h5 className="mb-2 text-2xl font-bold text-white">{title}</h5>
            <p className="mb-4 font-normal text-neutral-400">{description}</p>

            {(subDescription || []).map((subDesc, index) => (
              <p className="mb-3 font-normal text-neutral-400" key={index}>
                {subDesc}
              </p>
            ))}

            {/* Tags */}
            <div className="flex flex-wrap gap-3 mt-6">
              {tags.map((tag) => (
                <div
                  key={tag.id}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1"
                >
                  <img src={tag.path} alt={tag.name} className="size-5 rounded-sm" />
                  <span className="text-sm text-neutral-300">{tag.name}</span>
                </div>
              ))}
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center gap-4 mt-8">
              {liveHref && (
                <a
                  href={liveHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-royal/20 border border-royal/40 text-royal font-medium hover:bg-royal/30 transition-colors"
                >
                  Live Site
                  <img src="assets/arrow-up.svg" className="size-4" alt="" />
                </a>
              )}
              {href && (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/15 text-white font-medium hover:bg-white/10 transition-colors"
                >
                  GitHub
                  <img src="assets/arrow-up.svg" className="size-4" alt="" />
                </a>
              )}
              {!hasLinks && (
                <span className="text-sm text-neutral-500 font-medium italic">
                  🚧 In progress
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── Close button (always on top) ── */}
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm transition-colors"
        >
          <img src="assets/close.svg" className="w-5 h-5" alt="close" />
        </button>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
