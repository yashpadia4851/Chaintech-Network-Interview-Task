const safeJsonParse = (value, fallback) => {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

export function readJson(key, fallback = null) {
  const raw = localStorage.getItem(key);
  if (raw == null) return fallback;
  return safeJsonParse(raw, fallback);
}

export function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeKey(key) {
  localStorage.removeItem(key);
}

