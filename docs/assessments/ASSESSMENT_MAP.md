# Project 07 — Assessment map

| # | Assessment | Implemented/demo coverage | Remaining evidence / caveats |
|---|---|---|---|
| 01 | HRMS frontend | Dashboard, directory, leave, attendance, payroll overview, reviews | Expand UX and screenshots |
| 02 | Backend APIs | REST routes for core HR modules | Additional pagination/filter edge cases |
| 03 | HR database | SQL schema, keys, checks, indexes | ERD image can be generated from schema |
| 04 | Security | JWT, role guards, protected salary endpoints, audit | Full resource-level authorization review |
| 05 | Payroll engine | Python Decimal calculations, configurable inputs | Validate local policy rules |
| 06 | Analytics | Headcount/attendance/leave/attrition endpoints | Extend trend data and visualization |
| 07 | Attendance & leave | Clock events, leave overlap, approval, balance update | Timezone/holiday sophistication |
| 08 | Integrations | Mock email/calendar/storage and payroll CSV export | No real provider credentials/webhooks |
| 09 | Docker | Compose with web, API, Python, DB, Redis | Verify on target host |
| 10 | Governance | PR template, CODEOWNERS sample, protected branch guidance | Configure GitHub settings manually |
| 11 | CI/CD | GitHub Actions tests/build checks | Deployment workflow needs secrets/target |
| 12 | Testing | API and payroll unit tests | Add full E2E/security/coverage suite |
| 13 | API docs | OpenAPI for FastAPI, Express route inventory | Postman collection included |
| 14 | Deployment | Hardening checklist | No live cloud deployment provided |
| 15 | Incident simulation | Incident runbook and idempotent payroll guard | Run exercises and attach evidence |

Features are labelled accurately; this is an educational starter implementation, not audited production HR software.
