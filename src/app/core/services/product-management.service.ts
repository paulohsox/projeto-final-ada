import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductManagementService {
  private httpClient = inject(HttpClient);

  private baseUrl = environment.baseUrl;

  createProduct(newProduct: Partial<Product>): Observable<Product> {
    return this.httpClient.post<Product>(
      `${this.baseUrl}/products`,
      newProduct
    );
  }

  updateProduct(
    productId: number,
    productInfo: Partial<Product>
  ): Observable<Product> {
    return this.httpClient.patch<Product>(
      `${this.baseUrl}/products/${productId}`,
      productInfo
    );
  }

  deleteProduct(productId: number): Observable<Product> {
    return this.httpClient.delete<Product>(
      `${this.baseUrl}/products/${productId}`
    );
  }
}
