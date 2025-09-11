// js/main.js

import { initReiskostenTool, updateReiskosten } from './reiskosten.js';
import { translations, translatePage } from './vertaalsysteem.js';
import { initFietsTool, updateFietsTool } from './fiets.js';
import { initVakbondTool, updateVakbond } from './vakbond.js';
import { initVerlofTool, updateVerlofTool } from './verlof.js';

document.addEventListener('DOMContentLoaded', () => {
    let currentLang = 'nl';

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