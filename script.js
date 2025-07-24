document.addEventListener('DOMContentLoaded', () => {
    // Vertalingen object uitgebreid met de nieuwe dropdown teksten
    const translations = {
        nl: {
            // Bestaande vertalingen
            translateBtnText: "EN",
            pageTitle: "WUR Berekeningsmodel Uitruil",
            headerTitle: "Simulatietool Optare",
            disclaimer: "* Let op: dit is een indicatieve berekening. Aan de resultaten kunnen geen rechten worden ontleend.",
            yourBudget: "Jouw budget",
            availableSource: "Beschikbare bron",
            totalUsedAmount: "Totaal ingezet bedrag",
            travelCostExchange: "Uitruil reiskosten",
            labelHolidayPay: "Max. inzet vakantiegeld",
            labelYearEndBonus: "Max. inzet eindejaarsuitkering",
            labelTravelDays: "Gedeclareerde reisdagen",
            labelDistance: "Enkele reisafstand",
            labelSourceToUse: "Welke bron wil je inzetten?",
            optionYearEndBonus: "Eindejaarsuitkering",
            optionBoth: "Vakantiegeld & Eindejaarsuitkering",
            explanationLink: "Uitleg van berekening",
            yourNetBenefit: "Jouw netto voordeel",
            netBenefitLabel: "Je houdt netto méér over op jaarbasis:",
            applyButton: "Direct aanvragen in Optare",
            calculationDetails: "De details van de berekening",
            currentSituation: "Huidige situatie",
            situationAfterExchange: "Situatie na uitruil",
            gross: "Bruto ",
            tax: "Belasting (ca. 50%)",
            netPaid: "Netto uitbetaald",
            taxFreeExchange: "+ Belastingvrije uitruil",
            showDetails: "Toon details",
            hideDetails: "Verberg details",
            sourceYearEndBonus: "Eindejaarsuitkering",
            sourceBoth: "Vakantiegeld & Eindejaarsuitkering",
            
            // Nieuwe vertalingen voor dropdown
            sourceSelectorLabel: "Kies uw berekening",
            sourceTravel: "Reiskosten",
            sourceBike: "Fiets",
            sourceLeave: "Extra verlof",
            sourceUnion: "Vakbondcontributie",
            
            // Bestaande modal vertalingen...
            modalTitle1: "Reiskosten, vakantie-uitkering en eindejaarsuitkering zonder verlof",
            modalTitle2: "Korte uitleg van de regeling",
            modalP1: "Met deze regeling kun je extra reiskostenvergoeding ontvangen door je eindejaarsuitkering (EJU) en/of vakantie-uitkering in te ruilen. Je ontvangt:",
            modalLi1: "<strong>€ 0,23</strong> per kilometer in plaats van € 0,14 (voor de eerste 60km per dag).",
            modalLi2: "<strong>€ 0,23</strong> voor alle kilometers boven de 60km enkele reis.",
            modalLi3: "De uitbetaling is twee keer per jaar, in mei en november.",
            modalP2: "Let op: je moet je reisdagen maandelijks blijven registreren in MyHR.",
            modalTitle3: "Voor wie is deze regeling interessant?",
            modalLi4: "Je reist met eigen vervoer.",
            modalLi5: "Je werkt regelmatig op locatie.",
            modalLi6: "Je hebt voldoende reisdagen dit jaar.",
            modalLi7: "Je wilt fiscaal voordeel over je EJU of vakantie-uitkering.",
            modalLi8: "Je wilt geen verlof inzetten als ruilmiddel.",
            modalTitle4: "Voor wie is deze regeling minder interessant?",
            modalLi9: "Je reist met het openbaar vervoer en ontvangt daarvoor een vergoeding.",
            modalLi10: "Je bent niet consequent in het registreren van je reisdagen in MyHR.",
            modalLi11: "Je hebt een korte afstand en weinig reisdagen (dan is het voordeel relatief klein, maar nog steeds een voordeel).",
            modalTitle5: "Wat zijn de voorwaarden / consequenties?",
            modalStrong1: "Voorwaarden:",
            modalLi12: "Je reist met eigen vervoer.",
            modalLi13: "Je declareert je reisdagen maandelijks in MyHR.",
            modalLi14: "Je doet één aanvraag per jaar via de Keuzetool.",
            modalLi15: "Je ruilt (deels) je bruto vakantie-uitkering en/of eindejaarsuitkering in.",
            modalLi16: "Als je bronnen niet voldoende zijn, wordt het resterende bedrag ingehouden op je bruto salaris van mei of november.",
            modalStrong2: "Consequenties:",
            modalLi17: "Je ontvangt de extra reiskostenvergoeding in mei en in november.",
            modalLi18: "Je brutoloon in die maanden kan lager zijn als je bronnen niet toereikend zijn.",
            modalLi19: "Geen declaraties = geen extra vergoeding, ook niet als je wél een aanvraag hebt gedaan.",
            modalTitle6: "Voorbeeldsituatie",
            modalP3: "<strong>Scenario:</strong> Thomas reist 50 km enkele reis en werkt 3 dagen per week op locatie. Hij verwacht 150 reisdagen te declareren. Zijn vakantie-uitkering is € 2.500 en zijn eindejaarsuitkering is € 2.400.",
            modalStrong3: "Berekening extra vergoeding:",
            modalLi20: "Over de eerste 60 km (heen en terug) krijgt Thomas € 0,09 extra: <br>150 dagen × 60 km × € 0,09 = <strong>€ 810</strong>",
            modalLi21: "Over de resterende 40 km (100 km - 60 km) krijgt hij € 0,23: <br>150 dagen × 40 km × € 0,23 = <strong>€ 1.380</strong>",
            modalLi22: "Totaal extra te ontvangen: <strong>€ 2.190</strong> (belastingvrij)",
            modalP4: "Thomas ruilt dit bedrag in tegen zijn bruto vakantie-uitkering en eindejaarsuitkering. Dit levert hem een netto voordeel op van circa 50% van € 2.190, dus <strong>€ 1.095</strong>."
        },
        en: {
            // Bestaande vertalingen
            translateBtnText: "NL",
            pageTitle: "WUR Exchange Calculation Model",
            headerTitle: "Simulation tool Optare",
            disclaimer: "* Please note: this is an indicative calculation. No rights can be derived from the results.",
            yourBudget: "Your budget",
            availableSource: "Available source",
            totalUsedAmount: "Total amount used",
            travelCostExchange: "Travel Cost Exchange",
            labelHolidayPay: "Max. holiday allowance to use",
            labelYearEndBonus: "Max. year-end bonus to use",
            labelTravelDays: "Declared travel days",
            labelDistance: "One-way travel distance",
            labelSourceToUse: "Which source do you want to use?",
            optionYearEndBonus: "Year-end bonus",
            optionBoth: "Holiday allowance & Year-end bonus",
            explanationLink: "Explanation of calculation",
            yourNetBenefit: "Your net benefit",
            netBenefitLabel: "Your net annual benefit is:",
            applyButton: "Apply directly in Optare",
            calculationDetails: "Calculation details",
            currentSituation: "Current situation",
            situationAfterExchange: "Situation after exchange",
            gross: "Gross ",
            tax: "Tax (approx. 50%)",
            netPaid: "Net Paid",
            taxFreeExchange: "+ Tax-free exchange",
            showDetails: "Show details",
            hideDetails: "Hide details",
            sourceYearEndBonus: "Year-end bonus",
            sourceBoth: "Holiday allowance & Year-end bonus",

            // Nieuwe vertalingen voor dropdown
            sourceSelectorLabel: "Choose your calculation",
            sourceTravel: "Travel costs",
            sourceBike: "Bicycle",
            sourceLeave: "Extra leave",
            sourceUnion: "Union dues",
            
            // Bestaande modal vertalingen...
            modalTitle1: "Travel costs, holiday allowance, and year-end bonus without leave",
            modalTitle2: "Brief explanation of the scheme",
            modalP1: "With this scheme, you can receive extra travel allowance by exchanging your year-end bonus (YEB) and/or holiday allowance. You receive:",
            modalLi1: "<strong>€0.23</strong> per kilometer instead of €0.14 (for the first 60km per day).",
            modalLi2: "<strong>€0.23</strong> for all kilometers beyond a 60km one-way trip.",
            modalLi3: "Payment is twice a year, in May and November.",
            modalP2: "Please note: you must continue to register your travel days monthly in MyHR.",
            modalTitle3: "Who is this scheme for?",
            modalLi4: "You travel with your own transport.",
            modalLi5: "You regularly work on location.",
            modalLi6: "You have enough travel days this year.",
            modalLi7: "You want a tax benefit on your YEB or holiday allowance.",
            modalLi8: "You do not want to use leave as a means of exchange.",
            modalTitle4: "Who is this scheme less suitable for?",
            modalLi9: "You travel by public transport and receive compensation for it.",
            modalLi10: "You are not consistent in registering your travel days in MyHR.",
            modalLi11: "You have a short distance and few travel days (the benefit is relatively small, but still a benefit).",
            modalTitle5: "What are the conditions / consequences?",
            modalStrong1: "Conditions:",
            modalLi12: "You travel with your own transport.",
            modalLi13: "You declare your travel days monthly in MyHR.",
            modalLi14: "You make one request per year via the Choice Tool.",
            modalLi15: "You (partially) exchange your gross holiday allowance and/or year-end bonus.",
            modalLi16: "If your sources are insufficient, the remaining amount will be deducted from your gross salary in May or November.",
            modalStrong2: "Consequences:",
            modalLi17: "You will receive the extra travel allowance in May and November.",
            modalLi18: "Your gross salary in those months may be lower if your sources are not sufficient.",
            modalLi19: "No declarations = no extra compensation, even if you have made a request.",
            modalTitle6: "Example Situation",
            modalP3: "<strong>Scenario:</strong> Thomas travels 50 km one-way and works 3 days a week on location. He expects to declare 150 travel days. His holiday allowance is €2,500 and his year-end bonus is €2,400.",
            modalStrong3: "Extra allowance calculation:",
            modalLi20: "For the first 60 km (round trip), Thomas gets an extra €0.09: <br>150 days × 60 km × €0.09 = <strong>€810</strong>",
            modalLi21: "For the remaining 40 km (100 km - 60 km), he gets €0.23: <br>150 days × 40 km × €0.23 = <strong>€1,380</strong>",
            modalLi22: "Total extra to receive: <strong>€2,190</strong> (tax-free)",
            modalP4: "Thomas exchanges this amount against his gross holiday allowance and year-end bonus. This gives him a net benefit of approximately 50% of €2,190, so <strong>€1,095</strong>."
        }
    };

    let currentLang = 'nl';

    // VASTE PARAMETERS
    const BELASTING_PERCENTAGE = 0.50;
    const KM_VERGOEDING_STANDAARD = 0.14;
    const KM_VERGOEDING_FISCAAL = 0.23;

    const inputs = {
        max_vakantiegeld: document.getElementById('max_vakantiegeld'),
        max_eindejaarsuitkering: document.getElementById('max_eindejaarsuitkering'),
        reisdagen_gedeclareerd: document.getElementById('reisdagen_gedeclareerd'),
        km_fiscaal: document.getElementById('km_fiscaal'),
        keuze_inzet: document.getElementById('keuze_inzet')
    };

    const outputs = {
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

    const openInfoModalLink = document.getElementById('open-info-modal-link');
    const infoModal = document.getElementById('info-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalOverlay = infoModal.querySelector('.modal-overlay');
    const translateBtn = document.getElementById('translate-btn');

    const formatCurrency = (value) => `€ ${value.toFixed(2).replace('.', ',')}`;

    function translatePage(lang) {
        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const key = el.dataset.translateKey;
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
        document.documentElement.lang = lang;
        translateBtn.textContent = translations[lang].translateBtnText;
    }

    function initializeTool() {
        translatePage(currentLang); 

        document.body.addEventListener('input', updateCalculations);
        
        document.querySelectorAll('.toggle-details-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const detailsContainer = this.parentElement.querySelector('.calculation-details');
                const isVisible = detailsContainer.classList.toggle('is-visible');
                this.textContent = isVisible ? translations[currentLang].hideDetails : translations[currentLang].showDetails;
            });
        });

        openInfoModalLink.addEventListener('click', (e) => {
            e.preventDefault();
            infoModal.classList.add('is-active');
        });

        const closeModal = () => infoModal.classList.remove('is-active');
        closeModalBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', closeModal);

        translateBtn.addEventListener('click', () => {
            currentLang = currentLang === 'nl' ? 'en' : 'nl';
            translatePage(currentLang);
            updateCalculations();
        });

        updateCalculations();
    }
    
    function updateCalculations() {
        const v = {
            max_vakantiegeld: parseFloat(inputs.max_vakantiegeld.value) || 0,
            max_eindejaarsuitkering: parseFloat(inputs.max_eindejaarsuitkering.value) || 0,
            reisdagen_gedeclareerd: parseFloat(inputs.reisdagen_gedeclareerd.value) || 0,
            km_fiscaal: parseFloat(inputs.km_fiscaal.value) || 0,
            keuze_inzet: inputs.keuze_inzet.value
        };

        const km_afgetopt = Math.min(v.km_fiscaal, 60);
        const totaalMogelijkFiscaal = v.km_fiscaal * 2 * v.reisdagen_gedeclareerd * KM_VERGOEDING_FISCAAL;
        const standaardVergoeding = km_afgetopt * v.reisdagen_gedeclareerd * KM_VERGOEDING_STANDAARD;
        const teBenuttenReiskosten = totaalMogelijkFiscaal - standaardVergoeding;
        
        const totaalIngezetBedrag = Math.max(0, teBenuttenReiskosten);

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
        
        const belastingHuidig = brutoBronHuidig * BELASTING_PERCENTAGE;
        const nettoHuidig = brutoBronHuidig - belastingHuidig;
        
        const brutoBronNieuw = brutoBronHuidig - totaalIngezetBedrag;
        const belastingNieuw = brutoBronNieuw * BELASTING_PERCENTAGE;
        const nettoNieuw = brutoBronNieuw - belastingNieuw + totaalIngezetBedrag;
        
        const verschilNetto = nettoNieuw - nettoHuidig;
        
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
        
        let progressPercentage = brutoBronHuidig > 0 ? (totaalIngezetBedrag / brutoBronHuidig) * 100 : 0;
        outputs.progress_bar.style.width = `${Math.min(progressPercentage, 100)}%`;
        outputs.progress_bar.classList.remove('is-normal', 'is-warning', 'is-danger');
        if (totaalIngezetBedrag > brutoBronHuidig) outputs.progress_bar.classList.add('is-danger');
        else if (progressPercentage > 80) outputs.progress_bar.classList.add('is-warning');
        else outputs.progress_bar.classList.add('is-normal');
    }

    initializeTool();
});