# Frappe Inspector Report

- Mode: scan
- License: community
- Errors: 36
- Warnings: 7
- Risky migrations: 0
- Needs review: 0

## Errors

- **FI010** Unknown DocType "User". (insights/api/__init__.py:36)
- **FI010** Unknown DocType "User". (insights/api/translations.py:9)
- **FI010** Unknown DocType "User". (insights/api/user.py:23)
- **FI010** Unknown DocType "User". (insights/api/user.py:43)
- **FI010** Unknown DocType "User". (insights/api/user.py:254)
- **FI010** Unknown DocType "View Log". (insights/api/workbooks.py:46)
- **FI010** Unknown DocType "DocShare". (insights/api/workbooks.py:83)
- **FI010** Unknown DocType "DocShare". (insights/api/workbooks.py:96)
- **FI010** Unknown DocType "DocShare". (insights/api/workbooks.py:152)
- **FI010** Unknown DocType "DocShare". (insights/api/workbooks.py:179)
- **FI010** Unknown DocType "DocShare". (insights/insights/doctype/insights_dashboard_v3/insights_dashboard_v3.py:213)
- **FI010** Unknown DocType "Insights Data Source". Did you mean "Insights Data Source v3"? (insights/insights/doctype/insights_data_source_v3/patches/copy_data_sources.py:8)
- **FI010** Unknown DocType "Insights Data Source". Did you mean "Insights Data Source v3"? (insights/insights/doctype/insights_data_source_v3/patches/copy_data_sources.py:15)
- **FI010** Unknown DocType "DocType". (insights/insights/doctype/insights_table_v3/insights_table_v3.py:312)
- **FI010** Unknown DocType "DocField". (insights/insights/doctype/insights_table_v3/insights_table_v3.py:454)
- **FI010** Unknown DocType "Custom Field". (insights/insights/doctype/insights_table_v3/insights_table_v3.py:465)
- **FI010** Unknown DocType "DocType". (insights/insights/doctype/insights_table_v3/patches/force_sync_tables.py:15)
- **FI010** Unknown DocType "User". (insights/insights/doctype/insights_team/insights_team.py:82)
- **FI010** Unknown DocType "User". (insights/insights/doctype/insights_team/insights_team.py:342)
- **FI010** Unknown DocType "User". (insights/insights/doctype/insights_user_invitation/insights_user_invitation.py:97)
- **FI031** Patch target "insights.patches.check_legacy_v2_data_before_upgrade" could not be resolved in local apps. (insights/patches.txt:2)
- **FI031** Patch target "insights.patches.normalize_workbook" could not be resolved in local apps. (insights/patches.txt:3)
- **FI031** Patch target "insights.insights.doctype.insights_data_source_v3.patches.copy_data_sources" could not be resolved in local apps. (insights/patches.txt:6)
- **FI031** Patch target "insights.insights.doctype.insights_table_v3.patches.force_sync_tables" could not be resolved in local apps. (insights/patches.txt:7)
- **FI031** Patch target "insights.patches.enable_data_store" could not be resolved in local apps. (insights/patches.txt:8)
- **FI031** Patch target "insights.insights.doctype.insights_data_source_v3.patches.set_type" could not be resolved in local apps. (insights/patches.txt:9)
- **FI031** Patch target "insights.patches.migrate_warehouse_tables_to_schemas" could not be resolved in local apps. (insights/patches.txt:11)
- **FI031** Patch target "insights.patches.fix_table_link_names" could not be resolved in local apps. (insights/patches.txt:12)
- **FI031** Patch target "insights.patches.backfill_query_references" could not be resolved in local apps. (insights/patches.txt:13)
- **FI031** Patch target "insights.patches.requalify_workbook_templates" could not be resolved in local apps. (insights/patches.txt:15)
- **FI031** Patch target "insights.patches.strip_default_schema_from_table_names" could not be resolved in local apps. (insights/patches.txt:16)
- **FI010** Unknown DocType "DocShare". (insights/tests/permissions_utils.py:125)
- **FI010** Unknown DocType "DocShare". (insights/tests/test_workbook_templates.py:154)
- **FI010** Unknown DocType "DocType". (insights/tests/utils.py:18)
- **FI010** Unknown DocType "ToDo". (insights/tests/workbook/test_querying.py:72)
- **FI010** Unknown DocType "File". (insights/utils.py:125)

## Warnings

- **FI030** Hook after_install target "insights.migrate.after_migrate" could not be resolved in local apps. (insights/hooks.py:96)
- **FI030** Hook after_migrate target "insights.migrate.after_migrate" could not be resolved in local apps. (insights/hooks.py:97)
- **FI030** Hook after_request target "insights.insights.doctype.insights_data_source_v3.insights_data_source_v3.after_request" could not be resolved in local apps. (insights/hooks.py:99)
- **FI030** Hook before_tests target "insights.tests.utils.before_tests" could not be resolved in local apps. (insights/hooks.py:186)
- **FI002** Insights Resource Permission.resource_type: Insights Resource Permission.resource_type points to unknown DocType "DocType". (insights/insights/doctype/insights_resource_permission/insights_resource_permission.json:15)
- **FI002** Insights Team Member.user: Insights Team Member.user points to unknown DocType "User". (insights/insights/doctype/insights_team_member/insights_team_member.json:13)
- **FI002** Insights User Invitation.invited_by: Insights User Invitation.invited_by points to unknown DocType "User". (insights/insights/doctype/insights_user_invitation/insights_user_invitation.json:30)
