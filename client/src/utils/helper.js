export function extractJson(raw) {
  try {
    const cleaned = raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const json = JSON.parse(cleaned);
    return { ok: true, data: json };
  } catch (err) {
    return { ok: false, error: "Invalid JSON: " + err.message };
  }
}
