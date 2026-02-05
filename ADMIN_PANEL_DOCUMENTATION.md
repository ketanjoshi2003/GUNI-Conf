# COMS2 Conference Website - Admin Panel Documentation

## Overview
A complete admin panel system for dynamically managing all conference website content through a modern web interface.

## Features Implemented

### 1. Database Models (Backend)
Created MongoDB schemas for:
- **Speakers** - Conference speakers with year categorization
- **Committees** - Committee members (Advisory, Conference Chairs, Technical Program, Organizing)
- **Important Dates** - Conference timeline and milestones
- **Topics** - Topics of interest (searchable by visitors)
- **Previous Editions** - Past conference proceedings

### 2. API Endpoints (Backend)
Base URL: `http://localhost:5000/api/admin/`

#### Speakers
- `GET /speakers?year=2025` - Get all speakers (with optional year filter)
- `POST /speakers` - Create new speaker
- `PUT /speakers/:id` - Update speaker
- `DELETE /speakers/:id` - Delete speaker

#### Committees
- `GET /committees?type=advisory` - Get committee members (with optional type filter)
- `POST /committees` - Create new member
- `PUT /committees/:id` - Update member
- `DELETE /committees/:id` - Delete member

#### Important Dates
- `GET /important-dates` - Get all dates
- `POST /important-dates` - Create new date
- `PUT /important-dates/:id` - Update date
- `DELETE /important-dates/:id` - Delete date

#### Topics
- `GET /topics` - Get all topics
- `POST /topics` - Create new topic
- `PUT /topics/:id` - Update topic
- `DELETE /topics/:id` - Delete topic

#### Previous Editions
- `GET /previous-editions` - Get all editions
- `POST /previous-editions` - Create new edition
- `PUT /previous-editions/:id` - Update edition
- `DELETE /previous-editions/:id` - Delete edition

### 3. Admin Dashboard UI (Frontend)

#### Access
- URL: `/admin`
- Requires: Admin login credentials
- Protected route with role check

#### Features
- **Tabbed Interface** - Easy navigation between content types
- **CRUD Operations** - Create, Read, Update, Delete all content
- **Inline Forms** - Add/Edit forms appear in the dashboard
- **Responsive Tables** - Clean display of all data
- **Search & Filter** - (Can be enhanced further)
- **Validation** - Form field validation
- **Confirmation Dialogs** - Delete confirmations

#### Content Management Sections
1. **Speakers Management**
   - Name, Designation, Organization
   - Year categorization
   - Bio, Image URL
   - Display order control

2. **Committees Management**
   - Name, Designation, Organization
   - Committee type selection
   - Email addresses
   - Order control

3. **Important Dates Management**
   - Event name
   - Date picker
   - Description
   - Order control

4. **Topics Management**
   - Topic title
   - Track categorization
   - Order control

5. **Previous Editions Management**
   - Year
   - Full title
   - Proceedings link
   - Publisher information

## How to Use

### First Time Setup
1. Start backend: `cd backend && npm run dev`
2. Start frontend: `cd frontend && npm run dev`
3. Login as admin at `/login`
4. Navigate to `/admin`

### Adding Content
1. Select the appropriate tab
2. Click "Add New [Content Type]"
3. Fill in the form
4. Click "Save"

### Editing Content
1. Find the item in the table
2. Click the edit icon (pencil)
3. Modify the fields
4. Click "Save"

### Deleting Content
1. Click the delete icon (trash)
2. Confirm the deletion

## Next Steps to Consider

### Content That Still Needs Admin Integration
- **Home Page Hero Section** (Conference title, dates, venue)
- **Conference Tracks** (The 3 main tracks with descriptions)
- **Venue Details** (Map embed, address)
- **Participation Modes**
- **Sponsors** (Sponsor logos and information)
- **Gallery/Media** (Photos from past events)

### Recommended Enhancements
1. **Image Upload** - Instead of URLs, allow file uploads
2. **Rich Text Editor** - For bio and description fields
3. **Bulk Operations** - Import/Export via CSV
4. **Activity Log** - Track who changed what and when
5. **Preview Mode** - Preview changes before publishing
6. **Draft Mode** - Save drafts before publishing
7. **User Management** - Manage admin users

### Deployment Checklist
- [ ] Set up MongoDB Atlas account
- [ ] Create `.env` file with production credentials
- [ ] Deploy backend to Render/Railway
- [ ] Deploy frontend to Vercel/Netlify
- [ ] Configure CORS for production domains
- [ ] Set up SSL certificates
- [ ] Test all CRUD operations in production

## Security Notes
- Currently using basic role-based access (admin/user)
- All admin routes should add middleware authentication
- Add JWT token validation in production
- Implement rate limiting for API endpoints
- Add input sanitization to prevent XSS attacks

## File Structure
```
backend/
├── models/
│   ├── Speaker.js
│   ├── Committee.js
│   ├── ImportantDate.js
│   ├── Topic.js
│   └── PreviousEdition.js
├── routes/
│   └── adminRoutes.js
└── server.js (updated)

frontend/
└── src/
    └── pages/
        └── AdminDashboard.jsx (completely rebuilt)
```

## Technologies Used
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Frontend**: React, Axios, Lucide Icons, Tailwind CSS
- **Authentication**: JWT (existing), Role-based access

---

**Created**: February 2026  
**Version**: 1.0  
**Status**: Development Ready
