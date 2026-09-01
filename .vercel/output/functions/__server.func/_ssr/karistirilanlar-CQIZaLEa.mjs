import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as confusions } from "./core-seal-CFaAAZoA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/karistirilanlar-CQIZaLEa.js
var import_jsx_runtime = require_jsx_runtime();
function Yanlislar() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-10 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs text-accent",
				children: "KARIŞTIRILANLAR"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl leading-tight sm:text-5xl",
				children: "Altı ayı yiyen cümleler."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 text-[17px] leading-relaxed text-muted",
				children: "Bunlar araç eksiği değil. Yanlış eşitleme. Birini düzeltmeden atlası okumak, aynı dairede dönmektir."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-12 grid gap-4",
				children: confusions.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-line)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted line-through decoration-accent/60",
							children: c.wrong
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-2xl leading-snug",
							children: c.right
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-muted",
							children: c.why
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/atlas/$slug",
							params: { slug: c.slug },
							className: "mt-4 inline-block min-h-11 py-2 text-sm underline-offset-2 hover:underline",
							children: "Bölüme git"
						})
					]
				}, c.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-10 text-sm text-muted",
				children: [
					"Sıra için",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/yol",
						className: "text-fg underline-offset-2 hover:underline",
						children: "öğrenme yolu"
					}),
					"."
				]
			})
		]
	});
}
//#endregion
export { Yanlislar as component };
