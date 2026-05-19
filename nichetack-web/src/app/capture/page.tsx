"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { seededGradient } from "@/lib/art";
import { cn } from "@/lib/cn";

/* The capture demo item — the bouclé sofa, which lives in the gallery
   as i04. Capture is hardcoded to one worked example, like the prototype. */
const CAPTURED = {
  itemId: "i04",
  title: "Bouclé sofa, oat",
  source: "instagram · @studio.oma",
  seed: "sofa3",
  priceLabel: "~$2,400",
};

const SUGGESTED_TAGS = ["sofa", "living-room", "bouclé", "reno", "2026"];

type Step = "detect" | "tag" | "done";

export default function CapturePage() {
  const [step, setStep] = useState<Step>("detect");
  const [startState, setStartState] = useState<"wishlist" | "active">(
    "wishlist",
  );
  const [tags, setTags] = useState<string[]>(["sofa", "living-room"]);

  const toggleTag = (tag: string) =>
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <SourceBackdrop />
      <div
        className="absolute inset-0"
        style={{ background: "oklch(0 0 0 / 0.5)" }}
      />

      <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center px-8 py-12">
        <div
          className="w-[440px] overflow-hidden rounded-2xl border border-line bg-bg-elev"
          style={{ boxShadow: "var(--shadow-lift)" }}
        >
          {/* popover handle bar */}
          <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
            <span className="h-display h-it text-[17px] leading-none">
              Nichetack
            </span>
            <span className="mono ml-auto text-[10px] uppercase tracking-[0.12em] text-ink-3">
              {step === "detect"
                ? "browser capture"
                : step === "tag"
                  ? "step 2 of 2"
                  : "captured"}
            </span>
          </div>

          {step === "detect" && (
            <DetectStep onSave={() => setStep("tag")} />
          )}
          {step === "tag" && (
            <TagStep
              startState={startState}
              onStartState={setStartState}
              tags={tags}
              onToggleTag={toggleTag}
              onDone={() => setStep("done")}
            />
          )}
          {step === "done" && (
            <DoneStep
              startState={startState}
              tagCount={tags.length}
              onAnother={() => {
                setStep("detect");
                setStartState("wishlist");
                setTags(["sofa", "living-room"]);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Step 1 — Nichetack detects something saveable ───────── */
function DetectStep({ onSave }: { onSave: () => void }) {
  return (
    <div className="p-5">
      <p className="eyebrow mb-1">found on this page</p>
      <h2 className="h-display text-[24px]">
        Save this to your <em className="h-it">stash</em>?
      </h2>

      <div className="mt-4 flex gap-3.5">
        <div
          className="h-[88px] w-[72px] flex-shrink-0 rounded-lg"
          style={{ background: seededGradient(CAPTURED.seed) }}
        />
        <div className="min-w-0">
          <p className="mono text-[10px] uppercase tracking-[0.1em] text-ink-3">
            {CAPTURED.source}
          </p>
          <p className="h-display mt-1 text-[18px] leading-tight">
            {CAPTURED.title}
          </p>
          <p className="mono mt-1.5 text-[11px] text-accent">
            ✦ auto-extracted · {CAPTURED.priceLabel}
          </p>
        </div>
      </div>

      <button type="button" className="btn mt-5 w-full" onClick={onSave}>
        <Icon name="bookmark" size={16} />
        Save to Nichetack
      </button>
      <Link href="/gallery" className="btn ghost mt-2 w-full">
        Not now
      </Link>
    </div>
  );
}

/* ─── Step 2 — quick-tag, then go ─────────────────────────── */
function TagStep({
  startState,
  onStartState,
  tags,
  onToggleTag,
  onDone,
}: {
  startState: "wishlist" | "active";
  onStartState: (s: "wishlist" | "active") => void;
  tags: string[];
  onToggleTag: (tag: string) => void;
  onDone: () => void;
}) {
  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow mb-1">saved to nichetack</p>
          <h2 className="h-display text-[24px]">
            quickly tag <em className="h-it">&amp; go</em>
          </h2>
        </div>
        <span
          className="flex size-8 items-center justify-center rounded-full"
          style={{ background: "var(--positive)", color: "oklch(1 0 0)" }}
        >
          <Icon name="check" size={16} sw={2.4} />
        </span>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div
          className="h-20 w-16 flex-shrink-0 rounded-lg"
          style={{ background: seededGradient(CAPTURED.seed) }}
        />
        <div className="min-w-0">
          <p className="mono text-[10px] uppercase tracking-[0.1em] text-ink-3">
            {CAPTURED.source}
          </p>
          <p className="h-display mt-1 text-[18px] leading-tight">
            {CAPTURED.title}
          </p>
        </div>
      </div>

      {/* start state */}
      <p className="eyebrow mb-2 mt-5">start as</p>
      <div className="flex gap-2">
        {(
          [
            { key: "wishlist", label: "Wishlist" },
            { key: "active", label: "Considering" },
          ] as const
        ).map((option) => {
          const on = startState === option.key;
          return (
            <button
              key={option.key}
              type="button"
              onClick={() => onStartState(option.key)}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-full border px-3 py-2.5 text-[13px] font-medium transition-colors",
                on
                  ? "border-ink bg-ink text-bg"
                  : "border-line bg-bg text-ink hover:border-ink-3",
              )}
            >
              <span className={cn("lc-marker is-static", option.key)} />
              {option.label}
            </button>
          );
        })}
      </div>

      {/* suggested tags */}
      <p className="eyebrow mb-2 mt-5">✦ suggested tags</p>
      <div className="flex flex-wrap gap-1.5">
        {SUGGESTED_TAGS.map((tag) => {
          const on = tags.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => onToggleTag(tag)}
              className={cn("pill", on && "on")}
            >
              {on ? "✓ " : "+ "}
              {tag}
            </button>
          );
        })}
      </div>

      <button type="button" className="btn mt-6 w-full" onClick={onDone}>
        Done
      </button>
    </div>
  );
}

/* ─── Step 3 — captured ───────────────────────────────────── */
function DoneStep({
  startState,
  tagCount,
  onAnother,
}: {
  startState: "wishlist" | "active";
  tagCount: number;
  onAnother: () => void;
}) {
  return (
    <div className="p-5 text-center">
      <span
        className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full"
        style={{ background: "var(--positive)", color: "oklch(1 0 0)" }}
      >
        <Icon name="check" size={24} sw={2.4} />
      </span>
      <h2 className="h-display text-[26px]">
        it&apos;s in your <em className="h-it">stash</em>.
      </h2>
      <p className="mono mt-2 text-[11px] text-ink-3">
        saved as {startState === "active" ? "considering" : "wishlist"} ·{" "}
        {tagCount} {tagCount === 1 ? "tag" : "tags"}
      </p>

      <div className="mt-5 flex flex-col gap-2">
        <Link href={`/item/${CAPTURED.itemId}`} className="btn w-full">
          View the item
        </Link>
        <button type="button" className="btn ghost w-full" onClick={onAnother}>
          Capture another
        </button>
        <Link
          href="/gallery"
          className="link-quiet mono mt-1 text-[10px] uppercase tracking-[0.16em]"
        >
          back to gallery
        </Link>
      </div>
    </div>
  );
}

/* ─── Faded source context behind the popover ─────────────── */
function SourceBackdrop() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="w-[920px] max-w-[92%] overflow-hidden rounded-2xl border border-line bg-bg-elev opacity-70"
        style={{ filter: "saturate(0.85)" }}
      >
        {/* browser chrome */}
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <span className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-ink-3/40" />
            <span className="size-2.5 rounded-full bg-ink-3/40" />
            <span className="size-2.5 rounded-full bg-ink-3/40" />
          </span>
          <span className="mono rounded-full border border-line bg-bg px-3 py-1 text-[11px] text-ink-3">
            instagram.com/studio.oma
          </span>
        </div>
        {/* post */}
        <div className="grid grid-cols-[1.4fr_1fr]">
          <div
            className="h-[380px] w-full"
            style={{ background: seededGradient("sofa3") }}
          />
          <div className="border-l border-line p-6">
            <div className="flex items-center gap-2.5">
              <span
                className="size-9 rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.6 0.15 25), oklch(0.5 0.13 280))",
                }}
              />
              <span className="text-[14px] font-semibold">studio.oma</span>
              <span className="text-[12px] text-ink-3">· Berlin</span>
            </div>
            <p className="mt-4 text-[14px] leading-relaxed text-ink-2">
              Bouclé everything, oat tones, an Italian-summer kind of living
              room. Swipe for the full corner.
            </p>
            <p className="mono mt-5 text-[12px] text-ink-3">4,219 likes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
