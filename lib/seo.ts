import type { Metadata } from "next";

// Search and sharing for each page, following the sites-engine rules: a title
// under ~60 characters, a description of 120–160 that says what the page is,
// its own canonical address, and share cards (Open Graph, X) that name this
// page, not the homepage. Every page that sets metadata goes through here.
export function pageMetadata({
  title,
  description,
  path,
  index = true,
}: {
  /** The page's own name; the layout adds " | 521". */
  title: string;
  description: string;
  /** The page's address, e.g. "/features" ("/" for home). */
  path: string;
  /** False for pages search shouldn't list (log in, sign up, checkout). */
  index?: boolean;
}): Metadata {
  // The site is exported with trailing slashes, so the canonical address has one.
  const url = path === "/" ? "/" : `${path.replace(/\/$/, "")}/`;
  const shareTitle = `${title} | 521`;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: index ? undefined : { index: false, follow: false },
    openGraph: {
      type: "website",
      url,
      siteName: "521",
      title: shareTitle,
      description,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "521: All your income. One place." }],
    },
    twitter: { card: "summary_large_image", title: shareTitle, description, images: ["/og.png"] },
  };
}
