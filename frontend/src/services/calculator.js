/**
 * add values of an array
 * @param {array} array of numbers
 * @returns number
 */
export function sum(array) {
  let result = 0;
  for (const number of array) {
    result += number;
  }
  return result;
}
/**
 * transform a string of number to an array of number
 * @param {string} string of number
 * @returns array of number
 */
export function stringToNumberArray(string) {
  return string.split(",").map((element) => parseInt(element, 10));
}
