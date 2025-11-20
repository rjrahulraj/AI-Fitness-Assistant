// src/utils/openaiClient.js
export async function generatePlanDirect(user) {
  const key = localStorage.getItem("OPENAI_API_KEY");
  if (!key)
    return { ok: false, error: "Please enter OpenAI API key in Key Manager" };

  const prompt = buildPlanPrompt(user);

  try {
    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // use the model you have access to
        messages: [
          {
            role: "system",
            content:
              "You are a helpful personal trainer and nutritionist. Return only JSON.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.6,
        max_tokens: 1200,
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return { ok: false, error: text };
    }

    const data = await resp.json();
    const text = data.choices?.[0]?.message?.content;
    try {
      const json = JSON.parse(text);
      return { ok: true, data: json };
    } catch (e) {
      // fallback: return raw text inside summary
      return { ok: true, data: { summary: text } };
    }
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

function buildPlanPrompt(user) {
  return `
User: ${JSON.stringify(user)}
Produce ONLY JSON with keys:
- summary (short)
- workout_plan: array of 7 day objects with title, exercises [{name, sets, reps, rest_seconds, equipment, instructions}]
- diet_plan: array of 7 day objects with breakfast,lunch,dinner,snack (name, calories, macros)
- tips: array of 5 short tips

Constraints:
- Keep plans practical for ${user.level || "Beginner"} and goal ${
    user.goal || ""
  }
- If gym unavailable, provide home alternatives when equipment is none
Return exactly a JSON object and nothing else.
`;
}
