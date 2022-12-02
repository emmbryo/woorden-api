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
      const response = await this.#getInfo()
      const dom = this.#getDom(response)
      const rawData = this.#getRawWordData(dom)
      const keysAndValues = this.#getKeysAndValues(rawData)

      const converter = new Converter()
      const wordInfoObject = converter.convert(keysAndValues)
      return wordInfoObject 
    }

    #setUrl () {
      this.#url = 'https://woorden.org/woord/' + this.word
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

    #getDom (rawData) {
      // const rawData = await this.#getInfo()
      return new JSDOM(rawData)
    }

    #getRawWordData (dom) {
      // const dom = await this.#getDom()
      return Array.from(dom.window.document.querySelectorAll('tbody td')).map(element => element.textContent)
    }

    #getKeysAndValues (wordInfo) {
      // const wordInfo = await this.#getRawWordData()
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