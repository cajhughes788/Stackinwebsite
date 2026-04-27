"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Eye, EyeOff, X } from "lucide-react";
import { LegalPrivacyContent, LegalTermsContent } from "@/components/legal-content";
import { Button } from "@/components/ui/button";
import { ProcessingOverlay } from "@/components/processing-overlay";
import { getAuthSafe } from "@/lib/firebase";
import {
  LEGAL_CONSENT_SOURCE,
  LEGAL_CONSENT_VERSION,
  LEGAL_PRIVACY_VERSION,
  LEGAL_TERMS_VERSION,
} from "@/lib/legal";

const signupEndpoint = process.env.NEXT_PUBLIC_API_SIGNUP;

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}

type SignupResponse = {
  ok?: boolean;
  error?: string;
};

type LegalModalSection = "terms" | "privacy";

async function postSignup(payload: {
  idToken: string;
  email: string;
  phone: string;
  legalConsent: {
    version: string;
    termsVersion: string;
    privacyVersion: string;
    acceptedAt: string;
    userAgent: string;
    source: string;
  };
}) {
  const response = await fetch(signupEndpoint!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  let data: SignupResponse | null = null;

  try {
    data = (await response.json()) as SignupResponse;
  } catch {
    data = null;
  }

  return { response, data };
}

export default function SignupPage() {
  return (
    <Suspense fallback={<SignupPageFallback />}>
      <SignupPageContent />
    </Suspense>
  );
}

function SignupPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const termsSectionRef = useRef<HTMLElement | null>(null);
  const privacySectionRef = useRef<HTMLElement | null>(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [legalConsentAccepted, setLegalConsentAccepted] = useState(false);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalSection, setLegalModalSection] = useState<LegalModalSection>("terms");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!legalModalOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [legalModalOpen]);

  useEffect(() => {
    if (!legalModalOpen) {
      return;
    }

    const targetSection =
      legalModalSection === "privacy" ? privacySectionRef.current : termsSectionRef.current;
    targetSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [legalModalOpen, legalModalSection]);

  useEffect(() => {
    if (!legalModalOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setLegalModalOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [legalModalOpen]);

  function openLegalModal(section: LegalModalSection) {
    setLegalModalSection(section);
    setLegalModalOpen(true);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Use at least 8 characters for your password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!legalConsentAccepted) {
      setError("You must accept the Terms and Privacy Policy to create an account.");
      return;
    }

    if (!signupEndpoint) {
      setError("Signup endpoint is not configured.");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        getAuthSafe(),
        email,
        password,
      );

      const idToken = await userCredential.user.getIdToken();
      const payload = {
        idToken,
        email,
        phone,
        legalConsent: {
          version: LEGAL_CONSENT_VERSION,
          termsVersion: LEGAL_TERMS_VERSION,
          privacyVersion: LEGAL_PRIVACY_VERSION,
          acceptedAt: new Date().toISOString(),
          userAgent: window.navigator.userAgent,
          source: LEGAL_CONSENT_SOURCE,
        },
      };

      let { response, data } = await postSignup(payload);

      if (!response.ok || !data?.ok) {
        if (response.status === 400) {
          throw new Error(data?.error ?? "Signup failed.");
        }

        ({ response, data } = await postSignup(payload));
      }

      if (!response.ok || !data?.ok) {
        throw new Error(data?.error ?? "Signup failed.");
      }

      const nextPath = searchParams.get("next") || "/#pricing";
      router.replace(nextPath);
    } catch (error: unknown) {
      setError(getErrorMessage(error, "Unable to create your account."));
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-background px-4 py-24">
      <div className="relative mx-auto max-w-md rounded-3xl border border-border bg-card/60 p-8 backdrop-blur-sm">
        <ProcessingOverlay
          open={loading}
          label="Signing you up..."
          description="Creating your StackIn account, recording your consent, and getting your pricing options ready."
        />
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground">Create your account</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign up for StackIn, then choose the plan that fits how you work.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-primary"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-medium text-foreground">
              Phone (optional)
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="(555) 123-4567"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-primary"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-foreground">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Create a password"
                className="w-full rounded-md border border-border bg-background px-3 py-2 pr-11 text-sm text-foreground outline-none transition focus:border-primary"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Confirm password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Re-enter your password"
                className="w-full rounded-md border border-border bg-background px-3 py-2 pr-11 text-sm text-foreground outline-none transition focus:border-primary"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((current) => !current)}
                className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                aria-pressed={showConfirmPassword}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-background/70 p-4">
            <div className="flex items-start gap-3 text-sm leading-6 text-foreground">
              <input
                id="legalConsent"
                type="checkbox"
                checked={legalConsentAccepted}
                onChange={(event) => setLegalConsentAccepted(event.target.checked)}
                className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                required
              />
              <div>
                <label htmlFor="legalConsent">I have read and agree to the </label>
                <button
                  type="button"
                  onClick={() => openLegalModal("terms")}
                  className="text-primary underline underline-offset-4"
                >
                  Terms and Conditions
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  onClick={() => openLegalModal("privacy")}
                  className="text-primary underline underline-offset-4"
                >
                  Privacy Policy
                </button>
                .
              </div>
            </div>
            <p className="mt-2 pl-7 text-xs text-muted-foreground">
              This is required before your account can be created. Open the full-screen modal to
              review both documents in one place.
            </p>
          </div>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <Button type="submit" className="w-full" disabled={loading || !legalConsentAccepted}>
            {loading ? "Signing you up..." : "Continue"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary underline underline-offset-4">
            Log in
          </Link>
        </p>
      </div>

      {legalModalOpen ? (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-background"
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
        >
          <div className="flex items-center justify-between border-b border-border bg-background/95 px-4 py-4 backdrop-blur-sm sm:px-6">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary">
                Review
              </p>
              <h2 id="legal-modal-title" className="mt-2 text-2xl font-semibold text-foreground">
                Terms and Privacy
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setLegalModalOpen(false)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="Close legal documents"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-6 sm:px-6 lg:px-8">
              <section
                ref={termsSectionRef}
                className="rounded-3xl border border-border bg-card/50 p-8 shadow-sm sm:p-12"
              >
                <LegalTermsContent />
              </section>

              <section
                ref={privacySectionRef}
                className="rounded-3xl border border-border bg-card/50 p-8 shadow-sm sm:p-12"
              >
                <LegalPrivacyContent />
              </section>
            </div>
          </div>

          <div className="border-t border-border bg-background/95 px-4 py-4 backdrop-blur-sm sm:px-6">
            <div className="mx-auto flex max-w-5xl justify-end">
              <Button type="button" onClick={() => setLegalModalOpen(false)}>
                Done
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

function SignupPageFallback() {
  return (
    <main className="min-h-screen bg-background px-4 py-24">
      <div className="relative mx-auto max-w-md rounded-3xl border border-border bg-card/60 p-8 backdrop-blur-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground">Create your account</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign up for StackIn, then choose the plan that fits how you work.
          </p>
        </div>
      </div>
    </main>
  );
}
