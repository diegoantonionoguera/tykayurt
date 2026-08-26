import { describe, expect, it } from "vitest";
import { createApp, isAllowedOrigin } from "./app";

const api = createApp({});

describe("CORS origin policy", () => {
  it("allows configured production origins", () => {
    expect(isAllowedOrigin("https://tykayurt.example", "production", "https://tykayurt.example")).toBe(true);
  });

  it("rejects unknown production origins", () => {
    expect(isAllowedOrigin("https://attacker.example", "production", "https://tykayurt.example")).toBe(false);
  });

  it("allows only HTTP localhost during development", () => {
    expect(isAllowedOrigin("http://localhost:4200", "development")).toBe(true);
    expect(isAllowedOrigin("http://127.0.0.1:4200", "development")).toBe(true);
    expect(isAllowedOrigin("https://attacker.example", "development")).toBe(false);
  });

  it("rejects malformed origins", () => {
    expect(isAllowedOrigin("not-a-url", "development")).toBe(false);
  });
});

describe("API HTTP protections", () => {
  it("keeps the health endpoint available with defensive headers", async () => {
    const response = await api.request("/api/health");

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ status: "ok" });
    expect(response.headers.get("x-content-type-options")).toBe("nosniff");
    expect(response.headers.get("referrer-policy")).toBe("strict-origin-when-cross-origin");
    expect(response.headers.get("permissions-policy")).toContain("camera=()");
  });

  it("does not reflect an untrusted origin", async () => {
    const response = await api.request("/api/health", {
      headers: { Origin: "https://attacker.example" },
    });

    expect(response.headers.get("access-control-allow-origin")).toBeNull();
  });
});
