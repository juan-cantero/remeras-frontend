/**
 *
 * @param {Array} cart
 * @return {Number} total price
 */
const calcTotalPrice = (cart) => {
  return cart
    .reduce(
      (acc, item) => acc + Number(item.quantity) * Number(item.unit_price),
      0
    )
    .toFixed(2);
};

export default calcTotalPrice;
