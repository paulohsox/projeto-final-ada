import { Routes } from '@angular/router';

import { ProductList } from './pages/product-list/product-list';
import { Cart } from './pages/cart/cart';
import { Login } from './pages/login/login';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { ProductDetails } from './pages/product-list/product-details/product-details';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: ProductList,
  },
  {
    path: 'product/:id',
    component: ProductDetails,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'cart',
    component: Cart,
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    canMatch: [authGuard, adminGuard],
    loadChildren: () => import('./admin.routes').then((m) => m.AdminRoutes),
  },
  {
    path: '**',
    component: NotFound,
  },
];
