# Frappe Inspector Report

- Mode: scan
- License: community
- Errors: 3
- Warnings: 1
- Risky migrations: 0
- Needs review: 0

## Errors

- **FI010** Unknown DocType "Newsletter". (apps/erpnext/erpnext/public/js/newsletter.js:4)
- **FI010** Unknown DocType "CRM Deal". (apps/erpnext/erpnext/selling/doctype/quotation/quotation.py:246)
- **FI010** Unknown DocType "Time Log". (apps/erpnext/erpnext/templates/pages/timelog_info.py:7)

## Warnings

- **FI002** Payment Gateway Account.payment_gateway: Payment Gateway Account.payment_gateway points to unknown DocType "Payment Gateway". (apps/erpnext/erpnext/accounts/doctype/payment_gateway_account/payment_gateway_account.json:21)

## Notes

- **FI010** Unknown DocType "Payment Gateway". (apps/erpnext/erpnext/accounts/doctype/payment_request/test_payment_request.py:68)
- **FI010** Unknown DocType "Payment Gateway". (apps/erpnext/erpnext/accounts/doctype/payment_request/test_payment_request.py:1011)
- **FI010** Unknown DocType "Land Unit". (apps/erpnext/erpnext/patches/v11_0/merge_land_unit_with_location.py:37)
- **FI010** Unknown DocType "Member". (apps/erpnext/erpnext/patches/v11_0/rename_members_with_naming_series.py:6)
- **FI010** Unknown DocType "Member". (apps/erpnext/erpnext/patches/v11_0/rename_members_with_naming_series.py:7)
- **FI010** Unknown DocType "Woocommerce Settings". (apps/erpnext/erpnext/patches/v11_1/woocommerce_set_creation_user.py:7)
- **FI010** Unknown DocType "Service Level". (apps/erpnext/erpnext/patches/v12_0/set_priority_for_support.py:36)
- **FI010** Unknown DocType "Service Level". (apps/erpnext/erpnext/patches/v12_0/set_priority_for_support.py:53)
- **FI010** Unknown DocType "Member". (apps/erpnext/erpnext/patches/v13_0/update_member_email_address.py:16)
- **FI010** Unknown DocType "Member". (apps/erpnext/erpnext/patches/v13_0/update_member_email_address.py:18)
- **FI010** Unknown DocType "Member". (apps/erpnext/erpnext/patches/v13_0/update_member_email_address.py:21)
- **FI010** Unknown DocType "Service Level". (apps/erpnext/erpnext/patches/v13_0/update_sla_enhancements.py:26)
- **FI010** Unknown DocType "Repost Accounting Ledger Settings". (apps/erpnext/erpnext/patches/v14_0/add_default_for_repost_settings.py:9)
- **FI010** Unknown DocType "Closing Stock Balance". (apps/erpnext/erpnext/patches/v15_0/refactor_closing_stock_balance.py:54)
- **FI010** Unknown DocType "BOM Scrap Item". (apps/erpnext/erpnext/patches/v16_0/co_by_product_patch.py:26)
