import { initReiskostenTool, updateReiskosten } from './reiskosten.js';
import { translations, translatePage } from './vertaalsysteem.js';

document.addEventListener('DOMContentLoaded', () => {
    let currentLang = 'nl';

    // Init vertaling
    translatePage(currentLang);

    // Init dropdown + secties
    document.querySelectorAll('.tool-section').forEach(div => div.style.display = 'none');
    document.getElementById('tool-reiskosten').style.display = 'block';

    // Init tool
    initReiskostenTool(currentLang, translations);
    updateReiskosten(currentLang, translations);

    // Luister naar input
    document.body.addEventListener('input', () => {
        const selected = document.getElementById('source-selector').value;
        if (selected === 'reiskosten') {
            updateReiskosten(currentLang, translations);
        }
        // andere tools in toekomst hier toevoegen
    });

    // Taalknop
    document.getElementById('translate-btn').addEventListener('click', () => {
        currentLang = currentLang === 'nl' ? 'en' : 'nl';
        translatePage(currentLang);

        const selected = document.getElementById('source-selector').value;
        if (selected === 'reiskosten') {
            updateReiskosten(currentLang, translations);
        }
    });

    // Tool selectie via dropdown
    document.getElementById('source-selector').addEventListener('change', (e) => {
        const selected = e.target.value;

        // verberg alles
        document.querySelectorAll('.tool-section').forEach(div => div.style.display = 'none');

        // toon geselecteerde
        const selectedSection = document.getElementById(`tool-${selected}`);
        if (selectedSection) {
            selectedSection.style.display = 'block';

            // init of update geselecteerde tool
            if (selected === 'reiskosten') {
                initReiskostenTool(currentLang, translations);
                updateReiskosten(currentLang, translations);
            }
        }
    });
});
