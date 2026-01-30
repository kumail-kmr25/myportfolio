# 🚀 Modern Full-Stack Portfolio Website

A production-ready, modern portfolio website built with the MERN stack, featuring a beautiful dark/light mode UI, smooth animations, and complete DevOps setup.

## 👨‍💻 About

**Name:** Kumale Ali Bhat  
**Role:** Full-Stack Developer | Web Designer | DevOps Engineer  
**Tagline:** Turning ideas into fast, scalable, and secure web products.

## ✨ Features

### Frontend
- ⚛️ **React 18** with Vite for blazing-fast development
- 🎨 **Tailwind CSS** for modern, responsive styling
- 🎭 **Framer Motion** for smooth animations and transitions
- 🌓 **Dark/Light Mode** with persistent theme preferences
- 📱 **Fully Responsive** design (mobile-first approach)
- ♿ **Accessibility** features (semantic HTML, ARIA roles)
- 🚀 **SEO Optimized** with meta tags and clean structure
- 📧 **EmailJS Integration** for contact form
- 🖼️ **Lazy Loading** images for performance

### Backend
- 🟢 **Node.js & Express** RESTful API
- 🍃 **MongoDB** database with Mongoose ODM
- ✅ **Input Validation** & sanitization
- 🔒 **Security** headers and CORS configuration
- 📝 **Testimonials System** with admin approval
- 🛡️ **Error Handling** middleware
- 📊 **Health Check** endpoints

### DevOps
- 🐳 **Docker** containers for all services
- 🔄 **Docker Compose** for orchestration
- 🌐 **Nginx** reverse proxy and load balancing
- 🔧 **GitHub Actions** CI/CD pipeline
- ☁️ **Cloud-Ready** (AWS, VPS, Vercel compatible)

## 🛠️ Tech Stack

### Frontend
```
├── React 18
├── Vite
├── Tailwind CSS
├── Framer Motion
├── EmailJS
├── Axios
└── React Scroll
```

### Backend
```
├── Node.js
├── Express
├── MongoDB & Mongoose
├── Express Validator
├── CORS
└── Dotenv
```

### DevOps
```
├── Docker & Docker Compose
├── Nginx
├── GitHub Actions
└── Multi-stage builds
```

## 📁 Project Structure

```
c:/myportfolio/
├── frontend/                # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Footer.jsx
│   │   ├── context/         # React Context
│   │   │   └── ThemeContext.jsx
│   │   ├── assets/          # Images and static files
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── backend/                 # Node.js backend API
│   ├── src/
│   │   ├── models/          # Mongoose models
│   │   │   └── Testimonial.js
│   │   ├── routes/          # API routes
│   │   │   └── testimonials.js
│   │   ├── middleware/      # Custom middleware
│   │   │   ├── validation.js
│   │   │   └── errorHandler.js
│   │   └── server.js        # Express server
│   ├── Dockerfile
│   ├── .env
│   └── package.json
│
├── nginx/                   # Production Nginx config
│   └── nginx.conf
│
├── .github/
│   └── workflows/
│       └── ci-cd.yml        # GitHub Actions pipeline
│
├── docker-compose.yml       # Docker Compose configuration
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v20 or higher)
- **npm** or **yarn**
- **MongoDB** (local or MongoDB Atlas)
- **Docker & Docker Compose** (for containerized deployment)

### Local Development Setup

#### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd myportfolio
```

#### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env file (or copy from .env.example)
cp .env.example .env

# Update .env with your MongoDB URI
# MONGODB_URI=mongodb://localhost:27017/portfolio
# or
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio

# Start the backend server
npm run dev
```

Backend will run on `http://localhost:5000`

#### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Create .env file (or copy from .env.example)
cp .env.example .env

# Update .env with EmailJS credentials
# VITE_EMAILJS_SERVICE_ID=service_ivp4pz8
# VITE_EMAILJS_TEMPLATE_ID=your_template_id
# VITE_EMAILJS_PUBLIC_KEY=your_public_key

# Start the development server
npm run dev
```

Frontend will run on `http://localhost:5173`

### 📧 EmailJS Setup

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Copy your Service ID, Template ID, and Public Key
5. Update the `.env` file in the frontend directory

### 🗄️ MongoDB Setup

#### Option 1: Local MongoDB
```bash
# Install MongoDB locally or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:7
```

#### Option 2: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get your connection string
4. Update `MONGODB_URI` in backend `.env`

### 🐳 Docker Deployment

#### Build and Run with Docker Compose
```bash
# Build and start all services
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

Services will be available at:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`
- Nginx Proxy: `http://localhost:80`
- MongoDB: `localhost:27017`

## 📡 API Endpoints

### Testimonials

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/testimonials` | Get all approved testimonials | Public |
| POST | `/api/testimonials` | Submit new testimonial | Public |
| GET | `/api/testimonials/all` | Get all testimonials including pending | Admin |
| PATCH | `/api/testimonials/:id/approve` | Approve a testimonial | Admin |
| DELETE | `/api/testimonials/:id` | Delete a testimonial | Admin |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |

## 🔧 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
VITE_EMAILJS_SERVICE_ID=service_ivp4pz8
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## 🚢 Production Deployment

### Option 1: Docker on VPS/AWS

1. **SSH into your server**
```bash
ssh user@your-server-ip
```

2. **Clone the repository**
```bash
git clone <your-repo-url>
cd myportfolio
```

3. **Update environment variables**
```bash
# Update backend/.env with production values
# Update frontend/.env with production API URL
```

4. **Build and deploy**
```bash
docker-compose up -d --build
```

### Option 2: Frontend on Vercel, Backend on Render/Railway

**Frontend (Vercel):**
1. Connect your GitHub repo to Vercel
2. Set build command: `cd frontend && npm run build`
3. Set output directory: `frontend/dist`
4. Add environment variables in Vercel dashboard

**Backend (Render/Railway):**
1. Connect your GitHub repo
2. Set build command: `cd backend && npm install`
3. Set start command: `cd backend && npm start`
4. Add environment variables in the platform dashboard

### Option 3: Full AWS Deployment

1. **Frontend**: Deploy to S3 + CloudFront
2. **Backend**: Deploy to EC2 or ECS
3. **Database**: Use MongoDB Atlas or DocumentDB
4. **CI/CD**: GitHub Actions with AWS credentials

## 📸 Screenshots

Add screenshots of your portfolio here once deployed!

## 🔑 Admin Panel (Future Enhancement)

Currently, admin actions (approve/delete testimonials) can be done via API calls. To build an admin panel:

1. Create `/admin` route in frontend
2. Implement JWT authentication
3. Add protected routes for admin actions
4. Build admin dashboard UI

## 🧪 Testing

```bash
# Frontend tests
cd frontend
npm run test

# Backend tests
cd backend
npm test

# E2E tests (future)
npm run test:e2e
```

## 📊 Performance Optimization

- ✅ Code splitting with React.lazy()
- ✅ Image optimization and lazy loading
- ✅ Gzip compression via Nginx
- ✅ Static asset caching
- ✅ Bundle size optimization
- ✅ Server-side rendering ready

## 🔒 Security Features

- ✅ Input validation and sanitization
- ✅ CORS configuration
- ✅ Security headers (X-Frame-Options, CSP)
- ✅ Rate limiting
- ✅ XSS protection
- ✅ Environment variable management

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).

## 👤 Contact

- **Email**: kumaleali@example.com
- **LinkedIn**: [Kumale Ali Bhat](https://www.linkedin.com/in/kumale-ali-bhat)
- **GitHub**: [@kumail-kmr25](https://github.com/kumail-kmr25)
- **Twitter/X**: [@KumailKmr](https://x.com/KumailKmr)

## 🙏 Acknowledgments

- React Team for React 18
- Tailwind Labs for Tailwind CSS
- Framer for Framer Motion
- EmailJS for email services
- MongoDB for the database
- Docker for containerization

---

**Built with ❤️ by Kumale Ali Bhat**

*Turning ideas into fast, scalable, and secure web products.*
