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

describe('Method: getWordInfo', () => {
  describe('return value', () => {

    test('method should return an object', async () => {
      const info = await word.getWordInfo()
      expect(typeof info).toBe('object')
    })
    test('All keys should be of type string', async () => {
      const info = await word.getWordInfo()
      const values = Object.values(info)
      values.forEach((value) => {
        console.log(value)
        expect(typeof value).toBe('string')
      })
    })
  })
})
