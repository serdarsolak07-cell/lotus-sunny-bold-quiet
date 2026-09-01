import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as topics, u as groups } from "./core-seal-CFaAAZoA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/atlas.index-CfwSGOq_.js
var import_jsx_runtime = require_jsx_runtime();
function AtlasIndex() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-10 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs text-accent",
				children: "ATLAS"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl",
				children: "On altı bölüm"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 max-w-xl text-muted",
				children: [
					"Derinlik burada. Meraklıysan önce",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/yol",
						className: "text-fg underline-offset-2 hover:underline",
						children: "öğrenme yolunu"
					}),
					" ",
					"bitir. Tek örnek Defter her bölümde bir parça ekler."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-3 sm:grid-cols-2",
				children: topics.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/atlas/$slug",
					params: { slug: t.slug },
					className: "rounded-xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-line)] hover:shadow-[0_0_0_1px_var(--color-line-strong)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-[11px] text-subtle",
							children: [
								t.chapter,
								" · ",
								groups[t.group]
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-2xl",
							children: t.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: t.summary
						})
					]
				}, t.slug))
			})
		]
	});
}
//#endregion
export { AtlasIndex as component };
