// Last-click UTM attribution for signups. A tracked landing (e.g.
// /?utm_source=facebook&utm_medium=social&utm_campaign=...) is saved to
// localStorage so it survives browsing to other pages before signup, then
// sent along with the signup request and cleared once the account exists.
//
// Every storage access is wrapped in try/catch: private browsing or blocked
// site data must never break the page or signup — it just means the signup
// goes untracked.

export const UTM_STORAGE_KEY = "stackin_utm";
export const UTM_FIELDS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;
export const UTM_MAX_LENGTH = 100;
export const UTM_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

export type UtmField = (typeof UTM_FIELDS)[number];
export type StoredUtms = Partial<Record<UtmField, string>>;

type UtmStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;

function getBrowserStorage(): UtmStorage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function cleanUtmValue(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().slice(0, UTM_MAX_LENGTH);
  return trimmed || null;
}

// Saves any UTMs present in `search` (a URL query string). Pages without
// UTMs leave previously saved values alone; a newer tracked visit replaces
// an older one entirely (last-click attribution).
export function captureUtmsFromSearch(
  search: string,
  storage: UtmStorage | null = getBrowserStorage(),
  now: Date = new Date(),
): void {
  if (!storage) return;

  try {
    const params = new URLSearchParams(search);
    const utms: StoredUtms = {};

    for (const field of UTM_FIELDS) {
      const value = cleanUtmValue(params.get(field));
      if (value) utms[field] = value;
    }

    if (Object.keys(utms).length === 0) return;

    storage.setItem(UTM_STORAGE_KEY, JSON.stringify({ ...utms, landing_at: now.toISOString() }));
  } catch {
    // Storage unavailable or full — signup just goes untracked.
  }
}

// Returns the saved UTM fields, or {} if nothing is saved, the saved value
// can't be parsed, or it's older than 30 days.
export function getStoredUtms(
  storage: UtmStorage | null = getBrowserStorage(),
  now: Date = new Date(),
): StoredUtms {
  if (!storage) return {};

  try {
    const raw = storage.getItem(UTM_STORAGE_KEY);
    if (!raw) return {};

    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};

    const record = parsed as Record<string, unknown>;
    const landingAt = typeof record.landing_at === "string" ? Date.parse(record.landing_at) : NaN;
    if (Number.isNaN(landingAt) || now.getTime() - landingAt > UTM_MAX_AGE_MS) return {};

    const utms: StoredUtms = {};
    for (const field of UTM_FIELDS) {
      const value = cleanUtmValue(record[field]);
      if (value) utms[field] = value;
    }
    return utms;
  } catch {
    return {};
  }
}

export function clearStoredUtms(storage: UtmStorage | null = getBrowserStorage()): void {
  if (!storage) return;

  try {
    storage.removeItem(UTM_STORAGE_KEY);
  } catch {
    // Nothing to do — the stale entry expires on its own after 30 days.
  }
}
