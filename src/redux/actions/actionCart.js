import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("authToken");
console.log(token, "ini chaunima");

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (items, thunkAPI) => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/carts",
        {
          items,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);

// Async action creator untuk menghapus item dari keranjang berdasarkan ID produk
export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/carts/${productId}`
      );
      return response.data;
    } catch (error) {
      error;
    }
  }
);

// Async action creator untuk menghapus semua item dari keranjang
export const removeAllCart = createAsyncThunk(
  "cart/removeAllCart",
  async () => {
    const response = await axios.delete("http://localhost:3000/api/carts");
    return response.data;
  }
);
