# Unified stack: OpenInterpreter + OpenClaw + Papers We Love

This workspace now supports a **single orchestration flow** for all three repos.

## 1) Sync external repositories

```bash
python nexus_v4/integration/sync_repos.py
```

This downloads and extracts:
- `OpenInterpreter/open-interpreter` -> `external/openinterpreter`
- `OpenClaw/openclaw` -> `external/openclaw`
- `papers-we-love/papers-we-love` -> `external/papers-we-love`

## 2) Check unified status

```bash
python nexus_v4/integration/unified_hub.py status
```

## 3) Use one command hub

- Search papers:
  ```bash
  python nexus_v4/integration/unified_hub.py search-papers "distributed systems"
  ```
- Run Open Interpreter:
  ```bash
  python nexus_v4/integration/unified_hub.py openinterpreter -- --help
  ```
- Run any OpenClaw-local command:
  ```bash
  python nexus_v4/integration/unified_hub.py openclaw ls
  ```

## Notes

- This approach keeps each upstream project intact while controlling them from one place.
- For production, add per-repo environment setup scripts and a CI matrix that validates all three together.
