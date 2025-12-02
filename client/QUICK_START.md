# 🚀 Frontend Quick Start Guide

## Step-by-Step Setup

### 1️⃣ Install Dependencies
```bash
cd client
npm install
```

This will install:
- Next.js 16
- React 19
- Tailwind CSS 4
- Framer Motion
- React Query
- And all other dependencies

### 2️⃣ Start Development Server
```bash
npm run dev
```

You'll see output like:
```
  ▲ Next.js 16.0.5
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in 2.5s
```

### 3️⃣ Open in Browser
```
http://localhost:3000
```

## ✅ What You Should See

1. **Navbar** at the top with:
   - "🏪 MarketPlace" logo
   - Links: Home, Products
   - Auth buttons: Login, Register

2. **Hero Section** with:
   - "Mini Multi-Vendor Marketplace" title
   - Subtitle and description
   - Two buttons: "Explore Products →" and "Join as Vendor"

3. **Health Status Card** showing:
   - API Status (✓ if backend is running)
   - Backend URL
   - Green/red indicator

4. **Features Section** with 3 feature cards:
   - 🚀 Fast & Reliable
   - 🔒 Secure Payments
   - 🌍 Global Reach

5. **Footer** with company info and links

## 🔗 Test All Pages

| Page | URL | Status |
|------|-----|--------|
| Home | http://localhost:3000 | ✓ Working |
| Products | http://localhost:3000/products | 📦 Placeholder |
| Login | http://localhost:3000/login | 🔐 Ready |
| Register | http://localhost:3000/register | 📝 Ready |
| Dashboard | http://localhost:3000/dashboard | 🛡️ Protected |

## 🎯 Next Steps

### Option 1: Connect to Backend Auth
Update `src/utils/api.ts` to add auth endpoints:
```typescript
export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};
```

### Option 2: Add Products Page
Create `src/utils/productService.ts`:
```typescript
export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/api/products`);
  return response.json();
};
```

### Option 3: Build & Deploy
```bash
npm run build
npm start
```

## 🛠️ Available Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Run production server |
| `npm run lint` | Check code quality |

## 📝 File Structure Quick Reference

```
client/src/
├── app/page.tsx              ← Home page
├── components/
│   ├── Navbar.tsx           ← Navigation
│   ├── Footer.tsx           ← Footer
│   └── HealthCard.tsx       ← API status
├── utils/
│   └── api.ts               ← Backend URL & fetch functions
└── providers/
    └── QueryProvider.tsx    ← React Query setup
```

## 🎨 Customization

### Change API URL
Edit `src/utils/api.ts`:
```typescript
export const API_URL = "http://your-backend-url:5000";
```

### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: "#your-color",
  secondary: "#your-color",
}
```

### Change Animations
Edit component files (e.g., `src/components/HealthCard.tsx`):
```typescript
animate={{
  scale: [1, 1.2, 1], // Customize animation
}}
```

## ✨ Features Included

✅ Responsive design (mobile, tablet, desktop)
✅ Dark-aware styling
✅ Smooth animations with Framer Motion
✅ Real API integration with React Query
✅ TypeScript for type safety
✅ Tailwind CSS for modern styling
✅ Mobile hamburger menu
✅ Health status monitoring
✅ Form validation ready
✅ Authentication structure ready

## 🐛 Common Issues

### "Cannot find module" errors
- Clear `.next`: `rm -rf .next`
- Reinstall: `npm install`

### API Connection Failed
- Check backend is running on port 5000
- Verify CORS is enabled on backend
- Check `API_URL` in `src/utils/api.ts`

### Styling looks wrong
- Run: `npm run build`
- Restart dev server

## 📞 Need Help?

Check the `README_FRONTEND.md` for detailed documentation!

---

**Happy coding! 🎉**

Your frontend is ready. Now start building amazing features!
