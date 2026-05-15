import { useState } from "react";
import Alert from "../components/Alert";
import { Particles } from "../components/Particles";

const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || "rohitkamatam@email.com";

function buildMailtoHref({ name, email, message }) {
  const subject = `Portfolio contact from ${name}`;
  let body = `From: ${name} <${email}>\n\n${message}`;
  let href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  while (href.length > 2000 && body.length > 80) {
    body = `${body.slice(0, body.length - 40)}…(truncated)`;
    href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
  return href;
}

function openMailto(formData) {
  const href = buildMailtoHref(formData);
  const a = document.createElement("a");
  a.href = href;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [mailtoHref, setMailtoHref] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 6000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMailtoHref("");

    try {
      openMailto(formData);
      setFormData({ name: "", email: "", message: "" });
      showAlertMessage(
        "success",
        "Your email app should open with a draft ready—just press send when it looks right."
      );
    } catch {
      const href = buildMailtoHref(formData);
      setMailtoHref(href);
      showAlertMessage("danger", "Could not open your email app automatically. Use the link below.");
    }
    setIsLoading(false);
  };

  return (
    <section id="contact" className="relative flex items-center c-space section-spacing">
      <Particles
        className="absolute inset-0 -z-50"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      {showAlert && <Alert type={alertType} text={alertMessage} />}
      <div className="flex flex-col items-center justify-center max-w-md p-5 mx-auto border border-white/10 rounded-2xl bg-primary">
        <div className="flex flex-col items-start w-full gap-5 mb-10">
          <h2 className="text-heading">Let&apos;s Talk</h2>
          <p className="font-normal text-neutral-400">
            Whether you&apos;re looking to build a new website, improve your existing platform, or bring a unique project
            to life, I&apos;m here to help. When you send a message, your default email app opens with a draft to{" "}
            {CONTACT_EMAIL}.
          </p>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="feild-label">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="field-input field-input-focus"
              placeholder="John Doe"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="feild-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="field-input field-input-focus"
              placeholder="JohnDoe@email.com"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="message" className="feild-label">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              type="text"
              rows="4"
              className="field-input field-input-focus"
              placeholder="Share your thoughts..."
              autoComplete="off"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          {mailtoHref && (
            <p className="mb-4 text-sm text-neutral-300">
              <a href={mailtoHref} className="text-royal underline font-semibold">
                Open in email app
              </a>{" "}
              to send this message to {CONTACT_EMAIL}.
            </p>
          )}
          <button
            type="submit"
            className="w-full px-1 py-3 text-lg text-center rounded-md cursor-pointer bg-radial from-lavender to-royal hover-animation disabled:opacity-60"
            disabled={isLoading}
          >
            {!isLoading ? "Open email to send" : "Opening…"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
