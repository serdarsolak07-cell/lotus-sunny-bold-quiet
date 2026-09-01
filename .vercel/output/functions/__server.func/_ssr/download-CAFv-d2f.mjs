import { d as makerName, o as colophon, t as CORE } from "./core-seal-CFaAAZoA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/download-CAFv-d2f.js
function downloadText(filename, content, mime = "text/markdown;charset=utf-8") {
	const mark = colophon();
	const signed = content.includes(makerName(CORE.maker)) ? content : `${content.trimEnd()}\n\n${mark}\n`;
	const blob = new Blob([signed], { type: mime });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	a.remove();
	window.setTimeout(() => URL.revokeObjectURL(url), 1e3);
}
//#endregion
export { downloadText as t };
