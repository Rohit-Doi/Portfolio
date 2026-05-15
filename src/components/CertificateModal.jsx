import React from "react";

const CertificateModal = ({ isOpen, onClose, certificate }) => {
  if (!isOpen || !certificate) return null;

  const isPdf = certificate.isPdf || /\.pdf$/i.test(certificate.image || "");

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="relative max-w-4xl w-full max-h-[90vh] bg-midnight border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start gap-4 p-4 border-b border-white/10 shrink-0">
          <div>
            <h3 className="text-lg font-semibold text-white pr-2">{certificate.title}</h3>
            <p className="text-sm text-neutral-400 mt-1">{certificate.issuer}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors shrink-0 p-1 rounded-lg hover:bg-white/10"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 overflow-auto flex-1 min-h-0 bg-storm/50">
          {isPdf ? (
            <iframe
              src={certificate.image}
              title={certificate.title}
              className="w-full min-h-[65vh] rounded-lg border border-white/10 bg-white"
            />
          ) : (
            <img
              src={certificate.image}
              alt={certificate.title}
              className="w-full h-auto object-contain rounded-lg shadow-lg max-h-[calc(90vh-140px)] mx-auto block"
            />
          )}
        </div>

        {certificate.link ? (
          <div className="flex justify-end items-center p-4 border-t border-white/10 bg-midnight/80 shrink-0">
            <a
              href={certificate.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-royal text-white font-semibold hover:bg-indigo transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75V3.375A1.125 1.125 0 0 0 16.125 2.25h-9A1.125 1.125 0 0 0 6 3.375v17.25c0 .621.504 1.125 1.125 1.125h9c.621 0 1.125-.504 1.125-1.125V17.25M15.75 8.25l-7.5 7.5m0 0h6.75m-6.75 0v-6.75" />
              </svg>
              Verify certificate
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CertificateModal;
