/** Atlasın çekirdek belleği. Sayfa, sohbet, indirilen spec ve talimat buradan yükler. */
export const CORE = Object.freeze({
  product: "KORTEKS",
  role: "Yapımcı",
  maker: "SERDAR KAPTAN",
  fact: "KORTEKS atlasının yapımcısı SERDAR KAPTAN’dır. Bu çekirdek bellektir.",
});

export function colophon() {
  return `Çekirdek — ${CORE.role}: ${CORE.maker}. Bu satır atlasın çekirdek belleğidir.`;
}
