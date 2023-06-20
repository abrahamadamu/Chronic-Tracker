/**
 * @description - Changes string to First capital format
 * @param {string} str - string to be changed
 * @returns {string} - string in First capital format
 */
export const toFirstCap = (str: string) =>
  str ? str.replace(/^\S/g, (l) => l.toUpperCase()) : str;

/**Changes string to title case
 * @param {string} string, string to change
 * @return {string}
 */
export const toTitleCase = (str: string) =>
  str ? str.replace(/(^|\s)\S/g, (l) => l.toUpperCase()) : str;
