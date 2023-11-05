export const numberFormat = (number: any) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    number
  );
