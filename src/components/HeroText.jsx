import { FlipWords } from "./FlipWords";
import { motion } from "motion/react";

const monoName = {
  fontFamily: "'JetBrains Mono', monospace",
  fontWeight: 800,
  fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
  letterSpacing: "0.04em",
  color: "#c084fc",
  textShadow: "0 0 14px rgba(192, 132, 252, 0.5), 0 0 32px rgba(122, 87, 219, 0.2)",
  display: "inline-block",
};

const TerminalName = ({ style }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35em" }}>
    <span style={{ color: "#64748b", fontFamily: "'JetBrains Mono', monospace", fontWeight: 400, fontSize: "0.75em" }}>
      &gt;_
    </span>
    <span style={{ ...monoName, ...style }}>Rohit K.</span>
  </span>
);

const HeroText = () => {
  const words = ["Secure", "Modern", "Scalable"];
  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };
  return (
    <div className="z-10 text-center md:text-left rounded-3xl bg-clip-text">
      {/* Desktop View */}
      <div className="flex-col hidden md:flex c-space">
        <motion.h1
          className="text-4xl font-medium"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          Hi, I&apos;m <TerminalName />
        </motion.h1>
        <div className="flex flex-col items-start">
          <motion.p
            className="text-5xl font-medium text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2 }}
          >
            A Developer <br /> Dedicated to Crafting
          </motion.p>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5 }}
          >
            <FlipWords
              words={words}
              className="font-black text-white text-8xl"
            />
          </motion.div>
          <motion.p
            className="text-4xl font-medium text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.8 }}
          >
            Web Solutions
          </motion.p>
        </div>
      </div>
      {/* Mobile View */}
      <motion.div className="flex flex-col space-y-6 md:hidden">
        <motion.p
          className="text-4xl font-medium"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          Hi, I&apos;m <TerminalName style={{ fontSize: "clamp(1.4rem, 6vw, 2rem)" }} />
        </motion.p>
        <div>
          <motion.p
            className="text-5xl font-black text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2 }}
          >
            Building
          </motion.p>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5 }}
          >
            <FlipWords
              words={words}
              className="font-bold text-white text-7xl"
            />
          </motion.div>
          <motion.p
            className="text-4xl font-black text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.8 }}
          >
            Web Applications
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroText;
