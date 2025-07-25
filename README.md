### ✅ ` (React + Vite)

```md
# Appointment Scheduler - Frontend (React + Vite)

## ⚛️ Features

- Client view: View, Book, View My Appointments
- Admin panel: View & Add Slots, View All Appointments
- Axios API integration with ASP.NET Core backend
- Tailwind CSS for styling
- React Router v6 for navigation

---

## ⚙️ Setup

### 1. Install dependencies

```bash
npm install

npm run dev

Check src/api/api.js:

import axios from "axios";

const API = axios.create({
  baseURL: "https://localhost:7038/api", // Backend base URL
});

export default API;




