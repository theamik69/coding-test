export default function formatCurrency(value, locale = "en-US", currency = "USD") {
    if (typeof value !== "number") return "";
  
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(value);
  }
  