# StackBlogs Backend

StackBlogs Backend is the server component of the StackBlogs web application. It handles the backend logic and data storage for the web development blog platform. Here are the key packages and dependencies used in the backend:

## Backend Dependencies

- **bcrypt** (^5.1.1): Bcrypt is used for hashing and securely storing user passwords in the database.

- **body-parser** (^1.20.2): Body-parser is middleware used to parse incoming request bodies in various formats, making it easier to handle data sent from clients.

- **cors** (^2.8.5): The CORS (Cross-Origin Resource Sharing) package is used to configure cross-origin HTTP requests, allowing the frontend and backend to communicate securely.

- **dotenv** (^16.3.1): Dotenv is used to load environment variables from a `.env` file, allowing you to store configuration settings separate from your code.

- **express** (^4.18.2): Express is a popular web application framework for Node.js, used to build the RESTful API for StackBlogs.

- **mongoose** (^7.5.3): Mongoose is an Object Data Modeling (ODM) library for MongoDB, making it easier to interact with the database and define data schemas.

- **nodemon** (^3.0.1): Nodemon is a development tool that automatically restarts the Node.js application when changes are detected, making the development process more efficient.

## Getting Started

1. Clone this repository to your local machine.
2. Install the backend dependencies using a package manager (e.g., npm or yarn):

   ```node
   npm i bcrypt body-parser cors dotenv express mongoose nodemon
   
