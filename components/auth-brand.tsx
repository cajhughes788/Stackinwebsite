import Image from "next/image";
import Link from "next/link";
import { Lock } from "lucide-react";

// Brand header and reassurance shared by the sign-up and log-in pages.
export function AuthLogo() {
  return (
    <Link href="/" className="mx-auto mb-10 flex w-fit" aria-label="521 home">
      <Image src="/images/521-logo.svg" alt="521" width={147} height={77} className="h-8 w-auto" priority />
    </Link>
  );
}

export function AuthSecurityNote() {
  return (
    <p className="mx-auto mt-6 flex max-w-md items-center justify-center gap-2 text-center text-xs text-muted-foreground">
      <Lock className="h-3.5 w-3.5 shrink-0" />
      Encrypted connection. Payments are processed securely by Stripe.
    </p>
  );
}
