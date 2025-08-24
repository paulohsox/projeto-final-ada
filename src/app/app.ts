import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Navbar } from "./shared/navbar/navbar";
import { AuthService } from './core/services/auth.service';
import { ProductsService } from './core/services/products.service';
import { SnackbarService } from './core/services/snackbar.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly productsService = inject(ProductsService);
  private readonly snackBar = inject(SnackbarService);
  
  protected isUserLoggedIn = this.authService.isUserLoggedIn;
  protected isUserAdmin = this.authService.isUserAdmin;
  protected readonly user = this.authService.user;

  protected title = 'vitrine-projeto-final';

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/home']);
    this.snackBar.show('Logged out successfully', 'info')
  }

  ngOnInit() {
    this.productsService.getAllProducts().subscribe();
  }
}
