# Einkaufsliste

Die Einkaufsliste zum Abhaken: mit Barcode-Scanner, Spracheingabe und Teilen per WhatsApp. Läuft als installierbare Web-App, auch offline.

## Auf GitHub Pages veröffentlichen

1. Auf github.com ein neues Repository anlegen, z. B. `einkaufsliste` (Public).
2. „Add file“ → „Upload files“ und **alle** Dateien aus diesem Ordner hochladen, inklusive Ordner `icons`. `index.html` muss direkt im Hauptverzeichnis liegen.
3. „Settings“ → „Pages“ → bei „Branch“ `main` und `/ (root)` wählen → „Save“.
4. Nach 1–2 Minuten ist die App erreichbar unter `https://DEIN-NAME.github.io/einkaufsliste/`.

## Installieren

- **Android (Chrome):** Adresse öffnen → Menü ⋮ → „App installieren“ bzw. „Zum Startbildschirm hinzufügen“.
- **iPhone (Safari):** Adresse öffnen → Teilen-Symbol → „Zum Home-Bildschirm“.

Danach einmal öffnen, solange Internet da ist. Ab dann funktioniert die App auch offline.

## Liste austauschen

- **Senden:** Menü (☰ oben rechts) → „Liste senden“ → „Teilen“ → WhatsApp. Das Fenster erklärt auch, wie die andere Person die Liste übernimmt. Es wird eine Datei `Einkaufsliste-JJJJ-MM-TT.txt` verschickt.
- **Empfangen (Android):** In WhatsApp die Datei gedrückt halten → Teilen → „Einkaufsliste“.
- **Empfangen (iPhone):** Datei in WhatsApp öffnen → Teilen → „In Dateien sichern“ → in der App Menü → „Liste empfangen“.
- Beim Einfügen wird nichts überschrieben. Neue Artikel kommen dazu. Bei Artikeln, die schon drauf stehen, wird die Menge erhöht (z. B. 2 → 4). In der Vorschau lässt sich das pro Artikel abwählen.

## Barcode scannen

- Barcode-Knopf neben dem Eingabefeld → Kamera erlauben → Barcode einer leeren Packung in den gelben Rahmen halten.
- Name, Marke und Packungsgröße kommen aus der freien Produktdatenbank Open Food Facts (de.openfoodfacts.org). Den Namen kannst du vor dem Hinzufügen kürzen, z. B. „Haferdrink“ statt „Haferdrink Barista Edition“.
- Unbekannte Produkte trägst du einmal selbst ein. Die App merkt sich jeden gescannten Barcode, auch ohne Internet.
- Unter Android nutzt Chrome die eingebaute Barcode-Erkennung. Auf dem iPhone und anderen Browsern übernimmt das die Datei `vendor/zxing.min.js` (ZXing, Apache-Lizenz, siehe `vendor/zxing-LICENSE.txt`).

## Spracheingabe

- Mikrofon im Eingabefeld antippen und sprechen, z. B. „zwei Kilo Kartoffeln, ein Liter Milch und Brot“.
- „und“, „dann“ und Kommas trennen die Artikel. Zahlwörter wie „zwei“ oder „ein halbes Kilo“ werden zu Mengen.
- Die Spracherkennung läuft über den Browser (Chrome: Google, Safari: Apple) und braucht Internet. Wird sie nicht unterstützt, ist das Mikrofon ausgeblendet.

## Design

Menü (☰ oben rechts) → „Einstellungen“ → „Design“:
- **Farben:** Grün, Blau, Beere, Sonne, Lavendel oder Graphit
- **Hell oder dunkel:** automatisch wie das Handy, immer hell oder immer dunkel
- **Form:** eckig oder rund

Die Auswahl wird auf dem Gerät gespeichert.

## Märkte: Supermarkt, Drogerie, Baumarkt

Oben auf **Markt** tippen. Die Auswahl läuft in zwei Schritten:
1. **Art des Markts** – Supermärkte, Drogerien, Baumärkte und Getränkemärkte stehen direkt da, alle anderen Arten unter „Weitere Arten“.
2. **Name** – nur die Märkte dieser Art. Die gängigen Ketten stehen oben, seltenere unter „Weitere anzeigen“. Eigene Märkte stehen immer ganz oben.

Zuletzt genutzte Märkte erscheinen ganz oben als Schnellwahl. Dieselbe Auswahl öffnet sich in der Ansicht „Nach Läden“ unter „+ Laden hinzufügen“.

Alle Märkte nach Art:
- **Supermärkte:** Standard, Aldi, Lidl, Rewe, Edeka, Kaufland, Penny, Netto, Norma, Globus, Marktkauf, tegut, HIT, famila, Alnatura, denn's Biomarkt – mit 21 Kategorien: Obst & Gemüse, Brot & Backwaren, Milch/Käse/Eier, Kühlregal & Feinkost, Fleisch/Wurst/Fisch, Tiefkühl, Nudeln/Reis/Beilagen, Backen & Mehl, Gewürze/Öl/Essig, Konserven & Saucen, Asia & International, Frühstück/Kaffee/Tee, Süßigkeiten & Kekse, Chips/Nüsse/Knabbereien, Getränke, Bier/Wein/Spirituosen, Drogerie, Haushalt, Non-Food & Saison, Baby & Kind, Tierbedarf
- **Drogerien:** Standard, dm, Rossmann, Müller – mit Kategorien wie Haarpflege, Zahnpflege, Gesicht & Make-up, Babypflege
- **Baumärkte:** Standard, OBI, Hornbach, Bauhaus, toom, Hagebau – mit Kategorien wie Werkzeug, Schrauben & Dübel, Farben, Elektro, Garten
- **Getränkemärkte:** Standard, Getränke Hoffmann, trinkgut, Fristo – Leergut, Wasser, Saft, Softdrinks, Bier, Wein, Spirituosen …
- **Apotheke:** Rezepte, Schmerz & Fieber, Erkältung, Magen, Allergie, Haut, Verband, Vitamine, Messgeräte …
- **Tierbedarf:** Standard, Fressnapf, Das Futterhaus – Hund, Katze, Kleintier, Vogel, Aquarium, Pflege
- **Möbel & Wohnen:** IKEA (mit dem typischen Rundgang), Möbelhaus, JYSK
- **Elektronik:** MediaMarkt, Saturn, Standard
- **Restposten & Kaufhaus:** Action, TEDi, Woolworth
- **Asia & international:** Asia-Markt, Türkischer Supermarkt, Standard
- **Gartencenter:** Dehner, Pflanzen-Kölle, Standard
- **Wochenmarkt & Fachgeschäfte:** Wochenmarkt, Bäcker, Metzger

Die Supermarkt-Erkennung kennt über 1.200 Artikel samt Mehrzahl, Zusammensetzungen („Erdbeermarmelade“, „Kartoffelchips“) und Zusätzen („TK Erbsen“, „Bio Milch“, „rote Paprika“). Jede Art erkennt ihre eigenen Artikel (z. B. „Akkuschrauber“, „Wandfarbe 10 l“, „Dübel 6 mm“). Reihenfolge anpassen und „Eigenen Markt anlegen“ funktionieren genauso; ein eigener Markt übernimmt die Art des gerade gewählten Markts. Am besten für jede Art eine eigene Liste anlegen (z. B. „Drogerie“ mit dm, „Baumarkt“ mit OBI).

## Ansicht einer Liste

Menü → „Einstellungen“ → „Ansicht“ (oder beim Anlegen einer Liste wählen):

- **Mit Kategorien:** ein Markt, Artikel nach dessen Reihenfolge sortiert.
- **Nach Läden:** eine Liste für mehrere Läden. Du musst nichts einstellen: Jeder Artikel landet automatisch beim passenden Laden. „20 Eier und ein Hammer“ ergibt die Abschnitte **Supermarkt** und **Baumarkt**, „Ibuprofen“ kommt zur Apotheke, „HDMI Kabel“ zum Elektronikmarkt. Alles, was es auch im Supermarkt gibt (Shampoo, Bier, Katzenfutter …), bleibt im Supermarkt.
  Optional legst du konkrete Läden fest (oben auf die Läden tippen → „Laden wählen“ bzw. „+ Laden festlegen“), z. B. Rewe statt „Supermarkt“. Dann gilt deren Reihenfolge. Wählst du einen Fachmarkt dazu (z. B. dm oder Fressnapf), bekommt er alles aus seinem Sortiment, also Shampoo → dm. Über ⋯ beim Artikel lässt sich der Laden ändern, die Liste merkt sich das.
- **Einfache Liste:** ohne Kategorien und Markt, alles untereinander.

Die Kategorien werden immer im Hintergrund erkannt; beim Umschalten ist alles sofort richtig sortiert.

## Mehrere Listen

Oben auf den Namen der Liste tippen (oder Menü → „Listen“): Listen wechseln, neue anlegen (z. B. „Drogerie“), umbenennen oder löschen. Jede Liste hat eigene Artikel und merkt sich ihren Markt.

## Preise

Standardmäßig aus. Einschalten unter Menü → „Einstellungen“ → „Preise“. Dann: Preis beim Eintippen dazuschreiben („Milch 1,29 €“) oder über ⋯ beim Artikel eintragen. Der Preis gilt pro Stück/Packung, bei „2 Milch“ wird er verdoppelt. Oben stehen dann die Summe im Wagen und die Gesamtsumme, beim Senden werden die Preise mitgeschickt. Ist die Einstellung aus, wird ein mitgetippter Preis trotzdem nicht Teil des Namens. Er wird still gespeichert und erscheint, sobald du Preise einschaltest.

## Wischen

In der Liste einen Artikel nach rechts wischen = abhaken, nach links wischen = löschen (mit „Rückgängig“).

## Vorlagen & Gerichte

**Vorlagen** sind Stamm-Einkäufe wie „Wocheneinkauf“ oder „Grillabend“: Menü → „Vorlagen & Gerichte“ → „Neue Vorlage“, ein Artikel pro Zeile (Mengen wie „2 l Milch“ gehen mit). Schneller: „Aktuelle Liste als Vorlage speichern“. Zum Benutzen die Vorlage antippen (oder im Suchfeld den Namen anfangen zu tippen), abwählen, was du gerade nicht brauchst, und alles mit einem Tipp auf die Liste setzen.

**Gerichte:** Reiter „Gerichte“ → „Neues Gericht“: Name, Portionen und Zutaten (eine pro Zeile, Zutatenlisten von Rezeptseiten lassen sich direkt einfügen). Ein Gericht lässt sich auch direkt über das Suchfeld finden: Namen anfangen zu tippen (z. B. „Bolo“) und den Vorschlag antippen. Beim Antippen eines Gerichts die Portionen wählen, die Ziel-Liste wählen, abwählen, was zu Hause ist, und alles mit einem Tipp auf die Liste setzen. Doppelte Artikel werden zusammengezählt.

## Sicherung

Menü → „Einstellungen“ → „Sicherung“ → „Sicherung speichern“ erzeugt eine Datei mit allen Daten (Listen, Märkte, Reihenfolgen, Gerichte, Oft gekauft, Barcodes, Design). Diese Datei am besten in Google Drive/iCloud ablegen. Zum Wiederherstellen dort „Sicherungsdatei auswählen“; das ersetzt alle Daten auf dem Handy.

## Kopfzeile

Beim Runterscrollen verschwindet die Kopfzeile, damit mehr Platz für die Liste ist. Ein Stück hochscrollen holt sie zurück.

## Suchfeld

Beim Tippen zeigt das Suchfeld passende Artikel, die du schon mal eingetragen oder gescannt hast. Antippen setzt den Artikel auf die Liste, auch mit Menge („2 Mi“ → „2 Milch“). Daneben: **+** zum Hinzufügen und der Barcode-Knopf.

## Eingabe ohne Komma

Mehrere Artikel gehen auch ohne Komma: „Milch 1 Liter Wasser 15 Eier“ ergibt Milch, 1 l Wasser und 15 Eier. Eine Zahl beginnt einen neuen Artikel, wenn danach noch ein Name folgt. Steht sie am Ende („Eier 10“), ist sie die Menge des Artikels davor. „Milch Brot Butter“ wird ebenfalls getrennt, weil alle drei bekannte Produkte sind.

## Oft gekauft

Über der Liste stehen Vorschläge, die du oft einträgst. Unter Menü → „Einstellungen“ → „Oft gekauft“ kannst du sie ein- und ausblenden, die Anzahl wählen (6, 12 oder 20), einzelne entfernen oder alle zurücksetzen.

## Doppelte Artikel

Gibst du einen Artikel ein, der schon auf der Liste steht, wird die Menge erhöht: Milch + Milch = 2, 2 Milch + 3 Milch = 5, 500 g Hack + 250 g Hack = 750 g, 500 g Hack + Hack = 2 × 500 g.

## Aufbau: Menü und Einstellungen

Die Startseite zeigt nur die Liste. Tipps zur Eingabe stehen nur da, solange die Liste leer ist.
- **Menü (☰):** Listen, Gemeinsame Liste, Vorlagen & Gerichte, Liste senden/empfangen, Erledigte entfernen, Liste leeren, Einstellungen.
- **Einstellungen:** Ansicht, Reihenfolge im Markt, Oft gekauft · Display anlassen, Einkaufsmodus, Preise, Design & Schrift (inkl. Symbole), Updates · Sicherung, Alle Daten löschen · Tipps zur Bedienung, App unterstützen, Datenschutz, Impressum.

## Sprache: Deutsch / English

Die App startet in der Sprache des Handys: Deutsch bei deutschem Handy, sonst Englisch. Umschalten unter Einstellungen → „Sprache · Language“ (die App startet dann kurz neu, alle Listen bleiben).

Auf Englisch ist alles übersetzt: Oberfläche, Tipps-Tour, Datenschutz & Impressum (Legal notice), Kategorien und Markt-Arten. Außerdem:
- **Englischer Artikel-Wortschatz** (Testprobe: 337 von 337 Artikeln richtig einsortiert, dazu 54 von 54 ungesehene), z. B. „orange juice“ → Drinks, „cat food“ → Pets, „Q-tips“ → Toiletries.
- **Englische Mengen:** „2 bottles of milk“, „a dozen eggs“, „half a kilo of mince“, „3 tins of chopped tomatoes“, „1 lb ground beef“, „toilet paper 9 rolls“, Dezimalpunkt („1.5 l“).
- **Preise** in £ (Großbritannien) bzw. $ (USA), z. B. „Milk £1.29“.
- **Ketten:** UK (Tesco, Sainsbury’s, Asda, Aldi, Lidl, Morrisons, Waitrose, Co-op, Boots, B&Q …) bzw. USA (Walmart, Kroger, Target, Costco, Trader Joe’s, CVS, Home Depot …) – je nach Handy-Einstellung en-GB/en-US. Deutsche Ketten werden dort ausgeblendet und umgekehrt.
- **Spracheingabe** auf Englisch, installierter App-Name „Shopping List“ (`manifest-en.webmanifest`).

Technisch: Die englischen Texte stehen in `lang/en.js` (Wörterbuch Deutsch → Englisch, Wortschatz, Mengen, Ketten). Neue deutsche Texte in `index.html` brauchen dort eine Übersetzung, sonst erscheinen sie auf Englisch weiter deutsch.

## Symbole

Auf Wunsch steht vor jedem Artikel ein kleines Bild (🥛 Milch, 🍞 Brot, 🔨 Hammer …), bei unbekannten Artikeln das Symbol der Kategorie. Standardmäßig aus; einschalten unter Einstellungen → „Design & Schrift“ → „Symbole vor den Artikeln“. Die Kurzanleitung zeigt ihre Beispiele immer ohne Symbole.

## Impressum & Datenschutz (vor dem Veröffentlichen ausfüllen!)

In `index.html` nach `const LEGAL` suchen und deine Angaben eintragen:

```js
const LEGAL = {
  name:   "Max Mustermann",
  street: "Musterstraße 1",
  city:   "12345 Musterstadt",
  email:  "kontakt@example.de",
  phone:  "",            // optional
  updated: "Oktober 2026"
};
```

Solange etwas fehlt, steht in der App gelb markiert „[… bitte eintragen]“. Beide Seiten findest du unter Einstellungen → „Über die App“. Die Datenschutzerklärung beschreibt, was die App tatsächlich tut (GitHub Pages, Open Food Facts beim Scannen, Spracherkennung des Browsers, ntfy.sh bei gemeinsamen Listen). Sie ist ein Entwurf, keine Rechtsberatung – am besten einmal prüfen lassen, spätestens vor dem App Store.

Die Schriften liegen jetzt in der App selbst (`vendor/fonts`), es gibt keine Verbindung mehr zu Google Fonts.

## Gemeinsame Liste

Menü → „Gemeinsame Liste“ → „… gemeinsam nutzen“. Danach erscheinen ein QR-Code und ein Einladungslink („Einladung senden“ öffnet z. B. WhatsApp). Wer den Link öffnet oder den QR-Code in der App scannt (Menü → „Gemeinsame Liste“ → „QR-Code scannen“), bekommt die Liste dazu. Ab dann sehen alle dieselbe Liste: Eintragen, Abhaken und Löschen erscheint sofort bei den anderen. Oben neben dem Listennamen zeigt ein kleines Personen-Symbol, dass die Liste geteilt ist (grau = gerade offline).

- **Namen & Mitglieder:** Beim Starten und Beitreten gibt jeder seinen Namen ein (Pflicht). Unter der Kopfzeile steht bei geteilten Listen eine Leiste „Geteilt mit Anna, Tom“ (grüner Punkt = verbunden, grau = offline); antippen öffnet die Übersicht mit allen Mitgliedern („Dabei“) und wann sie zuletzt aktiv waren. Artikel, die andere eingetragen haben, zeigen klein den Namen darunter. Den eigenen Namen kann man dort ändern. Wer „Auf diesem Gerät nicht mehr teilen“ wählt, verschwindet bei den anderen aus der Liste.
- **Kein eigener Server nötig:** Die Änderungen laufen über den kostenlosen, öffentlichen Dienst [ntfy.sh](https://ntfy.sh) (quelloffen, ohne Konto).
- **Verschlüsselt:** Jede Änderung wird auf dem Handy mit AES-256 verschlüsselt. Der Schlüssel steht nur im Einladungslink (hinter dem `#`, wird nie an einen Server geschickt). ntfy.sh sieht nur Zeichensalat.
- **Offline:** Änderungen ohne Netz werden gespeichert und nachgeholt. Bei mehreren Änderungen am selben Artikel gilt die neueste.
- **Grenzen:** ntfy.sh hebt Nachrichten nur einige Stunden auf. Wer länger nicht in der App war, fragt beim Öffnen die anderen nach dem aktuellen Stand – den bekommt er, sobald jemand anderes die App offen hat. Geteilt werden die Artikel, nicht Ansicht oder Markt – die stellt jedes Gerät selbst ein.
- **iPhone:** Ein Link öffnet sich in Safari, nicht in der installierten App. In der installierten App daher den QR-Code über „QR-Code scannen“ einlesen oder den Link ins Feld „Einladung bekommen?“ einfügen.
- **Eigener Server (optional):** Unter „So funktioniert es“ lässt sich eine andere ntfy-Adresse eintragen, z. B. ein selbst betriebener ntfy-Server. Die Adresse steckt dann mit im Einladungslink.
- **Beenden:** „Auf diesem Gerät nicht mehr teilen“ – die Liste bleibt auf dem Gerät, die anderen behalten ihre.
- **Für App Store/Datenschutzerklärung:** ntfy.sh als Dienstleister nennen (verarbeitet IP-Adressen und verschlüsselte Nachrichten, Speicherdauer wenige Stunden).

## Schriftgröße

Einstellungen → „Design & Schrift“ → Schriftgröße: Normal, Groß oder Sehr groß. Gilt für die ganze App.

## Einkaufsmodus (optional)

Einstellungen → „Einkaufsmodus“ einschalten. Dann erscheint oben neben dem Menü ein Einkaufswagen-Knopf. Antippen schaltet um: größere Schrift, Suchfeld, Vorschläge und abgehakte Artikel ausgeblendet, das Display bleibt an. Mit „Beenden“ oder dem Knopf geht es zurück. Ist der Modus beim Schließen an, startet die App wieder darin.

## Alle Daten löschen

Einstellungen → „Alle Daten löschen“ entfernt alle Listen, Artikel, Gerichte, eigene Märkte, gelernte Reihenfolgen, „Oft gekauft“, Barcodes und Einstellungen von diesem Gerät. Vorher lässt sich direkt eine Sicherung speichern. Zum Bestätigen zweimal tippen. Danach startet die App wie neu.

## Laufweg lernen & einzelne Artikel

Grundlage der Sortierung sind die **Bereiche** (Kategorien) in der Reihenfolge deines Markts. Zusätzlich kann jeder **einzelne Artikel** je Markt einen eigenen Platz bekommen – z. B. wenn Eier gleich hinter dem Obst stehen, die Milch aber ganz hinten.

- **Nach dem Einkauf** vergleicht die App, wie du abgehakt hast, mit dem gespeicherten Weg. Passt etwas nicht, fragt sie: „Ganze Reihenfolge übernehmen“ (Bereiche neu ordnen), **„Einzelne Artikel anpassen“** oder „Nein, danke“ (gilt nur für diesen Einkauf).
- **Einzelne Artikel anpassen:** zeigt deinen heutigen Weg; Artikel, die nicht zu ihrem Bereich passten, sind schon markiert („heute woanders“). „Plätze speichern“ – die Bereiche bleiben unverändert, nur diese Artikel bekommen ihren eigenen Platz.
- **Von Hand:** beim Artikel über ⋯ → „Eigenen Platz im Markt geben“ – das Reihenfolge-Fenster öffnet sich mit dem Artikel (gelb), einfach an die richtige Stelle schieben und speichern. Im Reihenfolge-Fenster stehen alle Artikel mit eigenem Platz gelb zwischen den Bereichen; ✕ schickt einen Artikel zurück in seinen Bereich.
- **In der Liste** erscheint ein Bereich dann ggf. zweimal (z. B. „Milch, Käse & Eier: Eier“ vorne und „Milch, Käse & Eier: Milch“ hinten) – genau so, wie du läufst.
- **Im Einkaufsmodus** gibt es keine Überschriften: alle offenen Artikel stehen in einer Liste, genau in Laufweg-Reihenfolge.

## Liste umstellen

Jede bestehende Liste lässt sich umstellen: Listen → ⋯ bei der Liste → „Ansicht“ (Kategorien · Nach Läden · Einfach) – oder für die aktuelle Liste Einstellungen → „Ansicht“. Die Artikel bleiben erhalten und werden neu sortiert; bei „Nach Läden“ werden sie automatisch auf Supermarkt, Baumarkt usw. verteilt.

## Tipps beim ersten Start

Beim ersten Start fragt die App, ob sie kurz zeigen soll, wie alles funktioniert. Die Tour zeigt in 10 Schritten die Grundlagen der Liste, den Laufweg und das Teilen einer Liste und führt Eintragen und Abhaken mit Beispiel-Artikeln vor. Die Beispiel-Artikel verschwinden am Ende wieder. Erneut starten: Einstellungen → „Tipps zur Bedienung“.

Beim ersten Öffnen von „Reihenfolge im Markt“ bietet die App eine eigene kurze Einführung an (6 Schritte: Bereiche, Verschieben, Pfeile, Speichern, eigene Filiale, Lernen beim Abhaken). Später jederzeit über „Kurz erklären“ im selben Fenster.

## App unterstützen

Ganz unten in den Einstellungen. Die Links trägst du in `index.html` bei `SUPPORT_LINKS` ein, z. B.:

```js
const SUPPORT_LINKS = [
  {name:"PayPal", url:"https://paypal.me/deinname"},
  {name:"Ko-fi", url:"https://ko-fi.com/deinname"},
  {name:"Patreon", url:""}          // leer = wird nicht angezeigt
];
```

Solange kein Link eingetragen ist, steht dort „Die Möglichkeit zur Unterstützung folgt bald“. Hinweis für App Store/Google Play: Dort sind externe Spenden-Links in Apps meist nicht erlaubt, Trinkgeld muss über In-App-Käufe laufen. Für die Store-Version die Links also leer lassen und Trinkgeld als In-App-Kauf einbauen.

## Schnellzugriff vom App-Symbol (Android)

App-Symbol auf dem Home-Bildschirm lange drücken:
- **Schnell eintragen:** öffnet die Liste mit dem Cursor im Suchfeld.
- **Einkaufsmodus:** öffnet die Liste direkt im Einkaufsmodus.

Die beiden Einträge lassen sich meist auch als eigenes Symbol auf den Home-Bildschirm ziehen. Echte Widgets (Liste direkt auf dem Home-Bildschirm) sind für Web-Apps auf Android und iPhone nicht möglich, erst mit einer App aus dem Store. iPhone kennt diese Schnellzugriffe für Web-Apps leider nicht.

## Updates

Nach Änderungen an `index.html` in `sw.js` die Zeile `const VERSION = "einkaufsliste-v33";` hochzählen (v34, v35 …). Dann holen sich installierte Apps die neue Version.

Unter Menü → „Einstellungen“ → „Updates“ stellst du ein, wie das passiert:
- **Automatisch:** Die neue Version wird geladen und beim nächsten Öffnen aktiv.
- **Auf Nachfrage:** Oben erscheint „Eine neue Version ist da“, und erst nach „Aktualisieren“ wird gewechselt. Mit ✕ blendest du den Hinweis bis zum nächsten Start aus, ohne zu aktualisieren. Aktualisieren geht dann jederzeit unter Einstellungen → Updates.

Dort gibt es auch „Jetzt nach Updates suchen“ und die installierte Versionsnummer.

## Hinweis

Die Liste wird nur auf dem jeweiligen Gerät gespeichert (außer bei gemeinsamen Listen, siehe oben). Wenn du im Browser die Website-Daten löschst, ist sie weg.
