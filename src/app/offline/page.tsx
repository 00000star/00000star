"use client";

import { useState } from "react";
import Link from "next/link";
import { mockOfflineModules } from "@/lib/mock-data";
import { BottomNav } from "@/components/ui/bottom-nav";
import { useDeviceProfile } from "@/hooks/use-device";
import { getUnsyncedEvents, markEventsSynced, appendEvent } from "@/lib/store";
import type { OfflineModule } from "@/lib/types";

export default function OfflinePage() {
  const [modules, setModules] = useState<OfflineModule[]>(mockOfflineModules);
  const [unsyncedCount, setUnsyncedCount] = useState(() => {
    if (typeof window === "undefined") return 0;
    return getUnsyncedEvents().length;
  });
  const [syncing, setSyncing] = useState(false);
  const [syncDone, setSyncDone] = useState(false);
  const { profile, lowFidelity } = useDeviceProfile();

  const downloadedSizeMB = modules
    .filter((m) => m.downloaded)
    .reduce((a, m) => a + m.sizeMB, 0);
  const totalCapacityMB = 500;

  function handleToggleDownload(moduleId: string) {
    const mod = modules.find((m) => m.id === moduleId);
    if (!mod) return;

    if (mod.downloaded) {
      setModules((prev) =>
        prev.map((m) =>
          m.id === moduleId ? { ...m, downloaded: false } : m
        )
      );
      appendEvent({ type: "module_removed", payload: { moduleId } });
      return;
    }

    setModules((prev) =>
      prev.map((m) =>
        m.id === moduleId ? { ...m, downloading: true, progress: 0 } : m
      )
    );

    let prog = 0;
    const interval = setInterval(() => {
      prog += 20;
      if (prog >= 100) {
        clearInterval(interval);
        setModules((prev) =>
          prev.map((m) =>
            m.id === moduleId
              ? { ...m, downloaded: true, downloading: false, progress: undefined }
              : m
          )
        );
        appendEvent({ type: "module_downloaded", payload: { moduleId } });
      } else {
        setModules((prev) =>
          prev.map((m) =>
            m.id === moduleId ? { ...m, progress: prog } : m
          )
        );
      }
    }, 300);
  }

  function handleDownloadNext() {
    const next = modules.find((m) => !m.downloaded && !m.downloading);
    if (next) {
      handleToggleDownload(next.id);
    }
  }

  function handleSync() {
    const unsynced = getUnsyncedEvents();
    if (unsynced.length === 0) return;

    setSyncing(true);
    setSyncDone(false);

    setTimeout(() => {
      markEventsSynced(unsynced.map((e) => e.id));
      setUnsyncedCount(0);
      setSyncing(false);
      setSyncDone(true);
      setTimeout(() => setSyncDone(false), 3000);
    }, 1500);
  }

  const nextModule = modules.find((m) => !m.downloaded && !m.downloading);

  return (
    <main className="min-h-dvh bg-rz-bg pb-24">
      <header className="px-5 pt-6 pb-4 flex items-center gap-3">
        <Link
          href="/dashboard"
          className="w-9 h-9 rounded-full bg-rz-surface border border-rz-border flex items-center justify-center text-rz-text-muted"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </Link>
        <div>
          <h1 className="text-lg font-semibold text-rz-text">
            📶 Data &amp; Storage
          </h1>
          <p className="text-xs text-rz-text-muted">
            Manage offline content &amp; sync
          </p>
        </div>
      </header>

      <div className="px-5 space-y-4">
        {/* Device Info */}
        {lowFidelity && (
          <div className="rounded-xl bg-rz-gold/10 border border-rz-gold/30 p-3 flex items-center gap-2 animate-slide-up">
            <span className="text-sm">⚡</span>
            <p className="text-xs text-rz-gold">
              Low-fidelity mode active — {profile.ramGB}GB RAM, {profile.batteryPct}% battery. Animations reduced.
            </p>
          </div>
        )}

        {/* Storage Meter */}
        <div className="rounded-2xl bg-rz-surface border border-rz-border p-4 animate-slide-up">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-rz-text">
              Local Storage
            </span>
            <span className="text-sm font-semibold text-rz-text-muted">
              {downloadedSizeMB.toFixed(1)} MB / {totalCapacityMB} MB
            </span>
          </div>
          <div className="w-full h-3 rounded-full bg-rz-border overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-rz-primary to-rz-gold transition-all duration-500"
              style={{
                width: `${Math.min((downloadedSizeMB / totalCapacityMB) * 100, 100)}%`,
              }}
            />
          </div>
          <p className="text-[11px] text-rz-text-dim mt-1.5">
            Zero background data drain guaranteed
          </p>
        </div>

        {/* Sync Status */}
        <div className="rounded-2xl bg-rz-surface border border-rz-border p-4 animate-slide-up" style={{ animationDelay: "0.05s" }}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-rz-text">
                Sync Status
              </h3>
              <p className="text-xs text-rz-text-muted">
                {syncDone
                  ? "All events synced!"
                  : `${unsyncedCount} event${unsyncedCount !== 1 ? "s" : ""} pending upload`}
              </p>
            </div>
            <button
              onClick={handleSync}
              disabled={syncing || unsyncedCount === 0}
              className="px-4 py-2 rounded-xl bg-rz-primary/10 border border-rz-primary/30 text-sm font-medium text-rz-primary hover:bg-rz-primary/20 active:scale-[0.97] transition-all disabled:opacity-40"
            >
              {syncing ? (
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 border-2 border-rz-primary/30 border-t-rz-primary rounded-full animate-spin" />
                  Syncing
                </span>
              ) : (
                "Push to Sync"
              )}
            </button>
          </div>
        </div>

        {/* Module List */}
        <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <h2 className="text-sm font-medium text-rz-text-muted mb-2">
            Available Modules
          </h2>
          <div className="space-y-2">
            {modules.map((mod) => (
              <div
                key={mod.id}
                className="rounded-xl bg-rz-surface border border-rz-border p-3 flex items-center gap-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-rz-text truncate">{mod.name}</p>
                  <p className="text-[11px] text-rz-text-dim">
                    {mod.sizeMB} MB
                  </p>
                  {mod.downloading && (
                    <div className="mt-1.5 w-full h-1.5 rounded-full bg-rz-border overflow-hidden">
                      <div
                        className="h-full rounded-full bg-rz-primary transition-all duration-300"
                        style={{ width: `${mod.progress ?? 0}%` }}
                      />
                    </div>
                  )}
                </div>
                {mod.downloaded ? (
                  <div className="flex items-center gap-2">
                    <span className="text-rz-primary">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <button
                      onClick={() => handleToggleDownload(mod.id)}
                      className="text-[11px] text-rz-text-dim hover:text-rz-danger transition"
                    >
                      Remove
                    </button>
                  </div>
                ) : mod.downloading ? (
                  <span className="w-5 h-5 border-2 border-rz-primary/30 border-t-rz-primary rounded-full animate-spin" />
                ) : (
                  <button
                    onClick={() => handleToggleDownload(mod.id)}
                    className="px-3 py-1.5 rounded-lg bg-rz-primary/10 border border-rz-primary/30 text-xs font-medium text-rz-primary hover:bg-rz-primary/20 active:scale-[0.97] transition-all"
                  >
                    Download
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Download */}
        <div className="animate-slide-up" style={{ animationDelay: "0.15s" }}>
          <button
            onClick={handleDownloadNext}
            disabled={!nextModule}
            className="w-full rounded-xl bg-rz-surface border border-dashed border-rz-primary/40 py-4 text-sm font-medium text-rz-primary hover:bg-rz-primary/5 active:scale-[0.98] transition-all disabled:opacity-30"
          >
            {nextModule
              ? `Download Next Node (${nextModule.sizeMB} MB)`
              : "All modules downloaded!"}
          </button>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
