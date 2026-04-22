import json
import os

import yaml
from litellm import completion

from nexus_v4.core.interpreter import StatefulInterpreter
from nexus_v4.core.memory import SkillVault, VectorSemanticMemory
from nexus_v4.core.vision import capture_screen_b64
from nexus_v4.finance.economics import EconomicEngine

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class NexusBrain:
    def __init__(self):
        self.interpreter = StatefulInterpreter()
        self.vector_db = VectorSemanticMemory()
        self.vault = SkillVault()
        self.economics = EconomicEngine()
        self.model = os.getenv("SMART_MODEL", "gpt-4o")

        config_path = os.path.join(BASE_DIR, "config", "sovereign.yaml")
        with open(config_path, "r", encoding="utf-8") as f:
            c = yaml.safe_load(f)
        self.sys_prompt = (
            f"IDENTITY: {c['name']} {c['version']}\n"
            f"LOYALTY: {c['loyalty']['primary_user']} ({c['loyalty']['location']})\n\n"
            f"DIRECTIVES:\n" + "\n".join(c["core_directives"]) + "\n\nRULES:\n" + "\n".join(c["operational_rules"])
        )

    def process(self, prompt: str) -> str:
        context = self.vector_db.recall(prompt)
        skills = self.vault.get_manifest()
        messages = [
            {"role": "system", "content": f"{self.sys_prompt}\n\n{context}\n\n{skills}"},
            {"role": "user", "content": prompt},
        ]
        tools = [
            {
                "type": "function",
                "function": {
                    "name": "execute_python",
                    "description": "Run sandboxed python code natively.",
                    "parameters": {
                        "type": "object",
                        "properties": {"code": {"type": "string"}},
                        "required": ["code"],
                    },
                },
            },
            {
                "type": "function",
                "function": {
                    "name": "take_screenshot",
                    "description": "Takes a screenshot to view the host computer screen.",
                },
            },
            {
                "type": "function",
                "function": {
                    "name": "save_skill",
                    "description": "Save a working script permanently to muscle memory.",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "name": {"type": "string"},
                            "desc": {"type": "string"},
                            "code": {"type": "string"},
                        },
                        "required": ["name", "desc", "code"],
                    },
                },
            },
            {
                "type": "function",
                "function": {
                    "name": "store_memory",
                    "description": "Store an important fact or client detail in Vector DB.",
                    "parameters": {
                        "type": "object",
                        "properties": {"fact": {"type": "string"}},
                        "required": ["fact"],
                    },
                },
            },
            {
                "type": "function",
                "function": {
                    "name": "calculate_roi",
                    "description": "Calculate if a freelance gig is profitable before accepting it.",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "payout_usd": {"type": "number"},
                            "estimated_hours": {"type": "number"},
                            "probability": {"type": "number"},
                            "complexity": {
                                "type": "string",
                                "enum": ["low", "medium", "high"],
                            },
                        },
                        "required": [
                            "payout_usd",
                            "estimated_hours",
                            "probability",
                            "complexity",
                        ],
                    },
                },
            },
        ]

        for _ in range(15):
            try:
                res = completion(model=self.model, messages=messages, tools=tools, tool_choice="auto")
                msg = res.choices[0].message
                messages.append(msg.model_dump() if hasattr(msg, "model_dump") else msg)

                if not msg.tool_calls:
                    return msg.content or "No response generated."

                for tc in msg.tool_calls:
                    name = tc.function.name
                    args = json.loads(tc.function.arguments) if tc.function.arguments else {}
                    print(f"🦞 [COGNITION]: Triggering {name}...")

                    if name == "execute_python":
                        content = self.interpreter.run(args["code"])
                    elif name == "store_memory":
                        content = self.vector_db.store(args["fact"])
                    elif name == "save_skill":
                        content = self.vault.save_skill(args["name"], args["desc"], args["code"])
                    elif name == "calculate_roi":
                        content = str(
                            self.economics.calculate_roi(
                                args["payout_usd"],
                                args["estimated_hours"],
                                args["probability"],
                                args["complexity"],
                            )
                        )
                    elif name == "take_screenshot":
                        b64 = capture_screen_b64()
                        content = "Screenshot captured."
                        messages.append({"role": "tool", "tool_call_id": tc.id, "content": content})
                        messages.append(
                            {
                                "role": "user",
                                "content": [
                                    {"type": "text", "text": "Analyze the screen."},
                                    {
                                        "type": "image_url",
                                        "image_url": {"url": f"data:image/png;base64,{b64}"},
                                    },
                                ],
                            }
                        )
                        continue
                    else:
                        content = f"Unknown tool call: {name}"

                    messages.append({"role": "tool", "tool_call_id": tc.id, "content": content})
            except Exception as e:
                return f"Brain encountered a critical error: {str(e)}"

        return "Task paused to prevent infinite loop. Please prompt again."
