// js/reiskosten.js

import { translations } from './vertaalsysteem.js';
import { formatCurrency } from './utils.js';

// --- VASTE PARAMETERS UIT JE OORSPRONKELIJKE SCRIPT ---
const BELASTING_PERCENTAGE = 0.50;
const KM_VERGOEDING_STANDAARD = 0.14;
const KM_VERGOEDING_FISCAAL = 0.23;

let inputs, outputs;
let isInitialized = false;

export function initReiskostenTool(openModalFunction, getCurrentLang) {
    if (isInitialized) return;

    // Elementen ophalen (dit blijft hetzelfde)
    inputs = {
        max_vakantiegeld: document.getElementById('max_vakantiegeld'),
        max_eindejaarsuitkering: document.getElementById('max_eindejaarsuitkering'),
        reisdagen_gedeclareerd: document.getElementById('reisdagen_gedeclareerd'),
        km_fiscaal: document.getElementById('km_fiscaal'),
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
    
    // De logica voor de info-knop (dit blijft ook hetzelfde)
    const infoLink = document.getElementById('open-info-modal-link');
    if (infoLink && openModalFunction) {
        infoLink.addEventListener('click', (e) => {
            e.preventDefault();
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
    
    // Focus/blur handlers voor input velden (blijft hetzelfde)
    Object.values(inputs).forEach(input => {
        if (input && input.type === 'number') {
            input.addEventListener('focus', () => { if (input.value === '0') input.value = ''; });
            input.addEventListener('blur', () => { if (input.value === '') input.value = '0'; });
        }
    });

    isInitialized = true;
}

// --- HIER IS DE WIJZIGING ---
// Deze functie bevat nu de exacte logica van je oude 'updateCalculations' functie
export function updateReiskosten(currentLang, translations) {
    if (!isInitialized) return;

    // 1. Waardes inlezen
    const v = {
        max_vakantiegeld: parseFloat(inputs.max_vakantiegeld.value) || 0,
        max_eindejaarsuitkering: parseFloat(inputs.max_eindejaarsuitkering.value) || 0,
        reisdagen_gedeclareerd: parseFloat(inputs.reisdagen_gedeclareerd.value) || 0,
        km_fiscaal: parseFloat(inputs.km_fiscaal.value) || 0,
        keuze_inzet: inputs.keuze_inzet.value
    };

    // 2. Exacte berekening uit je oorspronkelijke script
    const km_afgetopt = Math.min(v.km_fiscaal, 60);
    const totaalMogelijkFiscaal = v.km_fiscaal * 2 * v.reisdagen_gedeclareerd * KM_VERGOEDING_FISCAAL;
    const standaardVergoeding = km_afgetopt * v.reisdagen_gedeclareerd * KM_VERGOEDING_STANDAARD;
    const teBenuttenReiskosten = totaalMogelijkFiscaal - standaardVergoeding;
    
    const totaalIngezetBedrag = Math.max(0, teBenuttenReiskosten);

    let brutoBronHuidig;
    let bronNaamKey;

    switch (v.keuze_inzet) {
        case 'beide':
            brutoBronHuidig = v.max_vakantiegeld + v.max_eindejaarsuitkering;
            bronNaamKey = 'sourceBoth'; // Gebruikt de key uit je oude script
            break;
        case 'eindejaarsuitkering':
        default:
            brutoBronHuidig = v.max_eindejaarsuitkering;
            bronNaamKey = 'sourceYearEndBonus'; // Gebruikt de key uit je oude script
            break;
    }
    
    const belastingHuidig = brutoBronHuidig * BELASTING_PERCENTAGE;
    const nettoHuidig = brutoBronHuidig - belastingHuidig;
    
    const brutoBronNieuw = brutoBronHuidig - totaalIngezetBedrag;
    const belastingNieuw = brutoBronNieuw * BELASTING_PERCENTAGE;
    const nettoNieuw = brutoBronNieuw - belastingNieuw + totaalIngezetBedrag;
    
    const verschilNetto = nettoNieuw - nettoHuidig;
    
    // 3. Update van de interface (met de variabelen van hierboven)
    const bronNaam = translations[currentLang][bronNaamKey];
    outputs.bron_namen.forEach(el => el.textContent = bronNaam);
    outputs.budget_bron_naam.textContent = bronNaam;

    outputs.budget_bron_totaal.textContent = formatCurrency(brutoBronHuidig, currentLang);
    outputs.budget_inzet.textContent = formatCurrency(totaalIngezetBedrag, currentLang);
    
    outputs.huidig_bruto.textContent = formatCurrency(brutoBronHuidig, currentLang);
    outputs.huidig_belasting.textContent = formatCurrency(-belastingHuidig, currentLang);
    outputs.huidig_netto.textContent = formatCurrency(nettoHuidig, currentLang);
    
    outputs.nieuw_bruto.textContent = formatCurrency(brutoBronNieuw, currentLang);
    outputs.nieuw_belasting.textContent = formatCurrency(-belastingNieuw, currentLang);
    outputs.nieuw_uitruil.textContent = formatCurrency(totaalIngezetBedrag, currentLang);
    outputs.nieuw_netto.textContent = formatCurrency(nettoNieuw, currentLang);
    
    outputs.verschil_netto.textContent = formatCurrency(verschilNetto, currentLang);
    
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