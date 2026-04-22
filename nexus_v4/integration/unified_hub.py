from __future__ import annotations

import argparse
import subprocess
from pathlib import Path

REQUIRED_REPOS = [
    "external/openinterpreter",
    "external/openclaw",
    "external/papers-we-love",
]


def ensure_synced(repo_root: Path) -> list[str]:
    missing = []
    for rel in REQUIRED_REPOS:
        if not (repo_root / rel).exists():
            missing.append(rel)
    return missing


def run(cmd: list[str], cwd: Path) -> int:
    print(f"$ {' '.join(cmd)} (cwd={cwd})")
    return subprocess.call(cmd, cwd=str(cwd))


def main() -> None:
    parser = argparse.ArgumentParser(description="Unified command hub for merged repos")
    sub = parser.add_subparsers(dest="command", required=True)

    sub.add_parser("status", help="Show whether all merged repositories are available")

    p_search = sub.add_parser("search-papers", help="Search paper titles/paths")
    p_search.add_argument("query", help="Case-insensitive query")

    p_interpreter = sub.add_parser("openinterpreter", help="Run Open Interpreter")
    p_interpreter.add_argument("args", nargs=argparse.REMAINDER)

    p_openclaw = sub.add_parser("openclaw", help="Run a command inside OpenClaw repo")
    p_openclaw.add_argument("args", nargs=argparse.REMAINDER)

    args = parser.parse_args()
    repo_root = Path(__file__).resolve().parents[2]
    missing = ensure_synced(repo_root)

    if args.command == "status":
        if missing:
            print("❌ Missing repositories:")
            for item in missing:
                print(f"- {item}")
            print("Run: python nexus_v4/integration/sync_repos.py")
            raise SystemExit(1)
        print("✅ All repositories are synced.")
        return

    if missing:
        print("❌ Repositories are missing. Run: python nexus_v4/integration/sync_repos.py")
        raise SystemExit(1)

    if args.command == "search-papers":
        papers_dir = repo_root / "external/papers-we-love"
        code = run(["rg", "-i", args.query, str(papers_dir)], cwd=repo_root)
        raise SystemExit(code)

    if args.command == "openinterpreter":
        oi_dir = repo_root / "external/openinterpreter"
        cmd = ["python", "-m", "interpreter"] + args.args
        raise SystemExit(run(cmd, cwd=oi_dir))

    if args.command == "openclaw":
        oc_dir = repo_root / "external/openclaw"
        if not args.args:
            print("Provide a command, e.g. `python nexus_v4/integration/unified_hub.py openclaw ls`")
            raise SystemExit(2)
        raise SystemExit(run(args.args, cwd=oc_dir))


if __name__ == "__main__":
    main()
