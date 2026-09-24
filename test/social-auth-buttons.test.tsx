import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SocialAuthButtons } from "@/app/sign-in/_components/social-auth-buttons";
import { signIn } from "@/lib/auth-client";

vi.mock("@/lib/auth-client", () => ({
  signIn: {
    social: vi.fn(),
  },
  signOut: vi.fn(),
  useSession: vi.fn(),
  getSession: vi.fn(),
}));

describe("SocialAuthButtons Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders both GitHub and Google social login buttons", () => {
    render(<SocialAuthButtons />);
    expect(screen.getByText("Sign in with GitHub")).toBeInTheDocument();
    expect(screen.getByText("Sign in with Google")).toBeInTheDocument();
  });

  it("triggers GitHub social login with /dashboard/overview callback", async () => {
    vi.mocked(signIn.social).mockResolvedValue(undefined as any);

    render(<SocialAuthButtons />);
    const githubBtn = screen.getByText("Sign in with GitHub");
    fireEvent.click(githubBtn);

    expect(signIn.social).toHaveBeenCalledWith({
      provider: "github",
      callbackURL: "/dashboard/overview",
    });
  });

  it("triggers Google social login with /dashboard/overview callback", async () => {
    vi.mocked(signIn.social).mockResolvedValue(undefined as any);

    render(<SocialAuthButtons />);
    const googleBtn = screen.getByText("Sign in with Google");
    fireEvent.click(googleBtn);

    expect(signIn.social).toHaveBeenCalledWith({
      provider: "google",
      callbackURL: "/dashboard/overview",
    });
  });

  it("displays error message if social sign-in throws an exception", async () => {
    vi.mocked(signIn.social).mockRejectedValue(
      new Error("OAuth popup blocked or network error")
    );

    render(<SocialAuthButtons />);
    const googleBtn = screen.getByText("Sign in with Google");
    fireEvent.click(googleBtn);

    await waitFor(() => {
      expect(screen.getByText("OAuth popup blocked or network error")).toBeInTheDocument();
    });
  });
});
