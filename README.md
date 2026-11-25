# PeopleCore HRMS

A modular educational HRMS/workforce management platform built around the Project 07 brief. It includes a Next.js UI, Express REST API, PostgreSQL schema, Python/FastAPI payroll and workforce analytics service, Redis, Docker Compose, tests, CI, API docs and synthetic seed data.

> Educational/demo software only. Uses synthetic employee data and a mock payroll export. It is not payroll/legal compliance software and must not be used for real payments or sensitive employee records.

## Stack
- Frontend: Next.js App Router, TypeScript, Tailwind CSS
- Core API: Node.js, Express, JWT auth, PostgreSQL (`pg`), Zod validation
- Processing service: Python, FastAPI, Pydantic, Decimal payroll calculator, analytics
- PostgreSQL; Redis; Docker Compose; GitHub Actions

## Quick start (Docker)
1. Copy `.env.example` to `.env` and replace the demo secrets.
2. Run `docker compose up --build`.
3. Open http://localhost:3000 (web), http://localhost:4000/health (API), http://localhost:8000/docs (Python service).
4. Demo accounts are seeded: `admin@peoplecore.test`, `hr@peoplecore.test`, `manager@peoplecore.test`, `employee@peoplecore.test` — password `DemoPass123!`. Change these before any deployment.

## Local development
- API: `cd apps/api && npm install && npm run dev`
- Web: `cd apps/web && npm install && npm run dev`
- Payroll/analytics: `cd services/payroll && pip install -r requirements.txt && uvicorn app.main:app --reload --port 8000`
- Database: start PostgreSQL and Redis, configure environment variables, then `cd apps/api && npm run migrate && npm run seed`.

## Tests
- API: `cd apps/api && npm install && npm test`
- Payroll/analytics: `cd services/payroll && pip install -r requirements.txt && pytest -q`
- Frontend: `cd apps/web && npm install && npm run lint`

## Demo modules
Employee directory and lifecycle, org/department records, onboarding tasks, attendance events, shifts, leave requests/approvals, salary components and payroll run preparation, payslip records, performance reviews, employee documents metadata, audit events, analytics, integrations demo, and mock payroll export.

## Security notes
- JWT auth and role checks are enforced in API middleware. Salary routes are payroll/HR/admin protected.
- Demo login credentials are for local-only use. JWT secret must be replaced.
- Uploads are represented as document metadata; no real document storage integration is configured.
- Payroll/bank export is a mock CSV download and never sends money.
- Production requires HTTPS, secret management, private database networking, backups and restore tests, retention controls, monitoring and a security review.

## Assessment map
See `docs/assessments/ASSESSMENT_MAP.md` and `docs/architecture/ARCHITECTURE.md`. This repository contains implementation starters and working demo paths for all assessment topics; integrations/deployment are simulated or documented where credentials/cloud infrastructure are not supplied. Do not claim a production deployment or external integration is complete.
