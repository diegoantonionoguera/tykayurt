import path from "node:path";

export function resolveStaticFilePath(distDirectory: string, pathname: string) {
  let decodedPath: string;

  try {
    decodedPath = decodeURIComponent(pathname);
  } catch {
    return null;
  }

  if (decodedPath.includes("\0")) return null;

  const root = path.resolve(distDirectory);
  const relativePath = decodedPath.replaceAll("\\", "/").replace(/^\/+/, "") || "index.html";
  const resolved = path.resolve(root, relativePath);

  if (resolved !== root && !resolved.startsWith(`${root}${path.sep}`)) return null;

  return resolved;
}
