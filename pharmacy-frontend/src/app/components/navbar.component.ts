import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="bg-white shadow-md sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <a routerLink="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <span class="text-white font-bold text-lg">💊</span>
            </div>
            <span class="font-bold text-xl text-gray-800">Big Pharma</span>
          </a>

          <!-- Navigation Links -->
          <div class="hidden md:flex space-x-6">
            <a
              routerLink="/products"
              routerLinkActive="text-primary-600 border-b-2 border-primary-600"
              class="text-gray-700 hover:text-primary-600 transition py-1"
            >
              Shop
            </a>
            <a
              *ngIf="isAuthenticated$ | async"
              routerLink="/orders"
              routerLinkActive="text-primary-600 border-b-2 border-primary-600"
              class="text-gray-700 hover:text-primary-600 transition py-1"
            >
              My Orders
            </a>
          </div>

          <!-- Right Side Actions -->
          <div class="flex items-center space-x-4">
            <!-- Cart Icon -->
            <a
              routerLink="/cart"
              class="relative text-gray-700 hover:text-primary-600 transition"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span
                *ngIf="(cartCount$ | async) as count"
                class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
              >
                {{ count }}
              </span>
            </a>

            <!-- Auth Buttons -->
            <div class="flex items-center space-x-3">
              <ng-container *ngIf="isAuthenticated$ | async as isAuth; else notAuth">
                <div class="text-sm">
                  <span class="text-gray-700">{{ (currentUser$ | async)?.name }}</span>
                </div>
                <button
                  (click)="logout()"
                  class="text-sm px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                >
                  Logout
                </button>
              </ng-container>
              <ng-template #notAuth>
                <a
                  routerLink="/login"
                  class="text-sm px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
                >
                  Login
                </a>
                <a
                  routerLink="/signup"
                  class="text-sm px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition"
                >
                  Sign Up
                </a>
              </ng-template>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private cartService = inject(CartService);

  isAuthenticated$ = this.authService.isAuthenticated$;
  currentUser$ = this.authService.currentUser$;
  cartCount$ = this.cartService.cartCount$;

  logout(): void {
    if (confirm('Are you sure you want to logout?')) {
      this.authService.logout().subscribe({
        next: () => {
          window.location.href = '/';
        },
        error: () => {
          window.location.href = '/';
        },
      });
    }
  }
}
