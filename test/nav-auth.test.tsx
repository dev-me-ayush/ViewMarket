import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import NavAuth from "@/components/NavAuth";
import { useSession, signOut } from "@/lib/auth-client";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
}));

vi.mock("@/lib/auth-client", () => ({
  useSession: vi.fn(),
  signOut: vi.fn(),
  signIn: {
    social: vi.fn(),
  },
  getSession: vi.fn(),
}));

describe("NavAuth Adaptive Navigation Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders pulse skeleton loader when session is pending to prevent CLS", () => {
    vi.mocked(useSession).mockReturnValue({
      data: null,
      isPending: true,
      error: null,
    } as any);

    const { container } = render(<NavAuth />);
    const skeleton = container.querySelector(".animate-pulse");
    expect(skeleton).toBeInTheDocument();
  });

  it("renders 'Sign In' and 'Launch Studio' buttons when user is unauthenticated", () => {
    vi.mocked(useSession).mockReturnValue({
      data: null,
      isPending: false,
      error: null,
    } as any);

    render(<NavAuth />);
    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByText("Launch Studio")).toBeInTheDocument();
    expect(screen.queryByText("Dashboard")).not.toBeInTheDocument();
  });

  it("renders 'Dashboard' button and user avatar when user is authenticated", () => {
    vi.mocked(useSession).mockReturnValue({
      data: {
        session: { id: "sess_123", userId: "usr_1" },
        user: { id: "usr_1", name: "Ayush Sharma", email: "ayush@viewmarket.in" },
      },
      isPending: false,
      error: null,
    } as any);

    render(<NavAuth />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.queryByText("Sign In")).not.toBeInTheDocument();
  });

  it("opens user menu and invokes signOut when clicking Sign Out", async () => {
    vi.mocked(signOut).mockResolvedValue(undefined as any);

    vi.mocked(useSession).mockReturnValue({
      data: {
        session: { id: "sess_123", userId: "usr_1" },
        user: { id: "usr_1", name: "Ayush Sharma", email: "ayush@viewmarket.in" },
      },
      isPending: false,
      error: null,
    } as any);

    render(<NavAuth />);
    const avatarBtn = screen.getByLabelText("User account menu");
    fireEvent.click(avatarBtn);

    expect(screen.getByText("Ayush Sharma")).toBeInTheDocument();
    expect(screen.getByText("ayush@viewmarket.in")).toBeInTheDocument();

    const signOutBtn = screen.getByText("Sign Out");
    fireEvent.click(signOutBtn);

    expect(signOut).toHaveBeenCalledTimes(1);
  });
});
