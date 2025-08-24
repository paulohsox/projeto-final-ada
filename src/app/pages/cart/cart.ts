import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [MatListModule, MatButtonModule, CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  protected readonly cartService = inject(CartService);

  ngOnInit() {
    this.cartService.getCarts().subscribe();
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }
}
