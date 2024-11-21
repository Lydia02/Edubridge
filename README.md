# EduBridge User Platform

## Link to the Application
[EduBridge User Platform](https://edubridge-instructor.onrender.com)

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
    - [Enrollment and Progress](#enrollment-and-progress)  
9. [Testing](#testing)  
10. [CI/CD Pipeline](#ci-cd-pipeline)  
11. [Contributing](#contributing)  
12. [License](#license)  
13. [Contributors](#contributors)  

---

## Overview
**EduBridge User Platform** is a comprehensive web application designed for students to view, enroll in, and take courses. It includes features such as course exploration, secure user authentication, course enrollment, and progress tracking. This platform ensures a seamless learning experience for students and fosters personal development through organized educational resources.

---

## Features
- **User Authentication**: Signup, email verification, and secure login using JWT.  
- **Explore Courses**: Browse available courses and view course details.  
- **Enroll in Courses**: Students can enroll in courses to start learning.  
- **Take Courses**: Access course content in an interactive format.  
- **Progress Tracking**: Monitor learning progress with visual metrics.  
- **Responsive Design**: Optimized for all devices, ensuring a smooth user experience.  

---

## Tech Stack
### **Backend**
- **Fastify**: Lightweight and fast Node.js framework.  
- **Prisma ORM**: Database interaction and schema management.  
- **PostgreSQL**: Scalable relational database for storing user and course data.  
- **JSON Web Tokens (JWT)**: Secure session management for users.  
- **Nodemailer**: Email notifications and verification.  

### **Frontend**
- **HTML5 & CSS3**: Structure and styling.  
- **JavaScript (ES6)**: Client-side logic and API integration.  
- **Bootstrap**: Responsive and modern UI design.  

### **Deployment Tools**
- **Render**: Backend hosting and database integration.  
- **Netlify**: Frontend hosting with continuous delivery.  

---

## Prerequisites
- **Node.js** (v16 or higher)  
- **PostgreSQL** (for backend database)  
- Postman or any REST API testing tool for testing endpoints.  

---

## Installation
### Clone the Repository
```bash
git clone https://github.com/Lydia02/EduBridge-User.git
cd EduBridge-User
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
3. Configure the environment variables in the `.env` file:
   ```env
   DATABASE_URL="your-database-url"
   JWT_SECRET="your-jwt-secret"
   EMAIL_USER="your-email@gmail.com"
   EMAIL_PASS="your-email-password"
   PORT=3002
   ```
4. Run database migrations:
   ```bash
   npx prisma migrate deploy
   ```
5. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies (if applicable):
   ```bash
   npm install
   ```

---

## Repository Structure
```
EduBridge-User/
├── backend/
│   ├── prisma/          # Prisma schema and migrations
│   ├── src/
│   │   ├── controllers/ # Controllers for user, course, and progress logic
│   │   ├── routes/      # API endpoints
│   │   ├── services/    # Business logic
│   │   ├── config/      # Configuration for email and JWT
│   └── fastify.js       # Fastify server setup
├── frontend/
│   ├── css/             # Stylesheets
│   ├── js/              # Frontend logic and API integration
│   ├── signup.html      # Signup page
│   ├── login.html       # Login page
│   ├── courses.html     # Courses listing
│   ├── dashboard.html   # User dashboard
└── README.md
```

---

## Usage
### Running the Application
1. **Backend**: Navigate to the backend directory and start the server:
   ```bash
   npm run dev
   ```
   The backend will be accessible at `http://localhost:3002`.

2. **Frontend**: Open the `frontend/signup.html` file in your browser to start interacting with the application.

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
    "email": "lydia@example.com",
    "password": "password123",
    "role": "student"
  }
  ```

- **Login**:  
  `POST /login`  
  Example Request:
  ```json
  {
    "email": "lydia@example.com",
    "password": "password123"
  }
  ```

- **Email Verification**:  
  `POST /verify`  
  Example Request:
  ```json
  {
    "email": "lydia@example.com",
    "code": "123456"
  }
  ```

### Courses
- **Get All Courses**:  
  `GET /courses`

- **Get Course by ID**:  
  `GET /courses/:id`

### Enrollment and Progress
- **Enroll in a Course**:  
  `POST /enroll`  
  Example Request:
  ```json
  {
    "courseId": "course123",
    "userId": "user123"
  }
  ```

- **Get User Progress**:  
  `GET /progress?userId=user123`

---

## Testing
### Authentication
Use Postman or a similar tool to test `/signup`, `/login`, and `/verify` endpoints.

### Courses
Verify course retrieval with `/courses` and `/courses/:id`.

### Progress
Ensure progress tracking is functional by testing `/progress`.

---

## CI/CD Pipeline
The CI/CD pipeline uses:
- **Render** for hosting the backend with database integration.
- **Netlify** for deploying the frontend.

---

## Contributing
Contributions are welcome!  
1. Fork the repository.  
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push your branch:
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
