import { NextRequest, NextResponse } from "next/server";

import { generateManagerNarrative } from "@/lib/llm";
import {
  aggregateHoldings,
  buildIapdLink,
  buildSecLink,
  fetch13FHoldings,
  fetchLatest13FCoverPage,
  fetchLatestAdvRecord,
  fetchPrivateFundCount,
  fetchRelatedPersonCount,
  mergeEntity,
  normalizeAdvData
} from "@/lib/sec-api";
import type { GenerateSummaryRequest, ManagerSummaryResponse, SummaryOptions } from "@/types/finance";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const defaultOptions: SummaryOptions = {
  includeAdvProfile: true,
  includeHoldings: true,
  includeOperationalContext: true,
  includeNarrative: true
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<GenerateSummaryRequest>;
    if (!body.entity) {
      return NextResponse.json({ message: "Entity payload is required." }, { status: 400 });
    }

    const options: SummaryOptions = {
      ...defaultOptions,
      ...(body.options ?? {})
    };

    let entity = body.entity;

    const advRecord = await fetchLatestAdvRecord(entity);
    const [privateFundsResult, relatedPersonsResult] = entity.crd
      ? await Promise.allSettled([fetchPrivateFundCount(entity.crd), fetchRelatedPersonCount(entity.crd)])
      : [
          { status: "fulfilled", value: null } as const,
          { status: "fulfilled", value: null } as const
        ];

    const advData = normalizeAdvData(advRecord, entity, {
      privateFundCount: privateFundsResult.status === "fulfilled" ? privateFundsResult.value : null,
      relatedPersonCount: relatedPersonsResult.status === "fulfilled" ? relatedPersonsResult.value : null
    });

    if (advData) {
      entity = mergeEntity(entity, {
        displayName: advData.businessName,
        legalName: advData.legalName,
        crd: advData.crd,
        cik: advData.cik,
        secNumber: advData.secNumber,
        adviserType:
          advData.isExemptReportingAdviser
            ? "Exempt Reporting Adviser"
            : entity.adviserType === "Not Disclosed"
              ? "Registered Investment Adviser"
              : entity.adviserType,
        registrationStatus: advData.registrationStatus,
        latestAdvFilingDate: advData.filingDate,
        assetsUnderManagement: advData.aumUsd
      });
    }

    const filing = await fetchLatest13FCoverPage({
      crd: entity.crd,
      cik: entity.cik,
      name: entity.displayName
    });

    if (filing) {
      entity = mergeEntity(entity, {
        displayName: filing.managerName ?? entity.displayName,
        cik: entity.cik ?? filing.cik,
        crd: entity.crd ?? filing.crd,
        latest13FPeriod: filing.periodOfReport,
        latest13FFiledAt: filing.filedAt
      });
    }

    const rawHoldings = options.includeHoldings && filing?.accessionNo ? await fetch13FHoldings(filing.accessionNo) : [];
    const holdingsSummary = aggregateHoldings(rawHoldings);

    const warnings: string[] = [];

    if (advData?.isExemptReportingAdviser) {
      warnings.push("This firm appears to be an Exempt Reporting Adviser, so some ADV fields may be absent or less detailed.");
    }

    if (!filing || !holdingsSummary.holdings.length) {
      warnings.push(
        "No 13F holdings were found. Firms under the Section 13(f) reporting threshold or without eligible holdings may have no filing obligation."
      );
    }

    if ((advData?.aumUsd ?? entity.assetsUnderManagement ?? 0) < 100_000_000 && !holdingsSummary.holdings.length) {
      warnings.push("Reported assets appear below the common 13F threshold, so the absence of holdings data may be expected.");
    }

    if (!advRecord) {
      warnings.push("A current ADV firm record was not fully resolved from the selected entity, so some operating fields may remain Not Disclosed.");
    }

    if (!process.env.OPENAI_API_KEY && options.includeNarrative) {
      warnings.push("OPENAI_API_KEY is not configured, so the narrative summary could not be generated.");
    }

    const narrativeSummary = await generateManagerNarrative({
      entity,
      advData,
      holdings: options.includeHoldings ? holdingsSummary.holdings : [],
      totalPortfolioValueDisplay: options.includeHoldings ? holdingsSummary.totalPortfolioValueDisplay : "$0",
      warnings,
      options
    });

    const response: ManagerSummaryResponse = {
      entity,
      deepLinks: {
        sec: buildSecLink(entity.cik),
        iapd: buildIapdLink(entity.crd)
      },
      advData,
      filing,
      holdings: options.includeHoldings ? holdingsSummary.holdings : [],
      totalPortfolioValue: options.includeHoldings ? holdingsSummary.totalPortfolioValue : 0,
      totalPortfolioValueDisplay: options.includeHoldings ? holdingsSummary.totalPortfolioValueDisplay : "$0",
      narrativeSummary,
      warnings,
      options
    };

    return NextResponse.json(response, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Summary generation failed.";
    return NextResponse.json({ message }, { status: 500, headers: { "Cache-Control": "no-store" } });
  }
}

