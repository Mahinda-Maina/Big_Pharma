# Big Pharma - Frontend Documentation

## Project Overview

Big Pharma is a modern, production-ready pharmacy e-commerce platform built with Angular 21 and Tailwind CSS. The frontend provides a complete shopping experience for customers to browse medications, manage orders, and handle authentication.

## Features

### 🛍️ User Features
- **Product Browsing**: Browse medications with search and filter capabilities
- **Shopping Cart**: Add/remove items with persistent storage
- **Checkout**: Complete order placement with shipping details
- **Order Management**: View order history and status
- **User Authentication**: Secure login/signup with JWT tokens
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### 🏥 UI/UX Highlights
- Modern medical-themed design with blue/green accents
- Clean card-based layouts
- Intuitive navigation
- Loading states and error handling
- Form validation with helpful error messages
- Toast notifications for user feedback

## Tech Stack

- **Framework**: Angular 21 (Standalone Components)
- **Styling**: Tailwind CSS with custom medical theme
- **HTTP Client**: Axios
- **Forms**: Reactive Forms
- **State Management**: RxJS Observables
- **Build Tool**: Angular CLI

## Project Structure

```
src/
├── app/
│   ├── components/           # Reusable UI components
│   │   ├── alert.component.ts
│   │   ├── button.component.ts
│   │   ├── footer.component.ts
│   │   ├── input.component.ts
│   │   ├── loading-spinner.component.ts
│   │   ├── navbar.component.ts
│   │   └── product-card.component.ts
│   │
│   ├── pages/               # Full-page components
│   │   ├── checkout.component.ts
│   │   ├── landing.component.ts
│   │   ├── login.component.ts
│   │   ├── order-confirmation.component.ts
│   │   ├── orders.component.ts
│   │   ├── products.component.ts
│   │   └── signup.component.ts
│   │
│   ├── services/            # API and business logic
│   │   ├── api.service.ts
│   │   ├── auth.service.ts
│   │   ├── cart.service.ts
│   │   ├── order.service.ts
│   │   └── product.service.ts
│   │
│   ├── models/             # TypeScript interfaces
│   │   └── index.ts
│   │
│   ├── utils/              # Utilities and guards
│   │   ├── auth.guard.ts
│   │   └── environment.ts
│   │
│   ├── app.routes.ts       # Route definitions
│   ├── app.config.ts       # Angular config
│   └── app.ts              # Root component
│
├── styles.css              # Global Tailwind styles
└── main.ts                 # Bootstrap file
```

## Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Angular CLI: `npm install -g @angular/cli`

### Steps

1. **Install Dependencies**
```bash
cd pharmacy-frontend
npm install
```

2. **Configure API URL**
Edit `src/app/utils/environment.ts` and set the correct API base URL:
```typescript
const API_BASE_URL = 'http://localhost:8000/api';
```

3. **Start Development Server**
```bash
npm start
```
The application will be available at `http://localhost:4200`

4. **Build for Production**
```bash
npm run build
```

## API Integration

### Authentication Flow

1. **Login**: POST `/api/login`
   - Returns: `{ user, token }`
   - Token stored in localStorage as `auth_token`

2. **Register**: POST `/api/register`
   - Returns: `{ user, token }`
   - Auto-login on success

3. **Logout**: POST `/api/logout`
   - Clears token and user data

4. **Get Current User**: GET `/api/user`
   - Returns: `{ user }`

### Product Endpoints

- **List Products**: GET `/api/products?page=1&per_page=12&search=query&category=id&max_price=500`
- **Get Product**: GET `/api/products/{id}`

### Order Endpoints

- **Create Order**: POST `/api/orders`
  ```json
  {
    "items": [
      { "product_id": 1, "quantity": 2, "price": 19.99 }
    ],
    "shipping_address": "123 Main St, City, State 12345",
    "shipping_price": 10,
    "total_price": 49.98
  }
  ```

- **List Orders**: GET `/api/orders`
- **Get Order**: GET `/api/orders/{id}`

## Services Overview

### AuthService
Handles user authentication, registration, and session management.

```typescript
// Login
this.authService.login(email, password).subscribe(...)

// Register
this.authService.register(name, email, phone, password, confirmPassword).subscribe(...)

// Logout
this.authService.logout().subscribe(...)

// Get current user
const user = this.authService.getCurrentUser();
```

### CartService
Manages shopping cart state with local storage persistence.

```typescript
// Add to cart
this.cartService.addToCart(product, quantity);

// Remove item
this.cartService.removeFromCart(productId);

// Update quantity
this.cartService.updateQuantity(productId, 5);

// Get total
const total = this.cartService.getCartTotal();

// Clear cart
this.cartService.clearCart();
```

### ProductService
Fetches product data from the backend API.

```typescript
// Get all products
this.productService.getProducts({ limit: 20 }).subscribe(...)

// Get single product
this.productService.getProduct(id).subscribe(...)

// Search products
this.productService.searchProducts('aspirin', categoryId).subscribe(...)
```

### OrderService
Handles order creation and retrieval.

```typescript
// Create order
this.orderService.createOrder(orderData).subscribe(...)

// Get all orders
this.orderService.getOrders().subscribe(...)

// Get single order
this.orderService.getOrder(id).subscribe(...)
```

## Component Usage Examples

### ProductCard Component
```html
<app-product-card
  [product]="product"
  (onAddToCart)="addToCart(product)"
></app-product-card>
```

### Button Component
```html
<app-button
  variant="primary"
  size="lg"
  [disabled]="isLoading"
  [loading]="isLoading"
  (onClick)="handleClick()"
>
  Click Me
</app-button>
```

### Input Component
```html
<app-input
  type="email"
  formControlName="email"
  label="Email Address"
  placeholder="your@email.com"
  required="true"
  [error]="getFieldError('email')"
></app-input>
```

### Alert Component
```html
<app-alert
  type="success"
  title="Success!"
  message="Order placed successfully"
  [dismissible]="true"
  (onDismiss)="onCloseAlert()"
></app-alert>
```

## Authentication Guard

Protected routes use the `AuthGuard` to ensure only authenticated users can access them:

```typescript
{
  path: 'cart',
  component: CheckoutComponent,
  canActivate: [AuthGuard]
}
```

If a user tries to access a protected route without being logged in, they'll be redirected to the login page.

## Form Validation

The application uses Angular Reactive Forms with comprehensive validation:

```typescript
this.form = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(8)]],
  // ...
});
```

Error messages are displayed to users for invalid fields.

## Styling

### Tailwind Configuration

Custom color scheme with medical theme:
- **Primary**: Blue (primary-50 to primary-900)
- **Secondary**: Green (secondary-50 to secondary-900)
- **Accents**: Red and Yellow for alerts

See `tailwind.config.js` for complete theme customization.

## Responsive Design

All pages are mobile-first and fully responsive:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## Error Handling

- **API Errors**: Displayed to users with helpful messages
- **Validation Errors**: Field-level validation feedback
- **Network Errors**: Automatic token refresh and error recovery
- **401 Unauthorized**: Auto-redirect to login

## Performance Optimizations

- **Lazy Loading**: Routes use lazy loading patterns
- **Change Detection**: OnPush strategy where applicable
- **Tree Shaking**: Unused code removed in production builds
- **Minification**: Automatic with Angular build process

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: Latest versions

## Development Guidelines

### Adding New Features

1. Create service/model if needed
2. Implement in a new component
3. Add routes
4. Handle error states
5. Add form validation
6. Style with Tailwind

### Code Quality

- Use TypeScript strict mode
- Add type annotations
- Handle all error cases
- Use RxJS observables
- Follow Angular style guide

## Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables
Update `src/app/utils/environment.ts` for different environments:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.bigpharma.com/api',
};
```

### Hosting Options
- Firebase Hosting
- Netlify
- Vercel
- AWS S3 + CloudFront
- Any static hosting service

## Troubleshooting

### Common Issues

**CORS Errors**
- Ensure backend API has proper CORS headers
- Check API base URL in environment.ts

**Authentication Failures**
- Verify JWT token format
- Check localStorage for auth_token
- Ensure backend auth endpoints are working

**Styling Issues**
- Rebuild: `npm run build`
- Clear cache: `npm cache clean --force`
- Check Tailwind config is loaded

**Build Errors**
- Delete node_modules and reinstall
- Clear Angular cache: `ng cache clean`

## Additional Resources

- [Angular Documentation](https://angular.io)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [RxJS Guide](https://rxjs.dev)
- [Axios Documentation](https://axios-http.com)

## Contributing

1. Create feature branch
2. Implement changes
3. Test thoroughly
4. Submit pull request
5. Code review

## License

MIT License - See LICENSE file for details

## Support

For issues and questions:
- Email: support@bigpharma.com
- Documentation: See this README
- Issues: GitHub Issues tracking
