# Frappe Inspector Report

- Mode: scan
- License: community
- Errors: 9
- Warnings: 3
- Risky migrations: 0
- Needs review: 0

## Errors

- **FI010** Unknown DocType "Loan". (apps/hrms/hrms/hr/doctype/full_and_final_statement/full_and_final_statement_loan_utils.py:34)
- **FI010** Unknown DocType "Loan Repayment Schedule". (apps/hrms/hrms/hr/doctype/full_and_final_statement/full_and_final_statement_loan_utils.py:35)
- **FI010** Unknown DocType "Repayment Schedule". Did you mean "Payment Schedule"? (apps/hrms/hrms/hr/doctype/full_and_final_statement/full_and_final_statement_loan_utils.py:61)
- **FI010** Unknown DocType "Loan Repayment". (apps/hrms/hrms/hr/doctype/full_and_final_statement/full_and_final_statement_loan_utils.py:91)
- **FI010** Unknown DocType "Loan Interest Accrual". (apps/hrms/hrms/hr/doctype/full_and_final_statement/full_and_final_statement_loan_utils.py:98)
- **FI010** Unknown DocType "Loan Interest Accrual". (apps/hrms/hrms/hr/doctype/full_and_final_statement/full_and_final_statement_loan_utils.py:101)
- **FI010** Unknown DocType "Loan". (apps/hrms/hrms/hr/doctype/full_and_final_statement/full_and_final_statement.py:344)
- **FI010** Unknown DocType "Loan". (apps/hrms/hrms/payroll/doctype/salary_slip/salary_slip_loan_utils.py:76)
- **FI010** Unknown DocType "Loan Repayment". (apps/hrms/hrms/payroll/doctype/salary_slip/salary_slip_loan_utils.py:168)

## Warnings

- **FI002** Salary Slip Loan.loan: Salary Slip Loan.loan points to unknown DocType "Loan". (apps/hrms/hrms/payroll/doctype/salary_slip_loan/salary_slip_loan.json:20)
- **FI002** Salary Slip Loan.loan_repayment_entry: Salary Slip Loan.loan_repayment_entry points to unknown DocType "Loan Repayment". (apps/hrms/hrms/payroll/doctype/salary_slip_loan/salary_slip_loan.json:71)
- **FI002** Salary Slip Loan.loan_product: Salary Slip Loan.loan_product points to unknown DocType "Loan Product". (apps/hrms/hrms/payroll/doctype/salary_slip_loan/salary_slip_loan.json:80)

## Notes

- **FI010** Unknown DocType "Repost Accounting Ledger Settings". (apps/hrms/hrms/patches/v14_0/add_expense_claim_to_repost_settings.py:9)
- **FI010** Unknown DocType "Shift Assignment Schedule". (apps/hrms/hrms/patches/v15_0/migrate_shift_assignment_schedule_to_shift_schedule.py:11)
- **FI010** Unknown DocType "Interview Round". (apps/hrms/hrms/patches/v16_0/merge_interview_round_with_interview_type.py:8)
- **FI010** Unknown DocType "Loan". (apps/hrms/hrms/payroll/doctype/payroll_entry/test_payroll_entry.py:826)
- **FI010** Unknown DocType "Loan Repayment". (apps/hrms/hrms/payroll/doctype/payroll_entry/test_payroll_entry.py:929)
- **FI010** Unknown DocType "Loan Repayment". (apps/hrms/hrms/payroll/doctype/payroll_entry/test_payroll_entry.py:1330)
