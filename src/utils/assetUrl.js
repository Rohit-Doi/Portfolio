/**
 * Build a URL for files in `public/` that works locally and on GitHub Pages.
 * @param {string} path - e.g. "assets/profile/doi.jpeg" or "/assets/profile/doi.jpeg"
 */
export function assetUrl(path) {
  const normalized = path.replace(/^\//, "");
  return `${import.meta.env.BASE_URL}${normalized}`;
}
