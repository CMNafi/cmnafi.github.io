const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

const numberFormatter = new Intl.NumberFormat("en-US");
const compactFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1
});
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric"
});

export function formatCurrency(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) {
    return "Not Disclosed";
  }

  return currencyFormatter.format(value);
}

export function formatNumber(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) {
    return "Not Disclosed";
  }

  return numberFormatter.format(value);
}

export function formatCompactNumber(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) {
    return "Not Disclosed";
  }

  return compactFormatter.format(value);
}

export function formatDate(value: string | null | undefined): string {
  if (!value) {
    return "Not Disclosed";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return dateFormatter.format(parsed);
}

export function toDisclosure(value: string | number | null | undefined): string {
  if (value == null || value === "") {
    return "Not Disclosed";
  }

  return String(value);
}

