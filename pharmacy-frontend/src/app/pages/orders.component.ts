import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService } from '../services/order.service';
import { Order } from '../models';
import { ButtonComponent } from '../components/button.component';
import { LoadingSpinnerComponent } from '../components/loading-spinner.component';
import { AlertComponent } from '../components/alert.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent, LoadingSpinnerComponent, AlertComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <div class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-4xl font-bold">My Orders</h1>
          <p class="text-lg text-blue-100 mt-2">
            Track and manage your orders
          </p>
        </div>
      </div>

      <!-- Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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

        <!-- Empty State -->
        <div *ngIf="!loading && !error && orders.length === 0" class="text-center py-12">
          <div class="text-6xl mb-4">📦</div>
          <h3 class="text-2xl font-semibold text-gray-900 mb-2">No orders yet</h3>
          <p class="text-gray-600 mb-6">
            You haven't placed any orders yet
          </p>
          <app-button
            variant="primary"
            size="md"
            routerLink="/products"
          >
            Start Shopping
          </app-button>
        </div>

        <!-- Orders List -->
        <div *ngIf="!loading && !error && orders.length > 0" class="space-y-6">
          <div *ngFor="let order of orders" class="bg-white rounded-lg shadow-md p-6">
            <div class="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              <!-- Order Number -->
              <div>
                <h3 class="text-sm font-semibold text-gray-700 uppercase mb-1">
                  Order #
                </h3>
                <p class="text-lg font-bold text-gray-900">{{ order.id }}</p>
              </div>

              <!-- Order Date -->
              <div>
                <h3 class="text-sm font-semibold text-gray-700 uppercase mb-1">
                  Date
                </h3>
                <p class="text-gray-900">
                  {{ order.created_at | date: 'MMM dd, yyyy' }}
                </p>
              </div>

              <!-- Order Amount -->
              <div>
                <h3 class="text-sm font-semibold text-gray-700 uppercase mb-1">
                  Total
                </h3>
                <p class="text-lg font-bold text-primary-600">
                  {{ order.total_amount.toFixed(2) }}
                </p>
              </div>

              <!-- Order Status -->
              <div>
                <h3 class="text-sm font-semibold text-gray-700 uppercase mb-1">
                  Status
                </h3>
                <span
                  [ngClass]="{
                    'bg-blue-100 text-blue-800': order.status === 'pending',
                    'bg-yellow-100 text-yellow-800': order.status === 'processing',
                    'bg-purple-100 text-purple-800': order.status === 'shipped',
                    'bg-green-100 text-green-800': order.status === 'delivered',
                    'bg-red-100 text-red-800': order.status === 'cancelled'
                  }"
                  class="inline-block px-3 py-1 rounded-full text-sm font-semibold capitalize"
                >
                  {{ order.status }}
                </span>
              </div>

              <!-- View Button -->
              <div class="text-right">
                <app-button
                  variant="secondary"
                  size="sm"
                  [routerLink]="['/orders', order.id]"
                >
                  View Details
                </app-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  loading = false;
  error: string | null = null;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.error = null;

    this.orderService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load orders:', err);
        this.error = 'Failed to load orders. Please try again later.';
        this.loading = false;
      },
    });
  }
}
