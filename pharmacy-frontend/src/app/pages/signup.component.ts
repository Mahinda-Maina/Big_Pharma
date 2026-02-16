import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { InputComponent } from '../components/input.component';
import { ButtonComponent } from '../components/button.component';
import { AlertComponent } from '../components/alert.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, InputComponent, ButtonComponent, AlertComponent, HttpClientModule],
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
            <h1 class="text-3xl font-bold text-gray-900">Create Account</h1>
            <p class="text-gray-600 mt-2">Join Big Pharma today</p>
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

          <!-- Signup Form -->
          <form [formGroup]="signupForm" (ngSubmit)="onSubmit($event)">
            <!-- Name -->
            <div class="mb-4">
              <app-input
                type="text"
                formControlName="name"
                label="Full Name"
                placeholder="John Doe"
                [required]="true"
                [error]="getFieldError('name')"
              ></app-input>
            </div>

            <!-- Phone -->
            <div class="mb-4">
              <app-input
                type="tel"
                formControlName="phone"
                label="Phone Number"
                placeholder="+1 (555) 123-4567"
                [required]="true"
                [error]="getFieldError('phone')"
              ></app-input>
            </div>

            <!-- Email -->
            <div class="mb-4">
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
            <div class="mb-4">
              <app-input
                type="password"
                formControlName="password"
                label="Password"
                placeholder="••••••••"
                [required]="true"
                [error]="getFieldError('password')"
              ></app-input>
            </div>

            <!-- Confirm Password -->
            <div class="mb-6">
              <app-input
                type="password"
                formControlName="passwordConfirmation"
                label="Confirm Password"
                placeholder="••••••••"
                [required]="true"
                [error]="getFieldError('passwordConfirmation')"
              ></app-input>
            </div>

            <!-- Terms & Conditions -->
            <div class="mb-6 flex items-start">
              <input
                type="checkbox"
                id="terms"
                formControlName="agreeToTerms"
                class="w-4 h-4 text-primary-600 rounded focus:ring-2 focus:ring-primary-500 mt-1"
              />
              <label for="terms" class="ml-2 text-sm text-gray-600">
                I agree to the
                <a href="#" class="text-primary-600 hover:text-primary-700">Terms of Service</a>
                and
                <a href="#" class="text-primary-600 hover:text-primary-700">Privacy Policy</a>
              </label>
            </div>
            <p *ngIf="signupForm.get('agreeToTerms')?.invalid && signupForm.get('agreeToTerms')?.touched" class="text-sm text-red-500 mb-4">
              You must agree to the terms and conditions
            </p>

            <!-- Submit Button -->
            <app-button
              type="submit"
              variant="primary"
              size="md"
              [disabled]="!signupForm.valid || loading"
              [loading]="loading"
              class="w-full"
            >
              Create Account
            </app-button>
          </form>

          <!-- Divider -->
          <div class="my-6 flex items-center">
            <div class="flex-1 border-t border-gray-300"></div>
            <span class="px-4 text-sm text-gray-600">OR</span>
            <div class="flex-1 border-t border-gray-300"></div>
          </div>

          <!-- Login Link -->
          <p class="text-center text-gray-600">
            Already have an account?
            <a routerLink="/login" class="text-primary-600 font-semibold hover:text-primary-700">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  `,
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private http = inject(HttpClient);

  signupForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor() {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirmation: ['', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
    });
  }

  onSubmit(event?: Event): void {
    console.log('FORM SUBMIT TRIGGERED');
    event?.preventDefault();
    console.log('Submit clicked', { value: this.signupForm.value });

    if (this.signupForm.invalid) {
      console.log('Form invalid');
      return;
    }

    const { name, email, phone, password, passwordConfirmation } = this.signupForm.value;

    if (password !== passwordConfirmation) {
      this.errorMessage = 'Passwords do not match';
      alert('Passwords do not match');
      return;
    }

    this.loading = true;
    this.errorMessage = null;

    const body = {
      name,
      phone,
      email,
      password,
      password_confirmation: passwordConfirmation,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    console.log('Sending POST to /api/register', body);

    this.http.post('http://127.0.0.1:8000/api/register', body, { headers }).subscribe({
      next: (res) => {
        console.log('Register success', res);
        this.loading = false;
        alert('Account created');
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Register error', err);
        this.errorMessage = err.error?.message || 'Failed to create account. Please try again.';
        this.loading = false;
      },
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.signupForm.get(fieldName);
    if (field?.hasError('required')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    if (field?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (field?.hasError('minlength')) {
      const min = field.getError('minlength')?.requiredLength;
      return `${fieldName} must be at least ${min} characters`;
    }
    if (field?.hasError('pattern')) {
      return 'Please enter a valid phone number';
    }
    return '';
  }
}
