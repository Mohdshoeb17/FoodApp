import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage (if available)
const loadCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromLocalStorage(),
  reducers: {
    // Add item to cart
    AddItem: (state, action) => {
      let existItem = state.find((item) => item.id === action.payload.id);
      if (existItem) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        state.push(action.payload);
      }
      // Persist cart to localStorage after adding item
      localStorage.setItem("cart", JSON.stringify(state));
    },

    // Remove item from cart
    RemoveItem: (state, action) => {
      const updatedState = state.filter((item) => item.id !== action.payload);
      // Persist cart to localStorage after removing item
      localStorage.setItem("cart", JSON.stringify(updatedState));
      return updatedState;
    },

    // Increment item quantity
    IncrementQty: (state, action) => {
      const updatedState = state.map((item) =>
        item.id === action.payload
          ? { ...item, qty: item.qty + 1 }
          : item
      );
      // Persist cart to localStorage after incrementing quantity
      localStorage.setItem("cart", JSON.stringify(updatedState));
      return updatedState;
    },

    // Decrement item quantity
    DecrementQty: (state, action) => {
      const updatedState = state.map((item) =>
        item.id === action.payload
          ? { ...item, qty: item.qty - 1 }
          : item
      );
      // Persist cart to localStorage after decrementing quantity
      localStorage.setItem("cart", JSON.stringify(updatedState));
      return updatedState;
    },
  },
});

export const { AddItem, RemoveItem, IncrementQty, DecrementQty } = cartSlice.actions;

export default cartSlice.reducer;
