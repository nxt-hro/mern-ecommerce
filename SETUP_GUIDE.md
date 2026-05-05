# E-Commerce Application - Setup Guide

All dependencies have been installed! Follow these steps to run your application.

## ✅ Installation Status

### Root Directory
- ✓ `concurrently` - Installed (runs server and client simultaneously)

### Server Directory (`/server`)
- ✓ `express` - Framework for building the API
- ✓ `mongoose` - MongoDB ODM
- ✓ `cors` - Cross-Origin Resource Sharing
- ✓ `dotenv` - Environment variable management
- ✓ `bcryptjs` - Password hashing
- ✓ `jsonwebtoken` - JWT authentication
- ✓ `multer` - File upload handling
- ✓ `nodemon` - Development server auto-restart

### Client Directory (`/client`)
- ✓ `react` - UI library
- ✓ `react-router-dom` - Client-side routing
- ✓ `vite` - Build tool and dev server
- ✓ `axios` - HTTP client
- ✓ `zustand` - State management
- ✓ `@mui/material` - Material Design components
- ✓ `@vitejs/plugin-react` - React support in Vite

---

## 🚀 Step-by-Step Setup

### Step 1: Configure MongoDB Connection

Edit `/server/.env` and set your MongoDB connection string:

```bash
# Open the file:
cat /vercel/share/v0-project/server/.env

# Edit it with your MongoDB URI:
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/ecommerce
JWT_SECRET=your_secret_key_here
```

**Options for MongoDB:**
- **MongoDB Atlas** (Cloud): [mongdb.com/cloud](https://mongodb.com/cloud) - Free tier available
- **Local MongoDB**: If installed locally, use `mongodb://localhost:27017/ecommerce`

### Step 2: Seed the Database (Optional)

This populates the database with sample products:

```bash
cd /vercel/share/v0-project
pnpm run seed
```

Output will show:
```
✓ Database connected
✓ 6 sample products created
```

### Step 3: Start the Application

From the root directory, run both server and client simultaneously:

```bash
cd /vercel/share/v0-project
pnpm run dev
```

This will:
- Start the backend on `http://localhost:5000`
- Start the frontend on `http://localhost:5173`
- Both run in the same terminal with color-coded output

**Alternative: Run Separately**

If you want to run them in separate terminals:

Terminal 1 - Start Server:
```bash
cd /vercel/share/v0-project/server
pnpm run dev
```

Terminal 2 - Start Client:
```bash
cd /vercel/share/v0-project/client
pnpm run dev
```

---

## 🌐 Access Your Application

Once running, open your browser and visit:

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

---

## 📱 Features to Test

### 1. **User Registration**
- Click "Register" on the home page
- Create a new account with email and password
- Password is hashed with bcryptjs for security

### 2. **User Login**
- Log in with your registered credentials
- JWT token is stored in localStorage
- Token is sent with each API request

### 3. **Browse Products**
- View all products on the home page
- Click on a product to see detailed information
- See price, description, seller, and reviews

### 4. **Add to Cart**
- Click "Add to Cart" on any product
- Cart updates in real-time
- Cart badge shows number of items

### 5. **Shopping Cart**
- Go to Cart page to see all items
- Update quantities or remove items
- See total price calculation

### 6. **Checkout**
- Enter shipping address
- Review order summary
- Place order (saves to database)

### 7. **Sell a Product** (Requires Login)
- Navigate to "Sell" page
- Fill in product details
- Upload a product image
- Product appears in the marketplace

---

## 📂 Project Structure

```
/vercel/share/v0-project/
├── server/                    # Express Backend
│   ├── models/
│   │   ├── User.js           # User schema with password hashing
│   │   ├── Product.js        # Product schema
│   │   └── Order.js          # Order schema
│   ├── routes/
│   │   ├── auth.js           # Login/Register endpoints
│   │   ├── products.js       # Product CRUD endpoints
│   │   └── orders.js         # Order endpoints
│   ├── middleware/
│   │   └── authMiddleware.js # JWT verification
│   ├── uploads/              # Uploaded product images
│   ├── index.js              # Express server setup
│   ├── seed.js               # Database seeding script
│   └── package.json
│
├── client/                    # React Frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx      # Product listing
│   │   │   ├── Login.jsx     # Login form
│   │   │   ├── Register.jsx  # Registration form
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Sell.jsx      # Product upload
│   │   │   ├── Cart.jsx      # Shopping cart
│   │   │   └── Checkout.jsx  # Order checkout
│   │   ├── components/
│   │   │   ├── Navbar.jsx    # Navigation bar
│   │   │   ├── ProductCard.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── store/
│   │   │   └── cartStore.js  # Zustand cart state
│   │   ├── utils/
│   │   │   └── api.js        # Axios instance
│   │   ├── App.jsx           # Main app component
│   │   ├── main.jsx          # Entry point
│   │   └── style.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── package.json              # Root scripts
├── README.md                 # Full documentation
└── SETUP_GUIDE.md           # This file
```

---

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (requires auth)

### Orders
- `POST /api/orders` - Create order (requires auth)
- `GET /api/orders` - Get user's orders (requires auth)

---

## 🛠️ Troubleshooting

### "Cannot find module" errors
- Make sure all dependencies are installed: `pnpm install` in root, server, and client directories

### MongoDB connection fails
- Check your `.env` file has correct `MONGODB_URI`
- Ensure MongoDB is running (if using local)
- Check internet connection (if using MongoDB Atlas)

### Port already in use
- Change ports in:
  - **Server**: `server/index.js` (look for `5000`)
  - **Client**: `client/vite.config.js` (look for `5173`)

### JWT token issues
- Clear localStorage: `localStorage.clear()` in browser console
- Log out and log back in

### Image upload not working
- Check `server/uploads/` directory exists
- Ensure server has write permissions

---

## 📚 Learn More

- **Express**: [expressjs.com](https://expressjs.com)
- **MongoDB**: [mongodb.com](https://mongodb.com)
- **React**: [react.dev](https://react.dev)
- **Vite**: [vitejs.dev](https://vitejs.dev)
- **Zustand**: [github.com/pmndrs/zustand](https://github.com/pmndrs/zustand)
- **Material-UI**: [mui.com](https://mui.com)

---

## ✨ Next Steps

Once everything is running:
1. Create a test account
2. Browse and add products to cart
3. Try uploading a product
4. Complete a checkout
5. Explore the code structure

Happy coding! 🚀
