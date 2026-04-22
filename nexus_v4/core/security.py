import ast


class SecurityViolation(Exception):
    pass


class CodePolicyEngine:
    def __init__(self):
        self.forbidden_modules = {
            "os",
            "sys",
            "subprocess",
            "shutil",
            "pty",
            "socket",
            "pathlib",
            "importlib",
        }
        self.forbidden_calls = {"eval", "exec", "compile", "open", "input", "__import__"}

    def analyze_code(self, code: str) -> bool:
        try:
            tree = ast.parse(code)
        except SyntaxError as e:
            raise SecurityViolation(f"Syntax Error in generated code: {e}")

        for node in ast.walk(tree):
            if isinstance(node, ast.Import):
                for alias in node.names:
                    if alias.name.split(".")[0] in self.forbidden_modules:
                        raise SecurityViolation(f"BLOCK: Cannot import '{alias.name}'.")
            elif isinstance(node, ast.ImportFrom):
                if node.module and node.module.split(".")[0] in self.forbidden_modules:
                    raise SecurityViolation(f"BLOCK: Cannot import from '{node.module}'.")
            elif isinstance(node, ast.Call):
                if isinstance(node.func, ast.Name) and node.func.id in self.forbidden_calls:
                    raise SecurityViolation(f"BLOCK: Forbidden function call '{node.func.id}'.")
                if isinstance(node.func, ast.Attribute) and node.func.attr.startswith("__"):
                    raise SecurityViolation("BLOCK: Dunder attribute calls are forbidden.")

        return True
