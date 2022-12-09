# woorden-api 1.0.0

![woorden logo](/img/logo.png)

This is an api for the dutch online dictionary woorden.org

An object of the class is initiated with the word of interest. The word needs to be in dutch and it needs to be correctly spelled. The word cannot be longer than 35 characters, which is the length of the longest word in the dutch language; *meervoudigepersoonlijkheidsstoornis* (Which translates to multiple personality disorder).

The api works with asynchronous network calls and therefore needs to be executed in an asynchronous environment, see under Example.

## Dependencies

### jsdom version 19.0.0
In order to be able to scrape the fetched website for the right information a dom structure has been used. The generation of this dom structure is done using jsdom, an external dependency that needs to be installed in order for the package to work. More info on this package can be found here: https://www.npmjs.com/package/jsdom

## Example
In order for the module to work, jsdom needs to be installed. It can either be added to the package.json file of the project and then included in the general npm install, or you can install is seperately by simply using the command:
 
<h3 style="color:darkorange">npm i jsdom.</h3><br>

In the code itself, the module makes use of asynchronous code and therefore needs to be executed in an asynchronous environment. It can for example be achieved with an async function, as in the following example:

![example](/img/example_start.png)

This code will result in the following print to the console:

![belangrijk object](/img/belangrijk_objekt.jpeg)


## Methods

<h3 style="color:#FFFF99">
getWordInfo()
</h3>

The method returns an object with information about the word, with the following keys:
- Uitspraak (Pronunciacion)
- Afbreekpatroon (Breakdown pattern)
- Verbuigingen (Inflections)
- Vervoegingen (Conjugations)
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
getSynonymLinks()
</h3>
The method returns an array containing links (urls) to the given synonyms for the word, if there are any available at woorden.org. If no synonym links can be found, the following message is returned: "woorden.org offers no synonym links for the word [word]."

<h3 style="color:#FFFF99">
getExpressionLinks()
</h3>
The method returns an array containing links (urls) to the given expressions, if there are any available at woorden.org. If no expression links can be found, the following message is returned: "woorden.org offers no expression links for the word [word]."

## Disclaimer
This package has been tested for a variety of different words, but far from all words in the dutch language have been used. Because of this, there is a risk that the underlying structure of woorden.org will not be 100% consistent for all the words which might affect the performance of the methods provided here.