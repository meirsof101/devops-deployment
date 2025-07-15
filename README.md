# 🚀 MERN Stack Deployment & DevOps

[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19939926&assignment_repo_type=AssignmentRepo)

A production-ready MERN (MongoDB, Express.js, React, Node.js) stack application with comprehensive deployment and DevOps features including CI/CD pipelines, monitoring, security, and scalability configurations.

## 🌟 Features

### Backend (Express.js + MongoDB)
- ✅ Production-ready Express.js server with security middleware
- ✅ JWT-based authentication with secure password hashing
- ✅ MongoDB integration with connection pooling
- ✅ Comprehensive API validation and error handling
- ✅ Winston logging with log rotation
- ✅ Sentry error tracking integration
- ✅ Health check endpoints for monitoring
- ✅ Rate limiting and CORS protection
- ✅ Helmet security headers
- ✅ Comprehensive test suite with Jest

### Frontend (React + Vite)
- ✅ Modern React 18 with hooks and context
- ✅ Redux Toolkit for state management
- ✅ React Query for server state management
- ✅ Tailwind CSS for responsive UI
- ✅ React Hook Form for form validation
- ✅ Production-optimized Vite build
- ✅ Code splitting and lazy loading
- ✅ Error tracking with Sentry
- ✅ PWA-ready configuration
- ✅ Comprehensive test suite with Vitest

### DevOps & Deployment
- ✅ GitHub Actions CI/CD pipelines
- ✅ Docker containerization
- ✅ Nginx reverse proxy configuration
- ✅ Multiple deployment strategies (Vercel, Render, Docker)
- ✅ Environment-specific configurations
- ✅ Database migrations and seeding
- ✅ Monitoring and logging setup
- ✅ Security best practices

## 🚦 Live Demo

- **Frontend**: https://devops-deployment.vercel.app/
- **Backend API**: https://devops-deployment.onrender.com


## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Client  │────│   Express API   │────│   MongoDB       │
│   (Vercel)      │    │   (Render)      │    │   (Atlas)       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
    ┌─────────┐            ┌─────────┐            ┌─────────┐
    │ Nginx   │            │ Winston │            │ Indexes │
    │ + SSL   │            │ Logging │            │ + Pool  │
    └─────────┘            └─────────┘            └─────────┘
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local) or MongoDB Atlas account
- Git
- Docker (optional)

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/your-username/mern-deployment-app.git
cd mern-deployment-app
```

2. **Install dependencies**
```bash
npm run install:all
```

3. **Environment Setup**
```bash
# Copy environment files
cp .env.example .env
cp client/.env.example client/.env
cp server/.env.example server/.env

# Update environment variables
# Edit .env files with your configuration
```

4. **Start MongoDB**
```bash
# Option 1: Local MongoDB
mongod

# Option 2: Docker
docker run -d -p 27017:27017 --name mongodb mongo:4.4
```

5. **Start the development servers**
```bash
# Start both frontend and backend
npm run dev

# Or start separately
npm run server:dev  # Backend on http://localhost:5000
npm run client:dev  # Frontend on http://localhost:3000
```

### Docker Development

```bash
# Start all services with Docker Compose
cd deployment
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📦 Deployment

### Backend Deployment (Render)

1. **Create a Render account** at [render.com](https://render.com)

2. **Create a new Web Service**
   - Connect your GitHub repository
   - Set build command: `cd server && npm install && npm run build`
   - Set start command: `cd server && npm start`
   - Add environment variables from `.env.example`

3. **Configure MongoDB Atlas**
   - Create a cluster at [mongodb.com](https://cloud.mongodb.com)
   - Get connection string and add to `MONGODB_URI`

4. **Deploy**
   - Push to main branch triggers automatic deployment
   - Monitor build logs in Render dashboard

### Frontend Deployment (Vercel)

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Configure deployment**
```bash
cd client
vercel --prod
```

3. **Or use GitHub integration**
   - Connect repository to Vercel
   - Configure build settings:
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`

### Docker Production Deployment

```bash
# Build and deploy with Docker Compose
cd deployment
docker-compose -f docker-compose.yml up -d

# Scale services
docker-compose up -d --scale backend=3 --scale frontend=2

# Monitor
docker-compose ps
docker-compose logs -f
```

## 🔄 CI/CD Pipeline

The project includes a comprehensive GitHub Actions workflow:

### Features
- ✅ Automated testing on pull requests
- ✅ Code quality checks (ESLint, Prettier)
- ✅ Security vulnerability scanning
- ✅ Automated deployment to staging/production
- ✅ Health checks after deployment
- ✅ Rollback capabilities

### Workflow Triggers
- Push to `main` branch → Production deployment
- Pull request → Run tests and quality checks
- Release tag → Tagged production deployment

### Setup
1. Add repository secrets in GitHub:
   ```
   RENDER_API_KEY=your_render_api_key
   RENDER_SERVICE_ID=your_service_id
   VERCEL_TOKEN=your_vercel_token
   VERCEL_ORG_ID=your_org_id
   VERCEL_PROJECT_ID=your_project_id
   MONGODB_URI=your_production_mongodb_uri
   JWT_SECRET=your_production_jwt_secret
   ```

2. Customize workflow in `.github/workflows/mern-ci-cd.yml`

## 📊 Monitoring & Logging

### Application Monitoring
- **Health Checks**: `/api/health` and `/api/health/detailed`
- **Error Tracking**: Sentry integration for both frontend and backend
- **Performance Monitoring**: Built-in metrics collection
- **Uptime Monitoring**: Configure external monitoring services

### Logging
- **Backend**: Winston with file rotation and log levels
- **Frontend**: Console logging with environment-based levels
- **Production**: Centralized logging with structured JSON format

### Metrics Endpoints
```bash
# Health check
GET /api/health

# Detailed health with dependencies
GET /api/health/detailed

# Application metrics
GET /api/metrics
```

## 🔒 Security Features

### Backend Security
- ✅ Helmet.js for security headers
- ✅ CORS protection with whitelist
- ✅ Rate limiting (10 req/sec for API, 5 req/min for auth)
- ✅ Input validation and sanitization
- ✅ JWT token authentication
- ✅ Password hashing with bcrypt
- ✅ MongoDB injection protection
- ✅ XSS protection

### Frontend Security
- ✅ CSP (Content Security Policy) headers
- ✅ XSS protection
- ✅ CSRF protection
- ✅ Secure cookie handling
- ✅ Environment variable validation

### Infrastructure Security
- ✅ Non-root Docker containers
- ✅ SSL/TLS encryption
- ✅ Nginx security configuration
- ✅ Database connection encryption
- ✅ Secret management

## 🧪 Testing

### Backend Testing
```bash
cd server
npm test                # Run all tests
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report
```

### Frontend Testing
```bash
cd client
npm test                # Run all tests
npm run test:ui         # UI mode with Vitest
npm run coverage        # Coverage report
```

### E2E Testing
```bash
# Install Playwright (optional)
npx playwright install
npm run test:e2e
```

## 📁 Project Structure

```
mern-deployment-app/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Redux store
│   │   ├── services/      # API services
│   │   └── utils/         # Utility functions
│   ├── Dockerfile         # Frontend Docker config
│   └── nginx.conf         # Nginx configuration
├── server/                # Express.js backend
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Custom middleware
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── utils/         # Utility functions
│   │   └── tests/         # Test files
│   └── Dockerfile         # Backend Docker config
├── deployment/            # Deployment configurations
│   ├── docker-compose.yml # Docker Compose setup
│   ├── nginx.conf         # Production Nginx config
│   ├── render.yaml        # Render deployment config
│   └── vercel.json        # Vercel deployment config
├── .github/
│   └── workflows/         # GitHub Actions CI/CD
└── docs/                  # Documentation
```

## 🔧 Environment Variables

### Backend (.env)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/mern-app
NODE_ENV=development
PORT=5000

# Authentication
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d
SESSION_SECRET=your-session-secret

# External Services
SENTRY_DSN=your-sentry-dsn
CLIENT_URL=http://localhost:3000
```

### Frontend (.env)
```env
# API Configuration
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=MERN Task Manager
VITE_APP_VERSION=1.0.0

# External Services
VITE_SENTRY_DSN=your-sentry-dsn
```

## 🛠️ Development Tools

### Code Quality
- **ESLint**: Code linting with Airbnb configuration
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit checks
- **lint-staged**: Staged file linting

### Build Tools
- **Vite**: Fast frontend build tool
- **Webpack**: Asset bundling and optimization
- **Babel**: JavaScript transpilation
- **PostCSS**: CSS processing with Tailwind

### Testing Tools
- **Jest**: Backend unit testing
- **Vitest**: Frontend unit testing
- **Supertest**: API testing
- **Testing Library**: React component testing
- **Playwright**: E2E testing (optional)

## 📈 Performance Optimization

### Frontend
- ✅ Code splitting with React.lazy()
- ✅ Lazy loading of routes and components
- ✅ Image optimization and lazy loading
- ✅ Bundle analysis and tree shaking
- ✅ CDN delivery for static assets
- ✅ Service worker for caching

### Backend
- ✅ Database connection pooling
- ✅ Query optimization with indexes
- ✅ Response compression
- ✅ Caching with Redis (ready)
- ✅ Load balancing support

### Infrastructure
- ✅ Nginx caching and compression
- ✅ CDN integration ready
- ✅ Database replica sets support
- ✅ Horizontal scaling with Docker

## 🚨 Troubleshooting

### Common Issues

**Build Failures**
```bash
# Clear caches
npm run clean
rm -rf node_modules package-lock.json
npm install

# Check Node.js version
node --version  # Should be 18+
```

**Database Connection Issues**
```bash
# Check MongoDB status
mongosh --eval "db.adminCommand('ping')"

# Verify connection string
echo $MONGODB_URI
```

**Deployment Issues**
```bash
# Check logs
docker-compose logs backend
docker-compose logs frontend

# Verify environment variables
printenv | grep -E "(MONGODB_URI|JWT_SECRET)"
```

### Debug Mode
```bash
# Backend debug mode
cd server && DEBUG=app:* npm run dev

# Frontend debug mode
cd client && VITE_DEBUG=true npm run dev
```

## 📚 API Documentation

### Authentication Endpoints
```
POST /api/auth/register      # User registration
POST /api/auth/login         # User login
GET  /api/auth/me           # Get current user
PUT  /api/auth/profile      # Update profile
```

### Task Management
```
GET    /api/tasks           # Get all tasks (with filters)
POST   /api/tasks           # Create new task
GET    /api/tasks/:id       # Get specific task
PUT    /api/tasks/:id       # Update task
DELETE /api/tasks/:id       # Delete task
GET    /api/tasks/user/stats # Get user task statistics
```

### Health & Monitoring
```
GET /api/health             # Basic health check
GET /api/health/detailed    # Detailed health with dependencies
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow existing code style (ESLint + Prettier)
- Write tests for new features
- Update documentation
- Ensure CI/CD pipeline passes

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Resources

### Documentation
- [MongoDB Atlas Setup Guide](https://docs.atlas.mongodb.com/)
- [Render Deployment Guide](https://render.com/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [GitHub Actions Workflow](https://docs.github.com/en/actions)

### Learning Resources
- [MERN Stack Tutorial](https://mern-tutorial.example.com)
- [DevOps Best Practices](https://devops-guide.example.com)
- [Security Checklist](https://security-checklist.example.com)

---

**Built with ❤️ for Week 7: Deployment and DevOps Essentials** 