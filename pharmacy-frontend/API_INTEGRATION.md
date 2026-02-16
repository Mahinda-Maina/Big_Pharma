# API Integration Guide - Big Pharma

## Backend & Frontend Communication

This document explains how the Big Pharma frontend integrates with the Laravel backend API.

## Backend Requirements

Your Laravel backend should provide the following endpoints:

### Authentication Endpoints

#### 1. Register User
```
POST /api/register
```
**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 (555) 123-4567",
  "password": "password123",
  "password_confirmation": "password123"
}
```

**Response (201 Created):**
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1 (555) 123-4567",
    "created_at": "2026-02-12T10:00:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 2. Login
```
POST /api/login
```
**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1 (555) 123-4567"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 3. Get Current User
```
GET /api/user
```
**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 (555) 123-4567"
}
```

#### 4. Logout
```
POST /api/logout
```
**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "message": "Logged out successfully"
}
```

---

### Product Endpoints

#### 1. List Products
```
GET /api/products?page=1&per_page=12&search=aspirin&category_id=1&max_price=100
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `per_page`: Items per page (default: 15)
- `search`: Search query
- `category_id`: Filter by category
- `max_price`: Max price filter

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Aspirin 500mg",
      "description": "Pain relief medication",
      "price": 9.99,
      "stock_quantity": 100,
      "category_id": 1,
      "image": "https://api.example.com/images/aspirin.jpg",
      "requires_prescription": false,
      "created_at": "2026-02-01T10:00:00Z"
    }
  ],
  "current_page": 1,
  "last_page": 5,
  "per_page": 12,
  "total": 58
}
```

#### 2. Get Single Product
```
GET /api/products/{id}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "Aspirin 500mg",
  "description": "Pain relief medication",
  "price": 9.99,
  "stock_quantity": 100,
  "category_id": 1,
  "image": "https://api.example.com/images/aspirin.jpg",
  "requires_prescription": false,
  "created_at": "2026-02-01T10:00:00Z"
}
```

---

### Order Endpoints

#### 1. Create Order
```
POST /api/orders
```

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request:**
```json
{
  "items": [
    {
      "product_id": 1,
      "quantity": 2,
      "price": 9.99
    },
    {
      "product_id": 3,
      "quantity": 1,
      "price": 19.99
    }
  ],
  "shipping_address": "123 Main St, New York, NY 10001, USA",
  "shipping_price": 10.00,
  "total_price": 49.97
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "user_id": 1,
  "total_amount": 49.97,
  "status": "pending",
  "shipping_address": "123 Main St, New York, NY 10001, USA",
  "shipping_price": 10.00,
  "created_at": "2026-02-12T10:00:00Z"
}
```

**Error Response (400 Bad Request):**
```json
{
  "message": "Validation failed",
  "errors": {
    "items": ["At least one item is required"],
    "shipping_address": ["Shipping address is required"]
  }
}
```

#### 2. List Orders
```
GET /api/orders
```

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "total_amount": 49.97,
      "status": "processing",
      "shipping_address": "123 Main St, New York, NY 10001, USA",
      "created_at": "2026-02-12T10:00:00Z"
    }
  ],
  "current_page": 1,
  "last_page": 1,
  "per_page": 15,
  "total": 1
}
```

#### 3. Get Single Order
```
GET /api/orders/{id}
```

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "user_id": 1,
  "total_amount": 49.97,
  "status": "shipped",
  "shipping_address": "123 Main St, New York, NY 10001, USA",
  "shipping_price": 10.00,
  "created_at": "2026-02-12T10:00:00Z"
}
```

---

## Frontend Implementation

### 1. API Service - Axios Configuration

The `ApiService` handles all HTTP communication:

```typescript
// src/app/services/api.service.ts

@Injectable({ providedIn: 'root' })
export class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: environment.apiUrl,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Add auth token to all requests
    this.api.interceptors.request.use((config) => {
      const token = this.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Handle 401 responses
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          this.clearToken();
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }
}
```

### 2. Authentication Service Usage

```typescript
// Login
this.authService.login('john@example.com', 'password123').subscribe({
  next: (response) => {
    // User logged in successfully
    this.router.navigate(['/products']);
  },
  error: (error) => {
    // Handle login error
    console.error(error.response?.data?.message);
  }
});

// Register
this.authService.register(name, email, phone, password, passwordConfirmation).subscribe({
  next: () => {
    // User registered and auto-logged in
    this.router.navigate(['/products']);
  },
  error: (error) => {
    // Handle validation errors
    const errors = error.response?.data?.errors;
    // errors = { email: ['Email already exists'], ... }
  }
});
```

### 3. Product Service Usage

```typescript
// Get products
this.productService.getProducts({ page: 1, per_page: 12 }).subscribe({
  next: (response) => {
    this.products = response.data || response;
    this.totalPages = response.last_page || 1;
  },
  error: (error) => {
    console.error('Failed to load products:', error);
  }
});

// Search products
this.productService.searchProducts('aspirin', categoryId).subscribe({
  next: (products) => {
    this.filteredProducts = products;
  }
});
```

### 4. Order Service Usage

```typescript
// Create order
const orderData = {
  items: [
    { product_id: 1, quantity: 2, price: 9.99 }
  ],
  shipping_address: '123 Main St, City, State 12345',
  shipping_price: 10.00,
  total_price: 29.98
};

this.orderService.createOrder(orderData).subscribe({
  next: (order) => {
    // Order created successfully
    this.cartService.clearCart();
    this.router.navigate(['/order-confirmation'], {
      queryParams: { orderId: order.id }
    });
  },
  error: (error) => {
    const message = error.response?.data?.message;
    console.error('Order creation failed:', message);
  }
});

// Get orders
this.orderService.getOrders().subscribe({
  next: (orders) => {
    this.myOrders = orders;
  }
});
```

---

## Error Handling

### API Error Response Codes

| Status | Meaning | Frontend Action |
|--------|---------|-----------------|
| 200 | Success | Process response |
| 201 | Created | Show success message |
| 400 | Bad Request | Display validation errors |
| 401 | Unauthorized | Redirect to login |
| 403 | Forbidden | Show access denied |
| 404 | Not Found | Show not found message |
| 500 | Server Error | Show error message |

### Example Error Handling

```typescript
this.api.post('/orders', data).then(
  (response) => {
    // Success
  }
).catch((error) => {
  if (error.response?.status === 400) {
    // Validation error
    const errors = error.response.data.errors; // { field: [message] }
    Object.keys(errors).forEach(field => {
      console.log(field, errors[field][0]);
    });
  } else if (error.response?.status === 401) {
    // Unauthorized - auto-redirected by ApiService
  } else {
    // Other errors
    const message = error.response?.data?.message || 'An error occurred';
    console.error(message);
  }
});
```

---

## CORS Configuration

Your Laravel backend must allow CORS from the frontend:

```php
// config/cors.php
'allowed_origins' => ['http://localhost:4200', 'https://yourdomain.com'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
'exposed_headers' => ['Authorization'],
```

---

## Token Management

### How JWT Tokens Work

1. **Login**: Backend returns JWT token
2. **Storage**: Frontend stores in `localStorage` as `auth_token`
3. **Usage**: Frontend adds `Authorization: Bearer {token}` header to requests
4. **Expiry**: Check token expiry and re-authenticate if needed
5. **Logout**: Frontend deletes token from localStorage

### Token Refresh Strategy (Optional)

```typescript
// In ApiService, handle 401 responses by:
// 1. Try to refresh token if available
// 2. If refresh fails or no token, redirect to login
// 3. Retry original request with new token
```

---

## Production Deployment

### Before Deploying

1. **Update API URL**
   ```typescript
   // src/app/utils/environment.ts
   const API_BASE_URL = 'https://api.yourdomain.com/api';
   ```

2. **Enable CORS on Backend**
   ```php
   'allowed_origins' => ['https://yourdomain.com']
   ```

3. **Set HTTPS**
   - Frontend should be served over HTTPS
   - Backend should be served over HTTPS

4. **Test All Endpoints**
   - Login/Signup
   - Get Products
   - Create Order
   - Get Orders

---

## Testing API Integration

### Using Postman/Insomnia

1. **Setup Collection**
   - Set base URL to `http://localhost:8000/api`
   - Set header: `Accept: application/json`

2. **Test Endpoints**
   - POST Login → Get Token
   - Set Authorization header with token
   - Test protected endpoints

3. **Check Response Format**
   - Ensure response matches expected structure
   - Validate all required fields present

### Frontend Testing

```typescript
// In component or service
this.productService.getProducts().subscribe(
  (response) => {
    console.log('Products loaded:', response.data);
  },
  (error) => {
    console.error('Error:', error.response?.data);
  }
);
```

---

## Common Issues & Solutions

### Issue: CORS Error
**Solution**: Ensure backend CORS is configured
```php
// Verify in backend logs
Log::debug('CORS headers set correctly');
```

### Issue: 401 Unauthorized
**Solution**: Check token validity and format
```typescript
// In browser console
localStorage.getItem('auth_token') // Should have valid JWT
```

### Issue: Validation Errors Not Showing
**Solution**: Parse error response correctly
```typescript
const fieldErrors = error.response.data.errors;
// Format: { field_name: ['error message'] }
```

---

## API Versioning

For future API versions, update the URL:

```typescript
// v1
const API_BASE_URL = 'http://localhost:8000/api/v1';

// v2
const API_BASE_URL = 'http://localhost:8000/api/v2';
```

---

## Security Best Practices

1. **HTTPS Only**: Always use HTTPS in production
2. **Token Storage**: Keep tokens secure in localStorage
3. **CORS**: Whitelist only trusted origins
4. **Input Validation**: Validate on frontend and backend
5. **Rate Limiting**: Implement on backend
6. **API Keys**: Use for backend-to-backend communication

---

For questions or issues with API integration, refer to:
- Full frontend documentation: `FRONTEND.md`
- Quick start guide: `QUICKSTART.md`
