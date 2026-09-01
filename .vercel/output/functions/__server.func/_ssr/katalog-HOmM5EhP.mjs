import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as Download } from "../_libs/lucide-react.mjs";
import { c as specToMarkdown, d as specsToMarkdown, i as Button, l as specs, o as kindLabels, p as cn, s as kindOrder, u as specsByKind } from "./router-D6386i8S.mjs";
import { t as downloadText } from "./download-CAFv-d2f.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/katalog-HOmM5EhP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SpecCard({ spec }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "flex flex-col rounded-xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] text-subtle",
				children: kindLabels[spec.kind]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-1 font-display text-xl leading-snug",
				children: spec.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-[11px] font-medium tracking-wide text-muted",
				children: "Görev"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm",
				children: spec.task
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-[11px] font-medium tracking-wide text-muted",
				children: "Kısa anlatım"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 flex-1 text-sm leading-relaxed text-muted",
				children: spec.summary
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "outline",
				size: "sm",
				className: "mt-4 w-full",
				onClick: () => downloadText(`korteks-${spec.id}.md`, specToMarkdown(spec)),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), "İndir"]
			})
		]
	});
}
function Katalog() {
	const [kind, setKind] = (0, import_react.useState)("hepsi");
	const list = (0, import_react.useMemo)(() => kind === "hepsi" ? specs : specsByKind(kind), [kind]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-10 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs text-accent",
				children: "KATALOG"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 max-w-2xl font-display text-4xl leading-tight sm:text-5xl",
				children: "İsim, görev, anlatım."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-muted",
				children: "Her parça tek kart. Görevi altında, kısa anlatım altında, spec dosyası indirilir."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setKind("hepsi"),
					className: cn("h-10 rounded-sm px-3 text-sm shadow-[0_0_0_1px_var(--color-line)]", kind === "hepsi" ? "bg-accent text-accent-fg" : "bg-raised text-fg"),
					children: "Hepsi"
				}), kindOrder.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setKind(k),
					className: cn("h-10 rounded-sm px-3 text-sm shadow-[0_0_0_1px_var(--color-line)]", kind === k ? "bg-accent text-accent-fg" : "bg-raised text-fg"),
					children: kindLabels[k]
				}, k))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "secondary",
					size: "sm",
					onClick: () => downloadText(kind === "hepsi" ? "korteks-katalog.md" : `korteks-${kind}.md`, specsToMarkdown(list, kind === "hepsi" ? "KORTEKS katalog" : kindLabels[kind])),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), "Görünenleri indir"]
				})
			}),
			kind === "hepsi" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-12",
				children: kindOrder.map((k) => {
					const group = specsByKind(k);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-end justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl",
							children: kindLabels[k]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-sm text-muted hover:text-fg",
							onClick: () => downloadText(`korteks-${k}.md`, specsToMarkdown(group, kindLabels[k])),
							children: "Bölümü indir"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
						children: group.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpecCard, { spec: s }, s.id))
					})] }, k);
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: list.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpecCard, { spec: s }, s.id))
			})
		]
	});
}
//#endregion
export { Katalog as component };
