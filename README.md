# Serenity Homes

Welcome to Serenity Homes, a full-stack web application that allows users to browse, manage, and create property listings. This application provides robust user authentication, dynamic listing management, image uploads, and a user-friendly interface.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [License](#license)
- [References](#references)

## Features

- **User Authentication**: Secure sign-up, sign-in, and Google OAuth login.
- **Profile Management**: Users can update their profiles, including uploading profile pictures.
- **Listing Management**: Users can create, update, delete, and view property listings.
- **Image Upload**: Integrated with Firebase Storage for handling image uploads.
- **Search and Filter**: Users can search for listings and apply filters based on various criteria.
- **Responsive Design**: Built with Tailwind CSS, ensuring a responsive and mobile-friendly interface.

## Tech Stack

### Frontend

- **React**: For building the user interface.
- **Vite**: As the development server and build tool.
- **Tailwind CSS**: For styling the application.
- **Redux Toolkit**: For state management.
- **React Router**: For routing.
- **Firebase**: For image storage and Google OAuth.

### Backend

- **Node.js**: JavaScript runtime.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: Database for storing user and listing data.
- **Mongoose**: ODM for MongoDB.
- **JWT**: For user authentication tokens.
- **Bcrypt.js**: For password hashing.

## Installation

### Prerequisites

- **Node.js** (v14.x or later)
- **npm** or **Yarn**
- **MongoDB** instance (local or cloud-based)
- **Firebase** account for storage and OAuth

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/serenity-homes.git
   cd serenity-homes
   ```

2. Set up environment variables:
   - Create a `.env` file in the root directory with the following:
     ```plaintext
     MONGO=<your_mongodb_connection_string>
     JWT_SECRET=<your_jwt_secret_key>
     ```

3. Install dependencies and start the server:
   ```bash
   npm install
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd serenity-homes-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a `.env` file in the `serenity-homes-ui` directory with the following:
     ```plaintext
     VITE_FIREBASE_API_KEY=<your_firebase_api_key>
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

### Running the Application

- **Backend**: Navigate to the root directory and run `npm run dev`.
- **Frontend**: Navigate to the `serenity-homes-ui` directory and run `npm run dev`.

### Building for Production

- **Backend**: The backend is ready for deployment as configured.
- **Frontend**: To build the frontend for production, run:
  ```bash
  npm run build
  ```

## Project Structure

```plaintext
serenity-homes/
│
├── serenity-homes-api/      # Backend directory
│   ├── controllers/         # Route handlers
│   ├── models/              # Mongoose models
│   ├── routes/              # Express routes
│   ├── utils/               # Utility functions and middleware
│   ├── index.js             # Entry point for the API
│   └── .env                 # Environment variables (not included in repo)
│
├── serenity-homes-ui/       # Frontend directory
│   ├── src/                 # React source files
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── redux/           # Redux store and slices
│   │   └── firebase.js      # Firebase configuration
│   ├── public/              # Static files
│   ├── .env                 # Frontend environment variables (not included in repo)
│   └── index.html           # HTML template
│
└── README.md                # Project documentation
```

## API Documentation

### **User Routes**

- **POST /api/auth/signup**: Register a new user.
- **POST /api/auth/signin**: Authenticate a user and issue a JWT.
- **POST /api/auth/google**: Authenticate a user via Google OAuth.
- **GET /api/auth/signout**: Sign out the current user.
- **POST /api/user/update/:id**: Update user information.
- **DELETE /api/user/delete/:id**: Delete the current user.

### **Listing Routes**

- **POST /api/listing/create**: Create a new listing.
- **POST /api/listing/update/:id**: Update an existing listing.
- **DELETE /api/listing/delete/:id**: Delete a listing.
- **GET /api/listing/get/:id**: Retrieve a specific listing.
- **GET /api/listing/get**: Retrieve all listings with optional filters.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## References

This project was inspired by and based on a tutorial by Sahand Ghavidel. You can find the tutorial on YouTube [here](https://www.youtube.com/watch?v=VAaUy_Moivw).

