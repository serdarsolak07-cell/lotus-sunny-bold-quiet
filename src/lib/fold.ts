/** Türkçe/ASCII eşitle: "hafiza" ↔ "hafıza", "dugum" ↔ "düğüm". */
export function foldTr(s: string) {
  return s
    .toLocaleLowerCase("tr")
    .replace(/[ıi]/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c");
}
