import { motion } from "motion/react";
import { assetUrl } from "../utils/assetUrl";

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

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={closeModal}
    >
      <motion.div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-l from-midnight to-navy shadow-2xl"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-5 right-5 z-10 rounded-sm bg-midnight p-2 hover:bg-gray-500"
        >
          <img src={assetUrl("assets/close.svg")} className="h-6 w-6" alt="Close" />
        </button>
        <img src={image} alt={title} className="w-full rounded-t-2xl" />
        <motion.div className="p-5">
          <h5 className="mb-2 text-2xl font-bold text-white">{title}</h5>
          <p className="mb-3 font-normal text-neutral-400">{description}</p>
          {(subDescription || []).map((subDesc, index) => (
            <p className="mb-3 font-normal text-neutral-400" key={index}>
              {subDesc}
            </p>
          ))}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-3">
              {tags.map((tag) => (
                <img
                  key={tag.id}
                  src={tag.path}
                  alt={tag.name}
                  className="size-10 rounded-lg hover-animation"
                />
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-end gap-3">
              {liveHref ? (
                <a
                  href={liveHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-royal hover-animation"
                >
                  Live site
                  <img src={assetUrl("assets/arrow-up.svg")} className="size-4" alt="" />
                </a>
              ) : null}
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium hover-animation"
                >
                  GitHub
                  <img src={assetUrl("assets/arrow-up.svg")} className="size-4" alt="" />
                </a>
              ) : null}
              {!hasLinks ? (
                <span className="text-sm font-medium text-neutral-500">In progress</span>
              ) : null}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetails;
