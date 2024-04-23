export default function formatCurrency(price, fraction = 0, currency = "NGN") {
  let value = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "NGN",
    // currencyDisplay: "narrowSymbol",
    maximumFractionDigits: fraction,
  });
  return value.format(price);
}

export function currencyFormatter(
  value,
  currency = "NGN",
  showSymbol = true,
  minimumFractionDigits = 0
) {
  if (!currency || currency?.length > 4) currency = "NGN";
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "NGN",
    currencyDisplay: "code",
    minimumFractionDigits,
  });

  const formattedValue = formatter.format(value);

  return showSymbol ? formattedValue : formattedValue.replace(/[^0-9.-]/g, "");
}

export function numberFormatter(value, minimumFractionDigits = 0) {
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits,
  });

  return formatter.format(value);
}
