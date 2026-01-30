# 🚀 Quick Start Guide

## Prerequisites Installed? ✅
- [x] Node.js v20+
- [ ] MongoDB (local or Atlas account)
- [ ] Docker Desktop (optional, for containerized deployment)

---

## 📋 Setup Steps (5 minutes)

### Step 1: Install Dependencies

```bash
# Backend
cd c:\myportfolio\backend
npm install

# Frontend  
cd c:\myportfolio\frontend
npm install
```

### Step 2: Configure Environment Variables

**Backend** (c:\myportfolio\backend\.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
FRONTEND_URL=http://localhost:5173
```

**Frontend** (c:\myportfolio\frontend\.env)
```env
VITE_API_URL=http://localhost:5000
VITE_EMAILJS_SERVICE_ID=service_ivp4pz8
VITE_EMAILJS_TEMPLATE_ID=[GET FROM EMAILJS]
VITE_EMAILJS_PUBLIC_KEY=[GET FROM EMAILJS]
```

### Step 3: Start MongoDB

**Option A: Local MongoDB**
```bash
# If installed locally
mongod

# OR with Docker
docker run -d -p 27017:27017 --name mongodb mongo:7
```

**Option B: MongoDB Atlas** (Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update `MONGODB_URI` in backend/.env

### Step 4: Seed Sample Data (Optional)

```bash
cd c:\myportfolio\backend
npm run seed
```

### Step 5: Start Development Servers

**Terminal 1 - Backend:**
```bash
cd c:\myportfolio\backend
npm run dev
```
✅ Backend running at: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd c:\myportfolio\frontend
npm run dev
```
✅ Frontend running at: http://localhost:5173

---

## 🎯 Next Actions

### 1. Update EmailJS (Required for Contact Form)
1. Visit https://www.emailjs.com/
2. Create account & email service
3. Create email template
4. Copy Service ID, Template ID, Public Key
5. Update `frontend/.env`

### 2. Add Your Resume
Place your PDF resume at: `c:\myportfolio\frontend\public\resume.pdf`

### 3. Update Projects
Edit `frontend/src/components/Projects.jsx` with your real projects

### 4. Customize Content
- Update name, bio, skills as needed
- Add your social media URLs
- Update contact information

---

## 🐳 Docker Deployment (Alternative)

If you prefer Docker:

```bash
cd c:\myportfolio
docker-compose up -d --build
```

Access:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Nginx: http://localhost:80

---

## 🧪 Verify Everything Works

1. ✅ Frontend loads at http://localhost:5173
2. ✅ All sections visible (Hero, About, Skills, Projects, Testimonials, Contact)
3. ✅ Dark/Light theme toggle works
4. ✅ Backend API responds at http://localhost:5000/api/health
5. ✅ Testimonials display (if seeded)

---

## ❌ Troubleshooting

**"Cannot connect to MongoDB"**
- Check MongoDB is running
- Verify MONGODB_URI in .env
- For Atlas, check IP whitelist settings

**"EmailJS not working"**
- Verify all 3 credentials in .env
- Check EmailJS dashboard for errors
- Ensure email service is active

**"Port already in use"**
- Frontend: Change port in vite.config.js
- Backend: Change PORT in .env

**"Images not loading"**
- Check files exist in `frontend/src/assets/images/`
- Verify import paths in components

---

## 🚀 Deploy to Production

See comprehensive guides in [README.md](file:///c:/myportfolio/README.md)

**Quick Options:**
- **Frontend**: Vercel (easiest)
- **Backend**: Render or Railway
- **Database**: MongoDB Atlas (free tier)

---

## 📚 Documentation

- [README.md](file:///c:/myportfolio/README.md) - Complete documentation
- [walkthrough.md](file:///C:/Users/user/.gemini/antigravity/brain/a2c3fd4f-488d-4892-8e5b-86ffffd309bc/walkthrough.md) - Feature walkthrough
- [task.md](file:///C:/Users/user/.gemini/antigravity/brain/a2c3fd4f-488d-4892-8e5b-86ffffd309bc/task.md) - Development checklist

---

**Need help?** Check the walkthrough document for detailed explanations!
