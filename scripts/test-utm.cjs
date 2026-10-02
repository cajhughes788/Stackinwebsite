/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS test runner */
// Run with: npm test
// Minimal TS loader using the project's own TypeScript (no extra deps).
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

require.extensions[".ts"] = (module, filename) => {
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    fileName: filename,
  });
  module._compile(outputText, filename);
};

const assert = require("node:assert/strict");
const {
  UTM_STORAGE_KEY,
  captureUtmsFromSearch,
  clearStoredUtms,
  getStoredUtms,
} = require(path.join(__dirname, "../lib/utm.ts"));

function createStorage() {
  const data = new Map();
  return {
    getItem: (key) => (data.has(key) ? data.get(key) : null),
    setItem: (key, value) => data.set(key, String(value)),
    removeItem: (key) => data.delete(key),
    data,
  };
}

const throwingStorage = {
  getItem() {
    throw new Error("SecurityError");
  },
  setItem() {
    throw new Error("QuotaExceededError");
  },
  removeItem() {
    throw new Error("SecurityError");
  },
};

const DAY_MS = 24 * 60 * 60 * 1000;

function run(name, fn) {
  fn();
  process.stdout.write(`ok - ${name}\n`);
}

run("saves UTMs with a landing_at timestamp when present", () => {
  const storage = createStorage();
  const now = new Date("2026-10-02T12:00:00.000Z");
  captureUtmsFromSearch(
    "?utm_source=facebook&utm_medium=social&utm_campaign=2026-10-02-W2&fbclid=abc",
    storage,
    now,
  );

  assert.deepEqual(JSON.parse(storage.getItem(UTM_STORAGE_KEY)), {
    utm_source: "facebook",
    utm_medium: "social",
    utm_campaign: "2026-10-02-W2",
    landing_at: now.toISOString(),
  });
  assert.deepEqual(getStoredUtms(storage, now), {
    utm_source: "facebook",
    utm_medium: "social",
    utm_campaign: "2026-10-02-W2",
  });
});

run("pages without UTMs keep previously saved values", () => {
  const storage = createStorage();
  const now = new Date("2026-10-02T12:00:00.000Z");
  captureUtmsFromSearch("?utm_source=tiktok&utm_medium=bio", storage, now);
  captureUtmsFromSearch("", storage, now);
  captureUtmsFromSearch("?next=%2F%23pricing", storage, now);
  captureUtmsFromSearch("?utm_source=%20%20&utm_medium=", storage, now);

  assert.deepEqual(getStoredUtms(storage, now), { utm_source: "tiktok", utm_medium: "bio" });
});

run("a newer tracked visit overwrites the older one (last click)", () => {
  const storage = createStorage();
  captureUtmsFromSearch(
    "?utm_source=tiktok&utm_medium=bio&utm_content=clip-1",
    storage,
    new Date("2026-10-01T00:00:00.000Z"),
  );
  captureUtmsFromSearch(
    "?utm_source=instagram&utm_medium=bio",
    storage,
    new Date("2026-10-02T00:00:00.000Z"),
  );

  assert.deepEqual(getStoredUtms(storage, new Date("2026-10-02T00:00:00.000Z")), {
    utm_source: "instagram",
    utm_medium: "bio",
  });
});

run("trims values and caps them at 100 characters", () => {
  const storage = createStorage();
  const now = new Date("2026-10-02T12:00:00.000Z");
  captureUtmsFromSearch(`?utm_source=%20facebook%20&utm_campaign=${"x".repeat(250)}`, storage, now);

  const utms = getStoredUtms(storage, now);
  assert.equal(utms.utm_source, "facebook");
  assert.equal(utms.utm_campaign.length, 100);
});

run("expires saved UTMs after 30 days", () => {
  const storage = createStorage();
  const landing = new Date("2026-09-01T00:00:00.000Z");
  captureUtmsFromSearch("?utm_source=facebook", storage, landing);

  assert.deepEqual(getStoredUtms(storage, new Date(landing.getTime() + 29 * DAY_MS)), {
    utm_source: "facebook",
  });
  assert.deepEqual(getStoredUtms(storage, new Date(landing.getTime() + 31 * DAY_MS)), {});
});

run("returns {} for missing or unparseable data", () => {
  const storage = createStorage();
  assert.deepEqual(getStoredUtms(storage), {});
  storage.setItem(UTM_STORAGE_KEY, "{not json");
  assert.deepEqual(getStoredUtms(storage), {});
  storage.setItem(UTM_STORAGE_KEY, JSON.stringify({ utm_source: "facebook" }));
  assert.deepEqual(getStoredUtms(storage), {}, "missing landing_at counts as expired");
});

run("clearStoredUtms removes the saved entry", () => {
  const storage = createStorage();
  captureUtmsFromSearch("?utm_source=facebook", storage);
  clearStoredUtms(storage);
  assert.equal(storage.getItem(UTM_STORAGE_KEY), null);
});

run("never throws when storage is blocked or unavailable", () => {
  assert.doesNotThrow(() => captureUtmsFromSearch("?utm_source=facebook", throwingStorage));
  assert.deepEqual(getStoredUtms(throwingStorage), {});
  assert.doesNotThrow(() => clearStoredUtms(throwingStorage));

  // No window at all (server render / static export build).
  assert.doesNotThrow(() => captureUtmsFromSearch("?utm_source=facebook"));
  assert.deepEqual(getStoredUtms(), {});
  assert.doesNotThrow(() => clearStoredUtms());
});
