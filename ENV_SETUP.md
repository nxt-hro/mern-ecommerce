# 🔐 Environment Configuration

## Current Status

Your `server/.env` file is already created with default settings:

```
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key_here_change_in_production
PORT=5000
```

## What You Need to Do

### Option 1: Use Local MongoDB (Quick Testing)

If you have MongoDB installed locally:

**Current .env is perfect for local development!**

Just start MongoDB and run:
```bash
cd /vercel/share/v0-project
pnpm run dev
```

### Option 2: Use MongoDB Atlas (Cloud) - RECOMMENDED

Best for beginners - no installation needed!

#### Step 1: Create MongoDB Atlas Account
1. Go to [mongodb.com/cloud](https://mongodb.com/cloud)
2. Click "Try Free"
3. Sign up with email/Google/GitHub

#### Step 2: Create a Cluster
1. Choose free tier "M0"
2. Select your region (closest to you)
3. Click "Create"
4. Wait for cluster to be created (2-3 minutes)

#### Step 3: Get Connection String
1. Click "Connect" button on your cluster
2. Choose "Drivers"
3. Select "Node.js" as driver
4. Copy the connection string

#### Step 4: Update .env File

Edit `/vercel/share/v0-project/server/.env`

Replace this line:
```
MONGODB_URI=mongodb://localhost:27017/ecommerce
```

With your MongoDB Atlas connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
```

**Important:**
- Replace `username` with your MongoDB username
- Replace `password` with your MongoDB password
- Keep `ecommerce` as the database name (or change it)

#### Step 5: Add Your IP Address to MongoDB Atlas

1. In MongoDB Atlas, go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0) - for development
4. Click "Confirm"

**Note:** For production, you'd restrict this to your server's IP

### Option 3: Change Default JWT Secret

The JWT secret is used to sign authentication tokens. For production:

1. Generate a secure random string
2. Update `JWT_SECRET` in `server/.env`

Example secure secret:
```
JWT_SECRET=a7f2c8e9k1m4p6r9s2t5v8w1x4y7z0a3b6c9d2e5f8g1h4k7m0n3p6r9s2t5
```

Or run in terminal to generate one:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## File Locations

### Environment File
```
/vercel/share/v0-project/server/.env
```

### Example with MongoDB Atlas
```env
MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.abcde.mongodb.net/ecommerce?retryWrites=true&w=majority
JWT_SECRET=your_secure_secret_key_here_change_this
PORT=5000
```

### Example with Local MongoDB
```env
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key_here_change_in_production
PORT=5000
```

---

## Verify Your Setup

After configuring `.env`, test the connection:

```bash
# Start the server only
cd /vercel/share/v0-project/server
pnpm run dev
```

You should see:
```
✓ MongoDB connected successfully
Server running on http://localhost:5000
```

If you see a connection error:
- Check your `MONGODB_URI` is correct
- Ensure MongoDB is running (local) or your IP is whitelisted (Atlas)
- Check username and password are correct

---

## Security Notes

### Development
- Current `.env` settings are fine for development
- Local MongoDB is safe for testing

### Production
1. Change `JWT_SECRET` to a long random string
2. Use MongoDB Atlas with IP whitelist (not 0.0.0.0/0)
3. Use environment variables in your hosting service
4. Never commit `.env` to Git (it's already in `.gitignore`)

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Cannot connect to MongoDB" | Check MONGODB_URI is correct, MongoDB is running |
| "Authentication failed" | Check username/password in connection string |
| "IP not whitelisted" | Add your IP in MongoDB Atlas > Network Access |
| "Database not found" | Check database name in connection string |

---

## Next Steps

1. Update `MONGODB_URI` in `.env` with your MongoDB connection
2. Optionally change `JWT_SECRET` to a secure value
3. Run `pnpm run dev` from project root
4. Visit http://localhost:5173

Done! Your app is ready to run.
