"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import StackInLoaderWeb from "@/components/stackin-loader-web";
import { Button } from "@/components/ui/button";
import type { AppSource } from "@/lib/app-source";
import { getAppSource } from "@/lib/app-source";

type SuccessPageContentProps = {
  source: AppSource | null;
};

export function CheckoutSuccessPageContent({ source }: SuccessPageContentProps) {
  const isIosAppSource = source === "ios-app";

  return (
    <main className="min-h-screen bg-background px-4 py-16 sm:px-6 lg:px-8">
      <div
        className={`mx-auto flex w-full max-w-5xl flex-col items-center ${
          isIosAppSource
            ? "min-h-screen justify-center py-6"
            : "min-h-[calc(100vh-8rem)] justify-between"
        }`}
      >
        <section
          className={`flex w-full flex-col items-center justify-center text-center ${
            isIosAppSource ? "max-w-2xl gap-6 sm:gap-8" : "flex-1 gap-8 sm:gap-10"
          }`}
        >
          <h1 className="w-full max-w-[18rem] text-balance text-3xl font-bold tracking-tight text-primary sm:max-w-2xl sm:text-4xl md:max-w-3xl md:text-5xl lg:max-w-4xl">
            {isIosAppSource ? "Your account is ready." : "Your checkout is complete."}
          </h1>

          <div className="flex w-full justify-center">
            <StackInLoaderWeb
              label="Account ready..."
              showLabel={false}
              size={320}
              background="transparent"
              cardBackground="rgba(0,0,0,0)"
              className="max-w-[18rem] sm:max-w-[20rem]"
            />
          </div>

          <div
            className={`flex w-full flex-col items-center text-center ${
              isIosAppSource ? "max-w-xl gap-3" : "max-w-2xl gap-4"
            }`}
          >
            {isIosAppSource ? (
              <>
                <p className="max-w-lg text-balance text-lg text-foreground sm:text-xl">
                  Close this page and return to the StackIn app.
                </p>
                <p className="max-w-lg text-balance text-sm text-muted-foreground sm:text-base">
                  Then log in with the email and password you just created.
                </p>
              </>
            ) : (
              <>
                <p className="text-lg text-foreground sm:text-xl">
                  Download the mobile app on iOS here:
                </p>
                <Button
                  asChild
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto"
                >
                  <a
                    href="https://apps.apple.com/us/app/stack-in/id6764385326"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Stack-In
                  </a>
                </Button>
                <p className="text-sm text-muted-foreground sm:text-base">
                  Coming soon to Android.
                </p>
                <p className="pt-2 text-sm text-muted-foreground sm:text-base">
                  Access the web login here:
                </p>
                <Button
                  asChild
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto"
                >
                  <a href="https://stackin.web.app" target="_blank" rel="noreferrer">
                    Open Web Login
                  </a>
                </Button>
              </>
            )}
          </div>
        </section>

        {!isIosAppSource ? (
          <div className="pt-8">
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        ) : null}
      </div>
    </main>
  );
}

export function CheckoutSuccessPageContentWithSearchParams() {
  const searchParams = useSearchParams();
  const source = getAppSource(searchParams.get("source"));

  return <CheckoutSuccessPageContent source={source} />;
}
