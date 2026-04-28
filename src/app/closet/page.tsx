"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useMemo, useState } from "react";

type Category = "tops" | "bottoms" | "outerwear" | "shoes" | "dress" | "accessory";
type Occasion = "casual" | "work" | "date" | "formal" | "gym";
type Season = "spring" | "summer" | "autumn" | "winter" | "all-season";

type WardrobeItem = {
  id: string;
  name: string;
  imageDataUrl: string;
  category: Category;
  colors: string[];
  occasion: Occasion;
  season: Season;
  notes: string;
  createdAt: string;
};

const STORAGE_KEY = "closet-phase1-items";

const categoryKeywords: Record<Category, string[]> = {
  tops: ["shirt", "top", "blouse", "tshirt", "tee", "sweater", "hoodie"],
  bottoms: ["jean", "pant", "trouser", "short", "skirt", "jogger"],
  outerwear: ["jacket", "coat", "blazer", "cardigan"],
  shoes: ["shoe", "sneaker", "boot", "heel", "loafer", "sandal"],
  dress: ["dress", "gown", "romper"],
  accessory: ["bag", "belt", "watch", "hat", "scarf", "jewelry"],
};

const colorMap: Array<{ label: string; rgb: [number, number, number] }> = [
  { label: "black", rgb: [25, 25, 25] },
  { label: "white", rgb: [235, 235, 235] },
  { label: "gray", rgb: [128, 128, 128] },
  { label: "brown", rgb: [125, 87, 53] },
  { label: "beige", rgb: [209, 194, 153] },
  { label: "red", rgb: [180, 32, 32] },
  { label: "orange", rgb: [217, 116, 35] },
  { label: "yellow", rgb: [217, 188, 49] },
  { label: "green", rgb: [43, 138, 74] },
  { label: "blue", rgb: [40, 92, 180] },
  { label: "purple", rgb: [118, 75, 162] },
  { label: "pink", rgb: [206, 97, 150] },
];

function distance(a: [number, number, number], b: [number, number, number]) {
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2);
}

function inferCategory(name: string): Category {
  const lower = name.toLowerCase();
  for (const [category, keywords] of Object.entries(categoryKeywords) as [Category, string[]][]) {
    if (keywords.some((keyword) => lower.includes(keyword))) {
      return category;
    }
  }
  return "tops";
}

function inferOccasion(category: Category): Occasion {
  if (category === "dress" || category === "outerwear") return "date";
  if (category === "shoes") return "work";
  if (category === "accessory") return "formal";
  return "casual";
}

function inferSeason(category: Category, colors: string[]): Season {
  if (category === "outerwear") return "winter";
  if (category === "shoes") return "all-season";
  if (colors.includes("yellow") || colors.includes("white")) return "summer";
  return "all-season";
}

async function detectColorFromImage(dataUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve("black");
        return;
      }
      canvas.width = 24;
      canvas.height = 24;
      ctx.drawImage(image, 0, 0, 24, 24);
      const pixels = ctx.getImageData(0, 0, 24, 24).data;
      let totalR = 0;
      let totalG = 0;
      let totalB = 0;
      let count = 0;

      for (let i = 0; i < pixels.length; i += 4) {
        const alpha = pixels[i + 3];
        if (alpha < 20) continue;
        totalR += pixels[i];
        totalG += pixels[i + 1];
        totalB += pixels[i + 2];
        count += 1;
      }

      const avg: [number, number, number] = count
        ? [Math.round(totalR / count), Math.round(totalG / count), Math.round(totalB / count)]
        : [25, 25, 25];

      const nearest = colorMap.reduce((best, candidate) => {
        const candidateDistance = distance(avg, candidate.rgb);
        const bestDistance = distance(avg, best.rgb);
        return candidateDistance < bestDistance ? candidate : best;
      });

      resolve(nearest.label);
    };
    image.src = dataUrl;
  });
}

async function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

export default function ClosetPage() {
  const [items, setItems] = useState<WardrobeItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [colorFilter, setColorFilter] = useState("all");
  const [seasonFilter, setSeasonFilter] = useState("all");
  const [activeItem, setActiveItem] = useState<WardrobeItem | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      setItems(JSON.parse(saved));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const colorOptions = useMemo(() => {
    const allColors = new Set<string>();
    items.forEach((item) => item.colors.forEach((color) => allColors.add(color)));
    return Array.from(allColors);
  }, [items]);

  const filtered = items.filter((item) => {
    const categoryOk = categoryFilter === "all" || item.category === categoryFilter;
    const colorOk = colorFilter === "all" || item.colors.includes(colorFilter);
    const seasonOk = seasonFilter === "all" || item.season === seasonFilter;
    return categoryOk && colorOk && seasonOk;
  });

  async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    try {
      const newItems: WardrobeItem[] = [];
      for (const file of files) {
        const imageDataUrl = await fileToDataUrl(file);
        const category = inferCategory(file.name);
        const dominantColor = await detectColorFromImage(imageDataUrl);
        const colors = [dominantColor];
        const item: WardrobeItem = {
          id: crypto.randomUUID(),
          name: file.name.replace(/\.[^.]+$/, "").replace(/[_-]/g, " "),
          imageDataUrl,
          category,
          colors,
          occasion: inferOccasion(category),
          season: inferSeason(category, colors),
          notes: "Auto-tagged by AI helper. You can edit this in Phase 2.",
          createdAt: new Date().toISOString(),
        };
        newItems.push(item);
      }
      setItems((prev) => [...newItems, ...prev]);
      setActiveItem(newItems[0] ?? null);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  return (
    <main className="min-h-dvh bg-rz-bg text-rz-text px-4 py-5 pb-24">
      <div className="mx-auto w-full max-w-5xl space-y-5 animate-fade-in">
        <header className="rounded-2xl border border-rz-border bg-rz-surface p-4">
          <h1 className="text-xl font-bold">🗂️ CLOSET — Phase 1</h1>
          <p className="mt-1 text-sm text-rz-text-muted">
            Upload your clothing photos once. The app auto-tags each item, saves them locally, and lets you filter your wardrobe.
          </p>
          <label className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-rz-gold px-4 py-2 text-sm font-semibold text-rz-bg hover:bg-rz-gold-dim">
            <input type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} />
            {uploading ? "Analyzing photos..." : "Upload clothes"}
          </label>
        </header>

        <section className="grid gap-3 rounded-2xl border border-rz-border bg-rz-surface p-4 sm:grid-cols-3">
          <select className="rounded-xl border border-rz-border bg-rz-bg px-3 py-2 text-sm" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="all">All categories</option>
            <option value="tops">Tops</option>
            <option value="bottoms">Bottoms</option>
            <option value="outerwear">Outerwear</option>
            <option value="dress">Dresses</option>
            <option value="shoes">Shoes</option>
            <option value="accessory">Accessories</option>
          </select>

          <select className="rounded-xl border border-rz-border bg-rz-bg px-3 py-2 text-sm" value={colorFilter} onChange={(e) => setColorFilter(e.target.value)}>
            <option value="all">All colors</option>
            {colorOptions.map((color) => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>

          <select className="rounded-xl border border-rz-border bg-rz-bg px-3 py-2 text-sm" value={seasonFilter} onChange={(e) => setSeasonFilter(e.target.value)}>
            <option value="all">All seasons</option>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="autumn">Autumn</option>
            <option value="winter">Winter</option>
            <option value="all-season">All season</option>
          </select>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveItem(item)}
                className="overflow-hidden rounded-xl border border-rz-border bg-rz-surface text-left"
              >
                <Image src={item.imageDataUrl} alt={item.name} width={320} height={200} unoptimized className="h-32 w-full object-cover" />
                <div className="space-y-1 p-2">
                  <p className="truncate text-xs font-medium">{item.name}</p>
                  <p className="text-[11px] text-rz-text-muted">{item.category} • {item.colors.join(", ")}</p>
                </div>
              </button>
            ))}
            {!filtered.length && (
              <div className="col-span-full rounded-xl border border-dashed border-rz-border p-6 text-center text-sm text-rz-text-muted">
                No items match this filter yet.
              </div>
            )}
          </div>

          <aside className="rounded-2xl border border-rz-border bg-rz-surface p-4">
            {activeItem ? (
              <div className="space-y-3">
                <Image src={activeItem.imageDataUrl} alt={activeItem.name} width={420} height={300} unoptimized className="h-52 w-full rounded-xl object-cover" />
                <h2 className="text-lg font-semibold capitalize">{activeItem.name}</h2>
                <ul className="space-y-1 text-sm text-rz-text-muted">
                  <li><strong className="text-rz-text">Category:</strong> {activeItem.category}</li>
                  <li><strong className="text-rz-text">Color:</strong> {activeItem.colors.join(", ")}</li>
                  <li><strong className="text-rz-text">Occasion:</strong> {activeItem.occasion}</li>
                  <li><strong className="text-rz-text">Season:</strong> {activeItem.season}</li>
                </ul>
                <p className="text-xs text-rz-text-dim">{activeItem.notes}</p>
              </div>
            ) : (
              <p className="text-sm text-rz-text-muted">Select an item to see details.</p>
            )}
          </aside>
        </section>
      </div>
    </main>
  );
}
