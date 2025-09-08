// fiets.js
const BELASTING_PERCENTAGE = 0.50;
const MAX_AANKOOPBEDRAG = 2500;

let inputs, outputs;

function formatCurrency(value) {
    return `€ ${value.toFixed(2).replace('.', ',')}`;
}

export function initFietsTool() {
    inputs = {
        aankoopbedrag: document.getElementById('fiets_aankoopbedrag'),
        brutoBron: document.getElementById('fiets_bruto_bron')
    };

    outputs = {
        brutoIngezet: document.getElementById('fiets_brutoIngezet'),
        nettoKosten: document.getElementById('fiets_nettoKosten'),
        nettoVoordeel: document.getElementById('fiets_voordeel')
    };
}

export function updateFietsTool() {
    const brutoBron = parseFloat(inputs.brutoBron.value) || 0;
    const aankoopbedrag = parseFloat(inputs.aankoopbedrag.value) || 0;

    const result = berekenFietsVoordeel(brutoBron, aankoopbedrag);

    outputs.brutoIngezet.textContent = formatCurrency(result.brutoIngezet);
    outputs.nettoVoordeel.textContent = formatCurrency(result.nettoVoordeel);
    outputs.nettoKosten.textContent = formatCurrency(result.nettoKosten);
}

function berekenFietsVoordeel(brutoBron, aankoopbedrag) {
    const bedrag = Math.min(aankoopbedrag, MAX_AANKOOPBEDRAG, brutoBron);
    const belastingVoordeel = bedrag * BELASTING_PERCENTAGE;

    return {
        brutoIngezet: bedrag,
        nettoVoordeel: belastingVoordeel,
        nettoKosten: bedrag - belastingVoordeel
    };
}
