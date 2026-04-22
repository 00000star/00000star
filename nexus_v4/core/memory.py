import json
import os
import re
import sqlite3

import numpy as np
from litellm import embedding

from nexus_v4.finance.economics import EconomicEngine

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class VectorSemanticMemory:
    def __init__(self):
        self.db_path = os.path.join(BASE_DIR, "data", "semantic.db")
        self.model = os.getenv("EMBEDDING_MODEL", "text-embedding-3-small")
        os.makedirs(os.path.dirname(self.db_path), exist_ok=True)
        with sqlite3.connect(self.db_path) as conn:
            conn.execute(
                """
                CREATE TABLE IF NOT EXISTS memories (
                    id INTEGER PRIMARY KEY,
                    content TEXT,
                    vector BLOB,
                    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
                )
                """
            )

    def _embed(self, text: str) -> np.ndarray:
        vec_response = embedding(model=self.model, input=[text])
        return np.array(vec_response.data[0]["embedding"], dtype=np.float32)

    def store(self, content: str):
        try:
            vec = self._embed(content)
            if np.linalg.norm(vec) < 1e-10:
                return "Vector Database Error: embedding returned a near-zero vector."
            with sqlite3.connect(self.db_path) as conn:
                conn.execute(
                    "INSERT INTO memories (content, vector) VALUES (?, ?)",
                    (content, vec.tobytes()),
                )
            return "Memory stored in Vector DB."
        except Exception as e:
            return f"Vector Database Error: {str(e)}"

    def recall(self, query: str, top_k=3) -> str:
        try:
            q_vec = self._embed(query)
            norm_q = np.linalg.norm(q_vec)
            if norm_q < 1e-10:
                return "Vector embedding failed (zero vector)."

            with sqlite3.connect(self.db_path) as conn:
                rows = conn.execute("SELECT content, vector FROM memories").fetchall()

            results = []
            for content, v_bytes in rows:
                m_vec = np.frombuffer(v_bytes, dtype=np.float32)
                if m_vec.shape != q_vec.shape:
                    continue
                norm_m = np.linalg.norm(m_vec)
                if norm_m < 1e-10:
                    continue

                sim = float(np.dot(q_vec, m_vec) / (norm_q * norm_m))
                if sim > 0.3:
                    results.append((sim, content))

            results.sort(key=lambda x: x[0], reverse=True)
            if not results:
                return "No semantic memories found."
            return "PAST CONTEXT:\n" + "\n".join([f"- {c}" for s, c in results[:top_k]])
        except Exception as e:
            return f"Recall failed: {str(e)}"


class SkillVault:
    def __init__(self):
        self.path = os.path.join(BASE_DIR, "skills")
        self.manifest = os.path.join(self.path, "manifest.json")
        self.economics = EconomicEngine()
        os.makedirs(self.path, exist_ok=True)
        init_file = os.path.join(self.path, "__init__.py")
        if not os.path.exists(init_file):
            open(init_file, "w", encoding="utf-8").close()
        if not os.path.exists(self.manifest):
            with open(self.manifest, "w", encoding="utf-8") as f:
                json.dump({}, f)

    def save_skill(self, name: str, desc: str, code: str):
        try:
            clean = re.sub(r"[^a-zA-Z0-9_]", "_", name.strip().lower())
            if not clean:
                return "Skill Vault Error: skill name is empty after sanitization."
            with open(os.path.join(self.path, f"{clean}.py"), "w", encoding="utf-8") as f:
                f.write(code)
            monetization = self.economics.generate_hypothesis(clean, desc)

            with open(self.manifest, "r", encoding="utf-8") as f:
                data = json.load(f)
            data[clean] = {"description": desc, "monetization": monetization}
            with open(self.manifest, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=4)
            return f"Skill '{clean}' saved.\n{monetization}"
        except Exception as e:
            return f"Skill Vault Error: {str(e)}"

    def get_manifest(self) -> str:
        try:
            with open(self.manifest, "r", encoding="utf-8") as f:
                data = json.load(f)
            if not data:
                return "No learned skills yet."
            return "LEARNED SKILLS:\n" + "\n".join(
                [f"- {k}: {v['description']} ({v['monetization']})" for k, v in data.items()]
            )
        except Exception:
            return "Error reading skills manifest."
