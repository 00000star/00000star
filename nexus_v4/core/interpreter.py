import contextlib
import io
import json
import math
import time
import traceback

import requests

from nexus_v4.core.security import CodePolicyEngine


class StatefulInterpreter:
    def __init__(self):
        self.policy = CodePolicyEngine()
        self.allowed_imports = {"math", "json", "time", "requests"}
        safe_builtins = {
            "print": print,
            "len": len,
            "range": range,
            "str": str,
            "int": int,
            "float": float,
            "list": list,
            "dict": dict,
            "set": set,
            "tuple": tuple,
            "bool": bool,
            "sum": sum,
            "min": min,
            "max": max,
            "abs": abs,
            "round": round,
            "enumerate": enumerate,
            "zip": zip,
            "filter": filter,
            "map": map,
            "sorted": sorted,
            "__import__": self._safe_import,
        }
        self.state = {
            "__builtins__": safe_builtins,
            "math": math,
            "json": json,
            "time": time,
            "requests": requests,
        }

    def _safe_import(self, name, globals=None, locals=None, fromlist=(), level=0):
        if name.split(".")[0] not in self.allowed_imports:
            raise ImportError(f"SECURITY BLOCK: Import of '{name}' is forbidden.")
        return __import__(name, globals, locals, fromlist, level)

    def run(self, code: str) -> str:
        if "```python" in code:
            code = code.split("```python", 1)[1].split("```", 1)[0].strip()
        elif "```" in code:
            code = code.split("```", 1)[1].split("```", 1)[0].strip()

        print(f"\n🖥️ [HARDENED SANDBOX EXEC]:\n{code}\n")

        try:
            self.policy.analyze_code(code)
        except Exception as e:
            return str(e)

        output = io.StringIO()
        with contextlib.redirect_stdout(output), contextlib.redirect_stderr(output):
            try:
                exec(code, self.state)
            except Exception:
                print(traceback.format_exc())

        text = output.getvalue()
        return text if text.strip() else "Executed securely with no console output."
