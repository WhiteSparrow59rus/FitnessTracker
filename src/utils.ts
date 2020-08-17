/**
 * Plural forms for russian words
 * @param  {Integer} count quantity for word
 * @param  {Array} words Array of words. Example: ['депутат', 'депутата', 'депутатов'], ['коментарий', 'коментария', 'комментариев']
 * @return {String}        Count + plural form for word
 */
export const pluralize = (count: number, words: string[]): string => {
  var cases = [2, 0, 1, 1, 1, 2];
  return count + ' ' + words[ (count % 100 > 4 && count % 100 < 20) ? 2 : cases[ Math.min(count % 10, 5)] ];
}

/**
 * Возвращает строку с первым заглавным символом.
 * @param string 
 */
export const jsUcfirst = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Добавляет дни к дате.
 * @param date 
 */
export const addDays = (date: Date, days: number): Date => {
  date.setDate(date.getDate() + days);
  return date;
}

/**
 * Рандомное число.
 * @param min 
 * @param max 
 */
export const randomInteger = (min: number, max: number): number => {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}