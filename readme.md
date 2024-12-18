# Project: Full Stack Application with FastAPI and React

This repository contains a full-stack application with a **FastAPI backend** and a **React frontend**.

---

## Folder Structure

```
root-directory/
|
|-- backend/    # Contains the FastAPI application
|-- frontend/   # Contains the React application
```

---

## Backend Setup (FastAPI)

The `backend/` folder contains the FastAPI application.

### Prerequisites

- Python 3.8+
- Virtual environment tool (e.g., `venv` or `conda`)

### Installation

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Set the PRODUCTION=False while testing locally and PRODUCTION=True while deploying in production.

5. Run the FastAPI application:
   ```bash
   uvicorn main:app --reload
   ```
   The backend will be available at `http://127.0.0.1:8000`.

## Frontend Setup (React)

The `frontend/` folder contains the React application.

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The frontend will be available at `http://localhost:3000`.

---
