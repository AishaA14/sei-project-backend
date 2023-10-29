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
  - [Logic Flow](#logic-flow)
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
Development Tools: Visual Studio Code, Postman

## Brief

The backend's main goal was to provide RESTful API endpoints for the frontend to perform CRUD operations on Devil Fruit entries stored in the MongoDB database.

## Planning

### Initial Steps

Before diving into the code, I took some time to plan out the website. This planning stage was crucial for understanding how the website would work, defining its logic, and ensuring a smooth development process.

### Sketches and Diagrams

I used Excalidraw, a collaborative whiteboard tool, to create visual sketches and diagrams that helped me visualize the website's components and user interactions. These sketches allowed me to map out the following key aspects of the website:

insert here

### Logic Flow

insert

[Excalidraw Diagram](excalidraw.png)

## Build/Code Process

I developed the backend to handle CRUD operations for Devil Fruit entries, implemented user authentication and authorization, and ensured proper error handling. The code is well-structured and follows best practices.

## Challenges

### Technical Challenges

### Wins

[Highlight interesting problem-solving moments]
[Discuss strong sections of code]

## Key Learnings/Takeaways

Through this project, I improved my skills in building RESTful APIs with Node.js and Express.js. I also gained a better understanding of database interactions and user authentication.

## Future Improvements

Implement caching for improved performance.
Enhance security measures for user authentication.
Add API documentation for developers.









