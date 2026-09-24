export function getSecurityHeaders(isHttps = false) {
  const headers: Record<string, string> = {
    "Content-Security-Policy": [
      "default-src 'self'",
      "script-src 'self' https://www.googletagmanager.com https://connect.facebook.net",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: https://www.facebook.com https://*.google-analytics.com https://www.googletagmanager.com",
      "connect-src 'self' https://*.google-analytics.com https://www.googletagmanager.com https://www.facebook.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'none'",
      "frame-ancestors 'none'",
    ].join("; "),
    "Cross-Origin-Opener-Policy": "same-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
  };

  if (isHttps) {
    headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains";
  }

  return headers;
}

export function withSecurityHeaders(response: Response, requestUrl: string) {
  const secured = new Response(response.body, response);
  const isHttps = new URL(requestUrl).protocol === "https:";

  for (const [name, value] of Object.entries(getSecurityHeaders(isHttps))) {
    secured.headers.set(name, value);
  }

  return secured;
}
