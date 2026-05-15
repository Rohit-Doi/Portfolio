import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { assetUrl } from "../utils/assetUrl";

const ParallaxBackground = () => {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { damping: 50 });
  const mountain3Y = useTransform(x, [0, 0.5], ["0%", "70%"]);
  const planetsX = useTransform(x, [0, 0.5], ["0%", "-20%"]);
  const mountain2Y = useTransform(x, [0, 0.5], ["0%", "30%"]);
  const mountain1Y = useTransform(x, [0, 0.5], ["0%", "0%"]);

  return (
    <section className="pointer-events-none absolute inset-0 left-1/2 w-screen -translate-x-1/2 bg-black/40">
      <motion.div className="relative h-full min-h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0 -z-50 h-screen w-full"
          style={{
            backgroundImage: `url(${assetUrl("assets/sky2.jpg")})`,
            backgroundPosition: "bottom",
            backgroundSize: "cover",
          }}
        />
        <motion.div
          className="absolute inset-0 -z-30"
          style={{
            backgroundImage: `url(${assetUrl("assets/mountain-7.png")})`,
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: mountain3Y,
          }}
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 -z-15 pointer-events-none"
          style={{
            backgroundImage: `url(${assetUrl("assets/planets.png")})`,
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            opacity: 0.8,
            x: planetsX,
          }}
        />
        <motion.div
          className="absolute inset-0 -z-20"
          style={{
            backgroundImage: `url(${assetUrl("assets/mountain-6.png")})`,
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: mountain2Y,
          }}
        />
        <motion.div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `url(${assetUrl("assets/mountain-1.png")})`,
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: mountain1Y,
          }}
        />
      </motion.div>
    </section>
  );
};

export default ParallaxBackground;
