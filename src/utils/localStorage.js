export const loadState = (key) => {
  try {
    const serialized = localStorage.getItem(key);
    if (serialized === null) return undefined;
    return JSON.parse(serialized);
  } catch (err) {
    console.error("loadState error:", err);
    return undefined;
  }
};

export const saveState = (key, state) => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(key, serialized);
  } catch (err) {
    console.error("saveState error:", err);
  }
};
