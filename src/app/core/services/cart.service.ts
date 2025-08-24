import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { SnackbarService } from './snackbar.service';
import { Cart, CartItem } from '../interfaces/cart.interface';
import { environment } from '../../../environments/environment';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);
  private readonly snackBar = inject(SnackbarService);

  private readonly baseUrl = environment.baseUrl;

  private _items = signal<CartItem[]>([]);
  public items = this._items.asReadonly();

  public totalItems = computed(() => this._items().length);
  public totalPrice = computed(() =>
    this._items().reduce((total, item) => total + item.price, 0)
  );

  getCarts(): Observable<Cart> {
    return this.httpClient.get<Cart>(`${this.baseUrl}/carts`);
  }

  addToCart(newProduct: Product) {
    try {
      this._items.update((items) => [
        ...items,
        {
          itemId: this._items().length + 1,
          productId: newProduct.id,
          title: newProduct.title,
          price: newProduct.price,
          quantity: 1,
          productImage: newProduct.image,
        },
      ]);
      this.snackBar.show('Added to cart successfully!', 'success');
    } catch (error) {
      this.snackBar.show(
        'Product could not be added to your cart. Please, try again later.',
        'error'
      );
    }
  }

  removeFromCart(itemId: number) {
    try {
      this._items.update((items) =>
        items.filter((item) => item.itemId !== itemId)
      );
      this.snackBar.show('Item removed from the cart.', 'success');
    } catch (error) {
      this.snackBar.show(
        'Product could not be removed from the cart. Please, try again later.',
        'error'
      );
    }
  }
}
