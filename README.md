# LinkShield - Link Safety Verification Platform for Ghana

A comprehensive web platform for verifying link safety, reporting scams, and building a safer Ghana. LinkShield uses Google Safe Browsing API and VirusTotal to check links, and provides a community-driven reporting system focused on Ghana-specific scams.

## Features

### 🔍 Link Verification
- **Instant URL Checking**: Submit any link to check if it's safe, suspicious, or dangerous
- **Google Safe Browsing Integration**: Detect malware, phishing, and unwanted software
- **VirusTotal Integration**: Get comprehensive threat analysis from multiple vendors
- **Risk Scoring**: 0-100 risk score with clear categorization

### 📱 Mobile-First Design
- Responsive UI optimized for mobile and desktop
- Clean, simple interface
- Color-coded status indicators (Green/Yellow/Red)

### 👥 Community Features
- **Report Scams**: Users can report suspicious or dangerous links
- **Trending Scams Dashboard**: See the most reported scams in Ghana by category
- **Statistics**: View overall platform statistics and threat trends
- **User Accounts**: Create accounts to track your contributions

### 🏫 Admin Panel
- Approve/reject user-submitted reports
- Review and verify reported links
- Monitor submission trends
- Add admin notes to reports

### 🇬🇭 Ghana-Specific Scam Categories
- MoMo Scams (MTN Mobile Money, Vodafone Cash, AirtelTigo)
- Fake Job Offers
- Phishing Links
- Malware/Virus
- Dating/Romance Scams
- Lottery/Prize Scams
- Investment Scams
- Other Scams

## Tech Stack

### Frontend
- **React 18** - UI library
- **React Router v6** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

### Backend
- **Node.js + Express** - Server framework
- **MongoDB** - Database
- **JWT** - Authentication
- **Mongoose** - ODM

### External APIs
- **Google Safe Browsing API** - Threat detection
- **VirusTotal API** - Malware analysis
- **SendGrid** (optional) - Email notifications

## Project Structure

```
LinkShield/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js      # MongoDB connection
│   │   │   └── apiKeys.js       # API configuration
│   │   ├── controllers/
│   │   │   ├── LinkController.js
│   │   │   ├── AuthController.js
│   │   │   └── ReportController.js
│   │   ├── models/
│   │   │   ├── Link.js
│   │   │   ├── User.js
│   │   │   └── Report.js
│   │   ├── routes/
│   │   │   ├── links.js
│   │   │   ├── auth.js
│   │   │   └── reports.js
│   │   ├── services/
│   │   │   ├── LinkCheckerService.js   # API integrations
│   │   │   └── LinkService.js          # Business logic
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   └── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navigation.jsx
│   │   │   └── LinkChecker.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ReportLink.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── AdminPanel.jsx
│   │   │   └── NotFound.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── App.jsx
│   │   └── index.js
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env.example
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- API Keys:
  - Google Safe Browsing API
  - VirusTotal API

### Installation

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd LinkShield
```

#### 2. Setup Backend

```bash
cd backend

# Copy environment file
cp .env.example .env

# Edit .env and add your API keys and MongoDB URI
# nano .env

# Install dependencies
npm install

# Start the server
npm run dev
```

The backend will run on `http://localhost:5000`

#### 3. Setup Frontend

```bash
cd frontend

# Copy environment file
cp .env.example .env

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will run on `http://localhost:3000`

### Environment Variables

#### Backend (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/linkshield
PORT=5000
NODE_ENV=development
GOOGLE_SAFE_BROWSING_API_KEY=your_api_key
VIRUSTOTAL_API_KEY=your_api_key
JWT_SECRET=your_secret_key
ADMIN_EMAIL=admin@linkshield.gh
FRONTEND_URL=http://localhost:3000
```

#### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## API Endpoints

### Links
- `POST /api/links/check` - Check a URL for safety
- `GET /api/links/trending` - Get trending scams
- `GET /api/links/category/:category` - Get scams by category
- `GET /api/links/statistics` - Get platform statistics
- `GET /api/links/search` - Search links
- `POST /api/links/report` - Report a scam link
- `GET /api/links/details/:url` - Get link details

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/admin-login` - Admin login
- `GET /api/auth/me` - Get current user (protected)

### Reports (Admin Only)
- `GET /api/reports/pending` - Get pending reports
- `POST /api/reports/approve/:reportId` - Approve a report
- `POST /api/reports/reject/:reportId` - Reject a report
- `GET /api/reports/stats` - Get report statistics

## Getting API Keys

### Google Safe Browsing API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable "Safe Browsing API"
4. Create an API key (Credentials)
5. Copy the API key to your `.env` file

### VirusTotal API
1. Go to [VirusTotal](https://www.virustotal.com/gui/home/upload)
2. Sign up for a free account
3. Go to Settings → API Key
4. Copy your API key to your `.env` file

## Deployment

### Backend (Heroku, Railway, or Render)

1. Create a MongoDB Atlas cluster
2. Update environment variables on the hosting platform
3. Deploy using Git or platform CLI

```bash
# Example for Heroku
heroku create linkshield-backend
git push heroku main
```

### Frontend (Vercel, Netlify)

1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically on push

```bash
# Or build locally
npm run build
# Deploy the build/ folder
```

### Database (MongoDB Atlas)
1. Create a free tier cluster
2. Configure IP whitelist
3. Get connection string
4. Update MONGODB_URI in backend .env

## Usage

### For Users
1. Visit the homepage
2. Enter a URL in the link checker
3. View the risk score and status
4. For suspicious/dangerous links, click "Report Link"
5. Fill out the report form with details
6. Submit the report

### For Admins
1. Login with admin credentials
2. Go to Admin Panel
3. Review pending reports
4. Approve verified scams (adds to database)
5. Reject false reports
6. Add admin notes as needed

## Testing

### Backend
```bash
cd backend
npm test
```

### Frontend
```bash
cd frontend
npm test
```

## Common Issues

### API Key Errors
- Ensure API keys are correctly set in .env
- Check that API quotas haven't been exceeded
- Verify API is enabled in respective dashboards

### MongoDB Connection Error
- Check MongoDB URI format
- Ensure whitelist includes your IP
- Verify network connectivity

### CORS Errors
- Check FRONTEND_URL in backend .env
- Ensure CORS middleware is configured
- Verify API requests include correct headers

## Future Enhancements

- 🔌 Browser extension for instant URL checking
- 📧 Email notifications for verified threats
- 🤖 Machine learning classification
- 📊 API for banks and fintechs
- 🌐 Multi-language support
- 📱 Mobile app
- 🔐 SMS verification for reports
- 📈 Advanced analytics dashboard

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - See LICENSE file for details

## Support

For support, email support@linkshield.gh or open an issue on GitHub.

## Acknowledgments

- Google Safe Browsing API
- VirusTotal
- MongoDB
- React & Express communities
- Ghana's cybersecurity community

---

**Made with ❤️ for Ghana** 🇬🇭
