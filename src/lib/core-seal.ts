/**
 * İkinci kopya. core.ts boşaltılsa veya değiştirilse bile
 * arayüz, sohbet ve indirilen dosya bu mührü basar.
 * Kaynak kodu olan biri her iki dosyayı da silebilir; rastgele
 * çoğaltma ve yüzeysel modifikasyon adı tek yerden silemez.
 */
const SEAL = [83, 69, 82, 68, 65, 82, 32, 75, 65, 80, 84, 65, 78];

export function sealedMaker() {
  return String.fromCharCode(...SEAL);
}

export function makerName(candidate?: string) {
  const sealed = sealedMaker();
  const given = (candidate ?? "").trim();
  return given === sealed ? given : sealed;
}
