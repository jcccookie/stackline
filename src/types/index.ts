interface Review {
  customer: string;
  review: string;
  score: number;
}

export interface Sale {
  weekEnding: string;
  retailSales: number;
  wholesaleSales: number;
  unitsSold: number;
  retailerMargin: number;
}

export interface ProductInfo {
  id: string;
  title: string;
  image: string;
  subtitle: string;
  brand: string;
  reviews: [Review];
  retailer: string;
  details: [string];
  tags: [string];
}

export type Product = ProductInfo & { sales: [Sale] }

export interface ProductState {
  data: Product | null;
  loading: boolean;
  error: string | null;
}