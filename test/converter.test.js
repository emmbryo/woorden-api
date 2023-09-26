import Converter from '../src/js/converter.js'

const sample = [
  'Uitspraak:   [bəˈlɑŋrɛik]',
  'Afbreekpatroon:   be·lang·rijk',
  'Verbuigingen:   belangrijkst',
  'Voorbeelden:   `een belangrijke dag`,`een belangrijke persoon`,`de dingen belangrijker maken dan ze zijn` ',
  'Antoniem:   onbelangrijk'
]

const converter = new Converter()

describe('Converter methods', () => {
  describe('Method: convertWordInfo', () => {
    test('method should return object', () => {
      const response = converter.convertWordInfo(sample)
      expect(typeof response).toBe('object')
    })

    test('Keys of returned object should be of type string', () => {
      const response = Object.values(converter.convertWordInfo(sample))

      response.forEach(item => {
        expect(typeof item).toBe('string')
      })
    })
  })
})