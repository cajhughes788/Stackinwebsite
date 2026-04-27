"use client";

import {
  LEGAL_EFFECTIVE_DATE,
  LEGAL_LAST_UPDATED,
  LEGAL_OWNER,
  PRIVACY_PAGE_INTRO,
  PRIVACY_PAGE_TITLE,
  PRIVACY_SECTIONS,
  TERMS_CLOSING_STATEMENT,
  TERMS_PAGE_INTRO,
  TERMS_PAGE_TITLE,
  TERMS_SECTIONS,
  type LegalSection,
} from "@/lib/legal";

function LegalSummaryCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8 rounded-2xl border border-border bg-background/70 p-5 text-sm leading-7 text-muted-foreground">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {children}
    </section>
  );
}

function LegalSections({ sections }: { sections: LegalSection[] }) {
  return (
    <div className="mt-10 space-y-8 text-sm leading-7 text-muted-foreground sm:text-base">
      {sections.map((section) => (
        <section key={section.title}>
          <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-3">
              {paragraph}
            </p>
          ))}
        </section>
      ))}
    </div>
  );
}

export function LegalTermsContent() {
  return (
    <>
      <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary">Terms</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground">
        {TERMS_PAGE_TITLE}
      </h1>
      <p className="mt-4 text-base leading-7 text-muted-foreground">{TERMS_PAGE_INTRO}</p>

      <LegalSummaryCard title={TERMS_PAGE_TITLE}>
        <p>
          <strong className="text-foreground">Effective Date:</strong> {LEGAL_EFFECTIVE_DATE}
        </p>
        <p>
          <strong className="text-foreground">Last Updated:</strong> {LEGAL_LAST_UPDATED}
        </p>
        <p>
          <strong className="text-foreground">Owner:</strong> {LEGAL_OWNER}
        </p>
      </LegalSummaryCard>

      <LegalSections sections={TERMS_SECTIONS} />

      <section className="mt-8">
        <p className="italic text-foreground/90">{TERMS_CLOSING_STATEMENT}</p>
      </section>
    </>
  );
}

export function LegalPrivacyContent() {
  return (
    <>
      <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary">Privacy</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground">
        {PRIVACY_PAGE_TITLE}
      </h1>
      <p className="mt-4 text-base leading-7 text-muted-foreground">{PRIVACY_PAGE_INTRO}</p>

      <LegalSummaryCard title={PRIVACY_PAGE_TITLE}>
        <p>
          <strong className="text-foreground">Effective Date:</strong> {LEGAL_EFFECTIVE_DATE}
        </p>
        <p>
          <strong className="text-foreground">Last Updated:</strong> {LEGAL_LAST_UPDATED}
        </p>
      </LegalSummaryCard>

      <LegalSections sections={PRIVACY_SECTIONS} />
    </>
  );
}
