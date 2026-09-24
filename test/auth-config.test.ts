import { describe, it, expect } from "vitest";
import { auth } from "@/lib/auth";

describe("Better Auth Server Configuration", () => {
  it("has valid baseURL and secret configured", () => {
    expect(auth.options.baseURL).toBeDefined();
    expect(auth.options.secret).toBeDefined();
  });

  it("enforces persistent 30-day session lifespan with 1-day rolling renewal", () => {
    const sessionConfig = auth.options.session;
    expect(sessionConfig).toBeDefined();
    // 30 days = 2592000 seconds
    expect(sessionConfig?.expiresIn).toBe(60 * 60 * 24 * 30);
    // 1 day = 86400 seconds rolling update
    expect(sessionConfig?.updateAge).toBe(60 * 60 * 24);
  });

  it("configures Google and GitHub social providers", () => {
    const socialProviders = auth.options.socialProviders;
    expect(socialProviders).toBeDefined();
    expect(socialProviders?.google).toBeDefined();
    expect(socialProviders?.github).toBeDefined();
  });

  it("configures trusted origins to protect against CSRF attacks", () => {
    const trustedOrigins = auth.options.trustedOrigins;
    expect(trustedOrigins).toBeDefined();
    expect(trustedOrigins).toContain("http://localhost:3000");
  });
});
