const formatPrice = (price: any) =>
  Intl.NumberFormat("en-US", {
    currency: "USD",
  }).format(Number(price));
