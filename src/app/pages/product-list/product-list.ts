import { Component, inject } from '@angular/core';
import { CategoryList } from './category-list/category-list';
import { ProductCard } from './product-card/product-card';
import { ProductsService } from '../../core/services/products.service';


@Component({
  selector: 'app-product-list',
  imports: [ProductCard, CategoryList],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList {
  protected productsService = inject(ProductsService)

  protected readonly categories = this.productsService.categories;

  onSelect(category: string){
    this.productsService.selectCategory(category);
  }

  onClearFilter(){
    this.productsService.clearCategory();
  }
}
