export default function formatCurrency(price, fraction = 0, currency = "NGN") {
  let value = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency ||  "NGN",
    // currencyDisplay: "narrowSymbol",
    maximumFractionDigits: fraction,
  });
  return value.format(price);
}

export function currencyFormatter(value, currency = "NGN", showSymbol = true) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency ||  "NGN",
    // currencyDisplay: "narrowSymbol",
    minimumFractionDigits: 2,
  });

  const formattedValue = formatter.format(value);

  return showSymbol ? formattedValue : formattedValue.replace(/[^0-9.-]/g, "");
}
