# Guruzone - An Innovative Educational Platform

## Table of Contents

- [Project Overview](#project-overview)
- [API Documentation](#api-documentation)
- [Project Details](#project-details)
- [Installation](#installation)
- [License](#license)

## Project Overview

Guruzone is an innovative educational platform that connects students with experienced teachers and tutors across a wide range of subjects and learning levels. The platform aims to provide personalized learning experiences, enhance educational outcomes, and foster a sense of community among learners and educators.

## API Documentation

### Authentication

#### Register a new user
- **Route**: `POST /api/v1/auth/register`
- **Access**: Public

#### Log in a user
- **Route**: `POST /api/v1/auth/login`
- **Access**: Public

#### Get the current user's information
- **Route**: `GET /api/v1/auth/user`
- **Access**: Private

### Lesson Requests

#### Send a lesson request
- **Route**: `POST /api/v1/lessonRequest/send-request`
- **Access**: Private

#### Get pending lesson requests
- **Route**: `GET /api/v1/lessonRequest/pending-requests`
- **Access**: Private

#### Get lesson requests from students
- **Route**: `GET /api/v1/lessonRequest/student-requests`
- **Access**: Private

#### Get lesson requests from teachers
- **Route**: `GET /api/v1/lessonRequest/teacher-requests`
- **Access**: Private

#### Accept or decline a lesson request
- **Route**: `PUT /api/v1/lessonRequest/acceptdecline/:requestId`
- **Access**: Private

#### Cancel a lesson request
- **Route**: `DELETE /api/v1/lessonRequest/cancel-request/:requestId`
- **Access**: Private

#### Get a specific lesson request by ID
- **Route**: `GET /api/v1/lessonRequest/request/:requestId`
- **Access**: Private

## Project Details

- **Name**: vadodara-hackthon-4.0
- **Version**: 1.0.0
- **Description**: Vadodara Hackthon 4.0
- **Main**: server.js

## Installation

To get started with Guruzone, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/SuraniHarsh/VadodaraHackthon-4.0.git
   cd VadodaraHackthon-4.0
   npm install
   npm run dev

## License

This project is licensed under the ISC License. You can find the full license details in the [LICENSE](LICENSE) file.
