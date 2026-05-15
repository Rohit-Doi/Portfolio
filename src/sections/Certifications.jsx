import { motion } from "framer-motion";
import { assetUrl } from "../lib/assetUrl";
import { useState, useEffect, useCallback } from "react";
import CertificateModal from "../components/CertificateModal";

const certFiles = ["aws.png", "supervised.jpeg", "nlp.png", "cnn.jpeg", "prompt.png"];

const certifications = [
  {
    id: 1,
    file: certFiles[0],
    title: "AWS Academy Graduate – Generative AI Foundations",
    issuer: "Amazon Web Services (AWS)",
    link: null,
  },
  {
    id: 2,
    file: certFiles[1],
    title: "Supervised Machine Learning: Regression and Classification",
    issuer: "DeepLearning.AI & Coursera",
    link: null,
  },
  {
    id: 3,
    file: certFiles[2],
    title: "Introduction to Natural Language Processing",
    issuer: "Infosys Springboard",
    link: null,
  },
  {
    id: 4,
    file: certFiles[3],
    title: "Convolutional Neural Networks",
    issuer: "Coursera · DeepLearning.AI",
    link: null,
  },
  {
    id: 5,
    file: certFiles[4],
    title: "Prompt Engineering",
    issuer: "Infosys Springboard",
    link: null,
  },
].map((c) => ({
  ...c,
  image: assetUrl(`assets/certificates/${encodeURIComponent(c.file)}`),
}));

const ROTATE_MS_MIN = 5000;
const ROTATE_MS_MAX = 10000;

function nextIntervalMs() {
  return ROTATE_MS_MIN + Math.random() * (ROTATE_MS_MAX - ROTATE_MS_MIN);
}

export default function Certifications() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scheduleAdvance = useCallback(() => {
    const id = window.setTimeout(() => {
      setActiveIndex((i) => (i + 1) % certifications.length);
    }, nextIntervalMs());
    return id;
  }, []);

  useEffect(() => {
    const id = scheduleAdvance();
    return () => window.clearTimeout(id);
  }, [activeIndex, scheduleAdvance]);

  const handleCertificateClick = (certificate) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
  };

  const n = certifications.length;

  return (
    <section id="certifications" className="mt-32 c-space">
      <h2 className="text-heading mb-4 text-center">Certifications & Achievements</h2>
      <p className="text-neutral-400 text-center max-w-2xl mx-auto mb-14 text-sm md:text-base">
        Credentials rotate automatically every few seconds. Click the front card or a title to view full size.
      </p>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch justify-center max-w-6xl mx-auto">
        <div className="w-full lg:w-[min(100%,22rem)] lg:order-1 order-2 flex flex-col gap-2 shrink-0">
          {certifications.map((cert, i) => (
            <button
              key={cert.id}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`text-left rounded-2xl px-4 py-3 border transition-all duration-300 ${
                i === activeIndex
                  ? "border-royal/80 bg-white/10 text-white shadow-[0_0_24px_rgba(92,51,204,0.25)]"
                  : "border-white/10 bg-midnight/40 text-neutral-400 hover:border-white/20 hover:text-neutral-200"
              }`}
            >
              <span className="text-sm font-semibold leading-snug block">{cert.title}</span>
              <span className="block text-xs text-neutral-500 mt-1.5">{cert.issuer}</span>
            </button>
          ))}
        </div>

        {/* Landscape stack — fixed aspect so certificates fit the frame */}
        <div className="relative flex justify-center items-center py-2 lg:py-0 lg:flex-1 lg:order-2 order-1 w-full min-h-[min(52vw,280px)] sm:min-h-[300px] lg:min-h-[360px]">
          <div className="relative w-full max-w-[min(100%,40rem)] aspect-[4/3] sm:aspect-[3/2]">
            {certifications.map((cert, i) => {
              const depth = (i - activeIndex + n) % n;
              const isFront = depth === 0;
              const offset = depth * 18;
              const lift = depth * -14;
              const scale = 1 - depth * 0.04;
              const opacity = 1 - depth * 0.2;
              const z = n - depth;

              return (
                <motion.button
                  key={cert.id}
                  type="button"
                  initial={false}
                  animate={{
                    x: offset,
                    y: lift,
                    scale,
                    opacity,
                    zIndex: z,
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  onClick={() => (isFront ? handleCertificateClick(cert) : setActiveIndex(i))}
                  className={`absolute inset-0 rounded-2xl border border-white/15 bg-storm overflow-hidden shadow-2xl text-left ${
                    isFront ? "cursor-pointer ring-1 ring-white/20" : "cursor-pointer"
                  }`}
                  style={{ transformOrigin: "55% 92%" }}
                  aria-label={isFront ? `View ${cert.title}` : `Show ${cert.title} in front`}
                >
                  <div className="w-full h-full bg-storm flex items-center justify-center p-1 sm:p-2">
                    <img
                      src={cert.image}
                      alt=""
                      className="max-w-full max-h-full w-auto h-auto object-contain select-none"
                      draggable={false}
                    />
                  </div>
                  {!isFront && (
                    <div className="absolute inset-0 bg-black/45 pointer-events-none rounded-2xl" aria-hidden />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      <CertificateModal isOpen={isModalOpen} onClose={closeModal} certificate={selectedCertificate} />
    </section>
  );
}
