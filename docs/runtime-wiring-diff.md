# Runtime Wiring Diff

The JetBrains Pro Migration Analyzer can compare two Git commits and show which runtime entry points changed in a Frappe application.

## What it compares

- `hooks.py` targets such as `doc_events`, `scheduler_events`, overrides and permissions;
- DocType Python controllers and changed function bodies;
- DocType client script event handlers such as `refresh`, `validate` and field events;
- `patches.txt` entries added, removed or changed;
- separate Git repositories found under a Frappe Bench `apps/` directory.

## Workflow

1. Open the Frappe Bench or application in a JetBrains IDE.
2. Open the **Frappe Inspector** Tool Window and select **Migrations**.
3. Enter the base and current Git refs, for example `origin/main` and `HEAD`.
4. Click **Compare**.
5. Open **Runtime wiring** and review added, removed and modified entries.
6. Double-click an entry to open the native IntelliJ diff for the affected file.

The feature is designed for regressions such as a custom script no longer firing after a refactor, a hook target being renamed, or a patch being removed before `bench migrate`. It does not execute Python or JavaScript and should complement staging migrations and functional tests.

Runtime wiring diff is a JetBrains Pro capability. Community continues to include basic hooks and patches validation and navigation.
