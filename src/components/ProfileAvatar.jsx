import { motion } from "motion/react";

import { assetUrl } from "../lib/assetUrl";

const PROFILE_IMAGE = assetUrl("assets/profile/doi.jpeg");

const ProfileAvatar = () => {
  return (
    <motion.div
      className="order-1 flex shrink-0 justify-center md:order-2 md:justify-end"
      initial={{ opacity: 0, scale: 0.88, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.7, ease: "easeOut" }}
    >
      <motion.div
        className="relative"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute -inset-3 rounded-full bg-gradient-to-br from-lavender/40 via-royal/30 to-fuchsia/20 blur-2xl"
          aria-hidden
          animate={{ opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative rounded-full bg-gradient-to-br from-lavender via-royal to-fuchsia p-[3px] shadow-[0_0_48px_rgba(92,51,204,0.45)]">
          <motion.div
            className="rounded-full bg-midnight p-1"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
          >
            <motion.div className="size-36 overflow-hidden rounded-full ring-2 ring-white/10 sm:size-44 md:size-52 lg:size-56">
              <img
                src={PROFILE_IMAGE}
                alt="Rohit K."
                className="h-full w-full object-cover object-[center_20%]"
                loading="eager"
                decoding="async"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileAvatar;
