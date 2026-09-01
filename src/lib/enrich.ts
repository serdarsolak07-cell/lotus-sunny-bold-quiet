import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const enrichPlaybook = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z
      .object({
        target: z.string().max(40),
        playbook: z.string().max(12000),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "Zenginleştirme bu ortamda kapalı." };
    }

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        temperature: 0.2,
        max_tokens: 700,
        messages: [
          {
            role: "system",
            content:
              "KORTEKS kurulum yazmanısın. Verilen talimatı seçilen hedef sistem için somut adımlara çevir. Dosya adları, env, düğüm sırası yaz. Menü, tebrik, sapma yok. Türkçe. Uydurma kütüphane uydurma.",
          },
          {
            role: "user",
            content: `Hedef: ${data.target}\n\nTalimat:\n${data.playbook.slice(0, 8000)}`,
          },
        ],
      }),
    });

    if (!res.ok) return { ok: false as const, error: "Model yanıt vermedi." };
    const body = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = body.choices?.[0]?.message?.content?.trim() ?? "";
    if (!text) return { ok: false as const, error: "Boş yanıt." };
    return { ok: true as const, text };
  });
