# Big Pharma API - Environment Configuration Example

## PostgreSQL Configuration for .env

```env
# Application
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:DVDWDHp05V83D8lZJliphqJz4SPAWwXtsgP1WcF90MI=
APP_DEBUG=true
APP_URL=http://localhost:8000

# Frontend Configuration
FRONTEND_URL=http://localhost:3000

# Localization
APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

# Maintenance
APP_MAINTENANCE_DRIVER=file

# Database - PostgreSQL (IMPORTANT)
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=big_pharma
DB_USERNAME=postgres
DB_PASSWORD="$26@Shaphan#25!"

# Session Configuration
SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null

# Cache & Queue
CACHE_STORE=database
QUEUE_CONNECTION=database
BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local

# Redis (Optional)
REDIS_CLIENT=phpredis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

# Email
MAIL_MAILER=log
MAIL_SCHEME=null
MAIL_HOST=127.0.0.1
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

# AWS (if using)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

# Frontend App Name (for Vite)
VITE_APP_NAME="${APP_NAME}"
```

---

## Production Configuration

For production, update these values:

```env
# Set to production
APP_ENV=production
APP_DEBUG=false

# Use a strong APP_KEY
APP_KEY=base64:YOUR_GENERATED_KEY_HERE

# Set correct URLs
APP_URL=https://your-domain.com
FRONTEND_URL=https://frontend-domain.com

# Use production database
DB_CONNECTION=pgsql
DB_HOST=your-db-host.com
DB_PORT=5432
DB_DATABASE=big_pharmacy_prod
DB_USERNAME=prod_user
DB_PASSWORD=strong_password_here

# Use proper email
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=465
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password
MAIL_ENCRYPTION=tls

# Use cache driver
CACHE_STORE=redis
```

---

## Generating APP_KEY

If you need to generate a new APP_KEY:

```bash
php artisan key:generate
```

This will generate a new secure key and update your .env file automatically.

---

## Testing Your Configuration

### 1. Test Database Connection
```bash
php artisan tinker
>>> DB::connection()->getPDO();
// Should return a PDO object without errors
```

### 2. Test Configuration Loading
```bash
php artisan config:show database
```

### 3. Verify Environment Variables
```bash
php artisan tinker
>>> env('DB_HOST')
>>> env('FRONTEND_URL')
```

---

## Critical Settings

### For CORS to Work
```env
FRONTEND_URL=http://localhost:3000
```
Must match your actual frontend URL exactly.

### For PostgreSQL
```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=big_pharma
```
PostgreSQL must be running on these settings.

### For Local Development
```env
APP_DEBUG=true
APP_ENV=local
```
Provides detailed error messages.

---

## Common Configuration Errors

### Error: "No application encryption key has been specified"
**Fix:**
```bash
php artisan key:generate
```

### Error: "could not find driver"
**Fix:** PostgreSQL PDO driver not installed
```bash
# Windows: Check PHP extensions in php.ini
# Should have: extension=pdo_pgsql
# Then restart your server
```

### Error: "SQLSTATE[08006]"
**Fix:** PostgreSQL not running or wrong connection settings
```bash
# Verify PostgreSQL is running
# Verify DB_HOST and DB_PORT are correct
```

---

## Notes

- Keep .env file in your .gitignore
- Never commit .env to version control
- Use strong passwords in production
- Rotate APP_KEY periodically
- Use environment-specific configurations
- Keep backups of working .env files

