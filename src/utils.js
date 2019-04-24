/**
 * Price format to 1 000 000
 * @param price
 * @returns {string}
 */
export function formatPrice(price) {
  return `${price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')}₽`;
}

/**
 * Generate id
 * @returns {string}
 */
export function GenerateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Declension of nouns
 * @param number
 * @param titles
 * @returns {string}
 */
export const declOfNum = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}



