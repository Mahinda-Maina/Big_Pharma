# Big Pharma - E-Commerce Pharmacy Platform

## 🏥 Project Overview

Big Pharma is a complete, production-ready pharmacy e-commerce platform with a Laravel backend and modern Angular frontend. The system allows customers to browse medications, manage shopping carts, place orders, and track their purchases.

## 📋 Project Contents

### Backend (Laravel)
- ✅ User authentication & authorization
- ✅ Product management system
- ✅ Order processing
- ✅ RESTful API endpoints
- ✅ Database migrations

### Frontend (Angular)
- ✅ Responsive UI/UX with Tailwind CSS
- ✅ User authentication (login/signup)
- ✅ Product browsing with filters
- ✅ Shopping cart management
- ✅ Order checkout & history
- ✅ Protected routes with auth guards

## 🚀 Quick Start

### Backend Setup

```bash
cd Big_Pharma

# Install PHP dependencies
composer install

# Create .env file
cp .env.example .env

# Generate app key
php artisan key:generate

# Run migrations
php artisan migrate

# Start Laravel server
php artisan serve
```

Backend runs on: `http://localhost:8000`

### Frontend Setup

```bash
cd pharmacy-frontend

# Install dependencies
npm install

# Update API URL in src/app/utils/environment.ts
# Set: const API_BASE_URL = 'http://localhost:8000/api';

# Start development server
npm start
```

Frontend runs on: `http://localhost:4200`

## 📁 Project Structure

```
Big_Pharma/
├── app/
│   ├── Http/
│   │   ├── Controllers/      # API endpoints
│   │   ├── Middleware/
│   │   └── Requests/         # Request validation
│   ├── Models/
│   │   ├── User.php          # User model
│   │   ├── Product.php       # Product model
│   │   └── Order.php         # Order model
│   └── Providers/
│
├── database/
│   ├── migrations/           # Database schema
│   ├── factories/            # Test data factories
│   └── seeders/              # Database seeds
│
├── routes/
│   ├── api.php               # API routes
│   ├── auth.php              # Authentication routes
│   └── web.php               # Web routes
│
├── pharmacy-frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/   # Reusable UI components
│   │   │   ├── pages/        # Full page components
│   │   │   ├── services/     # API services
│   │   │   ├── models/       # TypeScript interfaces
│   │   │   └── utils/        # Guards and helpers
│   │   ├── styles.css        # Global styles
│   │   └── main.ts           # Bootstrap
│   ├── tailwind.config.js    # Tailwind theme
│   └── package.json
│
├── FRONTEND.md               # Detailed frontend docs
├── QUICKSTART.md             # Quick start guide
├── STYLING.md                # Styling guide
├── API_INTEGRATION.md        # API integration guide
└── README.md                 # This file
```

## 🔑 Key Features

### Authentication
- User registration with email/phone validation
- Secure login with JWT tokens
- Protected routes for authenticated users
- Auto-logout on 401 responses
- Persistent sessions across page refreshes

### Product Management
- Browse all medications
- Search and filter by category
- Filter by price range
- Product details with images
- Stock availability display
- Prescription requirement badges

### Shopping Cart
- Add/remove items
- Update quantities
- Persistent storage in browser
- Real-time cart count updates
- Cart subtotal calculation

### Order Management
- Complete checkout flow
- Shipping address collection
- Order total with tax & shipping
- Order confirmation page
- Order history tracking
- Order status display

### User Experience
- Responsive mobile-first design
- Medical-themed UI with blue/green colors
- Clean card-based layouts
- Form validation with error messages
- Loading states and spinners
- Error handling with user-friendly messages

## 📊 Database Models

### User
```
id, name, phone, email, password, created_at, updated_at
```

### Product
```
id, name, description, price, stock_quantity,
category_id, image, requires_prescription, created_at, updated_at
```

### Order
```
id, user_id, total_amount, status,
shipping_address, shipping_price, created_at, updated_at
```

## 🌐 API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - User login
- `GET /api/user` - Get current user
- `POST /api/logout` - User logout

### Products
- `GET /api/products` - List products (paginated, filterable, searchable)
- `GET /api/products/{id}` - Get single product

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/{id}` - Get order details

## 🛣️ Frontend Routes

| Route | Component | Protected |
|-------|-----------|-----------|
| `/` | Landing Page | ❌ |
| `/login` | Login | ❌ |
| `/signup` | Signup | ❌ |
| `/products` | Products | ❌ |
| `/cart` | Checkout | ✅ |
| `/orders` | Order History | ✅ |
| `/order-confirmation` | Confirmation | ✅ |

## 🎨 Design System

### Colors
- **Primary (Blue)**: Action buttons, links, key features
- **Secondary (Green)**: Success states, positive feedback
- **Danger (Red)**: Errors, deletions, warnings
- **Gray**: Text, borders, backgrounds

### Typography
- **Font**: Inter (system-ui fallback)
- **Headings**: 24px - 48px bold
- **Body**: 16px regular
- **Small**: 14px secondary

### Components
- Buttons (4 variants: primary, secondary, danger, ghost)
- Inputs with validation
- Cards with hover effects
- Loading spinners
- Alert messages
- Responsive grids

## 🔐 Security Features

- ✅ JWT authentication
- ✅ HTTPS ready (production)
- ✅ Token stored securely
- ✅ CORS protection
- ✅ Form validation (frontend + backend)
- ✅ Protected API routes
- ✅ Authorization guards
- ✅ Password hashing

## 📱 Responsive Design

Optimized for all devices:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🧪 Testing

### Manual Testing Checklist

1. **Authentication**
   - [ ] Register new user
   - [ ] Login with credentials
   - [ ] Logout
   - [ ] Protected routes redirect to login

2. **Products**
   - [ ] View product list
   - [ ] Search products
   - [ ] Filter by category
   - [ ] Filter by price
   - [ ] View product details

3. **Cart**
   - [ ] Add product to cart
   - [ ] Update quantities
   - [ ] Remove items
   - [ ] Cart persists on refresh
   - [ ] Cart count updates

4. **Checkout**
   - [ ] Fill shipping address
   - [ ] Place order
   - [ ] Order confirmation displays
   - [ ] Order appears in history

## 📚 Documentation

- **[FRONTEND.md](./pharmacy-frontend/FRONTEND.md)** - Complete frontend documentation
- **[QUICKSTART.md](./pharmacy-frontend/QUICKSTART.md)** - Quick start guide
- **[STYLING.md](./pharmacy-frontend/STYLING.md)** - Styling and customization
- **[API_INTEGRATION.md](./pharmacy-frontend/API_INTEGRATION.md)** - API integration details

## 🛠️ Technology Stack

### Backend
- **Framework**: Laravel 11
- **Language**: PHP 8.3+
- **Database**: MySQL/PostgreSQL
- **Authentication**: Sanctum (JWT)
- **ORM**: Eloquent

### Frontend
- **Framework**: Angular 21
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **HTTP Client**: Axios
- **Forms**: Reactive Forms
- **State**: RxJS Observables

## 📦 Dependencies

### Frontend Key Packages
```json
{
  "@angular/core": "^21.1.0",
  "@angular/forms": "^21.1.0",
  "@angular/router": "^21.1.0",
  "axios": "^1.13.5",
  "rxjs": "~7.8.0",
  "tailwindcss": "^4.1.18"
}
```

## 🚢 Deployment

### Frontend
1. Build: `npm run build`
2. Output: `dist/pharmacy-frontend`
3. Deploy to: Firebase, Netlify, Vercel, or any static host

### Backend
1. Set environment variables
2. Run migrations: `php artisan migrate`
3. Start: `php artisan serve` or use production server (Apache, Nginx)

## 🐛 Troubleshooting

### Common Issues

**CORS Error when calling API**
- Ensure backend CORS is configured
- Check API URL in `src/app/utils/environment.ts`

**401 Unauthorized**
- Verify JWT token format
- Check localStorage for auth_token
- Ensure backend auth endpoints work

**Styles not applying**
- Rebuild: `npm run build`
- Check Tailwind config is loaded
- Clear browser cache

**Product images not showing**
- Verify API returns image URLs
- Check CORS for image requests
- Use fallback emoji

## 📞 Support & Contact

For issues or questions:
- Email: support@bigpharma.com
- Documentation: See README and guides
- Issues: GitHub Issues tracking

## 📄 License

MIT License - See LICENSE file

## 👥 Contributing

1. Create feature branch
2. Implement changes
3. Test thoroughly
4. Submit PR with description

## ✅ Checklist for Production

- [ ] Update API URL for production
- [ ] Enable HTTPS
- [ ] Set secure CORS origins
- [ ] Add SSL certificates
- [ ] Configure environment variables
- [ ] Run database migrations
- [ ] Set up monitoring
- [ ] Configure logging
- [ ] Test all endpoints
- [ ] Load testing
- [ ] Security audit
- [ ] Backup strategy

## 🎯 Future Enhancements

- [ ] Admin dashboard
- [ ] Prescription upload
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Order tracking
- [ ] Wishlist feature
- [ ] Product reviews
- [ ] Social sharing
- [ ] Dark mode
- [ ] Multi-language support

## 📊 Project Timeline

- **Phase 1**: Backend API setup ✅
- **Phase 2**: Frontend landing page ✅
- **Phase 3**: Authentication pages ✅
- **Phase 4**: Product browsing ✅
- **Phase 5**: Shopping cart ✅
- **Phase 6**: Checkout & orders ✅
- **Phase 7**: Testing & deployment 🔄
- **Phase 8**: Monitoring & maintenance 📅

## 🎉 Summary

Big Pharma is a complete, professional pharmacy e-commerce platform ready for deployment. It includes:

✅ Complete backend API
✅ Modern responsive frontend
✅ User authentication
✅ Product management
✅ Shopping cart system
✅ Order management
✅ Comprehensive documentation
✅ Production-ready code

Start by following the **Quick Start** section above!

---

**Built with Angular + Laravel + Tailwind CSS**
*A modern solution for pharmacy e-commerce*
