# npm Package Expert

Pelin React-sovelluspohja.

## Aloitus

```sh
npx degit ArnoSaine/npm-package-expert npm-package-expert
cd npm-package-expert

npm install
npm run fetch-packages-data
```

## Kehitys

```sh
npm run dev
```

## Pelin säännöt

1. Kortit (`data/packages.json` -tiedostossa oleva taulukko) sekoitetaan ja jaetaan 2 pakkaan
2. Pelaajalle näytetään oman pakan ylin kortti
3. Pelaajan tehtävä on veikata kortista tietoa, joka on parempi kuin vastapelaajan (tietokoneen) kortissa
   - Suurempi arvo on parempi näissä kentissä:
     - `dependents`
     - `lastRelease`
     - `weeklyDownloads`
     - `maintenance`
     - `popularity`
     - `quality`
     - `versions`
   - Pienempi arvo on parempi näissä kentissä:
     - `dependencies`
     - `openIssues`
     - `openPullRequests`
4. Kun pelaaja klikkaa valitsemaansa tietoa
   - Jos arvot ovat yhtäsuuret
     - Näytetään ilmoitus
     - Pelaajan on veikattava uudelleen
   - Jos arvot ovat erisuuret
     - Ohjelma näyttää molemmat kortit, kumpi pelaaja voitti kierroksen ja “Jatka”- / “Aloita alusta”-painikkeen
5. Kun pelaaja klikkaa “Jatka”-painiketta, molemmat kortit menevät voittaneen pelaajan pakan pohjalle
6. Jos molemmilla pelaajilla on kortteja jäljellä, pelataan uusi kierros
   - Peli päättyy kun toiselta pelaajalta loppuvat kortit
