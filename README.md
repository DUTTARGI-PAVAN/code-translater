# Smart Code Translator

An AI-powered full-stack web application that helps developers translate, analyze, optimize, and explain code across multiple programming languages — powered by Google Gemini AI.

#Features
Feature -Description

1.Code Translation- Convert code between C, C++, C#, Java, and Python |
2.Complexity Analysis- Get time & space complexity with Big-O notation |
3.Code Optimization*- AI-powered suggestions to improve code performance |
4.Code Explanation- Beginner-friendly explanations of what your code does |
5.Authentication- Email/password registration & Google SSO |
6.Operation History- Auto-save and browse all past operations |
7.Monaco Editor- VS Code-like editor with syntax highlighting |

# Tech Stack
# Frontend
- **React** + **Vite**
- **React Router DOM** — client-side routing
- **Axios** — HTTP client with JWT interceptor
- **@monaco-editor/react** — VS Code editor in the browser
- **@react-oauth/google** — Google Sign-In
- **react-hot-toast** — toast notifications

### Backend
- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **JWT (jsonwebtoken)** — authentication tokens
- **bcryptjs** — password hashing
- **Google Auth Library** — verify Google OAuth tokens
- **@google/genai** — Google Gemini AI integration


## Project Structure

```
smart-code-translater/
├── client/                         # Frontend (React + Vite)
│   └── src/
│       ├── components/             # CodeEditor, OutputPanel, Navbar, etc.
│       ├── context/                # AuthContext (global auth state)
│       ├── pages/                  # LoginPage, HomePage, HistoryPage
│       ├── services/               # API call functions
│       ├── constants/              # Languages, prompts
│       └── styles/                 # CSS files
└── server/                         # Backend (Express + MongoDB)
    └── src/
        ├── config/                 # DB, Gemini, Google OAuth config
        ├── constants/              # Languages, prompt templates
        ├── controllers/            # Auth, Code, History controllers
        ├── middleware/             # Auth & error middleware
        ├── models/                 # User, History models
        ├── routes/                 # Auth, Code, History routes
        ├── services/               # Business logic & AI services
        └── utils/                  # JWT utilities, response parsers
```

## ⚙️ Getting Started

### Prerequisites
- Node.js
- MongoDB Atlas account
- Google Cloud OAuth 2.0 Client ID
- Google Gemini API Key

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/smart-code-translater.git
cd smart-code-translater
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:
```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=your_google_client_id
GEMINI_API_KEY=your_gemini_api_key
```

Start the backend:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd client
npm install
```

Create a `.env` file in the `client/` directory:
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

Start the frontend:
```bash
npm run dev
```

### 4. Open the App
Visit `http://localhost:5173` in your browser.

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login with email & password |
| POST | `/api/auth/google` | Login with Google |
| GET | `/api/auth/me` | Get current user profile |
| POST | `/api/auth/logout` | Logout |

### Code Operations *(requires auth)*
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/code/translate` | Translate code between languages |
| POST | `/api/code/analyze` | Analyze time & space complexity |
| POST | `/api/code/optimize` | Get optimized code + suggestions |
| POST | `/api/code/explain` | Get plain English explanation |

### History *(requires auth)*
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/history` | Get paginated history |
| GET | `/api/history/:id` | Get a single history entry |
| DELETE | `/api/history/:id` | Delete a history entry |
| DELETE | `/api/history/clear` | Clear all history |

---

## 🌐 Supported Languages

- C
- C++
- C#
- Java
- Python

---

## 📸 How It Works

1. **Sign up / Log in** with email & password or Google SSO
2. **Write or paste code** in the Monaco editor
3. **Select a source language** and optionally a target language
4. **Choose an action** — Translate, Analyze, Optimize, or Explain
5. **Click Run** — Gemini AI processes your code
6. **View results** in the output panel
7. **Browse history** to revisit past operations

---

## 🚀 Deployment

- **Frontend** — Deploy on [Render](https://render.com) as a Static Site
- **Backend** — Deploy on [Render](https://render.com) as a Web Service
- **Database** — [MongoDB Atlas](https://mongodb.com/atlas) (cloud)
