"use client";

import { useMemo, useSyncExternalStore } from "react";
import { ITEM_NOTES, ITEMS, type Item, type ItemState } from "./data";

/* Per-item edits layered over the seed data — the prototype's only mutable
   state. Persisted to localStorage; there is no backend. The DOM/theme
   pattern is reused: an external store read through useSyncExternalStore,
   so server and hydration renders use the untouched seed data. */

const STORAGE_KEY = "nichetack-items";

export interface ItemOverride {
  state?: ItemState;
  tags?: string[];
  note?: string;
}

type Overrides = Record<string, ItemOverride>;

const EMPTY: Overrides = {};

let snapshot: Overrides = EMPTY;
const listeners = new Set<() => void>();

function loadFromStorage(): Overrides {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed: unknown = JSON.parse(raw);
    return parsed && typeof parsed === "object"
      ? (parsed as Overrides)
      : EMPTY;
  } catch {
    return EMPTY;
  }
}

if (typeof window !== "undefined") {
  snapshot = loadFromStorage();
}

function commit(next: Overrides) {
  snapshot = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable — edits still apply for the session */
  }
  for (const listener of listeners) listener();
}

function patch(id: string, override: ItemOverride) {
  commit({ ...snapshot, [id]: { ...snapshot[id], ...override } });
}

export function setItemState(id: string, state: ItemState) {
  patch(id, { state });
}

export function setItemTags(id: string, tags: string[]) {
  patch(id, { tags });
}

export function setItemNote(id: string, note: string) {
  patch(id, { note });
}

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function getSnapshot(): Overrides {
  return snapshot;
}

function getServerSnapshot(): Overrides {
  return EMPTY;
}

function useOverrides(): Overrides {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function applyOverride(item: Item, override: ItemOverride | undefined): Item {
  if (!override) return item;
  return {
    ...item,
    state: override.state ?? item.state,
    tags: override.tags ?? item.tags,
  };
}

/** Every item with the user's edits applied. */
export function useItems(): Item[] {
  const overrides = useOverrides();
  return useMemo(
    () => ITEMS.map((item) => applyOverride(item, overrides[item.id])),
    [overrides],
  );
}

export interface ResolvedItem {
  item: Item;
  /** the editable private note — falls back to the seed note */
  note: string;
}

/** One item with edits applied, plus its note. */
export function useResolvedItem(base: Item): ResolvedItem {
  const overrides = useOverrides();
  return useMemo(() => {
    const override = overrides[base.id];
    return {
      item: applyOverride(base, override),
      note: override?.note ?? ITEM_NOTES[base.id] ?? "",
    };
  }, [base, overrides]);
}
