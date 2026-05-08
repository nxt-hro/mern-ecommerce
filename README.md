# E-Commerce Full-Stack Application

### Note: I did this Project back when I was doing MERN Stack course.  

A complete e-commerce web application built with React.js (Vite) on the frontend and Node.js/Express with MongoDB on the backend.

## Project Structure

```
ecommerce-fullstack/
├── client/                      # React frontend (Vite)
│   ├── src/
│   │   ├── pages/              # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Sell.jsx
│   │   │   ├── Cart.jsx
│   │   │   └── Checkout.jsx
│   │   ├── components/         # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── store/              # Zustand store
│   │   │   └── cartStore.js
│   │   ├── utils/              # Utilities
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                      # Express backend
│   ├── models/                 # MongoDB models
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/                 # API routes
│   │   ├── auth.js
│   │   ├── products.js
│   │   └── orders.js
│   ├── middleware/             # Express middleware
│   │   └── authMiddleware.js
│   ├── uploads/                # Uploaded product images
│   ├── index.js                # Express server
│   ├── seed.js                 # Database seeding
│   ├── .env                    # Environment variables
│   └── package.json
│
├── package.json                # Root package.json with scripts
└── README.md
```

## Tech Stack

### Frontend

- **React.js** (Vite) - UI library
- **React Router DOM** - Routing
- **Material UI (MUI)** - UI components and styling
- **Zustand** - State management (cart)
- **Axios** - HTTP client

### Backend

- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File uploads

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas URI)
- pnpm (recommended) or npm/yarn

## Installation

### 1. Clone/Setup Repository

```bash
cd ecommerce-fullstack
```

### 2. Install Root Dependencies

```bash
pnpm install
```

This installs `concurrently` for running server and client simultaneously.

### 3. Install Server Dependencies

```bash
pnpm --prefix server install
```

### 4. Install Client Dependencies

```bash
pnpm --prefix client install
```

### 5. Create Uploads Directory

```bash
mkdir server/uploads
```

## Configuration

### Server Environment Variables

Update `server/.env` with your settings:

```env
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key_here_change_in_production
PORT=5000
```

For MongoDB Atlas, use:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
```

## Running the Application

### Development Mode (Both Client & Server)

```bash
pnpm run dev
```

This runs both the server (port 5000) and client (port 3000) concurrently.

- Server: http://localhost:5000
- Client: http://localhost:3000

### Run Only Server

```bash
pnpm run server
```

Server runs on http://localhost:5000

### Run Only Client

```bash
pnpm run client
```

Client runs on http://localhost:3000

### Seed Database

To populate the database with sample products:

```bash
pnpm run seed
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (protected, multipart/form-data)

### Orders

- `POST /api/orders` - Create order (protected)

## Features

### Pages

**1. Home Page (`/`)**

- Display all products in responsive grid
- Product cards with image, name, price, seller name
- "Add to Cart" button
- Click product to view details

**2. Register Page (`/register`)**

- Create new user account
- Email validation
- Password confirmation matching
- Redirect to login on success

**3. Login Page (`/login`)**

- User authentication
- JWT token stored in localStorage
- Error handling for invalid credentials
- Redirect to home on success

**4. Product Detail Page (`/product/:id`)**

- Large product image
- Full description, price, seller info
- Stock count display
- Quantity selector with stock validation
- Add to cart functionality

**5. Sell/Upload Page (`/sell`)** - Protected Route

- Product name, description, price
- Category dropdown (Electronics, Clothing, Books, Home, Other)
- Stock quantity input
- Image upload with Multer
- Multipart form submission

**6. Cart Page (`/cart`)**

- List all cart items with images
- Quantity adjuster (+/-)
- Remove item button
- Subtotal calculation
- Proceed to checkout button
- Empty cart message

**7. Checkout Page (`/checkout`)** - Protected Route

- Shipping form (name, email, address, city, zip)
- Order summary with items and total
- Place order button
- Clears cart after successful order

### Cart Management

- Zustand state store with persistence
- Add, remove, update quantity operations
- Cart persists in localStorage
- Badge shows item count in navbar

### Authentication

- JWT-based auth with Bearer tokens
- Protected routes for Sell and Checkout
- Secure password hashing with bcryptjs
- Auth middleware for API endpoints

### Image Uploads

- Multer handles product image uploads
- Images saved to `/server/uploads` folder
- Static file serving for image access

## Database Schema

### User

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### Product

```javascript
{
  name: String,
  description: String,
  price: Number,
  category: String (enum),
  stock: Number,
  image: String (file path),
  seller: ObjectId (ref: User),
  createdAt: Date
}
```

### Order

```javascript
{
  user: ObjectId (ref: User),
  items: [{
    product: ObjectId,
    quantity: Number,
    price: Number
  }],
  total: Number,
  shippingAddress: {
    name: String,
    email: String,
    street: String,
    city: String,
    zip: String
  },
  status: String (default: 'placed'),
  createdAt: Date
}
```

## Build for Production

### Build Client

```bash
npm run build
```

Outputs optimized files to `client/dist/`

## Troubleshooting

### MongoDB Connection Error

- Ensure MongoDB is running
- Check MONGODB_URI in `.env`
- Verify network access if using MongoDB Atlas

### Port Already in Use

- Server: Change PORT in `server/.env`
- Client: Set custom port in `client/vite.config.js`

### Image Upload Issues

- Check `/server/uploads` folder exists
- Verify multer configuration in `server/routes/products.js`
- Ensure file permissions allow writing

### CORS Errors

- Verify proxy settings in `client/vite.config.js`
- Check CORS middleware in `server/index.js`

## Future Enhancements

- Payment integration (Stripe)
- Email notifications
- Order tracking
- User reviews and ratings
- Product search and filtering
- Wishlist functionality
- Admin dashboard
- Product categories page
- Improved image handling
- Rate limiting and security enhancements

## License

ISC
