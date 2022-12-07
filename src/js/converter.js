/**
 * Converter module.
 *
 * @author Emma Fransson <info@emmbryo.se>
 * @version 1.0.0
 */

export class Converter {

  convertWordInfo(toBeConverted) {
    const separatedValues =  this.separateKeysAndValues(toBeConverted)
    const wordInfoObject = this.toObject(separatedValues)
    return wordInfoObject
  }

  separateKeysAndValues(toBeSeparated) {
    let separatedValues = []
    for (let i = 0; i < toBeSeparated.length; i++) {
      if (toBeSeparated[i].includes("Uitspraak:")) {
        const keyUitspraak = toBeSeparated[i].split(/(:)/)
        separatedValues.push(keyUitspraak)
      } else if (toBeSeparated[i].includes("Verbuigingen:")) {
        const keyVerbuigingen = toBeSeparated[i].split(/(:)/)
        separatedValues.push(keyVerbuigingen)
      } else if (toBeSeparated[i].includes("Vervoegingen:")) {
        const keyVervoegingen = toBeSeparated[i].split(/(:)/)
        separatedValues.push(keyVervoegingen)
      } else if (toBeSeparated[i].includes("Voorbeeld:")) {
        const keyVoorbeeld = toBeSeparated[i].split(/(:)/)
        separatedValues.push(keyVoorbeeld)
      } else if (toBeSeparated[i].includes("Voorbeelden:")) {
        const keyVoorbeelden = toBeSeparated[i].split(/(:)/)
        separatedValues.push(keyVoorbeelden)
      } else if (toBeSeparated[i].includes("Afbreekpatroon:")) {
        const keyVoorbeelden = toBeSeparated[i].split(/(:)/)
        separatedValues.push(keyVoorbeelden)
      }
    }
    this.#checkForDuplicatedKeys(separatedValues)
    this.#removeExcessCharacters(separatedValues)
    return separatedValues
  }

  #checkForDuplicatedKeys (separatedValues) {
    const indexOfKey = 0
    const indexOfValue = 2
    for (let i = 0; i < separatedValues.length - 1; i++) {
      if (separatedValues[i][indexOfKey] === separatedValues[i + 1][indexOfKey]) {
        separatedValues[i + 1][indexOfValue] = separatedValues[i + 1][indexOfValue] + separatedValues[i][indexOfValue].trim()
      }
    }
  }

  #removeExcessCharacters (separatedValues) {
    const indexOfValue = 2
    for (let i = 0; i < separatedValues.length; i++) {
      separatedValues[i][indexOfValue] = separatedValues[i][indexOfValue].replaceAll('  ', ' ')
      console.log(separatedValues[i][indexOfValue])
      separatedValues[i][indexOfValue] = separatedValues[i][indexOfValue].replaceAll('`', '')
      console.log(separatedValues[i][indexOfValue])
    }
  }

  toObject (toBeConverted) {

    for (let i = 0; i < toBeConverted.length; i++) {
      this.trimArray(toBeConverted[i])
    }

    let objectAsStrings = []
    objectAsStrings.push("{")
    for (let i = 0; i < toBeConverted.length; i++) {
      objectAsStrings.push("\"" + toBeConverted[i][0] + "\"" + ":" + "\"" + toBeConverted[i][toBeConverted[i].length - 1] + "\"")
    }

    let stringHolderStart = objectAsStrings.shift() + objectAsStrings.shift()
    objectAsStrings.unshift(stringHolderStart)
    let stringHolderEnd = objectAsStrings[objectAsStrings.length - 1] + "}"
    objectAsStrings.push(stringHolderEnd)

    let objectAsString = objectAsStrings.join(",")
    console.log(objectAsString)
    return JSON.parse(objectAsString)
  }

  trimArray (toBeTrimmed) {
    for (let i = 0; i < toBeTrimmed.length; i++) {
      toBeTrimmed[i] = toBeTrimmed[i].trim()
    }
  }
}
