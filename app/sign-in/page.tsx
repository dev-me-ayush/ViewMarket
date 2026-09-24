import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import logoInverted from "@/assets/logo-landscape-inverted.png";
import { AuthIllustration } from "./_components/auth-illustration";
import { SocialAuthButtons } from "./_components/social-auth-buttons";

export const metadata: Metadata = {
  title: "Sign in · ViewMarket",
  description:
    "Sign in to ViewMarket to access your quantitative strategies, descriptive analytics, and broker workflows.",
};

export default function SignInPage() {
  return (
    <main
      className="min-h-screen flex flex-col lg:flex-row w-full font-bricolage bg-[#09090b]"
      data-purpose="split-auth-container"
    >
      <AuthIllustration />

      <section
        className="w-full lg:w-1/2 flex flex-col justify-between p-8 sm:p-12 lg:p-16 min-h-screen bg-[#09090b] border-l border-zinc-850"
        data-purpose="auth-form-panel"
      >
        <header
          className="w-full flex justify-between items-center"
          data-purpose="brand-logo-container"
        >
          <Link
            href="/"
            aria-label="ViewMarket Homepage"
            className="inline-flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 rounded-lg transition-transform hover:scale-[1.02]"
          >
            <Image
              src={logoInverted}
              alt="ViewMarket Logo"
              width={220}
              height={36}
              priority
              className="h-9 md:h-10 w-auto object-contain"
            />
          </Link>
          <Link
            href="/"
            className="text-xs text-zinc-400 hover:text-white transition-colors font-medium"
          >
            ← Back to Home
          </Link>
        </header>

        <div
          className="w-full max-w-sm sm:max-w-md mx-auto my-auto py-12"
          data-purpose="auth-options-wrapper"
        >
          <h1 className="text-2xl sm:text-[28px] font-bold text-white text-center tracking-tight mb-8">
            Sign in to ViewMarket
          </h1>

          <SocialAuthButtons />

          <div className="mt-8 text-center" data-purpose="legal-disclaimer">
            <p className="text-xs text-zinc-400 leading-relaxed">
              By continuing, you agree to our{" "}
              <Link
                className="underline hover:text-white transition-colors text-zinc-300 font-medium"
                href="/legal/terms"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                className="underline hover:text-white transition-colors text-zinc-300 font-medium"
                href="/legal/privacy"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>

        <footer
          aria-hidden="true"
          className="w-full text-transparent select-none text-xs"
        >
          &nbsp;
        </footer>
      </section>
    </main>
  );
}
