# woorden-api

This is an api for extracting information about a word from the dutch online dictionary woorden.org

An object of the class is initiated with the word of interest. The word needs to be in dutch and it needs to be correctly spelled. The word cannot be longer than 35 characters, which is the length of the longest word in the dutch language; meervoudigepersoonlijkheidsstoornis (Which translates to multiple personality disorder).

## Methods

### getWordInfo()
The method returns an object with information about the word, with the following keys:
- Uitspraak (pronunciacion)
- Verbuigingen (Conjugations)
- Vervoegingen ()
- Voorbeeld (Example)
- Voorbeelden (Examples)
Not all of these are available for every word at woorden.org, so the siza of the returned object will differ between different words, depending on the number of keys found

### getSynonyms()
The method returns the synonyms of the word, if there are any available at woorden.org. If no synonyms can be found, the following message is returned: "woorden.org does not specify any synonyms for the word [word]."

### getAntonyms()
The method returns the antonyms of the word, if there are any available at woorden.org. If no antonyms can be found, the following message is returned: "woorden.org does not specify any antonyms for the word [word]."

### getExpressions()
The method returns commonly used expressions containing the word, if there are any available at woorden.org. If no expressions can be found, the following message is returned: "woorden.org offers no expressions for the word [word]."

### getExpressionLinks()
The method returns an array containing links (urls) to the given expressions, if there are any available at woorden.org. If no expression links can be found, the following message is returned: "woorden.org offers no expression links for the word [word]."