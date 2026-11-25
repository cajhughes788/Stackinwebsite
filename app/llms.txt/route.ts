import { APP_STORE_URL, COMPANY_NAME, SITE_URL, SUPPORT_EMAIL, WEB_APP_URL } from "@/lib/site";
import { faqs } from "@/lib/support-faqs";

// llms.txt (llmstxt.org): the site in a few lines of Markdown for AI tools, as the
// sites-engine does for every site. Facts only from the site itself.
export const dynamic = "force-static";

const pages: [string, string, string][] = [
  ["Home", "/", "Every way you get paid in one view: paychecks, Venmo, Zelle, cash, and card payments, with net pay and profit."],
  ["Features", "/features/", "Booking with deposits, QR card payments, invoices, bank sync, Venmo import, paychecks explained, expenses, profit and loss, and voice entry."],
  ["Support", "/support/", "Answers to common questions, and a form to reach the team."],
  ["Privacy Policy", "/privacy/", "How 521 collects, uses, and protects information."],
  ["Terms and Conditions", "/terms/", "The terms for using 521."],
];

export function GET() {
  const lines = [
    "# 521",
    "",
    "> 521 brings every way you get paid into one view. Connect your bank, import Venmo, and see paychecks, transfers, and cash together, with net pay and profit. For stylists, barbers, servers, freelancers, drivers, and anyone running a one-person business.",
    "",
    "## Get the app",
    "",
    `- iPhone: ${APP_STORE_URL}`,
    `- Web: ${WEB_APP_URL}`,
    "- Android: coming soon",
    "",
    "## Contact",
    "",
    `- Email: ${SUPPORT_EMAIL}`,
    `- Company: ${COMPANY_NAME}`,
    "",
    "## Pages",
    "",
    ...pages.map(([name, path, about]) => `- [${name}](${new URL(path, SITE_URL).href}): ${about}`),
    "",
    "## Questions",
    "",
    ...faqs.flatMap((f) => [`### ${f.question}`, "", f.answer, ""]),
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
