import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/interfaces/product.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, RouterLink, MatCardModule, MatButtonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  product = input.required<Product>();
}


// <div class="product-card">
//   <!-- <h2>{{ product().id}}</h2> -->
//   <h2>{{ product().title}}</h2>
//   <p>{{ product().category}}</p>
//   <!-- <p>{{ product().description}}</p> -->
//   <div class="card-image"><img [src]="product().image" /></div>
//   <p>{{ product().rating.rate}}</p>
//   <p>{{ product().price | currency }}</p>
//   <div class="actions">
//     <!-- <button class="add-cart-button">Add to cart</button> -->
//     <a class="product-details" [routerLink]="['/products/', product().id]"
//       >Product details</a
//     >
//   </div>
// </div>