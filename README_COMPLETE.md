# 🏪 Mini Multi-Vendor Marketplace - Complete Platform

A full-stack marketplace platform with a modern Node.js/Express backend and React/Next.js frontend, built for local development without requiring `.env` files.

## 📋 What's Included

### ✅ Backend (Node.js + Express)
- ✅ MongoDB integration with hardcoded local URIs
- ✅ JWT authentication setup
- ✅ RESTful API with error handling
- ✅ Winston logger for debugging
- ✅ Rate limiting and security middleware
- ✅ Swagger API documentation
- ✅ Jest test setup
- ✅ No `.env` file needed for local development

### ✅ Frontend (Next.js + React)
- ✅ Responsive design with Tailwind CSS
- ✅ Modern animations with Framer Motion
- ✅ Real-time API health monitoring
- ✅ React Query for data fetching
- ✅ TypeScript for type safety
- ✅ Mobile-first responsive layout
- ✅ Multiple pages (Home, Products, Login, Register, Dashboard)
- ✅ Reusable components (Navbar, Footer, HealthCard)

### ✅ Documentation
- ✅ Complete setup guide
- ✅ Quick start guide
- ✅ Backend documentation
- ✅ Frontend documentation
- ✅ API integration examples

---

## 🚀 Quick Start (60 seconds)

### Prerequisites
- Node.js 18+
- MongoDB running on `localhost:27017`
- Two terminal windows

### Terminal 1: Start Backend
```bash
cd server
npm install
npm run dev
```

Expected: `✓ Server running on port 5000`

### Terminal 2: Start Frontend
```bash
cd client
npm install
npm run dev
```

Expected: `✓ Ready in X seconds`

### Browser
```
http://localhost:3000
```

---

## 📂 Project Structure

```
marketplace/
├── server/                          # 🔧 Backend API (Node.js/Express)
│   ├── src/
│   │   ├── server.js               # Entry point (UPDATED - no .env)
│   │   ├── app.js                  # Express setup
│   │   ├── config/
│   │   │   ├── config.js           # Configuration (NEW)
│   │   │   ├── db.js               # MongoDB connection (UPDATED)
│   │   │   ├── logger.js           # Logging
│   │   │   └── cloudinary.js
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   ├── docs/
│   │   ├── __tests__/
│   │   └── logs/
│   ├── package.json
│   ├── jest.config.js
│   └── jest.setup.js
│
├── client/                          # 🎨 Frontend (Next.js/React)
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx            # Home page
│   │   │   ├── layout.tsx          # Root layout
│   │   │   ├── globals.css         # Global styles
│   │   │   ├── login/page.tsx      # Login form
│   │   │   ├── register/page.tsx   # Register form
│   │   │   ├── products/page.tsx   # Products listing
│   │   │   └── dashboard/page.tsx  # Dashboard
│   │   ├── components/
│   │   │   ├── Navbar.tsx          # Navigation
│   │   │   ├── Footer.tsx          # Footer
│   │   │   └── HealthCard.tsx      # API status
│   │   ├── utils/
│   │   │   └── api.ts              # API config
│   │   ├── providers/
│   │   │   └── QueryProvider.tsx   # React Query
│   │   └── styles/
│   ├── package.json
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── QUICK_START.md
│   └── README_FRONTEND.md
│
├── docker-compose.yml
├── SETUP_GUIDE.md                  # 📚 Complete setup documentation
├── FRONTEND_SUMMARY.md             # 📚 Frontend overview
└── README.md                        # 📚 This file
```

---

## 🔧 Configuration

### Backend (No .env needed!)

**MongoDB URIs:**
```javascript
// Development
mongodb://127.0.0.1:27017/marketplace

// Test
mongodb://127.0.0.1:27017/marketplace_test
```

**JWT Configuration:**
```javascript
JWT_SECRET = "supersecretkey"
JWT_REFRESH_SECRET = "superrefreshsecret"
ACCESS_TOKEN_EXPIRES = "15m"
REFRESH_TOKEN_EXPIRES = "7d"
```

**Server:**
```javascript
PORT = 5000
NODE_ENV = "development"
```

Location: `server/src/config/config.js`

### Frontend

**API URL:**
```typescript
API_URL = "http://localhost:5000"
```

Location: `client/src/utils/api.ts`

---

## 📱 Features

### Backend Features
✅ RESTful API architecture
✅ MongoDB with Mongoose ODM
✅ JWT authentication
✅ Error handling middleware
✅ Rate limiting
✅ Request validation
✅ CORS enabled
✅ Request logging
✅ Swagger documentation
✅ Jest testing

### Frontend Features
✅ Responsive design (mobile, tablet, desktop)
✅ Dark-aware styling
✅ Real-time API status
✅ Smooth animations
✅ Form validation
✅ Protected routes ready
✅ React Query caching
✅ TypeScript types
✅ Accessibility optimized
✅ SEO ready

---

## 🌐 API Endpoints

### Health Check
```bash
GET http://localhost:5000/health
```
Response:
```json
{
  "success": true,
  "message": "API is healthy"
}
```

### Authentication (Ready to implement)
```bash
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh-token
POST   /api/auth/logout
GET    /api/auth/me
```

### API Documentation
```
http://localhost:5000/api/docs
```

---

## 🛠️ Commands

### Backend Development
```bash
cd server

npm install      # Install dependencies
npm run dev      # Start with nodemon
npm start        # Start normally
npm test         # Run tests
npm run lint     # Lint code
```

### Frontend Development
```bash
cd client

npm install      # Install dependencies
npm run dev      # Start dev server
npm run build    # Create production build
npm start        # Start production server
npm run lint     # Run ESLint
```

---

## 📖 Documentation

### For Quick Setup
👉 **Start here**: `client/QUICK_START.md`

### For Complete Setup
👉 **Full guide**: `SETUP_GUIDE.md`

### For Backend Details
👉 **Backend info**: `server/README.md`

### For Frontend Details
👉 **Frontend info**: `client/README_FRONTEND.md`

### For Overview
👉 **Summary**: `FRONTEND_SUMMARY.md`

---

## 🔄 Development Workflow

### First Time
```bash
# Terminal 1: Backend
cd server
npm install
npm run dev

# Terminal 2: Frontend
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

### Changes Auto-Reload
- Backend: Nodemon watches files
- Frontend: Next.js hot reload
- No manual restart needed!

---

## 🎯 Next Steps to Implement

### Phase 1: Authentication
- [ ] Connect login form to backend
- [ ] Implement JWT token storage
- [ ] Add logout functionality
- [ ] Protect routes with auth middleware

### Phase 2: Products
- [ ] Create product API endpoints
- [ ] Build product listing page
- [ ] Add product detail page
- [ ] Implement search and filtering

### Phase 3: Shopping
- [ ] Shopping cart functionality
- [ ] Order creation
- [ ] Order history
- [ ] Payment integration

### Phase 4: Vendor
- [ ] Vendor registration
- [ ] Vendor dashboard
- [ ] Product management
- [ ] Sales analytics

### Phase 5: Admin
- [ ] Admin dashboard
- [ ] User management
- [ ] Order management
- [ ] Analytics and reports

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# MongoDB not running?
# Start MongoDB service

# Port 5000 in use?
# Edit server/src/config/config.js, change PORT

# Clear cache
rm -rf node_modules
npm install
npm run dev
```

### Frontend won't start
```bash
# Dependencies missing?
cd client
npm install

# Cache issues?
rm -rf .next node_modules
npm install
npm run dev

# Port 3000 in use?
npm run dev -- -p 3001
```

### API not responding
```bash
# Check backend is running
# curl http://localhost:5000/health

# Check API URL in client/src/utils/api.ts
# Restart frontend server
```

### MongoDB connection error
```bash
# Is MongoDB running?
# Check connection string in server/src/config/config.js
# Verify localhost:27017 is accessible
```

---

## 📚 Technologies

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16, React 19, TypeScript |
| **Styling** | Tailwind CSS 4, Framer Motion |
| **State** | React Query |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Auth** | JWT, bcryptjs |
| **Testing** | Jest, Supertest |
| **Logging** | Winston |
| **Docs** | Swagger/OpenAPI |

---

## 🚀 Production Deployment

### Backend
```bash
# Build
npm install --production

# Set environment variables
export NODE_ENV=production
export MONGO_URI=your_production_db
export JWT_SECRET=your_secret

# Start
npm start
```

### Frontend
```bash
# Build
npm run build

# Deploy to Vercel, Netlify, or any Node host
npm start
```

---

## ✨ Key Improvements Made

### ✅ Backend
- Removed `.env` dependency for local development
- Hardcoded configuration in `config.js`
- Centralized configuration management
- Clear MongoDB connection URIs
- Better error logging
- Easy production migration path

### ✅ Frontend
- Complete Next.js setup
- All pages created and styled
- Real API integration
- React Query setup
- Framer Motion animations
- TypeScript throughout
- Responsive components
- Reusable layouts

---

## 📞 Support

### Documentation
- 📖 `SETUP_GUIDE.md` - Complete setup
- 📖 `FRONTEND_SUMMARY.md` - Frontend overview
- 📖 `client/QUICK_START.md` - Quick frontend start
- 📖 `client/README_FRONTEND.md` - Detailed frontend
- 📖 `server/README.md` - Backend details

### Common Issues
- Backend won't start → Check MongoDB
- Frontend won't connect → Check backend URL
- Styling broken → Clear `.next` and rebuild
- Import errors → Check `@/` alias in tsconfig

---

## 🎉 You're All Set!

Your complete marketplace platform is ready for development.

### Start Now:
```bash
# Terminal 1: Backend
cd server && npm run dev

# Terminal 2: Frontend
cd client && npm run dev

# Browser
# Visit http://localhost:3000
```

### See Also:
- Frontend ready? → `client/QUICK_START.md`
- Full setup? → `SETUP_GUIDE.md`
- Backend details? → `server/README.md`

**Happy coding! 🚀**

---

## 📄 License

This project is part of the Mini Multi-Vendor Marketplace platform.

---

**Last Updated**: November 29, 2025
**Status**: ✅ Complete and Ready for Development
