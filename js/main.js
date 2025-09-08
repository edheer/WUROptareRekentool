import { initReiskostenTool, updateReiskosten } from './reiskosten.js';
import { translations, translatePage } from './vertaalsysteem.js';
import { initFietsTool, updateFietsTool } from './fiets.js';
import { initVakbondTool, updateVakbond } from './vakbond.js';

document.addEventListener('DOMContentLoaded', () => {
    let currentLang = 'nl'; // Dit wordt nu de globale taal in main.js

    // Hulpfunctie voor het openen van de modal (deze blijft in main.js)
    const infoModal = document.getElementById('info-modal');
    const modalContentBody = document.getElementById('modal-content-body');
    const openModal = (contentHtml) => {
        modalContentBody.innerHTML = contentHtml;
        infoModal.classList.add('is-active');
    };

    // Functie om de juiste tool te initialiseren en te tonen
    function initializeTool() {
        const selected = document.getElementById('source-selector').value;
        document.querySelectorAll('.tool-section').forEach(div => div.style.display = 'none');
        
        const selectedSection = document.getElementById(`tool-${selected}`);
        if (selectedSection) {
            selectedSection.style.display = 'block';

            // Initialiseer ALLE tools (zorgt dat inputs en outputs zijn ingesteld)
            // Daarna update je de GESELECTEERDE tool
            initReiskostenTool(); // Roep init op
            initFietsTool(openModal, currentLang); // Roep init op en geef openModal mee
            initVakbondTool(openModal, currentLang); // Roep init op, geef openModal mee

            // Update de berekening van de geselecteerde tool
            if (selected === 'reiskosten') {
                updateReiskosten(currentLang, translations);
            } else if (selected === 'fiets') {
                updateFietsTool(currentLang, translations);
            } else if (selected === 'vakbond') {
                updateVakbond(currentLang);
            }
        }
    }

    // Init vertaling en de eerste tool
    translatePage(currentLang);
    initializeTool(); // Roept nu ook initVakbondTool aan indien geselecteerd

    // Luister naar input voor updates
    // Deze luistert naar ELKE input in de body, en roept dan de update functie van de actieve tool aan
    document.body.addEventListener('input', () => {
        const selected = document.getElementById('source-selector').value;
        if (selected === 'reiskosten') {
            updateReiskosten(currentLang, translations);
        } else if (selected === 'fiets') {
            updateFietsTool(currentLang, translations);
        } else if (selected === 'vakbond') {
            updateVakbond(currentLang);
        }
    });

    // Taalknop
    const translateBtn = document.getElementById('translate-btn');
    if (translateBtn) {
        translateBtn.addEventListener('click', () => {
            currentLang = currentLang === 'nl' ? 'en' : 'nl';
            translatePage(currentLang);
            // Update de berekening na taalwissel zodat teksten (zoals bronnaam) meeveranderen
            const selected = document.getElementById('source-selector').value;
            if (selected === 'reiskosten') {
                updateReiskosten(currentLang, translations);
            } else if (selected === 'fiets') {
                updateFietsTool(currentLang, translations);
            } else if (selected === 'vakbond') {
                updateVakbond(currentLang);
            }
        });
    }

    // Tool selectie via dropdown
    const sourceSelector = document.getElementById('source-selector');
    if (sourceSelector) {
        sourceSelector.addEventListener('change', initializeTool);
    }

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
    
    // De globale focus/blur logica is niet meer nodig hier als elke tool dit zelf afhandelt.
    // Verwijder dit als je het in initReiskostenTool(), initFietsTool(), initVakbondTool() hebt geplaatst.
    // const numberInputs = document.querySelectorAll('.input-grid input[type="number"]');
    // numberInputs.forEach(input => {
    //     input.addEventListener('focus', () => {
    //         if (input.value === '0') {
    //             input.value = '';
    //         }
    //     });
    //     input.addEventListener('blur', () => {
    //         if (input.value === '') {
    //             input.value = '0';
    //         }
    //     });
    // });
});