/**
 *
 * @param {Object} obj
 * @return {Boolean}
 */
const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};

export default isEmptyObject;
