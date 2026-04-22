"""Utility to merge another git repository into this project under a target subdirectory.

Example:
    python nexus_v4/merge_repository.py \
      --repo-url https://github.com/example/other-repo.git \
      --ref main \
      --target-dir external/other_repo
"""

from __future__ import annotations

import argparse
import os
import shutil
import subprocess
import tempfile
from pathlib import Path


def run(cmd: list[str], cwd: str | None = None) -> None:
    print(f"$ {' '.join(cmd)}")
    subprocess.run(cmd, cwd=cwd, check=True)


def copy_tree(src: Path, dst: Path) -> None:
    for root, dirs, files in os.walk(src):
        rel = Path(root).relative_to(src)
        target_root = dst / rel
        target_root.mkdir(parents=True, exist_ok=True)

        dirs[:] = [d for d in dirs if d != ".git"]
        for file_name in files:
            if file_name == ".git":
                continue
            src_file = Path(root) / file_name
            dst_file = target_root / file_name
            if dst_file.exists():
                raise FileExistsError(
                    f"Refusing to overwrite existing file: {dst_file}. "
                    "Choose a different --target-dir."
                )
            shutil.copy2(src_file, dst_file)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Merge another repository into this software")
    parser.add_argument("--repo-url", required=True, help="Git URL or local path to repository")
    parser.add_argument("--ref", default="main", help="Branch/tag/commit to checkout")
    parser.add_argument(
        "--target-dir",
        required=True,
        help="Destination subdirectory in this repository (e.g. external/other_repo)",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    repo_root = Path(__file__).resolve().parent.parent
    target_dir = (repo_root / args.target_dir).resolve()

    if repo_root not in target_dir.parents and target_dir != repo_root:
        raise ValueError("--target-dir must stay inside this repository")
    if target_dir.exists() and any(target_dir.iterdir()):
        raise FileExistsError(f"Target directory is not empty: {target_dir}")

    with tempfile.TemporaryDirectory(prefix="nexus_merge_") as tmp:
        clone_dir = Path(tmp) / "source_repo"
        run(["git", "clone", "--depth", "1", "--branch", args.ref, args.repo_url, str(clone_dir)])
        target_dir.mkdir(parents=True, exist_ok=True)
        copy_tree(clone_dir, target_dir)

    print("✅ Repository merged successfully.")
    print(f"Next steps:\n  1) Review files under: {target_dir}\n  2) git add {args.target_dir}\n  3) Commit the merge")


if __name__ == "__main__":
    main()
