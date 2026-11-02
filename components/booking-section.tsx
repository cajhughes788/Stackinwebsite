import Link from "next/link";
import { SpotlightGrid } from "./spotlight-grid";
import { ArrowRight, BellRing, BookCheck, CalendarCheck, ShieldCheck } from "lucide-react";

const points = [
  {
    icon: CalendarCheck,
    title: "Your own booking page",
    description: "Clients pick a service and an open time, any time. Instant bookings, no back-and-forth.",
  },
  {
    icon: ShieldCheck,
    title: "Deposits that protect your time",
    description: "Require a deposit to confirm. Refunds follow your cancellation policy automatically.",
  },
  {
    icon: BellRing,
    title: "Reminders that cut no-shows",
    description: "Automatic email reminders with the time, deposit paid, and balance due.",
  },
  {
    icon: BookCheck,
    title: "Finish and get paid in one tap",
    description: "Deposits are subtracted, the balance is collected, and it's already in your books.",
  },
];

export function BookingSection() {
  return (
    <section id="booking" className="scroll-mt-16 border-t border-border py-32 lg:py-48">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-20 max-w-3xl text-center lg:mb-28">
          <span className="eyebrow section-label mb-8">04 / Booking</span>
          <h2 className="mb-6 text-4xl font-normal leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
            <span className="text-balance">Appointments that pay, start to finish</span>
          </h2>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            Booking, deposits, reminders, and checkout, inside the same app that keeps your books. Works with your
            website and your calendar.
          </p>
        </div>

        <SpotlightGrid className="grid gap-px overflow-hidden rounded-lg border border-border sm:grid-cols-2 lg:grid-cols-4">
          {points.map((point) => (
            <div key={point.title} className="p-8">
              <point.icon className="mb-6 h-6 w-6 text-primary" strokeWidth={1.5} />
              <h3 className="mb-2 text-lg font-medium text-foreground">{point.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{point.description}</p>
            </div>
          ))}
        </SpotlightGrid>

        <div className="mt-14 flex justify-center">
          <Link
            href="/features#booking"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
          >
            Everything booking can do
            <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
