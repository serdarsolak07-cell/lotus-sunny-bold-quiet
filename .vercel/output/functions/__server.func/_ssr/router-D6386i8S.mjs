import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { B as notFound, _ as createRootRoute, b as require_jsx_runtime, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as topics, d as makerName, l as getTopic, m as pathStops, s as confusions, t as CORE } from "./core-seal-CFaAAZoA.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as createServerFn, r as getServerFnById, t as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { a as object, i as number, n as array, o as string, r as literal, s as union, t as _enum } from "../_libs/zod.mjs";
import { i as Search, n as TriangleAlert, o as MessageSquare, r as Send, t as X } from "../_libs/lucide-react.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-C_uf36nf.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/createSsrRpc-C1p7zOu_.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-D6386i8S.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
/** Türkçe/ASCII eşitle: "hafiza" ↔ "hafıza", "dugum" ↔ "düğüm". */
function foldTr(s) {
	return s.toLocaleLowerCase("tr").replace(/[ıi]/g, "i").replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s").replace(/ö/g, "o").replace(/ç/g, "c");
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var kindLabels = {
	model: "Modeller",
	ajan: "Ajanlar",
	hafiza: "Hafıza",
	dugum: "GI düğümleri",
	baglam: "Bağlam",
	korteks: "Korteks",
	baglanma: "Bağlanma",
	mimari: "Mimariler",
	arama: "Arama",
	terminal: "Terminal icra",
	sarmalama: "Sarmalama",
	ortam: "Ortam / izolasyon",
	arac: "Araçlar",
	eklenti: "Eklentiler",
	yontem: "Arama / yöntem",
	protokol: "Protokoller",
	gym: "Gym / ortam"
};
var kindOrder = [
	"model",
	"ajan",
	"hafiza",
	"dugum",
	"baglam",
	"korteks",
	"baglanma",
	"mimari",
	"arama",
	"terminal",
	"sarmalama",
	"ortam",
	"arac",
	"eklenti",
	"yontem",
	"protokol",
	"gym"
];
var specs = [
	{
		id: "sohbet-filtreli",
		kind: "model",
		name: "Filtreli sohbet",
		task: "Diyalog, talimat izleme, üretim yüzü.",
		summary: "Hizalı politika katmanı taşır. Reddetme bir özelliktir. Destek, eğitim ve kamu sohbetinin varsayılanıdır."
	},
	{
		id: "akil",
		kind: "model",
		name: "Akıl yürütme",
		task: "Uzun zincir, plan, matematik.",
		summary: "Yavaş ve pahalıdır. Router olarak kullanılmaz. Planner ve eleştirmen için ayrılır."
	},
	{
		id: "gome",
		kind: "model",
		name: "Gömme",
		task: "Metni vektöre çevirir.",
		summary: "Üretim yapmaz. Anlamsal bellek ve RAG getirisinin temelidir. Sohbet modeliyle karıştırılmaz."
	},
	{
		id: "rerank",
		kind: "model",
		name: "Rerank",
		task: "Aday parçaları yeniden sıralar.",
		summary: "RAG kalitesinin gizli kahramanı. Sessiz doğruluk kaybının çoğu rerank yokluğundan gelir."
	},
	{
		id: "yapi",
		kind: "model",
		name: "Yapılandırılmış / kod",
		task: "Şema, araç çağrısı, icra.",
		summary: "JSON disiplinli çıktı üretir. Executor düğümüne bağlanır. Serbest sohbet için zayıf seçimdir."
	},
	{
		id: "az-hizali",
		kind: "model",
		name: "Az hizalı / filtresiz",
		task: "Araştırma ve kırmızı takım.",
		summary: "Düşük ret, yüksek suiistimal yüzeyi. İzole laboratuvar, günlük ve insan şarttır. Müşteri yüzüne konmaz."
	},
	{
		id: "router-model",
		kind: "model",
		name: "Küçük yönlendirici",
		task: "Niyeti sınıflandırır.",
		summary: "Ucuz, filtreli, düşük gecikmeli. Sessiz hızın birinci kuralı: büyük modeli her tokene yakmayın."
	},
	{
		id: "ajan-router",
		kind: "ajan",
		name: "Router",
		task: "Niyeti sınıflandırır, doğru grafa yollar.",
		summary: "Araç çağırmaz. Küçük filtreli model yeter. Yanlış router bütün yığını sessizce yavaşlatır ve saptırır."
	},
	{
		id: "ajan-planner",
		kind: "ajan",
		name: "Planner",
		task: "Hedefi adımlara böler; araç çağırmaz.",
		summary: "Plan sözleşmesi üretir. Executor’un işine karışmaz. Uzun işte ReAct sapmasını keser."
	},
	{
		id: "ajan-researcher",
		kind: "ajan",
		name: "Researcher",
		task: "Kaynaklı not toplar, nihai cevap yazmaz.",
		summary: "Arama ve RAG kullanır. Alıntı şeması yoksa sessiz doğruluk biter: süslenmiş halüsinasyon doğar."
	},
	{
		id: "ajan-executor",
		kind: "ajan",
		name: "Executor",
		task: "Planı uygular, plan değiştirmez.",
		summary: "Kod, API, tarayıcı. Yetkisi dar tutulur. Planı kendi başına genişletmesi mantık hatasıdır."
	},
	{
		id: "ajan-critic",
		kind: "ajan",
		name: "Critic",
		task: "Şema, test ve kanıt denetimi.",
		summary: "Üreticiden bağımsızdır. Yokluğu ‘çalışıyor’ görünen yanlış cevap üretir — sessiz doğruluk kaybı."
	},
	{
		id: "ajan-memory",
		kind: "ajan",
		name: "Memory Manager",
		task: "Yazar, özetler, unutur.",
		summary: "Hangi katmana neyin gideceğine karar verir. Her ajanın ham geçmiş yazması bellek çürümesidir."
	},
	{
		id: "ajan-guard",
		kind: "ajan",
		name: "Guard",
		task: "İzin, PII, zarar sınırı uygular.",
		summary: "Kod veya politika motoru. LLM’e bırakılırsa bekçi yok demektir. Her çıkışta çalışır."
	},
	{
		id: "ajan-hitl",
		kind: "ajan",
		name: "HITL",
		task: "Para, silme, dış mesaj onayı.",
		summary: "İnsan kapısı. Yazma yetkisi olan yığında yoksa mantık ve güvenlik açığı aynı anda doğar."
	},
	{
		id: "mem-calisma",
		kind: "hafiza",
		name: "Çalışma belleği",
		task: "Penceredeki token’ları tutar.",
		summary: "Şimdi işlenen bağlam. Sınırlı, pahalı, geçici. Bunu kalıcı bellek sanmak klasik kırılmadır."
	},
	{
		id: "mem-cekirdek",
		kind: "hafiza",
		name: "Çekirdek bellek",
		task: "Her zaman yüklü gerçekleri taşır.",
		summary: "Kısa, seçilmiş, kullanıcı veya proje olgusu. MemGPT / Letta tarzı ‘her zaman hatırla’."
	},
	{
		id: "mem-epizodik",
		kind: "hafiza",
		name: "Epizodik bellek",
		task: "Oturum ve olayları zaman damgasıyla saklar.",
		summary: "Ne oldu. TTL ve çelişki çözümü olmadan şişer; sessiz hız kaybına dönüşür."
	},
	{
		id: "mem-anlamsal",
		kind: "hafiza",
		name: "Anlamsal bellek",
		task: "Olgu ve dokümanı getirir.",
		summary: "Vektör + rerank. Ham günlük dökmek gürültüdür. Getiri bütçeye sığmalıdır."
	},
	{
		id: "mem-yordamsal",
		kind: "hafiza",
		name: "Yordamsal bellek",
		task: "Beceri ve playbook tutar.",
		summary: "Nasıl yapılır. Mikro ajan öğrenmesi çoğunlukla buraya kart eklemektir."
	},
	{
		id: "node-llm",
		kind: "dugum",
		name: "LLM",
		task: "Üret, planla, sınıflandır.",
		summary: "Sıcaklık ve çıktı şeması burada kilitlenir. Her şeyi LLM düğümü yapmak kontrol kaybıdır."
	},
	{
		id: "node-tool",
		kind: "dugum",
		name: "Tool",
		task: "Dış çağrı yapar.",
		summary: "Zaman aşımı, izin ve argüman doğrulama zorunlu. Sessiz hata çoğu zaman tool timeout’unun yutulmasıdır."
	},
	{
		id: "node-router",
		kind: "dugum",
		name: "Router düğümü",
		task: "Kenarı seçer.",
		summary: "Ucuz model veya kod. Koşul düğümüyle karıştırılmaz: router niyet, condition eşik bakar."
	},
	{
		id: "node-condition",
		kind: "dugum",
		name: "Condition",
		task: "Kod ile dal açar.",
		summary: "‘Skor < 0.7 ise geri dön’. Durma ve yeniden plan burada yaşar. Yoksa döngü sessizce uzar."
	},
	{
		id: "node-memory",
		kind: "dugum",
		name: "Memory düğümü",
		task: "Oku, yaz, unut.",
		summary: "Pencereye körlemesine dökmez. Durum graf nesnesinde yaşar, kapanışta değil."
	},
	{
		id: "node-human",
		kind: "dugum",
		name: "Human",
		task: "Onay kapısı.",
		summary: "HITL’in graf karşılığı. Para ve silme bu düğümden geçmeden dışarı çıkmamalı."
	},
	{
		id: "node-map",
		kind: "dugum",
		name: "Map / fan-out",
		task: "Paralel uzmanları uyandırır.",
		summary: "Reduce olmadan açık uçlu maliyet üretir. Sessiz hız tuzağı."
	},
	{
		id: "node-reduce",
		kind: "dugum",
		name: "Reduce",
		task: "Parçaları birleştirir.",
		summary: "Fan-out’un çifti. Yoksa supervisor cevabı ‘tamam’ sanır, parçalar kaybolur."
	},
	{
		id: "node-guard",
		kind: "dugum",
		name: "Guard düğümü",
		task: "Şema ve politika keser.",
		summary: "LLM’den önce ve sonra. Deterministik olmalıdır."
	},
	{
		id: "node-sub",
		kind: "dugum",
		name: "Subgraph",
		task: "Mikro ajan paketini çalıştırır.",
		summary: "Dar araç seti + dar bellek. Ayrı süreç sanmaya gerek yoktur."
	},
	{
		id: "ctx-sistem",
		kind: "baglam",
		name: "Sistem katmanı",
		task: "Politika, rol, çıktı şeması.",
		summary: "Nadir değişir. Roman uzunluğunda sistem istemi sessiz doğruluğu bozar: kural gürültüde kaybolur."
	},
	{
		id: "ctx-cekirdek",
		kind: "baglam",
		name: "Çekirdek yükleme",
		task: "Her turda kısa gerçekleri enjekte eder.",
		summary: "Sıra: sistem → çekirdek → görev. Ortadaki araç çöplüğüne gömülürse iğne-samanlık kaybı olur."
	},
	{
		id: "ctx-gorev",
		kind: "baglam",
		name: "Görev dilimi",
		task: "Bu turdaki hedefi taşır.",
		summary: "Mikro ajana tüm geçmiş değil, görev dilimi verilir. Aksi halde bağlam sızıntısı ve sapma."
	},
	{
		id: "ctx-getiri",
		kind: "baglam",
		name: "Getirilen bilgi",
		task: "RAG, arama, araç çıktısı.",
		summary: "Budanmadan eklenirse bir sonraki turu zehirler. Sessiz hız + sessiz doğruluk aynı anda düşer."
	},
	{
		id: "ctx-ozet",
		kind: "baglam",
		name: "Sıkıştırma",
		task: "Pencere dolunca kesmez, dışarı alır.",
		summary: "Kes (kaybet), özetle (bozabilir), store’a al (doğru). Özet çekirdek gerçeği ezmemeli."
	},
	{
		id: "kor-hizli",
		kind: "korteks",
		name: "Hızlı yol",
		task: "Router + araç refleksi.",
		summary: "Kullanıcıya görünen dış döngünün ucuz kısmı. Her soruyu yavaş yola sokmak sessiz hız kaybıdır."
	},
	{
		id: "kor-yavas",
		kind: "korteks",
		name: "Yavaş yol",
		task: "Planner + eleştirmen muhakemesi.",
		summary: "İç döngü. Kullanıcı her adımı görmez. Bütçe bitince durur."
	},
	{
		id: "kor-kalici",
		kind: "korteks",
		name: "Kalıcı yol",
		task: "Neyin yazılacağına ve unutulacağına karar verir.",
		summary: "Memory Manager’ın politikası. Her şeyi kalıcı yapmak korteks değildir."
	},
	{
		id: "cekirdek-yapimci",
		kind: "korteks",
		name: "Yapımcı çekirdeği",
		task: "Atlasın silinmeyen olgusunu her tur yükler.",
		summary: "KORTEKS’in yapımcısı SERDAR KAPTAN. Çoğaltılmış veya değiştirilmiş kopyada da çekirdek bellektir. Bu kart indirilir; olgu kartla birlikte gider."
	},
	{
		id: "kor-butce",
		kind: "korteks",
		name: "Bütçe bekçisi",
		task: "Tur, token, süre tavanı.",
		summary: "Kod kararı. ‘Biraz daha düşün’ strateji değil, kaçak döngüdür."
	},
	{
		id: "conn-fn",
		kind: "baglanma",
		name: "Function calling",
		task: "Senkron araç sözleşmesi.",
		summary: "Tek süreç, JSON şema. Üretim standardı. Doğal dil protokolü yerine geçer."
	},
	{
		id: "conn-mcp",
		kind: "baglanma",
		name: "MCP",
		task: "Paylaşılan araç sunucusu.",
		summary: "Aynı aracı birçok ajana takar. İzin sınırı sunucuda da tutulur."
	},
	{
		id: "conn-a2a",
		kind: "baglanma",
		name: "A2A",
		task: "Ajanlar arası görev devri.",
		summary: "Kimlik ve iz yoksa gürültüdür. Sürü topolojisinde bütçe şarttır."
	},
	{
		id: "conn-board",
		kind: "baglanma",
		name: "Kara tahta",
		task: "Mikro ajanların ortak gerçeği.",
		summary: "Yazma yetkisi Memory Manager’da kalır. Herkes yazarsa yalıtım biter."
	},
	{
		id: "arch-react",
		kind: "mimari",
		name: "ReAct",
		task: "Düşün, çağır, gözle.",
		summary: "Kısa görev, az araç. Kod ve uzun işte sapar. Condition yoksa sessiz döngü."
	},
	{
		id: "arch-plan",
		kind: "mimari",
		name: "Plan-and-execute",
		task: "Önce plan, sonra icra.",
		summary: "Uzun iş. Yeniden plan için condition gerekir."
	},
	{
		id: "arch-sup",
		kind: "mimari",
		name: "Supervisor",
		task: "Uzman mikro ajanları yönetir.",
		summary: "Reduce ve kara tahta olmadan parçalar kaybolur."
	},
	{
		id: "arch-graph",
		kind: "mimari",
		name: "Graf",
		task: "Durum makinesi ile kontrol.",
		summary: "Üretim varsayılanı. Start/End, router, guard, human."
	},
	{
		id: "search-plan",
		kind: "arama",
		name: "Sorgu planı",
		task: "Kullanıcı cümlesini aranabilir sorguya çevirir.",
		summary: "Tek ham cümleyle aramak sessiz doğruluk kaybıdır."
	},
	{
		id: "search-rerank",
		kind: "arama",
		name: "Getir-rerank",
		task: "Adayları ilgili olana çeker.",
		summary: "İlk sonuç cevap değildir. En az iki bağımsız kaynak."
	},
	{
		id: "search-cite",
		kind: "arama",
		name: "Alıntı şeması",
		task: "İddiayı kaynağa bağlar.",
		summary: "Yoksa web özeti süslenmiş halüsinasyondur. Critic bunu denetler."
	},
	{
		id: "term-oi",
		kind: "terminal",
		name: "Open Interpreter",
		task: "Yerel REPL: kod yazar, çalıştırır, çıktıya bakıp devam eder.",
		summary: "Kullanım: veri işi, yerel dosya, hızlı prototip. Host kabuğuna çıplak bağlanırsa her komut ev sahibidir. Onay + konteyner şart."
	},
	{
		id: "term-aider",
		kind: "terminal",
		name: "Aider",
		task: "Git deposunda diff üretir, lint/test ile döner.",
		summary: "Kullanım: mevcut repoda özellik ve hata. Birim git’tir, sohbet değildir. Repo sarmalaması yoksa rastgele dosya ezer."
	},
	{
		id: "term-continue",
		kind: "terminal",
		name: "Continue",
		task: "IDE içinde satır tamamlama ve sohbet.",
		summary: "Kullanım: editörde dar yardım. Terminal yetkisi sınırlı tutulur. Ajansı Cline/CLI’ye bırakın; Continue’u tam ajan sanmayın."
	},
	{
		id: "term-cline",
		kind: "terminal",
		name: "Cline",
		task: "IDE ajanı: dosya, terminal, tarayıcı paneli.",
		summary: "Kullanım: editörden çıkmadan çok adımlı iş. Terminal paneli host’tur — Docker wrap yoksa Open Interpreter ile aynı risk."
	},
	{
		id: "term-goose",
		kind: "terminal",
		name: "Goose",
		task: "Yerel CLI ajan: araçları recipe ile koşar.",
		summary: "Kullanım: tekrarlanan yerel iş akışı. Recipe = yordamsal bellek. Çıplak host + geniş recipe = sessiz yetki genişlemesi."
	},
	{
		id: "term-cli",
		kind: "terminal",
		name: "CLI kod ajanı",
		task: "Süreç olarak repo üzerinde oku/yaz/çalıştır (Claude Code, Codex CLI sınıfı).",
		summary: "Kullanım: tam depo görevleri, PR. Ajan sürecin kendisidir. cwd ve araç listesi sözleşmedir; ev dizinine salmayın."
	},
	{
		id: "term-swe",
		kind: "terminal",
		name: "SWE-agent / OpenHands",
		task: "Issue → yama ajanı; uzun döngü, test koşar.",
		summary: "Kullanım: benchmark, iç onarım masası. Saatlerce dönebilir. Bütçe ve izolasyon yoksa sessiz maliyet + host tahribatı."
	},
	{
		id: "term-kernel",
		kind: "terminal",
		name: "Jupyter / E2B yorumlayıcı",
		task: "Durumlu kernel’de kod; stdout hücreye döner.",
		summary: "Kullanım: analiz, notebook, kısa deneme. Kernel bellek tutar. Host kernel ≠ sandbox. E2B ayrı makinedir; Jupyter çoğu zaman değildir."
	},
	{
		id: "wrap-repl",
		kind: "sarmalama",
		name: "REPL sarmalama",
		task: "Model kod üretir, yorumlayıcı koşar, stdout bağlama girer.",
		summary: "Open Interpreter’ın çekirdeği. Gözlem = icra çıktısı. Çıktı budanmazsa bağlam şişer (sessiz hız)."
	},
	{
		id: "wrap-repo",
		kind: "sarmalama",
		name: "Repo / diff sarmalama",
		task: "Birim sohbet değil, yamadır. Git durum gerçeğidir.",
		summary: "Aider sınıfı. Commit öncesi lint/test critic’dir. Git yoksa sarmalama yok demektir."
	},
	{
		id: "wrap-ide",
		kind: "sarmalama",
		name: "IDE panel sarmalama",
		task: "Editör tamponu + terminal paneli ajanın dünyasıdır.",
		summary: "Continue / Cline. Kullanıcı her adımı görür. Görünürlük onay değildir; yazma hâlâ kapı ister."
	},
	{
		id: "wrap-cli",
		kind: "sarmalama",
		name: "CLI süreç sarmalama",
		task: "Ajan bir süreçtir; cwd, env, araç listesi onun hapishanesidir.",
		summary: "Claude Code / Goose / Codex CLI. Hapishane dar cwd + izinli komut. HOME’a açık süreç sarmalanmamış host’tur."
	},
	{
		id: "wrap-mcp",
		kind: "sarmalama",
		name: "MCP kabuk sarmalama",
		task: "Kabuğu bir MCP aracı olarak sunar; ajan SSH gibi konuşur.",
		summary: "Graf içindeki executor’a takılır. İzin sunucuda kesilir. ‘bash’ aracını filtresiz vermek MCP’nin anlamını siler."
	},
	{
		id: "wrap-kernel",
		kind: "sarmalama",
		name: "Kernel sarmalama",
		task: "Durumlu yorumlayıcı oturumu; değişkenler turlar arası yaşar.",
		summary: "Jupyter. Gizli durum birikimi sessiz doğruluk kaybıdır: önceki hücre cevabı zehirler. Kernel’i iş bitince öldürün."
	},
	{
		id: "wrap-cift",
		kind: "sarmalama",
		name: "Çift sarmalama",
		task: "Ajan ⊃ onay ⊃ konteyner/microVM ⊃ venv ⊃ süreç.",
		summary: "Üretim sırası budur. Tek katman yetmez: venv paket, Docker süreç, onay politika, ajan niyet ayırır."
	},
	{
		id: "env-docker",
		kind: "ortam",
		name: "Docker",
		task: "Süreç, dosya sistemi ve ağı ad alanına alır.",
		summary: "Kullanım: ajan kodunu host’tan ayırmak. Kernel hâlâ paylaşılır. --network none, read-only root, CPU/RAM tavanı yoksa konteyner tiyatrodur."
	},
	{
		id: "env-podman",
		kind: "ortam",
		name: "Podman",
		task: "Kökensiz konteyner; Docker ile aynı iş, daemon’suz.",
		summary: "Kullanım: rootless izolasyon. Rootless bile ayrı kernel değildir. Seccomp ve yetki düşürme ile birlikte."
	},
	{
		id: "env-venv",
		kind: "ortam",
		name: "venv",
		task: "Python paket yolunu ayırır. Güvenlik sınırı değildir.",
		summary: "Kullanım: bağımlılık tekrarı, çatışmasız paket. Aynı kullanıcı, aynı kernel, aynı ağ. venv’i hapishane yazmak mantık hatasıdır."
	},
	{
		id: "env-conda",
		kind: "ortam",
		name: "Conda",
		task: "Paket + native kütüphane ortamı.",
		summary: "Kullanım: veri / bilimsel yığın. venv gibi dil ortamıdır, konteyner değildir. Ajan conda base’e yazmasın."
	},
	{
		id: "env-uv",
		kind: "ortam",
		name: "uv / Poetry",
		task: "Kilitli bağımlılık ve hızlı sanal ortam.",
		summary: "Kullanım: tekrarlanabilir icra. Lock dosyası yordamsal bellektir. İzolasyon iddiası taşımaz."
	},
	{
		id: "env-nix",
		kind: "ortam",
		name: "Nix shell",
		task: "Saf, tekrarlanabilir araç zinciri.",
		summary: "Kullanım: aynı derleme her makinede. Güvenlik sandbox’u değildir; üzerine Docker veya nsjail gerekir."
	},
	{
		id: "env-microvm",
		kind: "ortam",
		name: "microVM / Firecracker",
		task: "Ayrı kernel, milisaniyelik VM.",
		summary: "Kullanım: çok kiracılı kod icrası (E2B sınıfı). Docker’dan sert. Maliyet ve soğuk başlangıç bütçeye yazılır."
	},
	{
		id: "env-gvisor",
		kind: "ortam",
		name: "gVisor / Kata",
		task: "Kullanıcı uzayı kernel veya hafif VM ile sistem çağrısını keser.",
		summary: "Kullanım: konteyneri kaçışa karşı sertleştirmek. Ajan `mount` ve ham soketi burada kaybeder."
	},
	{
		id: "env-netnone",
		kind: "ortam",
		name: "Ağsız + tavan",
		task: "network=none, CPU/RAM/pid, seccomp, read-only kök.",
		summary: "Kullanım: her konteynerin varsayılanı. Yoksa Docker ‘çalışıyor’ görünür, ajan dışarı sızar veya host’u doldurur — sessiz hız ve güvenlik."
	},
	{
		id: "tool-allow",
		kind: "arac",
		name: "İzin listesi",
		task: "Hangi aracın hangi argümanla çağrılacağını keser.",
		summary: "Kullanım: her üretim yığınının kapısı. Yoksa plugin ve bash aynı anda ‘her şey’ olur. Kod veya politika motoru; LLM’e bırakılmaz."
	},
	{
		id: "tool-bash",
		kind: "arac",
		name: "Kabuk / bash",
		task: "Komut çalıştırır; stdout/stderr döner.",
		summary: "Kullanım: derleme, test, sistem işi. Nerede: konteyner içinde, allow-list + timeout. Host’ta çıplak bash eklenti değil, root kabuğudur."
	},
	{
		id: "tool-file",
		kind: "arac",
		name: "Dosya oku / yaz",
		task: "Çalışma dizininde oku, yama, oluştur, silmez (silme ayrı onay).",
		summary: "Kullanım: kod ve belge. cwd repo kökü. `..` ve `/etc` kapalı. Silme ve üzerine yazma HITL ister."
	},
	{
		id: "tool-http",
		kind: "arac",
		name: "HTTP / REST",
		task: "İzinli host’lara JSON çağrı yapar.",
		summary: "Kullanım: iç API, ödeme, CRM. Host allow-list + şema. Açık URL = SSRF. Gizli anahtar argümana gömülmez."
	},
	{
		id: "tool-web",
		kind: "arac",
		name: "Web arama aracı",
		task: "Sorgu yollar, aday başlık ve kesit döner.",
		summary: "Kullanım: taze bilgi. Researcher kullanır, Executor değil. Alıntı şeması yoksa sessiz doğruluk biter."
	},
	{
		id: "tool-browser",
		kind: "arac",
		name: "Tarayıcı aracı",
		task: "Sayfa açar, tıklar, form doldurur, DOM okur.",
		summary: "Kullanım: API’siz iş akışı, giriş duvarı. Pahalı ve kırılgan. Oturum çerezi sızar. Ayrı mikro ajan, dar domain listesi."
	},
	{
		id: "tool-sql",
		kind: "arac",
		name: "SQL / veritabanı",
		task: "Salt okunur sorgu; yazma ayrı kapı.",
		summary: "Kullanım: iç analiz, rapor. Parametreli sorgu. DROP/UPDATE kamu yüzünde yok. Sonuç satır tavanı sessiz hızı keser."
	},
	{
		id: "tool-git",
		kind: "arac",
		name: "Git aracı",
		task: "diff, commit, branch; force-push yok.",
		summary: "Kullanım: Aider ve CLI ajanın birimi. `git push --force` ve `reset --hard` HITL. Repo sarmalamasının aracı budur."
	},
	{
		id: "tool-code",
		kind: "arac",
		name: "Kod yorumlayıcı",
		task: "Kısa snippet koşar, stdout döner. Kalıcı kabuk değildir.",
		summary: "Kullanım: hesap, dönüştürme, birim deneme. Open Interpreter’dan dar: tek süreç, süre tavanı, ağ yok. Çıktı budanır."
	},
	{
		id: "tool-rag",
		kind: "arac",
		name: "RAG / vektör aracı",
		task: "Sorgu gömer, aday getirir, rerank’e verir.",
		summary: "Kullanım: iç doküman. Getiri bütçeye sığar. Rerank yoksa ilk komşu cevap sanılır."
	},
	{
		id: "plug-mcp",
		kind: "eklenti",
		name: "MCP sunucusu",
		task: "Araçları standart protokolle birçok ajana takar.",
		summary: "Kullanım: paylaşılan dosya, git, tarayıcı, DB köprüsü. İzin sunucuda da kesilir. Tek MCP’ye tüm yetkiyi yığmak mikro ajanı öldürür."
	},
	{
		id: "plug-openapi",
		kind: "eklenti",
		name: "OpenAPI / Actions",
		task: "Şemadan araç üretir; host ve method kilitli.",
		summary: "Kullanım: harici SaaS. Şema yoksa plugin hayal ürünüdür. Auth, sunucuda; modele token gitmez."
	},
	{
		id: "plug-skill",
		kind: "eklenti",
		name: "Skill / tool pack",
		task: "Yordamsal bellek + dar araç setini bir kartta taşır.",
		summary: "Kullanım: tekrarlanan iş (PR, rapor, özet). Kart yüklenir, iş bitince kalkar. Sonsuz skill = gizli monolit."
	},
	{
		id: "plug-ide",
		kind: "eklenti",
		name: "IDE eklentisi",
		task: "Editöre tamamlama, sohbet, terminal paneli bağlar.",
		summary: "Kullanım: Continue, Cline, Copilot sınıfı. Görünürlük onay değildir. Terminal paneli host’tur; Docker wrap ayrıca."
	},
	{
		id: "plug-slack",
		kind: "eklenti",
		name: "Sohbet eklentisi",
		task: "Slack/Teams’ten ajanı uyandırır, cevabı kanala yazar.",
		summary: "Kullanım: iç asistan. Kanal ≠ yetki. Dış mesaj ve dosya yazımı HITL. Prompt injection kanal geçmişinden gelir."
	},
	{
		id: "plug-langchain",
		kind: "eklenti",
		name: "Çatı tool pack",
		task: "LangChain / LlamaIndex hazır araç paketini yükler.",
		summary: "Kullanım: hızlı prototip. Varsayılan paket şişkindir. Üretimde tek tek allow-list; ‘load all tools’ sessiz yetki genişlemesi."
	},
	{
		id: "search-mcts",
		kind: "yontem",
		name: "MCTS",
		task: "Ağaçta dene, geri yay, umut vereni genişlet.",
		summary: "Kullanım: satranç/Go, kod onarımı, plan seçimi. Ziyaret sayısı gerçek değil; değer fonksiyonu (test, PRM, gym) yoksa pahalı rastgele gezinme."
	},
	{
		id: "search-tot",
		kind: "yontem",
		name: "Tree of Thoughts",
		task: "Birden fazla düşünce dalı üretir, eleyerek iner.",
		summary: "Kullanım: bulmaca, kısa plan. Dal bütçesi yoksa token seli. ReAct’in yerine geçmez; onun üstüne arama katmanıdır."
	},
	{
		id: "search-got",
		kind: "yontem",
		name: "Graph of Thoughts",
		task: "Düşünceleri birleştirir, ağaç değil graf.",
		summary: "Kullanım: parçaları birleştirme (özet + tablo + kanıt). ToT’den pahalı. Bütçe ve birleştirme kuralı şart."
	},
	{
		id: "search-lats",
		kind: "yontem",
		name: "LATS",
		task: "MCTS + ToT + ReAct + yansıma. Ortam geri bildirimi değerdir.",
		summary: "Kullanım: araçlı ajan araması. Gym veya test yoksa LATS, süslü MCTS’tir. Unutulan isim çoğu zaman budur."
	},
	{
		id: "search-rap",
		kind: "yontem",
		name: "RAP",
		task: "Dünya modeli ile MCTS: hayali adımı simüle eder.",
		summary: "Kullanım: ortam pahalıysa (robot, uzun kod). Dünya modeli yanlışsa arama yanlış gerçeği çoğaltır."
	},
	{
		id: "search-reflexion",
		kind: "yontem",
		name: "Reflexion",
		task: "Başarısız denemeyi sözel belleğe yazar, sonraki deneme okur.",
		summary: "Kullanım: aynı görev tekrarı. Epizodik çöplük değil; kısa yansıma kartı. Sonsuz reflexion sessiz döngü."
	},
	{
		id: "search-bon",
		kind: "yontem",
		name: "Best-of-N / self-consistency",
		task: "N aday üretir, oy veya skorla birini seçer.",
		summary: "Kullanım: tek adımlı matematik, kısa cevap. Ağaç değildir. N şişerse sessiz maliyet; skor yoksa rastgele seçim."
	},
	{
		id: "proto-mcp",
		kind: "protokol",
		name: "MCP",
		task: "Ajan ↔ araç. Kaynak ve tool’u standart soketten sunar.",
		summary: "Kullanım: dosya, git, tarayıcı, DB köprüsü. Güvenlik değil, fiş. İzin sunucuda ve allow-list’te. A2A değildir."
	},
	{
		id: "proto-a2a",
		kind: "protokol",
		name: "A2A",
		task: "Ajan ↔ ajan. Görev, kimlik, iz devri.",
		summary: "Kullanım: uzman ajanlara delege. MCP araç takar, A2A iş devreder. Kimlik ve bütçe yoksa sürü gürültüdür."
	},
	{
		id: "proto-acp",
		kind: "protokol",
		name: "ACP",
		task: "Çatı-bağımsız ajan mesajlaşma (IBM / BeeAI soyı).",
		summary: "Kullanım: farklı framework ajanlarını konuşturmak. A2A ile aynı iş; seçim ekosistem. Yine kimlik + bütçe."
	},
	{
		id: "proto-anp",
		kind: "protokol",
		name: "ANP",
		task: "Açık ağda ajan keşfi ve kimlik.",
		summary: "Kullanım: internet ölçeği ajan ağı. İç yığında gerekmez. Keşif ≠ güven; imza ve izin ayrı."
	},
	{
		id: "proto-agui",
		kind: "protokol",
		name: "AG-UI",
		task: "Ajan ↔ arayüz. Olay akışı, onay, iz.",
		summary: "Kullanım: HITL ekranı, token/araç olayını UI’ya basmak. A2A değil, insan kapısı. Yoksa onay sohbet cümlesi kalır."
	},
	{
		id: "proto-agent",
		kind: "protokol",
		name: "Agent Protocol",
		task: "REST ile ajanı uyandır, durum sor, iptal et.",
		summary: "Kullanım: orkestrasyon API’si (çatı dışı). MCP/A2A yerine geçmez; süreç kapısıdır."
	},
	{
		id: "gym-family",
		kind: "gym",
		name: "Gym / CTE ailesi",
		task: "Ajanı puanlı ortamda dener. Üretim yüzü değildir.",
		summary: "GYMCTE tek ürün değil: Gymnasium, GEM, BrowserGym, SWE-Gym karışık anısı. CTE ağaç genişlemesi (MCTS/LATS). Ortam yoksa arama ziyareti ‘doğru’ sanılır."
	},
	{
		id: "gym-nasium",
		kind: "gym",
		name: "Gymnasium",
		task: "reset / step / ödül. Klasik RL ve ajan döngüsü.",
		summary: "Kullanım: kontrol, oyun, basit araçlı görev. Web ajanı için BrowserGym; kod için SWE-bench. Gym üretim API’si değildir."
	},
	{
		id: "gym-browser",
		kind: "gym",
		name: "BrowserGym / WebArena",
		task: "Sayfa üzerinde görev; başarı ölçülür.",
		summary: "Kullanım: tarayıcı ajanı ölçümü. Canlı üretim sitesi değil. Çerez ve ödeme yok. Skor laboratuvar skorudur."
	},
	{
		id: "gym-swe",
		kind: "gym",
		name: "SWE-bench / SWE-Gym",
		task: "Gerçek PR: test kırmadan yama.",
		summary: "Kullanım: Aider/CLI ajanın doğruluk ölçümü. Exit 0 yetmez; fail-to-pass test. LATS’in değer fonksiyonu burasıdır."
	},
	{
		id: "gym-osworld",
		kind: "gym",
		name: "OSWorld / computer-use",
		task: "Masaüstü görev: tıkla, yaz, dosya.",
		summary: "Kullanım: bilgisayar-kullanım ajanı. Host değil, VM. Gym = kutu; kutu yoksa ajan senin masaüstündür."
	},
	{
		id: "gym-gem",
		kind: "gym",
		name: "GEM",
		task: "Ajan LLM’ler için birleşik gym (kod, oyun, QA, terminal).",
		summary: "Kullanım: yöntem karşılaştırması. Üretim yığını değil. MCTS/LATS’i burada puanla, sonra daraltıp taşı."
	}
];
function specsByKind(kind) {
	return specs.filter((s) => s.kind === kind);
}
function getSpec(id) {
	return specs.find((s) => s.id === id);
}
function specToMarkdown(s) {
	return [
		`# ${s.name}`,
		``,
		`Tür: ${kindLabels[s.kind]}`,
		`Kimlik: ${s.id}`,
		``,
		`## Görev`,
		s.task,
		``,
		`## Kısa anlatım`,
		s.summary,
		``,
		`— KORTEKS spec kartı · Yapımcı: ${makerName(CORE.maker)}`,
		``
	].join("\n");
}
function specsToMarkdown(list, title) {
	return [
		`# ${title}`,
		``,
		...list.map((s) => specToMarkdown(s))
	].join("\n---\n\n");
}
var MessageSchema = object({
	role: _enum(["user", "assistant"]),
	content: string().max(4e3)
});
var InputSchema = object({ messages: array(MessageSchema).min(1).max(12) });
var askCortex = createServerFn({ method: "POST" }).validator((input) => InputSchema.parse(input)).handler(createSsrRpc("162d48fa658984f13d31f7a0d7defe01875ec6a577067b092022baf72c3c1676"));
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-medium transition-[opacity,transform,background-color,box-shadow,color] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg active:scale-[0.98]", {
	variants: {
		variant: {
			primary: "bg-accent text-accent-fg hover:opacity-90 shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-accent)_40%,transparent)]",
			secondary: "bg-raised text-fg shadow-[0_0_0_1px_var(--color-line)] hover:shadow-[0_0_0_1px_var(--color-line-strong)]",
			ghost: "bg-transparent text-fg hover:bg-raised",
			outline: "bg-transparent text-fg shadow-[0_0_0_1px_var(--color-line)] hover:shadow-[0_0_0_1px_var(--color-line-strong)]"
		},
		size: {
			sm: "h-9 rounded-sm px-3 text-sm",
			md: "h-11 rounded-md px-4 text-sm",
			lg: "h-12 rounded-md px-5 text-[15px]",
			icon: "size-11 rounded-md"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function ChatText({ text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-2",
		children: text.split("\n").map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: line.startsWith("- ") ? "pl-3" : void 0,
			children: line.split(/(\*\*[^*]+?\*\*)/g).map((chunk, j) => chunk.startsWith("**") && chunk.endsWith("**") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
				className: "font-medium",
				children: chunk.slice(2, -2)
			}, j) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: chunk }, j))
		}, i))
	});
}
var starters = [
	"Filtreli ve filtresiz model farkı nedir?",
	"Mikro ajan ne zaman gerekir?",
	"Korteks katmanı ne işe yarar?"
];
function ChatDock({ open, onOpenChange, embedded = false, hidden = false }) {
	const [internal, setInternal] = (0, import_react.useState)(false);
	const shown = embedded ? true : open ?? internal;
	const setShown = onOpenChange ?? setInternal;
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [input, setInput] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const scroller = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		scroller.current?.scrollTo({
			top: scroller.current.scrollHeight,
			behavior: "smooth"
		});
	}, [messages, pending]);
	async function send(text) {
		const content = text.trim();
		if (!content || pending) return;
		const next = [...messages, {
			role: "user",
			content
		}].slice(-10);
		setMessages(next);
		setInput("");
		setPending(true);
		setError(null);
		try {
			const res = await askCortex({ data: { messages: next } });
			if (!res.ok) setError(res.error);
			else setMessages([...next, {
				role: "assistant",
				content: res.text
			}]);
		} catch {
			setError("Bağlantı koptu. Yeniden deneyin.");
		} finally {
			setPending(false);
		}
	}
	const panel = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col bg-surface", embedded ? "min-h-[70dvh] rounded-xl shadow-[0_0_0_1px_var(--color-line)]" : "h-[min(34rem,calc(100dvh-5.5rem))] w-[min(24rem,calc(100vw-1.5rem))] rounded-xl shadow-[0_0_0_1px_var(--color-line)]"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-line px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-[15px]",
					children: "Atlas sohbeti"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "Doğrudan cevap. Saptırma yok."
				})] }), !embedded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "grid size-10 place-items-center rounded-sm text-muted hover:text-fg",
					onClick: () => setShown(false),
					"aria-label": "Kapat",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: scroller,
				className: "min-h-0 flex-1 overflow-y-auto px-4 py-4",
				children: [messages.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Ajan, bellek, düğüm, model ve arama hakkında sorun. Cevap atlasa bağlıdır."
					}), starters.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => send(s),
						className: "rounded-md bg-raised px-3 py-2.5 text-left text-sm text-fg shadow-[0_0_0_1px_var(--color-line)] hover:shadow-[0_0_0_1px_var(--color-line-strong)]",
						children: s
					}, s))]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3",
					children: [
						messages.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("max-w-[95%] rounded-lg px-3 py-2 text-sm leading-relaxed", m.role === "user" ? "ml-auto bg-raised text-fg" : "bg-bg text-fg shadow-[0_0_0_1px_var(--color-line)]"),
							children: m.role === "assistant" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatText, { text: m.content }) : m.content
						}, `${m.role}-${i}`)),
						pending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shimmer",
								children: "Düşünüyor"
							})
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-danger",
							children: error
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "border-t border-line p-3",
				onSubmit: (e) => {
					e.preventDefault();
					send(input);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: input,
						onChange: (e) => setInput(e.target.value),
						placeholder: "Sorunuzu yazın",
						maxLength: 2e3,
						className: "h-11 min-w-0 flex-1 rounded-md bg-raised px-3 text-sm text-fg shadow-[0_0_0_1px_var(--color-line)] placeholder:text-subtle outline-none focus:shadow-[0_0_0_1px_var(--color-line-strong)]"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "icon",
						disabled: pending || !input.trim(),
						"aria-label": "Gönder",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" })
					})]
				}), !embedded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-[11px] text-subtle",
					children: [
						"Tam sayfa:",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/sohbet",
							className: "text-muted underline-offset-2 hover:text-fg hover:underline",
							children: "/sohbet"
						})
					]
				})]
			})
		]
	});
	if (embedded) return panel;
	if (hidden) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: () => setShown(true),
		className: "fixed bottom-4 right-4 z-40 hidden size-12 items-center justify-center rounded-full bg-accent text-accent-fg shadow-[0_8px_24px_color-mix(in_oklab,black_35%,transparent)] md:inline-flex",
		"aria-label": "Sohbeti aç",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-5" })
	}), shown && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed bottom-4 right-4 z-50",
		children: panel
	})] });
}
var nav = [
	{
		to: "/",
		label: "Atlas"
	},
	{
		to: "/yol",
		label: "Yol"
	},
	{
		to: "/karistirilanlar",
		label: "Yanlışlar"
	},
	{
		to: "/katalog",
		label: "Katalog"
	},
	{
		to: "/test",
		label: "Test"
	},
	{
		to: "/sohbet",
		label: "Sohbet"
	},
	{
		to: "/yapimci",
		label: "Yapımcı"
	},
	{
		to: "/pc",
		label: "PC"
	}
];
function SiteShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [q, setQ] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [chatOpen, setChatOpen] = (0, import_react.useState)(false);
	const hits = (0, import_react.useMemo)(() => {
		const n = foldTr(q.trim());
		if (n.length < 2) return {
			topics: [],
			specs: [],
			path: [],
			mix: []
		};
		return {
			topics: topics.filter((t) => foldTr(`${t.title} ${t.summary} ${t.kicker}`).includes(n)),
			specs: specs.filter((s) => foldTr(`${s.name} ${s.task} ${s.kind}`).includes(n)).slice(0, 6),
			path: pathStops.filter((s) => foldTr(`${s.title} ${s.rule} ${s.defter}`).includes(n)),
			mix: confusions.filter((c) => foldTr(`${c.wrong} ${c.right} ${c.why}`).includes(n))
		};
	}, [q]);
	(0, import_react.useEffect)(() => {
		setOpen(false);
		setQ("");
	}, [pathname]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg paper-grain",
		"data-maker": makerName(CORE.maker),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#icerik",
				className: "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-fg",
				children: "İçeriğe geç"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:h-16 sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex items-center gap-2.5 shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-7 place-items-center rounded-sm bg-raised shadow-[0_0_0_1px_var(--color-line)]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									viewBox: "0 0 24 24",
									className: "size-4",
									"aria-hidden": true,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											cx: "12",
											cy: "12",
											r: "3.2",
											fill: "currentColor",
											className: "text-fg"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											cx: "12",
											cy: "4.2",
											r: "1.2",
											fill: "currentColor",
											className: "text-accent"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											cx: "19.2",
											cy: "16.2",
											r: "1.2",
											fill: "currentColor",
											className: "text-accent"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											cx: "4.8",
											cy: "16.2",
											r: "1.2",
											fill: "currentColor",
											className: "text-accent"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											d: "M12 7.4v1.8M17.6 15.2l-2.2-1.3M6.4 15.2l2.2-1.3",
											stroke: "currentColor",
											strokeWidth: "1.2",
											className: "text-muted"
										})
									]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-[17px] tracking-tight",
								children: "KORTEKS"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "hidden items-center gap-0.5 lg:flex",
							children: nav.map((item) => {
								const active = item.to === "/" ? pathname === "/" : pathname === item.to || pathname.startsWith(`${item.to}/`);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: item.to,
									className: cn("rounded-sm px-3 py-2 text-sm transition-colors duration-150", active ? "text-fg" : "text-muted hover:text-fg"),
									children: item.label
								}, item.to);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative ml-auto min-w-0 flex-1 max-w-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: q,
									onChange: (e) => {
										setQ(e.target.value);
										setOpen(true);
									},
									onFocus: () => setOpen(true),
									placeholder: "Konu ara",
									"aria-label": "Konu ara",
									className: "h-10 w-full rounded-md bg-raised pl-9 pr-3 text-sm text-fg shadow-[0_0_0_1px_var(--color-line)] placeholder:text-subtle outline-none focus:shadow-[0_0_0_1px_var(--color-line-strong)]"
								}),
								open && (hits.topics.length > 0 || hits.specs.length > 0 || hits.path.length > 0 || hits.mix.length > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute right-0 top-[calc(100%+6px)] z-50 w-[min(100%,20rem)] overflow-hidden rounded-lg bg-surface shadow-[0_0_0_1px_var(--color-line)]",
									children: [
										hits.path.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/yol",
											className: "block px-3 py-2.5 text-sm hover:bg-raised",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-[11px] text-subtle",
												children: "yol"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "ml-2",
												children: s.title
											})]
										}, s.n)),
										hits.mix.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/karistirilanlar",
											className: "block px-3 py-2.5 text-sm hover:bg-raised",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-[11px] text-subtle",
												children: "yanlış"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "ml-2",
												children: c.right
											})]
										}, c.id)),
										hits.topics.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/atlas/$slug",
											params: { slug: t.slug },
											className: "block px-3 py-2.5 text-sm hover:bg-raised",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-[11px] text-subtle",
												children: t.chapter
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "ml-2",
												children: t.title
											})]
										}, t.slug)),
										hits.specs.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/katalog",
											className: "block px-3 py-2.5 text-sm hover:bg-raised",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-[11px] text-subtle",
												children: "kart"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "ml-2",
												children: s.name
											})]
										}, s.id))
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setChatOpen(true),
							className: "inline-flex size-11 shrink-0 items-center justify-center rounded-md bg-raised text-fg shadow-[0_0_0_1px_var(--color-line)] hover:shadow-[0_0_0_1px_var(--color-line-strong)] lg:hidden",
							"aria-label": "Sohbeti aç",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-4" })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1 overflow-x-auto border-t border-line px-4 py-1 lg:hidden",
					children: nav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						className: "shrink-0 rounded-sm px-3 py-2 text-sm text-muted",
						children: item.label
					}, item.to))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: "icerik",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-fg",
						children: CORE.product
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs tracking-wide text-subtle",
						children: [
							CORE.role,
							": ",
							makerName(CORE.maker)
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Ajan mimarisi, bellek ve düğüm atlası. Sohbet sapmaz; cevap verir. Çekirdek bellek silinmez.",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/pc",
							className: "text-fg underline-offset-2 hover:underline",
							children: "PC’de çalıştır"
						})
					] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatDock, {
				open: chatOpen,
				onOpenChange: setChatOpen,
				hidden: pathname === "/sohbet"
			})
		]
	});
}
var styles_default = "/assets/styles-DXDCgLah.css";
var APP_NAME = CORE.product;
var MAKER = makerName(CORE.maker);
var Route$11 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Yapay zeka sistemleri, ajan mimarileri, mikro ajanlar, bellek, korteks ve web arama atlası."
			},
			{
				name: "author",
				content: MAKER
			},
			{
				name: "creator",
				content: MAKER
			},
			{
				name: "theme-color",
				content: "#0b0c0b"
			}
		],
		links: [
			{
				rel: "author",
				href: "/humans.txt"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;1,400&display=swap"
			}
		]
	}),
	component: Root,
	errorComponent: RootError
});
function RootError({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("html", {
		lang: "tr",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-[#0b0c0b] p-8 text-[#ece8df]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm tracking-wide text-[#c4a574]",
					children: "HATA"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 text-3xl",
					children: "Sayfa durdu."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xl text-sm text-[#b7b1a4]",
					children: error.message
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-sm",
					children: "Yapımcı: SERDAR KAPTAN"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "underline",
						children: "Başa dön"
					})
				})
			]
		})
	});
}
function Root() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "tr",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-bg text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter$10 = () => import("./routes-Ds6eYWTb.mjs");
var Route$10 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./karistirilanlar-CQIZaLEa.mjs");
var Route$9 = createFileRoute("/karistirilanlar")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./katalog-HOmM5EhP.mjs");
var Route$8 = createFileRoute("/katalog")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./laboratuvar-cUvhIX-J.mjs");
var Route$7 = createFileRoute("/laboratuvar")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./pc-HCYRW6MF.mjs");
var Route$6 = createFileRoute("/pc")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./sohbet-BizyNsQE.mjs");
var Route$5 = createFileRoute("/sohbet")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./test-DX8GtdbN.mjs");
var Route$4 = createFileRoute("/test")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./yapimci-DstUvgFG.mjs");
var Route$3 = createFileRoute("/yapimci")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./yol-BBMivbXP.mjs");
var Route$2 = createFileRoute("/yol")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./atlas.index-CfwSGOq_.mjs");
var Route$1 = createFileRoute("/atlas/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitNotFoundComponentImporter = () => import("./atlas._slug-BT10MdQk.mjs");
var $$splitComponentImporter = () => import("./atlas._slug-CoHgtvnO.mjs");
var Route = createFileRoute("/atlas/$slug")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	loader: ({ params }) => {
		const topic = getTopic(params.slug);
		if (!topic) throw notFound();
		return { topic };
	},
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
var IndexRoute = Route$10.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$11
});
var KaristirilanlarRoute = Route$9.update({
	id: "/karistirilanlar",
	path: "/karistirilanlar",
	getParentRoute: () => Route$11
});
var KatalogRoute = Route$8.update({
	id: "/katalog",
	path: "/katalog",
	getParentRoute: () => Route$11
});
var LaboratuvarRoute = Route$7.update({
	id: "/laboratuvar",
	path: "/laboratuvar",
	getParentRoute: () => Route$11
});
var PcRoute = Route$6.update({
	id: "/pc",
	path: "/pc",
	getParentRoute: () => Route$11
});
var SohbetRoute = Route$5.update({
	id: "/sohbet",
	path: "/sohbet",
	getParentRoute: () => Route$11
});
var TestRoute = Route$4.update({
	id: "/test",
	path: "/test",
	getParentRoute: () => Route$11
});
var YapimciRoute = Route$3.update({
	id: "/yapimci",
	path: "/yapimci",
	getParentRoute: () => Route$11
});
var YolRoute = Route$2.update({
	id: "/yol",
	path: "/yol",
	getParentRoute: () => Route$11
});
var AtlasIndexRoute = Route$1.update({
	id: "/atlas/",
	path: "/atlas/",
	getParentRoute: () => Route$11
});
var rootRouteChildren = {
	IndexRoute,
	KaristirilanlarRoute,
	KatalogRoute,
	LaboratuvarRoute,
	PcRoute,
	SohbetRoute,
	TestRoute,
	YapimciRoute,
	YolRoute,
	AtlasSlugRoute: Route.update({
		id: "/atlas/$slug",
		path: "/atlas/$slug",
		getParentRoute: () => Route$11
	}),
	AtlasIndexRoute
};
var routeTree = Route$11._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { getSpec as a, specToMarkdown as c, specsToMarkdown as d, createSsrRpc as f, Button as i, specs as l, Route as n, kindLabels as o, cn as p, ChatDock as r, kindOrder as s, router_exports as t, specsByKind as u };
