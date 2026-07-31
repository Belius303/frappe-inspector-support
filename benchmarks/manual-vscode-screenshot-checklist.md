# Manual VS Code Community screenshot checklist

Playwright renders only the benchmark HTML used for the published WebP files. It does not control VS Code. The following captures require a person using **VS Code Community** with the public extension and the exact repository commit.

## ERPNext

- Repository: `frappe/erpnext` at `d59c5e36`.
- File: `erpnext/accounts/doctype/pos_profile/pos_profile.json`, around line 417.
- Command: **Frappe Inspector: Scan Project**.
- Visible evidence: the Frappe Problems view and editor diagnostic for `POS Profile.utm_medium` targeting `UTM Campaign`.
- Capture area: editor line 417-420 plus the single matching Problems entry; exclude account names, local folders, terminals, notifications, and unrelated extensions.

## Payments

- Repository: `frappe/payments` at `aa351682`.
- File: `payments/payment_gateways/doctype/payment_gateway/payment_gateway.json`, around line 23.
- Command: **Frappe Inspector: Show DocType Graph**.
- Visible evidence: Payment Gateway and the missing or external `DocType` relation as rendered by the Community graph.
- Capture area: graph canvas, project label, and relation detail only; exclude local paths, user profile, terminals, and license UI.

## Gameplan

- Repository: `frappe/gameplan` at `1de86a8f`.
- File: `gameplan/patches.txt`, around line 6.
- Command: **Frappe Inspector: Scan Project**.
- Visible evidence: the `FI031` diagnostic for `team_user_profile.patches.create_user_profile` and the obsolete path in the editor.
- Capture area: editor line 6 plus the matching Problems entry; exclude local folders, usernames, terminals, notifications, and unrelated diagnostics.

Before publishing, confirm every image says or is captioned **VS Code Community**, shows the expected short commit, contains no username or absolute path, and does not imply that Playwright automated the editor capture.
