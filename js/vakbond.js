// js/vakbond.js

// Importeer translations vanuit je vertaalsysteem.js
import { translations } from './vertaalsysteem.js';

// Hulpfunctie voor valuta opmaak (idealiter in een utils.js)
const formatCurrency = (amount, lang) => {
    return new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'nl-NL', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
};

// Functie voor de berekening van de vakbondscontributie
export const updateVakbond = (currentLang) => {
    const contributieBedrag = parseFloat(document.getElementById('vakbond_contributie_bedrag').value) || 0;
    const frequentie = document.getElementById('vakbond_frequentie').value;
    const maxVakantiegeld = parseFloat(document.getElementById('vakbond_max_vakantiegeld').value) || 0;
    const maxEindejaarsuitkering = parseFloat(document.getElementById('vakbond_max_eindejaarsuitkering').value) || 0;
    const keuzeInzet = document.getElementById('vakbond_keuze_inzet').value;

    let jaarlijkseContributie = contributieBedrag;
    if (frequentie === 'maand') {
        jaarlijkseContributie = contributieBedrag * 12;
    }

    let budgetVakantiegeld = 0;
    let budgetEindejaarsuitkering = 0;
    let bronNaamKey = 'optionYearEndBonus'; // Standaard

    if (keuzeInzet === 'eindejaarsuitkering') {
        budgetEindejaarsuitkering = maxEindejaarsuitkering;
    } else if (keuzeInzet === 'vakantiegeld') { // Optie 'vakantiegeld' is nu ook mogelijk voor vakbond
        budgetVakantiegeld = maxVakantiegeld;
        bronNaamKey = 'optionHolidayPay';
    } else if (keuzeInzet === 'beide') {
        budgetVakantiegeld = maxVakantiegeld;
        budgetEindejaarsuitkering = maxEindejaarsuitkering;
        bronNaamKey = 'optionBoth';
    }

    const totaalBeschikbaarBudget = budgetVakantiegeld + budgetEindejaarsuitkering;
    let ingezetBedrag = Math.min(jaarlijkseContributie, totaalBeschikbaarBudget);

    const belastingvoordeel = ingezetBedrag * 0.50; // Vereenvoudigd

    // Update UI voor budget
    const vakbondBronNaamElement = document.getElementById('vakbond_budget_bron_naam');
    if (vakbondBronNaamElement) {
        vakbondBronNaamElement.textContent = translations[currentLang][bronNaamKey];
    }
    document.getElementById('vakbond_budget_bron_totaal').textContent = formatCurrency(totaalBeschikbaarBudget, currentLang);
    document.getElementById('vakbond_budget_inzet').textContent = formatCurrency(ingezetBedrag, currentLang);

    const progressBar = document.getElementById('vakbond_progress_bar');
    let percentageGebruikt = (ingezetBedrag / totaalBeschikbaarBudget) * 100;
    if (isNaN(percentageGebruikt) || totaalBeschikbaarBudget === 0) percentageGebruikt = 0;
    progressBar.style.width = `${percentageGebruikt}%`;

    progressBar.classList.remove('is-normal', 'is-warning', 'is-danger');
    if (percentageGebruikt > 90 && percentageGebruikt <= 100) {
        progressBar.classList.add('is-warning');
    } else if (percentageGebruikt > 100) {
        progressBar.classList.add('is-danger');
    } else {
        progressBar.classList.add('is-normal');
    }

    // Update UI voor resultaten
    document.getElementById('vakbond_verschil_netto').textContent = formatCurrency(belastingvoordeel, currentLang);
    document.getElementById('vakbond_huidig_bruto_contributie').textContent = formatCurrency(jaarlijkseContributie, currentLang);
    document.getElementById('vakbond_huidig_netto_kosten').textContent = formatCurrency(jaarlijkseContributie, currentLang);
    document.getElementById('vakbond_nieuw_bruto_contributie').textContent = formatCurrency(jaarlijkseContributie, currentLang);
    document.getElementById('vakbond_nieuw_belastingvoordeel').textContent = formatCurrency(belastingvoordeel, currentLang);
    document.getElementById('vakbond_nieuw_netto_kosten').textContent = formatCurrency(jaarlijkseContributie - belastingvoordeel, currentLang);
};

// Functie om de event listeners te initialiseren voor de vakbondstool
export const initVakbondTool = (currentLang, openModalFunction) => {
    // Luister naar alle relevante input velden en selects in de vakbond tool
    document.querySelectorAll('#tool-vakbond input, #tool-vakbond select').forEach(input => {
        input.addEventListener('input', () => updateVakbond(currentLang));
    });

    // Logica om de '0' in input velden leeg te maken bij focus
    const numberInputs = document.querySelectorAll('#tool-vakbond .input-grid input[type="number"]');
    numberInputs.forEach(input => {
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
    });

    // Event listener voor de uitlegmodal van de vakbondstool
    const vakbondInfoLink = document.getElementById('open-vakbond-info-modal-link');
    if (vakbondInfoLink) {
        vakbondInfoLink.addEventListener('click', (e) => {
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
            openModalFunction(content); // Gebruik de openModalFunction die vanuit main.js is doorgegeven
        });
    }
};