import { Word } from "../src/js/word.js"

const word = new Word('belangrijk')

async function getWordInfo () {
    //const data = await word.getWordInfo()
    // console.log(data)
    const infoString = await word.getWordInfo()
    console.log(infoString)
    const expressions = await word.getExpressions()
    console.log(expressions);
}

getWordInfo()