import { createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  getCart,
  removeAllCart,
  removeCartItem,
} from "../actions/actionCart";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    loading: false,
    error: null,
  },
  reducers: {
    decreaseQuantity: (state, action) => {
      state.cartItems = state.cartItems.map((item) =>
        item.product === action.payload
          ? { ...item, qty: Math.max(1, item.qty - 1) }
          : item
      );
    },
    increaseQuantity: (state, action) => {
      state.cartItems = state.cartItems.map((item) =>
        item.product === action.payload ? { ...item, qty: item.qty + 1 } : item
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //
      .addCase(removeAllCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeAllCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(removeAllCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { decreaseQuantity, increaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
