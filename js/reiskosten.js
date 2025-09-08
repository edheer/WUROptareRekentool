// js/reiskosten.js

import { translations } from './vertaalsysteem.js';
import { formatCurrency } from './utils.js'; // << NIEUW: Importeer formatCurrency

const BELASTING_PERCENTAGE = 0.50;
const KM_VERGOEDING_STANDAARD = 0.14; // Onbelaste vergoeding (WUR spec.)
const KM_VERGOEDING_FISCAAL = 0.23; // Maximale fiscale vergoeding

let inputs, outputs; // Globale variabelen voor deze module

export function initReiskostenTool() { // currentLang, translations zijn hier niet strikt nodig
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
        bron_namen: document.querySelectorAll('.sub-label.bron_naam'), // Let op: deze selecteert alle .sub-label.bron_naam in de hele DOM
        huidig_bruto: document.getElementById('huidig_bruto'),
        huidig_belasting: document.getElementById('huidig_belasting'),
        huidig_netto: document.getElementById('huidig_netto'),
        nieuw_bruto: document.getElementById('nieuw_bruto'),
        nieuw_belasting: document.getElementById('nieuw_belasting'),
        nieuw_uitruil: document.getElementById('nieuw_uitruil'),
        nieuw_netto: document.getElementById('nieuw_netto'),
        verschil_netto: document.getElementById('verschil_netto')
    };
    
    // Logica om de '0' in input velden leeg te maken bij focus
    // Dit hoort in de init functie van ELKE tool
    Object.values(inputs).forEach(input => {
        if (input && input.type === 'number') { // Controleer of het een number input is
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

export function updateReiskosten(currentLang, translations) {
    if (!inputs || !outputs) { // Zorg dat de tool geïnitialiseerd is
        initReiskostenTool();
    }

    const v = {
        max_vakantiegeld: parseFloat(inputs.max_vakantiegeld.value) || 0,
        max_eindejaarsuitkering: parseFloat(inputs.max_eindejaarsuitkering.value) || 0,
        reisdagen_gedeclareerd: parseFloat(inputs.reisdagen_gedeclareerd.value) || 0,
        km_fiscaal: parseFloat(inputs.km_fiscaal.value) || 0,
        keuze_inzet: inputs.keuze_inzet.value
    };

    // --- BEREKENING ---
    
    // 1. Bepaal eerst de beschikbare bron (het budget)
    let brutoBronHuidig;
    let bronNaamKey;
    switch (v.keuze_inzet) {
        case 'beide':
            brutoBronHuidig = v.max_vakantiegeld + v.max_eindejaarsuitkering;
            bronNaamKey = 'optionBoth'; // Gebruik de juiste translation key
            break;
        case 'eindejaarsuitkering':
        default:
            brutoBronHuidig = v.max_eindejaarsuitkering;
            bronNaamKey = 'optionYearEndBonus'; // Gebruik de juiste translation key
            break;
    }

    // 2. Bereken de potentiële fiscale ruimte voor uitruil
    // Volgens WUR regeling (standaard 0.14 onbelast, dus uitruil over 0.23-0.14 = 0.09)
    // De maximale fiscale vergoeding is 0.23, WUR betaalt 0.14. Verschil is 0.09 om uit te ruilen.
    // Echter, jouw oorspronkelijke berekening was: totaalMogelijkFiscaal - standaardVergoeding
    // Laten we die aanhouden, maar check of deze logisch is met WUR regelingen.
    const totaalMogelijkFiscaal = v.km_fiscaal * 2 * v.reisdagen_gedeclareerd * KM_VERGOEDING_FISCAAL; // totaal fiscale ruimte
    const standaardVergoeding = v.km_fiscaal * 2 * v.reisdagen_gedeclareerd * KM_VERGOEDING_STANDAARD; // totaal onbelast betaald door WUR
    const potentieleInzet = Math.max(0, totaalMogelijkFiscaal - standaardVergoeding); // het bedrag waarover je belastingvoordeel kunt halen


    // 3. Bepaal het daadwerkelijk ingezette bedrag: top dit af op het beschikbare budget
    const totaalIngezetBedrag = Math.min(potentieleInzet, brutoBronHuidig);

    // 4. Bereken de 'huidige' situatie (wat als we niet uitruilen?)
    // Het is logischer dat de "huidige situatie" de bron toont zoals die normaal uitbetaald zou worden,
    // en de "nieuwe situatie" toont hoe deze na uitruil verandert.
    const belastingHuidig = brutoBronHuidig * BELASTING_PERCENTAGE;
    const nettoHuidig = brutoBronHuidig - belastingHuidig;

    // 5. Bereken de 'nieuwe' situatie (na uitruil)
    const brutoBronNieuw = brutoBronHuidig - totaalIngezetBedrag; // Wat er van de bron overblijft na uitruil
    const belastingNieuw = brutoBronNieuw * BELASTING_PERCENTAGE; // Belasting over het resterende deel van de bron
    const nettoNieuw = brutoBronNieuw - belastingNieuw + totaalIngezetBedrag; // Resterende netto + het uitgeruilde bedrag (belastingvrij)

    // 6. Bereken het verschil (netto voordeel)
    const verschilNetto = nettoNieuw - nettoHuidig;


    // --- UPDATE VAN DE INTERFACE ---

    const bronNaam = translations[currentLang][bronNaamKey];
    outputs.bron_namen.forEach(el => el.textContent = bronNaam);
    outputs.budget_bron_naam.textContent = bronNaam;

    outputs.budget_bron_totaal.textContent = formatCurrency(brutoBronHuidig, currentLang);
    outputs.budget_inzet.textContent = formatCurrency(totaalIngezetBedrag, currentLang);

    outputs.huidig_bruto.textContent = formatCurrency(brutoBronHuidig, currentLang);
    outputs.huidig_belasting.textContent = formatCurrency(-belastingHuidig, currentLang); // Negatief voor weergave
    outputs.huidig_netto.textContent = formatCurrency(nettoHuidig, currentLang);

    outputs.nieuw_bruto.textContent = formatCurrency(brutoBronNieuw, currentLang);
    outputs.nieuw_belasting.textContent = formatCurrency(-belastingNieuw, currentLang); // Negatief
    outputs.nieuw_uitruil.textContent = formatCurrency(totaalIngezetBedrag, currentLang);
    outputs.nieuw_netto.textContent = formatCurrency(nettoNieuw, currentLang);

    outputs.verschil_netto.textContent = formatCurrency(verschilNetto, currentLang);

    // Progress bar update
    let progressPercentage = brutoBronHuidig > 0 ? (totaalIngezetBedrag / brutoBronHuidig) * 100 : 0; // Gebruik totaalIngezetBedrag
    outputs.progress_bar.style.width = `${Math.min(progressPercentage, 100)}%`; // Max 100% visueel
    outputs.progress_bar.classList.remove('is-normal', 'is-warning', 'is-danger');
    
    if (totaalIngezetBedrag > brutoBronHuidig) { // Als meer wordt ingezet dan beschikbaar is
        outputs.progress_bar.classList.add('is-danger');
    } else if (progressPercentage > 80) {
        outputs.progress_bar.classList.add('is-warning');
    } else {
        outputs.progress_bar.classList.add('is-normal');
    }
}