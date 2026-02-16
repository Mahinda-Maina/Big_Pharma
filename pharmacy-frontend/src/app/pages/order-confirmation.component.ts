import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OrderService } from '../services/order.service';
import { Order } from '../models';
import { ButtonComponent } from '../components/button.component';
import { LoadingSpinnerComponent } from '../components/loading-spinner.component';
import { AlertComponent } from '../components/alert.component';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent, LoadingSpinnerComponent, AlertComponent],
  template: `
    <div class="min-h-screen bg-gray-50 py-12">
      <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Success Message -->
        <div class="bg-white rounded-lg shadow-md p-8 mb-8">
          <div class="text-center">
            <div class="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
              <span class="text-5xl">✓</span>
            </div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p class="text-gray-600 mb-2">
              Thank you for your purchase
            </p>
            <p class="text-lg text-gray-900 font-semibold" *ngIf="order">
              Order #{{ order.id }}
            </p>
          </div>
        </div>

        <!-- Loading State -->
        <app-loading-spinner *ngIf="loading"></app-loading-spinner>

        <!-- Error State -->
        <app-alert
          *ngIf="error"
          type="error"
          [message]="error"
          [dismissible]="false"
        ></app-alert>

        <!-- Order Details -->
        <div *ngIf="!loading && order && !error" class="bg-white rounded-lg shadow-md p-8 space-y-8">
          <!-- Order Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="text-sm font-semibold text-gray-700 uppercase mb-1">Order Status</h3>
              <p class="text-xl font-bold text-primary-600 capitalize">{{ order.status }}</p>
            </div>
            <div>
              <h3 class="text-sm font-semibold text-gray-700 uppercase mb-1">Order Date</h3>
              <p class="text-xl font-bold text-gray-900">
                {{ order.created_at | date: 'MMM dd, yyyy' }}
              </p>
            </div>
            <div>
              <h3 class="text-sm font-semibold text-gray-700 uppercase mb-1">Total Amount</h3>
              <p class="text-xl font-bold text-gray-900">
                {{ order.total_amount.toFixed(2) }}
              </p>
            </div>
            <div>
              <h3 class="text-sm font-semibold text-gray-700 uppercase mb-1">Shipping Address</h3>
              <p class="text-gray-900">{{ order.shipping_address }}</p>
            </div>
          </div>

          <!-- Divider -->
          <div class="border-t border-gray-200"></div>

          <!-- Next Steps -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">What's Next?</h3>
            <ul class="space-y-3">
              <li class="flex items-start">
                <span class="text-green-500 font-bold mr-3">1</span>
                <div>
                  <h4 class="font-semibold text-gray-900">Order Confirmation</h4>
                  <p class="text-gray-600">A confirmation email has been sent</p>
                </div>
              </li>
              <li class="flex items-start">
                <span class="text-blue-400 font-bold mr-3">2</span>
                <div>
                  <h4 class="font-semibold text-gray-900">Processing</h4>
                  <p class="text-gray-600">Our team will prepare your order</p>
                </div>
              </li>
              <li class="flex items-start">
                <span class="text-gray-400 font-bold mr-3">3</span>
                <div>
                  <h4 class="font-semibold text-gray-900">Shipping</h4>
                  <p class="text-gray-600">You'll receive tracking information via email</p>
                </div>
              </li>
              <li class="flex items-start">
                <span class="text-gray-400 font-bold mr-3">4</span>
                <div>
                  <h4 class="font-semibold text-gray-900">Delivery</h4>
                  <p class="text-gray-600">Delivery within 3-5 business days</p>
                </div>
              </li>
            </ul>
          </div>

          <!-- Divider -->
          <div class="border-t border-gray-200"></div>

          <!-- Customer Support -->
          <div class="bg-blue-50 rounded-lg p-6">
            <h3 class="font-semibold text-gray-900 mb-2">Need Help?</h3>
            <p class="text-gray-600 mb-3">
              If you have any questions about your order, contact us:
            </p>
            <ul class="space-y-2 text-sm">
              <li>📧 <strong>Email:</strong> support@bigpharma.com</li>
              <li>📞 <strong>Phone:</strong> +1 (555) 123-4567</li>
              <li>⏰ <strong>Hours:</strong> Mon-Fri: 9AM - 6PM</li>
            </ul>
          </div>
        </div>

        <!-- Action Buttons -->
        <div *ngIf="!loading && !error" class="flex flex-col sm:flex-row gap-4 mt-8">
          <app-button
            variant="primary"
            size="lg"
            routerLink="/products"
            class="flex-1"
          >
            Continue Shopping
          </app-button>
          <app-button
            variant="secondary"
            size="lg"
            routerLink="/orders"
            class="flex-1"
          >
            View Orders
          </app-button>
        </div>
      </div>
    </div>
  `,
})
export class OrderConfirmationComponent implements OnInit {
  order: Order | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const orderId = params['orderId'];
      if (orderId) {
        this.loadOrder(orderId);
      }
    });
  }

  loadOrder(id: number): void {
    this.loading = true;
    this.error = null;

    this.orderService.getOrder(id).subscribe({
      next: (order) => {
        this.order = order;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load order:', err);
        this.error = 'Failed to load order details';
        this.loading = false;
      },
    });
  }
}
