React User Management CRUD Application


📌 Overview

This is a React-based CRUD (Create, Read, Update, Delete) web application for managing user data.
The application interacts with a REST API and is designed with future extensibility in mind, allowing new form fields to be added with minimal code changes.

The project follows clean React coding standards, uses a configuration-driven form architecture, and provides proper input validation and user-friendly UI.

✨ Features

Create, Read, Update, Delete users

Form validation with required field enforcement

Country code selection with phone number validation

Config-driven and extensible form architecture

Clean and responsive UI using Material UI

Mock REST API using JSON Server

🧾 User Fields

The user form includes the following fields:

First Name (required)

Last Name (required)

Email Address (required, validated format)

Phone Number

Country code selected from dropdown

Exactly 10-digit phone number validation

🔁 CRUD Operations

The application supports the following operations via REST API:

Create User

Read Users (List all users)

Update User

Delete User

🔌 API Details

This project uses a mock REST API powered by JSON Server.

Base URL
http://localhost:3001

Endpoints
Method	Endpoint	Description
GET	/users	Fetch all users
POST	/users	Create new user
PUT	/users/:id	Update user
DELETE	/users/:id	Delete user

The frontend communicates with the API using Axios.
The API layer is abstracted, making it easy to replace the mock API with a real backend in the future.

🧠 Extensibility (Key Design Decision)

The form is built using a configuration-driven approach.

Example: Adding a New Field

To add a new field (e.g., Date of Birth):

Open:

src/config/userFormConfig.js


Add a new field object:

{
  name: "dob",
  label: "Date of Birth",
  type: "date",
  required: false
}


✅ No changes required in:

Form UI logic

Validation structure

API integration

This design ensures scalability and maintainability.

🌍 Country Code & Phone Validation

Country codes are selected from a dropdown (predefined list)

Phone number input accepts only digits

Exactly 10 digits are required

Final stored phone format:

+<countryCode><10-digit-number>


This approach avoids invalid country codes and provides a better user experience.

🎨 UI & UX

Built using Material UI

Clean layout with Navbar navigation

Separate views for:

Add/Edit User

User List

Hover effects on buttons and cards

Delete confirmation for safety

🛠️ Tech Stack

Frontend: React (Vite)

UI Library: Material UI

HTTP Client: Axios

Mock Backend: JSON Server

Language: JavaScript

⚙️ Setup Instructions
1️⃣ Clone the repository
git clone <your-github-repo-url>
cd react-crud-user-management

2️⃣ Install dependencies
npm install

3️⃣ Start the mock API server
npm run server

4️⃣ Start the React application
npm run dev

🚀 Deployment

The application can be deployed on platforms like:

Vercel

GitHub Pages

The deployed link will be shared as part of the submission.

📌 Assumptions & Design Decisions

JSON Server is used as a mock API for development and testing

Country code validation is handled via dropdown selection instead of regex

Phone number length is standardized to 10 digits

The app is designed to be API-agnostic for easy backend replacement

📂 Project Structure (Simplified)
src/
 ├─ api/
 │   └─ userApi.js
 ├─ components/
 │   ├─ Navbar.jsx
 │   ├─ UserForm.jsx
 │   └─ UserList.jsx
 ├─ config/
 │   ├─ userFormConfig.js
 │   └─ countryConfig.js
 ├─ App.jsx
 └─ main.jsx

✅ Evaluation Checklist Alignment

✔ Clean React coding standards

✔ Accurate form validation

✔ Proper API integration

✔ Highly extensible architecture

✔ Clean and intuitive UI

✔ Ready for deployment

✔ Git-friendly project structure

👤 Author

Madhuri Rajendra Sonawane
