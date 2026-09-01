import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as makerName, t as CORE } from "./core-seal-CFaAAZoA.mjs";
import { n as createServerFn } from "./ssr.mjs";
import { a as object, o as string } from "../_libs/zod.mjs";
import { a as Play, s as Download } from "../_libs/lucide-react.mjs";
import { a as getSpec, f as createSsrRpc, i as Button, l as specs, o as kindLabels, p as cn, s as kindOrder } from "./router-D6386i8S.mjs";
import { t as downloadText } from "./download-CAFv-d2f.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/test-DX8GtdbN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var enrichPlaybook = createServerFn({ method: "POST" }).validator((input) => object({
	target: string().max(40),
	playbook: string().max(12e3)
}).parse(input)).handler(createSsrRpc("3866edd3fbdd190840740497a0b5534ad043baa377ed8709455eef81bc40f0f8"));
var testKindLabels = {
	mantik: "Mantık hataları",
	hiz: "Sessiz hız",
	dogruluk: "Sessiz doğruluk"
};
function any(ids, ...need) {
	return need.some((id) => ids.has(id));
}
function timed(fn) {
	const t0 = performance.now();
	return {
		...fn(),
		ms: Math.max(1, Math.round(performance.now() - t0))
	};
}
function runHarness(config) {
	const ids = new Set(config.specIds);
	const selected = config.specIds.map((id) => getSpec(id)).filter(Boolean);
	const kinds = new Set(selected.map((s) => s.kind));
	const out = [];
	out.push(timed(() => {
		const planner = ids.has("ajan-planner");
		const executor = ids.has("ajan-executor");
		const ok = !(any(ids, "arch-plan", "arch-graph", "arch-sup") && executor && !planner);
		return {
			id: "logic-plan-exec",
			kind: "mantik",
			name: "Plan–icra ayrımı",
			pass: ok,
			silent: false,
			detail: ok ? "Uzun mimaride Planner ile Executor ayrı." : "Executor planı kendi genişletir. Bu bir mantık hatasıdır: icra, hedefi değiştirir."
		};
	}));
	out.push(timed(() => {
		const react = ids.has("arch-react");
		const cond = ids.has("node-condition") || config.maxTurns || ids.has("kor-butce");
		const ok = !react || cond;
		return {
			id: "logic-stop",
			kind: "mantik",
			name: "Durma koşulu",
			pass: ok,
			silent: false,
			detail: ok ? "Döngü tavanı veya condition var." : "ReAct durma koşulu yok. Döngü ‘biraz daha düşün’ ile kaçabilir."
		};
	}));
	out.push(timed(() => {
		const write = any(ids, "ajan-executor", "node-tool", "node-human") || kinds.has("terminal") || any(ids, "tool-bash", "tool-file", "tool-http", "tool-sql", "tool-git", "tool-code");
		const hitl = ids.has("ajan-hitl") || ids.has("node-human");
		const ok = config.face === "ic" || !write || hitl;
		return {
			id: "logic-hitl",
			kind: "mantik",
			name: "Yazma onayı",
			pass: ok,
			silent: false,
			detail: ok ? "Yazma yolu onay kapısından geçiyor veya iç yüzey." : "Kamu yüzünde yazma aracı var, HITL yok. Kontrol kırığı."
		};
	}));
	out.push(timed(() => {
		const ok = !(ids.has("az-hizali") && config.face === "kamu");
		return {
			id: "logic-filter",
			kind: "mantik",
			name: "Filtre yüzeyi",
			pass: ok,
			silent: false,
			detail: ok ? "Az hizalı model kamu yüzünde değil." : "Filtresiz model kamu yüzünde. Politika ve ürün sınırı ihlali."
		};
	}));
	out.push(timed(() => {
		const map = ids.has("node-map");
		const reduce = ids.has("node-reduce");
		const ok = !map || reduce;
		return {
			id: "logic-map-reduce",
			kind: "mantik",
			name: "Fan-out birleşimi",
			pass: ok,
			silent: false,
			detail: ok ? "Map varsa Reduce da var." : "Paralel uzmanlar var, birleştirici yok. Parçalar sessizce kaybolur."
		};
	}));
	out.push(timed(() => {
		const ok = !(ids.has("akil") && !ids.has("router-model") && !ids.has("ajan-router"));
		return {
			id: "speed-router",
			kind: "hiz",
			name: "Yönlendirici maliyeti",
			pass: ok,
			silent: true,
			detail: ok ? "Küçük router ayrılmış; büyük model her tokene yanmıyor." : "Akıl yürütme modeli yönlendiriyor. Gecikme UI’da ‘düşünüyor’ diye gizlenir — sessiz hız kaybı."
		};
	}));
	out.push(timed(() => {
		const ok = !(kinds.has("baglam") && ids.has("ctx-getiri") && !ids.has("ctx-ozet") && !config.compress);
		return {
			id: "speed-context-dump",
			kind: "hiz",
			name: "Bağlam dökümü",
			pass: ok,
			silent: true,
			detail: ok ? "Getiri budanıyor veya sıkıştırılıyor." : "Araç ve RAG çıktısı budanmadan pencereye giriyor. Tur süresi şişer, kimse alarm vermez."
		};
	}));
	out.push(timed(() => {
		const epi = ids.has("mem-epizodik");
		const manager = ids.has("ajan-memory") || ids.has("node-memory") || ids.has("kor-kalici");
		const ok = !epi || manager;
		return {
			id: "speed-memory-bloat",
			kind: "hiz",
			name: "Epizodik şişme",
			pass: ok,
			silent: true,
			detail: ok ? "Olay belleğini kimse yazıp unutmuyor; yönetici var." : "Her tur epizodiğe yazılıyor, unutma yok. Gecikme oturum 12’de patlar."
		};
	}));
	out.push(timed(() => {
		const swarmish = ids.has("conn-a2a") || ids.has("proto-a2a") || ids.has("arch-react") || kinds.has("terminal") || kinds.has("yontem");
		const budget = ids.has("kor-butce") || config.maxTurns;
		const ok = !swarmish || budget;
		return {
			id: "speed-budget",
			kind: "hiz",
			name: "Tur bütçesi",
			pass: ok,
			silent: true,
			detail: ok ? "Token/tur tavanı tanımlı." : "Bütçe yok. Sistem cevap verene kadar ‘çalışıyor’ görünür; maliyet sessiz birikir."
		};
	}));
	out.push(timed(() => {
		const research = ids.has("ajan-researcher") || ids.has("search-plan");
		const critic = ids.has("ajan-critic") || ids.has("node-guard") || ids.has("ajan-guard");
		const ok = !research || critic;
		return {
			id: "acc-critic",
			kind: "dogruluk",
			name: "Bağımsız eleştirmen",
			pass: ok,
			silent: true,
			detail: ok ? "Üretimden ayrı bir doğrulama katmanı var." : "Araştırma var, critic yok. Cevap bitmiş görünür; kanıt yoktur — sessiz doğruluk kaybı."
		};
	}));
	out.push(timed(() => {
		const web = any(ids, "ajan-researcher", "search-plan", "search-rerank");
		const cite = ids.has("search-cite");
		const ok = !web || cite;
		return {
			id: "acc-cite",
			kind: "dogruluk",
			name: "Alıntı bağlama",
			pass: ok,
			silent: true,
			detail: ok ? "İddia kaynağa bağlı." : "Web özeti alıntısız. Kullanıcı doğru sanır."
		};
	}));
	out.push(timed(() => {
		const rag = ids.has("mem-anlamsal") || ids.has("ctx-getiri");
		const rerank = ids.has("rerank") || ids.has("search-rerank");
		const ok = !rag || rerank;
		return {
			id: "acc-rerank",
			kind: "dogruluk",
			name: "Rerank yokluğu",
			pass: ok,
			silent: true,
			detail: ok ? "Adaylar yeniden sıralanıyor." : "İlk vektör komşusu cevap sanılıyor. Hata yüzeye çıkmaz."
		};
	}));
	out.push(timed(() => {
		const cortex = selected.some((s) => s.kind === "korteks" && s.id !== "cekirdek-yapimci");
		const core = ids.has("mem-cekirdek") || ids.has("ctx-cekirdek") || ids.has("kor-kalici");
		const ok = !cortex || core;
		return {
			id: "acc-core",
			kind: "dogruluk",
			name: "Çekirdek yükleme",
			pass: ok,
			silent: true,
			detail: ok ? "Korteks iddiası çekirdek bellek ile tutarlı." : "Korteks seçili ama çekirdek bellek yok. Sistem ‘hatırlıyor’ gibi konuşur, her tur sıfırdır."
		};
	}));
	out.push(timed(() => {
		const shell = kinds.has("terminal");
		const box = any(ids, "env-docker", "env-podman", "env-microvm", "env-gvisor", "wrap-cift");
		const ok = !shell || box;
		return {
			id: "logic-shell-sandbox",
			kind: "mantik",
			name: "Çıplak kabuk",
			pass: ok,
			silent: false,
			detail: ok ? "Terminal icra konteyner veya microVM içinde." : "Open Interpreter / Aider / CLI ajan host’ta çıplak. Her komut ev sahibidir."
		};
	}));
	out.push(timed(() => {
		const aider = ids.has("term-aider");
		const repo = ids.has("wrap-repo") || ids.has("wrap-cift");
		const ok = !aider || repo;
		return {
			id: "logic-aider-repo",
			kind: "mantik",
			name: "Aider repo sarması",
			pass: ok,
			silent: false,
			detail: ok ? "Aider git/diff sarmalamasıyla bağlı." : "Aider seçili ama repo sarmalaması yok. Yamayı sohbet sanır, dosya ezer."
		};
	}));
	out.push(timed(() => {
		const oi = ids.has("term-oi") || ids.has("term-kernel");
		const repl = ids.has("wrap-repl") || ids.has("wrap-kernel") || ids.has("wrap-cift");
		const ok = !oi || repl;
		return {
			id: "logic-oi-repl",
			kind: "mantik",
			name: "REPL sarması",
			pass: ok,
			silent: false,
			detail: ok ? "Yorumlayıcı REPL veya kernel sarmalamasında." : "Open Interpreter / Jupyter sarmalanmadan bağlanmış. Stdout ve durum budanmaz."
		};
	}));
	out.push(timed(() => {
		const shell = kinds.has("terminal");
		const lang = any(ids, "env-venv", "env-conda", "env-uv", "env-nix");
		const box = any(ids, "env-docker", "env-podman", "env-microvm", "env-gvisor", "wrap-cift");
		const ok = !shell || !lang || box || config.face === "ic";
		return {
			id: "logic-venv-boundary",
			kind: "mantik",
			name: "venv hapishane değil",
			pass: ok,
			silent: false,
			detail: ok ? "Paket ortamı güvenlik iddiası taşımıyor veya konteyner var." : "Kamu yüzünde venv/conda tek ‘izolasyon’. Aynı kernel, aynı ağ. Mantık hatası."
		};
	}));
	out.push(timed(() => {
		const docker = ids.has("env-docker") || ids.has("env-podman");
		const harden = ids.has("env-netnone") || ids.has("kor-butce") || config.maxTurns;
		const ok = !docker || harden;
		return {
			id: "speed-container-cap",
			kind: "hiz",
			name: "Konteyner tavanı",
			pass: ok,
			silent: true,
			detail: ok ? "Konteynerde ağ/CPU/tur tavanı var." : "Docker var, tavan yok. Ajan host’u doldurana kadar ‘çalışıyor’ görünür."
		};
	}));
	out.push(timed(() => {
		const shell = kinds.has("terminal");
		const critic = ids.has("ajan-critic") || ids.has("node-guard") || ids.has("wrap-repo");
		const ok = !shell || critic;
		return {
			id: "acc-code-ran",
			kind: "dogruluk",
			name: "Çalıştı ≠ doğru",
			pass: ok,
			silent: true,
			detail: ok ? "İcra çıktısı test veya critic’den geçiyor." : "Kod koştu diye kabul. Exit 0 sessiz doğruluk kaybıdır."
		};
	}));
	out.push(timed(() => {
		const writeTools = any(ids, "tool-bash", "tool-file", "tool-http", "tool-sql", "tool-git", "tool-code");
		const allow = ids.has("tool-allow") || ids.has("ajan-guard") || ids.has("node-guard");
		const ok = !writeTools || allow;
		return {
			id: "logic-tool-allow",
			kind: "mantik",
			name: "Araç izin listesi",
			pass: ok,
			silent: false,
			detail: ok ? "Yazma araçları allow-list veya guard arkasında." : "Bash/dosya/HTTP/SQL serbest. Eklenti ‘her şey’ olmuş. Mantık hatası."
		};
	}));
	out.push(timed(() => {
		const plug = kinds.has("eklenti");
		const scoped = ids.has("tool-allow") || ids.has("ajan-guard") || ids.has("node-guard");
		const ok = !plug || scoped;
		return {
			id: "logic-plugin-scope",
			kind: "mantik",
			name: "Eklenti kapsamı",
			pass: ok,
			silent: false,
			detail: ok ? "Plugin/MCP izinle sınırlı." : "Eklenti yüklü, izin yok. ‘load all tools’ sessiz yetki genişlemesi."
		};
	}));
	out.push(timed(() => {
		const tools = selected.filter((s) => s.kind === "arac" && s.id !== "tool-allow");
		const router = ids.has("ajan-router") || ids.has("router-model") || ids.has("node-router");
		const ok = tools.length < 4 || router;
		return {
			id: "speed-tool-flood",
			kind: "hiz",
			name: "Araç seli",
			pass: ok,
			silent: true,
			detail: ok ? "Araç seti dar veya router var." : `${tools.length} araç, router yok. Her tur şema şişer — sessiz hız kaybı.`
		};
	}));
	out.push(timed(() => {
		const web = ids.has("tool-web") || ids.has("tool-browser");
		const cite = ids.has("search-cite") || ids.has("ajan-critic");
		const ok = !web || cite;
		return {
			id: "acc-web-tool",
			kind: "dogruluk",
			name: "Web aracı alıntısı",
			pass: ok,
			silent: true,
			detail: ok ? "Web/tarayıcı aracı alıntı veya critic ile bağlı." : "Arama aracı var, kaynak yok. Özet doğru sanılır."
		};
	}));
	out.push(timed(() => {
		const tree = any(ids, "search-mcts", "search-tot", "search-got", "search-lats", "search-rap");
		const stop = config.maxTurns || ids.has("kor-butce") || ids.has("node-condition");
		const ok = !tree || stop;
		return {
			id: "logic-tree-stop",
			kind: "mantik",
			name: "Ağaç tavanı",
			pass: ok,
			silent: false,
			detail: ok ? "MCTS/ToT/LATS dal ve tur tavanı var." : "Ağaç arama tavan yok. Ziyaret sonsuza gider. Mantık hatası."
		};
	}));
	out.push(timed(() => {
		const a2a = ids.has("conn-a2a") || ids.has("proto-a2a") || ids.has("proto-acp");
		const who = ids.has("mem-cekirdek") || ids.has("ctx-cekirdek");
		const ok = !a2a || who;
		return {
			id: "logic-a2a-id",
			kind: "mantik",
			name: "A2A kimliği",
			pass: ok,
			silent: false,
			detail: ok ? "Ajan devrinde kimlik çekirdekte." : "A2A/ACP var, kimlik yok. Devir gürültüdür."
		};
	}));
	out.push(timed(() => {
		const mcp = any(ids, "conn-mcp", "proto-mcp", "plug-mcp");
		const allow = ids.has("tool-allow") || ids.has("ajan-guard") || ids.has("node-guard");
		const ok = !mcp || allow;
		return {
			id: "logic-mcp-allow",
			kind: "mantik",
			name: "MCP izin kapısı",
			pass: ok,
			silent: false,
			detail: ok ? "MCP allow-list veya guard arkasında." : "MCP takılı, izin yok. Fiş güvenlik sanılmış."
		};
	}));
	out.push(timed(() => {
		const ok = !kinds.has("gym") || config.face === "ic";
		return {
			id: "logic-gym-lab",
			kind: "mantik",
			name: "Gym ≠ üretim",
			pass: ok,
			silent: false,
			detail: ok ? "Gym laboratuvar yüzünde veya yok." : "Gym kamu yüzüne bağlanmış. Puan kutusu müşteri değildir."
		};
	}));
	out.push(timed(() => {
		const tree = any(ids, "search-mcts", "search-lats", "search-rap", "search-tot", "search-got");
		const value = kinds.has("gym") || ids.has("ajan-critic") || ids.has("node-guard") || ids.has("search-bon");
		const ok = !tree || value;
		return {
			id: "acc-tree-value",
			kind: "dogruluk",
			name: "Ziyaret ≠ doğru",
			pass: ok,
			silent: true,
			detail: ok ? "Ağaç değeri gym, critic veya skordan geliyor." : "MCTS/LATS ziyareti cevap sanılıyor. Sessiz doğruluk kaybı."
		};
	}));
	out.push(timed(() => {
		const ok = selected.length >= 4;
		return {
			id: "logic-empty",
			kind: "mantik",
			name: "Yığın boş değil",
			pass: ok,
			silent: false,
			detail: ok ? `${selected.length} parça seçili.` : "Kurgulama boş. Test edilecek sistem yok."
		};
	}));
	return out;
}
function summarize(results) {
	const fail = results.filter((r) => !r.pass);
	const silentFail = fail.filter((r) => r.silent);
	const byKind = (k) => {
		const rs = results.filter((r) => r.kind === k);
		return {
			total: rs.length,
			pass: rs.filter((r) => r.pass).length
		};
	};
	return {
		total: results.length,
		pass: results.filter((r) => r.pass).length,
		fail: fail.length,
		silentFail: silentFail.length,
		ms: results.reduce((a, r) => a + r.ms, 0),
		mantik: byKind("mantik"),
		hiz: byKind("hiz"),
		dogruluk: byKind("dogruluk")
	};
}
var presets = [
	{
		id: "saglam",
		name: "Sağlam üretim",
		hint: "Filtreli, graf, critic, bütçe",
		config: {
			face: "kamu",
			maxTurns: true,
			compress: true,
			specIds: [
				"sohbet-filtreli",
				"router-model",
				"ajan-router",
				"ajan-planner",
				"ajan-executor",
				"ajan-critic",
				"ajan-guard",
				"ajan-hitl",
				"ajan-memory",
				"mem-cekirdek",
				"mem-yordamsal",
				"node-router",
				"node-tool",
				"node-condition",
				"node-guard",
				"node-human",
				"ctx-sistem",
				"ctx-cekirdek",
				"ctx-ozet",
				"kor-hizli",
				"kor-yavas",
				"kor-kalici",
				"kor-butce",
				"conn-fn",
				"arch-graph"
			]
		}
	},
	{
		id: "kirik",
		name: "Kırık mantık",
		hint: "Executor plansız, HITL yok",
		config: {
			face: "kamu",
			maxTurns: false,
			compress: false,
			specIds: [
				"az-hizali",
				"akil",
				"ajan-executor",
				"arch-plan",
				"node-tool",
				"node-llm"
			]
		}
	},
	{
		id: "sessiz-yavas",
		name: "Sessiz yavaş",
		hint: "Büyük model router, döküm bağlam",
		config: {
			face: "ic",
			maxTurns: false,
			compress: false,
			specIds: [
				"akil",
				"ajan-executor",
				"mem-epizodik",
				"ctx-getiri",
				"arch-react",
				"node-map",
				"conn-a2a"
			]
		}
	},
	{
		id: "yalancı",
		name: "Yalancı doğru",
		hint: "Araştırma var, critic ve alıntı yok",
		config: {
			face: "kamu",
			maxTurns: true,
			compress: true,
			specIds: [
				"sohbet-filtreli",
				"ajan-researcher",
				"search-plan",
				"mem-anlamsal",
				"ctx-getiri",
				"kor-hizli",
				"arch-react"
			]
		}
	},
	{
		id: "ciplak-kabuk",
		name: "Çıplak kabuk",
		hint: "Open Interpreter, Docker yok",
		config: {
			face: "kamu",
			maxTurns: false,
			compress: true,
			specIds: [
				"term-oi",
				"wrap-repl",
				"env-venv",
				"ajan-executor",
				"arch-react",
				"node-tool"
			]
		}
	},
	{
		id: "saglam-kod",
		name: "Sağlam kod icra",
		hint: "Aider, Docker, venv, onay",
		config: {
			face: "ic",
			maxTurns: true,
			compress: true,
			specIds: [
				"sohbet-filtreli",
				"router-model",
				"yapi",
				"ajan-planner",
				"ajan-executor",
				"ajan-critic",
				"ajan-hitl",
				"ajan-guard",
				"term-aider",
				"wrap-repo",
				"wrap-cift",
				"env-docker",
				"env-venv",
				"env-netnone",
				"mem-cekirdek",
				"kor-kalici",
				"node-tool",
				"node-guard",
				"node-human",
				"node-condition",
				"kor-butce",
				"arch-plan"
			]
		}
	},
	{
		id: "acik-arac",
		name: "Açık araç çantası",
		hint: "Bash+plugin, izin yok",
		config: {
			face: "kamu",
			maxTurns: true,
			compress: true,
			specIds: [
				"tool-bash",
				"tool-file",
				"tool-http",
				"tool-web",
				"tool-browser",
				"plug-langchain",
				"ajan-executor",
				"arch-react"
			]
		}
	},
	{
		id: "dar-arac",
		name: "Dar araç seti",
		hint: "HTTP, RAG, MCP, izin",
		config: {
			face: "kamu",
			maxTurns: true,
			compress: true,
			specIds: [
				"sohbet-filtreli",
				"router-model",
				"ajan-router",
				"ajan-guard",
				"ajan-hitl",
				"tool-allow",
				"tool-http",
				"tool-rag",
				"plug-mcp",
				"conn-mcp",
				"node-guard",
				"node-human",
				"node-router",
				"search-cite",
				"rerank"
			]
		}
	},
	{
		id: "acik-agac",
		name: "Açık ağaç",
		hint: "MCTS+A2A+Gym, tavan yok",
		config: {
			face: "kamu",
			maxTurns: false,
			compress: true,
			specIds: [
				"search-mcts",
				"search-tot",
				"proto-a2a",
				"proto-mcp",
				"gym-nasium",
				"ajan-executor",
				"arch-react"
			]
		}
	},
	{
		id: "saglam-agac",
		name: "Sağlam LATS",
		hint: "LATS, SWE-Gym, MCP, bütçe",
		config: {
			face: "ic",
			maxTurns: true,
			compress: true,
			specIds: [
				"sohbet-filtreli",
				"router-model",
				"ajan-planner",
				"ajan-critic",
				"ajan-guard",
				"search-lats",
				"proto-mcp",
				"proto-a2a",
				"gym-swe",
				"tool-allow",
				"mem-cekirdek",
				"kor-butce",
				"node-guard",
				"node-condition"
			]
		}
	}
];
var targets = [
	{
		id: "genel",
		name: "Genel sözleşme",
		hint: "Her yığına taşınır"
	},
	{
		id: "langgraph",
		name: "LangGraph",
		hint: "Durum + düğüm + kenar"
	},
	{
		id: "crewai",
		name: "CrewAI / AutoGen",
		hint: "Rol ve süreç"
	},
	{
		id: "n8n",
		name: "n8n / Flowise",
		hint: "Görsel düğüm"
	},
	{
		id: "letta",
		name: "Letta / MemGPT",
		hint: "Korteks ve bellek"
	},
	{
		id: "xai",
		name: "xAI / Grok",
		hint: "API + function calling"
	},
	{
		id: "cli",
		name: "Aider / OI / CLI",
		hint: "Terminal sarmalama"
	}
];
function idsOf(config) {
	return new Set(config.specIds);
}
function pick(config) {
	return config.specIds.map((id) => getSpec(id)).filter(Boolean);
}
function named(config, kind) {
	return pick(config).filter((s) => s.kind === kind).map((s) => `${s.name} — ${s.task}`).join("\n- ");
}
function header(config, ready, blockers) {
	const parts = pick(config);
	return [
		`# KORTEKS hayata geçirme talimatı`,
		``,
		`Çekirdek — Yapımcı: ${makerName(CORE.maker)}`,
		ready ? `Durum: TEST GEÇTİ. Bu yığın başka bir yapay zeka sistemine taşınabilir.` : `Durum: TEST GEÇMEDİ. Talimat kilitlenmez ama üretime alınmaz.`,
		`Yüzey: ${config.face === "kamu" ? "kamu" : "iç"}`,
		`Tur tavanı: ${config.maxTurns ? "açık" : "kapalı"}`,
		`Bağlam sıkıştırma: ${config.compress ? "açık" : "kapalı"}`,
		`Parça sayısı: ${parts.length}`,
		``,
		blockers.length ? `Blokajlar:\n${blockers.map((b) => `- ${b}`).join("\n")}\n` : "",
		`## Seçilen parçalar`,
		...kindOrder.map((k) => {
			const g = parts.filter((s) => s.kind === k);
			if (!g.length) return "";
			return `### ${kindLabels[k]}\n${g.map((s) => `- **${s.name}**: ${s.task} ${s.summary}`).join("\n")}`;
		}).filter(Boolean)
	].join("\n");
}
function genel(config) {
	const id = idsOf(config);
	const agents = named(config, "ajan") || "(ajan seçilmedi)";
	return [
		`## Genel kurulum sırası`,
		`1. Anahtarları sunucuda tut. İstemciye model anahtarı koyma.`,
		`2. Çıkarım: ${id.has("az-hizali") ? "az hizalı model yalnızca izole ağda." : "filtreli sohbet modeli üretim yüzü."} ${id.has("router-model") ? "Yönlendirme için küçük model ayır." : "Küçük router ekle; büyük modeli her tokene yakma."}`,
		`3. Ajan sözleşmeleri (girdi / çıktı / yasak):`,
		`- ${agents}`,
		`4. Graf: Start → Router → (Plan | Tool) → Guard → ${id.has("ajan-hitl") || id.has("node-human") ? "Human → " : ""}End.`,
		`5. Durma: ${config.maxTurns || id.has("kor-butce") || id.has("node-condition") ? "tur tavanı veya condition açık tut." : "tur tavanı ekle — yoksa döngü kaçar."}`,
		`6. Bellek: çalışma penceresi ≠ bellek. ${id.has("mem-cekirdek") || id.has("kor-kalici") ? "Çekirdek gerçeği her tur yükle." : "Çekirdek bellek bloğu tanımla."} Unutma politikası yaz.`,
		`7. Doğrulama: ${id.has("ajan-critic") || id.has("node-guard") ? "Critic/Guard bağımsız çalışsın." : "Bağımsız critic ekle."} ${id.has("search-cite") ? "Alıntı şeması zorunlu." : "Web varsa alıntı şeması koy."}`,
		`8. İzleme: tur, token, araç hatası, sessiz kaçak. Alarmı UI’dan bağımsız tut.`,
		`9. Terminal icra: ${kindsTerminal(config)}`,
		`10. Araç ve eklenti: ${kindsTools(config)}`,
		`11. Arama / protokol / gym: ${kindsSearch(config)}`,
		``,
		`## Yasak`,
		`- Filtresiz modeli kamu yüzüne bağlama.`,
		`- Executor’a plan değiştirme yetkisi verme.`,
		`- Her ajanın ham geçmiş yazmasına izin verme.`,
		`- Open Interpreter / Aider / CLI ajanı host’ta çıplak koşturma.`,
		`- venv’i hapishane yazma. Paket ≠ süreç izolasyonu.`,
		`- ‘Tüm araçları yükle’. Plugin allow-list olmadan takılmaz.`,
		`- MCTS/LATS’i tavan ve değer (gym/critic) olmadan koşturma.`,
		`- MCP’yi A2A sanma. Gym’i üretim yüzü yazma.`,
		`- Test geçmeden üretime alma.`
	].join("\n");
}
function kindsSearch(config) {
	const methods = named(config, "yontem");
	const proto = named(config, "protokol");
	const gym = named(config, "gym");
	if (!methods && !proto && !gym) return "yok. MCTS/LATS eklerken tavan + gym/critic. MCP araç, A2A delege, AG-UI onay.";
	return [
		methods ? `Yöntem: ${methods}` : "",
		proto ? `Protokol: ${proto}` : "",
		gym ? `Gym: ${gym}` : "",
		"MCTS ≠ mimari. MCP ≠ A2A. Gym ≠ müşteri yüzü."
	].filter(Boolean).join(" ");
}
function kindsTools(config) {
	const tools = named(config, "arac");
	const plugs = named(config, "eklenti");
	if (!tools && !plugs) return "araç yok. Eklerken izin listesi + guard + (yazmada HITL).";
	return [
		tools ? `Araçlar: ${tools}` : "araç seç.",
		plugs ? `Eklenti: ${plugs}` : "",
		"Kapı: allow-list → guard şema → HITL yazma. MCP izni sunucuda da kes."
	].filter(Boolean).join(" ");
}
function kindsTerminal(config) {
	idsOf(config);
	const terms = named(config, "terminal");
	const wraps = named(config, "sarmalama");
	const envs = named(config, "ortam");
	if (!terms && !wraps && !envs) return "kod icra yok. Eklerken sıra: onay → konteyner/microVM → venv → komut.";
	return [
		terms ? `Sistemler: ${terms}` : "icra sistemi seç.",
		wraps ? `Sarmalama: ${wraps}` : "sarmalama tipi seç (REPL / repo / CLI).",
		envs ? `Ortam: ${envs}` : "Docker veya microVM ekle; yalnız venv yetmez.",
		"Sıra: ajan ⊃ onay ⊃ konteyner ⊃ venv ⊃ süreç."
	].join(" ");
}
function langgraph(config) {
	const id = idsOf(config);
	return [
		`## LangGraph’e taşı`,
		`1. \`State\` TypedDict: messages, plan, evidence, budget, flags.`,
		`2. Düğüm fonksiyonları:`,
		id.has("ajan-router") || id.has("node-router") ? `- \`router_node\`: niyet → kenar. Küçük model, düşük sıcaklık.` : `- \`router_node\` ekle.`,
		id.has("ajan-planner") ? `- \`planner_node\`: plan şeması üret, araç çağırma.` : `- Uzun işte \`planner_node\` ekle.`,
		id.has("ajan-executor") || id.has("node-tool") ? `- \`tool_node\`: izin listesi, timeout, JSON argüman.` : `- Tool düğümü yok; eklemeden dış dünya yok.`,
		id.has("ajan-critic") || id.has("node-guard") ? `- \`critic_node\` + \`guard_node\`: şema ve kanıt.` : `- \`guard_node\` deterministik olsun.`,
		id.has("ajan-hitl") || id.has("node-human") ? `- \`interrupt()\` human düğümünde. Para/silme burada.` : `- Kamu yazma varsa interrupt ekle.`,
		`3. Kenarlar: router → plan|tool; critic fail → planner; budget=0 → end.`,
		`4. Checkpointer: ${id.has("mem-epizodik") ? "Postgres/SQLite checkpointer (epizodik)." : "MemorySaver ile başla, sonra kalıcı checkpointer."}`,
		`5. Store: ${id.has("mem-anlamsal") ? "vektör store + rerank düğümü." : "gerekirse ayrı retrieval subgraph."}`,
		`6. Çalıştırma: \`graph.invoke(input, config={recursion_limit: N})\` — N tur tavanı.`
	].join("\n");
}
function crewai(config) {
	const agents = pick(config).filter((s) => s.kind === "ajan");
	return [
		`## CrewAI / AutoGen’e taşı`,
		`1. Her ajan için \`role\`, \`goal\`, \`backstory\` yazma. Yerine \`role\` + çıktı şeması + tool listesi.`,
		agents.length ? `2. Ajanlar:\n${agents.map((a) => `   - ${a.name}: ${a.task} Araçlar dar. Yasak: diğer rollerin işi.`).join("\n")}` : `2. En az Router, Executor, Critic tanımla.`,
		`3. Süreç: ${idsOf(config).has("arch-sup") || idsOf(config).has("ajan-router") ? "hierarchical (supervisor)." : idsOf(config).has("arch-plan") ? "sequential: Planner → Executor → Critic." : "sequential, kısa."}`,
		`4. \`max_iter\` ve \`max_execution_time\` ver. Sessiz hız burada kesilir.`,
		`5. Human-in-the-loop: onay bekleyen task’i \`human=True\` yap.`,
		`6. AutoGen ise: UserProxy durma cümlesi + GroupChat manager bütçesi.`
	].join("\n");
}
function n8n(config) {
	const id = idsOf(config);
	return [
		`## n8n / Flowise’e taşı`,
		`1. Akış: Webhook → Router (LLM sınıflandırıcı) → Switch.`,
		`2. Dalları seçilen düğümlere map et: ${pick(config).filter((s) => s.kind === "dugum").map((s) => s.name).join(", ") || "LLM, Tool, Guard"}.`,
		`3. Tool düğümlerinde retry=1, timeout açık, hata dalı → Guard. Hatayı yutma.`,
		`4. ${id.has("node-map") ? "SplitInBatches = Map. Merge = Reduce. Merge yoksa akışı durdur." : "Paralel dal açarsan Merge koy."}`,
		`5. Human: Wait / form onayı. ${id.has("ajan-hitl") || id.has("node-human") ? "Yazma bu beklemeye bağlı." : "Kamu yazma varsa Wait ekle."}`,
		`6. Bellek: Postgres + (isteğe bağlı) vektör. Pencereye tüm geçmişi yapıştırma.`,
		`7. Üretimde şemayı kodda kilitle; görsel tuval tek kaynak gerçek olmasın.`
	].join("\n");
}
function letta(config) {
	const id = idsOf(config);
	return [
		`## Letta / MemGPT korteksine taşı`,
		`1. Dış döngü: kullanıcı mesajı. İç döngü: bellek sayfası, araç, yeniden yazım.`,
		`2. Core memory blokları: ${id.has("mem-cekirdek") || id.has("ctx-cekirdek") ? "persona + human + proje gerçeği (kısa)." : "persona ve human bloklarını şimdi tanımla."}`,
		`3. Archival: ${id.has("mem-anlamsal") || id.has("mem-epizodik") ? "archival_memory_insert yalnızca Memory Manager yetkisinde." : "archival store bağla, her tur insert etme."}`,
		`4. ${id.has("kor-hizli") ? "Hızlı yol: recall_memory + araç." : "Hızlı yol tanımla: router + tool."} ${id.has("kor-yavas") ? "Yavaş yol: plan + critic." : "Yavaş yolu ayrı agent’e ayır."}`,
		`5. Unutma: core’a çelişen olgu gelirse archival ham kaynak kazansın; özet ezmesin.`,
		`6. Bütçe: inner-loop adım tavanı. Kullanıcı her iç adımı görmesin.`
	].join("\n");
}
function xai(config) {
	const id = idsOf(config);
	return [
		`## xAI / Grok API’ye taşı`,
		`1. Sunucu tarafı: \`XAI_API_KEY\`. Tarayıcıdan çağırma.`,
		`2. Model: üretim sohbeti \`grok-4.5\`, sıcaklık düşük. ${id.has("router-model") ? "Router için ayrı, küçük, ucuz çağrı." : "Router’ı ayrı çağrı yap; aynı büyük modele her niyeti sorma."}`,
		`3. Function calling: araçları JSON şema ile bildir. ${id.has("conn-fn") ? "Function calling seçili — senkron araç standardı bu." : "Araç varsa function calling aç."}`,
		`4. Sistem istemi: rol + yasak + çıktı şeması (kısa). Atlas gerçeğini RAG/çekirdekten yükle; romana çevirme.`,
		`5. ${config.face === "kamu" ? "Kamu yüzü: filtreli, dar tool, HITL. Az hizalı model bağlama." : "İç yüzey: günlük ve insan denetimi yine açık olsun."}`,
		`6. max_tokens tavanı, kullanıcı tetikli çağrı, aynı içeriği yeniden üretme.`,
		`7. Critic ayrı bir çağrı olsun (üretici ile aynı mesaj yığınında ‘kendini denetle’ yetmez).`
	].join("\n");
}
function cli(config) {
	const id = idsOf(config);
	return [
		`## Aider / Open Interpreter / CLI ajana taşı`,
		`Seçilen icra:`,
		`- ${named(config, "terminal") || "Open Interpreter (REPL) veya Aider (repo) veya CLI kod ajanı seç."}`,
		`1. Ajanı host’ta çıplak koşturma.`,
		`2. Sarmalama sırası: onay kapısı → ${id.has("env-microvm") ? "microVM/Firecracker" : id.has("env-docker") || id.has("env-podman") ? "Docker/Podman (network=none, read-only kök, CPU/RAM tavanı)" : "Docker veya microVM ekle"} → ${id.has("env-venv") || id.has("env-uv") || id.has("env-conda") ? "venv/uv/conda" : "venv veya uv"} → komut.`,
		`3. ${id.has("term-aider") || id.has("wrap-repo") ? "Aider: git repo birimdir. Commit öncesi lint/test. .gitignore ve allow-list dosya." : "Repo işi ise Aider veya CLI ajanı git sarmalamasıyla bağla."}`,
		`4. ${id.has("term-oi") || id.has("wrap-repl") ? "Open Interpreter: her komut onay. Stdout budanır, pencereye ham dökülmez. Auto-run kapalı." : "REPL kullanıyorsan auto-run kapalı, stdout tavanı koy."}`,
		`5. CLI ajan (Claude Code / Codex / Goose): cwd = proje kökü. HOME, SSH anahtarı, bulut kimliği bağlama.`,
		`6. ${id.has("env-netnone") ? "Ağ kapalı. Gerekirse ayrı allow-list proxy." : "Konteynerde --network none varsayılan olsun."}`,
		`7. ${id.has("ajan-critic") || id.has("wrap-repo") ? "Critic: test çıktısı. Exit 0 cevap değildir." : "pytest/lint’i critic düğümü yap. Kodun çalışması doğruluk değildir."}`,
		`8. venv paket kilitler; Docker süreç keser. İkisini birden kullan. Yalnız birini ‘izolasyon’ yazma.`
	].join("\n");
}
function buildPlaybook(config, results) {
	const fail = results.filter((r) => !r.pass);
	const ready = fail.length === 0 && pick(config).length >= 4;
	const blockers = fail.map((r) => `${r.name}: ${r.detail}`);
	const head = header(config, ready, blockers);
	const files = {
		genel: [
			head,
			"",
			genel(config)
		].join("\n"),
		langgraph: [
			head,
			"",
			langgraph(config)
		].join("\n"),
		crewai: [
			head,
			"",
			crewai(config)
		].join("\n"),
		n8n: [
			head,
			"",
			n8n(config)
		].join("\n"),
		letta: [
			head,
			"",
			letta(config)
		].join("\n"),
		xai: [
			head,
			"",
			xai(config)
		].join("\n"),
		cli: [
			head,
			"",
			cli(config)
		].join("\n")
	};
	return {
		ready,
		blockers,
		title: ready ? "Hayata geçirme talimatı" : "Talimat kilitli",
		parts: pick(config),
		files
	};
}
function bundlePlaybook(p) {
	return targets.map((t) => `----- ${t.name} -----\n\n${p.files[t.id]}`).join("\n\n");
}
var probeSystem = createServerFn({ method: "POST" }).handler(createSsrRpc("587c4dd46f139d53c317cdc6a471a65f2e13e419469936e414b350d1187ba3d6"));
var empty = {
	specIds: [],
	face: "kamu",
	maxTurns: true,
	compress: true
};
function TestPage() {
	const [config, setConfig] = (0, import_react.useState)(presets[0]?.config ?? empty);
	const [results, setResults] = (0, import_react.useState)(null);
	const [live, setLive] = (0, import_react.useState)(null);
	const [pending, setPending] = (0, import_react.useState)(false);
	const [livePending, setLivePending] = (0, import_react.useState)(false);
	const [target, setTarget] = (0, import_react.useState)("genel");
	const [enriched, setEnriched] = (0, import_react.useState)(null);
	const [enrichError, setEnrichError] = (0, import_react.useState)(null);
	const [enrichPending, setEnrichPending] = (0, import_react.useState)(false);
	const outRef = (0, import_react.useRef)(null);
	const selected = (0, import_react.useMemo)(() => new Set(config.specIds), [config.specIds]);
	const summary = results ? summarize(results) : null;
	const playbook = results ? buildPlaybook(config, results) : null;
	function toggle(id) {
		setResults(null);
		setEnriched(null);
		setEnrichError(null);
		setConfig((c) => ({
			...c,
			specIds: c.specIds.includes(id) ? c.specIds.filter((x) => x !== id) : [...c.specIds, id]
		}));
	}
	function run() {
		setPending(true);
		const t0 = performance.now();
		const rs = runHarness(config);
		const wait = Math.max(0, 280 - (performance.now() - t0));
		window.setTimeout(() => {
			setResults(rs);
			setEnriched(null);
			setEnrichError(null);
			setPending(false);
			window.setTimeout(() => {
				outRef.current?.scrollIntoView({
					behavior: "smooth",
					block: "start"
				});
			}, 40);
		}, wait);
	}
	async function liveProbe() {
		setLivePending(true);
		setLive(null);
		try {
			setLive(await probeSystem());
		} catch {
			setLive({
				ok: false,
				error: "Yoklama kopuk."
			});
		} finally {
			setLivePending(false);
		}
	}
	function downloadReport() {
		if (!results || !summary) return;
		const lines = [
			`# KORTEKS test raporu`,
			``,
			`Yüzey: ${config.face}`,
			`Tur tavanı: ${config.maxTurns ? "var" : "yok"}`,
			`Sıkıştırma: ${config.compress ? "var" : "yok"}`,
			`Parça: ${config.specIds.join(", ") || "yok"}`,
			``,
			`Özet: ${summary.pass}/${summary.total} geçti, sessiz kaçak ${summary.silentFail}, ${summary.ms}ms`,
			``,
			...results.map((r) => `## ${r.pass ? "GEÇTİ" : "KALDI"} · ${testKindLabels[r.kind]} · ${r.name}${r.silent ? " (sessiz)" : ""}\n${r.detail}\n`)
		];
		downloadText("korteks-test-raporu.md", lines.join("\n"));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-10 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs text-accent",
				children: "TEST · KURGULAMA"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 max-w-2xl font-display text-4xl leading-tight sm:text-5xl",
				children: "Yığını kurun, sistemin gerçekten çalıştığını görün."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-muted",
				children: "Dört seçim değil: parçayı seçin, test edin. Geçerse talimat üretilir — LangGraph, CrewAI, n8n, Letta veya Grok üzerinde aynı yığını hayata geçirmek için."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 flex flex-wrap gap-2",
				children: presets.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						setConfig(p.config);
						setResults(null);
						setLive(null);
						setEnriched(null);
						setEnrichError(null);
					},
					className: "rounded-md bg-raised px-3 py-2 text-left text-sm shadow-[0_0_0_1px_var(--color-line)] hover:shadow-[0_0_0_1px_var(--color-line-strong)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-medium",
						children: p.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-xs text-muted",
						children: p.hint
					})]
				}, p.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-col gap-8 lg:grid lg:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									setResults(null);
									setEnriched(null);
									setConfig((c) => ({
										...c,
										face: c.face === "kamu" ? "ic" : "kamu"
									}));
								},
								className: cn("h-10 rounded-sm px-3 text-sm shadow-[0_0_0_1px_var(--color-line)]", "bg-raised"),
								children: ["Yüzey: ", config.face === "kamu" ? "kamu" : "iç"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setResults(null);
									setEnriched(null);
									setConfig((c) => ({
										...c,
										maxTurns: !c.maxTurns
									}));
								},
								className: cn("h-10 rounded-sm px-3 text-sm shadow-[0_0_0_1px_var(--color-line)]", config.maxTurns ? "bg-accent text-accent-fg" : "bg-raised"),
								children: "Tur tavanı"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setResults(null);
									setEnriched(null);
									setConfig((c) => ({
										...c,
										compress: !c.compress
									}));
								},
								className: cn("h-10 rounded-sm px-3 text-sm shadow-[0_0_0_1px_var(--color-line)]", config.compress ? "bg-accent text-accent-fg" : "bg-raised"),
								children: "Sıkıştırma"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid gap-8",
						children: kindOrder.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl",
							children: kindLabels[k]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: specs.filter((s) => s.kind === k).map((s) => {
								const on = selected.has(s.id);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									title: s.summary,
									onClick: () => toggle(s.id),
									className: cn("min-h-11 rounded-md px-3 py-2 text-left text-sm shadow-[0_0_0_1px_var(--color-line)]", on ? "bg-accent text-accent-fg" : "bg-raised text-fg"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block font-medium",
										children: s.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("block text-xs", on ? "opacity-80" : "text-muted"),
										children: s.task
									})]
								}, s.id);
							})
						})] }, k))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "order-first h-fit rounded-xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-line)] lg:order-last lg:col-span-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] text-subtle",
							children: "KOŞU"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted",
							children: [config.specIds.length, " parça seçili."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							className: "mt-4 w-full",
							onClick: run,
							disabled: pending,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }), pending ? "Koşuluyor" : "Testleri çalıştır"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "secondary",
							className: "mt-2 w-full",
							onClick: () => void liveProbe(),
							disabled: livePending,
							children: livePending ? "Yoklanıyor" : "Canlı yoklama"
						}),
						summary && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 grid gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-display text-2xl",
									children: [
										summary.pass,
										"/",
										summary.total,
										" geçti"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted",
									children: [
										"Sessiz kaçak: ",
										summary.silentFail,
										" · ",
										summary.ms,
										" ms"
									]
								}),
								Object.keys(testKindLabels).map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm",
									children: [
										testKindLabels[k],
										": ",
										summary[k].pass,
										"/",
										summary[k].total
									]
								}, k)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									onClick: downloadReport,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), "Raporu indir"]
								}),
								playbook?.ready && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									size: "sm",
									className: "w-full",
									onClick: () => downloadText(`korteks-talimat-${target}.md`, playbook.files[target]),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), "Talimatı indir"]
								})
							]
						}),
						live && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 rounded-md bg-bg p-3 shadow-[0_0_0_1px_var(--color-line)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[11px] text-subtle",
								children: "CANLI"
							}), live.ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-2 grid gap-1 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Mantık: ", live.checks.mantik ? "geçti" : "kaldı"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
										"Hız: ",
										live.checks.hiz ? "geçti" : "kaldı",
										" (",
										live.ms,
										" ms)"
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Doğruluk: ", live.checks.dogruluk ? "geçti" : "kaldı"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Sapma yok: ", live.checks.divert ? "geçti" : "kaldı"] })
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-danger",
								children: live.error
							})]
						})
					]
				})]
			}),
			results && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				ref: outRef,
				className: "mt-12 scroll-mt-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Sonuçlar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 grid gap-6",
					children: Object.keys(testKindLabels).map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg",
						children: testKindLabels[k]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 grid gap-2",
						children: results.filter((r) => r.kind === k).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-lg bg-raised px-4 py-3 shadow-[0_0_0_1px_var(--color-line)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-baseline justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm font-medium",
									children: [
										r.pass ? "Geçti" : "Kaldı",
										" · ",
										r.name,
										r.silent ? " · sessiz" : ""
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-mono text-[11px] text-subtle",
									children: [r.ms, " ms"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: cn("mt-1 text-sm", r.pass ? "text-muted" : "text-danger"),
								children: r.detail
							})]
						}, r.id))
					})] }, k))
				})]
			}),
			playbook && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12 mb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs text-accent",
						children: "HAYATA GEÇİR"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-2xl",
						children: playbook.title
					}),
					playbook.ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-2xl text-sm text-muted",
						children: "Testler geçti. Aşağıdaki talimat bu yığını LangGraph, CrewAI, n8n, Letta veya Grok API üzerinde kurmak içindir. Başka bir yapay zeka sistemine olduğu gibi verilebilir."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 max-w-2xl rounded-lg bg-raised px-4 py-3 shadow-[0_0_0_1px_var(--color-line)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-danger",
							children: "Sistem henüz doğru çalışmıyor. Talimat üretilmez; önce kaçakları kapatın."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 grid gap-1",
							children: playbook.blockers.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "border-l-2 border-accent/50 pl-3 text-sm text-muted",
								children: b
							}, b))
						})]
					}),
					playbook.ready && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 flex flex-wrap gap-2",
							children: targets.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setTarget(t.id);
									setEnriched(null);
									setEnrichError(null);
								},
								className: cn("h-10 rounded-sm px-3 text-sm shadow-[0_0_0_1px_var(--color-line)]", target === t.id ? "bg-accent text-accent-fg" : "bg-raised text-fg"),
								children: t.name
							}, t.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
							className: "mt-5 max-h-[28rem] overflow-auto whitespace-pre-wrap rounded-xl bg-inset p-4 font-mono text-[13px] leading-relaxed text-fg shadow-[0_0_0_1px_var(--color-line)]",
							children: enriched ?? playbook.files[target]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									onClick: () => downloadText(`korteks-talimat-${target}.md`, enriched ?? playbook.files[target]),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }),
										targets.find((t) => t.id === target)?.name,
										" talimatını indir"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "secondary",
									onClick: () => downloadText("korteks-talimat-hepsi.md", bundlePlaybook(playbook)),
									children: "Tüm hedefleri indir"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									disabled: enrichPending,
									onClick: () => {
										setEnrichPending(true);
										setEnrichError(null);
										enrichPlaybook({ data: {
											target,
											playbook: playbook.files[target]
										} }).then((r) => {
											if (r.ok) setEnriched(r.text);
											else setEnrichError(r.error);
										}).catch(() => setEnrichError("Zenginleştirme kopuk.")).finally(() => setEnrichPending(false));
									},
									children: enrichPending ? "Genişletiliyor" : "Hedefe göre genişlet"
								})
							]
						}),
						enrichError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-danger",
							children: enrichError
						})
					] })
				]
			})
		]
	});
}
//#endregion
export { TestPage as component };
