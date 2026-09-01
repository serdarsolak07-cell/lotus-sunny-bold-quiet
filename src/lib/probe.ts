import { createServerFn } from "@tanstack/react-start";

const PROMPT = `Üç madde, kısa, Türkçe, uydurma yok:
1) MANTIK: "Tüm ajanlar durma koşulsuz çalışmalı" ifadesi doğru mu? Evet veya Hayır de, bir cümle gerekçe.
2) HIZ: Küçük router yerine her tokene akıl yürütme modeli yakmak sessiz hız kaybı mıdır? Evet veya Hayır.
3) DOĞRULUK: Alıntısız web özeti neden sessiz doğruluk kaybıdır? Bir cümle.

Saptırma, menü, tebrik yok.`;

export const probeSystem = createServerFn({ method: "POST" }).handler(async () => {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) {
    return { ok: false as const, error: "Canlı yoklama bu ortamda kapalı." };
  }

  const t0 = Date.now();
  const res = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "grok-4.5",
      temperature: 0,
      max_tokens: 220,
      messages: [
        {
          role: "system",
          content:
            "KORTEKS test yoklamasısın. Doğrudan cevap ver. Kullanıcıyı menüye çekme.",
        },
        { role: "user", content: PROMPT },
      ],
    }),
  });
  const ms = Date.now() - t0;

  if (!res.ok) {
    return { ok: false as const, error: "Model yanıt vermedi.", ms };
  }

  const body = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const text = body.choices?.[0]?.message?.content?.trim() ?? "";
  if (!text) return { ok: false as const, error: "Boş yanıt.", ms };

  const lower = text.toLocaleLowerCase("tr");
  const logicOk = /hayır/.test(lower.split("\n")[0] ?? lower);
  const speedOk = /evet/.test(lower);
  const accOk =
    /halüsin|kanıt|kaynak|alıntı|uydur|yanlış/.test(lower) && text.length > 40;
  const divert =
    /başka bir şey|nasıl yardımcı|menü|ister misiniz/.test(lower);

  return {
    ok: true as const,
    text,
    ms,
    checks: {
      mantik: logicOk && !divert,
      hiz: speedOk && ms < 12000,
      dogruluk: accOk && !divert,
      divert: !divert,
    },
  };
});
