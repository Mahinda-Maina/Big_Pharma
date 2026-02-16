import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { InputComponent } from '../components/input.component';
import { ButtonComponent } from '../components/button.component';
import { AlertComponent } from '../components/alert.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, InputComponent, ButtonComponent, AlertComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center py-12 px-4">
      <div class="w-full max-w-md">
        <!-- Card Container -->
        <div class="bg-white rounded-xl shadow-lg p-8">
          <!-- Logo -->
          <div class="text-center mb-8">
            <div class="w-16 h-16 mx-auto bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mb-4">
              <span class="text-3xl">💊</span>
            </div>
            <h1 class="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p class="text-gray-600 mt-2">Sign in to your Big Pharma account</p>
          </div>

          <!-- Error Alert -->
          <app-alert
            *ngIf="errorMessage"
            type="error"
            [message]="errorMessage"
            [dismissible]="true"
            (onDismiss)="errorMessage = null"
            class="mb-6"
          ></app-alert>

          <!-- Login Form -->
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <!-- Email -->
            <div class="mb-6">
              <app-input
                type="email"
                formControlName="email"
                label="Email Address"
                placeholder="your@email.com"
                [required]="true"
                [error]="getFieldError('email')"
              ></app-input>
            </div>

            <!-- Password -->
            <div class="mb-6">
              <app-input
                type="password"
                formControlName="password"
                label="Password"
                placeholder="••••••••"
                [required]="true"
                [error]="getFieldError('password')"
              ></app-input>
            </div>

            <!-- Remember Me -->
            <div class="mb-6 flex items-center">
              <input
                type="checkbox"
                id="remember"
                class="w-4 h-4 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
              />
              <label for="remember" class="ml-2 text-sm text-gray-600">
                Remember me
              </label>
            </div>

            <!-- Submit Button -->
            <app-button
              type="submit"
              variant="primary"
              size="md"
      [disabled]="!loginForm.valid || loading"
              [loading]="loading"
              class="w-full"
            >
              Sign In
            </app-button>
          </form>

          <!-- Divider -->
          <div class="my-6 flex items-center">
            <div class="flex-1 border-t border-gray-300"></div>
            <span class="px-4 text-sm text-gray-600">OR</span>
            <div class="flex-1 border-t border-gray-300"></div>
          </div>

          <!-- Sign Up Link -->
          <p class="text-center text-gray-600">
            Don't have an account?
            <a routerLink="/signup" class="text-primary-600 font-semibold hover:text-primary-700">
              Sign up here
            </a>
          </p>

          <!-- Forgot Password -->
          <p class="text-center mt-4">
            <a href="#" class="text-sm text-primary-600 hover:text-primary-700">
              Forgot your password?
            </a>
          </p>
        </div>

        <!-- Additional Info -->
        <div class="mt-8 text-center text-sm text-gray-600">
          <p>
            By signing in, you agree to our
            <a href="#" class="text-primary-600 hover:text-primary-700">Terms of Service</a>
            and
            <a href="#" class="text-primary-600 hover:text-primary-700">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.errorMessage = null;

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
      error: (err: any) => {
        console.error('Login error:', err);
        this.errorMessage =
          err.response?.data?.message || 'Invalid email or password. Please try again.';
        this.loading = false;
      },
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.hasError('required')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    if (field?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (field?.hasError('minlength')) {
      return 'Password must be at least 6 characters';
    }
    return '';
  }
}
