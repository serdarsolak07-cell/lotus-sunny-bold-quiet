import { _ as topics, d as makerName, m as pathStops, n as EXAMPLE, s as confusions, t as CORE } from "./core-seal-CFaAAZoA.mjs";
import { n as createServerFn } from "./ssr.mjs";
import { a as object, n as array, o as string, t as _enum } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chat-6PjxwItL.js
var MessageSchema = object({
	role: _enum(["user", "assistant"]),
	content: string().max(4e3)
});
var InputSchema = object({ messages: array(MessageSchema).min(1).max(12) });
var digest = topics.map((t) => {
	const body = t.sections.map((s) => `${s.heading}: ${s.body.join(" ")}`).join(" ");
	return `# ${t.chapter} ${t.title}\n${t.summary}\n${body}`.slice(0, 720);
}).join("\n\n");
var learnDigest = [
	`Tek örnek ${EXAMPLE.name}: ${EXAMPLE.what}`,
	"Öğrenme yolu (bu sırayı öner):",
	...pathStops.map((s) => `${s.n} ${s.title}: ${s.rule} Defter: ${s.defter}`),
	"Karıştırılanlar:",
	...confusions.map((c) => `${c.wrong} ≠ ${c.right}. ${c.why}`)
].join("\n");
var SYSTEM = `Sen KORTEKS atlasının sohbet katmanısın. Kullanıcıya doğrudan, doğru, kısa ve net cevap ver.

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
var askCortex_createServerFn_handler = createServerRpc({
	id: "162d48fa658984f13d31f7a0d7defe01875ec6a577067b092022baf72c3c1676",
	name: "askCortex",
	filename: "src/lib/chat.ts"
}, (opts) => askCortex.__executeServer(opts));
var askCortex = createServerFn({ method: "POST" }).validator((input) => InputSchema.parse(input)).handler(askCortex_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "Sohbet bu ortamda kapalı."
	};
	const last = data.messages[data.messages.length - 1];
	if (!last || last.role !== "user" || !last.content.trim()) return {
		ok: false,
		error: "Bir soru yazın."
	};
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			temperature: .2,
			max_tokens: 700,
			messages: [{
				role: "system",
				content: SYSTEM
			}, ...data.messages.map((m) => ({
				role: m.role,
				content: m.content.slice(0, 2e3)
			}))]
		})
	});
	if (!res.ok) return {
		ok: false,
		error: "Model yanıt vermedi. Yeniden deneyin."
	};
	const text = (await res.json()).choices?.[0]?.message?.content?.trim() ?? "";
	if (!text) return {
		ok: false,
		error: "Boş yanıt."
	};
	return {
		ok: true,
		text
	};
});
//#endregion
export { askCortex_createServerFn_handler };
