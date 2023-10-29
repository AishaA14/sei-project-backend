# The One Piece Orchard Backend

## Description

The One Piece Orchard Backend is the server-side component of the One Piece Orchard project. It's built using Node.js and Express.js to handle API requests and interact with the MongoDB database. This backend supports the frontend application for managing Devil Fruit entries.

## Table of Contents

- [Deployment Link](#deployment-link)
- [Features](#features)
- [Installation](#installation)
- [Timeframe & Working Team](#timeframe--working-team)
- [Technologies Used](#technologies-used)
- [Brief](#brief)
- [Planning](#planning)
  - [Initial Steps](#initial-steps)
  - [Sketches and Diagrams](#sketches-and-diagrams)
- [Build/Code Process](#buildcode-process)
- [Challenges](#challenges)
  - [Technical Challenges](#technical-challenges)
- [Key Learnings/Takeaways](#key-learningstakeaways)
- [Future Improvements](#future-improvements)

## Deployment Link

This repository is not deployed independently. It's an integral part of the One Piece Orchard project, and you can access it through the frontend deployment link provided in the frontend repository.

## Features

The backend of The One Piece Orchard provides a robust set of features to support the functionality of the Devil Fruit catalog and user management. Here are the key features of the backend system:

### 1. RESTful API

- **API Endpoints**: The backend offers a set of well-defined RESTful API endpoints for managing Devil Fruits and user accounts, supporting CRUD (Create, Read, Update, Delete) operations.

### 2. Devil Fruit Management

- **Create Devil Fruits**: Users can create new Devil Fruit entries by sending POST requests to the appropriate API endpoint. The backend validates the input and stores the new entries in the database.

- **Edit Devil Fruits**: Existing Devil Fruit entries can be updated using PUT requests. The backend ensures that only authorized users can modify these entries.

- **Delete Devil Fruits**: Users can request the removal of Devil Fruits by sending DELETE requests. The backend confirms the action, and the corresponding Devil Fruit is removed from the catalog.

### 3. User Management

- **User Registration**: New users can create accounts by sending POST requests with their registration information. Passwords are securely hashed and stored in the database.

- **User Authentication**: Registered users can log in by sending their credentials to the authentication endpoint. The backend verifies the user's identity and issues a session token upon successful authentication.

- **User Session Management**: User sessions are maintained using session tokens, enabling user-specific interactions such as editing and deleting Devil Fruits. Sessions are secure and time-limited for added security.

- **User Logout**: Users can log out by sending a logout request. The backend invalidates the session token, effectively ending the user's session.

### 4. Authentication Middleware

- **Protected Routes**: The backend employs authentication middleware to protect certain routes. Unauthorized access is restricted, ensuring that only authenticated users can perform specific actions, such as editing or deleting Devil Fruits.

### 5. Database Integration

- **MongoDB Database**: The backend integrates with a MongoDB database to store Devil Fruit entries and user account data securely. The data is organized and retrievable via API endpoints.

### 6. Data Validation

- **Input Validation**: The backend performs input validation to ensure that the data submitted by users is in the correct format and adheres to defined constraints. This helps maintain data integrity and security.

### 7. Error Handling

- **Comprehensive Error Handling**: The backend provides detailed error messages and status codes to assist frontend developers and users in diagnosing issues and improving the user experience.

These features combine to create a powerful backend system that supports the frontend's functionality and user interaction. The backend ensures data consistency, user security, and smooth user experiences within The One Piece Orchard application.


## Installation

To run the backend code locally, follow these steps:

Clone the repository: git clone https://github.com/AishaA14/one-piece-orchard-backend.git

Navigate to the project directory: cd one-piece-orchard-backend

Install dependencies: npm install

Create a .env file and set your environment variables.

Start the server: npm start

## Timeframe & Working Team

This project was completed within a week, working independently. 

## Technologies Used

Backend: Node.js, Express.js
Database: MongoDB
Version Control: Git
Development Tools: Visual Studio Code, Postman.

## Brief

The backend's main goal was to provide RESTful API endpoints for the frontend to perform CRUD operations on Devil Fruit entries stored in the MongoDB database.

## Planning

### Entity Relationship Diagram and Schema

To design the database structure for The One Piece Orchard backend, I utilized Lucidchart to create an Entity Relationship Diagram (ERD). This ERD helped me visualize and plan the relationships between key entities, such as users and devil fruits, as well as the schema for reviews. Here's a brief overview of the structure:

### Entity Relationship Diagram (ERD)

We used Lucidchart to create an ERD that illustrates how different entities in our database are connected. Specifically, I focused on the relationship between users and devil fruits. This diagram was instrumental in ensuring the correct setup of relationships, foreign keys, and data flow.

### User-Devil Fruit Relationship

The ERD showcases the one-to-many relationship between users and devil fruits. Users can be associated with multiple devil fruits, and each devil fruit belongs to a single user. This relationship was vital in implementing user authentication and data security.

### Review Schema

In addition to the ERD, I defined the schema for reviews. Devil fruits can have multiple reviews associated with them, allowing users to share their thoughts and opinions. The review schema details the structure of review data, including fields such as the reviewer's name, rating, and comments.

These visualizations served as a valuable reference throughout the development process, ensuring that our database accurately represents the relationships between users, devil fruits, and reviews. This approach streamlined the implementation of features like user authentication and the association of data in our backend.

## Build/Code Process

### Connecting to the Database
I connected my backend to the MongoDB using Mongoose and set up error handling to ensure that connection is successful.

```js
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to the database')
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error)
    })
```
### Creating Models and Schemas
I defined Mogoose models and schemas for the fruit, review and user data, establishing the structure of the data and their relationships.

```js
const userSchema = new mongoose.Schema({
    // User schema fields
})

const User = mongoose.model('user', userSchema)

const fruitSchema = new mongoose.Schema({
    // Fruit schema fields
})

const Fruit = mongoose.model('fruit', fruitSchema)

const reviewSchema = new mongoose.Schema({
    // Review schema fields
})

const Review = mongoose.model('review', reviewSchema)
```

### Routes for Acessing Data
I defined route handler endpoints for acessing data such as fetching fruit, adding new fruits and editing them. This also includes validation logic and interacts with the database to perform CRUD operations. these routes serve as the interface for the frontend to interact with the backend API.

```js
// Route to home page
app.get('/', async (req, res) => {
    // Handling home page route
})

// Route to add a new Devil Fruit
app.post('/fruits/add', async (req, res) => {
    // Handling the addition of a new Devil Fruit
})

// Edit Fruit
app.put('/fruits/update/:id', async (req, res) => {
    // Handling the editing of a fruit
})

// Route to delete a fruit
app.delete('/fruits/:id', async (req, res) => {
    // Handling the deletion of a fruit
})
```

## Challenges

### Authentication and Authorization

**Challenge: User Sessions and Authentication Status**
- Verifying user identity and controlling access based on authentication status presented a challenge. I needed to seamlessly manage user sessions and communicate their authentication status accurately.

**Solution:**
- I integrated third-party authentication providers like Google to facilitate user login. Dynamic display of buttons and features was achieved to match users' privileges by checking their authentication status.

### Route Handling

**Challenge: Route Hierarchy**
- Designing the route hierarchy and organizing routes for clarity and efficiency required careful planning. Different parts of the application had to be structured properly in terms of routes.

**Solution:**
- I established a well-structured route hierarchy that grouped related routes logically. This enhanced clarity, making it easier to maintain and expand the application.

**Challenge: Route Conflicts**
- Avoiding conflicts in routes, particularly when similar route paths led to different endpoints, was a challenge. I aimed to make sure routes were distinct and unambiguous.

**Solution:**
- By carefully designing and organizing routes, I minimized the chances of conflicts. Each route was configured to have a unique path and endpoint, reducing the risk of conflicts.

**Challenge: Nested Routes**
- Managing parent-child relationships in applications with nested routes was essential. I needed to ensure that nested routes functioned as expected and that their organization made sense.

**Solution:**
- I structured nested routes logically to mirror the application's features and their interdependencies. This made navigation intuitive and efficient for users.

**Challenge: Route Guards**
- Implementing route guards for authentication and authorization was essential. However, configuring guards to control access to specific routes or features required careful integration.

**Solution:**
- I integrated route guards to check user authentication status and role-based permissions. This ensured that only authorized users could access specific routes and features.

In overcoming these challenges, I refined my development skills and implemented solutions that contribute to the smooth and secure operation of The One Piece Orchard.


## Key Learnings/Takeaways

Through this project, I improved my skills in building RESTful APIs with Node.js and Express.js. I also gained a better understanding of database interactions and user authentication.

## Future Improvements

Implement caching for improved performance.
Enhance security measures for user authentication.
Add API documentation for developers.









