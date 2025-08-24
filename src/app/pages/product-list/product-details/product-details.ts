import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/interfaces/product.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../core/services/cart.service';
import { ProductsService } from '../../../core/services/products.service';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink, MatButtonModule, MatCardModule, CurrencyPipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);

  protected id = input.required<string>();

  protected product = computed(() =>
    this.productsService
      .products()
      .find((p) => String(p.id) === this.id())
  );

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
