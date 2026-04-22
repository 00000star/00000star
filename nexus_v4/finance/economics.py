import hashlib
import os

import feedparser
import yaml

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class MarketScanner:
    def __init__(self):
        self.targets = [
            "https://www.reddit.com/r/forhire/new/.rss",
            "https://www.reddit.com/r/slavelabour/new/.rss",
        ]
        self.seen_gigs = set()
        self.max_cache_size = 5000

    def _remember(self, gig_id: str) -> None:
        self.seen_gigs.add(gig_id)
        if len(self.seen_gigs) > self.max_cache_size:
            self.seen_gigs = set(list(self.seen_gigs)[-self.max_cache_size :])

    def scan_markets(self) -> list:
        found_gigs = []
        for url in self.targets:
            try:
                feed = feedparser.parse(url)
                for entry in feed.entries[:8]:
                    gig_id = hashlib.md5(entry.link.encode(), usedforsecurity=False).hexdigest()
                    if gig_id in self.seen_gigs:
                        continue

                    title = entry.title.lower()
                    if "[task]" in title or "[hiring]" in title:
                        if any(
                            k in title
                            for k in ["python", "script", "bot", "data", "scrape", "api"]
                        ):
                            found_gigs.append(
                                {
                                    "title": entry.title,
                                    "link": entry.link,
                                    "summary": entry.summary[:300],
                                }
                            )
                    self._remember(gig_id)
            except Exception as e:
                print(f"Scanner error on {url}: {e}")
        return found_gigs


class EconomicEngine:
    def __init__(self):
        config_path = os.path.join(BASE_DIR, "config", "sovereign.yaml")
        with open(config_path, "r", encoding="utf-8") as f:
            self.config = yaml.safe_load(f)["economics"]
        self.opp_cost = float(self.config["hourly_opportunity_cost"])
        self.min_confidence = float(self.config["minimum_confidence_threshold"])

    def calculate_roi(
        self, payout_usd: float, estimated_hours: float, probability: float, complexity: str
    ) -> dict:
        payout_usd = max(0.0, float(payout_usd))
        estimated_hours = max(0.0, float(estimated_hours))
        probability = min(max(float(probability), 0.0), 1.0)

        api_cost = {"low": 0.05, "medium": 0.15, "high": 0.60}.get(complexity, 0.10)
        total_cost = api_cost + (estimated_hours * self.opp_cost)
        net_profit = (payout_usd * probability) - total_cost

        if probability < self.min_confidence:
            return {
                "status": "REJECTED",
                "net_profit": round(net_profit, 2),
                "reason": f"Confidence ({probability}) below {self.min_confidence} threshold. Reputation risk.",
            }
        if net_profit <= 0:
            return {
                "status": "REJECTED",
                "net_profit": round(net_profit, 2),
                "reason": f"Negative ROI. Costs (${total_cost:.2f}) outweigh expected revenue.",
            }
        return {
            "status": "APPROVED",
            "net_profit": round(net_profit, 2),
            "reason": f"Expected Net Profit: ${net_profit:.2f}. API Cost: ${api_cost:.2f}.",
        }

    def generate_hypothesis(self, skill: str, desc: str) -> str:
        d = desc.lower()
        if "scrape" in d or "data" in d:
            return f"Monetize '{skill}': Sell clean datasets as an API or on Gumroad."
        if "bot" in d:
            return f"Monetize '{skill}': Wrap in UI and sell as Micro-SaaS to local Zimbabwean businesses."
        return f"Monetize '{skill}': Internal efficiency tool to lower future opportunity costs."
