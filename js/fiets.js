// js/fiets.js

import { formatCurrency } from './utils.js';
import { translations } from './vertaalsysteem.js';

const BELASTING_PERCENTAGE = 0.50;
let inputs, outputs;

// Functie om de DOM-elementen te initialiseren
export function initFietsTool() {
    if (inputs) return; // Voorkom herinitialisatie

    inputs = {
        aankoopbedrag: document.getElementById('fiets_aankoopbedrag'),
        vakantiegeld: document.getElementById('max_vakantiegeld_fiets'),
        eindejaarsuitkering: document.getElementById('max_eindejaarsuitkering_fiets'),
        keuzeInzet: document.getElementById('keuze_inzet_fiets')
    };
    outputs = {
        // Budget
        budgetBronNaam: document.getElementById('budget_bron_naam_fiets'),
        budgetTotaal: document.getElementById('budget_bron_totaal_fiets'),
        budgetInzet: document.getElementById('budget_inzet_fiets'),
        progressBar: document.getElementById('progress_bar_fiets'),
        
        // Resultaat
        verschilNetto: document.getElementById('fiets_verschil_netto'),

        // Details
        bronNamen: document.querySelectorAll('.sub-label.bron_naam_fiets'),
        huidigBruto: document.getElementById('fiets_huidig_bruto'),
        huidigBelasting: document.getElementById('fiets_huidig_belasting'),
        huidigNetto: document.getElementById('fiets_huidig_netto'),
        nieuwBruto: document.getElementById('fiets_nieuw_bruto'),
        nieuwBelasting: document.getElementById('fiets_nieuw_belasting'),
        nieuwUitruil: document.getElementById('fiets_nieuw_uitruil'),
        nieuwNetto: document.getElementById('fiets_nieuw_netto')
    };

    // Voeg focus/blur events toe voor deze tool
    Object.values(inputs).forEach(input => {
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

// Functie om de berekening te updaten
export function updateFietsTool(currentLang) {
    if (!inputs || !outputs) {
        initFietsTool();
    }

    // Lees de input waarden
    const aankoopbedrag = Math.min(parseFloat(inputs.aankoopbedrag.value) || 0, 2500);
    const vakantiegeld = parseFloat(inputs.vakantiegeld.value) || 0;
    const eindejaarsuitkering = parseFloat(inputs.eindejaarsuitkering.value) || 0;
    const keuze = inputs.keuzeInzet.value;

    // --- BEREKENING ---

    // 1. Bepaal het beschikbare budget en de naam van de bron
    let brutoBron;
    let bronNaamKey;
    switch (keuze) {
        case 'vakantiegeld':
            brutoBron = vakantiegeld;
            bronNaamKey = 'optionHolidayPay';
            break;
        case 'beide':
            brutoBron = vakantiegeld + eindejaarsuitkering;
            bronNaamKey = 'optionBoth';
            break;
        case 'eindejaarsuitkering':
        default:
            brutoBron = eindejaarsuitkering;
            bronNaamKey = 'optionYearEndBonus';
            break;
    }

    // 2. Bepaal het daadwerkelijk ingezette bedrag (het aankoopbedrag, maar nooit meer dan het budget)
    const ingezetBruto = Math.min(aankoopbedrag, brutoBron);

    // 3. Bereken de situaties en het voordeel
    const belastingHuidig = brutoBron * BELASTING_PERCENTAGE;
    const nettoHuidig = brutoBron - belastingHuidig;

    const brutoBronNieuw = brutoBron - ingezetBruto;
    const belastingNieuw = brutoBronNieuw * BELASTING_PERCENTAGE;
    const nettoNieuw = brutoBronNieuw - belastingNieuw + ingezetBruto;

    const verschilNetto = nettoNieuw - nettoHuidig;

    // --- UPDATE VAN DE INTERFACE ---

    // Update bronnaam in budget en details
    const bronNaamText = translations[currentLang][bronNaamKey];
    outputs.budgetBronNaam.textContent = bronNaamText;
    outputs.bronNamen.forEach(el => el.textContent = bronNaamText);

    // Update budget sectie
    outputs.budgetTotaal.textContent = formatCurrency(brutoBron, currentLang);
    outputs.budgetInzet.textContent = formatCurrency(ingezetBruto, currentLang);

    // Update progress bar
    const progressPercentage = brutoBron > 0 ? (ingezetBruto / brutoBron) * 100 : 0;
    outputs.progressBar.style.width = `${Math.min(progressPercentage, 100)}%`;
    outputs.progressBar.classList.remove('is-normal', 'is-warning', 'is-danger');
    if (ingezetBruto > brutoBron) {
        outputs.progressBar.classList.add('is-danger');
    } else if (progressPercentage > 80) {
        outputs.progressBar.classList.add('is-warning');
    } else {
        outputs.progressBar.classList.add('is-normal');
    }

    // Update resultaat sectie
    outputs.verschilNetto.textContent = formatCurrency(verschilNetto, currentLang);

    // Update details: Huidige situatie
    outputs.huidigBruto.textContent = formatCurrency(brutoBron, currentLang);
    outputs.huidigBelasting.textContent = formatCurrency(-belastingHuidig, currentLang);
    outputs.huidigNetto.textContent = formatCurrency(nettoHuidig, currentLang);

    // Update details: Nieuwe situatie
    outputs.nieuwBruto.textContent = formatCurrency(brutoBronNieuw, currentLang);
    outputs.nieuwBelasting.textContent = formatCurrency(-belastingNieuw, currentLang);
    outputs.nieuwUitruil.textContent = formatCurrency(ingezetBruto, currentLang);
    outputs.nieuwNetto.textContent = formatCurrency(nettoNieuw, currentLang);
}