# Mohammad Rehan Jirayat Portfolio

Personal portfolio for my Java backend work, projects, skills, and education.

## Stack

- Frontend: React, TypeScript, and Vite
- Backend: Java 21 and Spring Boot

## Run locally

Start the backend from `backend/`:

```powershell
mvn spring-boot:run
```

Start the frontend from `frontend/`:

```powershell
npm install
npm run dev
```

The frontend uses the backend API for portfolio content. Set `VITE_API_BASE_URL` in `frontend/.env` to the backend URL (for example, `http://localhost:8080`).

## Production build

From `frontend/`:

```powershell
npm run build
```
