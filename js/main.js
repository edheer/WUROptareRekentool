// js/main.js

import { initReiskostenTool, updateReiskosten } from './reiskosten.js';
import { translations, translatePage } from './vertaalsysteem.js';
import { initFietsTool, updateFietsTool } from './fiets.js';
import { initVakbondTool, updateVakbond } from './vakbond.js';
import { initVerlofTool, updateVerlofTool } from './verlof.js';

    /**
 * Stelt de logica in voor het uitschakelen van invoervelden op basis van de bronkeuze.
 * @param {string} selectId - De ID van het <select> element voor de bronkeuze.
 * @param {string} holidayPayInputId - De ID van het inputveld voor vakantiegeld.
 * @param {string} yearEndBonusInputId - De ID van het inputveld voor de eindejaarsuitkering.
 */
function setupSourceSelectionLogic(selectId, holidayPayInputId, yearEndBonusInputId) {
    const selectElement = document.getElementById(selectId);
    const holidayPayInput = document.getElementById(holidayPayInputId);
    const yearEndBonusInput = document.getElementById(yearEndBonusInputId);

    if (!selectElement || !holidayPayInput || !yearEndBonusInput) {
        // Voorkom fouten als een element niet gevonden wordt
        return;
    }

    const handleSourceChange = () => {
        const selectedValue = selectElement.value;

        // Bepaal welke velden (in)actief moeten zijn
        const isHolidayPayDisabled = selectedValue === 'eindejaarsuitkering';
        const isYearEndBonusDisabled = selectedValue === 'vakantiegeld';

        // Pas de status van het vakantiegeld-veld aan
        holidayPayInput.disabled = isHolidayPayDisabled;
        if (isHolidayPayDisabled) {
            holidayPayInput.value = 0; // Zet waarde op 0 als het veld wordt uitgeschakeld
        }
        
        // Pas de status van het eindejaarsuitkering-veld aan
        yearEndBonusInput.disabled = isYearEndBonusDisabled;
        if (isYearEndBonusDisabled) {
            yearEndBonusInput.value = 0; // Zet waarde op 0 als het veld wordt uitgeschakeld
        }

        // Trigger een 'input' event om de berekening te updaten
        holidayPayInput.dispatchEvent(new Event('input', { bubbles: true }));
        yearEndBonusInput.dispatchEvent(new Event('input', { bubbles: true }));
    };

    // Koppel de functie aan het 'change' event van de dropdown
    selectElement.addEventListener('change', handleSourceChange);

    // Voer de functie eenmalig uit bij het laden van de pagina voor de juiste beginstaat
    handleSourceChange();
}


document.addEventListener('DOMContentLoaded', () => {
    let currentLang = 'nl';
    // --- CountAPI: ELK paginabezoek tellen ---
    (async () => {
    console.log("CountAPI script gestart (telt elk paginabezoek)");

    const now = new Date();
    const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const ns = 'wur-optare-tool';

    try {
        // Zorg ervoor dat deze URL EXACT correct is
        const res = await fetch(`https://api.countapi.xyz/hit/${ns}/${monthKey}`).then(r => r.json());
        console.log(`Paginabezoek geteld. Totaal voor deze maand (${monthKey}):`, res.value);
    } catch (err) {
        console.error("CountAPI fout:", err);
    }
    })();



    // --- CENTRALE MODAL FUNCTIONALITEIT ---
    const infoModal = document.getElementById('info-modal');
    const modalContentBody = document.getElementById('modal-content-body');
    const openModal = (contentHtml) => {
        if (infoModal && modalContentBody) {
            modalContentBody.innerHTML = contentHtml;
            infoModal.classList.add('is-active');
        } else {
            console.error("Modal container of body niet gevonden in de DOM.");
        }
    };



// Wacht tot de hele pagina is geladen en roep dan de setup-functie aan voor elke tool

    // Voor de Reiskosten tool
    setupSourceSelectionLogic('keuze_inzet', 'max_vakantiegeld', 'max_eindejaarsuitkering');

    // Voor de Fiets tool
    // PS: Je HTML had nog geen optie voor 'alleen vakantiegeld' bij de fiets, die heb ik hier wel alvast meegenomen in de logica.
    setupSourceSelectionLogic('keuze_inzet_fiets', 'max_vakantiegeld_fiets', 'max_eindejaarsuitkering_fiets');

    // Voor de Vakbond tool
    setupSourceSelectionLogic('vakbond_keuze_inzet', 'vakbond_max_vakantiegeld', 'vakbond_max_eindejaarsuitkering');
    // --- INITIALISATIE VAN ALLE TOOLS (GEBEURT EENMALIG) ---
    // HIER IS DE WIJZIGING: We geven een functie mee die de actuele taal ophaalt.
    const getCurrentLang = () => currentLang;
    initReiskostenTool(openModal, getCurrentLang);
    initFietsTool(openModal, getCurrentLang);
    initVakbondTool(openModal, getCurrentLang);
    initVerlofTool(openModal, getCurrentLang);

    // --- FUNCTIES VOOR HET BEHEREN VAN DE ACTIEVE TOOL ---
    
    // Deze functie roept de update-logica aan van de momenteel zichtbare tool.
    function updateActiveTool() {
        const selected = document.getElementById('source-selector').value;
        
        if (selected === 'reiskosten') updateReiskosten(currentLang, translations);
        else if (selected === 'fiets') updateFietsTool(currentLang, translations);
        else if (selected === 'vakbond') updateVakbond(currentLang);
        else if (selected === 'extra_verlof') updateVerlofTool(currentLang);
    }
    
    // Deze functie verbergt alle tools en toont alleen de geselecteerde.
    function showCorrectToolAndUpdate() {
        const selected = document.getElementById('source-selector').value;
        document.querySelectorAll('.tool-section').forEach(div => {
            div.style.display = (div.id === `tool-${selected}`) ? 'block' : 'none';
        });
        updateActiveTool();
    }

    // --- EERSTE PAGINA-LADING ---
    translatePage(currentLang);
    showCorrectToolAndUpdate();

    // --- EVENT LISTENERS ---

    document.body.addEventListener('input', (event) => {
        if (event.target.id === 'source-selector') return;
        updateActiveTool();
    });

    const translateBtn = document.getElementById('translate-btn');
    if (translateBtn) {
        translateBtn.addEventListener('click', () => {
            currentLang = currentLang === 'nl' ? 'en' : 'nl';
            translatePage(currentLang);
            updateActiveTool();
        });
    }

    const sourceSelector = document.getElementById('source-selector');
    if (sourceSelector) {
        sourceSelector.addEventListener('change', showCorrectToolAndUpdate);
    }

    document.body.addEventListener('click', (e) => {
        const toggleBtn = e.target.closest('.toggle-details-btn');
        if (toggleBtn) {
            e.preventDefault();
            const detailsDiv = toggleBtn.closest('.result-box')?.querySelector('.calculation-details');
            if (detailsDiv) {
                detailsDiv.classList.toggle('is-visible');
                const isVisible = detailsDiv.classList.contains('is-visible');
                toggleBtn.textContent = translations[currentLang][isVisible ? 'hideDetails' : 'showDetails'];
                toggleBtn.setAttribute('data-translate-key', isVisible ? 'hideDetails' : 'showDetails');
            }
            return;
        }
        
        if (e.target.id === 'close-modal-btn' || (e.target.id === 'info-modal' && infoModal?.classList.contains('is-active'))) {
            infoModal?.classList.remove('is-active');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            infoModal?.classList.remove('is-active');
        }
    });
});
