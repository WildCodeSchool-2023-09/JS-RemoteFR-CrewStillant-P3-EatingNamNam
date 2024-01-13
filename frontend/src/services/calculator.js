/**
 * add values of an array
 * @param {array} array of numbers
 * @returns number
 */
export default function sum(array) {
  let result = 0;
  for (const number of array) {
    result += number;
  }
  return result;
}
