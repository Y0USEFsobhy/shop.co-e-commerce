import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";

const loadCart = () => {
  try {
    const serializedState = localStorage.getItem("cart");

    if (!serializedState) return undefined;

    return {
      cart: JSON.parse(serializedState),
    };
  } catch {
    return undefined;
  }
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: loadCart(),
});

store.subscribe(() => {
  try {
    localStorage.setItem(
      "cart",
      JSON.stringify(store.getState().cart)
    );
  } catch {
    console.log("ops thers is a error");
    
  }
});

export default store;

