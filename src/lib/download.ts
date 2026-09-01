import { CORE, colophon } from "@/data/core";
import { makerName } from "@/lib/core-seal";

export function downloadText(filename: string, content: string, mime = "text/markdown;charset=utf-8") {
  const mark = colophon();
  const signed = content.includes(makerName(CORE.maker)) ? content : `${content.trimEnd()}\n\n${mark}\n`;
  const blob = new Blob([signed], { type: mime });
  triggerBlob(filename, blob);
}

export async function downloadZipFromUrl(url: string, filename: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("zip alınamadı");
  const blob = await res.blob();
  if (blob.size < 1000) throw new Error("zip boş");
  triggerBlob(filename, blob);
}

function triggerBlob(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}
