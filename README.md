﻿# Blog App with User Authentication and Cloudinary Integration

This is a full-stack blog application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It features user authentication with JSON Web Tokens (JWT) and TypeScript in both the frontend and backend. Additionally, it integrates with Cloudinary for image uploading and removal in the frontend and displays random quotes.

## Features

- User authentication with JWT
- TypeScript support in frontend and backend
- CRUD operations for blog posts
- Bookmark Specific Blog
- Integration with Cloudinary for image uploading and removal
- Displaying random quotes

## Technologies Used

- MongoDB: Database for storing blog data
- Express.js: Backend framework for handling HTTP requests
- React.js: Frontend library for building user interfaces
- Node.js: JavaScript runtime for building the backend server
- JSON Web Tokens (JWT): For user authentication
- TypeScript: Typed superset of JavaScript for both frontend and backend
- Cloudinary: Cloud-based image management platform
- Redux: State Management in React
- RTK Query: Manage API Calling
- Nodemon : Use in development purpose
- dotenv : Managing enviorment varaiable in backend

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js and npm: Install from [here](https://nodejs.org/)
- MongoDB: Install from [here](https://www.mongodb.com/)

## Getting Started

1. Clone this repository:

   ```bash
   git clone https://github.com/gagandeepsingh101/Blog-App.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Blog-App
   ```

3. Install dependencies for both frontend and backend:

   ```bash
   cd client
   npm install
   cd..
   cd server
   npm install
   ```

4. Create a `.env` file in the `server` directory and add the following environment variables:

   ```plaintext
   PORT=<your_port>
   MONGODB_URL=<your_mongodb_uri>
   SECRET_TOKEN=<your_jwt_secret>
   ```

5. Start the backend server:

   ```bash
   cd server
   npm run build
   nodemon ./dist/index.js
   ```
   
6. Create a `.env` file in the `client` directory and add the following environment variables:
   ```plaintext
    VITE_CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
    VITE_CLOUDINARY_API_KEY=<your-cloudinary-api-key>
    VITE_CLOUDINARY_UPLOAD_ASSET=<your-cloudinary-upload-asset>
    VITE_CLOUDINARY_CLOUD_NAME=<your-cloudinar-cloud-name>
    VITE_SERVER_URL=<your-server-deployed-url>
   ```


7. Start the frontend server:

   ```bash
   cd client
   npm run dev
   ```

8. Open your browser and visit `http://localhost:5173` to view the application.

### Live Link 
- Frontend : https://dev-blog-110.onrender.com
- Backend : https://dev-blog-backend-110.onrender.com
## Contributing

Contributions are welcome! If you find any issues or want to add new features, feel free to open an issue or submit a pull request.
