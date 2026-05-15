/** Prefix public asset paths for GitHub Pages (subpath base). */
export function assetUrl(path) {
  const clean = path.replace(/^\//, "");
  return `${import.meta.env.BASE_URL}${clean}`;
}
