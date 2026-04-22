# Merging another repository into this software

Yes — you can merge another repository into one software safely.

## Recommended approach (vendor-style merge)

Use the helper script:

```bash
python nexus_v4/merge_repository.py \
  --repo-url <https://github.com/org/repo.git> \
  --ref main \
  --target-dir external/<repo_name>
```

This will:
- clone the source repository at the requested ref,
- copy files into your target subdirectory,
- skip `.git` metadata,
- prevent accidental overwrite of existing files.

## After merge

1. Review the imported code:
   - configuration files,
   - dependency conflicts,
   - duplicate module names.
2. Run tests/build checks.
3. Commit as a separate integration commit.

## Why this is safer than direct history merge

A direct git history merge from unrelated repos can complicate history and conflict resolution.
Placing external code in a scoped folder (e.g. `external/`) keeps ownership and rollback simpler.
