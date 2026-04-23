import Link from "next/link";
import StackInLoaderWeb from "@/components/stackin-loader-web";
import { Button } from "@/components/ui/button";

const nextSteps = [
  "Refresh the StackIn app on your device.",
  "Log in with the email and password you just created.",
  "Your subscription should be ready as soon as the app reloads.",
];

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-5xl items-center justify-center">
        <section className="grid w-full gap-10 rounded-3xl border border-border bg-card/60 p-8 backdrop-blur-sm lg:grid-cols-[1.05fr_0.95fr] lg:p-12">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-medium uppercase tracking-[0.08em] text-primary">
              Payment complete
            </p>
            <h1 className="mt-4 max-w-xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              You have successfully created an account.
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
              Now refresh the app and log in with your new credentials.
            </p>

            <div className="mt-8 rounded-2xl border border-border bg-background/60 p-5">
              <h2 className="text-sm font-semibold text-foreground">What to do next</h2>
              <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
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

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/login">Go to Login</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex w-full max-w-md flex-col items-center rounded-3xl border border-border bg-background/70 px-6 py-8">
              <StackInLoaderWeb
                label="Finalizing your StackIn access..."
                size={280}
                background="transparent"
                cardBackground="rgba(0,0,0,0)"
              />
              <p className="mt-2 text-center text-sm text-muted-foreground">
                Your checkout is complete and your account is ready to use in the app.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
