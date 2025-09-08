// js/vakbond.js

import { formatCurrency } from './utils.js';
import { translations } from './vertaalsysteem.js';

let inputs, outputs;
let isInitialized = false;

export function initVakbondTool(openModalFunction, currentLang) {
    if (isInitialized) return;

    inputs = {
        contributieBedrag: document.getElementById('vakbond_contributie_bedrag'),
        frequentie: document.getElementById('vakbond_frequentie'),
        maxVakantiegeld: document.getElementById('vakbond_max_vakantiegeld'),
        maxEindejaarsuitkering: document.getElementById('vakbond_max_eindejaarsuitkering'),
        keuzeInzet: document.getElementById('vakbond_keuze_inzet')
    };
    outputs = {
        budgetBronNaam: document.getElementById('vakbond_budget_bron_naam'),
        budgetTotaal: document.getElementById('vakbond_budget_bron_totaal'),
        budgetInzet: document.getElementById('vakbond_budget_inzet'),
        progressBar: document.getElementById('vakbond_progress_bar'),
        verschilNetto: document.getElementById('vakbond_verschil_netto'),
        huidigBrutoContributie: document.getElementById('vakbond_huidig_bruto_contributie'),
        huidigNettoKosten: document.getElementById('vakbond_huidig_netto_kosten'),
        nieuwBrutoContributie: document.getElementById('vakbond_nieuw_bruto_contributie'),
        nieuwBelastingvoordeel: document.getElementById('vakbond_nieuw_belastingvoordeel'),
        nieuwNettoKosten: document.getElementById('vakbond_nieuw_netto_kosten')
    };

    // --- LISTENER VOOR DE UITLEG-MODAL ---
    const infoLink = document.getElementById('open-vakbond-info-modal-link');
    if (infoLink && openModalFunction) {
        infoLink.addEventListener('click', (e) => {
            e.preventDefault();
            const t = translations[currentLang];
            const content = `
                <h2>${t.unionFeeExplanationTitle}</h2>
                <p>${t.unionFeeExplanationP1}</p>
                <h3>${t.unionFeeCalculationHeading}</h3>
                <ul class="checkmark-list">
                    <li>${t.unionFeeCalculationStep1}</li>
                    <li>${t.unionFeeCalculationStep2}</li>
                    <li>${t.unionFeeCalculationStep3}</li>
                </ul>
                <div class="calculation-example">
                    <strong>${t.exampleCalculation}</strong><br>
                    ${t.unionFeeExampleText}
                </div>
                <p>${t.unionFeeExplanationP2}</p>
            `;
            openModalFunction(content);
        });
    }

    Object.values(inputs).forEach(input => {
        if (input && input.type === 'number') {
            input.addEventListener('focus', () => { if (input.value === '0') input.value = ''; });
            input.addEventListener('blur', () => { if (input.value === '') input.value = '0'; });
        }
    });

    isInitialized = true;
}

export function updateVakbond(currentLang) {
    if (!isInitialized) return;

    const v = {
        contributie: parseFloat(inputs.contributieBedrag.value) || 0,
        frequentie: inputs.frequentie.value,
        vakantiegeld: parseFloat(inputs.maxVakantiegeld.value) || 0,
        eindejaarsuitkering: parseFloat(inputs.maxEindejaarsuitkering.value) || 0,
        keuze: inputs.keuzeInzet.value
    };

    const jaarlijkseContributie = (v.frequentie === 'maand') ? v.contributie * 12 : v.contributie;
    
    let brutoBron, bronNaamKey;
    switch (v.keuze) {
        case 'vakantiegeld':
            brutoBron = v.vakantiegeld;
            bronNaamKey = 'optionHolidayPay';
            break;
        case 'beide':
            brutoBron = v.vakantiegeld + v.eindejaarsuitkering;
            bronNaamKey = 'optionBoth';
            break;
        case 'eindejaarsuitkering':
        default:
            brutoBron = v.eindejaarsuitkering;
            bronNaamKey = 'optionYearEndBonus';
            break;
    }

    const ingezetBedrag = Math.min(jaarlijkseContributie, brutoBron);
    const belastingvoordeel = ingezetBedrag * 0.50;

    const bronNaamText = translations[currentLang][bronNaamKey];
    if (outputs.budgetBronNaam) outputs.budgetBronNaam.textContent = bronNaamText;
    if (outputs.budgetTotaal) outputs.budgetTotaal.textContent = formatCurrency(brutoBron, currentLang);
    if (outputs.budgetInzet) outputs.budgetInzet.textContent = formatCurrency(ingezetBedrag, currentLang);

    if (outputs.progressBar) {
        const progress = brutoBron > 0 ? (ingezetBedrag / brutoBron) * 100 : 0;
        outputs.progressBar.style.width = `${Math.min(progress, 100)}%`;
        outputs.progressBar.className = 'progress-bar-inner';
        if (ingezetBedrag > brutoBron) outputs.progressBar.classList.add('is-danger');
        else if (progress > 80) outputs.progressBar.classList.add('is-warning');
        else outputs.progressBar.classList.add('is-normal');
    }

    if (outputs.verschilNetto) outputs.verschilNetto.textContent = formatCurrency(belastingvoordeel, currentLang);
    if (outputs.huidigBrutoContributie) outputs.huidigBrutoContributie.textContent = formatCurrency(jaarlijkseContributie, currentLang);
    if (outputs.huidigNettoKosten) outputs.huidigNettoKosten.textContent = formatCurrency(jaarlijkseContributie, currentLang);
    if (outputs.nieuwBrutoContributie) outputs.nieuwBrutoContributie.textContent = formatCurrency(jaarlijkseContributie, currentLang);
    if (outputs.nieuwBelastingvoordeel) outputs.nieuwBelastingvoordeel.textContent = formatCurrency(belastingvoordeel, currentLang);
    if (outputs.nieuwNettoKosten) outputs.nieuwNettoKosten.textContent = formatCurrency(jaarlijkseContributie - belastingvoordeel, currentLang);
}