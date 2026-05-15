import { assetUrl } from "../utils/assetUrl";

export const myProjects = [
  {
    id: 1,
    title: "Skill Match",
    description:
      "AI Resume Analyser & Career Guider — Python, NLP, FastAPI, Next.js.",
    subDescription: [
      "Built an AI-assisted platform that analyses resumes against job descriptions, generates match scores, and surfaces strengths, weaknesses, and skill gaps.",
      "Implemented data-driven career recommendations with curated course suggestions based on profile analysis.",
    ],
    href: "https://github.com/Rohit-Doi/Skill",
    liveHref: "https://skillmatch12.vercel.app",
    logo: "",
    image: assetUrl("assets/projects/Skill.png"),
    tags: [
      { id: 1, name: "Python", path: assetUrl("assets/logos/Python-logo-notext.svg.png") },
      { id: 2, name: "NLP", path: assetUrl("assets/logos/huggingface_logo-noborder.svg") },
      { id: 3, name: "FastAPI", path: assetUrl("assets/logos/FastAPI_logo.svg.png") },
      { id: 4, name: "Next.js", path: assetUrl("assets/logos/Nextjs-logo.svg.png") },
    ],
  },
  {
    id: 2,
    title: "Hyper-personalised Landing Page Generator",
    description:
      "Full-stack e-commerce personalization platform: Next.js (frontend) + Python (FastAPI) backend. Features include user-specific recommendations, cold start strategies, Google login, user clustering, and a modern UI.",
    subDescription: [],
    href: "https://github.com/Rohit-Doi/HPLPG",
    liveHref: null,
    logo: "",
    image: assetUrl("assets/projects/hplpg.jpg"),
    tags: [
      { id: 1, name: "Next.js", path: assetUrl("assets/logos/Nextjs-logo.svg.png") },
      { id: 2, name: "FastAPI", path: assetUrl("assets/logos/FastAPI_logo.svg.png") },
      { id: 3, name: "Python", path: assetUrl("assets/logos/Python-logo-notext.svg.png") },
      { id: 4, name: "Tailwind CSS", path: assetUrl("assets/logos/tailwindcss.svg") },
    ],
  },
  {
    id: 3,
    title: "Passenger Counting in Transport System",
    description: "Python, YOLOv8, ResNet18, Computer Vision.",
    subDescription: [
      "Built an AI model to detect, track, and count passengers in real-time video streams, with polygon-based ROI filtering to improve data accuracy.",
      "Analysed occupancy trends to support safety monitoring — demonstrating ability to derive meaningful insights from raw sensor/video data.",
      "Currently in progress.",
    ],
    href: null,
    liveHref: null,
    logo: "",
    image: assetUrl("assets/projects/bus.png"),
    tags: [
      { id: 1, name: "Python", path: assetUrl("assets/logos/Python-logo-notext.svg.png") },
      { id: 2, name: "YOLO / CV", path: assetUrl("assets/logos/huggingface_logo-noborder.svg") },
      { id: 3, name: "Video", path: assetUrl("assets/logos/javascript.svg") },
    ],
  },
  {
    id: 4,
    title: "Layout Analysis – Meitei Mayek Script",
    description: "Python, Detectron2, Deep Learning.",
    subDescription: [
      "Created and labelled a custom dataset of document images, performing full data collection, annotation, and preprocessing pipeline.",
      "Trained a Detectron2 model to classify layout components, iteratively refining results through data quality improvements and hyperparameter tuning.",
      "Currently in progress.",
    ],
    href: null,
    liveHref: null,
    logo: "",
    image: assetUrl("assets/projects/layout.jpeg"),
    tags: [
      { id: 1, name: "Python", path: assetUrl("assets/logos/Python-logo-notext.svg.png") },
      { id: 2, name: "Detectron2", path: assetUrl("assets/logos/huggingface_logo-noborder.svg") },
      { id: 3, name: "Annotation", path: assetUrl("assets/logos/Figma-logo.svg.png") },
    ],
  },
];

export const mySocials = [
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/rohit-kamatam-b98443280/",
    icon: assetUrl("assets/socials/linkedIn.svg"),
  },
  {
    name: "GitHub",
    href: "https://github.com/Rohit-Doi",
    icon: assetUrl("assets/logos/GitHub_Invertocat_Logo.svg.png"),
  },
  {
    name: "Gmail",
    href: "https://mail.google.com/mail/?view=cm&to=rohitkamatam123@gmail.com",
    icon: assetUrl("assets/logos/gmail.png"),
  },
];

export const educationJourney = [
  {
    title: "B.Tech",
    job: "Malla Reddy College of Engineering and Technology, Hyderabad",
    date: "2023–2027",
    contents: [
      "Currently pursuing Bachelor's degree in Computer Science Engineering with focus on Artificial Intelligence and Machine Learning.",
      "Current CGPA: 9.34/10.",
    ],
  },
  {
    title: "Intermediate",
    job: "Little Flower Junior College, Hyderabad",
    date: "2021–2023",
    contents: [
      "Completed intermediate education with specialization in Mathematical Sciences.",
      "CGPA: 9.76/10.",
    ],
  },
  {
    title: "SSC",
    job: "St. Mary's High School, Hyderabad",
    date: "2019–2020",
    contents: [
      "Completed high school education with strong academic performance.",
      "CGPA: 10/10.",
    ],
  },
];

export const professionalExperiences = [
  {
    title: "Infosys Springboard",
    job: "AI/ML Intern — Internship 6.0, Remote",
    date: "Aug 2025 – Oct 2025",
    contents: [
      "Developed SkillMatch, an end-to-end AI-powered resume matching and skill recommendation tool, addressing real-world challenges in recruitment and talent acquisition.",
      "Built intelligent matching algorithms using ML to accurately align candidate profiles with job requirements.",
      "Applied NLP and text analysis techniques to extract structured insights from unstructured resume data.",
    ],
    certificateSrc: assetUrl("assets/experience/infosys.png"),
  },
];
