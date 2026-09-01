export const EXAMPLE = {
  name: "Defter",
  what: "İç kaynaklı asistan. Tek sistem; her durakta bir parça eklenir. Yeni kart değil, aynı Defter.",
};

export type PathStop = {
  n: string;
  title: string;
  rule: string;
  slug: string;
  also: string[];
  defter: string;
};

export const pathStops: PathStop[] = [
  {
    n: "01",
    title: "Yüzey",
    rule: "Çalışan yığın model seçmek değildir. Önce iş, yüz, durma.",
    slug: "kurulum",
    also: ["modeller"],
    defter:
      "Defter henüz araçsız. Filtreli sohbet, tek kullanıcı, kamu yüzü. Az hizalı model kilitli.",
  },
  {
    n: "02",
    title: "Pencere ≠ bellek",
    rule: "Bağlam penceresi unutur. Çekirdek bellek her tur yüklenir.",
    slug: "hafiza",
    also: ["baglam"],
    defter:
      "Defter’in çekirdeği bir cümle: kaynak yoksa cevap yok. Ham geçmiş yığılmaz.",
  },
  {
    n: "03",
    title: "Ajan ≠ araç",
    rule: "Rol düşünür, araç dokunur. Tek sohbet hem plan hem icra olmaz.",
    slug: "ajan-mimarileri",
    also: ["mikro-ajanlar", "ajan-gorevleri"],
    defter:
      "Router niyeti ayırır. Researcher arar, cevap yazmaz. Critic alıntı ister. Tek ajan yok.",
  },
  {
    n: "04",
    title: "Sarmalama",
    rule: "Kod çalıştırmak araç değildir. Sarmalanmış süreçtir.",
    slug: "terminal-icra",
    also: ["dugumler"],
    defter:
      "Kod işi gelince Aider + repo sarması + Docker. Host kabuğu yok. venv hapishane sanılmaz.",
  },
  {
    n: "05",
    title: "İzin",
    rule: "Eklenti kutudur. Kapı allow-list, guard, yazmada HITL.",
    slug: "araclar",
    also: ["baglanma"],
    defter:
      "HTTP + RAG izinli. Bash kapalı. MCP takılı, yetki sunucuda da kesilir.",
  },
];

export type Confusion = {
  id: string;
  wrong: string;
  right: string;
  why: string;
  slug: string;
};

export const confusions: Confusion[] = [
  {
    id: "pencere",
    wrong: "Pencere bellektir",
    right: "Pencere unutur",
    why: "Bağlam doldu mu sistem körleşir. Çekirdek bellek ayrı yüklenir, ham geçmiş değil.",
    slug: "hafiza",
  },
  {
    id: "venv",
    wrong: "venv hapishanedir",
    right: "venv paket ayırır",
    why: "Aynı kullanıcı, aynı kernel, aynı ağ. Süreç ayıran Docker veya microVM’dir.",
    slug: "terminal-icra",
  },
  {
    id: "react",
    wrong: "ReAct mimaridir",
    right: "ReAct bir döngüdür",
    why: "Düşün-araç-gözle. Graf, supervisor, durma koşulu yoksa döngü kaçar.",
    slug: "ajan-mimarileri",
  },
  {
    id: "plugin",
    wrong: "Plugin yetkidir",
    right: "Plugin kutudur",
    why: "MCP veya LangChain pack takmak izin vermez. Allow-list keser, guard doğrular.",
    slug: "araclar",
  },
  {
    id: "filtre",
    wrong: "Filtre aptallıktır",
    right: "Filtre üretim politikasıdır",
    why: "Kamu yüzü hizalı model ister. Az hizalı laboratuvar ve ağsız kutu içindir.",
    slug: "modeller",
  },
  {
    id: "exit",
    wrong: "Kod çalıştıysa doğrudur",
    right: "Exit 0 sessiz yalandır",
    why: "Derleme geçmesi iddiayı kanıtlamaz. Critic, test, alıntı ayrı bakır.",
    slug: "mantik",
  },
  {
    id: "ajan-arac",
    wrong: "Ajan araçtır",
    right: "Ajan rol, araç el",
    why: "Researcher arar. Bash dokunur. İkisini tek sohbete yığmak mikro ajanı öldürür.",
    slug: "mikro-ajanlar",
  },
  {
    id: "mcp",
    wrong: "MCP güvenliktir",
    right: "MCP standarttır",
    why: "Protokol izin değildir. Yetki sunucuda da kesilir; yoksa her ajan her araca gider.",
    slug: "baglanma",
  },
  {
    id: "mcts",
    wrong: "MCTS mimaridir",
    right: "MCTS aramadır",
    why: "Ağaç katmanı. Graf, durma ve değer (gym/critic) ayrıca. Ziyaret sayısı doğru cevap değildir.",
    slug: "mcts-protokol",
  },
  {
    id: "mcp-a2a",
    wrong: "MCP = A2A",
    right: "MCP araç, A2A delege",
    why: "MCP ajanı araca takar. A2A işi ajana devreder. ACP aynı işi başka fişle. AG-UI insan kapısıdır.",
    slug: "mcts-protokol",
  },
  {
    id: "gym-prod",
    wrong: "Gym üretim ortamıdır",
    right: "Gym puan kutusudur",
    why: "Gymnasium, GEM, BrowserGym, SWE-Gym laboratuvar. GYMCTE tek ürün değil. Kazananı daraltıp taşı.",
    slug: "mcts-protokol",
  },
  {
    id: "ozet",
    wrong: "Web özeti kaynaktır",
    right: "Alıntısız özet süstür",
    why: "İlk sonuç cevap değildir. Getir-rerank ve iddia→URL bağlanmadan araştırma bitmez.",
    slug: "web-arama",
  },
  {
    id: "monolit",
    wrong: "Tek büyük ajan yeter",
    right: "Dar ajan, dar bellek",
    why: "Her şeyi bilen sohbet unutur ve yetki genişletir. Rol + bütçe + unutma politikası.",
    slug: "korteks",
  },
];

export const beats: Record<string, { stage: string; text: string; adds: string }> = {
  kurulum: {
    stage: "Defter 0",
    text: "Tek sohbet, filtreli model, araç yok. İş: ekip içi soru. Hata kabulü: uydurma yasak.",
    adds: "yüzey, durma kuralı",
  },
  "ajan-mimarileri": {
    stage: "Defter graf",
    text: "ReAct’e yığılmaz. Router → (soru | araştırma) → çıkış. Durma düğümde.",
    adds: "graf, durma",
  },
  "ajan-gorevleri": {
    stage: "Defter roller",
    text: "Router sınıflar. Researcher not üretir. Critic alıntı ister. Executor henüz yok.",
    adds: "üç rol",
  },
  modeller: {
    stage: "Defter modeller",
    text: "Kamu: filtreli sohbet. Router: küçük. Az hizalı: yok. Laboratuvar kilitli.",
    adds: "filtre yüzeyi",
  },
  dugumler: {
    stage: "Defter düğüm",
    text: "Condition tur tavanı. Guard şema. Human henüz kapalı; yazma yok.",
    adds: "condition, guard",
  },
  "mikro-ajanlar": {
    stage: "Defter mikro",
    text: "Researcher ayrı süreç, kendi kısa belleği. Tarayıcı ajanı yok — henüz gerekmez.",
    adds: "ayrı researcher",
  },
  hafiza: {
    stage: "Defter bellek",
    text: "Çekirdek: kaynak yoksa cevap yok. Oturum notu kısa. Ham döküm yasak.",
    adds: "çekirdek kart",
  },
  baglanma: {
    stage: "Defter bağ",
    text: "RAG, MCP ile takılır. Function calling router’da. A2A yok.",
    adds: "MCP + RAG",
  },
  mantik: {
    stage: "Defter mantık",
    text: "Plan değiştirmek Executor’a yasak. HITL yazma gelince açılacak.",
    adds: "plan ≠ icra",
  },
  ogrenme: {
    stage: "Defter yordam",
    text: "Nasıl alıntı yapılır, skill kartında. Ağırlık güncellemesi değil.",
    adds: "yordamsal bellek",
  },
  baglam: {
    stage: "Defter bağlam",
    text: "Getiri bütçesi: üç kesit. Döküm yok. Sıkıştırma açık.",
    adds: "getiri tavanı",
  },
  korteks: {
    stage: "Defter korteks",
    text: "Hızlı yol: çekirdek SSS. Yavaş yol: researcher + critic. Bütçe bekçisi tur keser.",
    adds: "iki yol, bütçe",
  },
  "web-arama": {
    stage: "Defter arama",
    text: "Researcher arar, rerank eder, alıntılar. Executor aramaz. Özet kaynak sayılmaz.",
    adds: "alıntı şeması",
  },
  "terminal-icra": {
    stage: "Defter kod",
    text: "Kod işi gelince Aider, repo sarması, Docker. venv paket içindir, hapishane değil.",
    adds: "Aider + Docker",
  },
  araclar: {
    stage: "Defter izin",
    text: "Allow-list: HTTP, RAG. Bash kapalı. Plugin kutu; yetki kapıdan geçer.",
    adds: "allow-list",
  },
  "mcts-protokol": {
    stage: "Defter arama",
    text: "Zor soruda ToT, kodda LATS + SWE-Gym. Araç MCP, delege yok. Gym kamu yüzünde değil.",
    adds: "ToT/LATS kapısı, MCP",
  },
};

export const quizzes: Record<string, { claim: string; why: string }> = {
  kurulum: {
    claim: "Önce on ajan yaz, gözlemi sonra ekle.",
    why: "Hata görünmez, maliyet görünür. Önce iş, durma, izleme; ajan sayısı ikinci hafta.",
  },
  "ajan-mimarileri": {
    claim: "ReAct kurduk, mimari tamam.",
    why: "ReAct döngüdür. Graf, supervisor ve durma yoksa ‘biraz daha düşün’ ile kaçar.",
  },
  "ajan-gorevleri": {
    claim: "Tek ajan hem arasın hem yazsın hem koştursun.",
    why: "Rol karışınca plan icraya yenilir. Researcher not üretir, Executor dokunur, Critic bakar.",
  },
  modeller: {
    claim: "Filtresiz model daha zeki, kamu yüze koy.",
    why: "Filtre aptallık değil üretim politikası. Az hizalı ağsız laboratuvar içindir.",
  },
  dugumler: {
    claim: "Durmayı modele bırak, o bilir.",
    why: "Durma kod kararıdır. Condition veya tur tavanı yoksa döngü bütçeyi yer.",
  },
  "mikro-ajanlar": {
    claim: "Hepsi tek bellek havuzunu paylaşsın, kopsun.",
    why: "Paylaşılan ham geçmiş yetki ve gürültü sızdırır. Dar ajan, dar bellek.",
  },
  hafiza: {
    claim: "Bağlam penceresi büyükse bellek sorun değil.",
    why: "Pencere unutur. Çekirdek her tur yüklenir; ham geçmiş bellek değildir.",
  },
  baglanma: {
    claim: "MCP taktık, güvenlik bitti.",
    why: "MCP standarttır, izin değil. Yetki sunucuda ve allow-list’te kesilir.",
  },
  mantik: {
    claim: "Test geçti, exit 0, doğrudur.",
    why: "Kod çalışması iddiayı kanıtlamaz. Critic, alıntı, durma ayrı bakır.",
  },
  ogrenme: {
    claim: "Her sohbeti kaydet, model öğrensin.",
    why: "Ham döküm öğrenme değil gürültüdür. Yordam ve çekirdek bilinçli yazılır.",
  },
  baglam: {
    claim: "Ne varsa bağlama göm, kaçmasın.",
    why: "Döküm sessiz hız kaybıdır. Getiri bütçesi ve sıkıştırma bağlamı korur.",
  },
  korteks: {
    claim: "Her şeyi kalıcı yaz, unutmasın.",
    why: "Kalıcı yol seçicidir. Her şeyi yazmak korteks değil, çöplüktür.",
  },
  "web-arama": {
    claim: "İlk arama sonucu cevap.",
    why: "Getir-rerank ve alıntı yoksa özet süslenmiş halüsinasyondur.",
  },
  "terminal-icra": {
    claim: "Open Interpreter’ı host’a bağla, hızlı olsun.",
    why: "Her komut ev sahibidir. Sarmalama: onay, konteyner, sonra venv.",
  },
  araclar: {
    claim: "Tüm araçları yükle, ajan seçer.",
    why: "load all tools sessiz yetki genişlemesi. Dar set, allow-list, yazmada HITL.",
  },
  "mcts-protokol": {
    claim: "MCTS + MCP + gym kurduk, üretim bitti.",
    why: "MCTS arama, MCP fiş, gym puan. Tavan, kimlik, allow-list ve iç yüz yoksa yığın laboratuvar kaçagıdır.",
  },
};

export function beatFor(slug: string) {
  return beats[slug];
}

export function quizFor(slug: string) {
  return quizzes[slug];
}

export function stopFor(slug: string) {
  return pathStops.find((s) => s.slug === slug) ?? pathStops.find((s) => s.also.includes(slug));
}

export function nextStop(slug: string) {
  const exact = pathStops.findIndex((s) => s.slug === slug);
  const i = exact >= 0 ? exact : pathStops.findIndex((s) => s.also.includes(slug));
  if (i < 0 || i >= pathStops.length - 1) return null;
  return pathStops[i + 1];
}
