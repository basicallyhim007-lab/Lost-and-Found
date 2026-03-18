# Lost & Found Application

A full-stack web application to help reunite lost items with their owners.

## Features

- Report lost and found items
- Search and filter items by category
- Store items in MongoDB
- Responsive design with modern UI

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Project Structure

```
.
├── index.html           # Frontend HTML/CSS/JavaScript
├── server.js            # Express server
├── package.json         # Dependencies
├── .env                 # Environment configuration
├── models/
│   └── Item.js          # MongoDB Item schema
└── routes/
    └── items.js         # API routes
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally on port 27017)

### Installation

1. Navigate to the project directory:
   ```bash
   cd "GitHub 2"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Make sure MongoDB is running on your system.

4. Start the server:
   ```bash
   npm start
   ```

For development with auto-reload:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5000`

## API Endpoints

### Items

- `GET /api/items` - Get all items
- `GET /api/items/:id` - Get item by ID
- `GET /api/items/status/:status` - Get items by status (lost/found)
- `GET /api/items/search/:term` - Search items
- `POST /api/items` - Create new item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item

## Environment Variables

Configure in `.env` file:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/lost-found
NODE_ENV=development
```

## Notes

- Make sure MongoDB is running before starting the backend
- The frontend at `index.html` will connect to the backend API at `http://localhost:5000`
- If you see CORS errors, ensure the server is running on the correct port
