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

  /**
   * When initiating an object of type word, the word is set as a private field and the url is generated.
   *
   * @param {string} word 
   */
    constructor (word) {
      this.word = word
      this.#setUrl()
    }

    /**
     * 
     * @returns {object} Key-Value pairs with info about the word.
     */
    async getWordInfo () {
      const dom = await this.#getDom()
      const rawData = this.#getRawWordData(dom)
      const keysAndValues = this.#getKeysAndValues(rawData)

      const converter = new Converter()
      const wordInfoObject = converter.convertWordInfo(keysAndValues)
      return wordInfoObject 
    }

    /**
     * 
     * @returns {String[] / string} All available expressions for the word. If none, it returns a string with error message.
     */
    async getExpressions () {
      const dom = await this.#getDom()
      const expressions = this.#getRawExpressions(dom)
      const errorMessage = `woorden.org offers no expressions for the word ${this.word}.`

      return this.#hasElements(expressions, errorMessage)

    }

    /**
     * 
     * @returns {String[] / string} All available synonyms for the word. If none, it returns a string with error message.
     */
    async getSynonyms () {
      const dom = await this.#getDom()
      const allLinksTextContent = this.#getLinksTextContent(dom)
      const synonyms =  this.#sortOutSynonyms(allLinksTextContent)
      const errorMessage = `woorden.org does not specify any synonyms for the word ${this.word}.`

      return this.#hasElements(synonyms, errorMessage)
    }

    /**
     * 
     * @returns {String[] / string} All available antonyms for the word. If none, it returns a string with error message.
     */
    async getAntonyms () {
      const dom = await this.#getDom()
      const allLinksTextContent = this.#getLinksTextContent(dom)
      const antonyms =  this.#sortOutAntonyms(allLinksTextContent)
      const errorMessage = `woorden.org does not specify any antonyms for the word ${this.word}.`

      return this.#hasElements(antonyms, errorMessage)

    }

    /**
     * 
     * @returns {String[] / string} All available synonym links for the word. If none, it returns a string with error message.
     */
    async getSynonymLinks () {
      const dom = await this.#getDom()
      const allLinksTextContent = this.#getLinksTextContent(dom)
      const synonyms =  this.#sortOutSynonyms(allLinksTextContent)
      const synonymLinks = synonyms.map(element => 'https://woorden.ord/woord/' + element)
      const errorMessage = `woorden.org does not specify any synonym links for the word ${this.word}.`

      return this.#hasElements(synonymLinks, errorMessage)

    }

    /**
     * 
     * @returns {String[] / string} All available expression links for the word. If none, it returns a string with error message.
     */
    async getExpressionLinks () {
      const dom = await this.#getDom()
      const expressionLinks = this.#getLinksForExpressions(dom)
      const errorMessage = `woorden.org offers no expression links for the word ${this.word}.`

      return this.#hasElements(expressionLinks, errorMessage)

    }


    // Private methods only used within the class.

    async #getDom () {
      const response = await this.#getInfo()
      return this.#getJsonDom(response)
    }

    async #getInfo () {
      try {
        const response = await fetch(this.url)
        if (response.ok) {
          return await response.text()
        } else {
          throw new Error('Something went wrong with the request.')
        }
      } catch (error) {
        console.log(error.message)
      }
      
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
      const headLines = Array.from(dom.window.document.querySelectorAll('div[class^="divider')).map(element => element.textContent)
      for (let i = 0; i < headLines.length; i++) {
        if (headLines[i] === 'Synoniemen') {
          return Array.from(dom.window.document.querySelectorAll('a[href^="https://www.woorden.org/woord/')).map(element => element.textContent)
        } 
      }
      return []
    }

    #sortOutSynonyms (toBeSorted) {
      let i = 0
      let synonyms = []
      try {
        while (!toBeSorted[i].startsWith(this.word + ' ') && !toBeSorted[i].includes('(antoniem)') && i < toBeSorted.length) {
          synonyms.push(toBeSorted[i])
          i++
        }
      } catch (error) {
        return synonyms
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

    #hasElements (toBeChecked, errorMessage) {
      if (toBeChecked.length == 0) {
        return errorMessage
      } else {
        return toBeChecked
      } 
    }

    #setUrl () {
      this.#url = 'https://woorden.org/woord/' + this.word
    }
    
    set word (value) {
      if (typeof value != 'string') {
        throw new Error('Input must be a string')
      }
      if (value.length < 1 || value.length > 35) {
        throw new RangeError('Input must be between 1 and 35 characters long')
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