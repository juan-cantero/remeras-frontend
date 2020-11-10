/**
 *
 * @param {Array} cart
 * @return {Number} total items
 */
const calcTotalItems = (cart) => {
  return cart.reduce((acc, item) => acc + Number(item.quantity), 0);
};

export default calcTotalItems;
