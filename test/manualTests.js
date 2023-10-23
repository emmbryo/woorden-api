// test code for all public methods for the Word class.

// @ts-ignore
import { Word } from "../src/js/index.js"

const word = new Word('belangrijk')


async function getWordInfo () {

    const infoString = await word.getWordInfo()
    console.table(infoString)

    const expressions =  await word.getExpressions()
    console.log(expressions)

    //const expressionLinks = await word.getExpressionLinks()
    //console.log(expressionLinks)

    const synonyms = await word.getSynonyms()
    console.log(synonyms)

    const antonyms = await word.getAntonyms()
    console.log(antonyms)

    //const synLinks = await word.getSynonymLinks()
    //console.log(synLinks)

}

getWordInfo()