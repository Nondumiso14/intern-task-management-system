# Intern Task Management System

## Project Overview

This is a backend system built using **Node.js, Express, and MySQL** to manage interns, tasks, and submissions.

The system implements secure authentication, role-based access control (RBAC), deadline validation, and submission status tracking.

---

## Tech Stack

- Node.js
- Express.js
- MySQL
- JWT (JSON Web Tokens)
- bcrypt (Password Hashing)
- dotenv
- cors

---

## Features

### Authentication
- User Registration (Admin / Intern)
- Secure Password Hashing using bcrypt
- Login with JWT Token Generation

### Role-Based Access Control (RBAC)
- Admin and Intern roles stored in database
- Protected routes using middleware
- Admin-only and Intern-only endpoints

### Admin Capabilities
- Create tasks
- Set deadlines
- Review submissions
- Approve or reject submissions

### Intern Capabilities
- View assigned tasks
- Submit GitHub link and description
- Submission blocked after deadline

### System Validations
- Unique email enforcement
- Password hashing (no plain text storage)
- Deadline validation
- Submission status tracking (Pending / Approved / Rejected)

---

## Project Structure


---

##  How To Run The Project

### 1️⃣ Clone Repository

```bash
git clone <https://github.com/Nondumiso14/intern-task-management-system.git>
cd intern-task-management-system

npm install

Create a .env file in the root directory:
PORT=5000
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=intern_task_db
JWT_SECRET=your_secret_key

## Start server
npm start

## Servers runs on :
http://localhost:5000

 API Endpoints
 Auth

POST /api/register

POST /api/login

## Admin

POST /api/tasks

PUT /api/submissions/:id

## Intern

GET /api/tasks

POST /api/submissions

## Workflow

Admin creates task.

Intern views task.

Intern submits GitHub link before deadline.

Submission status defaults to "Pending".

Admin approves or rejects submission.

Security Implementations

Password hashing using bcrypt

JWT authentication

Middleware-based route protection

Role-based authorization

Deadline validation at backend level

Author

Nondumiso Shange
Backend Developer (Node.js + MySQL)