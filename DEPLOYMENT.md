# LinkShield Setup & Deployment Guide

## Quick Start

### Local Development (5 minutes)

#### Step 1: Backend Setup
```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and API keys
npm install
npm run dev
```

Backend runs on `http://localhost:5000`

#### Step 2: Frontend Setup (new terminal)
```bash
cd frontend
cp .env.example .env
npm install
npm start
```

Frontend runs on `http://localhost:3000`

---

## Production Deployment

### Option 1: Vercel + Render (Recommended)

#### Deploy Backend to Render
1. Create account at [render.com](https://render.com)
2. Connect GitHub repository
3. Create new Web Service
4. Set environment variables
5. Deploy

```bash
# From backend folder
# Ensure package.json has start script
# Push to GitHub and Render auto-deploys
```

#### Deploy Frontend to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import repository
3. Set `REACT_APP_API_URL` to your backend URL
4. Deploy

### Option 2: Heroku (Backend)

```bash
# Install Heroku CLI
heroku login
cd backend

# Create app
heroku create linkshield-backend

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set GOOGLE_SAFE_BROWSING_API_KEY=your_key
heroku config:set VIRUSTOTAL_API_KEY=your_key
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main
```

### Option 3: AWS/DigitalOcean/VPS

```bash
# SSH into server
ssh root@your_server_ip

# Install Node.js
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repository
git clone <repo_url>
cd LinkShield/backend

# Install dependencies
npm install

# Setup PM2 for auto-restart
npm install -g pm2
pm2 start src/server.js --name "LinkShield"
pm2 startup
pm2 save

# Setup Nginx reverse proxy
# Configure SSL with Let's Encrypt
```

---

## API Key Setup

### Google Safe Browsing API
```
1. Console: cloud.google.com
2. Create project
3. Enable Safe Browsing API
4. Create API key
5. Add to .env: GOOGLE_SAFE_BROWSING_API_KEY
```

### VirusTotal API
```
1. virustotal.com
2. Sign up free
3. Get API key from Settings
4. Add to .env: VIRUSTOTAL_API_KEY
```

### MongoDB Atlas
```
1. atlas.mongodb.com
2. Create free cluster
3. Setup IP whitelist
4. Get connection string
5. Add to .env: MONGODB_URI
```

---

## Database Setup

### Local MongoDB
```bash
# macOS (Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Windows (Download installer)
https://www.mongodb.com/try/download/community

# Linux
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

### MongoDB Atlas (Cloud)
- Free tier: 512 MB storage
- Perfect for MVP
- Auto backups included

---

## Environment Variables Checklist

Backend .env:
- [ ] MONGODB_URI
- [ ] GOOGLE_SAFE_BROWSING_API_KEY
- [ ] VIRUSTOTAL_API_KEY
- [ ] JWT_SECRET (generate: `openssl rand -hex 32`)
- [ ] PORT=5000
- [ ] NODE_ENV=production
- [ ] FRONTEND_URL

Frontend .env:
- [ ] REACT_APP_API_URL

---

## Admin Account Creation

### Option 1: Database Script
```javascript
// Create admin user in MongoDB
db.users.insertOne({
  email: "admin@linkshield.gh",
  password: bcrypt("secure_password"),
  firstName: "Admin",
  role: "admin",
  isVerified: true
})
```

### Option 2: API Call
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@linkshield.gh",
    "password": "password123",
    "firstName": "Admin"
  }'
```

Then update user role in database to "admin".

---

## Performance Optimization

### Frontend
- Enable Gzip compression
- Minify CSS/JS
- Use CDN for static assets
- Cache busting for updates

### Backend
- Use Redis for caching
- Implement rate limiting
- Use database indexes
- Enable clustering

### Database
- Create indexes on frequently queried fields
- Archive old data
- Regular backups

---

## Security Checklist

- [ ] HTTPS enabled
- [ ] JWT secrets securely generated
- [ ] API keys in environment variables (never in code)
- [ ] MongoDB password-protected
- [ ] Rate limiting enabled
- [ ] CORS configured properly
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] Regular security audits

---

## Monitoring & Maintenance

### Health Checks
```bash
# Check backend health
curl http://localhost:5000/api/health
```

### Logs
```bash
# Backend logs
tail -f logs/error.log

# Check PM2 logs
pm2 logs
```

### Database Backups
```bash
# Manual MongoDB backup
mongodump --uri="mongodb_connection_string" --out=./backup

# Restore backup
mongorestore ./backup
```

---

## Troubleshooting

### Backend Won't Start
```bash
# Check port
lsof -i :5000

# Check logs
npm run dev 2>&1 | tee error.log
```

### Database Connection Error
```bash
# Test connection
mongosh "mongodb_connection_string"

# Check whitelist in Atlas
```

### API Errors
```bash
# Check CORS headers
curl -i http://localhost:5000/api/health

# Verify API keys
# Test with Postman
```

---

## Scaling for Production

1. **Database**: Use MongoDB Atlas with auto-scaling
2. **Frontend**: Vercel auto-scales
3. **Backend**: Use Render with auto-scale
4. **Caching**: Add Redis layer
5. **CDN**: Use Cloudflare
6. **Monitoring**: Add Sentry for error tracking

---

## Cost Estimates (Monthly)

- MongoDB Atlas Free: $0
- Vercel (Frontend): $0-20
- Render (Backend): $7-100
- Domain: $12
- **Total: ~$19-132/month**

---

## Contact & Support

- Support: support@linkshield.gh
- Issues: GitHub Issues
- Email: hello@linkshield.gh
