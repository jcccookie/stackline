import { configureStore } from '@reduxjs/toolkit'
import productSlice from './productSlice'
import { ProductState } from '../types';

export const store = configureStore({
  reducer: {
    product: productSlice
  },
})

export interface RootState {
  product: ProductState;
}
export type AppDispatch = typeof store.dispatch