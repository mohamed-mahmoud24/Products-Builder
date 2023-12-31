/**
 * Slices a given text to a specified maximum length and appends '...' if the text exceeds the limit.
 *
 * @param {string} txt - The input text to be sliced.
 * @param {number} [max=50] - The maximum length of the sliced text. Defaults to 50.
 * @returns {string} - The sliced text. If the input text is shorter than or equal to the maximum length, the original text is returned unmodified.
 */
export function txtSlicer(txt: string, max: number = 50): string {
    if (txt.length >= max) return `${txt.slice(0, max)}...`;
    return txt;
}

/**
 * Formats a string representation of a number by adding commas every three digits.
 *
 * @param {string} number - The string representation of the number to be formatted.
 * @returns {string} The formatted string with commas.
 */

export function formatNumberWithCommas(number: string): string {
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
