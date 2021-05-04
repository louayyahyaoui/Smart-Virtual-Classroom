export const sortBy = (array, prop) => array.slice().sort((a, b) => {
  const nameA = prop(a);
  const nameB = prop(b);
  if (nameA < nameB)
    return -1;
  if (nameA > nameB)
    return 1;
  return 0;
});
