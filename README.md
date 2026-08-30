# Mohammad Rehan Jirayat Portfolio

Production-style personal portfolio foundation for a Java Spring Boot Developer.

## Repository layout

- `frontend/` - React, TypeScript, Vite, and Tailwind CSS application
- `backend/` - Java 21 and Spring Boot Maven application

## Local prerequisites

- Node.js 20.19+ or 22.12+
- npm 10+
- JDK 21
- Maven 3.9+

## Run locally

Frontend:

```powershell
cd frontend
npm install
npm run dev
```

Backend:

```powershell
cd backend
mvn spring-boot:run
```

The frontend and backend currently contain bootstrap code only. Portfolio pages, APIs, authentication, and database setup are intentionally deferred.
