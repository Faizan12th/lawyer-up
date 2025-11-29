# Environment Setup Guide

To run the application successfully, you need to configure your environment variables.

1.  Create a file named `.env.local` in the root directory of the project.
2.  Copy the following content into `.env.local`:

```env
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string_here

# JWT Secret for Authentication
JWT_SECRET=your_jwt_secret_here

# Cloudinary Configuration (for file uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

3.  Replace the placeholder values with your actual credentials.
    *   **MONGODB_URI**: Get this from your MongoDB Atlas dashboard.
    *   **JWT_SECRET**: Generate a strong random string (e.g., using `openssl rand -base64 32`).
    *   **CLOUDINARY_**: Get these from your Cloudinary dashboard.

4.  Restart your development server (`npm run dev`) for the changes to take effect.
