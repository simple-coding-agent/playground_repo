# Pi Digit Explorer

This project enables users to explore the digits of π (Pi) through a simple modern web interface and a Python backend.

## Features

- Frontend: A minimal React interface that allows users to input a position and get the corresponding digit of π.
- Backend:
  - A Python Flask API that provides an endpoint to fetch the Nth digit of π.
  - A standalone Python script to compute and display the Nth digit of π in a console environment using a simple method.

## Project Structure

- `backend/`: Contains the Flask API and standalone script.
    - `app.py`: Flask application providing `/pi/<n>` endpoint.
    - `get_pi_digit.py`: Standalone script to compute the Nth digit of π.
- `frontend/`: The React frontend application to interact with the backend.

## Setup Instructions

### 1. Backend Setup

Requirements:
- Python 3.8+

Steps:
- Navigate to the backend directory:
  ```bash
  cd backend
  ```
- Install Flask:
  ```bash
  pip install flask
  ```
- Run the Flask application:
  ```bash
  python app.py
  ```
- To run the standalone script:
  ```bash
  python get_pi_digit.py <N>
  ```
  Replace `<N>` with the position of the digit you wish to see.

### 2. Frontend Setup

Requirements:
- Node.js and npm

Steps:
- Navigate to the frontend directory:
  ```bash
  cd frontend
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Run the development server:
  ```bash
  npm run dev
  ```
- Open a browser and go to `http://localhost:3000` to start using the application.

## Notes

- Ensure both the backend and frontend servers are running to properly view and interact with the application.
- Currently, the π digits are hardcoded for demonstration purposes. You may replace this with a more accurate method to compute digits of π.
