import { initReiskostenTool, updateReiskosten } from './reiskosten.js';
import { translations, translatePage } from './vertaalsysteem.js';
const modalContentBody = document.getElementById('modal-content-body');

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

 // --- Gecorrigeerde Modal Logica ---

document.body.addEventListener('click', (e) => {
    const modal = document.getElementById('info-modal');

    // OPENEN MODAL
    // Controleer of de geklikte link (of een parent) de juiste ID heeft
    if (e.target.closest('#open-info-modal-link')) {
        e.preventDefault();
        const modalBody = document.getElementById('modal-content-body');
        
        if (modal && modalBody) {
            const currentLang = document.documentElement.lang || 'nl'; // Haal taal op
            const t = translations[currentLang]; // Huidige taalvertalingen

            // Vul de modal content (jouw code was al prima!)
            modalBody.innerHTML = `
                <h2>${t.modalTitle1}</h2>
                <h3>${t.modalTitle2}</h3>
                <p>${t.modalP1}</p>
                <ul><li>${t.modalLi1}</li><li>${t.modalLi2}</li><li>${t.modalLi3}</li></ul>
                <p>${t.modalP2}</p>
                <h3>${t.modalTitle3}</h3>
                  <ul class="checkmark-list">  <!-- HIER IS DE WIJZIGING -->
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

            // Toon de modal door de class toe te voegen
            modal.classList.add('is-active');
        }
    }

    // SLUITEN MODAL
    // 1. Klik op sluitknop
    // 2. Klik op de achtergrond (de container zelf)
    if (e.target.id === 'close-modal-btn' || e.target.id === 'info-modal') {
        if (modal) {
            // Verberg de modal door de class te verwijderen
            modal.classList.remove('is-active');
        }
    }
});

// (Optioneel maar aan te raden) Sluit de modal ook met de Escape-toets
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('info-modal');
        if (modal && modal.classList.contains('is-active')) {
            modal.classList.remove('is-active');
        }
    }
});

});
