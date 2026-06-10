/** Base path for GitHub Pages (`/reddy-anna-book`) or empty for local / custom domain. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix local asset paths with the deployment base path. */
export function assetPath(path: string): string {
  if (!path) return path;
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:")
  ) {
    return path;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}`;
}
