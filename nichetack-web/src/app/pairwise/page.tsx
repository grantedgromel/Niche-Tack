"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { seededGradient } from "@/lib/art";
import { ITEMS, type Item } from "@/lib/data";

/* The pool — everything you're actively weighing. */
const POOL: Item[] = ITEMS.filter(
  (i) => i.state === "wishlist" || i.state === "active",
);

/* Deterministic pair sequence — stable across server/client renders. */
function buildPairs(rounds: number): [Item, Item][] {
  const n = POOL.length;
  const pairs: [Item, Item][] = [];
  for (let k = 0; k < rounds; k++) {
    const a = k % n;
    let b = (k * 3 + 5) % n;
    if (b === a) b = (b + 1) % n;
    pairs.push([POOL[a], POOL[b]]);
  }
  return pairs;
}

interface Choice {
  a: Item;
  b: Item;
  chosenId: string | null;
}

type Phase = "entry" | "round" | "exit";

export default function PairwisePage() {
  const [phase, setPhase] = useState<Phase>("entry");
  const [pairs, setPairs] = useState<[Item, Item][]>([]);
  const [index, setIndex] = useState(0);
  const [history, setHistory] = useState<Choice[]>([]);
  const [picking, setPicking] = useState<"a" | "b" | null>(null);
  // Synchronous lock — guards against a second commit landing for the same
  // round before React has re-rendered (stale-closure double-fire).
  const busy = useRef(false);

  function start(rounds: number) {
    busy.current = false;
    setPairs(buildPairs(rounds));
    setIndex(0);
    setHistory([]);
    setPicking(null);
    setPhase("round");
  }

  function commit(chosenId: string | null) {
    const [a, b] = pairs[index];
    setHistory((prev) => [...prev, { a, b, chosenId }]);
    setPicking(null);
    if (index + 1 < pairs.length) setIndex(index + 1);
    else setPhase("exit");
  }

  function pick(slot: "a" | "b") {
    if (busy.current) return;
    busy.current = true;
    setPicking(slot);
    const [a, b] = pairs[index];
    const chosenId = slot === "a" ? a.id : b.id;
    window.setTimeout(() => {
      commit(chosenId);
      busy.current = false;
    }, 360);
  }

  function skip() {
    if (busy.current) return;
    commit(null);
  }

  if (phase === "entry") return <Entry onStart={start} />;
  if (phase === "exit")
    return <Exit history={history} onReplay={() => setPhase("entry")} />;

  return (
    <Round
      pair={pairs[index]}
      round={index + 1}
      total={pairs.length}
      picking={picking}
      onPick={pick}
      onSkip={skip}
    />
  );
}

/* ─── Entry — the calm invitation ─────────────────────────── */
function Entry({ onStart }: { onStart: (rounds: number) => void }) {
  const preview = [
    {
      seed: "trench1",
      transform: "rotate(-7deg) translate(-26px, -10px)",
      z: 1,
      shadow: "var(--shadow-card)",
    },
    {
      seed: "denim1",
      transform: "rotate(5deg) translate(22px, 8px)",
      z: 2,
      shadow: "var(--shadow-card)",
    },
    { seed: "linen1", transform: "none", z: 3, shadow: "var(--shadow-lift)" },
  ];

  return (
    <div className="mx-auto flex max-w-[640px] flex-col items-center px-8 py-16 text-center">
      <p className="eyebrow">a quiet ritual</p>
      <h1 className="h-display mt-3 text-[60px]">
        which one,
        <br />
        <em className="h-it">honestly</em>?
      </h1>
      <p className="h-display mt-5 max-w-[440px] text-[19px] leading-snug text-ink-2">
        We&apos;ll show you two saved items at a time. Pick the one your gut
        still reaches for. We&apos;ll quietly learn what your wishlist really
        wants.
      </p>

      <div className="relative my-12 h-[320px] w-[256px]">
        {preview.map((card) => (
          <div
            key={card.seed}
            className="absolute inset-0 h-full w-full rounded-xl"
            style={{
              transform: card.transform,
              zIndex: card.z,
              boxShadow: card.shadow,
              background: seededGradient(card.seed),
            }}
          />
        ))}
      </div>

      <div className="mono mb-5 flex gap-3 text-[11px] uppercase tracking-[0.12em] text-ink-3">
        <span>{POOL.length} in pool</span>
        <span>·</span>
        <span>~2 min</span>
        <span>·</span>
        <span>gut picks only</span>
      </div>

      <div className="flex w-full max-w-[340px] flex-col gap-2">
        <button
          type="button"
          className="btn accent w-full py-[18px]"
          onClick={() => onStart(12)}
        >
          Start the round
        </button>
        <button
          type="button"
          className="btn ghost w-full"
          onClick={() => onStart(8)}
        >
          Just play 8
        </button>
      </div>
    </div>
  );
}

/* ─── Round — two saves, one gut call ─────────────────────── */
function Round({
  pair,
  round,
  total,
  picking,
  onPick,
  onSkip,
}: {
  pair: [Item, Item];
  round: number;
  total: number;
  picking: "a" | "b" | null;
  onPick: (slot: "a" | "b") => void;
  onSkip: () => void;
}) {
  const slots: { slot: "a" | "b"; item: Item }[] = [
    { slot: "a", item: pair[0] },
    { slot: "b", item: pair[1] },
  ];

  return (
    <div className="mx-auto max-w-[940px] px-8 py-8">
      <div className="flex items-center justify-between">
        <Link href="/gallery" className="icon-btn" aria-label="Leave the game">
          <Icon name="close" size={16} />
        </Link>
        <span className="mono text-[12px] text-ink-3">
          {String(round).padStart(2, "0")} / {total}
        </span>
        <span className="size-10" aria-hidden />
      </div>

      <div className="mt-5 flex gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="h-[3px] flex-1 rounded-full"
            style={{ background: i < round - 1 ? "var(--ink)" : "var(--line)" }}
          />
        ))}
      </div>

      <p className="h-display mt-8 text-center text-[24px]">
        which one, <em className="h-it">honestly</em>?
      </p>

      <div className="mt-5 grid grid-cols-2 gap-5">
        {slots.map(({ slot, item }) => {
          const isPicked = picking === slot;
          const isOther = picking !== null && picking !== slot;
          return (
            <button
              key={slot}
              type="button"
              data-pair-card={slot}
              disabled={picking !== null}
              onClick={() => onPick(slot)}
              className="relative overflow-hidden rounded-2xl text-left"
              style={{
                aspectRatio: "4/5",
                background: seededGradient(item.seed),
                boxShadow: isPicked
                  ? "var(--shadow-lift)"
                  : "var(--shadow-card)",
                transform: isPicked
                  ? "scale(1.02)"
                  : isOther
                    ? "scale(0.97)"
                    : "scale(1)",
                opacity: isOther ? 0.45 : 1,
                transition: "all 0.32s cubic-bezier(0.2, 0.7, 0.3, 1)",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, oklch(0 0 0 / 0.62) 0%, oklch(0 0 0 / 0.05) 46%, transparent 72%)",
                }}
              />
              <div
                className="absolute inset-x-6 bottom-6"
                style={{ color: "oklch(1 0 0)" }}
              >
                <div className="mono text-[10px] uppercase tracking-[0.1em] opacity-80">
                  {item.source}
                  {item.price != null ? `   ·   $${item.price}` : ""}
                </div>
                <div className="font-display mt-1.5 text-[25px] leading-[1.08] tracking-[-0.01em]">
                  {item.title}
                </div>
              </div>
              {isPicked && (
                <div
                  className="absolute right-3.5 top-3.5 flex size-9 items-center justify-center rounded-full"
                  style={{ background: "var(--accent)", color: "oklch(1 0 0)" }}
                >
                  <Icon name="check" size={18} sw={2.2} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-7 text-center">
        <button
          type="button"
          onClick={onSkip}
          disabled={picking !== null}
          className="mono text-[10px] uppercase tracking-[0.16em] text-ink-3 transition-colors hover:text-ink disabled:opacity-50"
        >
          neither today
        </button>
      </div>
    </div>
  );
}

/* ─── Exit — what your gut said ───────────────────────────── */
function Exit({
  history,
  onReplay,
}: {
  history: Choice[];
  onReplay: () => void;
}) {
  const picks = new Map<string, number>();
  const appeared = new Map<string, Item>();
  for (const h of history) {
    appeared.set(h.a.id, h.a);
    appeared.set(h.b.id, h.b);
    if (h.chosenId)
      picks.set(h.chosenId, (picks.get(h.chosenId) ?? 0) + 1);
  }
  const pickCount = (id: string) => picks.get(id) ?? 0;
  const totalPicks = history.filter((h) => h.chosenId).length;
  const productPicks = history.filter((h) => {
    if (!h.chosenId) return false;
    return appeared.get(h.chosenId)?.kind === "product";
  }).length;

  const ranked = [...appeared.values()].sort(
    (x, y) =>
      pickCount(y.id) - pickCount(x.id) || POOL.indexOf(x) - POOL.indexOf(y),
  );
  const podium = ranked.slice(0, 3);
  const risers = ranked.slice(0, 2);
  const fallers = [...ranked]
    .reverse()
    .filter((it) => pickCount(it.id) === 0)
    .slice(0, 2);

  // podium display order: 2nd · 1st · 3rd, with the winner raised
  const display =
    podium.length === 3 ? [podium[1], podium[0], podium[2]] : podium;
  const podiumHeight = (rank: number) =>
    rank === 1 ? 196 : rank === 2 ? 152 : 128;

  return (
    <div className="mx-auto max-w-[720px] px-8 py-12">
      <p className="eyebrow">round complete · {history.length} rounds</p>
      <h1 className="h-display mt-2.5 text-[40px]">
        here&apos;s what your <em className="h-it">gut</em> said.
      </h1>
      <p className="mono mt-2 text-[11px] text-ink-3">
        {totalPicks} picks · ranked by reach-for
      </p>

      {/* Podium */}
      <div className="mt-9 flex items-end justify-center gap-4">
        {display.map((item) => {
          const rank = podium.indexOf(item) + 1;
          return (
            <Link
              key={item.id}
              href={`/item/${item.id}`}
              className="flex flex-1 flex-col items-center"
            >
              <span className="mono mb-2 text-[11px] text-ink-3">
                0{rank}
              </span>
              <div
                className="relative w-full overflow-hidden rounded-[10px]"
                style={{
                  height: podiumHeight(rank),
                  boxShadow:
                    rank === 1
                      ? "var(--shadow-lift)"
                      : "var(--shadow-card)",
                }}
              >
                <div
                  className="h-full w-full"
                  style={{ background: seededGradient(item.seed) }}
                />
                {rank === 1 && (
                  <span
                    className="mono absolute right-1.5 top-1.5 rounded px-1.5 py-0.5 text-[9px] uppercase tracking-[0.1em]"
                    style={{
                      background: "var(--accent)",
                      color: "oklch(1 0 0)",
                    }}
                  >
                    most chosen
                  </span>
                )}
              </div>
              <div className="h-display mt-2.5 text-center text-[15px] leading-tight">
                {item.title}
              </div>
              <div className="mono mt-1 text-[10px] text-ink-3">
                picked {pickCount(item.id)}×
              </div>
            </Link>
          );
        })}
      </div>

      {/* Insight */}
      <div className="panel mt-9 p-5">
        <p className="eyebrow mb-2">quiet pattern</p>
        <p className="h-display text-[19px] leading-snug">
          {totalPicks === 0 ? (
            <>You skipped every round — there&apos;s no pattern to read yet.</>
          ) : (
            <>
              You picked{" "}
              <em className="h-it">objects you can wear or hold</em>{" "}
              {productPicks} of {totalPicks} times. Articles and videos lost
              most rounds.
            </>
          )}
        </p>
      </div>

      {/* Movers */}
      {(risers.length > 0 || fallers.length > 0) && (
        <div className="mt-8">
          <p className="eyebrow mb-3">movers</p>
          <div className="flex flex-col gap-2">
            {risers.map((item) => (
              <MoverRow
                key={item.id}
                item={item}
                to="Considering"
                delta={`+${pickCount(item.id)}`}
                up
              />
            ))}
            {fallers.map((item) => (
              <MoverRow key={item.id} item={item} to="Archived" delta="0 picks" />
            ))}
          </div>
        </div>
      )}

      <div className="mt-9 flex flex-col gap-2">
        <Link href="/basket" className="btn accent w-full">
          <Icon name="basket" size={17} />
          See basket recommendation
        </Link>
        <button type="button" className="btn ghost w-full" onClick={onReplay}>
          Play another round
        </button>
      </div>
    </div>
  );
}

function MoverRow({
  item,
  to,
  delta,
  up = false,
}: {
  item: Item;
  to: string;
  delta: string;
  up?: boolean;
}) {
  return (
    <Link
      href={`/item/${item.id}`}
      className="panel flex items-center gap-3 p-2.5 pr-4"
    >
      <div
        className="size-11 flex-shrink-0 rounded-lg"
        style={{ background: seededGradient(item.seed) }}
      />
      <div className="min-w-0 flex-1">
        <div className="h-display truncate text-[15px]">{item.title}</div>
        <div className="mono text-[10px] text-ink-3">now: {to}</div>
      </div>
      <span
        className="mono text-[12px]"
        style={{ color: up ? "var(--accent)" : "var(--ink-3)" }}
      >
        {up ? "▲" : "▼"} {delta}
      </span>
    </Link>
  );
}
