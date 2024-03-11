import { useSelector as selector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from './store';
import { ProductState, Product, Sale } from '../types';

export const useSelector: TypedUseSelectorHook<RootState> = selector;

export const useProductState = (): ProductState => {
  return useSelector(state => state.product);
};

export const useProduct = (): Product | null => {
  return useSelector(state => state.product.data);
};

export const useSales = (): Sale[] | [] => {
  return useSelector(state => state.product.data?.sales) || [];
};