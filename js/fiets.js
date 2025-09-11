// js/fiets.js
import { formatCurrency } from './utils.js';
import { translations } from './vertaalsysteem.js';

const BELASTING_PERCENTAGE = 0.50;
let inputs, outputs;
let isInitialized = false;

// Functie om de DOM-elementen te initialiseren
export function initFietsTool(openModalFunction, getCurrentLang) { // Pass openModalFunction AND getCurrentLang
    if (isInitialized) return; 

    inputs = {
        aankoopbedrag: document.getElementById('fiets_aankoopbedrag'),
        vakantiegeld: document.getElementById('max_vakantiegeld_fiets'),
        eindejaarsuitkering: document.getElementById('max_eindejaarsuitkering_fiets'),
        keuzeInzet: document.getElementById('keuze_inzet_fiets')
    };
    outputs = {
        budgetBronNaam: document.getElementById('budget_bron_naam_fiets'),
        budgetTotaal: document.getElementById('budget_bron_totaal_fiets'),
        budgetInzet: document.getElementById('budget_inzet_fiets'),
        progressBar: document.getElementById('progress_bar_fiets'),
        verschilNetto: document.getElementById('fiets_verschil_netto'),
        bronNamen: document.querySelectorAll('.sub-label.bron_naam_fiets'),
        huidigBruto: document.getElementById('fiets_huidig_bruto'),
        huidigBelasting: document.getElementById('fiets_huidig_belasting'),
        huidigNetto: document.getElementById('fiets_huidig_netto'),
        nieuwBruto: document.getElementById('fiets_nieuw_bruto'),
        nieuwBelasting: document.getElementById('fiets_nieuw_belasting'),
        nieuwUitruil: document.getElementById('fiets_nieuw_uitruil'),
        nieuwNetto: document.getElementById('fiets_nieuw_netto')
    };

    Object.values(inputs).forEach(input => {
        if (input && input.type === 'number') {
            input.addEventListener('focus', () => { if (input.value === '0') input.value = ''; });
            input.addEventListener('blur', () => { if (input.value === '') input.value = '0'; });
        }
    });

    const infoLink = document.getElementById('open-info-modal-link-fiets');
    if (infoLink) {
        infoLink.addEventListener('click', (e) => {
            e.preventDefault();
            // WIJZIGING: Vraag de actuele taal op *tijdens de klik*.
            const currentLang = getCurrentLang();
            const t = translations[currentLang];
            const content = `
                <h2>${t.bikeModalTitle}</h2>
                <p>${t.bikeModalP1}</p>
                <h3>${t.bikeModalH3}</h3>
                <ul class="checkmark-list">
                    <li>${t.bikeModalLi1}</li>
                    <li>${t.bikeModalLi2}</li>
                    <li>${t.bikeModalLi3}</li>
                </ul>
                <p>${t.bikeModalP2}</p>
            `;
            openModalFunction(content);
        });
    }
    isInitialized = true;
}

// Functie om de berekening te updaten
export function updateFietsTool(currentLang) {
    if (!inputs || !outputs) {
        console.error("Fiets tool is nog niet geïnitialiseerd.");
        return;
    }

    const aankoopbedrag = Math.min(parseFloat(inputs.aankoopbedrag.value) || 0, 2500);
    const vakantiegeld = parseFloat(inputs.vakantiegeld.value) || 0;
    const eindejaarsuitkering = parseFloat(inputs.eindejaarsuitkering.value) || 0;
    const keuze = inputs.keuzeInzet.value;

    let brutoBron, bronNaamKey;
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

    const ingezetBruto = Math.min(aankoopbedrag, brutoBron);
    const belastingHuidig = brutoBron * BELASTING_PERCENTAGE;
    const nettoHuidig = brutoBron - belastingHuidig;
    const brutoBronNieuw = brutoBron - ingezetBruto;
    const belastingNieuw = brutoBronNieuw * BELASTING_PERCENTAGE;
    const nettoNieuw = brutoBronNieuw - belastingNieuw + ingezetBruto;
    const verschilNetto = nettoNieuw - nettoHuidig;

    const bronNaamText = translations[currentLang][bronNaamKey];
    outputs.budgetBronNaam.textContent = bronNaamText;
    outputs.bronNamen.forEach(el => el.textContent = bronNaamText);
    outputs.budgetTotaal.textContent = formatCurrency(brutoBron, currentLang);
    outputs.budgetInzet.textContent = formatCurrency(ingezetBruto, currentLang);

    const progressPercentage = brutoBron > 0 ? (ingezetBruto / brutoBron) * 100 : 0;
    outputs.progressBar.style.width = `${Math.min(progressPercentage, 100)}%`;
    outputs.progressBar.className = 'progress-bar-inner';
    if (ingezetBruto > brutoBron) outputs.progressBar.classList.add('is-danger');
    else if (progressPercentage > 80) outputs.progressBar.classList.add('is-warning');
    else outputs.progressBar.classList.add('is-normal');

    outputs.verschilNetto.textContent = formatCurrency(verschilNetto, currentLang);
    outputs.huidigBruto.textContent = formatCurrency(brutoBron, currentLang);
    outputs.huidigBelasting.textContent = formatCurrency(-belastingHuidig, currentLang);
    outputs.huidigNetto.textContent = formatCurrency(nettoHuidig, currentLang);
    outputs.nieuwBruto.textContent = formatCurrency(brutoBronNieuw, currentLang);
    outputs.nieuwBelasting.textContent = formatCurrency(-belastingNieuw, currentLang);
    outputs.nieuwUitruil.textContent = formatCurrency(ingezetBruto, currentLang);
    outputs.nieuwNetto.textContent = formatCurrency(nettoNieuw, currentLang);
}