import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { Product } from '../models';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <!-- Product Image -->
      <div class="relative h-48 bg-gray-200 overflow-hidden">
        <img
          *ngIf="product.image; else noImage"
          [src]="product.image"
          [alt]="product.name"
          class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <ng-template #noImage>
          <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-secondary-100">
            <span class="text-4xl">💊</span>
          </div>
        </ng-template>

        <!-- Prescription Badge -->
        <div
          *ngIf="product.requires_prescription"
          class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold"
        >
          Rx Required
        </div>

        <!-- Stock Status -->
        <div
          [class.bg-green-500]="product.stock_quantity! > 0"
          [class.bg-red-500]="product.stock_quantity! <= 0"
          class="absolute bottom-0 left-0 right-0 text-white text-xs font-semibold py-1 px-2 text-center"
        >
          {{ product.stock_quantity! > 0 ? 'In Stock' : 'Out of Stock' }}
        </div>
      </div>

      <!-- Product Details -->
      <div class="p-4">
        <!-- Name -->
        <h3 class="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {{ product.name }}
        </h3>

        <!-- Description -->
        <p class="text-sm text-gray-600 mb-3 line-clamp-2">
          {{ product.description || 'Quality medication' }}
        </p>

        <!-- Price -->
        <div class="flex items-center justify-between mb-4">
          <span class="text-2xl font-bold text-primary-600">
            {{ product.price.toFixed(2) }}
          </span>
        </div>

        <!-- Add to Cart Button -->
        <app-button
          variant="primary"
          size="md"
          [disabled]="product.stock_quantity! <= 0"
          (onClick)="onAddToCart.emit()"
          class="w-full"
        >
          Add to Cart
        </app-button>
      </div>
    </div>
  `,
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() onAddToCart = new EventEmitter<void>();
}
