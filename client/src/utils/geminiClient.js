const GEMINI_KEY = "AIzaSyDReRrhqn7THLepcQjsHA4Qb2fUIR5fewA";

const GEMINI_MODEL = "gemini-2.0-flash-lite-preview";
const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta";

export async function generatePlanDirect(user) {
  if (!GEMINI_KEY) return { ok: false, error: "GEMINI_API_KEY missing" };

  const prompt = `
You are a certified fitness coach and nutritionist. Based on the user data below produce a valid JSON object (nothing else).
User: ${JSON.stringify(user)}

Output JSON only:
{
  "summary": "",
  "workout_plan": [],
  "diet_plan": [],
  "tips": []
}
`;

  const url = `${GEMINI_BASE}/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_KEY}`;

  try {
    const body = {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    let text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text)
      return { ok: false, error: "No response from Gemini", raw: result };

    // ✅ Extract JSON inside ```json ... ```
    let extracted = text.match(/```json([\s\S]*?)```/);
    if (extracted) text = extracted[1];

    // ✅ Clean the text
    text = text
      .replace(/\n+/g, " ")
      .replace(/\r|\t/g, " ")
      .replace(/ +/g, " ")
      .replace(/,\s*([}\]])/g, "$1")
      .trim();

    // ✅ Parse final JSON
    let json;
    try {
      json = JSON.parse(text);
      // console.log("Parsed JSON:", json);
    } catch (err) {
      console.error("Failed to parse JSON:", err.message);
      return { ok: false, error: "Invalid JSON returned", raw: text };
    }

    return { ok: true, data: json };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

async function postJson(url, body, headers = {}) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GEMINI_KEY}`,
      ...headers,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gemini error: ${res.status} ${text}`);
  }
  return res.json();
}

export async function generateImageDirect(prompt) {
  if (!GEMINI_KEY) throw new Error("Missing GEMINI KEY");
  // https://generativelanguage.googleapis.com/v1beta/models/imagegeneration:generate?key=YOUR_KEY

  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagegeneration:generate?key=${GEMINI_KEY}`;

  const body = {
    prompt: { text: prompt },
    image: { size: "1024x1024" },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  console.log("Gemini image response:", data);
  if (!res.ok) {
    console.log("Error:", data);
    throw new Error(data.error?.message || "Image generation failed");
  }

  // Google returns base64 JPEG
  const base64 = data?.images?.[0]?.base64;

  if (!base64) throw new Error("No image returned from Gemini");

  return `data:image/jpeg;base64,${base64}`;
}

export async function generateImage(prompt) {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Image generation error:", error);
    throw error;
  }
}
