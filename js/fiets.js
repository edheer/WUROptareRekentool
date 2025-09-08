// js/fiets.js (Voorbeeld, pas aan naar jouw exacte code)

import { translations } from './vertaalsysteem.js';
import { formatCurrency } from './utils.js'; // << NIEUW: Importeer formatCurrency

let inputsFiets, outputsFiets; // Globale variabelen voor deze module

export function initFietsTool() { // Pas dit aan als je de openModal functie nodig hebt
    inputsFiets = {
        aankoopbedrag: document.getElementById('fiets_aankoopbedrag'),
        bruto_bron: document.getElementById('fiets_bruto_bron')
    };
    outputsFiets = {
        voordeel: document.getElementById('fiets_voordeel'),
        brutoIngezet: document.getElementById('fiets_brutoIngezet'),
        nettoKosten: document.getElementById('fiets_nettoKosten')
    };

    // Logica om de '0' in input velden leeg te maken bij focus
    Object.values(inputsFiets).forEach(input => {
        if (input && input.type === 'number') {
            input.addEventListener('focus', () => {
                if (input.value === '0') {
                    input.value = '';
                }
            });
            input.addEventListener('blur', () => {
                if (input.value === '') {
                    input.value = '0';
                }
            });
        }
    });
}

export function updateFietsTool(currentLang, translations) { // Neem currentLang, translations mee
    if (!inputsFiets || !outputsFiets) {
        initFietsTool();
    }

    const aankoopbedrag = parseFloat(inputsFiets.aankoopbedrag.value) || 0;
    const brutoBron = parseFloat(inputsFiets.bruto_bron.value) || 0;

    const ingezetBruto = Math.min(aankoopbedrag, brutoBron);
    const nettoVoordeel = ingezetBruto * 0.50; // Aanname: 50% belastingvoordeel
    const nettoKosten = aankoopbedrag - nettoVoordeel;
    
    outputsFiets.voordeel.textContent = formatCurrency(nettoVoordeel, currentLang);
    outputsFiets.brutoIngezet.textContent = formatCurrency(ingezetBruto, currentLang);
    outputsFiets.nettoKosten.textContent = formatCurrency(nettoKosten, currentLang);
}