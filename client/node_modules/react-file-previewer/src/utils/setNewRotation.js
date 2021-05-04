import * as R from 'ramda';

/**
 * Rotate the file 90 degrees.
 *
 * @param  {Object} files
 * @return {Object}
 */
const setNewRotation = R.converge(R.assoc('rotate'), [
  R.compose(R.modulo(R.__, 360), R.add(90), R.propOr(0, 'rotate')),
  R.identity,
]);

export default setNewRotation;
