# Incident simulation runbook

1. **Incorrect pay totals:** reproduce using a synthetic employee/period; compare component ledger and calculation input; inspect rounding; correct calculation; add regression test.
2. **Duplicate payroll:** inspect period uniqueness and payslip uniqueness; confirm transaction; re-run same period and verify no duplicate rows.
3. **Attendance discrepancy:** inspect ordered clock events and timezone; correct via an auditable correction event rather than deleting history.
4. **Salary access violation:** verify route guard, role claim, audit trail; revoke token/session and add a regression authorization test.
5. **Failed scheduled job:** inspect job ID and logs; classify transient/permanent; retry only idempotent work; record retry outcome.

Use synthetic records only. Document incident timeline, root cause, fix, regression test and prevention.
