# Namngivning och Funktioner

## Namngivning
<table border="1" cellpadding="5">
  <tr>
    <th>Namn och förklaring</th>
    <th>Reflektion och regler från Clean Code</th>
  </tr>
  <tr>
    <td> <b>Converter</b><br>klassnamn på understödjande i modulen</td>
    <td><b>Use Intention-Revealing Names</b><br>Converter är något otydligt, vad exakt är det som skall konverteras? Hade kanske varit lämpligare med ett namn i stil med ConvertWordInfo eller ConvertWordInforToObject, även om det senare kanske är för specifikt.</td>
  </tr>
  <tr>
    <td>const <b>separatedValues</b><br>variabelnamn som sparar ner svar från metoden #separateKeysAndValues() i klasssen Converter</td>
    <td><b>Avoid Disinformation</b><br>It might be too generic to use the word Values in a variablename. It does however in this case refer to the values of key-value pairs, but it could have been made clearer. As an example: separatedValuesForWord. This is a bit on the longer side, but adds clarity to what exactly the variable is holdning.</td>
  </tr>
  <tr>
    <td><b>getWordInfo()</b><br>metodnamn for huvudmetoden i word-klassen</td>
    <td><b>Make Meaningful Distinctions</b><br>Eftersom själva klassen metoden ingår i skulle man kunna se Word i getWordInfo som ett noise-ord. Vi vet redan att vi är i en klass som har med ord att göra, så getInfo() hade kanske varit tillräckligt, eftersom man är medveten vad det handlar om. Å andra sidan blir det väldigt tydligt vad metoden gör och följer på så sätt<br><b>Use Intention-Revealing Names</b>-reglen. Allt handlar om balans.</td>
  </tr>
    <tr>
    <td><b>getWordInfo()</b><br><b>getSynonyms()</b><br><b>getAntonyms()</b><br><b>getExpressions()</b><br>All of these are public method in the word class
    <td><b>Pick One Word Per Concept</b><br>Att inte blanda mellan olika synonymer för "hämta", utan håller sig till get för alla metoder som hämtar något till användaren.</td>
  </tr>
    <tr>
    <td><b>#hasELements(toBeChecked, errorMessage)</b><br>Privat metod i word-klassen</td>
    <td><b>Method Names</b><br>Namnet innehåller "has" vilket gör det nästan till en fråga, eller iaf ett påstående. Detta ger en ledtråd om att metoden troligtvis returnerar ett boolskt värde, true om "toBeChecked" har några element. Både namnet på det som ska kontrolleras och den andra parametern följer regeln för <br><b>Use Intention Revealing Names</b><br> då det är lätt att förstå att toBeChecked är det som ska kontrolleras och errorMessage är ett felmeddelande. Det som ställer till det med namngivningen här är att metoden faktiskt inte returnerar true eller false, utan returnerar toBeChecked om denna innehåller element och felmeddelandet om den inskickade arrayen är tom. Hur skulle man bättre kunna förmedla det genom namngivningen? returnsInputIfHasElements() kanske speglar metodens sanna natur bättre, men kan för en oinvigd låta nonsens-artat. returnsInputWithElements kanske är aningens tydligare, men fortfarande inte nöjd. behåller hasElement eftersom den används på så sätt att det utifrån tycks vara precis så att den returnerar true/false. Men inte nöjd!</td>
  </tr>
</table>


## Funktioner
<table border="1" cellpadding="5">
  <tr>
    <th>Metodnamn och länk eller kod</th>
    <th>Antal rader (ej ws)</th>
    <th>Reflektion</th>
  </tr>
  <tr>
    <td><b>#separateKeysAndValues<br>(toBeSeparated)</b><br>Privat metod i Converter klassen, en understödjande klass till huvudklassen Word.</td>
    <td>24</td>
    <td>Metoden tar emot en matris, en array som i sin tur innehåller arrayer av strängar. För att senare kunna skapa en sträng som enkelt kan konverteras till ett object. I det avseendet följer den regeln<br><b>Do One Thing</b>. It does however go against <b>Blocks and Indenting</b><br> då metoden har två nivåer av indentering. Den har en for loop med if / else if statements. Dessa skulle enligt regeln brytas ut till en egen funktion (och där kanske välja switch hellre än if/if else) och sedan kallas denna funktion på en enda rad i for loopen. Detta skulle innebära att denna metod inte längre är den längsta i modulen, utan kommer ner så pass att den följer regeln <b>Small!</b> som sätter en maximumlängd av funktioner till 10-20 rader.</td>
  </tr>
    <tr>
    <td><b>#getKeysAndValues(wordInfo)</b><br>privat metod i huvudklassen Word</td>
    <td>15</td>
    <td>Som för metoden oven, bryter denna metod mot regeln för <b>Blocks and Indenting</b> då den har en if-sats i en while loop. Innehållet i while skulle brytas ut i ytterligare en funktion. Det känns även tveksamt om metoden har ett lämpligt namn, <b>Use Descriptive Names</b>, då den säger get, men strikt talat så genereras den array som innehåller keys and values innan returneras så ett lämpligare namn hade kanske varit createKeysAndValues(). I och med detta kan man även se att metoden bryter mot ytterligare en regel; <b>Do One Thing</b>, eftersom den både skapar och returnerar, men det kan ockå argumenteras att det ingår att returnera det som skapats.</td>
  </tr>
    <tr>
    <td><b>#sortOutSynonyms(toBeSorted)</b><br>privat metod i huvudklassen Word</td>
    <td>11</td>
    <td>Det sker inga anrop till andra funktioner i klassen så <b>One Level Of Abstraction Within Functions</b> håller för denna metod. Den innehåller en while sats utan ytterligare logiska strukturer, vilket skulle kunna sägas ge metoden en nivå av indentering, men while loopen är inkapslad av en try-catch sats, så igen bryts <b>Blocks and Indenting</b> regeln. Men då metoden sorterar fram synonymer, så är namnet i enlighet med <b>Use Descriptive Names</b> Den följer även <b> Have No Side Effects</b> då den enbart påverkar att sortera fram synonymer. Inget händer med den ursprungliga arrayen, den lämnas intakt och en ny array skapas med den sorterade datan. Den är också av typen <b>Common Monadic Form</b> med sitt enda argument.</td>
  </tr>
  <tr>
    <td><b>#buildConvertableString<br>(toBeConverted)</b>privat metod i den understödjande classen Converter.</td>
    <td>10</td>
    <td>Metoden har en for loop, med en enda rad kod och äntligen har vi en metod som lyckas hålla sig till <b>Blocks and Indenting</b>. Den är även liten, håller sig till 10 rader och är så tillräckligt liten enligt <b>Small!</b> Metoden håller sig också till samma abstraktionsnivå och använder sig av ett tydlig, beskrivande namn.</td>
  </tr>
  <tr>
    <td><b>#getInfo()</b></td>
    <td>10</td>
    <td>Också en kortare metod, bra storlek. Den tar inga argument, vilket förenklar och är det optimala antalet argument enligt regeln gällande <b>Function Arguments.</b> Metoden gör ett nätverksanrop, kontrollerar att det kommer ett svar och returnerar sedan detta svar. Dessa steg är tätt sammanlänkade, men det kan tolkas som att metoden bryter mot <b>Do One Thing.</b></td>
  </tr>
</table>
