import { Product } from "../types";
import mockData from './stackline_frontend_assessment_data_2021.json';

export async function fetchProductById(productId: string): Promise<Product | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = (mockData as Product[]).find((product: Product) => product.id === productId);
      resolve(res)
    }, 1000)
  })
};