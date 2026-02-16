# Quick Start Guide - Big Pharma Frontend

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies
```bash
cd pharmacy-frontend
npm install
```

### 2. Configure Backend API
Edit `src/app/utils/environment.ts`:
```typescript
const API_BASE_URL = 'http://localhost:8000/api'; // Your Laravel API URL
```

### 3. Start Development Server
```bash
npm start
```
Open browser: `http://localhost:4200`

### 4. Test Login Credentials
- **Email**: test@example.com
- **Password**: password123

## 📁 Project Layout

```
pharmacy-frontend/
├── src/
│   ├── app/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Full pages
│   │   ├── services/        # API calls
│   │   ├── models/          # TypeScript interfaces
│   │   └── utils/           # Guards and helpers
│   ├── styles.css           # Tailwind + global styles
│   └── main.ts              # Bootstrap
├── tailwind.config.js       # Tailwind configuration
└── package.json
```

## 🛣️ Application Routes

| Route | Component | Auth Required |
|-------|-----------|---------------|
| `/` | Landing | No |
| `/login` | Login | No |
| `/signup` | Signup | No |
| `/products` | Products List | No |
| `/cart` | Checkout | ✅ Yes |
| `/orders` | Order History | ✅ Yes |
| `/order-confirmation` | Confirmation | ✅ Yes |

## 🔐 Authentication Flow

### Login Flow
1. User fills email/password on `/login`
2. `AuthService` sends POST to `/api/login`
3. Backend returns `token` and `user` object
4. Token stored in `localStorage` as `auth_token`
5. User redirected to `/products`

### How It Works
- `ApiService` automatically adds `Authorization: Bearer {token}` header
- If unauthorized (401), user redirected to `/login`
- Token persists across page refreshes
- Logout clears token and cookies

## 🛒 Cart Management

### Cart Features
- **Local Storage**: Cart persists in browser
- **Add Items**: Click "Add to Cart" on any product
- **View Cart**: Click cart icon (badges shows item count)
- **Edit Cart**: On checkout page, adjust quantities
- **Persistent**: Cart remains if page is refreshed

### Cart Data Structure
```typescript
{
  product_id: number,
  product: Product,
  quantity: number
}
```

## 📦 Components Overview

### Layout Components
- **NavbarComponent**: Global navigation with auth status
- **FooterComponent**: Global footer with links
- **LoadingSpinnerComponent**: Loading indicators

### Form Components
- **InputComponent**: Text inputs with validation
- **ButtonComponent**: Buttons with variants (primary, secondary, danger, ghost)
- **AlertComponent**: Success/error/warning messages

### Content Components
- **ProductCardComponent**: Product display with add to cart
- **Page Components**: Full-page layouts (Landing, Products, etc.)

## 🎨 Tailwind Theme

### Colors
- **Primary**: Blue (#0ea5e9)
- **Secondary**: Green (#22c55e)
- **Danger**: Red (#ef4444)
- **Warning**: Yellow (#f59e0b)

### Responsive Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

## 🧪 Common Development Tasks

### Add a New Page
```typescript
// 1. Create component
// src/app/pages/new-page.component.ts
@Component({
  selector: 'app-new-page',
  standalone: true,
  template: `<div>New Page</div>`
})
export class NewPageComponent {}

// 2. Add route
// src/app/app.routes.ts
{ path: 'new-page', component: NewPageComponent }
```

### Add a New Service
```typescript
// src/app/services/new.service.ts
@Injectable({ providedIn: 'root' })
export class NewService {
  constructor(private api: ApiService) {}
  
  getData() {
    return new Observable(...);
  }
}
```

### Add Form Validation
```typescript
this.form = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(8)]],
});
```

## 🔧 Useful Commands

```bash
# Start dev server
npm start

# Build for production
npm run build

# Run tests
npm test

# Format code
npm run lint

# Check for errors
npm run check
```

## 📋 API Endpoints Called

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/login` | User login |
| POST | `/api/register` | User signup |
| GET | `/api/user` | Get current user |
| POST | `/api/logout` | Logout |
| GET | `/api/products` | List products |
| POST | `/api/orders` | Create order |
| GET | `/api/orders` | List orders |

## 🐛 Debugging Tips

### Check Authentication
```typescript
// In browser console
localStorage.getItem('auth_token')
localStorage.getItem('user')
```

### View HTTP Requests
- Open DevTools → Network tab
- Look for API calls to backend
- Check response status and body

### Debug Services
```typescript
// Add logging to services
console.log('Calling API:', endpoint);
```

## ⚠️ Common Errors

### "Cannot find module 'tailwindcss'"
```bash
npm install -D tailwindcss postcss autoprefixer
```

### "API call returns 401"
- Check token in localStorage
- Verify backend auth endpoint
- Ensure CORS is enabled on backend

### "Product images not showing"
- Check image URLs in backend
- Ensure API returns image field
- Use fallback emoji (💊) if no image

## 📚 File Structure Cheat Sheet

```
What goes where:

API calls → services/
UI logic → components/ or pages/
Types → models/
Routes → app.routes.ts
Styling → Tailwind classes or styles.css
Business logic → services/
Router guards → utils/
```

## 🚀 Next Steps

1. ✅ Installation complete
2. ✅ Development server running
3. 📋 Review the codebase
4. 🧪 Test login/signup flow
5. 🛍️ Browse products
6. 📦 Try placing an order
7. 📚 Read full FRONTEND.md documentation

## 💡 Pro Tips

- Use Angular DevTools extension for debugging
- Use Tailwind CSS IntelliSense VS Code extension
- Check browser console for warnings/errors
- Use Network tab to inspect API calls
- Keep components small and focused

## 🆘 Need Help?

1. Check `FRONTEND.md` for detailed documentation
2. Review error messages in console
3. Check network requests in DevTools
4. Read component inline documentation
5. Contact support@bigpharma.com

Happy coding! 🎉
