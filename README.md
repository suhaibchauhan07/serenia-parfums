# Serenia Parfums - Premium E-commerce Website

A modern, full-stack luxury perfume e-commerce application built with React, Node.js, and Supabase.

## Tech Stack
- **Frontend:** React (Vite), Tailwind CSS, Framer Motion, Lucide React
- **Backend:** Node.js, Express.js
- **Database:** Supabase (PostgreSQL)
- **Auth:** JWT (JSON Web Tokens)

## Project Structure
```
├── backend/            # Express server and API logic
│   ├── config/         # Supabase client config
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Auth and Admin middlewares
│   ├── routes/         # API routes
│   └── server.js       # Entry point
├── frontend/           # React application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── context/    # Auth and Cart state
│   │   ├── layouts/    # Page layouts
│   │   ├── pages/      # Application pages
│   │   └── services/   # API service (Axios)
└── setup.sql           # Database schema and dummy data
```

## Setup Instructions

### 1. Database Setup (Supabase)
1. Create a new project on [Supabase](https://supabase.com/).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Copy the contents of `setup.sql` and run it to create the tables and insert dummy data.

### 2. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder and add your Supabase credentials:
   ```env
   PORT=5000
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_anon_key
   JWT_SECRET=your_secret_key
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Admin Access
- **Demo Credentials for Mock Server:**
  - Admin: `admin@sereniaparfums.com` / `admin123`
  - Customer: `customer@sereniaparfums.com` / `customer123`
- To access the admin panel using Supabase backend, register a new user or use an existing one.
- Manually change the `role` from `'customer'` to `'admin'` in the `users` table via the Supabase dashboard for the desired user.
- Navigate to `/admin/login` to sign in as an admin.

## Features
- **Customer Panel:** Hero slider, product grid, filtering, searching, cart system, user authentication, and profile.
- **Admin Panel:** Dashboard statistics, product CRUD operations, inventory management.
- **Security:** Protected routes for both customers and admins using JWT.
