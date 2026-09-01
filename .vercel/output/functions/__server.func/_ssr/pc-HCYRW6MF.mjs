import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as makerName, t as CORE } from "./core-seal-CFaAAZoA.mjs";
import { i as Button } from "./router-D6386i8S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pc-HCYRW6MF.js
var import_jsx_runtime = require_jsx_runtime();
function PcKur() {
	const name = makerName(CORE.maker);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-10 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs text-accent",
				children: "PC · OTOKURULUM"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl leading-tight sm:text-5xl",
				children: "Bu siteyi bilgisayarda çalıştır."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-5 text-[17px] leading-relaxed text-muted",
				children: [
					"Zip’i indir, aç, kurulum dosyasına bas. Node yoksa betik kurmayı dener. Tarayıcı kendiliğinden açılır. Yapımcı ",
					name,
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/korteks-pc.zip",
						download: true,
						children: "korteks-pc.zip indir"
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
				className: "mt-12 grid gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-line)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] text-subtle",
							children: "1 · WINDOWS"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm leading-relaxed",
							children: [
								"Zip’i sağ tıkla, ayıkla. Klasörde ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-fg",
									children: "KUR.bat"
								}),
								" ",
								"dosyasına çift tıkla. İlk seferde paket indirme birkaç dakika sürer."
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-line)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] text-subtle",
							children: "2 · MAC / LINUX"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm leading-relaxed",
							children: [
								"Zip’i aç. Terminalde klasöre gir.",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-fg",
									children: "chmod +x KUR.sh && ./KUR.sh"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-line)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] text-subtle",
							children: "3 · DOCKER"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm leading-relaxed",
							children: [
								"Aynı klasörde ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-fg",
									children: "docker compose up --build"
								}),
								". Docker yoksa 1 veya 2 yeter."
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "mt-10 rounded-xl bg-raised p-5 shadow-[0_0_0_1px_var(--color-line)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] tracking-[0.14em] text-accent",
					children: "NOT"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted",
					children: [
						"Node 22. Atlas çevrimdışı çalışır. Sohbet için isteğe bağlı xAI anahtarı. Çekirdek: ",
						CORE.role,
						" ",
						name,
						"."
					]
				})]
			})
		]
	});
}
//#endregion
export { PcKur as component };
