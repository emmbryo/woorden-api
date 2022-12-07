/**
 * Word module.
 *
 * @author Emma Fransson <info@emmbryo.se>
 * @version 1.0.0
 */

import { JSDOM } from "jsdom"
import { Converter } from "./converter.js"

export class Word {
  /**
   * The word to search for.
   *
   * @type {string}
   */
  #word

  /**
   * The url for the choosen word.
   *
   * @type {string}
   */
  #url

    constructor (word) {
      this.word = word
      this.#setUrl()
    }

    async getWordInfo () {
      const dom = await this.#getDom()
      const rawData = this.#getRawWordData(dom)
      const keysAndValues = this.#getKeysAndValues(rawData)

      const converter = new Converter()
      const wordInfoObject = converter.convertWordInfo(keysAndValues)
      return wordInfoObject 
    }

    async getExpressions () {
      const dom = await this.#getDom()
      const expressions = this.#getRawExpressions(dom)

      if (expressions.length == 0) {
        return `woorden.org offers no expressions for the word ${this.word}.`
      } else {
        return expressions
      }  
    }

    async getSynonyms () {
      const dom = await this.#getDom()
      const allLinksTextContent = this.#getLinksTextContent(dom)
      const synonyms =  this.#sortOutSynonyms(allLinksTextContent)
      if (synonyms.length == 0) {
        return `woorden.org does not specify any synonyms for the word ${this.word}.`
      } else {
        return synonyms
      }
    }

    async getAntonyms () {
      const dom = await this.#getDom()
      const allLinksTextContent = this.#getLinksTextContent(dom)
      const antonyms =  this.#sortOutAntonyms(allLinksTextContent)
      if (antonyms.length == 0) {
        return `woorden.org does not specify any antonyms for the word ${this.word}.`
      } else {
        return antonyms
      }
    }

    async getExpressionLinks () {
      const dom = await this.#getDom()
      const expressionLinks = this.#getLinksForExpressions(dom)
      if (expressionLinks.length == 0) {
        return `woorden.org offers no expressions for the word ${this.word}.`
      } else {
        return expressionLinks
      }  
    }

    async #getDom () {
      const response = await this.#getInfo()
      return this.#getJsonDom(response)
    }

    async #getInfo () {
      try {
        const response = await fetch(this.url)
        if (response.status === 200) {
          return await response.text()
        } else {
          throw new Error('Something went wrong with the request.')
        }
      } catch (error) {
        console.log(error.message)
      }
      
    }

    #setUrl () {
      this.#url = 'https://woorden.org/woord/' + this.word
    }

    #getJsonDom (rawData) {
      return new JSDOM(rawData)
    }

    #getRawWordData (dom) {
      return Array.from(dom.window.document.querySelectorAll('tbody td')).map(element => element.textContent)
    }

    #getRawExpressions (dom) {
      return Array.from(dom.window.document.querySelectorAll('a[href^="http://www.onderwoorden.nl/intensiveringen"]')).map(element => element.textContent)
    }

    #getLinksForExpressions (dom) {
      return Array.from(dom.window.document.querySelectorAll('a[href^="http://www.onderwoorden.nl/intensiveringen"]')).map(element => element.href)
    }

    #getLinksTextContent (dom) {
      return Array.from(dom.window.document.querySelectorAll('a[href^="https://www.woorden.org/woord/')).map(element => element.textContent)
    }

    #sortOutSynonyms (toBeSorted) {
      let i = 0
      let synonyms = []
      while (!toBeSorted[i].startsWith(this.word + ' ') && !toBeSorted[i].includes('(antoniem)')) {
        synonyms.push(toBeSorted[i])
        i++
      }
      return synonyms
    }

    #sortOutAntonyms (toBeSorted) {
      let antonyms = []
      for (let i = 0; i < toBeSorted.length; i++) {
        if (toBeSorted[i].includes('antoniem')) {
          antonyms.push(toBeSorted[i].replace('(antoniem)', '').trim())
        }
      }
      return antonyms
    }

    #getKeysAndValues (wordInfo) {
      const keysAndValues = []
      let placeHolder = ""
      let i = 0

      while (i < wordInfo.length) {
        if (wordInfo[i].includes(':')) {
          keysAndValues.push(placeHolder)
          placeHolder = wordInfo[i]
          i++
        }
        placeHolder = placeHolder + " " + wordInfo[i]
        i++
      }
      keysAndValues.push(placeHolder)
      keysAndValues.shift()

      return keysAndValues
    }
    
    set word (value) {
      if (typeof value != 'string') {
        throw new Error('Input must be a string')
      }
      if (value.length < 1 || value.length > 35) {
        throw new RangeError('Input must between 1 and 35 characters long')
      }
      this.#word = value
    }

    get word () {
      return this.#word
    }

    get url () {
      return this.#url
    }

}