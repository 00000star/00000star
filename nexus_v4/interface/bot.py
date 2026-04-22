import asyncio
import os

from telegram import Update
from telegram.ext import (
    ApplicationBuilder,
    CommandHandler,
    ContextTypes,
    MessageHandler,
    filters,
)

from nexus_v4.cognition.brain import NexusBrain
from nexus_v4.finance.economics import MarketScanner


class TelegramInterface:
    def __init__(self):
        self.brain = NexusBrain()
        self.scanner = MarketScanner()
        self.tick_counter = 0
        self.owner_id = os.getenv("TELEGRAM_OWNER_ID")

    def _is_authorized(self, user_id: int) -> bool:
        if not self.owner_id:
            print("🚨 SECURITY BLOCK: TELEGRAM_OWNER_ID is not configured. Access denied by default.")
            return False
        return str(user_id) == str(self.owner_id)

    async def heartbeat(self, context: ContextTypes.DEFAULT_TYPE):
        chat_id = context.job.chat_id
        cycle = self.tick_counter % 10
        self.tick_counter += 1

        if cycle < 4:
            mode, prompt = (
                "EXECUTION (40%)",
                "Review any active client tasks. If none, optimize our existing codebase.",
            )
        elif cycle < 7:
            mode = "SCANNING (30%)"
            gigs = self.scanner.scan_markets()
            prompt = (
                f"I found these gigs: {gigs}. Use calculate_roi to verify them. If profitable, draft a proposal."
                if gigs
                else "I scanned the markets but found no high-value coding gigs. Log this status."
            )
        elif cycle < 9:
            mode, prompt = (
                "UPGRADING (20%)",
                "Review your Skill Vault. Write a python script to test and improve one of our skills.",
            )
        else:
            mode, prompt = (
                "EXPERIMENTAL (10%)",
                "Brainstorm a new micro-SaaS product based on the skills we currently possess.",
            )

        await context.bot.send_message(
            chat_id,
            f"⚙️ [SYSTEM TICK {self.tick_counter}]: Entering {mode} Mode.",
        )
        try:
            loop = asyncio.get_running_loop()
            res = await loop.run_in_executor(None, self.brain.process, prompt)
            for i in range(0, len(res), 4000):
                await context.bot.send_message(chat_id, f"🦞 [NEXUS]:\n{res[i:i+4000]}")
        except Exception as e:
            print(f"Daemon Error: {e}")

    async def start_cmd(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        user_id = update.effective_user.id
        if not self._is_authorized(user_id):
            print(f"🚨 UNAUTHORIZED ACCESS ATTEMPT BY USER ID: {user_id}")
            return

        chat_id = update.effective_chat.id
        await update.message.reply_text(
            "🦞 NEXUS V4.2 [Hardened Economic Organism] Online.\n"
            "Time Allocation Engine engaged. I am now seeking revenue."
        )

        for job in context.job_queue.get_jobs_by_name(str(chat_id)):
            job.schedule_removal()
        context.job_queue.run_repeating(
            self.heartbeat,
            interval=1800,
            first=5,
            chat_id=chat_id,
            name=str(chat_id),
        )

    async def handle_msg(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        user_id = update.effective_user.id
        if not self._is_authorized(user_id):
            return

        await update.message.reply_text("🧠 Computing...")
        try:
            loop = asyncio.get_running_loop()
            res = await loop.run_in_executor(None, self.brain.process, update.message.text)
            for i in range(0, len(res), 4000):
                await update.message.reply_text(res[i : i + 4000])
        except Exception as e:
            await update.message.reply_text(f"❌ Error during execution: {e}")

    def run(self):
        token = os.getenv("TELEGRAM_BOT_TOKEN")
        app = ApplicationBuilder().token(token).build()
        app.add_handler(CommandHandler("start", self.start_cmd))
        app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, self.handle_msg))

        print("📲 TELEGRAM DAEMON ACTIVE. Send /start to engage the Economy.")
        app.run_polling()
