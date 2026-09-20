import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  items: [], // [{ id, title, price, quantity,size }]
  totalQuantity: 0,
  totalPrice: 0, //before discount
  discount: 0,
  discountValue: 0,
  discountPercent: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existingItem = state.items.find(
        (i) => i.id === item.id && i.size === item.size,
      );

      const randomId = () => Math.random().toString(36).slice(2) + Date.now();
      const cartItemId = `${item.id}-${item.size}-${randomId()}`;

      const oldPrice =
        Number(item.oldPrice?.toString().replace(/[^\d.]/g, "")) || 0;
      const newPrice =
        Number(item.newPrice?.toString().replace(/[^\d.]/g, "")) || oldPrice;
      const hasDiscount = Boolean(item.discount);

      const effectivePrice = hasDiscount ? newPrice : oldPrice;
      state.totalPrice += item.quantity * effectivePrice;

      if (hasDiscount) {
        const itemDiscountAmount = (oldPrice - newPrice) * item.quantity;
        state.discountValue += itemDiscountAmount;
        state.discountPercent =
          state.totalPrice + state.discountValue > 0
            ? (state.discountValue / (state.totalPrice + state.discountValue)) *
              100
            : 0;
      }

      state.totalQuantity += item.quantity;

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items.unshift({
          ...item,
          quantity: item.quantity,
          cartItemId,
        });
      }

      toast.success("Item added to cart!");
    },
    // _______________________________________________________________
    // _______________________________________________________________

    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((i) => i.cartItemId === id);

      if (!existingItem) return;

      state.totalQuantity -= existingItem.quantity;
      const price = Number(existingItem.oldPrice.replace(/[^\d.]/g, ""));

      const discountPercentForItem = Number(
        existingItem.discount?.replace("%", "") ?? 0,
      );
      state.discountPercent -= discountPercentForItem;
      // state.discountValue -= state.discountValue;
      const discountAmount =
        ((price * discountPercentForItem) / 100) * existingItem.quantity;
      state.discountValue -= discountAmount;
      // }

      state.totalPrice -=
        Number(existingItem.oldPrice.replace(/[^\d.]/g, "")) *
        existingItem.quantity;
      state.items = state.items.filter((i) => i.cartItemId !== id);

      toast.success("Item removed!");
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find((i) => i.cartItemId === action.payload);
      if (item && item.quantity < 10) {
        item.quantity += 1;

        state.totalQuantity += 1;
        state.totalPrice += Number(item.oldPrice.replace(/[^\d.]/g, ""));

        if (item.discount) {
          // state.discountValue = state.discount * item.quantity;
          const price = Number(item.oldPrice.replace(/[^\d.]/g, ""));
          const pct = Number(item.discount.replace("%", "")) / 100;
          state.discountValue += price * pct;
          state.discountPercent += Number(item.discount.replace("%", ""));
        }
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find((i) => i.cartItemId === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalPrice -= Number(item.oldPrice.replace(/[^\d.]/g, ""));

        if (item.discount) {
          // state.discountValue = state.discount * item.quantity;
          const price = Number(item.oldPrice.replace(/[^\d.]/g, ""));
          const pct = Number(item.discount.replace("%", "")) / 100;
          state.discountValue -= price * pct;
          state.discountPercent -= Number(item.discount.replace("%", ""));
        }
      }
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.discount = 0;
      state.discountPercent = 0;
      state.discountValue = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
