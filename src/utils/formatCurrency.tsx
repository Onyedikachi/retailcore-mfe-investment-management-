export default function formatCurrency(price, fraction = 0, currency = "NGN") {
  let value = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: fraction,
  });
  return value.format(price);
}
