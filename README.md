
# Assignment Explanation - Video, 

# Frontend Developer Assignment - MERN Stack, Cyethack

## Overview

This project is a React JS application that demonstrates key front-end development skills. It includes routing, state management with Redux, UI design using antd, and session management.

## Features

- **Routing**:
  - `/dashboard`: Displays a dashboard view.
  - `/list`: Shows a table of items with brief descriptions and unique `item_id`.
  - `/list/details`: Provides detailed information for a selected item, using `item_id` stored in session storage.

- **Data Handling**:
  - On `/list`, view a data table with item descriptions and `item_id`.
  - On `/list/details`, view detailed information of the selected item without reloading if the same item is selected.

- **Session Management**:
  - Simple login and logout functionality using cookies.

- **UI Design**:
  - Uses the Antd library for a modern and responsive design.

## Installation

### Prerequisites

- Node.js (version 14 or later)
- npm 

## Deplyment

- **Backend** : Render - https://cyethackbackend.onrender.com ,only works locally or in Postman (Due to free deployment)

### Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/piyush-agrawal6/Cyethack-Assignment.git
   ```
2. **Navigate to Project Directory**

   ```bash
   cd Cyethack-Assignment
   ```
3. **Install Dependencies**

   ```bash
   npm install
   ```
4. **Environment Variables**
   
- Create a .env file in the root directory and add:
  
   ```bash
   VITE_APP_BASE_URL = http://localhost:5000
   ```
- Create a .env file in the Backend directory and add:

   ```bash
   MONGO_URI= mongodb://localhost:27017
   JWT_SECRET= jwtsecret
   PORT=5000
   ```
5. **Run the Development Server**
   
   ```bash
   npm run dev
   ```
- and Backend as
  
   ```bash
   npm start
   ```
