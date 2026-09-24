import { describe, it, expect } from "vitest";
import { proxy } from "@/proxy";
import { NextRequest } from "next/server";

function createMockRequest(url: string, cookies: Record<string, string> = {}) {
  const req = new NextRequest(new URL(url, "http://localhost:3000"));
  for (const [name, value] of Object.entries(cookies)) {
    req.cookies.set(name, value);
  }
  return req;
}

describe("Edge Authentication Proxy", () => {
  it("redirects unauthenticated user accessing /dashboard/overview to /sign-in with callbackUrl", () => {
    const req = createMockRequest("http://localhost:3000/dashboard/overview");
    const res = proxy(req);
    expect(res.status).toBe(307);
    const location = res.headers.get("location");
    expect(location).toContain("/sign-in");
    expect(location).toContain("callbackUrl=%2Fdashboard%2Foverview");
  });

  it("redirects unauthenticated user accessing deep nested /dashboard/strategies/builder to /sign-in", () => {
    const req = createMockRequest("http://localhost:3000/dashboard/strategies/builder?tab=active");
    const res = proxy(req);
    expect(res.status).toBe(307);
    const location = res.headers.get("location");
    expect(location).toContain("callbackUrl=%2Fdashboard%2Fstrategies%2Fbuilder%3Ftab%3Dactive");
  });

  it("allows authenticated user with better-auth.session_token to access /dashboard/overview", () => {
    const req = createMockRequest("http://localhost:3000/dashboard/overview", {
      "better-auth.session_token": "valid_session_token_123",
    });
    const res = proxy(req);
    expect(res.status).toBe(200);
  });

  it("allows authenticated user with __Secure-better-auth.session_token to access /dashboard/overview", () => {
    const req = createMockRequest("http://localhost:3000/dashboard/overview", {
      "__Secure-better-auth.session_token": "valid_secure_token_456",
    });
    const res = proxy(req);
    expect(res.status).toBe(200);
  });

  it("redirects authenticated user visiting /sign-in to /dashboard/overview", () => {
    const req = createMockRequest("http://localhost:3000/sign-in", {
      "better-auth.session_token": "valid_session_token_123",
    });
    const res = proxy(req);
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe("http://localhost:3000/dashboard/overview");
  });

  it("redirects authenticated user visiting /login alias to /dashboard/overview", () => {
    const req = createMockRequest("http://localhost:3000/login", {
      "better-auth.session_token": "valid_session_token_123",
    });
    const res = proxy(req);
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe("http://localhost:3000/dashboard/overview");
  });

  it("redirects authenticated user visiting /signin alias to /dashboard/overview", () => {
    const req = createMockRequest("http://localhost:3000/signin", {
      "better-auth.session_token": "valid_session_token_123",
    });
    const res = proxy(req);
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe("http://localhost:3000/dashboard/overview");
  });

  it("protects against open redirect attack on authenticated sign-in visit", () => {
    const req = createMockRequest(
      "http://localhost:3000/sign-in?callbackUrl=https://attacker-phishing.com/steal",
      { "better-auth.session_token": "valid_session_token_123" }
    );
    const res = proxy(req);
    expect(res.status).toBe(307);
    // Malicious external url rejected, defaults safely to /dashboard/overview
    expect(res.headers.get("location")).toBe("http://localhost:3000/dashboard/overview");
  });

  it("protects against protocol-relative open redirect attack (//malicious.com)", () => {
    const req = createMockRequest("http://localhost:3000/sign-in?callbackUrl=//malicious.com", {
      "better-auth.session_token": "valid_session_token_123",
    });
    const res = proxy(req);
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe("http://localhost:3000/dashboard/overview");
  });

  it("respects safe relative callbackUrl for authenticated user", () => {
    const req = createMockRequest("http://localhost:3000/sign-in?callbackUrl=/dashboard/analytics", {
      "better-auth.session_token": "valid_session_token_123",
    });
    const res = proxy(req);
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe("http://localhost:3000/dashboard/analytics");
  });
});
