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

    
// Modal openen/sluiten via event delegation
document.body.addEventListener('click', (e) => {
    const modal = document.getElementById('info-modal');
    const modalBody = document.getElementById('modal-content-body');

    // OPENEN MODAL
    if (e.target && e.target.id === 'open-info-modal-link') {
        e.preventDefault();
        if (modal && modalBody) {
            const t = translations[currentLang]; // huidige taal

            modalBody.innerHTML = `
                <h2>${t.modalTitle1}</h2>
                <h3>${t.modalTitle2}</h3>
                <p>${t.modalP1}</p>
                <ul>
                    <li>${t.modalLi1}</li>
                    <li>${t.modalLi2}</li>
                    <li>${t.modalLi3}</li>
                </ul>
                <p>${t.modalP2}</p>

                <h3>${t.modalTitle3}</h3>
                <ul>
                    <li>${t.modalLi4}</li>
                    <li>${t.modalLi5}</li>
                    <li>${t.modalLi6}</li>
                    <li>${t.modalLi7}</li>
                    <li>${t.modalLi8}</li>
                </ul>

                <h3>${t.modalTitle4}</h3>
                <ul>
                    <li>${t.modalLi9}</li>
                    <li>${t.modalLi10}</li>
                    <li>${t.modalLi11}</li>
                </ul>

                <h3>${t.modalTitle5}</h3>
                <p><strong>${t.modalStrong1}</strong></p>
                <ul>
                    <li>${t.modalLi12}</li>
                    <li>${t.modalLi13}</li>
                    <li>${t.modalLi14}</li>
                    <li>${t.modalLi15}</li>
                    <li>${t.modalLi16}</li>
                </ul>
                <p><strong>${t.modalStrong2}</strong></p>
                <ul>
                    <li>${t.modalLi17}</li>
                    <li>${t.modalLi18}</li>
                    <li>${t.modalLi19}</li>
                </ul>

                <h3>${t.modalTitle6}</h3>
                <p>${t.modalP3}</p>
                <p><strong>${t.modalStrong3}</strong></p>
                <ul>
                    <li>${t.modalLi20}</li>
                    <li>${t.modalLi21}</li>
                    <li>${t.modalLi22}</li>
                </ul>
                <p>${t.modalP4}</p>
            `;

            modal.classList.add('is-active');
            modal.style.display = 'block';
        }
    }

    // SLUITEN MODAL
    if (
        e.target.id === 'close-modal-btn' ||
        e.target.classList.contains('modal-overlay')
    ) {
        if (modal) {
            modal.classList.remove('is-active');
            modal.style.display = 'none';
        }
    }
});

});
