import { assetUrl } from "../lib/assetUrl";

const RESUME_URL = assetUrl("assets/Resume.pdf");

const ResumeFab = () => {
  return (
    <a
      href={RESUME_URL}
      target="_blank"
      rel="noopener noreferrer"
      title="Resume"
      aria-label="Open resume PDF"
      className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-1.5 rounded-2xl border border-white/15 bg-gradient-to-br from-midnight/95 to-navy/95 px-4 py-3 shadow-[0_8px_32px_rgba(92,51,204,0.35)] backdrop-blur-md transition-transform duration-200 hover:scale-105 hover:border-royal/50 hover:shadow-[0_12px_40px_rgba(92,51,204,0.45)]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-7 h-7 text-lavender"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
        />
      </svg>
      <span className="text-xs font-semibold tracking-wide text-white uppercase">Resume</span>
    </a>
  );
};

export default ResumeFab;
