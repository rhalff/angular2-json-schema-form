import {isArray, isString} from '../validator'

/**
 * 'toTitleCase' function
 *
 * Intelligently converts an input string to Title Case.
 *
 * Accepts an optional second parameter with a list of additional
 * words and abbreviations to force into a particular case.
 *
 * This function is built on prior work by John Gruber and David Gouch:
 * http://daringfireball.net/2008/08/title_case_update
 * https://github.com/gouch/to-title-case
 */
export function toTitleCase(input: string, forceWords?: string | string[]): string {
  if (!isString(input)) {
    return input
  }
  let forceArray: string[] = ['a', 'an', 'and', 'as', 'at', 'but', 'by', 'en',
    'for', 'if', 'in', 'nor', 'of', 'on', 'or', 'per', 'the', 'to', 'v', 'v.',
    'vs', 'vs.', 'via']
  if (isString(forceWords)) {
    forceWords = (forceWords as string).split('|')
  }
  if (isArray(forceWords)) {
    forceArray = forceArray.concat(forceWords)
  }
  const forceArrayLower: string[] = forceArray.map(w => w.toLowerCase())
  const noInitialCase: boolean =
    input === input.toUpperCase() || input === input.toLowerCase()
  let prevLastChar = ''
  input = input.trim()
  return input.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, (word, idx) => {
    if (!noInitialCase && word.slice(1).search(/[A-Z]|\../) !== -1) {
      return word
    } else {
      let newWord: string
      const forceWord: string =
        forceArray[forceArrayLower.indexOf(word.toLowerCase())]
      if (!forceWord) {
        if (noInitialCase) {
          if (word.slice(1).search(/\../) !== -1) {
            newWord = word.toLowerCase()
          } else {
            newWord = word[0].toUpperCase() + word.slice(1).toLowerCase()
          }
        } else {
          newWord = word[0].toUpperCase() + word.slice(1)
        }
      } else if (
        forceWord === forceWord.toLowerCase() && (
          idx === 0 || idx + word.length === input.length ||
          prevLastChar === ':' || input[idx - 1].search(/[^\s-]/) !== -1 ||
          (input[idx - 1] !== '-' && input[idx + word.length] === '-')
        )
      ) {
        newWord = forceWord[0].toUpperCase() + forceWord.slice(1)
      } else {
        newWord = forceWord
      }
      prevLastChar = word.slice(-1)
      return newWord
    }
  })
}
