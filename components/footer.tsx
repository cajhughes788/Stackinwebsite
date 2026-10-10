import Link from "next/link";
import Image from "next/image";
import { APP_STORE_URL, COMPANY_NAME, SUPPORT_EMAIL } from "@/lib/site";

const footerColumns = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Security", href: "/#security" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Download for iPhone", href: APP_STORE_URL, external: true },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Help center", href: "/support" },
      { label: SUPPORT_EMAIL, href: `mailto:${SUPPORT_EMAIL}`, external: true },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/images/521-logo.svg"
                alt="521"
                width={147}
                height={77}
                className="h-[24px] w-auto"
              />
            </Link>
            <p className="eyebrow mt-5">All your income. One place.</p>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <p className="mb-4 text-sm font-medium text-foreground">{column.heading}</p>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        {...(link.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {COMPANY_NAME}. 521 is a product of {COMPANY_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
