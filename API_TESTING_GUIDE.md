# Big Pharma API - Testing & Verification Guide

## 🚀 Quick Start - 5 Minute Setup

### Step 1: Clear Caches
```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

### Step 2: Verify Database
```bash
# Test PostgreSQL connection
php artisan tinker
# Then in tinker:
>>> DB::connection()->getPDO();
// Should return a PDO object
```

### Step 3: Run Migrations (if not done)
```bash
php artisan migrate
```

### Step 4: Start the Server
```bash
php artisan serve
```

Server runs on: `http://127.0.0.1:8000`

---

## ✅ Verification Checklist

### Routes Verification
```bash
# Check API routes
php artisan route:list --path=api
```

**Expected Output:**
```
POST  api/register ... register › Auth\RegisteredUserController@store
POST  api/login ...... login › Auth\AuthenticatedSessionController@store
GET   api/user .......................
POST  api/logout ... logout › Auth\AuthenticatedSessionController@destroy
GET   / ...........................
```

### Database Check
```bash
# Login to PostgreSQL
psql -U postgres -d big_parma

# Check users table exists
\d users

# Expected columns:
# id | name | phone | email | email_verified_at | password | remember_token | created_at | updated_at
```

### PHP Extensions Check
```bash
php -m | findstr openssl
php -m | findstr pgsql
php -m | findstr json
```

**Expected:** All three should be listed

---

## 🧪 API Testing Examples

### Using PowerShell
```powershell
# Test root endpoint
$response = Invoke-WebRequest -Uri "http://127.0.0.1:8000/" -Method Get -UseBasicParsing
$response.Content | ConvertFrom-Json | ConvertTo-Json

# Test registration
$body = @{
    name = "John Doe"
    phone = "+254712345678"
    email = "john@example.com"
    password = "SecurePassword123!"
    password_confirmation = "SecurePassword123!"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://127.0.0.1:8000/api/register" `
    -Method Post `
    -Body $body `
    -ContentType "application/json" `
    -UseBasicParsing

$response.Content | ConvertFrom-Json | ConvertTo-Json
```

### Using cURL (Git Bash or WSL)
```bash
# Test root endpoint
curl -X GET http://127.0.0.1:8000/ \
  -H "Content-Type: application/json" \
  -H "Accept: application/json"

# Test registration
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
```

### Using Postman/Insomnia

#### Configuration
```
Base URL: http://127.0.0.1:8000
Default Headers:
  Content-Type: application/json
  Accept: application/json
```

#### Request 1: GET /
- **Method:** GET
- **URL:** `http://127.0.0.1:8000/`
- **Expected Status:** 200
- **Expected Response:**
```json
{
  "message": "Big Pharma API is running",
  "version": "11.x.x",
  "timestamp": "2026-02-13T10:30:45.000000Z"
}
```

#### Request 2: POST /api/register
- **Method:** POST
- **URL:** `http://127.0.0.1:8000/api/register`
- **Body (JSON):**
```json
{
  "name": "John Doe",
  "phone": "+254712345678",
  "email": "john@example.com",
  "password": "SecurePassword123!",
  "password_confirmation": "SecurePassword123!"
}
```
- **Expected Status:** 201
- **Expected Response:**
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

---

## 📊 Test Cases & Expected Results

### Test Case 1: Valid Registration
**Input:**
```json
{
  "name": "Alice Smith",
  "phone": "0712345678",
  "email": "alice@example.com",
  "password": "SecurePass123!",
  "password_confirmation": "SecurePass123!"
}
```
**Expected:** 201 Created + User data

### Test Case 2: Password Mismatch
**Input:**
```json
{
  "name": "Bob Jones",
  "phone": "0712345678",
  "email": "bob@example.com",
  "password": "SecurePass123!",
  "password_confirmation": "DifferentPass123!"
}
```
**Expected:** 422 Unprocessable Entity
```json
{
  "message": "The given data was invalid.",
  "errors": {
    "password": ["The password confirmation does not match."]
  }
}
```

### Test Case 3: Invalid Phone Format
**Input:**
```json
{
  "name": "Carol White",
  "phone": "123456",
  "email": "carol@example.com",
  "password": "SecurePass123!",
  "password_confirmation": "SecurePass123!"
}
```
**Expected:** 422 Unprocessable Entity
```json
{
  "message": "The given data was invalid.",
  "errors": {
    "phone": ["The phone field must match the format +254xxxxxxxxx or 0xxxxxxxxx"]
  }
}
```

### Test Case 4: Duplicate Email
**Input (second registration with same email):**
```json
{
  "name": "David Brown",
  "phone": "0712345678",
  "email": "alice@example.com",
  "password": "SecurePass123!",
  "password_confirmation": "SecurePass123!"
}
```
**Expected:** 422 Unprocessable Entity
```json
{
  "message": "The given data was invalid.",
  "errors": {
    "email": ["The email has already been taken."]
  }
}
```

### Test Case 5: Missing Required Fields
**Input:**
```json
{
  "name": "Eve Davis",
  "email": "eve@example.com"
}
```
**Expected:** 422 Unprocessable Entity
```json
{
  "message": "The given data was invalid.",
  "errors": {
    "phone": ["The phone field is required."],
    "password": ["The password field is required."]
  }
}
```

### Test Case 6: Weak Password
**Input:**
```json
{
  "name": "Frank Miller",
  "phone": "0712345678",
  "email": "frank@example.com",
  "password": "weak",
  "password_confirmation": "weak"
}
```
**Expected:** 422 Unprocessable Entity
```json
{
  "message": "The given data was invalid.",
  "errors": {
    "password": ["The password must be at least 8 characters.", ...]
  }
}
```

---

## 🔍 Troubleshooting

### 500 Error

**Symptom:** Server returns 500 Internal Server Error

**Solutions:**

1. **Check OpenSSL Extension**
   ```bash
   # Verify PHP config
   php -i | grep -A 5 OpenSSL
   
   # If missing, check php.ini:
   cat "C:\path\to\php.ini" | grep openssl
   ```

2. **Clear All Caches**
   ```bash
   php artisan cache:clear
   php artisan config:clear
   php artisan route:clear
   php artisan view:clear
   php artisan optimize:clear
   ```

3. **Check Laravel Logs**
   ```bash
   # Tail the latest errors
   tail -f storage/logs/laravel.log
   ```

4. **Database Connection**
   ```bash
   php artisan tinker
   >>> DB::connection()->getPDO();
   ```

### CORS Errors in Browser Console

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solutions:**

1. **Verify Frontend URL in .env**
   ```env
   FRONTEND_URL=http://localhost:3000
   ```

2. **Check CORS Config**
   - Must have `supports_credentials => true`
   - Must have frontend URL in `allowed_origins`

3. **Frontend Request Headers**
   ```javascript
   fetch('http://127.0.0.1:8000/api/register', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Accept': 'application/json',
     },
     credentials: 'include', // IMPORTANT!
     body: JSON.stringify(data)
   })
   ```

### Routes Not Showing Up

**Symptom:** `php artisan route:list` doesn't show `/api/register`

**Solutions:**

1. **Clear Route Cache**
   ```bash
   php artisan route:clear
   ```

2. **Verify routes/api.php**
   - File should include auth routes
   - Check for syntax errors

3. **Verify routes are imported**
   ```bash
   # In bootstrap/app.php or routes registration
   # Should register api routes correctly
   ```

### Database Connection Errors

**Symptom:** `SQLSTATE[08006]` or connection timeout

**Solutions:**

1. **Verify PostgreSQL is Running**
   ```bash
   # Windows - check Services
   # Or use port 5432 in a test
   netstat -ano | findstr 5432
   ```

2. **Test Connection String**
   ```bash
   psql -h 127.0.0.1 -p 5432 -U postgres -d big_parma
   ```

3. **Check .env Values**
   ```env
   DB_CONNECTION=pgsql
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_DATABASE=big_parma
   DB_USERNAME=postgres
   DB_PASSWORD="actual_password"
   ```

4. **Run Migrations**
   ```bash
   php artisan migrate --force
   ```

### Phone Validation Keeps Failing

**Valid Phone Formats:**
```
+254712345678  ✓ With country code
254712345678   ✓ Without +
0712345678     ✓ With leading 0
```

**Invalid Formats:**
```
712345678      ✗ Missing 0 or country code
+1712345678    ✗ Wrong country code
0712345        ✗ Too short
```

**Regex Pattern:** `/^(?:\+254|254|0)?7\d{8}$/`

---

## 📝 Example Complete Test Session

### Terminal Commands
```bash
# 1. Start fresh
cd c:\Users\stephen.maina\Laravel\Big_Pharma
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# 2. Start server
php artisan serve

# 3. In another terminal - verify routes
php artisan route:list --path=api
```

### Test Sequence
1. ✅ GET / → Returns running message
2. ✅ POST /api/register → 422 (missing phone)
3. ✅ POST /api/register → 201 (valid data)
4. ✅ POST /api/register → 422 (duplicate email)
5. ✅ GET /api/user → 401 (unauthenticated)

---

## 🎯 Success Criteria

Your API is working when:

- [ ] GET / returns 200 with running message
- [ ] POST /api/register with valid data returns 201
- [ ] POST /api/register validates phone format
- [ ] POST /api/register rejects duplicate emails
- [ ] POST /api/register rejects password mismatches
- [ ] User records created with hashed passwords
- [ ] CORS headers present in response
- [ ] Frontend can register without CORS errors
- [ ] Routes show in `php artisan route:list --path=api`
- [ ] No 500 errors in logs

---

## 📞 Quick Reference Commands

```bash
# Development
php artisan serve                      # Start server on port 8000
php artisan route:list --path=api     # List API routes
php artisan tinker                    # Interactive shell

# Database
php artisan migrate                   # Run migrations
php artisan migrate:rollback          # Undo migrations
php artisan db:seed                   # Seed database

# Caching & Clearing
php artisan cache:clear               # Clear cache
php artisan config:clear              # Clear config cache
php artisan route:clear               # Clear route cache
php artisan view:clear                # Clear view cache

# Logs
tail -f storage/logs/laravel.log      # Watch logs in real-time

# Testing
php artisan test                      # Run all tests
php artisan test --filter=RegisterTest
```

---

## Frontend Integration Checklist

- [ ] Frontend running on http://localhost:3000
- [ ] Backend running on http://127.0.0.1:8000
- [ ] .env has FRONTEND_URL=http://localhost:3000
- [ ] Frontend sends credentials: 'include'
- [ ] Frontend sends Accept: application/json header
- [ ] Store authentication tokens from response
- [ ] Use tokens for subsequent authenticated requests

