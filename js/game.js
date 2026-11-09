
// HTML-elementen die we in het spel gebruiken.
const board = document.getElementById("board"); // HTMLElement
const widthInput = document.getElementById("input-width"); // HTMLInputElement
const heightInput = document.getElementById("input-height"); // HTMLInputElement
const winInput = document.getElementById("input-win-condition"); // HTMLInputElement
const scoreXElement = document.getElementById("score-x"); // HTMLElement
const scoreOElement = document.getElementById("score-o"); // HTMLElement
const playKnop = document.getElementById("btn-start"); // HTMLElement
const resetKnop = document.getElementById("btn-rest"); // HTMLElement

// Gegevens die tijdens het spelen veranderen.
let huidigeSpeler = "x"; // string: speler die aan zet is
let spelAfgelopen = false; // boolean: is het potje afgelopen?
let zetten = 0; // number: hoeveel vakjes zijn ingevuld?
let scoreX = Number(localStorage.getItem("scoreX")) || 0; // number
let scoreO = Number(localStorage.getItem("scoreO")) || 0; // number

/*
 * Zet de scores op de pagina.
 * Return: undefined.
 */
function toonScores() {
    scoreXElement.textContent = scoreX;
    scoreOElement.textContent = scoreO;
}

/*
 * Slaat de scores op in de browser.
 * Return: undefined.
 */
function bewaarScores() {
    localStorage.setItem("scoreX", scoreX);
    localStorage.setItem("scoreO", scoreO);
}

/*
 * Maakt een leeg speelbord en begint een nieuw potje.
 * Return: undefined.
 */
function maakBord() {
    const breedte = Number(widthInput.value); // number
    const hoogte = Number(heightInput.value); // number
    let maximaal = breedte; // number: maximale winconditie

    // De langste zijde bepaalt hoeveel symbolen op een rij mogelijk zijn.
    if (hoogte > maximaal) {
        maximaal = hoogte;
    }

    if (maximaal > 6) {
        maximaal = 6;
    }

    winInput.max = maximaal;

    if (Number(winInput.value) > maximaal) {
        winInput.value = maximaal;
    }

    winInput.nextElementSibling.value = winInput.value;

    board.innerHTML = "";
    spelAfgelopen = false;
    zetten = 0;

    // Kies willekeurig de speler die begint.
    if (Math.random() < 0.5) {
        huidigeSpeler = "x";
    } else {
        huidigeSpeler = "o";
    }

    // Maak eerst de rijen en daarna de vakjes in elke rij.
    for (let rij = 0; rij < hoogte; rij++) {
        const row = document.createElement("div"); // HTMLElement
        row.classList.add("row");

        for (let kolom = 0; kolom < breedte; kolom++) {
            const cell = document.createElement("div"); // HTMLElement

            cell.classList.add("cell");
            cell.dataset.rij = rij;
            cell.dataset.kolom = kolom;

            cell.addEventListener("click", plaatsSymbool);

            row.appendChild(cell);
        }

        board.appendChild(row);
    }
}

/*
 * Telt dezelfde symbolen vanaf een vakje in één richting.
 * rij, kolom, stapRij en stapKolom (number): positie en richting.
 * Return: number (aantal aansluitende symbolen).
 */
function telSymbolen(rij, kolom, stapRij, stapKolom) {
    const breedte = Number(widthInput.value); // number
    const hoogte = Number(heightInput.value); // number

    let aantal = 0; // number
    let volgendeRij = rij + stapRij; // number
    let volgendeKolom = kolom + stapKolom; // number

    // Stop bij de rand van het bord of bij een ander symbool.
    while (
        volgendeRij >= 0 &&
        volgendeRij < hoogte &&
        volgendeKolom >= 0 &&
        volgendeKolom < breedte
    ) {
        const vakje = board.children[volgendeRij].children[volgendeKolom];

        if (!vakje.classList.contains(huidigeSpeler)) {
            break;
        }

        aantal++;

        volgendeRij = volgendeRij + stapRij;
        volgendeKolom = volgendeKolom + stapKolom;
    }

    return aantal;
}

/*
 * Controleert de vier winrichtingen na een zet.
 * rij en kolom (number): positie van de laatste zet.
 * Return: boolean (true bij winst, anders false).
 */
function controleerWinst(rij, kolom) {
    const winAantal = Number(winInput.value); // number
    let aantal = 0; // number

    // Horizontaal: rechts en links.
    aantal = 1 + telSymbolen(rij, kolom, 0, 1)
               + telSymbolen(rij, kolom, 0, -1);

    if (aantal >= winAantal) {
        return true;
    }

    // Verticaal: omlaag en omhoog.
    aantal = 1 + telSymbolen(rij, kolom, 1, 0)
               + telSymbolen(rij, kolom, -1, 0);

    if (aantal >= winAantal) {
        return true;
    }

    // Diagonaal: linksboven naar rechtsonder.
    aantal = 1 + telSymbolen(rij, kolom, 1, 1)
               + telSymbolen(rij, kolom, -1, -1);

    if (aantal >= winAantal) {
        return true;
    }

    // Diagonaal: rechtsboven naar linksonder.
    aantal = 1 + telSymbolen(rij, kolom, 1, -1)
               + telSymbolen(rij, kolom, -1, 1);

    if (aantal >= winAantal) {
        return true;
    }

    return false;
}

/*
 * Plaatst een symbool en controleert winst of gelijkspel.
 * event (Event): klik op een vakje.
 * Return: undefined.
 */
function plaatsSymbool(event) {
    const cel = event.currentTarget; // HTMLElement

    // Controleer of de zet is toegestaan.
    if (
        spelAfgelopen ||
        cel.classList.contains("x") ||
        cel.classList.contains("o")
    ) {
        return;
    }

    // Plaats het symbool in het vakje.
    cel.classList.add(huidigeSpeler);
    zetten++;

    const rij = Number(cel.dataset.rij); // number
    const kolom = Number(cel.dataset.kolom); // number

    // Controleer of de speler gewonnen heeft.
    if (controleerWinst(rij, kolom)) {
        spelAfgelopen = true;

        if (huidigeSpeler === "x") {
            scoreX++;
        } else {
            scoreO++;
        }

        bewaarScores();
        toonScores();

        alert("Speler " + huidigeSpeler.toUpperCase() + " heeft gewonnen!");
        return;
    }

    // Controleer of het bord vol is.
    const totaalVakjes = Number(widthInput.value) * Number(heightInput.value);

    if (zetten === totaalVakjes) {
        spelAfgelopen = true;
        alert("Gelijkspel!");
        return;
    }

    // Wissel van speler.
    if (huidigeSpeler === "x") {
        huidigeSpeler = "o";
    } else {
        huidigeSpeler = "x";
    }
}

/*
 * Zet de scores op nul en begint een nieuw potje.
 * Return: undefined.
 */
function resetSpel() {
    scoreX = 0;
    scoreO = 0;

    localStorage.removeItem("scoreX");
    localStorage.removeItem("scoreO");

    toonScores();
    maakBord();
}

// Maak het eerste speelbord.
maakBord();

// Toon de opgeslagen scores.
toonScores();

// Maak een nieuw bord wanneer de instellingen veranderen.
widthInput.addEventListener("input", maakBord);
heightInput.addEventListener("input", maakBord);
winInput.addEventListener("input", maakBord);

// Knop om een nieuw potje te starten.
playKnop.addEventListener("click", maakBord);

// Knop om het hele spel te resetten.
resetKnop.addEventListener("click", resetSpel);
