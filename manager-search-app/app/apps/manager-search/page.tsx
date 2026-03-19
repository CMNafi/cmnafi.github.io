import type { Metadata } from "next";

import { ManagerSearchDashboard } from "@/components/manager-search/manager-search-dashboard";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Manager Search",
  description: "A manager intelligence dashboard for linking investment advisers to Form ADV data, 13F holdings, and AI-generated briefings."
};

export default function ManagerSearchPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-10 px-5 py-10 sm:px-8 lg:px-10">
      <section className="grid gap-6 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-panel backdrop-blur-sm lg:grid-cols-[1.15fr,0.85fr] lg:p-8">
        <div className="space-y-5">
          <Badge className="w-fit border-accent/20 bg-accent/10 text-amber-200">Institutional manager intelligence</Badge>
          <div className="space-y-4">
            <h1 className="font-serif text-4xl tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Resolve the manager. Read the filings. Keep the story straight.
            </h1>
            <p className="max-w-3xl text-base leading-7 text-stone-300 sm:text-lg">
              Search by name, CRD, or CIK. Pull together Form ADV operating context, the latest 13F holdings snapshot, and a
              disciplined narrative summary that only uses pruned inputs.
            </p>
          </div>
        </div>

        <div className="grid gap-4 text-sm text-stone-300">
          <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Hard rules</p>
            <ul className="mt-3 space-y-3 leading-6">
              <li>13F data is grouped by ticker, summed by value, sorted descending, and trimmed to the top 25 before any LLM call.</li>
              <li>Total portfolio value is calculated in code and passed as a static string.</li>
              <li>Missing ADV fields are treated as Not Disclosed, never guessed.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Who this is for</p>
            <p className="mt-3 leading-6">
              Investors, allocators, analysts, and diligence teams who want a cleaner starting point for manager research.
            </p>
          </div>
        </div>
      </section>

      <ManagerSearchDashboard />
    </main>
  );
}

