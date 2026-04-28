"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  getAuth,
  inMemoryPersistence,
  setPersistence,
  signInAnonymously,
  type User,
} from "firebase/auth";
import { AlertCircle, CheckCircle2, LifeBuoy, MessageSquare, ShieldAlert, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProcessingOverlay } from "@/components/processing-overlay";
import { useAuth } from "@/components/auth-provider";
import { getNamedFirebaseApp } from "@/lib/firebase";

const supportEndpoint =
  process.env.NEXT_PUBLIC_API_SUPPORT ??
  "https://submitsupportreport-3lc2fwdgwq-uc.a.run.app";

const websiteBuildId =
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ??
  process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_ID ??
  "website-public-support";

const supportKinds = [
  {
    value: "help",
    label: "Help",
    description: "Getting started, navigation, or feature guidance.",
    icon: LifeBuoy,
  },
  {
    value: "problem",
    label: "Problem",
    description: "Something is broken or not working as expected.",
    icon: ShieldAlert,
  },
  {
    value: "question",
    label: "Question",
    description: "Billing, account, or workflow questions.",
    icon: MessageSquare,
  },
  {
    value: "feedback",
    label: "Feedback",
    description: "Ideas, requests, or general product feedback.",
    icon: Sparkles,
  },
] as const;

type SupportKind = (typeof supportKinds)[number]["value"];

type SubmitState = "idle" | "submitting" | "success" | "error";

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}

function inferDeviceType(userAgent: string) {
  const normalizedUserAgent = userAgent.toLowerCase();

  if (/ipad|tablet|playbook|silk/.test(normalizedUserAgent)) {
    return "tablet";
  }

  if (/mobi|android|iphone|ipod/.test(normalizedUserAgent)) {
    return "mobile";
  }

  return "desktop";
}

export function SupportForm() {
  const { user, authLoading } = useAuth();
  const [kind, setKind] = useState<SupportKind>("help");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState("");

  const signedInEmail = user?.email ?? "";
  const effectiveEmail = useMemo(() => email.trim() || signedInEmail, [email, signedInEmail]);

  useEffect(() => {
    if (!signedInEmail) {
      return;
    }

    setEmail(signedInEmail);
  }, [signedInEmail]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (authLoading) {
      setError("Please wait a moment while we finish checking your account.");
      return;
    }

    if (!supportEndpoint) {
      setError("Support submissions are not configured yet.");
      return;
    }

    if (!effectiveEmail) {
      setError("Add an email so the support team can follow up.");
      return;
    }

    if (!message.trim()) {
      setError("Add a little detail so we can understand the request.");
      return;
    }

    setState("submitting");

    try {
      const supportUser = await resolveSupportUser(user);
      const idToken = await supportUser.getIdToken();
      const submittedAt = new Date().toISOString();
      const pageUrl = window.location.href;
      const payload = {
        kind,
        message: buildSupportMessage({
          email: effectiveEmail,
          message,
          submittedAt,
          pageUrl,
          signedIn: Boolean(user && !user.isAnonymous),
        }),
        context: {
          route: window.location.pathname,
          workspaceId: null,
          workspaceType: null,
          workspaceName: null,
          deviceType: inferDeviceType(window.navigator.userAgent),
          platform: window.navigator.platform || "unknown",
          buildId: websiteBuildId,
          userAgent: window.navigator.userAgent,
          capturedAt: submittedAt,
          recentLogs: [],
        },
      };

      const response = await fetch(supportEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(payload),
      });

      let data: { ok?: boolean; error?: string } | null = null;

      try {
        data = (await response.json()) as { ok?: boolean; error?: string };
      } catch {
        data = null;
      }

      if (!response.ok || data?.ok === false) {
        throw new Error(data?.error ?? "Unable to submit your support request.");
      }

      setMessage("");
      setState("success");
    } catch (submitError: unknown) {
      setState("idle");
      setError(
        getSupportSubmitErrorMessage(submitError),
      );
    }
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-card/60 p-6 shadow-sm backdrop-blur-sm sm:p-8">
      <ProcessingOverlay
        open={state === "submitting"}
        label="Sending your request..."
        description="Packaging your message and forwarding it to the same support pipeline used in the app."
      />

      <div className="mb-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/70 px-3 py-1 text-xs font-medium text-muted-foreground">
          Public support
        </span>
        <h2 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">Send a support request</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Choose the closest category, add enough detail for us to reproduce the issue, and we’ll route it through the same backend support flow used by the app.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-foreground">What do you need help with?</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {supportKinds.map((supportKind) => {
              const Icon = supportKind.icon;
              const active = supportKind.value === kind;

              return (
                <label
                  key={supportKind.value}
                  className={`flex cursor-pointer gap-3 rounded-2xl border px-4 py-3 transition ${
                    active
                      ? "border-primary bg-primary/10 shadow-[0_0_0_1px_rgba(94,221,146,0.2)]"
                      : "border-border bg-background/70 hover:border-primary/40 hover:bg-card"
                  }`}
                >
                  <input
                    type="radio"
                    name="kind"
                    value={supportKind.value}
                    checked={active}
                    onChange={() => setKind(supportKind.value)}
                    className="sr-only"
                  />
                  <div
                    className={`mt-0.5 rounded-xl border p-2 ${
                      active ? "border-primary/30 bg-primary/15 text-primary" : "border-border bg-card text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{supportKind.label}</p>
                    <p className="mt-1 text-sm leading-5 text-muted-foreground">
                      {supportKind.description}
                    </p>
                  </div>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div>
          <label htmlFor="support-email" className="mb-2 block text-sm font-medium text-foreground">
            Contact email
          </label>
          <input
            id="support-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-primary"
            autoComplete="email"
            required
          />
          <p className="mt-2 text-xs text-muted-foreground">
            We’ll include this with the request so the team can respond outside the app if needed.
          </p>
        </div>

        <div>
          <label htmlFor="support-message" className="mb-2 block text-sm font-medium text-foreground">
            Message
          </label>
          <textarea
            id="support-message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Tell us what happened, what you expected, and anything else that would help."
            className="min-h-40 w-full rounded-xl border border-border bg-background px-3 py-3 text-sm text-foreground outline-none transition focus:border-primary"
            required
          />
          <p className="mt-2 text-xs text-muted-foreground">
            If this is a bug, include the device you were using and the last step before the issue happened.
          </p>
        </div>

        {error ? (
          <div className="flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-red-200">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>{error}</p>
          </div>
        ) : null}

        {state === "success" ? (
          <div className="flex items-start gap-3 rounded-2xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-foreground">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p>Your request has been sent. If we need more detail, we’ll follow up using the email you provided.</p>
          </div>
        ) : null}

        <Button type="submit" className="w-full" disabled={state === "submitting"}>
          {state === "submitting" ? "Sending request..." : "Submit support request"}
        </Button>
      </form>
    </div>
  );
}

function buildSupportMessage({
  email,
  message,
  submittedAt,
  pageUrl,
  signedIn,
}: {
  email: string;
  message: string;
  submittedAt: string;
  pageUrl: string;
  signedIn: boolean;
}) {
  return [
    "[Website support request]",
    `Contact email: ${email}`,
    `Submitted at: ${submittedAt}`,
    `Page URL: ${pageUrl}`,
    `Signed in on website: ${signedIn ? "yes" : "no"}`,
    "",
    message.trim(),
  ].join("\n");
}

async function resolveSupportUser(currentUser: User | null) {
  if (currentUser) {
    return currentUser;
  }

  const supportAuth = getAuth(getNamedFirebaseApp("support-public"));
  await setPersistence(supportAuth, inMemoryPersistence);

  if (supportAuth.currentUser) {
    return supportAuth.currentUser;
  }

  const credentials = await signInAnonymously(supportAuth);
  return credentials.user;
}

function getSupportSubmitErrorMessage(error: unknown) {
  const fallback =
    "We couldn't send your request right now. Please try again or use the in-app support flow.";
  const message = getErrorMessage(error, fallback);

  if (
    message.includes("auth/admin-restricted-operation") ||
    message.includes("auth/operation-not-allowed")
  ) {
    return "Public support submissions are not enabled in Firebase yet. Once anonymous auth is turned on, this page can send requests to the shared support backend.";
  }

  return message;
}
