# Boter-Kaas-en-Eieren PlusPlus

Een uitbreidbare versie van Boter-Kaas-en-Eieren, gebouwd met **HTML, CSS en JavaScript** als programmeeropdracht.

## Functies

- Speel met twee spelers (X en O) op hetzelfde apparaat.
- Stel de breedte en hoogte van het speelbord in (3 t/m 10 vakjes).
- Kies hoeveel symbolen op een rij nodig zijn om te winnen (3 t/m 6, afhankelijk van de bordinstellingen).
- Controleert horizontale, verticale en diagonale winlijnen.
- Houdt gewonnen rondes bij; scores worden bewaard in `localStorage`.
- Start een nieuw potje of reset het hele spel.
- Kiest willekeurig welke speler begint.

## Zelf spelen

Start het project via een lokale webserver. Open een terminal in de projectmap en voer uit:

```bash
python3 -m http.server 8000
```

Ga vervolgens naar `http://localhost:8000`.

## Gebruikte technieken

**HTML5**, **CSS3**, **JavaScript** (DOM-manipulatie, event listeners, functies, lussen, condities en `localStorage`).

## Wat ik heb geleerd

Tijdens dit project heb ik geoefend met het dynamisch opbouwen van een speelbord, het controleren van wincondities in verschillende richtingen, het verwerken van gebruikersinvoer en het opslaan van scores in de browser.

## Projectstructuur

```text
.
├── index.html
├── css/
│   └── game.css
├── js/
│   └── game.js
└── images/
    ├── playerO.svg
    └── playerX.svg
```

Dit is een portfolio-versie van een schoolproject. Het persoonlijke evaluatieverslag is bewust niet opgenomen.
