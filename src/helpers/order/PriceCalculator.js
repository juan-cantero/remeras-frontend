class PriceCalculator {
  /**
   *
   * @param {Array} items
   */
  constructor(items) {
    this.items = items;
  }

  static addDecimals(price) {
    return (Math.round(price * 100) / 100).toFixed(2);
  }

  getItemsPrice() {
    const total = this.items.reduce(
      (acc, item) => acc + Number(item.price) * Number(item.quantity),
      0
    );
    return PriceCalculator.addDecimals(total);
  }

  getShippingPrice() {
    return 0;
  }

  getTotalPrice() {
    const total = this.getItemsPrice() + this.getShippingPrice();
    return PriceCalculator.addDecimals(total);
  }
}

export default PriceCalculator;
