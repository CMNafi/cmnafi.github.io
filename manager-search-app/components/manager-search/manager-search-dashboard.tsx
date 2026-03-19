"use client";

import { useEffect, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCompactNumber, formatCurrency, formatDate, formatNumber, toDisclosure } from "@/lib/format";
import type { Entity, ManagerSummaryResponse, SearchEntityResponse, SummaryOptions } from "@/types/finance";

const defaultOptions: SummaryOptions = {
  includeAdvProfile: true,
  includeHoldings: true,
  includeOperationalContext: true,
  includeNarrative: true
};

const optionLabels: Array<{
  key: keyof SummaryOptions;
  title: string;
  description: string;
}> = [
  {
    key: "includeAdvProfile",
    title: "ADV operating profile",
    description: "Keep operational and registration detail in the briefing payload."
  },
  {
    key: "includeHoldings",
    title: "13F holdings",
    description: "Include the top 25 grouped holdings table and portfolio totals."
  },
  {
    key: "includeOperationalContext",
    title: "Operational context",
    description: "Surface disclosure caveats, private fund count, and related-person context."
  },
  {
    key: "includeNarrative",
    title: "LLM narrative",
    description: "Request a GPT-4o written summary using only the processed inputs."
  }
];

function DataPoint({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">{label}</p>
      <p className="mt-2 text-sm text-stone-100">{value}</p>
    </div>
  );
}

function SummarySkeleton() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-6 xl:grid-cols-2">
        <Skeleton className="h-64 w-full rounded-3xl" />
        <Skeleton className="h-64 w-full rounded-3xl" />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
        <Skeleton className="h-[32rem] w-full rounded-3xl" />
        <Skeleton className="h-[32rem] w-full rounded-3xl" />
      </div>
    </div>
  );
}

export function ManagerSearchDashboard() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Entity[]>([]);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [summary, setSummary] = useState<ManagerSummaryResponse | null>(null);
  const [options, setOptions] = useState<SummaryOptions>(defaultOptions);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [summaryError, setSummaryError] = useState<string | null>(null);
  const [optionsDirty, setOptionsDirty] = useState(false);

  useEffect(() => {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length < 2 || (selectedEntity && trimmedQuery === selectedEntity.displayName)) {
      setResults([]);
      setSearchError(null);
      setIsSearching(false);
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      setIsSearching(true);
      setSearchError(null);

      try {
        const response = await fetch(`/api/search-entity?q=${encodeURIComponent(trimmedQuery)}`, {
          signal: controller.signal,
          cache: "no-store"
        });

        if (!response.ok) {
          const payload = (await response.json().catch(() => null)) as { message?: string } | null;
          throw new Error(payload?.message ?? "Entity search failed.");
        }

        const payload = (await response.json()) as SearchEntityResponse;
        setResults(payload.results);
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        setResults([]);
        setSearchError(error instanceof Error ? error.message : "Entity search failed.");
      } finally {
        if (!controller.signal.aborted) {
          setIsSearching(false);
        }
      }
    }, 300);

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [query, selectedEntity?.displayName, selectedEntity?.id]);

  const resolvedEntity = useMemo(() => summary?.entity ?? selectedEntity, [selectedEntity, summary]);

  async function runSummary(nextEntity: Entity, nextOptions: SummaryOptions = options) {
    setIsLoadingSummary(true);
    setSummaryError(null);

    try {
      const response = await fetch("/api/generate-summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ entity: nextEntity, options: nextOptions })
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { message?: string } | null;
        throw new Error(payload?.message ?? "Manager summary failed.");
      }

      const payload = (await response.json()) as ManagerSummaryResponse;
      setSummary(payload);
      setSelectedEntity(payload.entity);
      setOptionsDirty(false);
    } catch (error) {
      setSummary(null);
      setSummaryError(error instanceof Error ? error.message : "Manager summary failed.");
    } finally {
      setIsLoadingSummary(false);
    }
  }

  function handleSelectEntity(entity: Entity) {
    setSelectedEntity(entity);
    setQuery(entity.displayName);
    setResults([]);
    void runSummary(entity);
  }

  function handleOptionChange(key: keyof SummaryOptions, checked: boolean) {
    setOptions((current) => ({
      ...current,
      [key]: checked
    }));
    setOptionsDirty(true);
  }

  const searchHint = useMemo(() => {
    if (!query.trim()) {
      return "Search by manager name, CRD, or CIK.";
    }

    if (isSearching) {
      return "Looking up possible matches...";
    }

    if (searchError) {
      return searchError;
    }

    if (!results.length) {
      return "No matches yet. Try a fuller firm name or a numeric identifier.";
    }

    return `${results.length} match${results.length === 1 ? "" : "es"} available.`;
  }, [isSearching, query, results.length, searchError]);

  return (
    <div className="grid gap-6">
      <section className="grid gap-6 lg:grid-cols-[1.15fr,0.85fr]">
        <Card>
          <CardHeader>
            <CardTitle>Entity resolution</CardTitle>
            <CardDescription>
              Debounced lookup against adviser and holdings records, with CRD and CIK pulled into one shortlist.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Command>
              <CommandInput
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search a manager name, CRD, or CIK"
                aria-label="Search manager entities"
              />
              <CommandList>
                {isSearching ? (
                  <div className="space-y-2 p-2">
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                ) : results.length ? (
                  <CommandGroup heading="Matches">
                    {results.map((entity) => (
                      <CommandItem key={entity.id} onClick={() => handleSelectEntity(entity)} selected={resolvedEntity?.id === entity.id}>
                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-stone-100">{entity.displayName}</p>
                          <p className="text-xs text-stone-400">
                            {[entity.crd ? `CRD ${entity.crd}` : null, entity.cik ? `CIK ${entity.cik}` : null]
                              .filter(Boolean)
                              .join(" | ") || "Identifier pending"}
                          </p>
                        </div>
                        <div className="space-y-1 text-right text-xs text-stone-400">
                          <p>{entity.adviserType}</p>
                          <p>{entity.assetsUnderManagement != null ? `AUM ${formatCompactNumber(entity.assetsUnderManagement)}` : "AUM Not Disclosed"}</p>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ) : (
                  <CommandEmpty>{searchHint}</CommandEmpty>
                )}
              </CommandList>
            </Command>

            <p className="text-sm text-stone-400">{searchHint}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Briefing controls</CardTitle>
            <CardDescription>
              Toggle the sections you want in the output, then refresh the briefing once you are happy with the scope.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-4">
              {optionLabels.map((option) => (
                <label key={option.key} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <Checkbox
                    checked={options[option.key]}
                    onChange={(event) => handleOptionChange(option.key, event.target.checked)}
                    className="mt-0.5"
                  />
                  <span className="space-y-1">
                    <span className="block text-sm font-medium text-stone-100">{option.title}</span>
                    <span className="block text-sm leading-6 text-stone-400">{option.description}</span>
                  </span>
                </label>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button onClick={() => resolvedEntity && void runSummary(resolvedEntity, options)} disabled={!resolvedEntity || isLoadingSummary}>
                {isLoadingSummary ? "Building briefing..." : optionsDirty ? "Refresh briefing" : "Generate briefing"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedEntity(null);
                  setSummary(null);
                  setQuery("");
                  setResults([]);
                  setSummaryError(null);
                  setOptionsDirty(false);
                }}
              >
                Clear
              </Button>
            </div>

            {resolvedEntity ? (
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-stone-300">
                <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Selected manager</p>
                <p className="mt-2 font-medium text-stone-100">{resolvedEntity.displayName}</p>
                <p className="mt-1 text-stone-400">
                  {[resolvedEntity.crd ? `CRD ${resolvedEntity.crd}` : null, resolvedEntity.cik ? `CIK ${resolvedEntity.cik}` : null]
                    .filter(Boolean)
                    .join(" | ") || "Waiting for full identifier resolution"}
                </p>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </section>

      {summaryError ? (
        <Card className="border-red-400/20 bg-red-500/5">
          <CardContent className="p-5 text-sm leading-6 text-red-100">{summaryError}</CardContent>
        </Card>
      ) : null}

      {isLoadingSummary ? (
        <SummarySkeleton />
      ) : summary ? (
        <>
          {summary.warnings.length ? (
            <Card className="border-amber-300/20 bg-amber-300/5">
              <CardHeader>
                <CardTitle>Live caveats</CardTitle>
                <CardDescription>
                  These notes are generated before the narrative so the workflow stays explicit about what is missing or unusual.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm leading-6 text-amber-50">
                  {summary.warnings.map((warning) => (
                    <li key={warning}>{warning}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ) : null}

          <section className="grid gap-6 xl:grid-cols-[0.95fr,1.05fr]">
            <Card>
              <CardHeader>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{summary.entity.adviserType}</Badge>
                  {summary.filing?.periodOfReport ? (
                    <Badge className="border-cool/30 bg-cool/10 text-sky-100">13F {summary.filing.periodOfReport}</Badge>
                  ) : null}
                </div>
                <CardTitle>{summary.entity.displayName}</CardTitle>
                <CardDescription>Deterministic identifiers, filing dates, and direct links into the public records.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <DataPoint label="CRD" value={toDisclosure(summary.entity.crd)} />
                  <DataPoint label="CIK" value={toDisclosure(summary.entity.cik)} />
                  <DataPoint label="Latest ADV filing" value={formatDate(summary.advData?.filingDate ?? summary.entity.latestAdvFilingDate)} />
                  <DataPoint label="Latest 13F period" value={formatDate(summary.filing?.periodOfReport ?? summary.entity.latest13FPeriod)} />
                  <DataPoint label="AUM" value={formatCurrency(summary.advData?.aumUsd ?? summary.entity.assetsUnderManagement)} />
                  <DataPoint label="Office" value={toDisclosure(summary.advData?.officeLocation ?? summary.entity.stateOrCountry)} />
                </div>

                <div className="flex flex-wrap gap-3">
                  {summary.deepLinks.sec ? (
                    <a
                      href={summary.deepLinks.sec}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-11 items-center justify-center rounded-full bg-accent/90 px-4 text-sm font-medium text-stone-950 transition hover:bg-accent"
                    >
                      Open SEC record
                    </a>
                  ) : null}
                  {summary.deepLinks.iapd ? (
                    <a
                      href={summary.deepLinks.iapd}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 text-sm font-medium text-foreground transition hover:bg-white/10"
                    >
                      Open IAPD record
                    </a>
                  ) : null}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Narrative briefing</CardTitle>
                <CardDescription>
                  GPT-4o receives only the pruned holdings table, programmatic portfolio total, and labeled ADV fields.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-7 text-stone-200">
                {summary.narrativeSummary ? (
                  summary.narrativeSummary
                    .split("\n")
                    .filter(Boolean)
                    .map((paragraph, index) => <p key={`${paragraph.slice(0, 20)}-${index}`}>{paragraph}</p>)
                ) : (
                  <p>
                    {options.includeNarrative
                      ? "Narrative output is unavailable right now. Check whether OPENAI_API_KEY is configured or review the caveats above."
                      : "LLM narrative generation is turned off in the briefing controls."}
                  </p>
                )}
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
            {options.includeHoldings ? (
              <Card>
                <CardHeader>
                  <CardTitle>Top holdings</CardTitle>
                  <CardDescription>
                    Grouped by ticker, summed by value, sorted descending, and capped at the top 25 before any narrative call.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <DataPoint label="Total portfolio value" value={summary.totalPortfolioValueDisplay} />
                    <DataPoint label="Holdings shown" value={formatNumber(summary.holdings.length)} />
                  </div>

                  {summary.holdings.length ? (
                    <div className="overflow-hidden rounded-3xl border border-white/10">
                      <div className="max-h-[34rem] overflow-auto">
                        <table className="data-table text-sm text-stone-200">
                          <thead>
                            <tr>
                              <th>Rank</th>
                              <th>Ticker</th>
                              <th>Issuer</th>
                              <th>Value</th>
                              <th>Portfolio %</th>
                            </tr>
                          </thead>
                          <tbody>
                            {summary.holdings.map((holding, index) => (
                              <tr key={`${holding.ticker}-${index}`}>
                                <td>{index + 1}</td>
                                <td>{holding.ticker}</td>
                                <td>{holding.issuerName}</td>
                                <td>{formatCurrency(holding.totalValue)}</td>
                                <td>{holding.percentageOfPortfolio == null ? "Not Disclosed" : `${holding.percentageOfPortfolio.toFixed(2)}%`}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-6 text-stone-300">
                      No 13F holdings were available for the selected manager.
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : null}

            {options.includeAdvProfile ? (
              <Card>
                <CardHeader>
                  <CardTitle>ADV operating profile</CardTitle>
                  <CardDescription>
                    Operational detail pulled from the latest adviser filing, with missing fields left explicit instead of inferred.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <DataPoint label="Registration status" value={toDisclosure(summary.advData?.registrationStatus ?? summary.entity.registrationStatus)} />
                    <DataPoint label="SEC file number" value={toDisclosure(summary.advData?.secNumber ?? summary.entity.secNumber)} />
                    <DataPoint label="Office location" value={toDisclosure(summary.advData?.officeLocation ?? summary.entity.stateOrCountry)} />
                    <DataPoint label="Private funds" value={toDisclosure(summary.advData?.privateFundCount)} />
                    <DataPoint label="Related persons" value={toDisclosure(summary.advData?.relatedPersonCount)} />
                    <DataPoint label="Adviser filing date" value={formatDate(summary.advData?.filingDate)} />
                  </div>
                </CardContent>
              </Card>
            ) : null}
          </section>
        </>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Ready for the first manager.</CardTitle>
            <CardDescription>
              Start with a firm name, CRD, or CIK. Once you select a result, the dashboard will assemble the operating profile,
              holdings snapshot, and AI summary in one pass.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}

