// js/verlof.js

import { formatCurrency } from './utils.js';
import { translations } from './vertaalsysteem.js';

const BELASTING_PERCENTAGE = 0.50;

const REGELS = {
    wu: { maxUren: 38, percentage: 0.00704 },
    wr: { maxUren: 36, percentage: 0.00717 }
};

let inputs, outputs;
let isInitialized = false;

function safeUpdate(element, value) {
    if (element) {
        element.textContent = value;
    } else {
        console.error('Poging om te schrijven naar een niet-bestaand element.', value);
    }
}

export function initVerlofTool(openModalFunction, currentLang) {
    if (isInitialized) return;

    inputs = {
        userType: document.querySelectorAll('input[name="verlof_user_type"]'),
        maandsalaris: document.getElementById('verlof_maandsalaris'),
        uren: document.getElementById('verlof_uren')
    };
    outputs = {
        maxUrenLabel: document.getElementById('verlof_max_uren_label'),
        nettoOpbrengst: document.getElementById('verlof_netto_opbrengst'),
        waardePerUur: document.getElementById('verlof_waarde_per_uur'),
        brutoOpbrengst: document.getElementById('verlof_bruto_opbrengst'),
        brutoSublabel: document.getElementById('verlof_bruto_sublabel'),
        belasting: document.getElementById('verlof_belasting'),
        nettoDetail: document.getElementById('verlof_netto_uitbetaald_detail')
    };

    if (inputs.userType) {
        inputs.userType.forEach(radio => radio.addEventListener('change', () => updateVerlofTool(currentLang)));
    }
    
    [inputs.maandsalaris, inputs.uren].forEach(input => {
        if (input) {
            input.addEventListener('focus', () => {
                // Verwijder '0' bij focus, behalve als het de placeholder tekst is
                if (input.value === '0' || (input.id === 'verlof_maandsalaris' && input.value === '3000')) {
                    input.value = '';
                }
            });
            input.addEventListener('blur', () => {
                if (input.value === '') {
                    input.value = (input.id === 'verlof_maandsalaris') ? '3000' : '0';
                }
            });
        }
    });

    const infoLink = document.getElementById('open-info-modal-link-verlof');
    if (infoLink && openModalFunction) {
        infoLink.addEventListener('click', (e) => {
            e.preventDefault();
            const t = translations[currentLang];
            const content = `
                <h2>${t.leaveModalTitle}</h2>
                <p>${t.leaveModalP1}</p>
                <h3>${t.leaveModalH3_WU}</h3>
                <ul class="checkmark-list"><li>${t.leaveModalLi1_WU}</li><li>${t.leaveModalLi2_WU}</li></ul>
                <h3>${t.leaveModalH3_WR}</h3>
                <ul class="checkmark-list"><li>${t.leaveModalLi1_WR}</li><li>${t.leaveModalLi2_WR}</li></ul>
                <h3>${t.leaveModalH3_Calc}</h3>
                <p>${t.leaveModalP2}</p>
            `;
            openModalFunction(content);
        });
    }
    isInitialized = true;
}

export function updateVerlofTool(currentLang) {
    if (!isInitialized || !inputs || !outputs) return;

    const userTypeElement = document.querySelector('input[name="verlof_user_type"]:checked');
    if (!userTypeElement || !inputs.maandsalaris || !inputs.uren) return;

    const userType = userTypeElement.value;
    const maandsalaris = parseFloat(inputs.maandsalaris.value) || 0;
    const uren = parseFloat(inputs.uren.value) || 0;
    
    const regel = REGELS[userType];

    // --- WIJZIGING HIER ---
    // Update de UI-elementen die afhankelijk zijn van het type medewerker
    if (outputs.maxUrenLabel) {
        // 1. Update de tekst in de <label>
        outputs.maxUrenLabel.textContent = `max ${regel.maxUren}`;
        
        // 2. Update het 'max' attribuut van de <input> voor validatie
        inputs.uren.setAttribute('max', regel.maxUren);
        
        // 3. Update de placeholder van de <input> // <<<<<<< NIEUW
        inputs.uren.setAttribute('placeholder', `max ${regel.maxUren}`);
    }
    
    const afgetopteUren = Math.min(uren, regel.maxUren);
    if (uren > regel.maxUren) {
        inputs.uren.value = regel.maxUren;
    }

    const waardePerUur = maandsalaris * regel.percentage;
    const brutoOpbrengst = afgetopteUren * waardePerUur;
    const belasting = brutoOpbrengst * BELASTING_PERCENTAGE;
    const nettoOpbrengst = brutoOpbrengst - belasting;

    safeUpdate(outputs.nettoOpbrengst, formatCurrency(nettoOpbrengst, currentLang));
    safeUpdate(outputs.waardePerUur, formatCurrency(waardePerUur, currentLang));
    safeUpdate(outputs.brutoOpbrengst, formatCurrency(brutoOpbrengst, currentLang));
    safeUpdate(outputs.brutoSublabel, `${afgetopteUren} uren`);
    safeUpdate(outputs.belasting, formatCurrency(-belasting, currentLang));
    safeUpdate(outputs.nettoDetail, formatCurrency(nettoOpbrengst, currentLang));
}