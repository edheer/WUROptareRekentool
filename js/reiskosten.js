// js/reiskosten.js

import { translations } from './vertaalsysteem.js';
import { formatCurrency } from './utils.js';

const BELASTING_PERCENTAGE = 0.50;
const KM_VERGOEDING_STANDAARD = 0.14;
const KM_VERGOEDING_FISCAAL = 0.23;

let inputs, outputs;
let isInitialized = false;

// BELANGRIJKE WIJZIGING: Accepteer een functie om de taal op te halen.
export function initReiskostenTool(openModalFunction, getCurrentLang) {
    if (isInitialized) return;

    inputs = {
        max_vakantiegeld: document.getElementById('max_vakantiegeld'),
        max_eindejaarsuitkering: document.getElementById('max_eindejaarsuitkering'),
        reisdagen_gedeclareerd: document.getElementById('reisdagen_gedeclareerd'),
        km_fiscal: document.getElementById('km_fiscaal'),
        keuze_inzet: document.getElementById('keuze_inzet')
    };

    outputs = {
        budget_bron_naam: document.getElementById('budget_bron_naam'),
        budget_bron_totaal: document.getElementById('budget_bron_totaal'),
        budget_inzet: document.getElementById('budget_inzet'),
        progress_bar: document.getElementById('progress_bar'),
        bron_namen: document.querySelectorAll('.sub-label.bron_naam'),
        huidig_bruto: document.getElementById('huidig_bruto'),
        huidig_belasting: document.getElementById('huidig_belasting'),
        huidig_netto: document.getElementById('huidig_netto'),
        nieuw_bruto: document.getElementById('nieuw_bruto'),
        nieuw_belasting: document.getElementById('nieuw_belasting'),
        nieuw_uitruil: document.getElementById('nieuw_uitruil'),
        nieuw_netto: document.getElementById('nieuw_netto'),
        verschil_netto: document.getElementById('verschil_netto')
    };
    
    const infoLink = document.getElementById('open-info-modal-link');
    if (infoLink && openModalFunction) {
        infoLink.addEventListener('click', (e) => {
            e.preventDefault();
            // WIJZIGING: Vraag de actuele taal op *tijdens de klik*.
            const currentLang = getCurrentLang();
            const t = translations[currentLang];
            const content = `
                <h2>${t.travelCostExplanationTitle}</h2>
                <p>${t.travelCostExplanationP1}</p>
                <h3>${t.travelCostCalculationHeading}</h3>
                <ul class="checkmark-list">
                    <li>${t.travelCostCalculationStep1}</li>
                    <li>${t.travelCostCalculationStep2}</li>
                    <li>${t.travelCostCalculationStep3}</li>
                    <li>${t.travelCostCalculationStep4}</li>
                    <li>${t.travelCostCalculationStep5}</li>
                </ul>
                <div class="calculation-example">
                    <strong>${t.exampleCalculation}</strong><br>
                    ${t.travelCostExampleText}
                </div>
                <p>${t.travelCostExplanationP2}</p>
                <p>${t.travelCostExplanationP3}</p>
            `;
            openModalFunction(content);
        });
    }
    
    Object.values(inputs).forEach(input => {
        if (input && input.type === 'number') {
            input.addEventListener('focus', () => {
                if (input.value === '0') input.value = '';
            });
            input.addEventListener('blur', () => {
                if (input.value === '') input.value = '0';
            });
        }
    });

    isInitialized = true;
}

export function updateReiskosten(currentLang, translations) {
    if (!isInitialized || !inputs.max_vakantiegeld) {
        return;
    }

    const v = {
        max_vakantiegeld: parseFloat(inputs.max_vakantiegeld.value) || 0,
        max_eindejaarsuitkering: parseFloat(inputs.max_eindejaarsuitkering.value) || 0,
        reisdagen_gedeclareerd: parseFloat(inputs.reisdagen_gedeclareerd.value) || 0,
        km_fiscaal: parseFloat(inputs.km_fiscal.value) || 0,
        keuze_inzet: inputs.keuze_inzet.value
    };

    // --- BEREKENING ---
    let brutoBronHuidig;
    let bronNaamKey;
    switch (v.keuze_inzet) {
        case 'beide':
            brutoBronHuidig = v.max_vakantiegeld + v.max_eindejaarsuitkering;
            bronNaamKey = 'optionBoth';
            break;
        case 'eindejaarsuitkering':
        default:
            brutoBronHuidig = v.max_eindejaarsuitkering;
            bronNaamKey = 'optionYearEndBonus';
            break;
    }

    const totaalMogelijkFiscaal = v.km_fiscaal * 2 * v.reisdagen_gedeclareerd * KM_VERGOEDING_FISCAAL;
    const standaardVergoeding = v.km_fiscaal * 2 * v.reisdagen_gedeclareerd * KM_VERGOEDING_STANDAARD;
    const potentieleInzet = Math.max(0, totaalMogelijkFiscaal - standaardVergoeding);
    const totaalIngezetBedrag = Math.min(potentieleInzet, brutoBronHuidig);
    const belastingHuidig = brutoBronHuidig * BELASTING_PERCENTAGE;
    const nettoHuidig = brutoBronHuidig - belastingHuidig;
    const brutoBronNieuw = brutoBronHuidig - totaalIngezetBedrag;
    const belastingNieuw = brutoBronNieuw * BELASTING_PERCENTAGE;
    const nettoNieuw = brutoBronNieuw - belastingNieuw + totaalIngezetBedrag;
    const verschilNetto = nettoNieuw - nettoHuidig;

    // --- UPDATE VAN DE INTERFACE ---
    const bronNaam = translations[currentLang][bronNaamKey];
    if (outputs.bron_namen) outputs.bron_namen.forEach(el => el.textContent = bronNaam);
    if (outputs.budget_bron_naam) outputs.budget_bron_naam.textContent = bronNaam;

    if (outputs.budget_bron_totaal) outputs.budget_bron_totaal.textContent = formatCurrency(brutoBronHuidig, currentLang);
    if (outputs.budget_inzet) outputs.budget_inzet.textContent = formatCurrency(totaalIngezetBedrag, currentLang);
    if (outputs.huidig_bruto) outputs.huidig_bruto.textContent = formatCurrency(brutoBronHuidig, currentLang);
    if (outputs.huidig_belasting) outputs.huidig_belasting.textContent = formatCurrency(-belastingHuidig, currentLang);
    if (outputs.huidig_netto) outputs.huidig_netto.textContent = formatCurrency(nettoHuidig, currentLang);
    if (outputs.nieuw_bruto) outputs.nieuw_bruto.textContent = formatCurrency(brutoBronNieuw, currentLang);
    if (outputs.nieuw_belasting) outputs.nieuw_belasting.textContent = formatCurrency(-belastingNieuw, currentLang);
    if (outputs.nieuw_uitruil) outputs.nieuw_uitruil.textContent = formatCurrency(totaalIngezetBedrag, currentLang);
    if (outputs.nieuw_netto) outputs.nieuw_netto.textContent = formatCurrency(nettoNieuw, currentLang);
    if (outputs.verschil_netto) outputs.verschil_netto.textContent = formatCurrency(verschilNetto, currentLang);

    if (outputs.progress_bar) {
        let progressPercentage = brutoBronHuidig > 0 ? (totaalIngezetBedrag / brutoBronHuidig) * 100 : 0;
        outputs.progress_bar.style.width = `${Math.min(progressPercentage, 100)}%`;
        outputs.progress_bar.classList.remove('is-normal', 'is-warning', 'is-danger');
        if (totaalIngezetBedrag > brutoBronHuidig) {
            outputs.progress_bar.classList.add('is-danger');
        } else if (progressPercentage > 80) {
            outputs.progress_bar.classList.add('is-warning');
        } else {
            outputs.progress_bar.classList.add('is-normal');
        }
    }
}