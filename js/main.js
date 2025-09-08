import { initReiskostenTool, updateReiskosten } from './reiskosten.js';
import { translations, translatePage } from './vertaalsysteem.js';
import { initFietsTool, updateFietsTool } from './fiets.js';
import { initVakbondTool, updateVakbond } from './vakbond.js';

document.addEventListener('DOMContentLoaded', () => {
    let currentLang = 'nl';

    const infoModal = document.getElementById('info-modal');
    const modalContentBody = document.getElementById('modal-content-body');
    const openModal = (contentHtml) => {
        modalContentBody.innerHTML = contentHtml;
        infoModal.classList.add('is-active');
    };

    function initializeTool() {
        const selected = document.getElementById('source-selector').value;
        document.querySelectorAll('.tool-section').forEach(div => div.style.display = 'none');
        
        const selectedSection = document.getElementById(`tool-${selected}`);
        if (selectedSection) {
            selectedSection.style.display = 'block'; 

            initReiskostenTool();
            initFietsTool();
            initVakbondTool(currentLang, openModal);

            if (selected === 'reiskosten') {
                updateReiskosten(currentLang, translations);
            } else if (selected === 'fiets') { // << TOEGEVOEGD
                updateFietsTool(currentLang, translations);
            } else if (selected === 'vakbond') {
                updateVakbond(currentLang);
            }
        }
    }

    translatePage(currentLang);
    initializeTool();

    document.body.addEventListener('input', () => {
        const selected = document.getElementById('source-selector').value;
        if (selected === 'reiskosten') {
            updateReiskosten(currentLang, translations);
        } else if (selected === 'fiets') { // << TOEGEVOEGD
            updateFietsTool(currentLang, translations);
        } else if (selected === 'vakbond') {
            updateVakbond(currentLang);
        }
    });

    const translateBtn = document.getElementById('translate-btn');
    if (translateBtn) {
        translateBtn.addEventListener('click', () => {
            currentLang = currentLang === 'nl' ? 'en' : 'nl';
            translatePage(currentLang);
            const selected = document.getElementById('source-selector').value;
            if (selected === 'reiskosten') {
                updateReiskosten(currentLang, translations);
            } else if (selected === 'fiets') { // << TOEGEVOEGD
                updateFietsTool(currentLang, translations);
            } else if (selected === 'vakbond') {
                updateVakbond(currentLang);
            }
        });
    }

    const sourceSelector = document.getElementById('source-selector');
    if (sourceSelector) {
        sourceSelector.addEventListener('change', initializeTool);
    }
    
    // De rest van je event listeners voor de modal etc. blijven ongewijzigd
    // ... (de code hieronder is prima en hoeft niet aangepast)

    // --- CENTRALE EVENT LISTENER VOOR ALLE KLIK-ACTIES ---
    document.body.addEventListener('click', (e) => {
        const modal = document.getElementById('info-modal');

        // --- 1. LOGICA VOOR "TOON/VERBERG DETAILS" KNOP ---
        const toggleBtn = e.target.closest('.toggle-details-btn');
        if (toggleBtn) {
            e.preventDefault();

            const resultBox = toggleBtn.closest('.result-box');
            if (!resultBox) return;

            const detailsDiv = resultBox.querySelector('.calculation-details');
            if (!detailsDiv) return;

            detailsDiv.classList.toggle('is-visible');

            const isVisible = detailsDiv.classList.contains('is-visible');
            const lang = currentLang; // Gebruik currentLang uit main.js
            
            if (isVisible) {
                toggleBtn.textContent = translations[lang].hideDetails;
                toggleBtn.setAttribute('data-translate-key', 'hideDetails');
            } else {
                toggleBtn.textContent = translations[lang].showDetails;
                toggleBtn.setAttribute('data-translate-key', 'showDetails');
            }
            return;
        }
        
        // --- 3. LOGICA VOOR HET SLUITEN VAN DE MODAL ---
        // Deze luistert naar kliks op de sluitknop of de modal-overlay
        if (e.target.id === 'close-modal-btn' || (e.target.id === 'info-modal' && modal.classList.contains('is-active'))) {
            if (modal) {
                modal.classList.remove('is-active');
            }
            return;
        }
    });

    // Sluit de modal met de Escape-toets
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('info-modal');
            if (modal && modal.classList.contains('is-active')) {
                modal.classList.remove('is-active');
            }
        }
    });
});