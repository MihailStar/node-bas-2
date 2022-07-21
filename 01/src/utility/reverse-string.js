/**
 * @param {string} string
 * @returns {string}
 */
function reverseString(string) {
  let result = '';

  for (let index = string.length - 1; index >= 0; index -= 1) {
    result += string[index];
  }

  return result;
}

export { reverseString };
