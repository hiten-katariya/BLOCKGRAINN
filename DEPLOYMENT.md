# 🚀 Deployment Guide - JustRation

## Prerequisites
- GitHub account
- Firebase project (blockgrain-a9a11)
- Render.com account (free)

---

## 📦 Option 1: Deploy to Render.com (Recommended - FREE)

### Step 1: Prepare Your Code

1. **Install dotenv package:**
```bash
cd Backend
npm install dotenv
```

2. **Set blockchain to disabled mode** (Ganache won't work on cloud):
   - Already configured in code with `BLOCKCHAIN_ENABLED=false`

3. **Commit your code to GitHub:**
```bash
git init
git add .
git commit -m "Ready for deployment"
git branch -M main
git remote add origin https://github.com/yourusername/justration.git
git push -u origin main
```

### Step 2: Deploy on Render

1. **Go to Render.com** (https://render.com)
2. **Sign up** with GitHub
3. **Click "New +" → "Web Service"**
4. **Connect your GitHub repository**

5. **Configure settings:**
   - **Name:** `justration-pds`
   - **Region:** Choose closest to you
   - **Branch:** `main`
   - **Root Directory:** `Backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free

6. **Add Environment Variables** (click "Advanced" → "Add Environment Variable"):

```
NODE_ENV=production
BLOCKCHAIN_ENABLED=false
PORT=3000
```

7. **For Firebase** - Add your Firebase credentials:
   - Either upload `firebase-key.json` as a file
   - OR add each field as separate env variables:

```
FIREBASE_PROJECT_ID=blockgrain-a9a11
FIREBASE_PRIVATE_KEY_ID=0ac3aa23036a7b0a70e807cbbe329a4792b01089
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqh...your-key...\n-----END PRIVATE KEY-----\n
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@blockgrain-a9a11.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=101812544061668058511
```

8. **Click "Create Web Service"**

9. **Wait 2-3 minutes** for deployment

10. **Your app will be live at:** `https://justration-pds.onrender.com`

### Step 3: Initialize Database

Once deployed, run this command in Render's Shell:
```bash
node initData.js
```

---

## 🌐 Option 2: Deploy to Railway.app (Alternative - FREE)

1. **Go to Railway.app** (https://railway.app)
2. **Sign in with GitHub**
3. **New Project → Deploy from GitHub repo**
4. **Select your repository**
5. **Configure:**
   - Root Directory: `/Backend`
   - Start Command: `npm start`
6. **Add same environment variables as above**
7. **Deploy!**

---

## ☁️ Option 3: Deploy to Heroku (Classic Option)

### Requires Heroku CLI:
```bash
# Install Heroku CLI
# Windows: https://devcenter.heroku.com/articles/heroku-cli

heroku login
cd Backend
heroku create justration-pds

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set BLOCKCHAIN_ENABLED=false
heroku config:set FIREBASE_PROJECT_ID=blockgrain-a9a11
# ... add other Firebase variables

git push heroku main
heroku open
```

---

## 🔐 Important Security Notes

### 1. **Never commit sensitive files:**
Your `.gitignore` already includes:
- `firebase-key.json`
- `.env` files

### 2. **Use Environment Variables:**
All sensitive data (Firebase keys) should be in environment variables on the deployment platform.

### 3. **Firebase Security Rules:**
Update Firestore security rules for production:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // Change this in production!
    }
  }
}
```

---

## 📱 Access Your Deployed App

### Login Credentials (Demo Users):
- **Admin:** `admin` / `admin123`
- **Central Officer:** `central001` / `central123`
- **Warehouse Manager:** `warehouse001` / `warehouse123`
- **City Hub Officer:** `cityhub001` / `cityhub123`
- **FPS Operator:** `fps001` / `fps123`

### URLs:
- **Main App:** `https://your-app-name.onrender.com/`
- **Login:** `https://your-app-name.onrender.com/login`
- **Test Page:** `https://your-app-name.onrender.com/test`

---

## ⚠️ Blockchain Considerations

### Current Setup (After Deployment):
- ✅ Blockchain is **DISABLED** in production
- ✅ Fallback hashes are generated (timestamp-based)
- ✅ All functionality works WITHOUT Ganache

### To Enable Real Blockchain in Production:

**Option A: Use Ethereum Testnet (Sepolia/Goerli)**
1. Get test ETH from faucet
2. Deploy smart contract to testnet
3. Update `BLOCKCHAIN_RPC_URL` to testnet RPC
4. Set `BLOCKCHAIN_ENABLED=true`

**Option B: Use Infura/Alchemy**
```
BLOCKCHAIN_ENABLED=true
BLOCKCHAIN_RPC_URL=https://sepolia.infura.io/v3/YOUR-PROJECT-ID
```

**Option C: Keep It Disabled**
- App works perfectly without blockchain
- Uses Firebase as single source of truth
- Still generates transaction hashes for audit trail

---

## 🐛 Troubleshooting

### App not starting:
- Check Render logs: Dashboard → Logs
- Verify all environment variables are set
- Ensure Firebase credentials are correct

### Database empty:
- Run `node initData.js` in deployment shell
- Or trigger via API: `POST /api/init-db`

### CORS errors:
- Already configured with `cors()` middleware
- Should work from any origin

---

## 📊 Free Tier Limits

### Render.com Free Tier:
- ✅ 750 hours/month
- ✅ Sleeps after 15 min inactivity
- ✅ Cold start: 30-60 seconds
- ✅ Custom domain supported

### Firebase Free Tier:
- ✅ 1GB storage
- ✅ 10GB/month transfer
- ✅ 20K writes/day
- ✅ Plenty for demo/testing

---

## 🎉 You're Live!

Your blockchain-based Public Distribution System is now accessible worldwide! Share the URL with anyone to demonstrate the system.

**Next Steps:**
1. Share URL with stakeholders
2. Test all features in production
3. Monitor logs for errors
4. Consider upgrading for better performance

Need help? Check deployment platform docs:
- Render: https://render.com/docs
- Railway: https://docs.railway.app
- Heroku: https://devcenter.heroku.com
