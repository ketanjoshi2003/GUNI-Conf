# Deploying MERN Stack to cPanel

This guide will walk you through deploying your React frontend and Node.js backend to a standard cPanel hosting environment.

## Prerequisites

- **cPanel Access**: Ensure your hosting provider supports Node.js (look for "Setup Node.js App" in cPanel).
- **Domain Name**: You should have a domain (e.g., `yourconference.com`) pointing to your hosting.
- **MongoDB Database**: Since cPanel usually runs MySQL, use a remote MongoDB like **MongoDB Atlas**. Get your connection string ready (e.g., `mongodb+srv://user:pass@cluster.mongodb.net/dbname`).

---

## Part 1: Backend Deployment (Node.js API)

We will host the backend on a subdomain (recommended) or a subfolder like `api.yourconference.com`.

### 1. Create a Subdomain (Optional but Recommended)
1.  Log in to cPanel.
2.  Go to **Domains** -> **Create A New Domain** (or **Subdomains**).
3.  Create `api.yourconference.com` (replace `yourconference.com` with your actual domain).
4.  Note the **Document Root** (e.g., `/home/username/public_html/api`).

### 2. Upload Backend Code
1.  On your local computer, zip the entire `backend` folder **excluding** `node_modules`.
2.  In cPanel, go to **File Manager**.
3.  Navigate to the Document Root created above (or create a folder like `backend_app` outside `public_html` for better security).
4.  Upload and **Extract** your zip file.

### 3. Setup Node.js Application
1.  In cPanel, find **Setup Node.js App**.
2.  Click **Create Application**.
3.  **Node.js Version**: Select a recent version (e.g., 18.x or 20.x).
4.  **Application Mode**: `Production`.
5.  **Application Root**: The path to your uploaded backend folder (e.g., `backend_app`).
6.  **Application URL**: Select your subdomain (e.g., `api.yourconference.com`).
7.  **Application Startup File**: enter `server.js`.
8.  Click **Create**.

### 4. Install Dependencies
1.  After creating, scroll down to detect the "Run NPM Install" button.
2.  Click **Run NPM Install**. This installs packages from your `package.json`.

### 5. Configure Environment Variables
In the "Setup Node.js App" interface, find the **Environment Variables** section. Add the following:

-   `PORT`: `5000` (or whatever port cPanel assigns/suggests, though cPanel usually handles this automatically via Phusion Passenger).
-   `MONGO_URI`: Your MongoDB connection string.
-   `CLIENT_URL`: `https://yourconference.com,https://www.yourconference.com` (The URL where your frontend will live).
-   `JWT_SECRET`: A long random string for security.
-   `NODE_ENV`: `production`

### 6. Restart App
Click **Restart Application**. Your API should now be live at `https://api.yourconference.com`.

---

## Part 2: Frontend Deployment (React)

The frontend is a static website built from your React code.

### 1. Build the Frontend Locally
1.  Open your local project in VS Code.
2.  Create a file named `.env.production` in the `frontend` folder.
3.  Add this line (replace with your actual API URL):
    ```
    VITE_API_URL=https://api.yourconference.com
    ```
4.  Open a terminal in the `frontend` folder.
5.  Run:
    ```bash
    npm run build
    ```
6.  This creates a `dist` folder containing your production website.

### 2. Upload to cPanel
1.  Go to cPanel **File Manager**.
2.  Navigate to your main domain's document root (usually `public_html`).
3.  **Upload** the *contents* of the `dist` folder (files like `index.html`, `assets/`, etc.) directly into `public_html`.
    -   *Do not upload the `dist` folder itself, just the contents inside it.*

### 3. Fix Routing (Critical for React)
Since React helps handle routing (like `/about`, `/committees`), we need to tell the server to always serve `index.html` for any path.

1.  In **File Manager** (inside `public_html`), look for a file named `.htaccess`.
    -   If hidden, click **Settings** (top right) and check "Show Hidden Files".
    -   If it doesn't exist, create it.
2.  Edit `.htaccess` and add the following code block at the top:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

3.  Save the file.

---

## Part 3: Verify

1.  Visit your website: `https://yourconference.com`
2.  Check if data loads (e.g., Speakers, Committees). If not, open browser Console (F12) to see if there are CORS errors or 404s.
    -   **CORS Error?** Check `CLIENT_URL` in Backend Env Vars.
    -   **Connection Refused?** Check if API is running in "Setup Node.js App".

**Done!** Your site should now be live.
