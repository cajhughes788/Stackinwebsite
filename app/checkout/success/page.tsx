import Link from "next/link";
import StackInLoaderWeb from "@/components/stackin-loader-web";
import { Button } from "@/components/ui/button";

const nextSteps = [
  "Refresh the StackIn app on your device.",
  "Log in with the email and password you just created.",
];

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-3xl items-center">
        <section className="flex min-h-[42rem] w-full flex-col rounded-3xl border border-border bg-card/60 px-6 py-10 text-center backdrop-blur-sm sm:px-8 sm:py-12">
          <div className="flex flex-1 flex-col items-center">
            <StackInLoaderWeb
              label="Account ready..."
              size={280}
              background="transparent"
              cardBackground="rgba(0,0,0,0)"
            />
            <h1 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              You have successfully created an account.
            </h1>
            <div className="mt-10 w-full rounded-2xl border border-border bg-background/60 p-6 text-left">
              <h2 className="text-center text-base font-semibold text-foreground">What to do next</h2>
              <ol className="mt-5 space-y-3 text-sm text-muted-foreground sm:text-base">
                {nextSteps.map((step, index) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-auto flex w-full flex-col gap-3 pt-10 sm:flex-row sm:justify-center">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/login">Go to Login</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
