# Enterprise App Setup & Database Restore Guide

## 1. Prerequisites
- Node.js (v18 or v20+)
- PostgreSQL (v14+)
- npm or pnpm or yarn

---

## 2. Restore PostgreSQL Database
The full database dump is included in this zip as `database_dump.sql` (and `creed_tech_db_dump.sql`).

### Step 1: Create Database
Run in your terminal or pgAdmin:
```bash
createdb -U postgres -p 5432 creed_tech_db
```
*(Or via psql: `CREATE DATABASE creed_tech_db;`)*

### Step 2: Import Dump
```bash
psql -U postgres -p 5432 -d creed_tech_db < database_dump.sql
```

---

## 3. Configure Environment Variables
Verify `.env` has your PostgreSQL credentials:
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/creed_tech_db"
ADMIN_EMAIL="admin@creed-tech.com"
ADMIN_PASSWORD="admin123"
ADMIN_SESSION_SECRET="7d066453f978fd94beaf3d1337dc10ca125c681bf8002ed4bcaccd0d7f4cf564"
```

---

## 4. Install Dependencies & Start Application
```bash
# Install node packages
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

- Public Site: `http://localhost:3000`
- Admin Panel: `http://localhost:3000/admin`
- Admin Login:
  - **Email**: `admin@creed-tech.com`
  - **Password**: `admin123`
