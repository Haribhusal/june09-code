// utils/formatPrice.js
export default function formatPrice(amount) {
    return new Intl.NumberFormat('ne-NP', {
        style: 'currency',
        currency: 'NPR',
        maximumFractionDigits: 0 // remove decimal points
    }).format(amount);
}