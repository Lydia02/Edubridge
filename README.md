# EduBridge User Website

## Link to the USER Application
[EduBridge User Website](https://edubridge-project.netlify.app/)
---

## Link to the  INSTRUCTOR Application

[EduBridge Instructor Website](https://edubridge-instructor.netlify.app/)
---

## Link to the  INSTRUCTOR Github-repo

[EduBridge Instructor Repo](https://github.com/Lydia02/edubridge-instructor)
---

## Table of Contents
1. [Overview](#overview)  
2. [Features](#features)  
3. [Tech Stack](#tech-stack)  
4. [Prerequisites](#prerequisites)  
5. [Installation](#installation)  
6. [Repository Structure](#repository-structure)  
7. [Usage](#usage)  
8. [API Endpoints](#api-endpoints)  
    - [Authentication](#authentication)  
    - [Courses](#courses)  
    - [Enrollment](#enrollment)  
    - [Progress Tracking](#progress-tracking)  
9. [Testing](#testing)  
10. [CI/CD Pipeline](#ci-cd-pipeline)  
11. [Contributing](#contributing)  
12. [License](#license)  
13. [Contributors](#contributors)  

---

## Overview
The **EduBridge User Website** is a user-centric platform that provides students with the ability to explore, enroll in, and take courses. It enables users to monitor their progress and engage with interactive course content. The platform prioritizes a smooth and secure experience for all learners, offering a wide range of tools to support educational growth.

---

## Features
- **User Authentication**: Register, verify email, and log in securely.  
- **Course Exploration**: Browse through a catalog of courses with detailed information.  
- **Enrollment**: Enroll in courses and access personalized dashboards.  
- **Interactive Learning**: Take courses and complete lessons online.  
- **Progress Tracking**: Monitor individual course progress through analytics.  
- **Responsive Design**: Accessible across devices, including mobile and desktop.  

---

## Tech Stack
### **Backend**
- **Fastify**: Fast and lightweight Node.js framework.  
- **Prisma ORM**: Efficient database management and schema migrations.  
- **PostgreSQL**: Scalable relational database for user and course data.  
- **JSON Web Tokens (JWT)**: Secure user sessions.  
- **Nodemailer**: Email services for notifications and verifications.  

### **Frontend**
- **HTML5 & CSS3**: Structure and styling for pages.  
- **JavaScript (ES6)**: Client-side interactivity and API integration.  
- **Bootstrap**: Responsive UI framework.  

### **Deployment Tools**
- **Render**: Backend hosting with database support.  
- **Netlify**: Frontend hosting with continuous integration.  

### **Other Tools**
- **Scheduler Service**: Automates email reminders for course activities.  
- **Error Management**: Centralized handling of API and runtime errors.  

---

## Prerequisites
- **Node.js** (v16 or higher)  
- **PostgreSQL** (for database setup)  
- **Git** (for version control)  
- **Postman** (for testing API endpoints)  

---

## Installation
### Clone the Repository
```bash
git clone https://github.com/Lydia02/Edubridge.git
cd Edubridge
```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the environment variables in `.env`:
   ```env
   DATABASE_URL="your-database-url"
   JWT_SECRET="your-secret-key"
   EMAIL_USER="your-email@gmail.com"
   EMAIL_PASS="your-email-password"
   PORT=3002
   ```
4. Run database migrations:
   ```bash
   npx prisma migrate deploy
   ```
5. (Optional) Seed the database:
   ```bash
   node prisma/seed.js
   ```
6. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Open the `index.html` file in your browser or deploy it to a hosting service like Netlify.  

---

## Repository Structure
```
Edubridge/
├── backend/
│   ├── prisma/          # Prisma schema and migrations
│   ├── src/
│   │   ├── controllers/ # API controllers
│   │   ├── routes/      # Route handlers for APIs
│   │   ├── services/    # Business logic for users, courses, etc.
│   │   ├── middlewares/ # Authentication and validation
│   │   ├── config/      # Email and JWT configurations
│   │   ├── utils/       # Utility functions for error handling
│   └── fastify.js       # Server setup
├── frontend/
│   ├── css/             # Stylesheets
│   ├── js/              # Frontend logic
│   ├── img/             # Images for the website
│   ├── html/            # Static HTML files for pages
│   └── README.md        # Project documentation
└── README.md
```

---

## Usage
### Running the Application
1. **Backend**: Start the backend server:
   ```bash
   npm run dev
   ```
   Access the API at `http://localhost:3002`.

2. **Frontend**: Open the `frontend/index.html` file in your browser or deploy it on a hosting service.

---

## API Endpoints
### Authentication
- **Signup**:  
  `POST /signup`  
  Example Request:
  ```json
  {
    "firstName": "Lydia",
    "lastName": "Ojoawo",
    "email": "example@gmail.com",
    "password": "password123",
    "role": "student"
  }
  ```

- **Login**:  
  `POST /login`  
  Example Request:
  ```json
  {
    "email": "example@gmail.com",
    "password": "password123"
  }
  ```

- **Verify Email**:  
  `POST /verify`  
  Example Request:
  ```json
  {
    "email": "example@gmail.com",
    "code": "123456"
  }
  ```

### Courses
- **Get All Courses**:  
  `GET /courses`

- **Get Single Course**:  
  `GET /courses/:id`

### Enrollment
- **Enroll in a Course**:  
  `POST /enroll`  
  Example Request:
  ```json
  {
    "userId": "123",
    "courseId": "456"
  }
  ```

- **Get User Enrollments**:  
  `GET /enrollments`

### Progress Tracking
- **Log Progress**:  
  `POST /progress`  
  Example Request:
  ```json
  {
    "userId": "123",
    "courseId": "456",
    "progress": "50%"
  }
  ```

- **Get Progress**:  
  `GET /progress`

---

## Testing
- **Authentication**:  
  Use Postman to test `/signup`, `/login`, and `/verify`.
- **Course Management**:  
  Test course-related routes for fetching and enrolling in courses.
- **Progress Tracking**:  
  Verify progress logging and retrieval using `/progress`.

---

## CI/CD Pipeline
The CI/CD pipeline uses:
- **Render** for backend hosting and database integration.  
- **Netlify** for frontend deployment.

---

## Contributing
1. Fork the repository.  
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contributors
- **Lydia Ojoawo**: [GitHub](https://github.com/Lydia02)

---




Happy Learning! 🎉
