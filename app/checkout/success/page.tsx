import Link from "next/link";
import StackInLoaderWeb from "@/components/stackin-loader-web";
import { Button } from "@/components/ui/button";

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-5xl items-center justify-center">
        <section className="flex w-full flex-col items-center justify-center gap-8 text-center sm:gap-10">
          <h1 className="w-full max-w-[18rem] text-balance text-3xl font-bold tracking-tight text-foreground sm:max-w-2xl sm:text-4xl md:max-w-3xl md:text-5xl lg:max-w-4xl">
            Your checkout is complete.
          </h1>

          <div className="flex w-full justify-center">
            <StackInLoaderWeb
              label="Account ready..."
              showLabel={false}
              size={280}
              background="transparent"
              cardBackground="rgba(0,0,0,0)"
              className="max-w-[16rem] sm:max-w-[18rem]"
            />
          </div>

          <div className="flex w-full max-w-2xl flex-col items-center gap-3 text-center">
            <p className="text-lg text-foreground sm:text-xl">
              Download the mobile app on iOS or Android.
            </p>
            <p className="text-sm text-muted-foreground sm:text-base">
              Access the web version here:
            </p>
            <a
              href="https://stackin.web.app"
              target="_blank"
              rel="noreferrer"
              className="text-base font-medium text-primary underline underline-offset-4"
            >
              StackIn Web Login
            </a>
          </div>

          <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <Button
              asChild
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto"
            >
              <a href="https://stackin.web.app" target="_blank" rel="noreferrer">
                Open Web Login
              </a>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
