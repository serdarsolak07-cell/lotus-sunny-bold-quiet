import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as pathStops, n as EXAMPLE } from "./core-seal-CFaAAZoA.mjs";
import { i as Button } from "./router-D6386i8S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/yol-BBMivbXP.js
var import_jsx_runtime = require_jsx_runtime();
function Yol() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-10 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs text-accent",
				children: "ÖĞRENME YOLU · 5 DURAK"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl leading-tight sm:text-5xl",
				children: "Rastgele dolaşma. Bu sırayı bitir."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-5 text-[17px] leading-relaxed text-muted",
				children: [
					"Atlas on altı bölümdür; meraklıya beş durak yeter. Gerisi sonra. Tek örnek:",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "font-medium text-fg",
						children: EXAMPLE.name
					}),
					" — ",
					EXAMPLE.what
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-12 grid gap-4",
				children: pathStops.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/atlas/$slug",
					params: { slug: s.slug },
					className: "block rounded-xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-line)] hover:shadow-[0_0_0_1px_var(--color-line-strong)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-[11px] text-subtle",
							children: ["DURAK ", s.n]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-2xl",
							children: s.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed",
							children: s.rule
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm leading-relaxed text-muted",
							children: [
								EXAMPLE.name,
								": ",
								s.defter
							]
						})
					]
				}) }, s.n))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "mt-12 rounded-xl bg-raised p-5 shadow-[0_0_0_1px_var(--color-line)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] tracking-[0.14em] text-accent",
						children: "SONRA"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted",
						children: "Beş durak bitmeden korteks, öğrenme kuramı ve laboratuvara girme. Karışan cümleler için yanlışlar sayfası. Yığın sınamak için test — o, okuyanı değil kurguyu döver."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/karistirilanlar",
									children: "Karıştırılanlar"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "secondary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/test",
									children: "Yığın testi"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/laboratuvar",
									children: "Laboratuvar"
								})
							})
						]
					})
				]
			})
		]
	});
}
//#endregion
export { Yol as component };
