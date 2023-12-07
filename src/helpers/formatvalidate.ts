const formatPrice = (price: any) =>
    Intl.NumberFormat('en-US', {
        currency: 'USD',
    }).format(Number(price));

export function formatByPrice(priceInCents: any) {
    const priceInDong = priceInCents / 100;

    const formattedPrice = priceInDong.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0, // No decimal places for VND
    });

    return formattedPrice;
}

export function NumberFormattingComponent(number: any) {
    const numberFormatOptions = {
        style: 'decimal', // Other options: 'currency', 'percent', etc.
        minimumFractionDigits: 2, // Minimum decimal places
        maximumFractionDigits: 2, // Maximum decimal places
    };

    const formattedNumber = new Intl.NumberFormat('en-US', numberFormatOptions).format(number);
    return `${formattedNumber} d`;
}
