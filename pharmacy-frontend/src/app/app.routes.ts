import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing.component';
import { LoginComponent } from './pages/login.component';
import { SignupComponent } from './pages/signup.component';
import { ProductsComponent } from './pages/products.component';
import { CheckoutComponent } from './pages/checkout.component';
import { OrderConfirmationComponent } from './pages/order-confirmation.component';
import { OrdersComponent } from './pages/orders.component';
import { AuthGuard } from './utils/auth.guard';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'order-confirmation', component: OrderConfirmationComponent, canActivate: [AuthGuard] },
  // Wildcard route
  { path: '**', redirectTo: '' },
];
