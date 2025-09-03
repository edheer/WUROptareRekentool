// reiskosten.js

const BELASTING_PERCENTAGE = 0.50;
const KM_VERGOEDING_STANDAARD = 0.14;
const KM_VERGOEDING_FISCAAL = 0.23;

let inputs, outputs;

function formatCurrency(value) {
    return `€ ${value.toFixed(2).replace('.', ',')}`;
}

export function initReiskostenTool(currentLang, translations) {
    inputs = {
        max_vakantiegeld: document.getElementById('max_vakantiegeld'),
        max_eindejaarsuitkering: document.getElementById('max_eindejaarsuitkering'),
        reisdagen_gedeclareerd: document.getElementById('reisdagen_gedeclareerd'),
        km_fiscaal: document.getElementById('km_fiscaal'),
        keuze_inzet: document.getElementById('keuze_inzet')
    };

    outputs = {
        budget_bron_naam: document.getElementById('budget_bron_naam'),
        budget_bron_totaal: document.getElementById('budget_bron_totaal'),
        budget_inzet: document.getElementById('budget_inzet'),
        progress_bar: document.getElementById('progress_bar'),
        bron_namen: document.querySelectorAll('.sub-label.bron_naam'),
        huidig_bruto: document.getElementById('huidig_bruto'),
        huidig_belasting: document.getElementById('huidig_belasting'),
        huidig_netto: document.getElementById('huidig_netto'),
        nieuw_bruto: document.getElementById('nieuw_bruto'),
        nieuw_belasting: document.getElementById('nieuw_belasting'),
        nieuw_uitruil: document.getElementById('nieuw_uitruil'),
        nieuw_netto: document.getElementById('nieuw_netto'),
        verschil_netto: document.getElementById('verschil_netto')
    };
}

export function updateReiskosten(currentLang, translations) {
    const v = {
        max_vakantiegeld: parseFloat(inputs.max_vakantiegeld.value) || 0,
        max_eindejaarsuitkering: parseFloat(inputs.max_eindejaarsuitkering.value) || 0,
        reisdagen_gedeclareerd: parseFloat(inputs.reisdagen_gedeclareerd.value) || 0,
        km_fiscaal: parseFloat(inputs.km_fiscaal.value) || 0,
        keuze_inzet: inputs.keuze_inzet.value
    };

    // --- BEREKENING ---
    
    // 1. Bepaal eerst de beschikbare bron (het budget)
    let brutoBronHuidig;
    let bronNaamKey;
    switch (v.keuze_inzet) {
        case 'beide':
            brutoBronHuidig = v.max_vakantiegeld + v.max_eindejaarsuitkering;
            bronNaamKey = 'sourceBoth';
            break;
        case 'eindejaarsuitkering':
        default:
            brutoBronHuidig = v.max_eindejaarsuitkering;
            bronNaamKey = 'sourceYearEndBonus';
            break;
    }

    // 2. Bereken de potentiële fiscale ruimte voor uitruil
    const km_afgetopt = Math.min(v.km_fiscaal, 60);
    const totaalMogelijkFiscaal = v.km_fiscaal * 2 * v.reisdagen_gedeclareerd * KM_VERGOEDING_FISCAAL;
    const standaardVergoeding = km_afgetopt * v.reisdagen_gedeclareerd * KM_VERGOEDING_STANDAARD;
    const potentieleInzet = Math.max(0, totaalMogelijkFiscaal - standaardVergoeding);

    // 3. Bepaal het daadwerkelijk ingezette bedrag: top dit af op het beschikbare budget
    const totaalIngezetBedrag = Math.min(potentieleInzet, brutoBronHuidig);

    // 4. Bereken de 'huidige' situatie
    const belastingHuidig = brutoBronHuidig * BELASTING_PERCENTAGE;
    const nettoHuidig = brutoBronHuidig - belastingHuidig;

    // 5. Bereken de 'nieuwe' situatie
    const brutoBronNieuw = brutoBronHuidig - totaalIngezetBedrag;
    const belastingNieuw = brutoBronNieuw * BELASTING_PERCENTAGE;
    const nettoNieuw = brutoBronNieuw - belastingNieuw + totaalIngezetBedrag;

    // 6. Bereken het verschil
    const verschilNetto = nettoNieuw - nettoHuidig;


    // --- UPDATE VAN DE INTERFACE ---

    const bronNaam = translations[currentLang][bronNaamKey];
    outputs.bron_namen.forEach(el => el.textContent = bronNaam);
    outputs.budget_bron_naam.textContent = bronNaam;

    outputs.budget_bron_totaal.textContent = formatCurrency(brutoBronHuidig);
    outputs.budget_inzet.textContent = formatCurrency(totaalIngezetBedrag);

    outputs.huidig_bruto.textContent = formatCurrency(brutoBronHuidig);
    outputs.huidig_belasting.textContent = formatCurrency(-belastingHuidig);
    outputs.huidig_netto.textContent = formatCurrency(nettoHuidig);

    outputs.nieuw_bruto.textContent = formatCurrency(brutoBronNieuw);
    outputs.nieuw_belasting.textContent = formatCurrency(-belastingNieuw);
    outputs.nieuw_uitruil.textContent = formatCurrency(totaalIngezetBedrag);
    outputs.nieuw_netto.textContent = formatCurrency(nettoNieuw);

    outputs.verschil_netto.textContent = formatCurrency(verschilNetto);

    // De progress bar toont nog steeds de verhouding t.o.v. de *potentiele* inzet,
    // zodat de gebruiker ziet of zijn budget toereikend is.
    let progressPercentage = brutoBronHuidig > 0 ? (potentieleInzet / brutoBronHuidig) * 100 : 0;
    outputs.progress_bar.style.width = `${Math.min(progressPercentage, 100)}%`;
    outputs.progress_bar.classList.remove('is-normal', 'is-warning', 'is-danger');
    
    if (potentieleInzet > brutoBronHuidig) {
        outputs.progress_bar.classList.add('is-danger');
    } else if (progressPercentage > 80) {
        outputs.progress_bar.classList.add('is-warning');
    } else {
        outputs.progress_bar.classList.add('is-normal');
    }
}