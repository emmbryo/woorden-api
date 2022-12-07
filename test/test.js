import { Word } from "../src/js/word.js"

// const word = new Word('meervoudigepersoonlijkheidsstoornis')
const word = new Word('springen')

async function getWordInfo () {

    const infoString = await word.getWordInfo()
    console.log(infoString)
    const expressions = await word.getExpressions()
    console.log(expressions);

    const expressionLinks = await word.getExpressionLinks()
    console.log(expressionLinks);

    const synonyms = await word.getSynonyms()
    console.log(synonyms)

    const antonyms = await word.getAntonyms()
    console.log(antonyms)

}

getWordInfo()