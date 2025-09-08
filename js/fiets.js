// js/fiets.js

import { formatCurrency } from './utils.js';

let inputsFiets, outputsFiets;

export function initFietsTool() {
    if (inputsFiets) return;

    inputsFiets = {
        aankoopbedrag: document.getElementById('fiets_aankoopbedrag'),
        vakantiegeld: document.getElementById('max_vakantiegeld_fiets'),
        eindejaarsuitkering: document.getElementById('max_eindejaarsuitkering_fiets'),
        keuzeInzet: document.getElementById('keuze_inzet_fiets')
    };
    outputsFiets = {
        voordeel: document.getElementById('fiets_verschil_netto'),
        brutoIngezet: document.getElementById('budget_inzet_fiets'),
        totaalBudget: document.getElementById('budget_bron_totaal_fiets'),
        progressBar: document.getElementById('progress_bar_fiets'),
        // Zorg ervoor dat dit element wordt geselecteerd
        bronNaam: document.getElementById('budget_bron_naam_fiets') 
    };
}

export function updateFietsTool(currentLang, translations) {
    if (!inputsFiets || !outputsFiets) {
        initFietsTool();
    }

    const aankoopbedrag = Math.min(parseFloat(inputsFiets.aankoopbedrag.value) || 0, 2500);
    const vakantiegeld = parseFloat(inputsFiets.vakantiegeld.value) || 0;
    const eindejaarsuitkering = parseFloat(inputsFiets.eindejaarsuitkering.value) || 0;
    const keuze = inputsFiets.keuzeInzet.value;

    let brutoBron = 0;
    let bronNaamText = ''; 

    // Hier wordt de naam van de bron bepaald op basis van de vertalingen
    if (keuze === 'eindejaarsuitkering') {
        brutoBron = eindejaarsuitkering;
        bronNaamText = translations[currentLang].sourceYearEndBonus; 
    } else if (keuze === 'beide') {
        brutoBron = vakantiegeld + eindejaarsuitkering;
        bronNaamText = translations[currentLang].sourceBoth;
    }
    // Je kunt hier nog een 'vakantiegeld' optie toevoegen

    const ingezetBruto = Math.min(aankoopbedrag, brutoBron);
    const nettoVoordeel = ingezetBruto * 0.50;

    // Update alle outputs
    outputsFiets.voordeel.textContent = formatCurrency(nettoVoordeel, currentLang);
    outputsFiets.brutoIngezet.textContent = formatCurrency(ingezetBruto, currentLang);
    outputsFiets.totaalBudget.textContent = formatCurrency(brutoBron, currentLang);
    
    // << DIT IS DE CRUCIALE REGEL DIE DE NAAM IN DE LABEL ZET
    outputsFiets.bronNaam.textContent = bronNaamText; 

    const progressPercentage = brutoBron > 0 ? (ingezetBruto / brutoBron) * 100 : 0;
    outputsFiets.progressBar.style.width = `${Math.min(progressPercentage, 100)}%`;
}