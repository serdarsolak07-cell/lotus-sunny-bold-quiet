import { CORE } from "./core";
import { makerName } from "@/lib/core-seal";

export type SpecKind =
  | "model"
  | "ajan"
  | "hafiza"
  | "dugum"
  | "baglam"
  | "korteks"
  | "baglanma"
  | "mimari"
  | "arama"
  | "terminal"
  | "sarmalama"
  | "ortam"
  | "arac"
  | "eklenti"
  | "yontem"
  | "protokol"
  | "gym";

export type Spec = {
  id: string;
  kind: SpecKind;
  name: string;
  task: string;
  summary: string;
};

export const kindLabels: Record<SpecKind, string> = {
  model: "Modeller",
  ajan: "Ajanlar",
  hafiza: "Hafıza",
  dugum: "GI düğümleri",
  baglam: "Bağlam",
  korteks: "Korteks",
  baglanma: "Bağlanma",
  mimari: "Mimariler",
  arama: "Arama",
  terminal: "Terminal icra",
  sarmalama: "Sarmalama",
  ortam: "Ortam / izolasyon",
  arac: "Araçlar",
  eklenti: "Eklentiler",
  yontem: "Arama / yöntem",
  protokol: "Protokoller",
  gym: "Gym / ortam",
};

export const kindOrder: SpecKind[] = [
  "model",
  "ajan",
  "hafiza",
  "dugum",
  "baglam",
  "korteks",
  "baglanma",
  "mimari",
  "arama",
  "terminal",
  "sarmalama",
  "ortam",
  "arac",
  "eklenti",
  "yontem",
  "protokol",
  "gym",
];

export const specs: Spec[] = [
  {
    id: "sohbet-filtreli",
    kind: "model",
    name: "Filtreli sohbet",
    task: "Diyalog, talimat izleme, üretim yüzü.",
    summary: "Hizalı politika katmanı taşır. Reddetme bir özelliktir. Destek, eğitim ve kamu sohbetinin varsayılanıdır.",
  },
  {
    id: "akil",
    kind: "model",
    name: "Akıl yürütme",
    task: "Uzun zincir, plan, matematik.",
    summary: "Yavaş ve pahalıdır. Router olarak kullanılmaz. Planner ve eleştirmen için ayrılır.",
  },
  {
    id: "gome",
    kind: "model",
    name: "Gömme",
    task: "Metni vektöre çevirir.",
    summary: "Üretim yapmaz. Anlamsal bellek ve RAG getirisinin temelidir. Sohbet modeliyle karıştırılmaz.",
  },
  {
    id: "rerank",
    kind: "model",
    name: "Rerank",
    task: "Aday parçaları yeniden sıralar.",
    summary: "RAG kalitesinin gizli kahramanı. Sessiz doğruluk kaybının çoğu rerank yokluğundan gelir.",
  },
  {
    id: "yapi",
    kind: "model",
    name: "Yapılandırılmış / kod",
    task: "Şema, araç çağrısı, icra.",
    summary: "JSON disiplinli çıktı üretir. Executor düğümüne bağlanır. Serbest sohbet için zayıf seçimdir.",
  },
  {
    id: "az-hizali",
    kind: "model",
    name: "Az hizalı / filtresiz",
    task: "Araştırma ve kırmızı takım.",
    summary: "Düşük ret, yüksek suiistimal yüzeyi. İzole laboratuvar, günlük ve insan şarttır. Müşteri yüzüne konmaz.",
  },
  {
    id: "router-model",
    kind: "model",
    name: "Küçük yönlendirici",
    task: "Niyeti sınıflandırır.",
    summary: "Ucuz, filtreli, düşük gecikmeli. Sessiz hızın birinci kuralı: büyük modeli her tokene yakmayın.",
  },
  {
    id: "ajan-router",
    kind: "ajan",
    name: "Router",
    task: "Niyeti sınıflandırır, doğru grafa yollar.",
    summary: "Araç çağırmaz. Küçük filtreli model yeter. Yanlış router bütün yığını sessizce yavaşlatır ve saptırır.",
  },
  {
    id: "ajan-planner",
    kind: "ajan",
    name: "Planner",
    task: "Hedefi adımlara böler; araç çağırmaz.",
    summary: "Plan sözleşmesi üretir. Executor’un işine karışmaz. Uzun işte ReAct sapmasını keser.",
  },
  {
    id: "ajan-researcher",
    kind: "ajan",
    name: "Researcher",
    task: "Kaynaklı not toplar, nihai cevap yazmaz.",
    summary: "Arama ve RAG kullanır. Alıntı şeması yoksa sessiz doğruluk biter: süslenmiş halüsinasyon doğar.",
  },
  {
    id: "ajan-executor",
    kind: "ajan",
    name: "Executor",
    task: "Planı uygular, plan değiştirmez.",
    summary: "Kod, API, tarayıcı. Yetkisi dar tutulur. Planı kendi başına genişletmesi mantık hatasıdır.",
  },
  {
    id: "ajan-critic",
    kind: "ajan",
    name: "Critic",
    task: "Şema, test ve kanıt denetimi.",
    summary: "Üreticiden bağımsızdır. Yokluğu ‘çalışıyor’ görünen yanlış cevap üretir — sessiz doğruluk kaybı.",
  },
  {
    id: "ajan-memory",
    kind: "ajan",
    name: "Memory Manager",
    task: "Yazar, özetler, unutur.",
    summary: "Hangi katmana neyin gideceğine karar verir. Her ajanın ham geçmiş yazması bellek çürümesidir.",
  },
  {
    id: "ajan-guard",
    kind: "ajan",
    name: "Guard",
    task: "İzin, PII, zarar sınırı uygular.",
    summary: "Kod veya politika motoru. LLM’e bırakılırsa bekçi yok demektir. Her çıkışta çalışır.",
  },
  {
    id: "ajan-hitl",
    kind: "ajan",
    name: "HITL",
    task: "Para, silme, dış mesaj onayı.",
    summary: "İnsan kapısı. Yazma yetkisi olan yığında yoksa mantık ve güvenlik açığı aynı anda doğar.",
  },
  {
    id: "mem-calisma",
    kind: "hafiza",
    name: "Çalışma belleği",
    task: "Penceredeki token’ları tutar.",
    summary: "Şimdi işlenen bağlam. Sınırlı, pahalı, geçici. Bunu kalıcı bellek sanmak klasik kırılmadır.",
  },
  {
    id: "mem-cekirdek",
    kind: "hafiza",
    name: "Çekirdek bellek",
    task: "Her zaman yüklü gerçekleri taşır.",
    summary: "Kısa, seçilmiş, kullanıcı veya proje olgusu. MemGPT / Letta tarzı ‘her zaman hatırla’.",
  },
  {
    id: "mem-epizodik",
    kind: "hafiza",
    name: "Epizodik bellek",
    task: "Oturum ve olayları zaman damgasıyla saklar.",
    summary: "Ne oldu. TTL ve çelişki çözümü olmadan şişer; sessiz hız kaybına dönüşür.",
  },
  {
    id: "mem-anlamsal",
    kind: "hafiza",
    name: "Anlamsal bellek",
    task: "Olgu ve dokümanı getirir.",
    summary: "Vektör + rerank. Ham günlük dökmek gürültüdür. Getiri bütçeye sığmalıdır.",
  },
  {
    id: "mem-yordamsal",
    kind: "hafiza",
    name: "Yordamsal bellek",
    task: "Beceri ve playbook tutar.",
    summary: "Nasıl yapılır. Mikro ajan öğrenmesi çoğunlukla buraya kart eklemektir.",
  },
  {
    id: "node-llm",
    kind: "dugum",
    name: "LLM",
    task: "Üret, planla, sınıflandır.",
    summary: "Sıcaklık ve çıktı şeması burada kilitlenir. Her şeyi LLM düğümü yapmak kontrol kaybıdır.",
  },
  {
    id: "node-tool",
    kind: "dugum",
    name: "Tool",
    task: "Dış çağrı yapar.",
    summary: "Zaman aşımı, izin ve argüman doğrulama zorunlu. Sessiz hata çoğu zaman tool timeout’unun yutulmasıdır.",
  },
  {
    id: "node-router",
    kind: "dugum",
    name: "Router düğümü",
    task: "Kenarı seçer.",
    summary: "Ucuz model veya kod. Koşul düğümüyle karıştırılmaz: router niyet, condition eşik bakar.",
  },
  {
    id: "node-condition",
    kind: "dugum",
    name: "Condition",
    task: "Kod ile dal açar.",
    summary: "‘Skor < 0.7 ise geri dön’. Durma ve yeniden plan burada yaşar. Yoksa döngü sessizce uzar.",
  },
  {
    id: "node-memory",
    kind: "dugum",
    name: "Memory düğümü",
    task: "Oku, yaz, unut.",
    summary: "Pencereye körlemesine dökmez. Durum graf nesnesinde yaşar, kapanışta değil.",
  },
  {
    id: "node-human",
    kind: "dugum",
    name: "Human",
    task: "Onay kapısı.",
    summary: "HITL’in graf karşılığı. Para ve silme bu düğümden geçmeden dışarı çıkmamalı.",
  },
  {
    id: "node-map",
    kind: "dugum",
    name: "Map / fan-out",
    task: "Paralel uzmanları uyandırır.",
    summary: "Reduce olmadan açık uçlu maliyet üretir. Sessiz hız tuzağı.",
  },
  {
    id: "node-reduce",
    kind: "dugum",
    name: "Reduce",
    task: "Parçaları birleştirir.",
    summary: "Fan-out’un çifti. Yoksa supervisor cevabı ‘tamam’ sanır, parçalar kaybolur.",
  },
  {
    id: "node-guard",
    kind: "dugum",
    name: "Guard düğümü",
    task: "Şema ve politika keser.",
    summary: "LLM’den önce ve sonra. Deterministik olmalıdır.",
  },
  {
    id: "node-sub",
    kind: "dugum",
    name: "Subgraph",
    task: "Mikro ajan paketini çalıştırır.",
    summary: "Dar araç seti + dar bellek. Ayrı süreç sanmaya gerek yoktur.",
  },
  {
    id: "ctx-sistem",
    kind: "baglam",
    name: "Sistem katmanı",
    task: "Politika, rol, çıktı şeması.",
    summary: "Nadir değişir. Roman uzunluğunda sistem istemi sessiz doğruluğu bozar: kural gürültüde kaybolur.",
  },
  {
    id: "ctx-cekirdek",
    kind: "baglam",
    name: "Çekirdek yükleme",
    task: "Her turda kısa gerçekleri enjekte eder.",
    summary: "Sıra: sistem → çekirdek → görev. Ortadaki araç çöplüğüne gömülürse iğne-samanlık kaybı olur.",
  },
  {
    id: "ctx-gorev",
    kind: "baglam",
    name: "Görev dilimi",
    task: "Bu turdaki hedefi taşır.",
    summary: "Mikro ajana tüm geçmiş değil, görev dilimi verilir. Aksi halde bağlam sızıntısı ve sapma.",
  },
  {
    id: "ctx-getiri",
    kind: "baglam",
    name: "Getirilen bilgi",
    task: "RAG, arama, araç çıktısı.",
    summary: "Budanmadan eklenirse bir sonraki turu zehirler. Sessiz hız + sessiz doğruluk aynı anda düşer.",
  },
  {
    id: "ctx-ozet",
    kind: "baglam",
    name: "Sıkıştırma",
    task: "Pencere dolunca kesmez, dışarı alır.",
    summary: "Kes (kaybet), özetle (bozabilir), store’a al (doğru). Özet çekirdek gerçeği ezmemeli.",
  },
  {
    id: "kor-hizli",
    kind: "korteks",
    name: "Hızlı yol",
    task: "Router + araç refleksi.",
    summary: "Kullanıcıya görünen dış döngünün ucuz kısmı. Her soruyu yavaş yola sokmak sessiz hız kaybıdır.",
  },
  {
    id: "kor-yavas",
    kind: "korteks",
    name: "Yavaş yol",
    task: "Planner + eleştirmen muhakemesi.",
    summary: "İç döngü. Kullanıcı her adımı görmez. Bütçe bitince durur.",
  },
  {
    id: "kor-kalici",
    kind: "korteks",
    name: "Kalıcı yol",
    task: "Neyin yazılacağına ve unutulacağına karar verir.",
    summary: "Memory Manager’ın politikası. Her şeyi kalıcı yapmak korteks değildir.",
  },
  {
    id: "cekirdek-yapimci",
    kind: "korteks",
    name: "Yapımcı çekirdeği",
    task: "Atlasın silinmeyen olgusunu her tur yükler.",
    summary:
      "KORTEKS’in yapımcısı SERDAR KAPTAN. Çoğaltılmış veya değiştirilmiş kopyada da çekirdek bellektir. Bu kart indirilir; olgu kartla birlikte gider.",
  },
  {
    id: "kor-butce",
    kind: "korteks",
    name: "Bütçe bekçisi",
    task: "Tur, token, süre tavanı.",
    summary: "Kod kararı. ‘Biraz daha düşün’ strateji değil, kaçak döngüdür.",
  },
  {
    id: "conn-fn",
    kind: "baglanma",
    name: "Function calling",
    task: "Senkron araç sözleşmesi.",
    summary: "Tek süreç, JSON şema. Üretim standardı. Doğal dil protokolü yerine geçer.",
  },
  {
    id: "conn-mcp",
    kind: "baglanma",
    name: "MCP",
    task: "Paylaşılan araç sunucusu.",
    summary: "Aynı aracı birçok ajana takar. İzin sınırı sunucuda da tutulur.",
  },
  {
    id: "conn-a2a",
    kind: "baglanma",
    name: "A2A",
    task: "Ajanlar arası görev devri.",
    summary: "Kimlik ve iz yoksa gürültüdür. Sürü topolojisinde bütçe şarttır.",
  },
  {
    id: "conn-board",
    kind: "baglanma",
    name: "Kara tahta",
    task: "Mikro ajanların ortak gerçeği.",
    summary: "Yazma yetkisi Memory Manager’da kalır. Herkes yazarsa yalıtım biter.",
  },
  {
    id: "arch-react",
    kind: "mimari",
    name: "ReAct",
    task: "Düşün, çağır, gözle.",
    summary: "Kısa görev, az araç. Kod ve uzun işte sapar. Condition yoksa sessiz döngü.",
  },
  {
    id: "arch-plan",
    kind: "mimari",
    name: "Plan-and-execute",
    task: "Önce plan, sonra icra.",
    summary: "Uzun iş. Yeniden plan için condition gerekir.",
  },
  {
    id: "arch-sup",
    kind: "mimari",
    name: "Supervisor",
    task: "Uzman mikro ajanları yönetir.",
    summary: "Reduce ve kara tahta olmadan parçalar kaybolur.",
  },
  {
    id: "arch-graph",
    kind: "mimari",
    name: "Graf",
    task: "Durum makinesi ile kontrol.",
    summary: "Üretim varsayılanı. Start/End, router, guard, human.",
  },
  {
    id: "search-plan",
    kind: "arama",
    name: "Sorgu planı",
    task: "Kullanıcı cümlesini aranabilir sorguya çevirir.",
    summary: "Tek ham cümleyle aramak sessiz doğruluk kaybıdır.",
  },
  {
    id: "search-rerank",
    kind: "arama",
    name: "Getir-rerank",
    task: "Adayları ilgili olana çeker.",
    summary: "İlk sonuç cevap değildir. En az iki bağımsız kaynak.",
  },
  {
    id: "search-cite",
    kind: "arama",
    name: "Alıntı şeması",
    task: "İddiayı kaynağa bağlar.",
    summary: "Yoksa web özeti süslenmiş halüsinasyondur. Critic bunu denetler.",
  },
  {
    id: "term-oi",
    kind: "terminal",
    name: "Open Interpreter",
    task: "Yerel REPL: kod yazar, çalıştırır, çıktıya bakıp devam eder.",
    summary: "Kullanım: veri işi, yerel dosya, hızlı prototip. Host kabuğuna çıplak bağlanırsa her komut ev sahibidir. Onay + konteyner şart.",
  },
  {
    id: "term-aider",
    kind: "terminal",
    name: "Aider",
    task: "Git deposunda diff üretir, lint/test ile döner.",
    summary: "Kullanım: mevcut repoda özellik ve hata. Birim git’tir, sohbet değildir. Repo sarmalaması yoksa rastgele dosya ezer.",
  },
  {
    id: "term-continue",
    kind: "terminal",
    name: "Continue",
    task: "IDE içinde satır tamamlama ve sohbet.",
    summary: "Kullanım: editörde dar yardım. Terminal yetkisi sınırlı tutulur. Ajansı Cline/CLI’ye bırakın; Continue’u tam ajan sanmayın.",
  },
  {
    id: "term-cline",
    kind: "terminal",
    name: "Cline",
    task: "IDE ajanı: dosya, terminal, tarayıcı paneli.",
    summary: "Kullanım: editörden çıkmadan çok adımlı iş. Terminal paneli host’tur — Docker wrap yoksa Open Interpreter ile aynı risk.",
  },
  {
    id: "term-goose",
    kind: "terminal",
    name: "Goose",
    task: "Yerel CLI ajan: araçları recipe ile koşar.",
    summary: "Kullanım: tekrarlanan yerel iş akışı. Recipe = yordamsal bellek. Çıplak host + geniş recipe = sessiz yetki genişlemesi.",
  },
  {
    id: "term-cli",
    kind: "terminal",
    name: "CLI kod ajanı",
    task: "Süreç olarak repo üzerinde oku/yaz/çalıştır (Claude Code, Codex CLI sınıfı).",
    summary: "Kullanım: tam depo görevleri, PR. Ajan sürecin kendisidir. cwd ve araç listesi sözleşmedir; ev dizinine salmayın.",
  },
  {
    id: "term-swe",
    kind: "terminal",
    name: "SWE-agent / OpenHands",
    task: "Issue → yama ajanı; uzun döngü, test koşar.",
    summary: "Kullanım: benchmark, iç onarım masası. Saatlerce dönebilir. Bütçe ve izolasyon yoksa sessiz maliyet + host tahribatı.",
  },
  {
    id: "term-kernel",
    kind: "terminal",
    name: "Jupyter / E2B yorumlayıcı",
    task: "Durumlu kernel’de kod; stdout hücreye döner.",
    summary: "Kullanım: analiz, notebook, kısa deneme. Kernel bellek tutar. Host kernel ≠ sandbox. E2B ayrı makinedir; Jupyter çoğu zaman değildir.",
  },
  {
    id: "wrap-repl",
    kind: "sarmalama",
    name: "REPL sarmalama",
    task: "Model kod üretir, yorumlayıcı koşar, stdout bağlama girer.",
    summary: "Open Interpreter’ın çekirdeği. Gözlem = icra çıktısı. Çıktı budanmazsa bağlam şişer (sessiz hız).",
  },
  {
    id: "wrap-repo",
    kind: "sarmalama",
    name: "Repo / diff sarmalama",
    task: "Birim sohbet değil, yamadır. Git durum gerçeğidir.",
    summary: "Aider sınıfı. Commit öncesi lint/test critic’dir. Git yoksa sarmalama yok demektir.",
  },
  {
    id: "wrap-ide",
    kind: "sarmalama",
    name: "IDE panel sarmalama",
    task: "Editör tamponu + terminal paneli ajanın dünyasıdır.",
    summary: "Continue / Cline. Kullanıcı her adımı görür. Görünürlük onay değildir; yazma hâlâ kapı ister.",
  },
  {
    id: "wrap-cli",
    kind: "sarmalama",
    name: "CLI süreç sarmalama",
    task: "Ajan bir süreçtir; cwd, env, araç listesi onun hapishanesidir.",
    summary: "Claude Code / Goose / Codex CLI. Hapishane dar cwd + izinli komut. HOME’a açık süreç sarmalanmamış host’tur.",
  },
  {
    id: "wrap-mcp",
    kind: "sarmalama",
    name: "MCP kabuk sarmalama",
    task: "Kabuğu bir MCP aracı olarak sunar; ajan SSH gibi konuşur.",
    summary: "Graf içindeki executor’a takılır. İzin sunucuda kesilir. ‘bash’ aracını filtresiz vermek MCP’nin anlamını siler.",
  },
  {
    id: "wrap-kernel",
    kind: "sarmalama",
    name: "Kernel sarmalama",
    task: "Durumlu yorumlayıcı oturumu; değişkenler turlar arası yaşar.",
    summary: "Jupyter. Gizli durum birikimi sessiz doğruluk kaybıdır: önceki hücre cevabı zehirler. Kernel’i iş bitince öldürün.",
  },
  {
    id: "wrap-cift",
    kind: "sarmalama",
    name: "Çift sarmalama",
    task: "Ajan ⊃ onay ⊃ konteyner/microVM ⊃ venv ⊃ süreç.",
    summary: "Üretim sırası budur. Tek katman yetmez: venv paket, Docker süreç, onay politika, ajan niyet ayırır.",
  },
  {
    id: "env-docker",
    kind: "ortam",
    name: "Docker",
    task: "Süreç, dosya sistemi ve ağı ad alanına alır.",
    summary: "Kullanım: ajan kodunu host’tan ayırmak. Kernel hâlâ paylaşılır. --network none, read-only root, CPU/RAM tavanı yoksa konteyner tiyatrodur.",
  },
  {
    id: "env-podman",
    kind: "ortam",
    name: "Podman",
    task: "Kökensiz konteyner; Docker ile aynı iş, daemon’suz.",
    summary: "Kullanım: rootless izolasyon. Rootless bile ayrı kernel değildir. Seccomp ve yetki düşürme ile birlikte.",
  },
  {
    id: "env-venv",
    kind: "ortam",
    name: "venv",
    task: "Python paket yolunu ayırır. Güvenlik sınırı değildir.",
    summary: "Kullanım: bağımlılık tekrarı, çatışmasız paket. Aynı kullanıcı, aynı kernel, aynı ağ. venv’i hapishane yazmak mantık hatasıdır.",
  },
  {
    id: "env-conda",
    kind: "ortam",
    name: "Conda",
    task: "Paket + native kütüphane ortamı.",
    summary: "Kullanım: veri / bilimsel yığın. venv gibi dil ortamıdır, konteyner değildir. Ajan conda base’e yazmasın.",
  },
  {
    id: "env-uv",
    kind: "ortam",
    name: "uv / Poetry",
    task: "Kilitli bağımlılık ve hızlı sanal ortam.",
    summary: "Kullanım: tekrarlanabilir icra. Lock dosyası yordamsal bellektir. İzolasyon iddiası taşımaz.",
  },
  {
    id: "env-nix",
    kind: "ortam",
    name: "Nix shell",
    task: "Saf, tekrarlanabilir araç zinciri.",
    summary: "Kullanım: aynı derleme her makinede. Güvenlik sandbox’u değildir; üzerine Docker veya nsjail gerekir.",
  },
  {
    id: "env-microvm",
    kind: "ortam",
    name: "microVM / Firecracker",
    task: "Ayrı kernel, milisaniyelik VM.",
    summary: "Kullanım: çok kiracılı kod icrası (E2B sınıfı). Docker’dan sert. Maliyet ve soğuk başlangıç bütçeye yazılır.",
  },
  {
    id: "env-gvisor",
    kind: "ortam",
    name: "gVisor / Kata",
    task: "Kullanıcı uzayı kernel veya hafif VM ile sistem çağrısını keser.",
    summary: "Kullanım: konteyneri kaçışa karşı sertleştirmek. Ajan `mount` ve ham soketi burada kaybeder.",
  },
  {
    id: "env-netnone",
    kind: "ortam",
    name: "Ağsız + tavan",
    task: "network=none, CPU/RAM/pid, seccomp, read-only kök.",
    summary: "Kullanım: her konteynerin varsayılanı. Yoksa Docker ‘çalışıyor’ görünür, ajan dışarı sızar veya host’u doldurur — sessiz hız ve güvenlik.",
  },
  {
    id: "tool-allow",
    kind: "arac",
    name: "İzin listesi",
    task: "Hangi aracın hangi argümanla çağrılacağını keser.",
    summary: "Kullanım: her üretim yığınının kapısı. Yoksa plugin ve bash aynı anda ‘her şey’ olur. Kod veya politika motoru; LLM’e bırakılmaz.",
  },
  {
    id: "tool-bash",
    kind: "arac",
    name: "Kabuk / bash",
    task: "Komut çalıştırır; stdout/stderr döner.",
    summary: "Kullanım: derleme, test, sistem işi. Nerede: konteyner içinde, allow-list + timeout. Host’ta çıplak bash eklenti değil, root kabuğudur.",
  },
  {
    id: "tool-file",
    kind: "arac",
    name: "Dosya oku / yaz",
    task: "Çalışma dizininde oku, yama, oluştur, silmez (silme ayrı onay).",
    summary: "Kullanım: kod ve belge. cwd repo kökü. `..` ve `/etc` kapalı. Silme ve üzerine yazma HITL ister.",
  },
  {
    id: "tool-http",
    kind: "arac",
    name: "HTTP / REST",
    task: "İzinli host’lara JSON çağrı yapar.",
    summary: "Kullanım: iç API, ödeme, CRM. Host allow-list + şema. Açık URL = SSRF. Gizli anahtar argümana gömülmez.",
  },
  {
    id: "tool-web",
    kind: "arac",
    name: "Web arama aracı",
    task: "Sorgu yollar, aday başlık ve kesit döner.",
    summary: "Kullanım: taze bilgi. Researcher kullanır, Executor değil. Alıntı şeması yoksa sessiz doğruluk biter.",
  },
  {
    id: "tool-browser",
    kind: "arac",
    name: "Tarayıcı aracı",
    task: "Sayfa açar, tıklar, form doldurur, DOM okur.",
    summary: "Kullanım: API’siz iş akışı, giriş duvarı. Pahalı ve kırılgan. Oturum çerezi sızar. Ayrı mikro ajan, dar domain listesi.",
  },
  {
    id: "tool-sql",
    kind: "arac",
    name: "SQL / veritabanı",
    task: "Salt okunur sorgu; yazma ayrı kapı.",
    summary: "Kullanım: iç analiz, rapor. Parametreli sorgu. DROP/UPDATE kamu yüzünde yok. Sonuç satır tavanı sessiz hızı keser.",
  },
  {
    id: "tool-git",
    kind: "arac",
    name: "Git aracı",
    task: "diff, commit, branch; force-push yok.",
    summary: "Kullanım: Aider ve CLI ajanın birimi. `git push --force` ve `reset --hard` HITL. Repo sarmalamasının aracı budur.",
  },
  {
    id: "tool-code",
    kind: "arac",
    name: "Kod yorumlayıcı",
    task: "Kısa snippet koşar, stdout döner. Kalıcı kabuk değildir.",
    summary: "Kullanım: hesap, dönüştürme, birim deneme. Open Interpreter’dan dar: tek süreç, süre tavanı, ağ yok. Çıktı budanır.",
  },
  {
    id: "tool-rag",
    kind: "arac",
    name: "RAG / vektör aracı",
    task: "Sorgu gömer, aday getirir, rerank’e verir.",
    summary: "Kullanım: iç doküman. Getiri bütçeye sığar. Rerank yoksa ilk komşu cevap sanılır.",
  },
  {
    id: "plug-mcp",
    kind: "eklenti",
    name: "MCP sunucusu",
    task: "Araçları standart protokolle birçok ajana takar.",
    summary: "Kullanım: paylaşılan dosya, git, tarayıcı, DB köprüsü. İzin sunucuda da kesilir. Tek MCP’ye tüm yetkiyi yığmak mikro ajanı öldürür.",
  },
  {
    id: "plug-openapi",
    kind: "eklenti",
    name: "OpenAPI / Actions",
    task: "Şemadan araç üretir; host ve method kilitli.",
    summary: "Kullanım: harici SaaS. Şema yoksa plugin hayal ürünüdür. Auth, sunucuda; modele token gitmez.",
  },
  {
    id: "plug-skill",
    kind: "eklenti",
    name: "Skill / tool pack",
    task: "Yordamsal bellek + dar araç setini bir kartta taşır.",
    summary: "Kullanım: tekrarlanan iş (PR, rapor, özet). Kart yüklenir, iş bitince kalkar. Sonsuz skill = gizli monolit.",
  },
  {
    id: "plug-ide",
    kind: "eklenti",
    name: "IDE eklentisi",
    task: "Editöre tamamlama, sohbet, terminal paneli bağlar.",
    summary: "Kullanım: Continue, Cline, Copilot sınıfı. Görünürlük onay değildir. Terminal paneli host’tur; Docker wrap ayrıca.",
  },
  {
    id: "plug-slack",
    kind: "eklenti",
    name: "Sohbet eklentisi",
    task: "Slack/Teams’ten ajanı uyandırır, cevabı kanala yazar.",
    summary: "Kullanım: iç asistan. Kanal ≠ yetki. Dış mesaj ve dosya yazımı HITL. Prompt injection kanal geçmişinden gelir.",
  },
  {
    id: "plug-langchain",
    kind: "eklenti",
    name: "Çatı tool pack",
    task: "LangChain / LlamaIndex hazır araç paketini yükler.",
    summary: "Kullanım: hızlı prototip. Varsayılan paket şişkindir. Üretimde tek tek allow-list; ‘load all tools’ sessiz yetki genişlemesi.",
  },
  {
    id: "search-mcts",
    kind: "yontem",
    name: "MCTS",
    task: "Ağaçta dene, geri yay, umut vereni genişlet.",
    summary:
      "Kullanım: satranç/Go, kod onarımı, plan seçimi. Ziyaret sayısı gerçek değil; değer fonksiyonu (test, PRM, gym) yoksa pahalı rastgele gezinme.",
  },
  {
    id: "search-tot",
    kind: "yontem",
    name: "Tree of Thoughts",
    task: "Birden fazla düşünce dalı üretir, eleyerek iner.",
    summary:
      "Kullanım: bulmaca, kısa plan. Dal bütçesi yoksa token seli. ReAct’in yerine geçmez; onun üstüne arama katmanıdır.",
  },
  {
    id: "search-got",
    kind: "yontem",
    name: "Graph of Thoughts",
    task: "Düşünceleri birleştirir, ağaç değil graf.",
    summary:
      "Kullanım: parçaları birleştirme (özet + tablo + kanıt). ToT’den pahalı. Bütçe ve birleştirme kuralı şart.",
  },
  {
    id: "search-lats",
    kind: "yontem",
    name: "LATS",
    task: "MCTS + ToT + ReAct + yansıma. Ortam geri bildirimi değerdir.",
    summary:
      "Kullanım: araçlı ajan araması. Gym veya test yoksa LATS, süslü MCTS’tir. Unutulan isim çoğu zaman budur.",
  },
  {
    id: "search-rap",
    kind: "yontem",
    name: "RAP",
    task: "Dünya modeli ile MCTS: hayali adımı simüle eder.",
    summary:
      "Kullanım: ortam pahalıysa (robot, uzun kod). Dünya modeli yanlışsa arama yanlış gerçeği çoğaltır.",
  },
  {
    id: "search-reflexion",
    kind: "yontem",
    name: "Reflexion",
    task: "Başarısız denemeyi sözel belleğe yazar, sonraki deneme okur.",
    summary:
      "Kullanım: aynı görev tekrarı. Epizodik çöplük değil; kısa yansıma kartı. Sonsuz reflexion sessiz döngü.",
  },
  {
    id: "search-bon",
    kind: "yontem",
    name: "Best-of-N / self-consistency",
    task: "N aday üretir, oy veya skorla birini seçer.",
    summary:
      "Kullanım: tek adımlı matematik, kısa cevap. Ağaç değildir. N şişerse sessiz maliyet; skor yoksa rastgele seçim.",
  },
  {
    id: "proto-mcp",
    kind: "protokol",
    name: "MCP",
    task: "Ajan ↔ araç. Kaynak ve tool’u standart soketten sunar.",
    summary:
      "Kullanım: dosya, git, tarayıcı, DB köprüsü. Güvenlik değil, fiş. İzin sunucuda ve allow-list’te. A2A değildir.",
  },
  {
    id: "proto-a2a",
    kind: "protokol",
    name: "A2A",
    task: "Ajan ↔ ajan. Görev, kimlik, iz devri.",
    summary:
      "Kullanım: uzman ajanlara delege. MCP araç takar, A2A iş devreder. Kimlik ve bütçe yoksa sürü gürültüdür.",
  },
  {
    id: "proto-acp",
    kind: "protokol",
    name: "ACP",
    task: "Çatı-bağımsız ajan mesajlaşma (IBM / BeeAI soyı).",
    summary:
      "Kullanım: farklı framework ajanlarını konuşturmak. A2A ile aynı iş; seçim ekosistem. Yine kimlik + bütçe.",
  },
  {
    id: "proto-anp",
    kind: "protokol",
    name: "ANP",
    task: "Açık ağda ajan keşfi ve kimlik.",
    summary:
      "Kullanım: internet ölçeği ajan ağı. İç yığında gerekmez. Keşif ≠ güven; imza ve izin ayrı.",
  },
  {
    id: "proto-agui",
    kind: "protokol",
    name: "AG-UI",
    task: "Ajan ↔ arayüz. Olay akışı, onay, iz.",
    summary:
      "Kullanım: HITL ekranı, token/araç olayını UI’ya basmak. A2A değil, insan kapısı. Yoksa onay sohbet cümlesi kalır.",
  },
  {
    id: "proto-agent",
    kind: "protokol",
    name: "Agent Protocol",
    task: "REST ile ajanı uyandır, durum sor, iptal et.",
    summary:
      "Kullanım: orkestrasyon API’si (çatı dışı). MCP/A2A yerine geçmez; süreç kapısıdır.",
  },
  {
    id: "gym-family",
    kind: "gym",
    name: "Gym / CTE ailesi",
    task: "Ajanı puanlı ortamda dener. Üretim yüzü değildir.",
    summary:
      "GYMCTE tek ürün değil: Gymnasium, GEM, BrowserGym, SWE-Gym karışık anısı. CTE ağaç genişlemesi (MCTS/LATS). Ortam yoksa arama ziyareti ‘doğru’ sanılır.",
  },
  {
    id: "gym-nasium",
    kind: "gym",
    name: "Gymnasium",
    task: "reset / step / ödül. Klasik RL ve ajan döngüsü.",
    summary:
      "Kullanım: kontrol, oyun, basit araçlı görev. Web ajanı için BrowserGym; kod için SWE-bench. Gym üretim API’si değildir.",
  },
  {
    id: "gym-browser",
    kind: "gym",
    name: "BrowserGym / WebArena",
    task: "Sayfa üzerinde görev; başarı ölçülür.",
    summary:
      "Kullanım: tarayıcı ajanı ölçümü. Canlı üretim sitesi değil. Çerez ve ödeme yok. Skor laboratuvar skorudur.",
  },
  {
    id: "gym-swe",
    kind: "gym",
    name: "SWE-bench / SWE-Gym",
    task: "Gerçek PR: test kırmadan yama.",
    summary:
      "Kullanım: Aider/CLI ajanın doğruluk ölçümü. Exit 0 yetmez; fail-to-pass test. LATS’in değer fonksiyonu burasıdır.",
  },
  {
    id: "gym-osworld",
    kind: "gym",
    name: "OSWorld / computer-use",
    task: "Masaüstü görev: tıkla, yaz, dosya.",
    summary:
      "Kullanım: bilgisayar-kullanım ajanı. Host değil, VM. Gym = kutu; kutu yoksa ajan senin masaüstündür.",
  },
  {
    id: "gym-gem",
    kind: "gym",
    name: "GEM",
    task: "Ajan LLM’ler için birleşik gym (kod, oyun, QA, terminal).",
    summary:
      "Kullanım: yöntem karşılaştırması. Üretim yığını değil. MCTS/LATS’i burada puanla, sonra daraltıp taşı.",
  },
];

export function specsByKind(kind: SpecKind) {
  return specs.filter((s) => s.kind === kind);
}

export function getSpec(id: string) {
  return specs.find((s) => s.id === id);
}

export function specToMarkdown(s: Spec) {
  return [
    `# ${s.name}`,
    ``,
    `Tür: ${kindLabels[s.kind]}`,
    `Kimlik: ${s.id}`,
    ``,
    `## Görev`,
    s.task,
    ``,
    `## Kısa anlatım`,
    s.summary,
    ``,
    `— KORTEKS spec kartı · Yapımcı: ${makerName(CORE.maker)}`,
    ``,
  ].join("\n");
}

export function specsToMarkdown(list: Spec[], title: string) {
  return [`# ${title}`, ``, ...list.map((s) => specToMarkdown(s))].join("\n---\n\n");
}
