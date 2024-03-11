import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchProductById } from '../api';
import { Product, ProductState } from '../types'

export const getProductById = createAsyncThunk<Product | undefined, string>(
  'product/fetchById',
  async (productId: string) => {
    try {
      const product = await fetchProductById(productId);
      return product;
    } catch (error: any) {
      throw new Error('Error on fetchProductById');
    }
  }
);

const initialState: ProductState = {
  data: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState ,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload || null;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'An error occurred.';
      });
  }
})

export default productSlice.reducer;