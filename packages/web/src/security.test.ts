import { describe, expect, it } from "vitest";
import { getSecurityHeaders, withSecurityHeaders } from "./security";

describe("security headers", () => {
  it("sets browser protections and a restrictive CSP", () => {
    const headers = getSecurityHeaders();
    expect(headers["X-Content-Type-Options"]).toBe("nosniff");
    expect(headers["Content-Security-Policy"]).toContain("object-src 'none'");
    expect(headers["Content-Security-Policy"]).toContain("base-uri 'self'");
    expect(headers["Permissions-Policy"]).toContain("camera=()");
    expect(headers["Strict-Transport-Security"]).toBeUndefined();
  });

  it("adds HSTS only for HTTPS responses", () => {
    const response = withSecurityHeaders(new Response("ok"), "https://tykayurt.example/");
    expect(response.headers.get("Strict-Transport-Security")).toContain("max-age=31536000");
  });
});
