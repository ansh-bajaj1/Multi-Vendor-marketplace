# 🏪 Mini Multi-Vendor Marketplace - Frontend

A modern, responsive Next.js frontend for a multi-vendor marketplace with real-time API connectivity, smooth animations, and beautiful Tailwind CSS styling.

## ✨ Features

- **📱 Fully Responsive** - Mobile-first design that works on all devices
- **🎨 Beautiful UI** - Modern design with Tailwind CSS and Framer Motion animations
- **🔌 Real API Integration** - Fetches health status from backend at `http://localhost:5000`
- **⚡ Fast Performance** - Next.js 16 with optimized rendering
- **🎯 Component Architecture** - Reusable, well-organized components
- **🔄 State Management** - React Query for efficient data fetching
- **📊 Health Monitoring** - Live API status indicator on homepage
- **🎬 Smooth Animations** - Framer Motion for delightful transitions

## 📁 Project Structure

```
client/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with providers
│   │   ├── page.tsx                # Home page with hero & health card
│   │   ├── globals.css             # Tailwind base styles
│   │   ├── login/
│   │   │   └── page.tsx            # Login page
│   │   ├── register/
│   │   │   └── page.tsx            # Registration page
│   │   ├── products/
│   │   │   └── page.tsx            # Products listing (placeholder)
│   │   └── dashboard/
│   │       └── page.tsx            # Protected dashboard
│   ├── components/
│   │   ├── Navbar.tsx              # Navigation with mobile menu
│   │   ├── Footer.tsx              # Footer component
│   │   └── HealthCard.tsx          # API health status indicator
│   ├── styles/
│   │   └── globals.css             # Global CSS
│   ├── utils/
│   │   └── api.ts                  # API utilities & constants
│   └── providers/
│       └── QueryProvider.tsx       # React Query provider
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── postcss.config.mjs
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Backend running on `http://localhost:5000`

### Installation

1. **Navigate to the client directory:**
```bash
cd client
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

4. **Open in your browser:**
```
http://localhost:3000
```

## 📖 Pages Overview

### 🏠 Home (`/`)
- Hero section with marketplace branding
- Call-to-action buttons
- Real-time API health status card
- Features showcase section

### 🛍️ Products (`/products`)
- Placeholder for product listing
- Ready to integrate product data from backend

### 🔐 Login (`/login`)
- Email and password authentication form
- Remember me checkbox
- Link to registration
- Ready to connect to backend auth endpoint

### 📝 Register (`/register`)
- Full registration form (name, email, password)
- Password confirmation validation
- Terms acceptance checkbox
- Link to login page

### 📊 Dashboard (`/dashboard`)
- Protected dashboard placeholder
- Vendor/admin overview cards
- Ready for permission-based access control

## 🎨 Components

### Navbar
- Responsive navigation bar
- Desktop and mobile views
- Dynamic authentication state display
- Mobile hamburger menu with smooth animation
- Sticky positioning

### Footer
- Responsive grid layout
- Company info, quick links, contact
- Copyright year auto-update
- Dark theme styling

### HealthCard
- Real-time API health monitoring
- Color-coded status (green/red/yellow)
- Animated pulsing indicator
- Fetches from `/health` endpoint every 5 seconds
- Loading and error states

## 🔧 Technologies Used

- **Next.js 16** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **React Query** - Data fetching & caching
- **Axios** - HTTP client (ready to use)

## 🛠️ API Integration

### Environment Configuration
Backend API URL is hardcoded in `src/utils/api.ts`:
```typescript
export const API_URL = "http://localhost:5000";
```

### Available API Hooks
```typescript
import { fetchHealth } from "@/utils/api";

// Fetch health status
const { data, isLoading, error } = useQuery({
  queryKey: ["health"],
  queryFn: fetchHealth,
  refetchInterval: 5000,
});
```

## 📝 Available Scripts

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## 🎯 TODO - Ready to Implement

- [ ] Connect login/register to backend auth endpoints
- [ ] Implement actual product listing from API
- [ ] Add authentication state management (JWT tokens)
- [ ] Create protected routes middleware
- [ ] Add product detail page
- [ ] Implement shopping cart
- [ ] Add user profile management
- [ ] Create vendor dashboard with sales analytics
- [ ] Add payment integration
- [ ] Implement search and filtering

## 🔄 Fetching Data from Backend

### Example: Creating a Product Service

```typescript
// src/utils/productService.ts
import { API_URL } from "./api";

export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/api/products`);
  return response.json();
};
```

### Using in a Component

```typescript
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/utils/productService";

export default function ProductList() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <div>Loading...</div>;
  return <div>{/* Render products */}</div>;
}
```

## 🎬 Animation Examples

### Page Transitions
All pages use Framer Motion for smooth entry animations

### Interactive Elements
- Buttons scale on hover and tap
- Cards fade in on scroll
- Mobile menu animates smoothly

### Health Indicator
- Pulsing animation when API is healthy
- Color changes based on status

## 📱 Responsive Design

- **Mobile** (< 768px): Full-width layout, hamburger menu
- **Tablet** (768px - 1024px): 2-column grids
- **Desktop** (> 1024px): 3-column grids, full navigation

## 🚨 Troubleshooting

### Backend Connection Failed
- Ensure backend is running on `http://localhost:5000`
- Check CORS settings on backend
- Verify API endpoint at `http://localhost:5000/health`

### Styling Issues
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Rebuild: `npm run build`

### Module Not Found Errors
- Verify all imports use `@/` alias (configured in `tsconfig.json`)
- Check file paths match exactly (case-sensitive)

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 📄 License

This project is part of the Mini Multi-Vendor Marketplace platform.

---

**Ready to use!** 🎉
- Backend running? ✓
- Frontend installed? ✓
- Visit `http://localhost:3000` 🚀
