import HeroText from "../components/HeroText";
import ParallaxBackground from "../components/parallaxBackground";
import ProfileAvatar from "../components/ProfileAvatar";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center overflow-hidden"
    >
      <ParallaxBackground />
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-12 c-space pt-28 pb-20 md:flex-row md:items-center md:justify-between md:gap-10 md:pt-36 md:pb-24 lg:gap-16">
        <div className="order-2 w-full min-w-0 flex-1 md:order-1 md:max-w-[58%]">
          <HeroText />
        </div>
        <ProfileAvatar />
      </div>
    </section>
  );
};

export default Hero;
