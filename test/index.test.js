import Word from '../src/js/index.js'

const word = new Word('belangrijk')

describe('Word constructor', () => {
  describe('Invalid input', () => {
    test('Too long word input should throw a RangeError exception.', () => {
      expect(() => { new Word('thisisaverymuchtoolongwordforthismodulesocutitoffplease') }).toThrow(new RangeError('Input must be between 1 and 35 characters long'))
    })
    test('non string values should throw a TypeError exception', () => {
      const types = [42, true, [3, 5, 6], {}, function(){}]
      types.forEach(type => {
        expect(() => { new Word(type) }).toThrow(new TypeError('Input must be a string'))
      })
    })
  })
})

function methodReturnTest(testName, method) {
  describe(testName, () => {
    describe('return value', () => {
  
      test('Method should return an object', async () => {
        const response = await method
        expect(typeof response).toBe('object')
      })

      test('All values should be of type string', async () => {
        let response = await method
        if (!Array.isArray(response)) {
          response = Object.values(response)
        }
        response.forEach((value) => {
          expect(typeof value).toBe('string')
        })
      })
    })
  })
}

methodReturnTest('Method: getWordInfo', word.getWordInfo())
methodReturnTest('Method: getAntonyms', word.getAntonyms())
methodReturnTest('Method: getSynonyms', word.getSynonyms())
methodReturnTest('Method: getSynonymLinks', word.getSynonymLinks())
methodReturnTest('Method: getExpressions', word.getExpressions())
methodReturnTest('Method: getExpressionLinks', word.getExpressionLinks())
