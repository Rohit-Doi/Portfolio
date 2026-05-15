"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data, title = "My Work Experience", headingId }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="c-space section-spacing" ref={containerRef}>
      <h2 className="text-heading" id={headingId}>
        {title}
      </h2>
      <div ref={ref} className="relative pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky z-40 flex flex-col items-center self-start max-w-xs md:flex-row top-40 lg:max-w-sm md:w-full">
              <div className="absolute flex items-center justify-center w-10 h-10 rounded-full -left-[15px] bg-midnight">
                <div className="w-4 h-4 p-2 border rounded-full bg-neutral-800 border-neutral-700" />
              </div>
              <div className="flex-col hidden gap-2 text-xl font-bold md:flex md:pl-20 md:text-4xl text-neutral-300">
                <h3>{item.date}</h3>
                <h3 className="text-3xl text-neutral-400">{item.title}</h3>
                <h3 className="text-3xl text-neutral-500">{item.job}</h3>
              </div>
            </div>

            <div className="relative w-full pl-20 pr-4 md:pl-4">
              <div className="block mb-4 text-2xl font-bold text-left text-neutral-300 md:hidden ">
                <h3>{item.date}</h3>
                <h3 className="mt-1 text-white">{item.title}</h3>
                <h3 className="mt-1 text-lg font-semibold text-neutral-400">{item.job}</h3>
              </div>
              {item.contents.map((content, index) => (
                <p className="mb-3 font-normal text-neutral-400" key={index}>
                  {content}
                </p>
              ))}
              {item.certificateSrc ? (
                <div className="mt-8 max-w-2xl">
                  {/\.pdf($|\?)/i.test(item.certificateSrc) ? (
                    <iframe
                      title={item.certificateCaption || "Certificate preview"}
                      src={item.certificateSrc}
                      className="w-full aspect-[4/3] min-h-[260px] sm:min-h-[320px] bg-neutral-100 border-0 rounded-xl"
                    />
                  ) : (
                    <img
                      src={item.certificateSrc}
                      alt={item.certificateCaption || "Certificate"}
                      className="w-full h-auto rounded-xl object-contain bg-white shadow-lg ring-1 ring-white/10"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  {item.certificateCaption ? (
                    <p className="mt-3 text-xs sm:text-sm text-neutral-400">{item.certificateCaption}</p>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-1 left-1 top-0 overflow-hidden w-[4px] rounded-full"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            transition={{ type: 'spring', stiffness: 60, damping: 18 }}
            className="absolute inset-x-0 top-0 w-[4px] bg-gradient-to-b from-[#c91da0] via-[#d32bb0] via-[#dc39c0] via-[#e647d0] to-[#f054e0] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
