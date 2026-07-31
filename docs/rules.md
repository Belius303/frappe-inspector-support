# Frappe Inspector Rules

| Rule | Meaning | Default level |
| --- | --- | --- |
| `FI001` | Invalid DocType JSON | Warning |
| `FI002` | Relation points to an unknown DocType | Warning |
| `FI010` | Source references an unknown DocType | Error |
| `FI011` | Source references an unknown field | Error |
| `FI012` | Local whitelisted method cannot be resolved | Warning |
| `FI020` | Invalid fixture JSON | Warning |
| `FI021` | Custom Field targets an unknown DocType | Warning |
| `FI022` | Property Setter targets an unknown DocType | Warning |
| `FI023` | Property Setter targets an unknown field | Warning |
| `FI024` | Property Setter property is unsupported | Warning |
| `FI030` | Hook target cannot be resolved | Warning |
| `FI031` | Patch target cannot be resolved | Error |
| `FI040` | Request-controlled data reaches dynamically constructed SQL | Error |
| `FI041` | Guest endpoint reaches a state-changing operation without a visible guard | Error |
| `FI042` | Externally reachable code bypasses DocType permissions | Warning/Error |
| `FI043` | Request-controlled DocType, field or ordering identifier reaches a query API | Warning |
| `FI044` | Request-controlled data reaches an outbound URL (SSRF) | Error |
| `FI045` | Request-controlled data reaches a filesystem path | Error |
| `FI046` | Security-sensitive field restriction exists only in client code | Warning |
| `FI048` | Request-controlled data reaches dynamic code execution | Error |
| `FI050` | Automatic Guest or All role has sensitive DocType permissions | Warning/Error (Guest mutation is an error) |
| `FI051` | Guest endpoint uses a permission-bypassing read API | Error |
| `FI052` | Guest endpoint loads a document without a visible permission check | Warning |
| `FI-MIG001` | DocType was removed | Error |
| `FI-MIG002` | Field was removed | Error |
| `FI-MIG003` | Field type changed | Error |
| `FI-MIG004` | Link or table target changed | Error |
| `FI-MIG005` | Required field was added without a default | Error |
| `FI-MIG006` | Existing field became required without a default | Error |
| `FI-MIG007` | Removed field remains referenced | Error |
| `FI-MIG009` | Removed DocType remains referenced | Error |
| `FI-MIG010` | DocType was added | Note |
| `FI-MIG011` | Field was added safely | Note |
| `FI-MIG012` | Field became unique | Error |
| `FI-MIG013` | Default value changed | Warning |
| `FI-MIG014` | Label changed | Warning |

Security findings include source-to-sink evidence where the engine can prove an externally reachable path. Optional integrations guarded by installed-app checks, DocType existence checks, recognized decorators, or integration boundaries are contextualized instead of being reported as unconditional project errors.

Static analysis is intentionally conservative. Reflection, runtime monkey-patching and dynamically generated code may still require manual review.
