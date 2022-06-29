import { sleep } from "./sleep.js";

async function debounce(fn, DEBOUNCE_MS = 300) {
  const startedAt = new Date();

  await fn();

  const rttMs = new Date() - startedAt;
  const debounceMs = DEBOUNCE_MS - rttMs;

  if (debounceMs > 0) {
    await sleep(debounceMs);
  }
}

export { debounce };
