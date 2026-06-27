# Atlas

Atlas is an enterprise technical documentation and knowledge management platform for complex engineering products, built as a modular monolith.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | Next.js, React, TypeScript, Tailwind CSS, shadcn/ui |
| Backend | Java 21, Spring Boot, Spring Security, Spring Data JPA |
| Database | PostgreSQL, Flyway |
| Infrastructure | Docker, Docker Compose |

## Repository Structure

```text
atlas/
├── frontend/      Next.js application
├── backend/        Spring Boot application
├── storage/        Uploaded asset storage (documents, media, etc.)
├── demo/           Sample demonstration content
├── docs/           Architecture, API, and decision records
├── scripts/        Local development automation scripts
├── docker/         Container configuration isolated from app code
└── docker-compose.yml
```

See [docs/architecture](docs/architecture) and the project's numbered planning documents for the complete architecture, database design, and API specification.

## Getting Started

1. Copy `.env.example` to `.env` and adjust values as needed.
2. Run `./scripts/setup.sh` to verify prerequisites.
3. Run `./scripts/start-dev.sh` to start PostgreSQL, the backend, and the frontend.
4. Backend: http://localhost:8080 · Frontend: http://localhost:3000

## Development

Backend:

```bash
cd backend
./gradlew bootRun
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

## Scripts

| Script | Purpose |
| --- | --- |
| `scripts/setup.sh` | Verify required tooling and prepare `.env` |
| `scripts/start-dev.sh` | Start the full stack via Docker Compose |
| `scripts/seed-data.sh` | Load demo content into the database |
| `scripts/backup.sh` | Back up the PostgreSQL database |
| `scripts/clean.sh` | Remove build artifacts and containers |

## Project Status

Gate 1 — Project Foundation. See `08_IMPLEMENTATION_ROADMAP.md` for the full implementation sequence.
