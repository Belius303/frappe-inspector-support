# VS Code Community Extension Host results

These results are separate from the CLI benchmark and from the manual screenshot checklist. They were produced by the repository's automated VS Code Extension Host harness, not by Playwright and not by controlling the user's installed editor UI.

- Installed public extension verified before the run: `mohamedtazihnyine.frappe-inspector@1.2.2`.
- Development Extension Host package version: `1.2.2`.
- Entitlement asserted in every run: `community`.
- Command executed in every workspace: `Frappe Inspector: Scan Project` through `frappeInspector.scan`.

| Project | Commit | DocTypes | Findings | Published editor diagnostics | Exit |
| --- | --- | ---: | ---: | ---: | ---: |
| ERPNext | `d59c5e36` | 532 | 1,392 | 1,392 | 0 |
| Payments | `aa351682` | 10 | 52 | 52 | 0 |
| Gameplan | `1de86a8f` | 29 | 98 | 98 | 0 |

ERPNext briefly caused VS Code's Extension Host watchdog to report an unresponsive host during the large scan. The host recovered, completed the scan, emitted the diagnostics above, and exited with code `0`. This is retained as a benchmark limitation and performance signal.

Reproduce from the private product repository after cloning the pinned projects into the benchmark workspace:

```powershell
code --list-extensions --show-versions
npm run test:vscode:benchmarks
```

No Pro editor feature, migration analysis, JSON export or SARIF export was tested. Screenshots of the VS Code UI remain manual and must follow [the screenshot checklist](manual-vscode-screenshot-checklist.md).
