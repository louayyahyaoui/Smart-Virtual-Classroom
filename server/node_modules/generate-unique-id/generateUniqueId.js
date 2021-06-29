// Only for classic HTML pages!!!
// eslint-disable-next-line no-unused-vars
function generateUniqueId({
  length = 20,
  useLetters = true,
  useNumbers = true,
  includeSymbols = [],
  excludeSymbols = [],
} = {}) {
  let letters = 'abcdefghijklmnopqrstuvwxyz';
  let numbers = '0123456789';
  let availableChars = [];
  let lettersArr = [];
  let numbersArr = [];

  function getRandomNumber(limit) {
    return Math.floor(Math.random() * limit).toString();
  }

  function filterSymbols(symbols, group) {
    let newGroup = group;
    symbols.forEach((symbol) => {
      newGroup = newGroup.replace(symbol, '');
    });

    return newGroup;
  }

  function createId(charsPool, idLength) {
    let id = '';

    for (let i = 0; i < idLength; i += 1) {
      id += charsPool[getRandomNumber(charsPool.length)];
    }

    return id;
  }

  if (useLetters) {
    if (excludeSymbols.length) letters = filterSymbols(excludeSymbols, letters);
    lettersArr = letters.split('');
  }

  if (useNumbers) {
    if (excludeSymbols.length) numbers = filterSymbols(excludeSymbols, numbers);
    numbersArr = numbers.split('');
  }

  availableChars = [...lettersArr, ...numbersArr, ...includeSymbols];

  return createId(availableChars, length);
}
