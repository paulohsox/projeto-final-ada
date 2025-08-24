import { Product } from './product.interface';

export interface Cart {
  id: number;
  userId: number;
  products: Product[];
}

export interface CartItem {
  itemId: number;
  productId: number;
  title: string;
  price: number;
  quantity: number;
  productImage: string;
}
