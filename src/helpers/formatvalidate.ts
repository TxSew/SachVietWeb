const formatPrice = (price: any) =>
  Intl.NumberFormat("en-US", {
    currency: "USD",
  }).format(Number(price));

export function formatByPrice(priceInCents: any) {
  // Convert cents to VND (Dong)
  const priceInDong = priceInCents / 100;

  // Format as a currency string in VND
  const formattedPrice = priceInDong.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0, // No decimal places for VND
  });

  return formattedPrice;
}

// Sample price in cents
export function NumberFormattingComponent(number: any) {
  // Number to be formatted
  // Format options (you can customize these as needed)
  const numberFormatOptions = {
    style: "decimal", // Other options: 'currency', 'percent', etc.
    minimumFractionDigits: 2, // Minimum decimal places
    maximumFractionDigits: 2, // Maximum decimal places
  };

  // Format the number
  const formattedNumber = new Intl.NumberFormat(
    "en-US",
    numberFormatOptions
  ).format(number);
  return `${formattedNumber} d`;
}
