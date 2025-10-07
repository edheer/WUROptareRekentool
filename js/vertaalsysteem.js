// js/vertaalsysteem.js
// Dit is een voorbeeld. Zorg dat jouw bestand de 'translations' exporteert en de 'hideDetails' key bevat.

export const translations = {
    nl: {
        pageTitle: "WUR Berekeningsmodel Uitruil",
        headerTitle: "Simulatietool Optare",
        sourceSelectorLabel: "Kies uw berekening",
        sourceYearEndBonus: 'Eindejaarsuitkering',
        sourceHolidayPay: 'Vakantiegeld',
        sourceBoth: 'Vakantiegeld & Eindejaarsuitkering',
        sourceTravel: "Reiskosten",
        sourceBike: "Fiets",
        sourceLeave: "Extra verlof",
        sourceUnion: "Vakbondcontributie",
        disclaimer: "* Let op: dit is een indicatieve berekening. Aan de resultaten kunnen geen rechten worden ontleend.",
        disclaimer1: "En: een lager brutoloon kan van invloed zijn op de hoogte van eventuele toekomstige uitkeringen vanuit Sociale Zekerheid.",
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
        optionHolidayPay: "Vakantiegeld",
        optionBoth: "Vakantiegeld & Eindejaarsuitkering",
        explanationLink: "Uitleg van berekening",
        yourNetBenefit: "Jouw netto voordeel",
        netBenefitLabel: "Je houdt netto méér over op jaarbasis:",
        applyButton: "Direct aanvragen in Optare",
        calculationDetails: "De details van de berekening",
        currentSituation: "Huidige situatie",
        gross: "Bruto",
        tax: "Belasting (ca. 50%)",
        netPaid: "Netto uitbetaald",
        situationAfterExchange: "Situatie na uitruil",
        taxFreeExchange: "+ Belastingvrije uitruil",
        showDetails: "Toon details",
        hideDetails: "Verberg details", // << BELANGRIJK: DEZE MOET ERIN STAAN
        exampleCalculation: "Voorbeeld berekening:",
        noUploadNeeded: "Voor deze indicatieve berekening hoef je geen documenten te uploaden.",
        netCost: "Netto kosten",
        taxReliefNone: "Belastingvoordeel (geen)",
        taxRelief: "Belastingvoordeel (ca. 50%)",
        grossUnionFee: "Bruto vakbondscontributie",
        unionFeeExchange: "Uitruil vakbondscontributie",
        labelUnionFeeAmount: "Brutobedrag contributie per maand/jaar",
        labelUnionFeeFrequency: "Frequentie",
        optionMonthly: "Maand",
        optionYearly: "Jaar",

        // Fietsregeling
        bikeRegulationTitle: "Fietsregeling",
        labelBikePurchaseAmount: "Aankoopbedrag fiets (max €2.500)",
        labelBikeGrossSource: "Beschikbaar bruto bedrag (vakantiegeld/EJU)",
        grossAmountUsed: "Bruto ingezet bedrag",
        netCostForYou: "Netto kosten voor jou",
        bikeExchangeTitle: "Uitruil (elektrische) fiets/scooter",
        labelBikePurchaseAmountFull: "Aankoopbedrag (incl. accessoires/verzekering)",
        explanationLinkBike: "Uitleg & voorwaarden",
        netBenefitBikeLabel: "Je houdt netto méér over door belastingvoordeel:",
        bikeModalTitle: "Uitleg: Uitruil (elektrische) fiets/scooter",
        bikeModalP1: "Met de fietsregeling kun je een (elektrische) fiets of scooter aanschaffen en profiteren van een belastingvoordeel door een deel van je bruto salaris (vakantiegeld of eindejaarsuitkering) in te ruilen.",
        bikeModalH3: "Hoe werkt het?",
        bikeModalLi1: "Kies een fiets of scooter uit.",
        bikeModalLi2: "Bepaal welk deel van je bruto salaris je wilt inzetten.",
        bikeModalLi3: "Geniet van je nieuwe fiets en het belastingvoordeel!",
        bikeModalP2: "De precieze voorwaarden en details vind je op de WUR website.",
        bikeModalP3: "Je kunt een fiets aanschaffen tot een bedrag van €2.500. Het belastingvoordeel is afhankelijk van je persoonlijke situatie.",

        // Modal teksten (voorbeeld, pas aan naar jouw exacte keys)
        modalTitle1: "Titel 1", modalTitle2: "Titel 2", modalP1: "Paragraaf 1",
        modalLi1: "Item 1", modalLi2: "Item 2", modalLi3: "Item 3",
        modalStrong3: "Voorbeeld:", modalLi20: "Berekening voorbeeld 1",
        modalP4: "Meer info over de berekening.",

        // Verlofregeling
        leaveSaleTitle: "Verkopen van bovenwettelijk verlof",
        labelUserType: "Type medewerker",
        labelMonthlySalary: "Bruto maandsalaris (o.b.v. fulltime, januari)",
        labelHoursToSell: "Aantal uren te verkopen",
        yourNetPayout: "Jouw netto-opbrengst",
        netPayoutLabel: "Je ontvangt netto (na belasting):",
        leaveCalculation: "Berekening verlofwaarde",
        valuePerHour: "Waarde per uur",
        grossProceeds: "Bruto-opbrengst",
        explanationLinkLeave: "Uitleg & voorwaarden",
        // Modal
        leaveModalTitle: "Uitleg: Verlofuren verkopen",
        leaveModalP1: "Je kunt alleen bovenwettelijke verlofuren inzetten in Optare. De regels verschillen voor WU- en WR-medewerkers.",
        leaveModalH3_WU: "Regels WU-medewerkers",
        leaveModalLi1_WU: "Je mag jaarlijks maximaal 38 bovenwettelijke verlofuren inzetten voor een geldelijke waarde (zoals extra inkomen).",
        leaveModalLi2_WU: "De waarde van één verlofuur is 0,704% van je bruto maandsalaris (o.b.v. een voltijd dienstverband en het salaris van januari).",
        leaveModalH3_WR: "Regels WR-medewerkers",
        leaveModalLi1_WR: "Je mag jaarlijks maximaal 36 bovenwettelijke verlofuren inzetten voor een geldelijke waarde.",
        leaveModalLi2_WR: "De waarde van één verlofuur is 0,717% van je bruto maandsalaris (o.b.v. een voltijd dienstverband en het salaris van januari).",
        leaveModalH3_Calc: "Belasting",
        leaveModalP2: "De bruto-opbrengst van de verkochte uren wordt gezien als extra inkomen en wordt belast tegen het bijzonder tarief (ca. 50%).",

        // --- NIEUWE TEKSTEN REISKOSTEN ---
        hoverHolidayPay: "Het bedrag kan je terugvinden in de Optare banner via MyHR > Menu > Mijn aanvragen > Optare > Optare banner. Let op: het bedrag in de banner staat nu op €0,00 omdat het vakantiegeld in mei is uitbetaald.",
        hoverYearEndBonus: "Het bedrag kan je terugvinden in de Optare banner via MyHR > Menu > Mijn aanvragen > Optare > Optare banner.",
        hoverTravelDays: "Het aantal gedeclareerde reisdagen tot nu toe kan je vinden via MyHR > Menu > Mijn declaraties > Overzichten declaraties > Woon-werk KM en thuiswerken. Maak zelf een schatting wat je voor de rest van het jaar aan reisdagen verwacht.",
        hoverDistance: "Het aantal kilometers per enkele reis kan je terugvinden in de Optare banner via MyHR > Menu > Mijn aanvragen > Optare > Optare banner.",
        
        travelCostExplanationTitle: "Uitleg: Uitruil reiskostenvergoeding",
        travelCostExplanationP1: "Wanneer je als medewerker van WUR per fiets of auto naar werk reist, ontvang je mogelijk al een onbelaste reiskostenvergoeding van €0,14 per kilometer met een maximum van 30 kilometer per enkele reis. Met de Optare-regeling kun je deze vergoeding aanvullen tot €0,23 per kilometer. De limiet van 30 kilometer per enkele reis komt hiermee te vervallen. Je ontvangt belastingvoordeel over je bruto vakantiegeld of eindejaarsuitkering als je dit inzet voor extra reiskosten.",
        travelCostCalculationHeading: "De berekening is als volgt:",
        travelCostCalculationStep1: "Je aantal reisdagen en je enkele reisafstand bepalen de hoogte van de extra reiskosten.",
        travelCostCalculationStep2: "Kies of je vakantiegeld, eindejaarsuitkering, of beide wilt inzetten voor de uitruil.",
        travelCostCalculationStep3: "De tool berekent het bruto bedrag van de vakantie- en/of eindejaarsuitkering dat je inzet voor de extra reiskosten.",
        travelCostCalculationStep4: "Dit uitgeruilde bedrag wordt niet belast, waardoor je circa 50% van dit bedrag netto aan voordeel ontvangt.",
        travelCostCalculationStep5: "Het netto voordeel is het bedrag dat je meer overhoudt dan wanneer je de bruto vergoeding normaal zou laten uitbetalen.",
        travelCostExampleText: "Stel dat je 100 dagen per jaar naar werk reist, je enkele reisafstand is 20 kilometer en je kiest de eindejaarsuitkering (€1000) als bron, dan zet je 100 x 20 x 2 x €0,09 = €360 in voor de extra reiskosten. Je ruilt €360 bruto uit, wat je circa €180 netto voordeel oplevert.",
        travelCostExplanationP2: '', // <<<<<< HIER IS DE FIX
        travelCostExplanationP3: "De berekening in deze tool geeft een indicatie van het netto voordeel. De exacte hoogte van het voordeel kan afwijken op basis van je persoonlijke fiscale situatie.",
        // --- EINDE NIEUWE TEKSTEN ---

        // Uitlegteksten Vakbondscontributie
        unionFeeExplanationTitle: "Uitleg: Uitruil vakbondscontributie",
        unionFeeExplanationP1: "Wanneer je lid bent van een vakbond, kun je via Optare jaarlijks je belastingvoordeel over je vakbondscontributie aanvragen. Doordat je een brutobedrag inlegt en een nettobedrag terugkrijgt, levert dit je een belastingvoordeel op.",
        unionFeeCalculationHeading: "De berekening is als volgt:",
        unionFeeCalculationStep1: "Voer je jaarlijkse brutocontributiebedrag in. Als je maandelijks betaalt, wordt dit automatisch omgerekend naar een jaarbedrag.",
        unionFeeCalculationStep2: "Kies welke bruto bron (vakantiegeld of eindejaarsuitkering) je wilt inzetten om de contributie mee uit te ruilen.",
        unionFeeCalculationStep3: "Het uit te ruilen bedrag wordt direct verrekend met je gekozen bruto bron, waardoor je over dat bedrag geen belasting betaalt. Dit resulteert in een netto voordeel van circa 50% van het uitgeruilde bedrag.",
        unionFeeExampleText: "Stel, je betaalt €20 per maand aan contributie (€240 per jaar). Als je dit bedrag uitruilt met je eindejaarsuitkering, bespaar je circa 50% belasting over die €240, wat neerkomt op een netto voordeel van circa €120.",
        unionFeeExplanationP2: "Voeg tijdens de aanvraag in Optare een bankafschrift toe van een maandelijkse of jaarlijkse betaling van de contributie. Geef in de Optare-aanvraag aan welke bruto bron je hiervoor wilt inzetten.",
    },
    en: {
        pageTitle: "WUR Calculation Model Exchange",
        headerTitle: "Optare Simulation Tool",
        sourceSelectorLabel: "Choose your calculation",
        sourceYearEndBonus: 'Year-end bonus',
        sourceHolidayPay: 'Holiday pay',
        sourceBoth: 'Holiday pay & Year-end bonus',
        sourceTravel: "Travel Expenses",
        sourceBike: "Bicycle",
        sourceLeave: "Extra Leave",
        sourceUnion: "Union Fee",
        disclaimer: "* Please note: this is an indicative calculation. No rights can be derived from the results.",
        disclaimer1: "And: a lower gross salary may affect the amount of any future benefits from Social Security.",
        yourBudget: "Your Budget",
        availableSource: "Available Source",
        totalUsedAmount: "Total Amount Used",
        travelCostExchange: "Travel Expenses Exchange",
        labelHolidayPay: "Max. Holiday Pay Contribution",
        labelYearEndBonus: "Max. Year-End Bonus Contribution",
        labelTravelDays: "Declared Travel Days",
        labelDistance: "One-Way Distance",
        labelSourceToUse: "Which source do you want to use?",
        optionYearEndBonus: "Year-End Bonus",
        optionHolidayPay: "Holiday Pay",
        optionBoth: "Holiday Pay & Year-End Bonus",
        explanationLink: "Explanation of calculation",
        yourNetBenefit: "Your Net Benefit",
        netBenefitLabel: "You retain more net income annually:",
        applyButton: "Apply directly in Optare",
        calculationDetails: "Calculation Details",
        currentSituation: "Current Situation",
        gross: "Gross",
        tax: "Tax (approx. 50%)",
        netPaid: "Net paid",
        situationAfterExchange: "Situation after exchange",
        taxFreeExchange: "+ Tax-Free Exchange",
        showDetails: "Show details",
        hideDetails: "Hide details", // << BELANGRIJK: DEZE MOET ERIN STAAN
        exampleCalculation: "Calculation example:",
        noUploadNeeded: "For this indicative calculation, you do not need to upload any documents.",
        netCost: "Net Cost",
        taxReliefNone: "Tax Relief (none)",
        taxRelief: "Tax Relief (approx. 50%)",
        grossUnionFee: "Gross Union Fee",
        unionFeeExchange: "Union Fee Exchange",
        labelUnionFeeAmount: "Gross contribution amount per month/year",
        labelUnionFeeFrequency: "Frequency",
        optionMonthly: "Month",
        optionYearly: "Year",

        //Verlofregeling
        leaveSaleTitle: "Selling statutory+ leave hours",
        labelUserType: "Employee type",
        labelMonthlySalary: "Gross monthly salary (based on full-time, January)",
        labelHoursToSell: "Number of hours to sell",
        yourNetPayout: "Your net proceeds",
        netPayoutLabel: "You will receive net (after tax):",
        leaveCalculation: "Leave value calculation",
        valuePerHour: "Value per hour",
        grossProceeds: "Gross proceeds",
        explanationLinkLeave: "Explanation & conditions",
        // Modal
        leaveModalTitle: "Explanation: Selling leave hours",
        leaveModalP1: "You can only use statutory+ leave hours in Optare. The rules differ for WU and WR employees.",
        leaveModalH3_WU: "Rules for WU employees",
        leaveModalLi1_WU: "You can use a maximum of 38 statutory+ leave hours annually for a monetary value (like extra income).",
        leaveModalLi2_WU: "The value of one leave hour is 0.704% of your gross monthly salary (based on a full-time contract and the January salary).",
        leaveModalH3_WR: "Rules for WR employees",
        leaveModalLi1_WR: "You can use a maximum of 36 statutory+ leave hours annually for a monetary value.",
        leaveModalLi2_WR: "The value of one leave hour is 0.717% of your gross monthly salary (based on a full-time contract and the January salary).",
        leaveModalH3_Calc: "Taxation",
        leaveModalP2: "The gross proceeds from the sold hours are considered extra income and are taxed at the special rate (approx. 50%).",

        // Fietsregeling
        bikeRegulationTitle: "Bicycle Scheme",
        labelBikePurchaseAmount: "Bicycle purchase amount (max €2,500)",
        labelBikeGrossSource: "Available gross amount (holiday pay/YEB)",
        grossAmountUsed: "Gross amount used",
        netCostForYou: "Net cost for you",
        bikeExchangeTitle: "Exchange (electric) bicycle/scooter",
        labelBikePurchaseAmountFull: "Purchase amount (incl. accessories/insurance)",
        explanationLinkBike: "Explanation & conditions",
        netBenefitBikeLabel: "You retain more net income due to tax benefit:",
        bikeModalTitle: "Explanation: Exchange (electric) bicycle/scooter",
        bikeModalP1: "With the bicycle scheme, you can purchase a (electric) bicycle or scooter and benefit from a tax advantage by exchanging part of your gross salary (holiday pay or year-end bonus).",
        bikeModalH3: "How does it work?",
        bikeModalLi1: "Choose a bicycle or scooter.",
        bikeModalLi2: "Determine which part of your gross salary you want to contribute.",
        bikeModalLi3: "Enjoy your new bicycle and the tax advantage!",
        bikeModalP2: "The precise conditions and details can be found on the WUR website.",
        bikeModalP3: "You can purchase a bicycle up to an amount of €2,500. The tax advantage depends on your personal situation.",
        
        // Modal teksten (voorbeeld)
        modalTitle1: "Title 1", modalTitle2: "Title 2", modalP1: "Paragraph 1",
        modalLi1: "Item 1", modalLi2: "Item 2", modalLi3: "Item 3",
        modalStrong3: "Example:", modalLi20: "Calculation example 1",
        modalP4: "More info about the calculation.",

        // --- NEW TEXTS TRAVEL EXPENSES ---
        hoverHolidayPay: "You can find the amount in the Optare banner via MyHR > Menu > My requests > Optare > Optare banner. Please note: the amount in the banner is currently €0.00 because the holiday allowance was paid out in May.",
        hoverYearEndBonus: "You can find the amount in the Optare banner via MyHR > Menu > My requests > Optare > Optare banner.",
        hoverTravelDays: "You can find the number of travel days declared so far via MyHR > Menu > My expenses > Expense overview > Commuting KM and work-at-home. Make your own estimate of how many commuting days you expect for the rest of the year.",
        hoverDistance: "The number of kilometres per single journey can be found in the Optare banner via MyHR > Menu > My requests > Optare > Optare banner.",

        travelCostExplanationTitle: "Explanation: Commuting expense exchange",
        travelCostExplanationP1: "If you are a WUR employee who travels to work by bicycle or car, you may already receive a tax-free travel expense of €0.14 per kilometre, with a maximum of 30 kilometres per single journey. With the Optare scheme, you can supplement this expense up to €0.23 per kilometre. This removes the limit of 30 kilometres per single journey. You will receive a tax benefit on your gross holiday allowance or end-of-year bonus if you use this for extra commuting expenses.",
        travelCostCalculationHeading: "The calculation is as follows:",
        travelCostCalculationStep1: "Your number of travel days and your single journey distance determine the amount of the additional commuting expense.",
        travelCostCalculationStep2: "Choose whether you want to use your holiday allowance, end-of-year bonus, or both for the exchange.",
        travelCostCalculationStep3: "The tool calculates the gross amount of the holiday allowance and/or end-of-year bonus that you use for the additional commuting expense.",
        travelCostCalculationStep4: "This exchanged amount is not taxed, which means you receive approximately 50% of this amount as a net benefit.",
        travelCostCalculationStep5: "The net benefit is the amount you have left over compared to if you had the gross expense paid out normally.",
        travelCostExampleText: "Suppose you travel to work 100 days a year, your one-way travel distance is 20 kilometres and you choose the end-of-year bonus (€1,000) as your source, then you enter 100 x 20 x 2 x €0.09 = €360 for the additional commuting expense. You exchange €360 gross, which gives you a net benefit of approximately €180.",
        travelCostExplanationP2: '', // <<<<<< HERE IS THE FIX
        travelCostExplanationP3: "The calculation in this tool provides an indication of the net benefit. The exact amount of the benefit may vary depending on your personal tax situation.",
        // --- END NEW TEXTS ---

        // Explanation Texts Union Fee
        unionFeeExplanationTitle: "Explanation: Union Fee Exchange",
        unionFeeExplanationP1: "If you are a member of a trade union, you can annually apply for a tax benefit on your trade union contribution through Optare. By contributing a gross amount and receiving a net amount back, this provides a tax advantage.",
        unionFeeCalculationHeading: "The calculation is as follows:",
        unionFeeCalculationStep1: "Enter your annual gross contribution amount. If you pay monthly, this will automatically be converted to an annual amount.",
        unionFeeCalculationStep2: "Choose which gross source (holiday pay or year-end bonus) you want to use to exchange the contribution with.",
        unionFeeCalculationStep3: "The amount to be exchanged is directly settled with your chosen gross source, meaning you do not pay tax on that amount. This results in a net benefit of approximately 50% of the exchanged amount.",
        unionFeeExampleText: "For example, if you pay €20 per month in contributions (€240 per year). If you exchange this amount with your year-end bonus, you save approximately 50% tax on that €240, which amounts to a net benefit of approximately €120.",
        unionFeeExplanationP2: "During the application in Optare, attach a bank statement of a monthly or annual payment of the contribution. Indicate in the Optare application which gross source you wish to use for this.",
    }
};

// --- FUNCTIE (ONGEWIJZIGD) ---
export function translatePage(lang) {
    document.documentElement.lang = lang; // Update de lang attribute op de html tag

    // Vertaal de normale teksten
    document.querySelectorAll('[data-translate-key]').forEach(element => {
        const key = element.getAttribute('data-translate-key');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Vertaal de hooverteksten (title attribute)
    document.querySelectorAll('[data-translate-title-key]').forEach(element => {
        const key = element.getAttribute('data-translate-title-key');
        if (translations[lang] && translations[lang][key]) {
            element.title = translations[lang][key];
        }
    });

    // Speciale vertaling voor de EN/NL knop zelf
    const translateBtn = document.getElementById('translate-btn');
    if (translateBtn) {
        translateBtn.textContent = lang === 'nl' ? 'EN' : 'NL';
    }

    // Speciale vertaling voor de dropdown opties
    const sourceSelector = document.getElementById('source-selector');
    if (sourceSelector) {
        sourceSelector.querySelectorAll('option').forEach(option => {
            const key = option.getAttribute('data-translate-key');
            if (translations[lang] && translations[lang][key]) {
                option.textContent = translations[lang][key];
            }
        });
    }

    // Update de text van de toggle buttons
    document.querySelectorAll('.toggle-details-btn').forEach(button => {
        const key = button.getAttribute('data-translate-key');
        if (key && translations[lang] && translations[lang][key]) {
            button.textContent = translations[lang][key];
        }
    });
}