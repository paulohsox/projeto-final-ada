import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';

import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly httpClient = inject(HttpClient);

  private baseUrl = environment.baseUrl;

  private _products = signal<Product[]>([]);
  public products = this._products.asReadonly();

  private _selectedCategory = signal<string | null>(null);
  public selectedCategory = this._selectedCategory.asReadonly();

  public readonly categories = computed(() => {
    const set = new Set(this._products().map((p) => p.category));
    return Array.from(set).sort();
  });

  public readonly filteredProducts = computed(() => {
    const category = this._selectedCategory();
    const productList = this._products();
    return category
      ? productList.filter((p) => p.category === category)
      : productList;
  });

  public getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseUrl}/products`).pipe(
      tap((products) => {
        this._products.set(products);
      })
    );
  }

  public getSingleProduct(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.baseUrl}/products/${id}`);
  }

  public selectCategory(category: string) {
    this._selectedCategory.set(category);
    return this._products().filter((product) => product.category === category);
  }

  public clearCategory() {
    this._selectedCategory.set(null);
  }
}
