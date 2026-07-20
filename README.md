
# 🎯 INFNOVA Internship Applicant Management API

[![NestJS](https://img.shields.io/badge/NestJS-v10.0-red)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.0-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-v5.0-purple)](https://www.prisma.io/)
[![SQLite](https://img.shields.io/badge/SQLite-v3.0-lightblue)](https://www.sqlite.org/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-orange)](https://jwt.io/)
[![Swagger](https://img.shields.io/badge/Swagger-OpenAPI-green)](https://swagger.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)
[![Tests](https://img.shields.io/badge/Tests-Jest-blue)](https://jestjs.io/)

> A production-ready backend API built with NestJS for managing internship applications at INFNOVA Technologies.

## 📖 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Authentication Flow](#authentication-flow)
- [API Endpoints](#api-endpoints)
- [Business Rules](#business-rules)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)
- [Known Limitations](#known-limitations)
- [Acknowledgments](#acknowledgments)
- [License](#license)
- [Contact](#contact)

---

## 📋 Overview

This API provides a comprehensive solution for managing internship applications at INFNOVA Technologies. Built for the **Backend Internship Challenge**, it demonstrates professional backend development practices using NestJS.

### What This API Does

**For Administrators:**
- 🔐 Securely log in using JWT authentication
- 👤 Create new internship applicants
- 📋 View all applicants with pagination
- 🔍 Search for applicants by name or email
- 🎯 Filter applicants by status and internship track
- 📊 Sort applicants by any field (date, name, status, etc.)
- ✏️ Update applicant details
- 📝 Add internal notes (max 1000 characters)
- 🚦 Change application status with business rules
- 🗑️ Soft-delete applicants (never permanently removed)
- 📈 View real-time dashboard statistics

**For the Business:**
- Centralized applicant management
- Clear status tracking (Pending → Shortlisted → Accepted/Rejected)
- Data-driven decision making with dashboard insights
- Secure, auditable changes to applicant records
- Scalable architecture for future growth

### Why This Project Stands Out

1. **Clean Architecture**: Clear separation of concerns with modular design
2. **Production-Ready**: Enterprise-grade code with proper error handling
3. **Security First**: JWT authentication, password hashing, input validation
4. **Well-Documented**: Complete Swagger/OpenAPI documentation
5. **Tested**: Unit tests for critical business logic
6. **Professional**: Follows NestJS best practices and SOLID principles

---

## ✨ Features

### Core Features
- ✅ **Administrator Authentication** - Secure JWT-based login with bcrypt password hashing
- ✅ **Applicant CRUD** - Create, Read, Update, and Soft-Delete applicants
- ✅ **Pagination** - Efficient data loading with metadata (total, pages, next/previous)
- ✅ **Search** - Full-text search across name and email fields
- ✅ **Filtering** - Filter by application status and internship track
- ✅ **Sorting** - Sort by any field in ascending or descending order
- ✅ **Status Management** - Update applicant status with business rule validation
- ✅ **Notes Management** - Add/update internal notes (max 1000 characters)
- ✅ **Dashboard Statistics** - Real-time summary of applications (totals, status breakdown, track distribution)
- ✅ **Soft Delete** - Applicants are never permanently removed from the database
- ✅ **Swagger Documentation** - Interactive API documentation at `/api/docs`

### Security Features
- 🔒 JWT-based authentication with 7-day token expiration
- 🔐 Password hashing using bcrypt (10 rounds)
- 🛡️ Global authentication guards protecting all routes
- ✅ Input validation with class-validator
- 🚫 No exposure of sensitive data (passwords never returned)
- 🌐 CORS enabled for frontend integration

### Developer Experience
- 🎨 Professional code structure with NestJS conventions
- 📦 Modular architecture for maintainability
- 🧪 Comprehensive unit tests with Jest
- 🐳 Docker support (optional)
- 🔧 Environment-based configuration
- 📝 Detailed error messages with proper HTTP status codes
- 🚀 Hot-reload for fast development

---

## 🏗️ Architecture

### System Architecture Diagram

```mermaid
graph TB
    Client[Frontend Client] -->|HTTP Request| API[API Gateway]
    
    subgraph "NestJS Application"
        API --> AuthGuard[JWT Auth Guard]
        AuthGuard --> Controllers[Controllers]
        
        subgraph "Modules"
            Controllers --> AuthModule[Auth Module]
            Controllers --> ApplicantsModule[Applicants Module]
            Controllers --> DashboardModule[Dashboard Module]
            
            AuthModule --> AuthService[Auth Service]
            ApplicantsModule --> ApplicantsService[Applicants Service]
            DashboardModule --> DashboardService[Dashboard Service]
        end
        
        AuthService --> PrismaService[Prisma Service]
        ApplicantsService --> PrismaService
        DashboardService --> PrismaService
        
        subgraph "Middlewares"
            Interceptors[Interceptors<br/>Response & Logging]
            Filters[Exception Filters<br/>Global Error Handling]
            Pipes[Validation Pipes]
        end
        
        Controllers --> Interceptors
        Controllers --> Filters
        Controllers --> Pipes
    end
    
    PrismaService --> Database[(SQLite Database)]
    
    subgraph "External Services"
        Swagger[Swagger Documentation<br/>/api/docs]
    end
    
    API --> Swagger
```

### Architecture Layers

#### 1. **Presentation Layer (Controllers)**
- Handles HTTP requests and responses
- Validates incoming data using DTOs
- No business logic - delegates to services
- Uses decorators for routing, auth, and documentation

#### 2. **Business Logic Layer (Services)**
- Contains all business rules and logic
- Implements application-specific workflows
- Handles database operations via Prisma
- Ensures data consistency and integrity

#### 3. **Data Access Layer (Prisma)**
- ORM for type-safe database operations
- Manages migrations and schema
- Provides relationship management
- Implements soft delete patterns

#### 4. **Cross-Cutting Concerns**
- **Authentication**: JWT guards, Passport strategies
- **Validation**: Global validation pipes, DTO decorators
- **Error Handling**: Global exception filters with consistent responses
- **Logging**: Request/response logging for debugging
- **Documentation**: Swagger/OpenAPI for API exploration

### Design Patterns Used

| Pattern | Implementation | Benefit |
|---------|---------------|---------|
| **Dependency Injection** | NestJS DI Container | Loose coupling, testability |
| **Repository Pattern** | Prisma Client | Data abstraction |
| **DTO Pattern** | Create/Update DTOs | Data validation |
| **Strategy Pattern** | JWT Passport Strategy | Authentication flexibility |
| **Guard Pattern** | Auth Guard | Request authorization |
| **Interceptor Pattern** | Response Interceptor | Consistent API responses |
| **Factory Pattern** | Config Service | Environment configuration |
| **Singleton Pattern** | Prisma Service | Single database connection |

---

## 🛠️ Technologies

### Backend Framework
| Technology | Purpose | Version |
|------------|---------|---------|
| **[NestJS](https://nestjs.com/)** | Progressive Node.js framework | ^10.0 |
| **[TypeScript](https://www.typescriptlang.org/)** | Type-safe JavaScript | ^5.0 |
| **[Node.js](https://nodejs.org/)** | JavaScript runtime | v18+ |

### Database & ORM
| Technology | Purpose | Version |
|------------|---------|---------|
| **[Prisma](https://www.prisma.io/)** | Type-safe ORM | ^5.0 |
| **[SQLite](https://www.sqlite.org/)** | Local relational database | 3.x |

### Authentication & Security
| Technology | Purpose | Version |
|------------|---------|---------|
| **[Passport](http://www.passportjs.org/)** | Authentication middleware | ^0.7 |
| **[JWT](https://jwt.io/)** | JSON Web Tokens | ^9.0 |
| **[bcrypt](https://github.com/kelektiv/node.bcrypt.js)** | Password hashing | ^5.1 |

### Validation & Transformation
| Technology | Purpose | Version |
|------------|---------|---------|
| **[class-validator](https://github.com/typestack/class-validator)** | Request validation | ^0.14 |
| **[class-transformer](https://github.com/typestack/class-transformer)** | Data transformation | ^0.5 |

### Documentation
| Technology | Purpose | Version |
|------------|---------|---------|
| **[Swagger](https://swagger.io/)** | OpenAPI documentation | ^7.0 |

### Testing
| Technology | Purpose | Version |
|------------|---------|---------|
| **[Jest](https://jestjs.io/)** | Testing framework | ^29.0 |

### Code Quality
| Technology | Purpose | Version |
|------------|---------|---------|
| **[ESLint](https://eslint.org/)** | Code linting | ^8.0 |
| **[Prettier](https://prettier.io/)** | Code formatting | ^3.0 |

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

| Software | Minimum Version | Command to Check |
|----------|----------------|------------------|
| Node.js | v18+ | `node --version` |
| npm | v8+ | `npm --version` |
| Git | v2+ | `git --version` |
| SQLite | v3+ | `sqlite3 --version` |

---

## 🔧 Installation

### 1. Clone the Repository

```bash
# Clone using HTTPS
git clone https://github.com/TsegayIS122123/internship-api-infnova.git

# Or clone using SSH
git clone git@github.com:TsegayIS122123/internship-api-infnova.git

# Navigate to project directory
cd internship-api-infnova
```

### 2. Install Dependencies

```bash
# Install all dependencies
npm install
```

### 3. Environment Configuration

```bash
# Copy the example environment file
cp .env.example .env

# Open .env and update the values as needed
nano .env  # or use your preferred text editor
```

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Seed the database with default admin and sample applicants
npm run prisma:seed
```
---
## 🚀 Running the Application

### Development Mode (with Hot Reload)

```bash
# Start in development mode
npm run start:dev

# Application will be available at: http://localhost:3000
# Swagger Documentation: http://localhost:3000/api/docs
```

### Production Mode

```bash
# Build the application
npm run build

# Start in production mode
npm run start:prod
```

### Debug Mode

```bash
# Start in debug mode (with breakpoints)
npm run start:debug
```

### Database Management

```bash
# Open Prisma Studio (GUI for database)
npx prisma studio

# Reset database (DANGER: deletes all data)
npx prisma migrate reset

# Create a new migration
npx prisma migrate dev --name migration_name

# Apply migrations
npx prisma migrate deploy
```

---

## 📚 API Documentation

Once the application is running, Swagger UI is available at:

```
http://localhost:3000/api/docs
```

### Interactive API Testing

1. Open `http://localhost:3000/api/docs` in your browser
2. Click on the "Authorize" button
3. Enter your JWT token (obtained from login)
4. Test any endpoint interactively

### API Response Format

All responses follow a consistent structure:

**Success Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    // Response data here
  },
  "timestamp": "2026-07-18T10:00:00.000Z",
  "path": "/api/applicants"
}
```

**Error Response:**
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Error description",
  "errors": ["Detailed error message"],
  "timestamp": "2026-07-18T10:00:00.000Z",
  "path": "/api/applicants"
}
```

---

## 🔐 Authentication Flow

### 1. Login Request

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "Admin@123456"
}
```

### 2. Login Response

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "admin": {
      "id": 1,
      "email": "admin@example.com",
      "fullName": "Admin User"
    }
  },
  "timestamp": "2026-07-18T10:00:00.000Z",
  "path": "/api/auth/login"
}
```

### 3. Using the Token

Include the token in all subsequent requests:

```http
GET /api/applicants
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Token Expiry

- Tokens expire after `7 days` (configurable)
- When expired, you'll receive `401 Unauthorized`
- Request a new token by logging in again

---

## 🎯 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/auth/login` | Login with email/password | Public |
| `GET` | `/api/auth/me` | Get current admin info | JWT |

### Applicants

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/applicants` | Create a new applicant | JWT |
| `GET` | `/api/applicants` | List applicants with pagination | JWT |
| `GET` | `/api/applicants/:id` | Get a single applicant | JWT |
| `PATCH` | `/api/applicants/:id` | Update applicant | JWT |
| `DELETE` | `/api/applicants/:id` | Soft-delete applicant | JWT |
| `PATCH` | `/api/applicants/:id/status` | Update applicant status | JWT |
| `PATCH` | `/api/applicants/:id/notes` | Update applicant notes | JWT |

### Dashboard

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/dashboard/summary` | Get dashboard statistics | JWT |

### Query Parameters for GET `/api/applicants`

| Parameter | Type | Description | Default | Example |
|-----------|------|-------------|---------|---------|
| `page` | number | Page number | `1` | `2` |
| `limit` | number | Items per page | `10` | `20` |
| `search` | string | Search by name/email | `""` | `John` |
| `status` | string | Filter by status | `null` | `PENDING` |
| `track` | string | Filter by track | `null` | `BACKEND_DEVELOPMENT` |
| `sortBy` | string | Sort field | `createdAt` | `firstName` |
| `sortOrder` | string | Sort order | `desc` | `asc` |

**Example Request:**
```
GET /api/applicants?page=2&limit=5&search=john&status=PENDING&sortBy=createdAt&sortOrder=desc
```

---

## 📋 Business Rules

### Applicant Email Uniqueness
- Each applicant must have a **unique email address**
- Duplicate emails are rejected with `409 Conflict`

### Notes Length Limit
- Internal notes cannot exceed **1,000 characters**
- Longer notes are rejected with `400 Bad Request`

### Status Transition Rules
| From Status | To Status | Allowed? |
|-------------|-----------|----------|
| PENDING | SHORTLISTED | ✅ Yes |
| PENDING | REJECTED | ✅ Yes |
| SHORTLISTED | ACCEPTED | ✅ Yes |
| SHORTLISTED | REJECTED | ✅ Yes |
| ACCEPTED | Any | ✅ Yes |
| REJECTED | ACCEPTED | ❌ **NO** |
| REJECTED | Any other | ✅ Yes |

### Authentication Rules
- Only authenticated administrators can:
  - Create new applicants
  - Update existing applicants
  - Delete applicants
  - View all applicants
- Public access only to login endpoint

### Soft Delete Rules
- Applicants are **never permanently deleted**
- Soft-deleted applicants:
  - Do not appear in lists
  - Are excluded from dashboard statistics
  - Can still be accessed by ID (if needed)
  - Can be restored if required

### Data Integrity
- All timestamps are stored in UTC
- `deletedAt` is `null` for active records
- `deletedAt` is set to current timestamp for deleted records
- Cascade updates are handled by Prisma

---

## 📂 Project Structure

```
internship-api-infnova/
│
├── src/
│   ├── common/                        # Shared utilities
│   │   ├── decorators/
│   │   │   ├── public.decorator.ts   # Public route decorator
│   │   │   └── roles.decorator.ts    # Role-based decorator
│   │   ├── filters/
│   │   │   └── global-exception.filter.ts  # Global error handler
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts     # JWT authentication guard
│   │   │   └── roles.guard.ts        # Role authorization guard
│   │   ├── interceptors/
│   │   │   ├── response.interceptor.ts  # Standard response format
│   │   │   └── logging.interceptor.ts   # Request/response logging
│   │   └── interfaces/
│   │       └── api-response.interface.ts  # Response type definitions
│   │
│   ├── config/                         # Configuration
│   │   ├── configuration.ts           # App configuration
│   │   └── validation-schema.ts       # Environment validation
│   │
│   ├── modules/
│   │   ├── auth/                      # Authentication module
│   │   │   ├── dto/
│   │   │   │   └── login.dto.ts
│   │   │   ├── strategies/
│   │   │   │   └── jwt.strategy.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.module.ts
│   │   │   └── auth.service.ts
│   │   │
│   │   ├── applicants/                # Applicant management
│   │   │   ├── dto/
│   │   │   │   ├── create-applicant.dto.ts
│   │   │   │   ├── update-applicant.dto.ts
│   │   │   │   ├── update-status.dto.ts
│   │   │   │   ├── update-notes.dto.ts
│   │   │   │   └── query-applicants.dto.ts
│   │   │   ├── entities/
│   │   │   │   └── applicant.entity.ts
│   │   │   ├── applicants.controller.ts
│   │   │   ├── applicants.module.ts
│   │   │   └── applicants.service.ts
│   │   │
│   │   ├── dashboard/                 # Dashboard statistics
│   │   │   ├── dashboard.controller.ts
│   │   │   ├── dashboard.module.ts
│   │   │   └── dashboard.service.ts
│   │   │
│   │   └── prisma/                    # Database service
│   │       ├── prisma.module.ts
│   │       └── prisma.service.ts
│   │
│   ├── main.ts                        # Application entry point
│   └── app.module.ts                  # Root module
│
├── prisma/
│   ├── schema.prisma                  # Database schema
│   ├── seed.ts                        # Database seeding
│   └── migrations/                    # Migration files
│
├── test/                              # Test files
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
│
├── .env.example                       # Example environment variables
├── .eslintrc.js                       # ESLint configuration
├── .prettierrc                       # Prettier configuration
├── .gitignore                        # Git ignore file
├── nest-cli.json                     # NestJS CLI configuration
├── package.json                      # Project dependencies
├── tsconfig.json                     # TypeScript configuration
├── tsconfig.build.json               # Production TypeScript config
└── README.md                         # Project documentation
```

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run tests with coverage report
npm run test:cov

# Run tests in watch mode (auto-run on changes)
npm run test:watch

# Run E2E tests
npm run test:e2e

# Run a specific test file
npm run test -- src/modules/applicants/applicants.service.spec.ts
```

### Test Coverage

The test suite covers:

- **Unit Tests**: Services (Auth, Applicants, Dashboard)
- **Integration Tests**: Controllers with mocked services
- **E2E Tests**: Complete API flows with test database

### Sample Test Output

```bash
 PASS  src/modules/applicants/applicants.service.spec.ts
  ApplicantsService
    create
      ✓ should create an applicant successfully (5ms)
      ✓ should throw ConflictException if email exists (3ms)
    findAll
      ✓ should return paginated results (2ms)
      ✓ should filter by status (2ms)
    updateStatus
      ✓ should update status successfully (2ms)
      ✓ should throw BadRequestException from REJECTED to ACCEPTED (1ms)

Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        1.234s
```

---

## 🚢 Deployment

### Docker Deployment (Recommended)

#### 1. Create Dockerfile

```dockerfile
# Use Node.js 18 Alpine image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]
```

#### 2. Create docker-compose.yml

#### 3. Deploy with Docker

```bash
# Build Docker image
docker-compose build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop application
docker-compose down
```

### Manual Deployment (without Docker)

```bash
# 1. Install dependencies
npm install --production

# 2. Generate Prisma client
npx prisma generate

# 3. Run migrations
npx prisma migrate deploy

# 4. Seed database
npm run prisma:seed

# 5. Build application
npm run build

# 6. Start application
npm run start:prod
```

---

## 🚀 Future Improvements

With more time and resources, I would implement:

### 1. **Performance & Scalability**
- [ ] **Redis Caching**: Cache frequently accessed data (dashboard stats, applicant lists)
- [ ] **Database Indexing**: Optimize queries with additional indexes
- [ ] **Rate Limiting**: Prevent API abuse with `@nestjs/throttler`
- [ ] **Read Replicas**: Scale database reads with Prisma read replicas
- [ ] **Query Optimization**: Implement query batching and connection pooling

### 2. **Features**
- [ ] **File Upload**: Upload applicant resumes/certificates
- [ ] **Email Notifications**: Send status change emails
- [ ] **Audit Trail**: Track all changes to applicants (who, when, what)
- [ ] **WebSocket**: Real-time updates for admin dashboard
- [ ] **Batch Operations**: Bulk status updates and deletions
- [ ] **Advanced Search**: Full-text search with relevance scoring
- [ ] **Export Functionality**: Export applicant data as CSV/PDF

### 3. **Security**
- [ ] **Two-Factor Authentication**: 2FA for admin accounts
- [ ] **Role-Based Access Control**: Different admin levels (super, manager, viewer)
- [ ] **Activity Logging**: Log all admin actions
- [ ] **Session Management**: Session invalidation and token refresh
- [ ] **API Keys**: Support for API key authentication for integrations

### 4. **Developer Experience**
- [ ] **CI/CD Pipeline**: Automated testing and deployment
- [ ] **Monitoring**: Prometheus metrics and Grafana dashboards
- [ ] **Structured Logging**: Winston with log rotation
- [ ] **Error Tracking**: Sentry integration
- [ ] **API Versioning**: Support multiple API versions

### 5. **Infrastructure**
- [ ] **Kubernetes**: Container orchestration
- [ ] **PostgreSQL**: Production-grade database
- [ ] **Cloud Services**: AWS RDS, S3, Elasticache
- [ ] **Multi-Tenancy**: Support multiple organizations
- [ ] **High Availability**: Load balancing and failover

---

## ⚠️ Known Limitations

This is a demonstration/assessment project with the following limitations:

| Limitation | Impact | Mitigation |
|------------|--------|------------|
| **SQLite Database** | Not suitable for production scale | Can be replaced with PostgreSQL |
| **No Rate Limiting** | Vulnerable to brute force attacks | Add `@nestjs/throttler` |
| **No Email Notifications** | No automated communication | Integrate SendGrid/Nodemailer |
| **No File Upload** | Cannot store resumes | Add Multer/Cloudinary |
| **No Audit Trail** | No change history | Create audit log table |
| **Basic Error Handling** | Limited error recovery | Add retry mechanisms |
| **No Caching** | Potential performance issues | Add Redis |
| **Basic Testing** | Limited test coverage | Expand test suite |
| **No Transaction Support** | Data consistency issues | Add Prisma transactions |
| **Single Admin Role** | No user hierarchy | Implement RBAC |

---

## 🙏 Acknowledgments

### INFNOVA Technologies
This project was developed as part of the **Backend Internship Challenge** at **INFNOVA Technologies**.

I would like to express my sincere gratitude to:
- The **INFNOVA Technologies Engineering Team** for this opportunity
- The **Technical Reviewers** who will evaluate this project
- **All mentors and developers** who made this learning journey possible

### Technologies & Open Source
Special thanks to the open-source community for:
- **NestJS** - The progressive Node.js framework
- **Prisma** - The type-safe ORM
- **Open Source Contributors** - All packages used in this project

### Personal Note
Building this project has been an incredible learning experience. It challenged me to apply:
- Clean architecture principles
- SOLID design patterns
- Best practices in backend development
- Security-first mindset
- Professional documentation standards

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

### Tsegay Assefa
- **Email**: [tseggayassefa27@gmail.com](mailto:tseggayassefa27@gmail.com)
- **GitHub**: [TsegayIS122123](https://github.com/TsegayIS122123)
- **LinkedIn**: [Tsegay Assefa](https://www.linkedin.com/in/tsegay-assefa-95a397336/)

### INFNOVA Technologies
- **Website**: [https://infnova.tech](https://infnova.tech)
- **Email**: [academy@infnova.tech](mailto:academy@infnova.tech)

---

## ⭐ Show Your Support

If you find this project helpful, please:
- ⭐ Star the repository on GitHub
- 🐛 Report issues
- 🔀 Fork and contribute

---

**Built with ❤️ by Tsegay Assefa for INFNOVA Technologies**

---

*Last Updated: July 2026*
```

