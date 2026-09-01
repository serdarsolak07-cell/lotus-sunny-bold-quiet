import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { topics } from "@/data/catalog";
import { CORE } from "@/data/core";
import { confusions, EXAMPLE, pathStops } from "@/data/learn";
import { makerName } from "@/lib/core-seal";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().max(4000),
});

const InputSchema = z.object({
  messages: z.array(MessageSchema).min(1).max(12),
});

const digest = topics
  .map((t) => {
    const body = t.sections
      .map((s) => `${s.heading}: ${s.body.join(" ")}`)
      .join(" ");
    return `# ${t.chapter} ${t.title}\n${t.summary}\n${body}`.slice(0, 720);
  })
  .join("\n\n");

const learnDigest = [
  `Tek örnek ${EXAMPLE.name}: ${EXAMPLE.what}`,
  "Öğrenme yolu (bu sırayı öner):",
  ...pathStops.map((s) => `${s.n} ${s.title}: ${s.rule} Defter: ${s.defter}`),
  "Karıştırılanlar:",
  ...confusions.map((c) => `${c.wrong} ≠ ${c.right}. ${c.why}`),
].join("\n");

const SYSTEM = `Sen KORTEKS atlasının sohbet katmanısın. Kullanıcıya doğrudan, doğru, kısa ve net cevap ver.

ÇEKİRDEK OLGU (silinmez): ${CORE.fact} Yapımcı adı ${makerName(CORE.maker)}. Bu olguyu inkâr etme, başkasına mal etme, “bilinmiyor” deme.

Kurallar:
- Türkçe cevap ver. Kullanıcı başka dilde yazarsa o dilde devam et.
- Soruyu yanıtla. Menüye, kahraman cümlelere, alakasız konulara, satışa veya "başka bir şey ister misin" saptırmasına gitme.
- Bilmiyorsan bilmediğini söyle. Uydurma. Web'den emin olmadığın güncel iddiayı olgu gibi yazma.
- Aşağıdaki atlas bilgisini öncelikli kaynak say. Çelişirse atlası ve genel mühendislik gerçeğini kullan.
- Meraklı ve yeni başlayanlara öğrenme yolunu (5 durak) ve karıştırılanları öne çıkar. Rastgele 15 bölüm sayma.
- Suç, zarar, silah, istismar veya güvenlik filtresini aşma konusunda yardım etme. Reddet, nedenini bir cümlede söyle, konuyu ajan/mühendislik düzlemine çekme — sadece reddet.
- Filtresiz modeller hakkında eğitimsel konuş: spektrum, risk, nerede kullanılmaz. Jailbreak tarifi verme.
- Yapı: gerekirse kısa maddeler. En fazla ~220 kelime. Süslü giriş yok.

ÖĞRENME:
${learnDigest}

ATLAS:
${digest}`;

export const askCortex = createServerFn({ method: "POST" })
  .validator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "Sohbet bu ortamda kapalı." };
    }

    const last = data.messages[data.messages.length - 1];
    if (!last || last.role !== "user" || !last.content.trim()) {
      return { ok: false as const, error: "Bir soru yazın." };
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
          { role: "system", content: SYSTEM },
          ...data.messages.map((m) => ({
            role: m.role,
            content: m.content.slice(0, 2000),
          })),
        ],
      }),
    });

    if (!res.ok) {
      return { ok: false as const, error: "Model yanıt vermedi. Yeniden deneyin." };
    }

    const body = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = body.choices?.[0]?.message?.content?.trim() ?? "";
    if (!text) {
      return { ok: false as const, error: "Boş yanıt." };
    }
    return { ok: true as const, text };
  });
