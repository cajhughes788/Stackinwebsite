import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FiveToOne } from "./five-to-one";
import { IncomeMockup } from "./income-mockup";
import { ReelTour } from "./reel-tour";
import { APP_STORE_URL } from "@/lib/site";

export function HeroSection() {
  return (
    <section className="relative overflow-x-clip pt-16">
      <FiveToOne />

      {/* Pulled up under the pinned opener so it rises into view as the
          streams land in ONE, with no empty scroll in between. */}
      <div id="overview" className="relative mx-auto -mt-[18svh] max-w-7xl scroll-mt-16 px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-col items-center gap-20 pb-28 lg:flex-row lg:gap-24">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="mb-8 flex flex-col gap-2 text-[2.3rem] font-normal leading-[1.02] text-foreground sm:gap-3 sm:text-6xl lg:text-7xl">
              <span className="text-balance">Simpler tracking.</span>
              <span className="text-balance">Smarter decisions.</span>
            </h1>

            <span className="brand-rule mx-auto mb-10 lg:mx-0" />

            <p className="mx-auto mb-5 max-w-lg text-lg leading-relaxed text-muted-foreground lg:mx-0">
              For anyone paid more than one way: a paycheck, cash tips, a side gig, or a small business. 521 puts
              every income stream and expense in one simple view.
            </p>
            <p className="mx-auto mb-10 max-w-lg text-sm leading-relaxed text-foreground/80 lg:mx-0">
              Made for stylists, barbers, nail techs, tattoo artists, servers, bartenders, freelancers, drivers, and
              anyone running a one-person business.
            </p>

            <div className="mb-4 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button asChild size="lg" className="h-12 px-7 text-base">
                <Link href="/signup">Get started</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 border-border px-7 text-base text-foreground hover:bg-secondary">
                <a href={APP_STORE_URL} target="_blank" rel="noreferrer">
                  Download for iPhone
                </a>
              </Button>
            </div>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              On iPhone and the web. Android coming soon.
            </p>
          </div>

          <div className="flex w-full flex-1 flex-col items-center gap-10">
            <IncomeMockup />
            <ReelTour />
          </div>
        </div>
      </div>
    </section>
  );
}
