# Express API quick reference

All `/api` endpoints except `/api/auth/login` require `Authorization: Bearer <JWT>`. Roles are employee, manager, hr, payroll, admin.

- `POST /api/auth/login` — email/password, returns JWT.
- `GET /api/auth/me` — current token identity.
- `GET /api/dashboard` — overview metrics.
- `GET/POST /api/employees` — directory / HR-admin employee creation. `GET /api/employees/:id`.
- `GET/POST /api/departments` — department list and HR creation.
- `GET /api/attendance`; `POST /api/attendance/clock` — clock event.
- `GET/POST /api/leave`; `PATCH /api/leave/:id/decision` — request and approval.
- `GET/POST /api/shifts` — shifts.
- `GET /api/onboarding`; `PATCH /api/onboarding/:id` — tasks.
- `GET/POST /api/reviews` — performance reviews.
- `GET/POST /api/documents` — document metadata only.
- `GET /api/payroll/runs`; `POST /api/payroll/runs` with `{period: YYYY-MM}`; `GET /api/payroll/payslips`; `GET /api/payroll/export/:period` mock CSV.
- `GET /api/audit` — audit log.

FastAPI endpoints: `GET /health`, `POST /payroll/calculate`, `POST /analytics/summary`. Swagger at `/docs`.
