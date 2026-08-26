import path from "node:path";
import { describe, expect, it } from "vitest";
import { resolveStaticFilePath } from "./static-files";

const dist = path.resolve("dist");

describe("resolveStaticFilePath", () => {
  it("resolves normal assets inside dist", () => {
    expect(resolveStaticFilePath(dist, "/assets/app.js")).toBe(path.join(dist, "assets", "app.js"));
    expect(resolveStaticFilePath(dist, "/")).toBe(path.join(dist, "index.html"));
  });

  it.each(["/../secret.txt", "/%2e%2e/secret.txt", "/%5c..%5csecret.txt", "/..\\secret.txt"])(
    "blocks traversal attempt %s",
    (pathname) => expect(resolveStaticFilePath(dist, pathname)).toBeNull(),
  );

  it("rejects malformed and null-byte paths", () => {
    expect(resolveStaticFilePath(dist, "/%E0%A4%A")).toBeNull();
    expect(resolveStaticFilePath(dist, "/image%00.png")).toBeNull();
  });
});
