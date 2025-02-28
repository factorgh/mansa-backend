# Hospital Queuing System Backend

## Overview
The Hospital Queuing System Backend is built using **Express.js**, providing a scalable and efficient solution for managing patient queues in hospitals. It ensures smooth patient flow, reduces wait times, and improves operational efficiency.

## Features
- **Patient Registration**: Register and store patient details.
- **Queue Management**: Assign patients to different queues based on urgency.
- **Real-time Updates**: WebSocket integration for real-time queue updates.
- **Admin Dashboard**: Manage queues, doctors, and patient assignments.
- **JWT Authentication**: Secure user access with token-based authentication.
- **Role-Based Access Control (RBAC)**: Define access levels for admins, doctors, and patients.
- **Database Integration**: MongoDB support for patient and queue data storage.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Token)
- **Real-time Communication**: WebSockets (Socket.io)
- **API Documentation**: Swagger
- **Testing**: Jest, Supertest

## Installation
### Prerequisites
- Node.js installed
- MongoDB running locally or on a cloud service

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/hospital-queuing-backend.git
   cd hospital-queuing-backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a **.env** file and configure environment variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```sh
   npm run dev
   ```

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | User login and get token |
| GET | /api/patients | Retrieve all patients |
| POST | /api/patients | Register a new patient |
| GET | /api/queues | Retrieve active queues |
| POST | /api/queues | Add a patient to a queue |

## Contributing
1. Fork the repository.
2. Create a new branch (`feature/your-feature`).
3. Commit your changes and push to the branch.
4. Open a pull request.

## License
This project is licensed under the **MIT License**.

## Contact
For questions or contributions, reach out via **abdulaziz021099@gmail.com** or open an issue in the repository.

