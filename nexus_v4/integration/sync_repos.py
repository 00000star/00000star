from __future__ import annotations

import argparse
import shutil
import tarfile
import tempfile
from pathlib import Path
from urllib.request import urlopen

import yaml


def load_config(path: Path) -> dict:
    with path.open("r", encoding="utf-8") as f:
        return yaml.safe_load(f)


def sync_repo(base_dir: Path, repo: dict, force: bool) -> None:
    target_dir = base_dir / repo["target_dir"]
    if target_dir.exists() and not force:
        print(f"⏭️  Skipping {repo['name']} (already exists): {target_dir}")
        return

    if target_dir.exists() and force:
        shutil.rmtree(target_dir)

    target_dir.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix=f"sync_{repo['name']}_") as tmp:
        tmp_path = Path(tmp)
        tarball_path = tmp_path / f"{repo['name']}.tar.gz"
        print(f"⬇️  Downloading {repo['name']} from {repo['tarball_url']}")
        with urlopen(repo["tarball_url"]) as resp, tarball_path.open("wb") as out:
            out.write(resp.read())

        print(f"📦 Extracting {repo['name']}")
        with tarfile.open(tarball_path, "r:gz") as tf:
            tf.extractall(path=tmp_path)

        extracted_root = tmp_path / repo["extract_dir"]
        if not extracted_root.exists():
            raise FileNotFoundError(f"Expected extracted directory not found: {extracted_root}")

        shutil.move(str(extracted_root), str(target_dir))
        git_dir = target_dir / ".git"
        if git_dir.exists():
            shutil.rmtree(git_dir)

    print(f"✅ Synced {repo['name']} -> {target_dir}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Sync external repositories into this workspace")
    parser.add_argument("--force", action="store_true", help="Replace existing checked out repositories")
    args = parser.parse_args()

    repo_root = Path(__file__).resolve().parents[2]
    config = load_config(Path(__file__).resolve().parent / "repos.yaml")
    for repo in config["repositories"]:
        sync_repo(repo_root, repo, force=args.force)


if __name__ == "__main__":
    main()
