# LinkShield - API Documentation

## Base URL
- **Local**: `http://localhost:5000/api`
- **Production**: `https://linkshield-api.example.com/api`

---

## Authentication

### Register User
**POST** `/auth/register`

Request:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

Response:
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGci...",
  "user": {
    "id": "631...",
    "email": "user@example.com"
  }
}
```

---

### Login User
**POST** `/auth/login`

Request:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "message": "Login successful",
  "token": "eyJhbGci...",
  "user": {
    "id": "631...",
    "email": "user@example.com",
    "role": "user"
  }
}
```

---

### Admin Login
**POST** `/auth/admin-login`

Request:
```json
{
  "email": "admin@linkshield.gh",
  "password": "admin_password"
}
```

Response:
```json
{
  "message": "Admin login successful",
  "token": "eyJhbGci...",
  "user": {
    "id": "631...",
    "email": "admin@linkshield.gh",
    "role": "admin"
  }
}
```

---

### Get Current User
**GET** `/auth/me`

Headers:
```
Authorization: Bearer <token>
```

Response:
```json
{
  "id": "631...",
  "email": "user@example.com",
  "firstName": "John",
  "role": "user",
  "reportsSubmitted": 5
}
```

---

## Link Management

### Check Link Safety
**POST** `/links/check`

Request:
```json
{
  "url": "https://example.com"
}
```

Response:
```json
{
  "url": "https://example.com",
  "domain": "example.com",
  "riskScore": 15,
  "status": "safe",
  "reason": "No threats detected",
  "reportCount": 0,
  "category": "other",
  "lastChecked": "2024-04-09T10:30:00Z"
}
```

---

### Get Trending Scams
**GET** `/links/trending?limit=10`

Query Parameters:
- `limit` (optional): Number of results (default: 10, max: 50)

Response:
```json
[
  {
    "url": "https://scam.com",
    "domain": "scam.com",
    "riskScore": 95,
    "status": "dangerous",
    "category": "phishing",
    "reportCount": 152,
    "lastReported": "2024-04-09T15:30:00Z"
  }
]
```

---

### Get Scams by Category
**GET** `/links/category/:category?limit=10`

Path Parameters:
- `category`: One of: `momo-scam`, `fake-job`, `phishing`, `malware`, `dating-scam`, `lottery-scam`, `investment-scam`, `other`

Query Parameters:
- `limit` (optional): Number of results (default: 10)

Response:
```json
[
  {
    "url": "https://fake-job.com",
    "domain": "fake-job.com",
    "riskScore": 85,
    "status": "suspicious",
    "category": "fake-job",
    "reportCount": 45
  }
]
```

---

### Get Platform Statistics
**GET** `/links/statistics`

Response:
```json
{
  "totalLinks": 5234,
  "dangerousLinks": 342,
  "suspiciousLinks": 1203,
  "safeLinks": 3689,
  "categories": [
    {
      "_id": "phishing",
      "count": 523
    },
    {
      "_id": "fake-job",
      "count": 412
    }
  ],
  "topReported": [
    {
      "url": "https://scam1.com",
      "reportCount": 152
    }
  ]
}
```

---

### Search Links
**GET** `/links/search?query=example`

Query Parameters:
- `query` (required): Search term (min. 2 characters)

Response:
```json
[
  {
    "url": "https://example.com",
    "domain": "example.com",
    "riskScore": 25,
    "status": "safe",
    "category": "other"
  }
]
```

---

### Get Link Details
**GET** `/links/details/:url`

Path Parameters:
- `url`: URL-encoded URL

Response:
```json
{
  "url": "https://example.com",
  "domain": "example.com",
  "riskScore": 25,
  "status": "safe",
  "reason": "No threats detected",
  "reportCount": 2,
  "category": "other",
  "lastChecked": "2024-04-09T10:30:00Z",
  "verified": false,
  "reports": [
    {
      "category": "phishing",
      "description": "Looks suspicious",
      "reportedAt": "2024-04-08T14:20:00Z"
    }
  ]
}
```

---

### Report a Link
**POST** `/links/report`

Request:
```json
{
  "url": "https://scam.com",
  "category": "phishing",
  "description": "This link tries to steal banking credentials",
  "email": "user@example.com"
}
```

Response:
```json
{
  "message": "Link reported successfully",
  "linkId": "631a2b3c4d5e6f7g8h9i"
}
```

---

## Report Management (Admin Only)

### Get Pending Reports
**GET** `/reports/pending`

Headers:
```
Authorization: Bearer <admin_token>
```

Response:
```json
[
  {
    "_id": "631...",
    "url": "https://scam.com",
    "category": "phishing",
    "description": "Phishing attempt",
    "email": "reporter@example.com",
    "status": "pending",
    "createdAt": "2024-04-09T10:00:00Z"
  }
]
```

---

### Approve Report
**POST** `/reports/approve/:reportId`

Headers:
```
Authorization: Bearer <admin_token>
```

Request:
```json
{
  "category": "phishing",
  "adminNotes": "Verified as phishing link"
}
```

Response:
```json
{
  "message": "Report approved successfully",
  "report": {
    "_id": "631...",
    "status": "approved",
    "approvedAt": "2024-04-09T15:30:00Z"
  }
}
```

---

### Reject Report
**POST** `/reports/reject/:reportId`

Headers:
```
Authorization: Bearer <admin_token>
```

Request:
```json
{
  "adminNotes": "This is a legitimate website"
}
```

Response:
```json
{
  "message": "Report rejected successfully",
  "report": {
    "_id": "631...",
    "status": "rejected",
    "rejectedAt": "2024-04-09T15:30:00Z"
  }
}
```

---

### Get Report Statistics
**GET** `/reports/stats`

Headers:
```
Authorization: Bearer <admin_token>
```

Response:
```json
{
  "totalReports": 523,
  "pendingReports": 45,
  "approvedReports": 412,
  "reportsByCategory": [
    {
      "_id": "phishing",
      "count": 152
    }
  ]
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Server Error |

---

## Error Response

```json
{
  "error": "Descriptive error message"
}
```

---

## Rate Limiting

- **Limit**: 100 requests per 15 minutes per IP
- **Headers**: `X-RateLimit-Limit`, `X-RateLimit-Remaining`

---

## Example Requests

### Using cURL

```bash
# Check a link
curl -X POST http://localhost:5000/api/links/check \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'

# Get trending scams
curl http://localhost:5000/api/links/trending

# Report a link
curl -X POST http://localhost:5000/api/links/report \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://scam.com",
    "category": "phishing",
    "description": "This is a phishing link",
    "email": "user@example.com"
  }'
```

### Using JavaScript (Fetch)

```javascript
// Check a link
const checkLink = async (url) => {
  const response = await fetch('http://localhost:5000/api/links/check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })
  });
  return response.json();
};

// Report a link
const reportLink = async (url, category, description) => {
  const response = await fetch('http://localhost:5000/api/links/report', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, category, description })
  });
  return response.json();
};
```

### Using Axios (JavaScript)

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Check link
const result = await api.post('/links/check', { 
  url: 'https://example.com' 
});

// Get trending
const trending = await api.get('/links/trending?limit=10');
```

---

## Webhooks (Future)

Webhooks for link verifications and report approvals (coming soon)

---

For more information, see README.md and DEPLOYMENT.md
