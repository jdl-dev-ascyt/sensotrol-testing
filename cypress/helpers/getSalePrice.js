export const getSalesPrice = (cost, margin) => {
    const margenDecimal = (margin / 100);
    const precioVenta = cost / (1 - margenDecimal);
    return (Math.round(precioVenta * 100) / 100).toFixed(4);
}; 