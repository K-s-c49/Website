# Admin Login Guide

## How to Access the Admin Section

### Step 1: Start the Application

Make sure both the backend and frontend servers are running:

**Backend:**
```bash
cd backend
npm install  # If not already installed
npm run dev  # Starts on http://localhost:4000
```

**Frontend:**
```bash
cd frontend
npm install  # If not already installed
npm run dev  # Starts on http://localhost:5173
```

### Step 2: Seed the Database (First Time Only)

If you haven't seeded the database yet, run the seed script to create the admin user:

```bash
cd backend
npm run seed
```

This will create:
- **Admin User**: `admin@customize23.com` / `AdminPass123!`
- Sample customer users
- Sample products

### Step 3: Login as Admin

1. **Navigate to the login page:**
   - Go to: `http://localhost:5173/auth/login`
   - Or click "Sign In" in the navigation bar

2. **Enter Admin Credentials:**
   - **Email**: `admin@customize23.com`
   - **Password**: `AdminPass123!`

3. **Click "Sign In"**

4. **Access Admin Dashboard:**
   - After successful login, you'll be redirected to the home page
   - Navigate to: `http://localhost:5173/admin`
   - Or use the admin link in the navigation (if available)

### Admin Routes

Once logged in as admin, you can access:

- **Dashboard**: `/admin` - Overview of orders, products, and users
- **Products**: `/admin/products` - Manage products (create, edit, delete)
- **Orders**: `/admin/orders` - View and manage all orders
- **Users**: `/admin/users` - View and manage user accounts

### Troubleshooting

#### Can't Access Admin Routes?
- Make sure you're logged in with the admin account
- Check that your user role is `admin` (not `customer`)
- Clear browser cache and cookies, then try again
- Verify the backend is running and accessible

#### Forgot Admin Password?
- Run the seed script again: `npm run seed` (in backend directory)
- This will reset the database and recreate the admin user with default credentials

#### Database Not Connected?
- Make sure MongoDB is running
- Check your `.env` file in the backend directory
- Default MongoDB URI: `mongodb://localhost:27017/codecraftecom`

### Creating Additional Admin Users

To create additional admin users, you can:

1. **Via Seed Script**: Modify `backend/src/scripts/seed.js` and add more admin users
2. **Via API**: Use the registration endpoint, then manually update the user role in the database
3. **Via Admin Panel**: Once logged in as admin, use the Users management page (if implemented)

---

**Note**: For production, change the default admin password immediately after first login!


