// js/utils.js

export function formatCurrency(value, lang) {
    return new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'nl-NL', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
}