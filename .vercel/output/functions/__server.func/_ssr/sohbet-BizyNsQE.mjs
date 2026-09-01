import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as ChatDock } from "./router-D6386i8S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sohbet-BizyNsQE.js
var import_jsx_runtime = require_jsx_runtime();
function ChatPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-10 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs text-accent",
				children: "SOHBET"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl",
				children: "Atlasa sorun."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-xl text-muted",
				children: "Cevaplar KORTEKS bilgisine bağlıdır. Menü turu yok, sapma yok. Bilinmeyeni uydurmaz."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatDock, { embedded: true })
			})
		]
	});
}
//#endregion
export { ChatPage as component };
