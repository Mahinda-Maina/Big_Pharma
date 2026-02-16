# Big Pharma API - Debug Guide & Documentation

## ✅ Issues Fixed

### 1. API Routes - FIXED ✓
- **Problem**: Frontend calling `/api/register` but route wasn't in `routes/api.php`
- **Solution**: Moved auth routes from `routes/web.php` to `routes/api.php`
- **Route**: `POST /api/register` now available

### 2. JSON Response - FIXED ✓
- **Problem**: `RegisteredUserController` returned `Response` instead of JSON
- **Solution**: Updated `store()` to return proper JSON response with status 201
- **Response**: Returns user data on successful registration

### 3. Root Route - FIXED ✓
- **Problem**: `GET /` returned plain array, not a proper JSON announcement
- **Solution**: Updated to return proper JSON with API status message
- **Route**: `GET http://127.0.0.1:8000/` returns JSON message

---

## 📋 Current Configuration Summary

### Database (PostgreSQL)
```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=big_parma
DB_USERNAME=postgres
DB_PASSWORD="$26@Shaphan#25!"
```

### CORS Configuration
```php
'paths' => ['*'],
'allowed_methods' => ['*'],
'allowed_origins' => [env('FRONTEND_URL', 'http://localhost:3000')],
'allowed_origins_patterns' => [],
'allowed_headers' => ['*'],
'exposed_headers' => [],
'max_age' => 0,
'supports_credentials' => true,
```

### Frontend URL
```env
FRONTEND_URL=http://localhost:3000
```

---

## 🔍 API Endpoint Reference

### ✅ Public Endpoints (No Auth Required)

#### 1. Register User
```http
POST /api/register
Content-Type: application/json

{
  "name": "John Doe",
  "phone": "+254712345678",
  "email": "john@example.com",
  "password": "SecurePassword123!",
  "password_confirmation": "SecurePassword123!"
}
```

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+254712345678"
  }
}
```

**Validation Error Response (422):**
```json
{
  "message": "The given data was invalid.",
  "errors": {
    "email": ["The email must be a valid email address."],
    "phone": ["The phone must match the format."],
    "password": ["The password must be at least 8 characters."]
  }
}
```

#### 2. Login
```http
POST /api/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

#### 3. Root Endpoint
```http
GET /
```

**Response (200):**
```json
{
  "message": "Big Pharma API is running",
  "version": "11.x.x",
  "timestamp": "2026-02-13T10:30:45.000000Z"
}
```

---

### 🔐 Protected Endpoints (Auth Required)

#### 1. Get Current User
```http
GET /api/user
Authorization: Bearer {sanctum_token}
```

**Response (200):**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+254712345678",
  "email_verified_at": null,
  "created_at": "2026-02-13T10:30:45.000000Z",
  "updated_at": "2026-02-13T10:30:45.000000Z"
}
```

#### 2. Logout
```http
POST /api/logout
Authorization: Bearer {sanctum_token}
```

---

## 📱 Frontend Integration - React/Angular Example

### TypeScript Registration Service
```typescript
interface RegisterPayload {
  name: string;
  phone: string;
  email: string;
  password: string;
  password_confirmation: string;
}

class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  async register(data: RegisterPayload) {
    try {
      const response = await fetch(`${this.apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include', // Important for CORS with credentials
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }
}
```

---

## 🛠️ Troubleshooting Checklist

### Issue: CORS Error
- [ ] Check `FRONTEND_URL` in `.env` matches your frontend URL
- [ ] Verify `config/cors.php` has `supports_credentials => true`
- [ ] Ensure frontend sends `credentials: 'include'` in fetch/axios
- [ ] Clear browser cache and cookies

### Issue: 404 on `/api/register`
- [ ] Run `php artisan route:list --path=api`
- [ ] Verify you see `POST api/register`
- [ ] Restart Laravel server: `php artisan serve`
- [ ] Check routes are cached: `php artisan route:clear`

### Issue: Validation Errors on Email
- [ ] Check `unique:users` migration is applied
- [ ] Run `php artisan migrate` if not applied
- [ ] Verify email format is valid

### Issue: Phone Validation Fails
- [ ] Current regex: `/^(?:\+254|254|0)?7\d{8}$/`
- [ ] Valid formats:
  - `0712345678` (10 digits starting with 07)
  - `254712345678` (country code 254)
  - `+254712345678` (with + prefix)
- [ ] Not valid: `712345678` (missing leading 0 or country code)

### Issue: Database Connection Failed
- [ ] Ensure PostgreSQL is running
- [ ] Verify credentials in `.env`
- [ ] Check database `big_parma` exists
- [ ] Run `php artisan migrate` to create tables

### Issue: Password Hash Issues
- [ ] Check `User::class` has `'password' => 'hashed'` in casts
- [ ] Verify `Hash::make()` is used when creating user
- [ ] Password must be min 8 chars with mixed case and numbers

---

## 🚀 Running the Server

### Start Server
```bash
php artisan serve
```

Output should show:
```
Laravel development server started on http://127.0.0.1:8000
```

### Verify Routes
```bash
php artisan route:list --path=api
```

Should show:
```
POST  api/register ... register › Auth\RegisteredUserController@store
POST  api/login ...... login › Auth\AuthenticatedSessionController@store
GET   api/user .................................... 
POST  api/logout ... logout › Auth\AuthenticatedSessionController@destroy
```

---

## 🔧 Configuration Files

### routes/api.php
```php
<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Public auth routes
Route::post('/register', [RegisteredUserController::class, 'store'])
    ->middleware('guest')
    ->name('register');

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware('guest')
    ->name('login');

// Protected routes
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])->post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->name('logout');
```

### app/Models/User.php
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'phone',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function products()
    {
        return $this->hasManyThrough(Product::class, Order::class);
    }
}
```

### config/cors.php
```php
<?php

return [
    'paths' => ['*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [env('FRONTEND_URL', 'http://localhost:3000')],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

---

## 📊 Database Schema

### users table
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(13) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## 🧪 Testing the API Locally

### Using cURL
```bash
# Register new user
curl -X POST http://127.0.0.1:8000/api/register \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "John Doe",
    "phone": "+254712345678",
    "email": "john@example.com",
    "password": "SecurePassword123!",
    "password_confirmation": "SecurePassword123!"
  }'

# Check root endpoint
curl http://127.0.0.1:8000/
```

### Using Insomnia/Postman
1. Create POST request to `http://127.0.0.1:8000/api/register`
2. Headers:
   - `Content-Type: application/json`
   - `Accept: application/json`
3. Body (JSON):
   ```json
   {
     "name": "John Doe",
     "phone": "+254712345678",
     "email": "john@example.com",
     "password": "SecurePassword123!",
     "password_confirmation": "SecurePassword123!"
   }
   ```

---

## ✨ Production Checklist

- [ ] Run `php artisan config:cache`
- [ ] Run `php artisan route:cache`
- [ ] Set `APP_ENV=production` in `.env`
- [ ] Set `APP_DEBUG=false` in `.env`
- [ ] Generate strong `APP_KEY`: `php artisan key:generate`
- [ ] Use environment-specific CORS for frontend URL
- [ ] Enable HTTPS in production
- [ ] Use secure password hashing with appropriate rounds
- [ ] Enable email verification after registration
- [ ] Implement rate limiting on auth endpoints
- [ ] Set up proper logging and monitoring

---

## 📞 Support

For more information on Laravel:
- [Laravel Documentation](https://laravel.com/docs)
- [Laravel Sanctum](https://laravel.com/docs/sanctum)
- [Laravel Validation](https://laravel.com/docs/validation)

