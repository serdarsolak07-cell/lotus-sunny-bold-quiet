import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as makerName, t as CORE } from "./core-seal-CFaAAZoA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/yapimci-DstUvgFG.js
var import_jsx_runtime = require_jsx_runtime();
function Yapimci() {
	const name = makerName(CORE.maker);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-10 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs text-accent",
				children: "YAPIMCI · ÇEKİRDEK"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl leading-tight sm:text-5xl",
				children: name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-5 text-[17px] leading-relaxed text-muted",
				children: [
					"Bu atlas, ajan sistemlerini merak edenlerin altı ay parçalayarak değil, doğru sırayla öğrenmesi için kuruldu. Yapımcı ",
					name,
					" bu yolda tam oturmayan şeyi, burada daha kısa ve daha doğru okunasın diye derledi."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 rounded-xl bg-surface p-6 shadow-[0_0_0_1px_var(--color-line)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] tracking-[0.14em] text-accent",
						children: "ÇEKİRDEK BELLEK"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed",
						children: CORE.fact
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-muted",
						children: "Çoğaltılmış, çatallanmış veya değiştirilmiş kopyada da bu olgu çekirdekte kalır: sayfa altı, sohbet, indirilen spec ve talimat. Rastgele silme, adı tek satırdan düşürmez."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-8 text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/pc",
						className: "underline-offset-2 hover:text-fg hover:underline",
						children: "PC’de çalıştır"
					}),
					" · ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "underline-offset-2 hover:text-fg hover:underline",
						children: "Atlasa dön"
					})
				]
			})
		]
	});
}
//#endregion
export { Yapimci as component };
