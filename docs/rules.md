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

Static analysis is intentionally conservative. Dynamic Python and JavaScript code may require manual review.
