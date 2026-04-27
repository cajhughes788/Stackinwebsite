import Link from "next/link";
import StackInLoaderWeb from "@/components/stackin-loader-web";
import { Button } from "@/components/ui/button";

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-5xl items-center justify-center">
        <section className="flex w-full flex-col items-center justify-center gap-8 text-center sm:gap-10">
          <h1 className="w-full max-w-[18rem] text-balance text-3xl font-bold tracking-tight text-foreground sm:max-w-2xl sm:text-4xl md:max-w-3xl md:text-5xl lg:max-w-4xl">
            Your checkout is complete and your account is ready in the app.
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

          <div className="flex w-full justify-center">
            <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
