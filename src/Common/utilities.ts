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

/** Prepare Full name from separate names
 * @param {string} firstname
 * @param {string} fathername
 * @param {string} grandfathername
 * @return {string}
 */
export function getFullName(
  firstname?: string,
  fathername?: string,
  grandfathername?: string
) {
  return toTitleCase(
    (
      (firstname ?? "") +
      " " +
      (fathername ?? "") +
      " " +
      (grandfathername ?? "")
    )
      .trim()
      .replace(/  /g, " ")
  );
}
