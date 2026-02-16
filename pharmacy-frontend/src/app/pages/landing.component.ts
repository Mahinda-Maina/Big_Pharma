import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Product } from '../models';
import { ProductCardComponent } from '../components/product-card.component';
import { ButtonComponent } from '../components/button.component';
import { LoadingSpinnerComponent } from '../components/loading-spinner.component';
import { AlertComponent } from '../components/alert.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent, ButtonComponent, LoadingSpinnerComponent, AlertComponent],
  template: `
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="mb-6">
          <div class="w-16 h-16 mx-auto bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <span class="text-5xl">💊</span>
          </div>
        </div>
        <h1 class="text-5xl md:text-6xl font-bold mb-4">
          Your Health, Our Priority
        </h1>
        <p class="text-xl md:text-2xl mb-8 text-blue-100">
          Access quality medications and healthcare products online, delivered safely to your door
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <app-button
            variant="primary"
            size="lg"
            routerLink="/products"
            class="bg-white text-primary-600 hover:bg-gray-100"
          >
            Shop Now
          </app-button>
          <app-button
            variant="ghost"
            size="lg"
            routerLink="/contact"
            class="text-white border-2 border-white hover:bg-white hover:bg-opacity-10"
          >
            Learn More
          </app-button>
        </div>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">
            Featured Medications
          </h2>
          <p class="text-xl text-gray-600">
            Discover our most popular and trusted medications
          </p>
        </div>

        <!-- Loading State -->
        <app-loading-spinner *ngIf="loading"></app-loading-spinner>

        <!-- Error State -->
        <app-alert
          *ngIf="error"
          type="error"
          message="Failed to load featured products. Please try again later."
          [dismissible]="true"
          (onDismiss)="error = null"
        >
        </app-alert>

        <!-- Products Grid -->
        <div *ngIf="!loading && !error" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <app-product-card
            *ngFor="let product of featuredProducts"
            [product]="product"
            (onAddToCart)="addToCart(product)"
          ></app-product-card>
        </div>

        <!-- View All Button -->
        <div class="mt-12 text-center" *ngIf="!loading && !error">
          <app-button
            variant="primary"
            size="lg"
            routerLink="/products"
          >
            View All Products
          </app-button>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Big Pharma?
            </h2>
            <ul class="space-y-4">
              <li class="flex items-start">
                <span class="text-2xl text-green-500 mr-3">✓</span>
                <div>
                  <h4 class="font-semibold text-gray-900">Licensed Pharmacists</h4>
                  <p class="text-gray-600">All medications reviewed by licensed professionals</p>
                </div>
              </li>
              <li class="flex items-start">
                <span class="text-2xl text-green-500 mr-3">✓</span>
                <div>
                  <h4 class="font-semibold text-gray-900">Fast Delivery</h4>
                  <p class="text-gray-600">Get your medications within 24-48 hours</p>
                </div>
              </li>
              <li class="flex items-start">
                <span class="text-2xl text-green-500 mr-3">✓</span>
                <div>
                  <h4 class="font-semibold text-gray-900">Secure &amp; Private</h4>
                  <p class="text-gray-600">Your health information is always protected</p>
                </div>
              </li>
              <li class="flex items-start">
                <span class="text-2xl text-green-500 mr-3">✓</span>
                <div>
                  <h4 class="font-semibold text-gray-900">Competitive Prices</h4>
                  <p class="text-gray-600">Best prices on quality medications</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg p-12 flex items-center justify-center">
            <span class="text-9xl">🏥</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-primary-50 py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">
          Ready to Get Started?
        </h2>
        <p class="text-lg text-gray-600 mb-8">
          Join thousands of satisfied customers who trust Big Pharma for their healthcare needs
        </p>
        <app-button
          variant="primary"
          size="lg"
          routerLink="/signup"
        >
          Create Your Account
        </app-button>
      </div>
    </section>
  `,
})
export class LandingComponent implements OnInit {
  featuredProducts: Product[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadFeaturedProducts();
  }

  loadFeaturedProducts(): void {
    this.loading = true;
    this.error = null;

    this.productService.getProducts({ limit: 6 }).subscribe({
      next: (data) => {
        this.featuredProducts = Array.isArray(data) ? data : data.data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load products:', err);
        this.error = 'Failed to load products';
        this.loading = false;
      },
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product, 1);
    alert(`${product.name} added to cart!`);
  }
}
