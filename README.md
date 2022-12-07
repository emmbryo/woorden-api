# woorden-api

This is an api for extracting information about a word from the dutch online dictionary woorden.org

An object of the class is initiated with the word of interest. The word needs to be in dutch and it needs to be correctly spelled. The word cannot be longer than 35 characters, which is the length of the longest word in the dutch language; meervoudigepersoonlijkheidsstoornis (Which translates to multiple personality disorder).

## Methods

<h3 style="color:#FFFF99">
getWordInfo()
</h3>

The method returns an object with information about the word, with the following keys:
- Uitspraak (pronunciacion)
- Afbreekpatroon
- Verbuigingen (Conjugations)
- Vervoegingen ()
- Voorbeeld (Example)
- Voorbeelden (Examples)
Not all of these are available for every word at woorden.org, so the siza of the returned object will differ between different words, depending on the number of keys found

<h3 style="color:#FFFF99">
getSynonyms()
</h3>
The method returns the synonyms of the word, if there are any available at woorden.org. If no synonyms can be found, the following message is returned: "woorden.org does not specify any synonyms for the word [word]."

<h3 style="color:#FFFF99">
getAntonyms()
</h3>
The method returns the antonyms of the word, if there are any available at woorden.org. If no antonyms can be found, the following message is returned: "woorden.org does not specify any antonyms for the word [word]."

<h3 style="color:#FFFF99">
getExpressions()
</h3>
The method returns commonly used expressions containing the word, if there are any available at woorden.org. If no expressions can be found, the following message is returned: "woorden.org offers no expressions for the word [word]."

<h3 style="color:#FFFF99">
getExpressionLinks()
</h3>
The method returns an array containing links (urls) to the given expressions, if there are any available at woorden.org. If no expression links can be found, the following message is returned: "woorden.org offers no expression links for the word [word]."

## Disclaimer
This package has been testet for a variety of different words, but far from all words in the dutch language. Because of this, there is a risk that the underlying structure of woorden.org will not be 100% consistent for all the words and might affect the performance of the methods provided here.