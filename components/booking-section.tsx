import Link from "next/link";
import { PhoneShot } from "./phone-shot";
import { PointList } from "./point-list";
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

const shot = {
  src: "/images/app/booking.webp",
  alt: "The 521 booking calendar with a haircut appointment on the day view",
  width: 720,
  height: 972,
};

export function BookingSection() {
  return (
    <section id="booking" className="scroll-mt-16 border-t border-border py-32 lg:py-48">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:gap-24 lg:px-8">
        <div>
          <span className="eyebrow section-label mb-8">04 / Booking</span>
          <h2 className="mb-6 text-4xl font-normal leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
            <span className="text-balance">Appointments that pay, start to finish</span>
          </h2>
          <p className="mb-10 max-w-xl text-lg text-muted-foreground">
            Booking, deposits, reminders, and checkout, inside the same app that keeps your books. Works with your
            website and your calendar.
          </p>
          <PointList points={points} />
          <Link
            href="/features#booking"
            className="group mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
          >
            Everything booking can do
            <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <PhoneShot shot={shot} className="mx-auto" />
      </div>
    </section>
  );
}
