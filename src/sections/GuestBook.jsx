import React, { useState, useEffect, useRef, useMemo } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { motion } from "framer-motion";

const LOCAL_STORAGE_KEY = "portfolio_guestbook_local";
const DAY_MS = 24 * 60 * 60 * 1000;

const apiBase = (import.meta.env.VITE_GUESTBOOK_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "");

const guestbookUrl = `${apiBase}/guestbook`;
const drawingUrl = (filename) => `${apiBase}/guestbook_backend/drawings/${filename}`;

function entryIsFresh(entry) {
  const t = new Date(entry.created_at).getTime();
  return Number.isFinite(t) && Date.now() - t < DAY_MS;
}

function loadLocalEntries() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const fresh = parsed.filter(entryIsFresh);
    if (fresh.length !== parsed.length) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fresh));
    }
    return fresh;
  } catch {
    return [];
  }
}

function saveLocalEntry(entry) {
  const existing = loadLocalEntries();
  existing.unshift(entry);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));
}

function mergeServerAndLocal(serverList, localList) {
  const serverIds = new Set(serverList.map((e) => e.id));
  const localsOnly = localList.filter((e) => e.id < 0 && !serverIds.has(e.id));
  const combined = [...serverList, ...localsOnly].filter(entryIsFresh);
  combined.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  return combined;
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function GuestBook() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [offlineHint, setOfflineHint] = useState("");
  const canvasRef = useRef();

  const apiHint = useMemo(() => `API: ${apiBase}`, []);

  const fetchEntries = async () => {
    setLoading(true);
    setOfflineHint("");
    const local = loadLocalEntries();
    try {
      const res = await fetch(guestbookUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setEntries(mergeServerAndLocal(data, local));
    } catch {
      const sorted = [...local].filter(entryIsFresh).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setEntries(sorted);
      setOfflineHint(
        sorted.length
          ? "Guest book server is offline. Showing signatures from the last 24 hours saved on this device. Start the API (npm run guestbook-api) to sync."
          : "Guest book server is offline. New signatures are saved in this browser only until the API is running (npm run guestbook-api). Entries expire after 24 hours."
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEntries();
    const id = setInterval(fetchEntries, 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    let drawing = null;
    if (canvasRef.current) {
      drawing = await canvasRef.current.exportImage("png");
    }
    try {
      const res = await fetch(guestbookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message, drawing }),
      });
      if (!res.ok) throw new Error("Failed to submit entry.");
      setName("");
      setMessage("");
      if (canvasRef.current) canvasRef.current.clearCanvas();
      setOfflineHint("");
      await fetchEntries();
    } catch {
      const createdAt = new Date().toISOString();
      const localEntry = {
        id: -Date.now(),
        name,
        message,
        created_at: createdAt,
        drawing_filename: null,
        drawing_data: drawing,
      };
      saveLocalEntry(localEntry);
      setName("");
      setMessage("");
      if (canvasRef.current) canvasRef.current.clearCanvas();
      await fetchEntries();
      setOfflineHint(
        "Saved on this device only (server unreachable). Run npm run guestbook-api in another terminal for a shared guest book. Entries expire after 24 hours."
      );
    }
    setSubmitting(false);
  };

  const drawingSrc = (entry) => {
    if (entry.drawing_data) return entry.drawing_data;
    if (entry.drawing_filename) return drawingUrl(entry.drawing_filename);
    return null;
  };

  return (
    <section id="guestbook" className="mt-32 c-space">
      <h2 className="text-heading mb-2 text-center">Guest Book</h2>
      <p className="text-lg text-neutral-300 mb-8 text-center">
        Share a message or a signature—entries are kept for 24 hours, then cleared for the next day.
      </p>
      {offlineHint && (
        <p className="text-sm text-amber-200/90 text-center mb-4 max-w-xl mx-auto">{offlineHint}</p>
      )}
      {import.meta.env.DEV && (
        <p className="text-xs text-neutral-600 text-center mb-4">{apiHint}</p>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-midnight to-navy/80 border border-white/10 rounded-2xl shadow-xl p-8 max-w-2xl mx-auto flex flex-col gap-6 mb-16"
      >
        <div className="flex flex-col md:flex-row gap-6">
          <input
            className="flex-1 px-4 py-2 rounded bg-white/10 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-royal"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            className="flex-1 px-4 py-2 rounded bg-white/10 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-royal"
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={2}
          />
        </div>
        <div>
          <label className="block text-neutral-300 mb-2">Signature (optional):</label>
          <div className="rounded-lg overflow-hidden border border-white/10 bg-storm" style={{ width: 320, height: 200 }}>
            <ReactSketchCanvas
              ref={canvasRef}
              width={320}
              height={200}
              strokeWidth={4}
              strokeColor="#00FF00"
              backgroundColor="transparent"
              style={{ borderRadius: 12 }}
            />
          </div>
          <button
            type="button"
            className="mt-2 px-3 py-1 rounded bg-royal text-white font-bold hover:bg-indigo"
            onClick={() => canvasRef.current && canvasRef.current.clearCanvas()}
          >
            Clear signature
          </button>
        </div>
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-royal text-white font-bold hover:bg-indigo transition-colors duration-200 shadow self-end"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Sign Guest Book"}
        </button>
      </form>
      <h3 className="text-2xl font-bold text-white mb-6 text-center">Messages & signatures</h3>
      {loading ? (
        <p className="text-neutral-400 text-center">Loading entries...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(92,51,204,0.25)" }}
              className="relative bg-gradient-to-br from-midnight to-navy/80 border border-white/10 rounded-2xl shadow-xl overflow-hidden flex flex-col w-full max-w-xs transition-transform duration-300 hover:shadow-2xl"
            >
              <div className="flex flex-col flex-1 p-6">
                <h4 className="text-lg font-bold text-white mb-1">{entry.name}</h4>
                <p className="text-neutral-300 mb-4">{entry.message}</p>
                {drawingSrc(entry) && (
                  <img
                    src={drawingSrc(entry)}
                    alt="Signature"
                    className="rounded-lg border border-white/10 bg-storm object-contain w-full h-32 mb-2"
                  />
                )}
                <span className="text-xs text-neutral-500 mt-auto">
                  {new Date(entry.created_at).toLocaleString()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
