import Link from "next/link";
import StackInLoaderWeb from "@/components/stackin-loader-web";
import { Button } from "@/components/ui/button";

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-5xl flex-col items-center justify-between">
        <section className="flex w-full flex-1 flex-col items-center justify-center gap-8 text-center sm:gap-10">
          <h1 className="w-full max-w-[18rem] text-balance text-3xl font-bold tracking-tight text-primary sm:max-w-2xl sm:text-4xl md:max-w-3xl md:text-5xl lg:max-w-4xl">
            Your checkout is complete.
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

          <div className="flex w-full max-w-2xl flex-col items-center gap-4 text-center">
            <p className="text-lg text-foreground sm:text-xl">
              Download the mobile app on iOS here:
            </p>
            <Button asChild variant="outline" className="w-full sm:w-auto">
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
          </div>
        </section>

        <div className="pt-8">
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
