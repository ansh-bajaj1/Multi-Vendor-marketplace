# 📊 Full Stack Marketplace - Complete Setup Guide

## 🎯 Project Overview

You now have a complete multi-vendor marketplace platform:
- **Backend**: Node.js + Express API running on port 5000
- **Frontend**: Next.js 16 frontend running on port 3000
- **Database**: MongoDB on localhost:27017
- **Styling**: Tailwind CSS with Framer Motion animations
- **State**: React Query for data fetching

## 📋 Prerequisites

- Node.js 18+ installed
- MongoDB running locally (or accessible at 127.0.0.1:27017)
- Two terminal windows (one for backend, one for frontend)

---

## 🚀 Quick Start (Recommended)

### Terminal 1: Start Backend

```bash
# Navigate to server
cd server

# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

**Expected output:**
```
info: ✓ Server running on port 5000
info: ✓ MongoDB connected to mongodb://127.0.0.1:27017/marketplace
info: ✓ Environment: development
```

### Terminal 2: Start Frontend

```bash
# Navigate to client
cd client

# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

**Expected output:**
```
  ▲ Next.js 16.0.5
  - Local:        http://localhost:3000
```

### 3. Open in Browser

```
http://localhost:3000
```

---

## 🏗️ Complete Project Structure

```
New folder/
├── docker-compose.yml
├── README.md
│
├── server/                          # 🔧 Backend API
│   ├── package.json
│   ├── jest.config.js
│   ├── jest.setup.js
│   └── src/
│       ├── app.js                   # Express app setup
│       ├── server.js                # Server entry point (UPDATED)
│       ├── config/
│       │   ├── config.js            # Configuration (NEW - hardcoded)
│       │   ├── db.js                # MongoDB connection (UPDATED)
│       │   ├── logger.js            # Winston logger
│       │   ├── cloudinary.js        # Cloudinary config
│       ├── controllers/
│       │   └── authController.js
│       ├── middlewares/
│       │   ├── auth.js
│       │   ├── errorHandler.js
│       │   ├── rateLimiter.js
│       │   ├── roles.js
│       │   └── validate.js
│       ├── models/
│       │   ├── User.js
│       │   └── RefreshToken.js
│       ├── routes/
│       │   └── authRoutes.js
│       ├── services/
│       │   ├── emailService.js
│       │   ├── paymentService.js
│       │   ├── tokenService.js
│       │   └── uploadService.js
│       ├── utils/
│       │   ├── ApiError.js
│       │   ├── asyncHandler.js
│       │   ├── token.js
│       │   └── validators.js
│       ├── docs/
│       │   └── swagger.js
│       ├── __tests__/
│       │   └── auth.test.js
│       └── logs/
│
└── client/                          # 🎨 Frontend React
    ├── package.json                 # UPDATED with dependencies
    ├── next.config.ts
    ├── tailwind.config.ts
    ├── tsconfig.json
    ├── postcss.config.mjs
    ├── eslint.config.mjs
    ├── QUICK_START.md              # Quick start guide
    ├── README_FRONTEND.md          # Detailed frontend docs
    └── src/
        ├── app/
        │   ├── layout.tsx           # Root layout with providers
        │   ├── page.tsx             # Home page (UPDATED)
        │   ├── globals.css          # Global styles
        │   ├── login/
        │   │   └── page.tsx         # Login page
        │   ├── register/
        │   │   └── page.tsx         # Register page
        │   ├── products/
        │   │   └── page.tsx         # Products placeholder
        │   └── dashboard/
        │       └── page.tsx         # Dashboard placeholder
        ├── components/
        │   ├── Navbar.tsx           # Navigation bar
        │   ├── Footer.tsx           # Footer
        │   └── HealthCard.tsx       # API health card
        ├── styles/
        │   └── globals.css
        ├── utils/
        │   └── api.ts               # API utilities
        └── providers/
            └── QueryProvider.tsx    # React Query provider
```

---

## ✅ What's New

### Backend Changes ✨
- ✅ **server.js** - Removed `.env` dependency, now uses hardcoded local config
- ✅ **db.js** - Hardcoded MongoDB URIs for dev/test
- ✅ **config.js** - NEW centralized configuration file
- ✅ No `.env` file needed for local development
- ✅ Easy to switch to environment variables for production

### Frontend Changes ✨
- ✅ **Complete Next.js setup** with all pages
- ✅ **Responsive components** (Navbar with mobile menu, Footer)
- ✅ **HealthCard component** showing real API status
- ✅ **React Query** for efficient data fetching
- ✅ **Framer Motion** animations
- ✅ **TypeScript** for type safety
- ✅ **Tailwind CSS** for modern styling
- ✅ **Login/Register/Dashboard** pages ready
- ✅ All dependencies properly configured

---

## 🔌 API Endpoints Available

### Health Check
```bash
GET http://localhost:5000/health
# Response: { "success": true, "message": "API is healthy" }
```

### Authentication Routes (Ready to implement)
```bash
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh-token
POST /api/auth/logout
GET  /api/auth/me
```

### API Docs
```
http://localhost:5000/api/docs
```

---

## 🎯 Key Configuration Values

### Backend (server/src/config/config.js)
```javascript
// MongoDB
Development: mongodb://127.0.0.1:27017/marketplace
Test: mongodb://127.0.0.1:27017/marketplace_test

// JWT
SECRET: "supersecretkey"
REFRESH_SECRET: "superrefreshsecret"
ACCESS_TOKEN_EXPIRES: "15m"
REFRESH_TOKEN_EXPIRES: "7d"

// Server
PORT: 5000
```

### Frontend (client/src/utils/api.ts)
```typescript
API_URL = "http://localhost:5000"
```

---

## 📱 Frontend Pages

| Page | URL | Status |
|------|-----|--------|
| **Home** | http://localhost:3000 | ✓ Hero + Health Card |
| **Products** | http://localhost:3000/products | 📦 Placeholder |
| **Login** | http://localhost:3000/login | 🔐 Ready to connect |
| **Register** | http://localhost:3000/register | 📝 Ready to connect |
| **Dashboard** | http://localhost:3000/dashboard | 🛡️ Protected layout |

---

## 🛠️ Development Commands

### Backend
```bash
cd server
npm run dev        # Start with nodemon
npm start          # Start normally
npm test           # Run tests
npm run lint       # Lint code
```

### Frontend
```bash
cd client
npm run dev        # Start dev server
npm run build      # Create production build
npm start          # Start production server
npm run lint       # Run ESLint
```

---

## 🔄 Full Development Workflow

### First Time Setup
```bash
# Terminal 1 - Backend
cd server
npm install
npm run dev

# Terminal 2 - Frontend
cd client
npm install
npm run dev

# Browser
# Open http://localhost:3000
```

### Daily Development
```bash
# Terminal 1
cd server && npm run dev

# Terminal 2
cd client && npm run dev
```

### Making Changes
- Backend changes auto-reload (nodemon)
- Frontend changes auto-reload (Next.js)
- No need to restart servers

---

## 🚀 Production Deployment

### Backend
1. Set environment variables (override hardcoded defaults):
   ```bash
   MONGO_URI=your_prod_database
   JWT_SECRET=your_prod_secret
   NODE_ENV=production
   ```

2. Build and start:
   ```bash
   npm install --production
   npm start
   ```

### Frontend
1. Build for production:
   ```bash
   npm run build
   npm start
   ```

2. Deploy to Vercel, Netlify, or any Node.js hosting

---

## 🧪 Testing

### Backend Tests
```bash
cd server
npm test
```

### Frontend (ready to add tests)
```bash
cd client
npm test
```

---

## 🔗 Connecting Pages to Backend

### Example: Login Implementation
```typescript
// client/src/utils/api.ts
export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error("Login failed");
  return response.json();
};

// client/src/app/login/page.tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const { token } = await login(email, password);
    localStorage.setItem("token", token);
    // Redirect to dashboard
  } catch (error) {
    console.error(error);
  }
};
```

---

## 📞 Troubleshooting

### Backend won't start
- MongoDB not running? Start MongoDB
- Port 5000 in use? Change `PORT` in config.js
- Check logs in `server/logs/` directory

### Frontend won't start
- Dependencies missing? Run `npm install`
- Port 3000 in use? Use `npm run dev -- -p 3001`
- Cache issues? Delete `.next` folder and rebuild

### API not responding
- Backend not running? Start server first
- Wrong API_URL? Check `client/src/utils/api.ts`
- CORS issues? Check backend's app.js CORS config

### Database connection error
- MongoDB not running? Start MongoDB service
- Wrong URI? Check in `server/src/config/config.js`
- Connection timeout? Increase timeout or check firewall

---

## 📚 Documentation Files

- **Backend**: `server/README.md`
- **Frontend**: `client/README_FRONTEND.md`
- **Quick Start**: `client/QUICK_START.md`
- **This file**: `SETUP_GUIDE.md`

---

## ✨ Next Features to Implement

- [ ] Product CRUD operations
- [ ] Shopping cart functionality
- [ ] Vendor dashboard
- [ ] Payment integration
- [ ] Order management
- [ ] User reviews and ratings
- [ ] Search and filtering
- [ ] Notification system
- [ ] Email notifications
- [ ] Admin analytics

---

## 🎉 You're Ready!

Your complete marketplace platform is set up and ready to use!

### Start Development:
```bash
# Terminal 1
cd server && npm run dev

# Terminal 2
cd client && npm run dev

# Browser
# Visit http://localhost:3000
```

**Happy coding! 🚀**
