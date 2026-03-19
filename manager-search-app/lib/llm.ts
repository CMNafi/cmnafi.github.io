import type { ADVData, Entity, Holding, SummaryOptions } from "@/types/finance";
import OpenAI from "openai";

import { toDisclosure } from "@/lib/format";

const SYSTEM_PROMPT = [
  'Write in "Professional Narrative Prose."',
  "Use only the facts supplied in the user message.",
  "Never hallucinate, estimate, or invent portfolio positions, operating facts, or regulatory details.",
  'If any ADV field is null, blank, or explicitly missing, state "Not Disclosed" instead of guessing.',
  "If there is no 13F data, say so plainly and do not infer hidden holdings.",
  "Keep the response in concise paragraphs, not bullets."
].join(" ");

function buildHoldingsMarkdownTable(holdings: Holding[]): string {
  if (!holdings.length) {
    return "No 13F holdings were available after processing.";
  }

  const rows = holdings.map((holding, index) => {
    const portfolioPct = holding.percentageOfPortfolio == null ? "Not Disclosed" : `${holding.percentageOfPortfolio.toFixed(2)}%`;
    return `| ${index + 1} | ${holding.ticker} | ${holding.issuerName} | ${holding.totalValue.toLocaleString("en-US")} | ${portfolioPct} |`;
  });

  return [
    "| Rank | Ticker | Issuer | Total Value (USD) | Portfolio % |",
    "| --- | --- | --- | ---: | ---: |",
    ...rows
  ].join("\n");
}

export async function generateManagerNarrative(params: {
  entity: Entity;
  advData: ADVData | null;
  holdings: Holding[];
  totalPortfolioValueDisplay: string;
  warnings: string[];
  options: SummaryOptions;
}): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || !params.options.includeNarrative) {
    return null;
  }

  const adv = params.advData;
  const prompt = [
    "Manager briefing inputs:",
    `- Display name: ${toDisclosure(params.entity.displayName)}`,
    `- Legal name: ${toDisclosure(params.entity.legalName)}`,
    `- CRD: ${toDisclosure(params.entity.crd)}`,
    `- CIK: ${toDisclosure(params.entity.cik)}`,
    `- Adviser type: ${toDisclosure(adv?.registrationStatus ?? params.entity.adviserType)}`,
    `- Latest ADV filing date: ${toDisclosure(adv?.filingDate ?? params.entity.latestAdvFilingDate)}`,
    `- Office location: ${toDisclosure(adv?.officeLocation)}`,
    `- Assets under management: ${toDisclosure(adv?.narrativeFields.assetsUnderManagement)}`,
    `- Private fund count: ${toDisclosure(adv?.narrativeFields.privateFundCount)}`,
    `- Related person count: ${toDisclosure(adv?.narrativeFields.relatedPersonCount)}`,
    `- Total Portfolio Value: ${params.totalPortfolioValueDisplay}`,
    "",
    "Warnings and caveats:",
    params.warnings.length ? params.warnings.map((warning) => `- ${warning}`).join("\n") : "- None",
    "",
    params.options.includeHoldings ? "Top 25 13F holdings (already grouped by ticker, summed by value, sorted descending):" : "13F holdings section omitted by user option.",
    params.options.includeHoldings ? buildHoldingsMarkdownTable(params.holdings) : "",
    "",
    params.options.includeOperationalContext
      ? "Write three short paragraphs covering manager identity, portfolio posture, and operational/regulatory context."
      : "Write two short paragraphs covering manager identity and portfolio posture only.",
    "Do not mention any fact that is not present in the inputs above."
  ]
    .filter(Boolean)
    .join("\n");

  const client = new OpenAI({ apiKey });
  const completion = await client.chat.completions.create({
    model: "gpt-4o",
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT
      },
      {
        role: "user",
        content: prompt
      }
    ]
  });

  return completion.choices[0]?.message?.content?.trim() ?? null;
}

