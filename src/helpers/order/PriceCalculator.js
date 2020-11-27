class PriceCalculator {
  /**
   *
   * @param {Array} items
   */
  constructor(items, shippingPrice, priceForFreeShipping) {
    this.items = items;
    this.shippingPrice = shippingPrice;
    this.priceForFreeShipping = priceForFreeShipping;
  }

  static addDecimals(price) {
    return +(Math.round(price * 100) / 100).toFixed(2);
  }

  getItemsPrice() {
    const total = this.items.reduce(
      (acc, item) => acc + Number(item.unit_price) * Number(item.quantity),
      0
    );
    return +PriceCalculator.addDecimals(total);
  }

  getShippingPrice() {
    if (this.getItemsPrice() >= this.priceForFreeShipping) {
      return 0;
    }
    return this.shippingPrice;
  }

  getTotalPrice() {
    const total = this.getItemsPrice() + this.getShippingPrice();
    return +PriceCalculator.addDecimals(total);
  }
}

export default PriceCalculator;
