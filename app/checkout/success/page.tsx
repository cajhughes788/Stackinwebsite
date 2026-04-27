import Link from "next/link";
import StackInLoaderWeb from "@/components/stackin-loader-web";
import { Button } from "@/components/ui/button";

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-2xl items-center justify-center">
        <section className="flex w-full flex-col items-center text-center">
          <h1 className="max-w-xl text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Your checkout is complete and your account is ready in the app.
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
            Refresh StackIn on your device, then log in with the email and password you just
            created.
          </p>

          <div className="mt-8 flex w-full justify-center">
            <StackInLoaderWeb
              label="Account ready..."
              showLabel={false}
              size={280}
              background="transparent"
              cardBackground="rgba(0,0,0,0)"
              className="max-w-[16rem] sm:max-w-[18rem]"
            />
          </div>

          <div className="mt-8 flex w-full max-w-md justify-center">
            <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>

          <div className="mt-8 space-y-2 text-sm text-muted-foreground sm:text-base">
            <p>Refresh the StackIn app on your device.</p>
            <p>Log in with the email and password you just created.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
