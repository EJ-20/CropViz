CropViz is a full-stack web application that visualizes historical crop yield data across Canada using an interactive Leaflet map. It allows users to explore agricultural trends by crop type and year, with support for geospatial filtering and responsive UI.

This project was built as a simulation tool for smart agriculture platforms, suitable for organizations interested in analyzing distributed crop output at scale. Built using MongoDB, Express, React, and Node.js (MERN stack), it also highlights proficiency in geospatial data manipulation, RESTful API development, and frontend data visualization.


🔍 Features

   🗺️ Interactive Leaflet map bounded to Canadian territory

   🌱 Crop type and year filters with dynamic marker updates

   📦 Backend REST API with Mongoose for querying crop data

   📍 Custom marker icons based on crop type

   🧭 Recenter button to quickly navigate to the primary map region

   ⚡ Efficient frontend state management and API integration

   🧪 Comprehensive testing suite for both backend and frontend

📊 Tech Stack
Frontend:	React, TypeScript, Tailwind CSS
Mapping:	Leaflet.js, React-Leaflet
Backend:	Node.js, Express.js
Database:	MongoDB Atlas, Mongoose
Testing:	Jest, Supertest, React Testing Library
Tooling:	Nodemon, concurrently, dotenv
DevOps:    	Git, npm


🚀 Getting Started

Clone the repository:

    git clone https://github.com/your-username/CropViz.git
    cd CropViz

Setup backend:

Navigate to backend folder:

    cd backend
    npm install

Create a .env file:

    MONGO_URI=mongodb+srv://youruser:yourpass@yourcluster.mongodb.net/?retryWrites=true&w=majority
    PORT=5000

Transform and insert data into MongoDB:

    node scripts/transformAndInsert.js


Setup frontend:

 Navigate to frontend:

    cd ../frontend
    npm install

 Nagivate back to the root directory:

    npm start dev

   
   
Visit: http://localhost:3000


🧪 Testing

The project includes comprehensive testing for both backend and frontend components:

Backend Testing:
- API endpoint testing with Supertest
- Database integration tests
- Error handling validation
- Query parameter filtering tests

Run backend tests:
```bash
cd backend
npm test
```

Frontend Testing:
- Component rendering tests with React Testing Library
- User interaction testing
- UI element validation
- Jest test runner integration

Run frontend tests:
```bash
cd frontend
npm test
```

Test Coverage:
- Backend API endpoints (`/api/crops`)
- Query parameter filtering (crop type, year)
- Error handling for invalid inputs
- Frontend component rendering
- User interface interactions


🧠 Skills Demonstrated

   🔧 Full-stack development with REST API and database design

   🧭 Interactive geospatial visualization with Leaflet and React

   📊 Data cleaning and transformation using custom scripts

   💡 State-driven filtering and UI responsiveness

   ⚙️ Working with environment configs and deployment-ready structure

   🧪 Comprehensive testing implementation with Jest and React Testing Library

   🔍 API testing with Supertest for backend validation

   🎯 Component testing for frontend reliability



<img width="2425" height="847" alt="image" src="https://github.com/user-attachments/assets/d42c1cf7-15ee-493a-b26a-4f9cd3aa94fc" />

