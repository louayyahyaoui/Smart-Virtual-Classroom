const generateUniqueId = require('./index');

test('default behavior', () => {
  const id1 = generateUniqueId();
  const id2 = generateUniqueId();

  expect(id1.length).toBe(20);
  expect(id1).not.toMatch(id2);
});

test('use only letters', () => {
  const id = generateUniqueId({ useNumbers: false, length: 50 });

  expect(id.match(/[0-9]/g)).toBe(null);
  expect(id.length).toBe(50);
});

test('use only numbers', () => {
  const id = generateUniqueId({ useLetters: false, length: 30 });

  expect(id.match(/[a-z]/g)).toBe(null);
  expect(id.length).toBe(30);
});

test('include symbols', () => {
  let id = generateUniqueId({ includeSymbols: ['@', '#'], length: 100 });

  expect(((/(@|#)/g)).test(id)).toBe(true);

  id = generateUniqueId({
    includeSymbols: ['@', '#'], length: 10, useLetters: false, useNumbers: false,
  });

  expect(id.match(/[a-z0-9]/g)).toBe(null);
  expect(id.includes('@')).toBe(true);
  expect(id.includes('#')).toBe(true);
  expect(id.length).toBe(10);
});

test('exclude symbols', () => {
  const id = generateUniqueId({ useLetters: false, excludeSymbols: ['0', '1', '2', '3', '4', '5'] });

  expect(id.match(/[0-5]/g)).toBe(null);
});
