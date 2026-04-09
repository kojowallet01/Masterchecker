# LinkShield - Full Quick Start Guide

## Prerequisites
- Node.js v14+
- MongoDB (local or MongoDB Atlas)
- API Keys (Google Safe Browsing & VirusTotal)

---

## 🚀 Quick Setup (10 minutes)

### Step 1: Setup Backend

```bash
cd backend

# Copy environment file
cp .env.example .env

# Edit .env file with your values:
# - MONGODB_URI
# - GOOGLE_SAFE_BROWSING_API_KEY
# - VIRUSTOTAL_API_KEY
# - JWT_SECRET (any random string)

# Install dependencies
npm install

# Start development server
npm run dev
```

✅ Backend running on http://localhost:5000

### Step 2: Setup Frontend (new terminal)

```bash
cd frontend

# Copy environment file
cp .env.example .env

# Install dependencies
npm install

# Start React app
npm start
```

✅ Frontend running on http://localhost:3000

---

## 📝 Testing the App

### Check a Link
1. Go to http://localhost:3000
2. Enter a URL (e.g., `https://example.com`)
3. Click "Check Link"
4. See the risk score

### Report a Link
1. Click "Report Link" in navigation
2. Fill in the scam form
3. Submit report

### View Dashboard
1. Click "Dashboard"
2. See trending scams
3. View statistics

### Admin Panel (if authenticated as admin)
1. Login with admin credentials
2. Go to Admin Panel
3. Review and approve reports

---

## 🔑 Getting API Keys (2 minutes each)

### Google Safe Browsing API
```
1. Go to: https://console.cloud.google.com
2. Create new project
3. Search for "Safe Browsing API"
4. Click "Enable"
5. Go to Credentials
6. Create API Key
7. Copy to GOOGLE_SAFE_BROWSING_API_KEY in .env
```

### VirusTotal API
```
1. Go to: https://www.virustotal.com
2. Sign up for free account
3. Click Settings (bottom)
4. Click API Key
5. Copy key to VIRUSTOTAL_API_KEY in .env
```

### MongoDB Connection String
```
1. Go to: https://www.mongodb.com/cloud/atlas
2. Sign up free
3. Create free tier cluster
4. Get connection string
5. Copy to MONGODB_URI in .env
```

---

## 📂 Project Structure

```
LinkShield/
├── backend/          # Express API
├── frontend/         # React App
└── README.md
```

---

## 🎯 Features Breakdown

| Feature | Status | How to Test |
|---------|--------|------------|
| Check Link Safety | ✅ Complete | Enter URL on home page |
| Report Scam | ✅ Complete | Click "Report Link" button |
| Community Dashboard | ✅ Complete | Click "Dashboard" |
| Admin Panel | ✅ Complete | Login as admin, go to /admin |
| User Auth | ✅ Complete | Register/Login buttons |
| Trending Scams | ✅ Complete | View on Dashboard |
| Search Links | ✅ Complete | Via Dashboard |

---

## 🔧 Common Commands

### Backend
```bash
cd backend

# Dev mode (with auto-reload)
npm run dev

# Production mode
npm start

# Run tests
npm test
```

### Frontend
```bash
cd frontend

# Dev mode
npm start

# Build for production
npm run build

# Run tests
npm test
```

---

## 📚 API Examples

### Check a Link
```bash
curl -X POST http://localhost:5000/api/links/check \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

### Get Trending Scams
```bash
curl http://localhost:5000/api/links/trending?limit=10
```

### Report a Link
```bash
curl -X POST http://localhost:5000/api/links/report \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://scam.com",
    "category": "phishing",
    "description": "This is a phishing link",
    "email": "user@example.com"
  }'
```

### Get Statistics
```bash
curl http://localhost:5000/api/links/statistics
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Cannot connect to MongoDB" | Check MONGODB_URI in .env |
| API key errors | Verify API keys are correct and enabled |
| CORS errors | Check FRONTEND_URL in backend .env |
| Port already in use | Kill process on port 5000/3000 or change PORT in .env |
| Tailwind CSS not loading | Run `npm install` in frontend folder |

---

## 🚢 Deploy to Production

### Frontend (Vercel)
```bash
# Push to GitHub
# Go to vercel.com
# Import repository
# Set REACT_APP_API_URL env var
# Deploy automatically
```

### Backend (Render/Heroku)
```bash
# Go to render.com or heroku.com
# Connect GitHub repo
# Set environment variables
# Deploy
```

---

## 📊 Database Schema

### Links Collection
```json
{
  "url": "string",
  "domain": "string",
  "riskScore": 0-100,
  "status": "safe|suspicious|dangerous",
  "category": "momo-scam|fake-job|phishing|...",
  "reportCount": "number"
}
```

### Users Collection
```json
{
  "email": "string",
  "password": "hashed",
  "role": "user|admin",
  "reportsSubmitted": "number"
}
```

### Reports Collection
```json
{
  "url": "string",
  "category": "string",
  "description": "string",
  "status": "pending|approved|rejected"
}
```

---

## 🎓 Next Steps

1. **Test All Features**: Check each page and functionality
2. **Create Admin Account**: Approve some reports
3. **Add Sample Data**: Report a few links
4. **Customize**: Modify colors, text, categories
5. **Deploy**: Push to production

---

## 📞 Need Help?

- Check error messages in browser console (F12)
- Check backend logs in terminal
- Review DEPLOYMENT.md for production setup
- Check README.md for detailed docs

---

## ✅ Checklist

- [ ] Node.js installed
- [ ] MongoDB running
- [ ] API keys obtained
- [ ] Backend .env configured
- [ ] Frontend .env configured
- [ ] Backend started (npm run dev)
- [ ] Frontend started (npm start)
- [ ] Able to access http://localhost:3000
- [ ] Able to check a link
- [ ] Able to report a link
- [ ] Ready to deploy!

**Happy testing! 🎉**
