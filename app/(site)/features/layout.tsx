import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Features",
  description:
    "Booking with deposits, QR card payments, invoices, bank sync, Venmo import, net pay, expenses and P&Ls: how 521 puts every way you get paid in one place.",
  path: "/features",
});

export default function FeaturesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Every visit starts at the top, so a reload half way down never starts the
          journey mid-way (sites-engine). A #link still lands on its section, and a
          page restored from the back/forward cache reloads. Runs before the
          browser restores the scroll; JourneyScene sets it back to "auto" on leaving. */}
      <script
        dangerouslySetInnerHTML={{
          __html:
            'if("scrollRestoration"in history)history.scrollRestoration="manual";if(!location.hash)scrollTo(0,0);addEventListener("pageshow",function(e){if(e.persisted&&/^\\/features/.test(location.pathname))location.reload()});',
        }}
      />
      {children}
    </>
  );
}
