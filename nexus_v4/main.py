from dotenv import load_dotenv
import os
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.dirname(BASE_DIR))

from nexus_v4.interface.bot import TelegramInterface

if __name__ == "__main__":
    load_dotenv(os.path.join(BASE_DIR, ".env"))
    print("🚀 BOOTING NEXUS V4.2 [HARDENED ECONOMIC ORGANISM]...")

    missing = [
        key
        for key in ["TELEGRAM_BOT_TOKEN", "TELEGRAM_OWNER_ID", "OPENAI_API_KEY"]
        if not os.getenv(key)
    ]
    if missing:
        print(f"❌ CRITICAL: Missing required .env keys: {', '.join(missing)}")
        sys.exit(1)

    interface = TelegramInterface()
    interface.run()
