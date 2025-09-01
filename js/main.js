import { initReiskostenTool, updateReiskosten } from './reiskosten.js';
import { translations, translatePage } from './vertaalsysteem.js';

document.addEventListener('DOMContentLoaded', () => {
    let currentLang = 'nl';

    // Functie om de juiste tool te initialiseren en te tonen
    function initializeTool() {
        const selected = document.getElementById('source-selector').value;
        document.querySelectorAll('.tool-section').forEach(div => div.style.display = 'none');
        
        const selectedSection = document.getElementById(`tool-${selected}`);
        if (selectedSection) {
            selectedSection.style.display = 'block';

            if (selected === 'reiskosten') {
                initReiskostenTool(currentLang, translations);
                updateReiskosten(currentLang, translations);
            }
            // Hier kun je in de toekomst initialisatie voor andere tools toevoegen
        }
    }

    // Init vertaling en de eerste tool
    translatePage(currentLang);
    initializeTool();

    // Luister naar input voor updates
    document.body.addEventListener('input', () => {
        const selected = document.getElementById('source-selector').value;
        if (selected === 'reiskosten') {
            updateReiskosten(currentLang, translations);
        }
    });

    // Taalknop
    const translateBtn = document.getElementById('translate-btn');
    if (translateBtn) {
        translateBtn.addEventListener('click', () => {
            currentLang = currentLang === 'nl' ? 'en' : 'nl';
            translatePage(currentLang);
            // Update de berekening na taalwissel zodat teksten (zoals bronnaam) meeveranderen
            updateReiskosten(currentLang, translations);
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
            e.preventDefault(); // Voorkom dat de pagina naar boven springt

            const resultBox = toggleBtn.closest('.result-box');
            if (!resultBox) return;

            const detailsDiv = resultBox.querySelector('.calculation-details');
            if (!detailsDiv) return;

            detailsDiv.classList.toggle('is-visible');

            const isVisible = detailsDiv.classList.contains('is-visible');
            const lang = document.documentElement.lang || 'nl';
            
            if (isVisible) {
                toggleBtn.textContent = translations[lang].hideDetails;
                toggleBtn.setAttribute('data-translate-key', 'hideDetails');
            } else {
                toggleBtn.textContent = translations[lang].showDetails;
                toggleBtn.setAttribute('data-translate-key', 'showDetails');
            }
            return; // Stop verdere uitvoering, de klik is afgehandeld
        }

        // --- 2. LOGICA VOOR HET OPENEN VAN DE INFO MODAL ---
        if (e.target.closest('#open-info-modal-link')) {
            e.preventDefault();
            const modalBody = document.getElementById('modal-content-body');
            
            if (modal && modalBody) {
                const lang = document.documentElement.lang || 'nl';
                const t = translations[lang];

                modalBody.innerHTML = `
                    <h2>${t.modalTitle1}</h2>
                    <h3>${t.modalTitle2}</h3>
                    <p>${t.modalP1}</p>
                    <ul><li>${t.modalLi1}</li><li>${t.modalLi2}</li><li>${t.modalLi3}</li></ul>
                    <p>${t.modalP2}</p>
                    <h3>${t.modalTitle3}</h3>
                    <ul class="checkmark-list">
                        <li>${t.modalLi4}</li>
                        <li>${t.modalLi5}</li>
                        <li>${t.modalLi6}</li>
                        <li>${t.modalLi7}</li>
                        <li>${t.modalLi8}</li>
                    </ul>
                    <h3>${t.modalTitle4}</h3>
                    <ul><li>${t.modalLi9}</li><li>${t.modalLi10}</li><li>${t.modalLi11}</li></ul>
                    <h3>${t.modalTitle5}</h3>
                    <p><strong>${t.modalStrong1}</strong></p>
                    <ul><li>${t.modalLi12}</li><li>${t.modalLi13}</li><li>${t.modalLi14}</li><li>${t.modalLi15}</li><li>${t.modalLi16}</li></ul>
                    <p><strong>${t.modalStrong2}</strong></p>
                    <ul><li>${t.modalLi17}</li><li>${t.modalLi18}</li><li>${t.modalLi19}</li></ul>
                    <h3>${t.modalTitle6}</h3>
                    <p>${t.modalP3}</p>
                    <div class="calculation-example">
                        <p><strong>${t.modalStrong3}</strong></p>
                        <ul><li>${t.modalLi20}</li><li>${t.modalLi21}</li><li>${t.modalLi22}</li></ul>
                        <p>${t.modalP4}</p>
                    </div>
                `;
                modal.classList.add('is-active');
            }
            return; // Stop verdere uitvoering
        }
        
        // --- 3. LOGICA VOOR HET SLUITEN VAN DE MODAL ---
        if (e.target.id === 'close-modal-btn' || e.target.id === 'info-modal') {
            if (modal) {
                modal.classList.remove('is-active');
            }
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
    
    // Logica om de '0' in input velden leeg te maken bij focus
    const numberInputs = document.querySelectorAll('#tool-reiskosten .input-grid input[type="number"]');
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
});