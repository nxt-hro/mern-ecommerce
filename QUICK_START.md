# 🚀 Quick Start (30 Seconds)

## 1️⃣ Set MongoDB Connection

Open `/server/.env` and add your MongoDB URI:

```
MONGODB_URI=mongodb+srv://your_user:your_pass@cluster.mongodb.net/ecommerce
JWT_SECRET=any_secret_string_here
```

Get a free MongoDB cluster at [mongodb.com/cloud](https://mongodb.com/cloud)

## 2️⃣ Seed the Database (Optional)

```bash
cd /vercel/share/v0-project
pnpm run seed
```

Adds 6 sample products to test with.

## 3️⃣ Run the App

```bash
cd /vercel/share/v0-project
pnpm run dev
```

## ✅ Done!

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:5000](http://localhost:5000)

## 📋 What You Can Do

✓ Register & Login  
✓ Browse Products  
✓ Add to Cart  
✓ Checkout  
✓ Upload Products  

---

**Need help?** See `SETUP_GUIDE.md` for detailed instructions.
