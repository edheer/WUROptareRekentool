import { initReiskostenTool, updateReiskosten } from './reiskosten.js';
import { translations, translatePage } from './vertaalsysteem.js';

document.addEventListener('DOMContentLoaded', () => {
    let currentLang = 'nl';

    // Init vertaling
    translatePage(currentLang);

    // Toon alleen de juiste sectie bij start
    const selected = document.getElementById('source-selector').value;
    document.querySelectorAll('.tool-section').forEach(div => div.style.display = 'none');
    document.getElementById(`tool-${selected}`).style.display = 'block';

    // Init bijbehorende tool
    if (selected === 'reiskosten') {
        initReiskostenTool(currentLang, translations);
        updateReiskosten(currentLang, translations);
    }

    // Luister naar input
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

            const selected = document.getElementById('source-selector').value;
            if (selected === 'reiskosten') {
                updateReiskosten(currentLang, translations);
            }
        });
    }

    // Tool selectie via dropdown
    const sourceSelector = document.getElementById('source-selector');
    if (sourceSelector) {
        sourceSelector.addEventListener('change', (e) => {
            const selected = e.target.value;

            document.querySelectorAll('.tool-section').forEach(div => div.style.display = 'none');

            const selectedSection = document.getElementById(`tool-${selected}`);
            if (selectedSection) {
                selectedSection.style.display = 'block';

                if (selected === 'reiskosten') {
                    initReiskostenTool(currentLang, translations);
                    updateReiskosten(currentLang, translations);
                }
            }
        });
    }
// Modal openen via event delegation
document.body.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'open-info-modal-link') {
        e.preventDefault();
        const modal = document.getElementById('info-modal');
        const modalBody = document.getElementById('modal-content-body');
        console.log("Modal gevonden?", modal);

        if (modal && modalBody) {
            modal.classList.add('is-active');
            modal.style.display = 'block'; // <-- fix hier
            modalBody.innerHTML = `
                <h2>Uitleg van de berekening</h2>
                <p>Je totale reiskosten worden berekend op basis van:</p>
                <ul>
                    <li>Het aantal gedeclareerde reisdagen</li>
                    <li>De enkele reisafstand (heenweg)</li>
                    <li>Een belastingvrije vergoeding van €0,21 per kilometer</li>
                </ul>
                <p>Het bedrag dat je normaliter bruto uit de gekozen bron (zoals vakantiegeld of eindejaarsuitkering) zou krijgen, wordt nu belastingvrij ingezet voor reiskosten. Daardoor houd je netto meer over.</p>
            `;
        }
    }

    if (e.target.id === 'close-modal-btn' || e.target.classList.contains('modal-overlay')) {
        const modal = document.getElementById('info-modal');
        if (modal) {
            modal.classList.remove('is-active');
            modal.style.display = 'none'; // <-- fix hier
        }
    }
});

});
