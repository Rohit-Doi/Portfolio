import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages project site: https://<user>.github.io/<repo>/
// User site (repo named <user>.github.io): served at root → base "/"
function githubPagesBase() {
  const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
  if (!repo) return "/";
  const owner = process.env.GITHUB_REPOSITORY?.split("/")[0];
  if (repo === `${owner}.github.io`) return "/";
  return `/${repo}/`;
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.VITE_BASE_PATH || githubPagesBase(),
});
