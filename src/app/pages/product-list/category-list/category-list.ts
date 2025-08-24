import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CapitalizePipe } from '../../../core/pipes/capitalize.pipe';
import { ProductsService } from '../../../core/services/products.service';

@Component({
  selector: 'app-category-list',
  imports: [MatButtonModule, CapitalizePipe],
  templateUrl: './category-list.html',
  styleUrl: './category-list.scss'
})
export class CategoryList {
  protected readonly productsService = inject(ProductsService);
  protected readonly categories = this.productsService.categories;

  onSelect(category: string){
    this.productsService.selectCategory(category);
  }

  onClearCategories(){
    this.productsService.clearCategory();
  }
}
