import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Product } from '../models';
import { ProductCardComponent } from '../components/product-card.component';
import { InputComponent } from '../components/input.component';
import { ButtonComponent } from '../components/button.component';
import { LoadingSpinnerComponent } from '../components/loading-spinner.component';
import { AlertComponent } from '../components/alert.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProductCardComponent,
    InputComponent,
    ButtonComponent,
    LoadingSpinnerComponent,
    AlertComponent,
  ],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <div class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-4xl font-bold mb-2">Our Medications</h1>
          <p class="text-lg text-blue-100">
            Browse our complete selection of quality medications and healthcare products
          </p>
        </div>
      </div>

      <!-- Main Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <!-- Sidebar - Filters -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-6">Filters</h3>

              <!-- Search -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Search Medications
                </label>
                <input
                  type="text"
                  [(ngModel)]="searchQuery"
                  (ngModelChange)="onSearchChange()"
                  placeholder="Search by name..."
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <!-- Category Filter -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  [(ngModel)]="selectedCategory"
                  (ngModelChange)="onFilterChange()"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">All Categories</option>
                  <option value="pain-relief">Pain Relief</option>
                  <option value="vitamins">Vitamins</option>
                  <option value="cold-flu">Cold & Flu</option>
                  <option value="antibiotics">Antibiotics</option>
                </select>
              </div>

              <!-- Price Range -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Max Price: {{ maxPrice.toFixed(2) }}
                </label>
                <input
                  type="range"
                  min="0"
                  max="500"
                  [(ngModel)]="maxPrice"
                  (ngModelChange)="onFilterChange()"
                  class="w-full"
                />
              </div>

              <!-- Prescription Filter -->
              <div class="mb-6">
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    [(ngModel)]="showPrescriptionOnly"
                    (ngModelChange)="onFilterChange()"
                    class="w-4 h-4 text-primary-600 rounded"
                  />
                  <span class="ml-2 text-sm text-gray-700">Requires Prescription</span>
                </label>
              </div>

              <!-- Reset Filters -->
              <app-button
                variant="secondary"
                size="md"
                (onClick)="resetFilters()"
                class="w-full"
              >
                Reset Filters
              </app-button>
            </div>
          </div>

          <!-- Products Grid -->
          <div class="lg:col-span-3">
            <!-- Loading State -->
            <app-loading-spinner *ngIf="loading"></app-loading-spinner>

            <!-- Error State -->
            <app-alert
              *ngIf="error"
              type="error"
              [message]="error"
              [dismissible]="true"
              (onDismiss)="error = null"
            ></app-alert>

            <!-- Results Info -->
            <div *ngIf="!loading && !error" class="mb-6">
              <p class="text-gray-600">
                Showing <strong>{{ products.length }}</strong> results
                <span *ngIf="searchQuery">(for "{{ searchQuery }}")</span>
              </p>
            </div>

            <!-- Empty State -->
            <div *ngIf="!loading && !error && products.length === 0" class="text-center py-12">
              <div class="text-6xl mb-4">🔍</div>
              <h3 class="text-2xl font-semibold text-gray-900 mb-2">No medications found</h3>
              <p class="text-gray-600 mb-6">
                Try adjusting your filters or search terms
              </p>
              <app-button
                variant="primary"
                size="md"
                (onClick)="resetFilters()"
              >
                Clear Filters
              </app-button>
            </div>

            <!-- Products Grid -->
            <div
              *ngIf="!loading && !error && products.length > 0"
              class="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <app-product-card
                *ngFor="let product of products"
                [product]="product"
                (onAddToCart)="addToCart(product)"
              ></app-product-card>
            </div>

            <!-- Pagination -->
            <div *ngIf="!loading && !error && products.length > 0" class="mt-12 flex justify-center gap-2">
              <app-button
                variant="secondary"
                size="sm"
                [disabled]="currentPage === 1"
                (onClick)="previousPage()"
              >
                Previous
              </app-button>
              <div class="flex items-center gap-2">
                <span class="text-gray-700">
                  Page <strong>{{ currentPage }}</strong> of <strong>{{ totalPages }}</strong>
                </span>
              </div>
              <app-button
                variant="secondary"
                size="sm"
                [disabled]="currentPage >= totalPages"
                (onClick)="nextPage()"
              >
                Next
              </app-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  error: string | null = null;
  searchQuery = '';
  selectedCategory = '';
  maxPrice = 500;
  showPrescriptionOnly = false;
  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 12;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = null;

    const params: any = {
      page: this.currentPage,
      per_page: this.itemsPerPage,
    };

    if (this.searchQuery) {
      params.search = this.searchQuery;
    }
    if (this.selectedCategory) {
      params.category = this.selectedCategory;
    }
    if (this.maxPrice < 500) {
      params.max_price = this.maxPrice;
    }

    this.productService.getProducts(params).subscribe({
      next: (data) => {
        this.products = Array.isArray(data) ? data : data.data || [];
        this.totalPages = data.last_page || 1;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load products:', err);
        this.error = 'Failed to load products. Please try again later.';
        this.loading = false;
      },
    });
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.maxPrice = 500;
    this.showPrescriptionOnly = false;
    this.currentPage = 1;
    this.loadProducts();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadProducts();
      window.scrollTo(0, 0);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts();
      window.scrollTo(0, 0);
    }
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product, 1);
    // Could add toast notification here
  }
}
