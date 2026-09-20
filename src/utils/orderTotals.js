export function getDeliveryFee(cart) {
  if (!cart.items.length) return 0;
  return 15 * cart.totalQuantity;
}

export function getOrderTotal(cart) {
  return cart.totalPrice + getDeliveryFee(cart) - cart.discountValue;
}
