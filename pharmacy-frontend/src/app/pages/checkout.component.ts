import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';
import { CartItem } from '../models';
import { InputComponent } from '../components/input.component';
import { ButtonComponent } from '../components/button.component';
import { AlertComponent } from '../components/alert.component';
import { LoadingSpinnerComponent } from '../components/loading-spinner.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    InputComponent,
    ButtonComponent,
    AlertComponent,
    LoadingSpinnerComponent,
  ],
  template: `
    <div class="min-h-screen bg-gray-50 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Order Summary -->
          <div class="lg:col-span-2">
            <!-- Cart Items -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 class="text-xl font-semibold text-gray-900 mb-6">Order Items</h2>

              <!-- Empty Cart -->
              <div *ngIf="cartItems.length === 0" class="text-center py-12">
                <div class="text-6xl mb-4">🛒</div>
                <h3 class="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                <p class="text-gray-600 mb-6">
                  Add some medications to get started
                </p>
                <app-button
                  variant="primary"
                  size="md"
                  [routerLink]="'/products'"
                >
                  Continue Shopping
                </app-button>
              </div>

              <!-- Cart Items List -->
              <div *ngIf="cartItems.length > 0" class="space-y-6">
                <div *ngFor="let item of cartItems" class="flex gap-4 pb-6 border-b border-gray-200 last:border-b-0">
                  <!-- Product Image -->
                  <div class="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span class="text-3xl">💊</span>
                  </div>

                  <!-- Product Details -->
                  <div class="flex-1">
                    <h3 class="font-semibold text-gray-900">{{ item.product.name }}</h3>
                    <p class="text-sm text-gray-600 mt-1">
                      {{ item.product.description }}
                    </p>
                    <div class="flex items-center justify-between mt-2">
                      <span class="text-lg font-bold text-primary-600">
                        {{ (item.product.price * item.quantity).toFixed(2) }}
                      </span>
                      <div class="flex items-center gap-2">
                        <button
                          (click)="updateQuantity(item.product_id, item.quantity - 1)"
                          class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          [(ngModel)]="item.quantity"
                          (ngModelChange)="updateQuantity(item.product_id, item.quantity)"
                          class="w-12 text-center border border-gray-300 rounded"
                          min="1"
                        />
                        <button
                          (click)="updateQuantity(item.product_id, item.quantity + 1)"
                          class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Remove Button -->
                  <button
                    (click)="removeItem(item.product_id)"
                    class="text-red-600 hover:text-red-800 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>

            <!-- Shipping Address -->
            <div *ngIf="cartItems.length > 0" class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-xl font-semibold text-gray-900 mb-6">Shipping Address</h2>

              <form [formGroup]="shippingForm">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <app-input
                    type="text"
                    formControlName="fullName"
                    label="Full Name"
                    placeholder="John Doe"
                    [error]="getFieldError('fullName')"
                  ></app-input>

                  <app-input
                    type="tel"
                    formControlName="phone"
                    label="Phone Number"
                    placeholder="+1 (555) 123-4567"
                    [error]="getFieldError('phone')"
                  ></app-input>

                  <app-input
                    type="text"
                    formControlName="street"
                    label="Street Address"
                    placeholder="123 Main St"
                    [error]="getFieldError('street')"
                    class="md:col-span-2"
                  ></app-input>

                  <app-input
                    type="text"
                    formControlName="city"
                    label="City"
                    placeholder="New York"
                    [error]="getFieldError('city')"
                  ></app-input>

                  <app-input
                    type="text"
                    formControlName="state"
                    label="State/Province"
                    placeholder="NY"
                    [error]="getFieldError('state')"
                  ></app-input>

                  <app-input
                    type="text"
                    formControlName="zipCode"
                    label="ZIP/Postal Code"
                    placeholder="10001"
                    [error]="getFieldError('zipCode')"
                  ></app-input>

                  <app-input
                    type="text"
                    formControlName="country"
                    label="Country"
                    placeholder="United States"
                    [error]="getFieldError('country')"
                  ></app-input>
                </div>
              </form>
            </div>
          </div>

          <!-- Order Summary Sidebar -->
          <div *ngIf="cartItems.length > 0" class="lg:col-span-1">
            <div class="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 class="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

              <!-- Items -->
              <div class="space-y-3 pb-4 border-b border-gray-200">
                <div *ngFor="let item of cartItems" class="flex justify-between text-sm">
                  <span class="text-gray-600">
                    {{ item.product.name }} x {{ item.quantity }}
                  </span>
                  <span class="text-gray-900 font-semibold">
                    {{ (item.product.price * item.quantity).toFixed(2) }}
                  </span>
                </div>
              </div>

              <!-- Subtotal -->
              <div class="flex justify-between py-3 text-sm">
                <span class="text-gray-600">Subtotal</span>
                <span class="text-gray-900">
                  {{ subtotal.toFixed(2) }}
                </span>
              </div>

              <!-- Shipping -->
              <div class="flex justify-between py-3 text-sm">
                <span class="text-gray-600">Shipping</span>
                <span class="text-gray-900">
                  {{ shippingCost.toFixed(2) }}
                </span>
              </div>

              <!-- Tax -->
              <div class="flex justify-between py-3 text-sm border-b border-gray-200">
                <span class="text-gray-600">Tax</span>
                <span class="text-gray-900">
                  {{ tax.toFixed(2) }}
                </span>
              </div>

              <!-- Total -->
              <div class="flex justify-between py-4">
                <span class="text-lg font-bold text-gray-900">Total</span>
                <span class="text-2xl font-bold text-primary-600">
                  {{ total.toFixed(2) }}
                </span>
              </div>

              <!-- Error Alert -->
              <app-alert
                *ngIf="errorMessage"
                type="error"
                [message]="errorMessage"
                [dismissible]="true"
                (onDismiss)="errorMessage = null"
                class="mb-4"
              ></app-alert>

              <!-- Place Order Button -->
              <app-button
                variant="primary"
                size="md"
                [disabled]="!shippingForm.valid || isProcessing"
                [loading]="isProcessing"
                (onClick)="placeOrder()"
                class="w-full"
              >
                Place Order
              </app-button>

              <!-- Continue Shopping -->
              <app-button
                variant="ghost"
                size="md"
                [routerLink]="'/products'"
                class="w-full mt-3"
              >
                Continue Shopping
              </app-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block' },
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  shippingForm: FormGroup;
  isProcessing = false;
  errorMessage: string | null = null;
  subtotal = 0;
  shippingCost = 10;
  tax = 0;
  total = 0;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.shippingForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cartService.cart$.subscribe((items) => {
      this.cartItems = items;
      this.calculateTotals();
    });

    const user = this.authService.getCurrentUser();
    if (user) {
      this.shippingForm.patchValue({
        fullName: user.name,
        phone: user.phone,
      });
    }
  }

  calculateTotals(): void {
    this.subtotal = this.cartService.getCartTotal();
    this.tax = Math.round(this.subtotal * 0.08 * 100) / 100;
    this.total = this.subtotal + this.shippingCost + this.tax;
  }

  updateQuantity(productId: number, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  placeOrder(): void {
    if (this.shippingForm.invalid || this.cartItems.length === 0) {
      return;
    }

    this.isProcessing = true;
    this.errorMessage = null;

    const orderData = {
      items: this.cartItems.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      shipping_address: `${this.shippingForm.value.street}, ${this.shippingForm.value.city}, ${this.shippingForm.value.state} ${this.shippingForm.value.zipCode}, ${this.shippingForm.value.country}`,
      shipping_price: this.shippingCost,
      total_price: this.total,
    };

    this.orderService.createOrder(orderData).subscribe({
      next: (order) => {
        this.cartService.clearCart();
        this.router.navigate(['/order-confirmation'], {
          queryParams: { orderId: order.id },
        });
      },
      error: (err) => {
        console.error('Order creation error:', err);
        this.errorMessage =
          err.response?.data?.message || 'Failed to place order. Please try again.';
        this.isProcessing = false;
      },
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.shippingForm.get(fieldName);
    if (field?.hasError('required')) {
      return `${fieldName} is required`;
    }
    if (field?.hasError('pattern')) {
      return 'Please enter a valid phone number';
    }
    return '';
  }
}
