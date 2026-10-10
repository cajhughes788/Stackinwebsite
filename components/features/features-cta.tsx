"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { APP_STORE_URL } from "@/lib/site";

export function FeaturesCTA() {
  const { user, authLoading } = useAuth();
  const showAuthCtas = !authLoading && !user;

  return (
    <section className="border-t border-border py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-4 text-3xl font-normal text-foreground sm:text-4xl">
          <span className="text-balance">All your income. One place.</span>
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">
          Set up in minutes. Know where you stand from day one.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          {showAuthCtas ? (
            <Button asChild size="lg" className="h-12 px-8 text-base">
              <Link href="/signup">Get started</Link>
            </Button>
          ) : null}
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 border-border px-8 text-base text-foreground hover:bg-secondary"
          >
            <a href={APP_STORE_URL} target="_blank" rel="noreferrer">
              Download for iPhone
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
