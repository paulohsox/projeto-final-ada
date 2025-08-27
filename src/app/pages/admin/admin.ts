import {
  Component,
  inject,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../core/interfaces/product.interface';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ProductManagementService } from '../../core/services/product-management.service';
import { ProductsService } from '../../core/services/products.service';
import { SnackbarService } from '../../core/services/snackbar.service';

@Component({
  selector: 'app-admin',
  imports: [    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin {
protected fb = inject(FormBuilder);
  private readonly productManagementService = inject(ProductManagementService);
  private readonly productsService = inject(ProductsService);
  private readonly snackBar = inject(SnackbarService);
  private readonly dialog = inject(MatDialog);

  protected products = signal<Product[]>([]);
  protected productToBeEdited = signal<number | null>(null);

  protected isEditMode = signal<boolean>(false);
  protected productForm: FormGroup;

  protected displayedColumns: string[] = ['title', 'price', 'actions'];
  protected dataSource = this.productsService.products;

  @ViewChild('confirmDeletion') confirmDeletion!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  constructor() {
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.productsService.getAllProducts().subscribe({
      next: (dados) => this.products.set(dados),
    });
  }

  get title() {
    return this.productForm.controls['title'].value;
  }
  get price() {
    return this.productForm.controls['price'].value;
  }
  get description() {
    return this.productForm.controls['description'].value;
  }

  onSubmit() {
    if (this.productForm.invalid) return;

    const product = {
      title: this.title,
      price: this.price,
      description: this.description,
    };

    if (this.isEditMode()) this.onEditProduct(product);

    if (!this.isEditMode()) this.onAddProduct(product);
  }

  onAddProduct(product: Partial<Product>) {
    this.productManagementService.createProduct(product).subscribe({
      next: (data) => {
        this.products.update((products) => [...products, data]);
        this.productForm.reset();
        this.snackBar.show('Product added successfully!', 'success');
      },
      error: (error) => {
        this.snackBar.show(
          'Product could not be added. Please, try again later.',
          'error'
        );
        console.error(error.message);
      },
    });
  }

  onEditProduct(product: Partial<Product>) {
    this.productManagementService
      .updateProduct(this.productToBeEdited()!, product)
      .subscribe({
        next: (data) => {
          this.snackBar.show('Product updated successfully!', 'success');
          this.productForm.reset();
          this.isEditMode.set(false);
        },
        error: (error) => {
          this.snackBar.show(
            'Product could not be updated. Please, try again later.',
            'error'
          );
          console.error(error.message);
        },
      });
  }

  onEnterEditMode(product: Product) {
    this.isEditMode.set(true);
    this.productToBeEdited.set(product.id);
    this.productForm.patchValue(product);
    window.scrollTo({ top: document.body.scrollTop, behavior: 'smooth' });
  }

  onCancelEditing() {
    this.productForm.reset();
    this.isEditMode.set(false);
    this.snackBar.show('Editing has been canceled.', 'info');
  }

  onConfirmDelete(productId: number) {
    this.dialogRef = this.dialog.open(this.confirmDeletion, {
      data: { productId },
    });

    this.dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.onDeleteProduct(productId);
      }
    });
  }

  onDeleteProduct(productId: number) {
    this.productManagementService.deleteProduct(productId).subscribe({
      next: (res) => {
        this.products.update((products) =>
          products.filter((p) => p.id !== productId)
        );
        this.snackBar.show('Product deleted successfully!', 'success');
      },
      error: (error) => {
        this.snackBar.show(
          'Product could not be deleted. Please, try again later.',
          'error'
        );
        console.error(error.message);
      },
    });
  }
}
