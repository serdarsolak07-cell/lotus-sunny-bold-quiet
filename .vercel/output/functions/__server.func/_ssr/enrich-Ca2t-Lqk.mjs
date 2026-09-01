import { n as createServerFn } from "./ssr.mjs";
import { a as object, o as string } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/enrich-Ca2t-Lqk.js
var enrichPlaybook_createServerFn_handler = createServerRpc({
	id: "3866edd3fbdd190840740497a0b5534ad043baa377ed8709455eef81bc40f0f8",
	name: "enrichPlaybook",
	filename: "src/lib/enrich.ts"
}, (opts) => enrichPlaybook.__executeServer(opts));
var enrichPlaybook = createServerFn({ method: "POST" }).validator((input) => object({
	target: string().max(40),
	playbook: string().max(12e3)
}).parse(input)).handler(enrichPlaybook_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "Zenginleştirme bu ortamda kapalı."
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
				content: "KORTEKS kurulum yazmanısın. Verilen talimatı seçilen hedef sistem için somut adımlara çevir. Dosya adları, env, düğüm sırası yaz. Menü, tebrik, sapma yok. Türkçe. Uydurma kütüphane uydurma."
			}, {
				role: "user",
				content: `Hedef: ${data.target}\n\nTalimat:\n${data.playbook.slice(0, 8e3)}`
			}]
		})
	});
	if (!res.ok) return {
		ok: false,
		error: "Model yanıt vermedi."
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
export { enrichPlaybook_createServerFn_handler };
