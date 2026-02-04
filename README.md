# GUNI COMS2-2026 Conference Website

Modern web application for the International Conference on Computing Communication Security.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB

## Setup

### Prerequisites
- Node.js
- MongoDB running locally on default port (27017)

### Database Setup
The backend includes a seed script `seed.js` to populate the initial conference data.
```bash
cd backend
npm install
node seed.js
```

### Running the Application

1. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Server runs on `http://localhost:5000`.

2. **Start Frontend Client**
   Open a new terminal:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Client runs on `http://localhost:5173` (or the port shown in terminal).

## Features
- Modern, responsive design with Tailwind CSS
- Dynamic content fetching from MongoDB
- Pages: Home, About, Authors, Call for Papers, Contact
