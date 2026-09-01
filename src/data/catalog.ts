import { foldTr } from "@/lib/fold";

export type TopicGroup = "sistem" | "ajan" | "zeka" | "arac";

export type Topic = {
  slug: string;
  chapter: string;
  group: TopicGroup;
  title: string;
  kicker: string;
  summary: string;
  related: string[];
  uses: { where: string; how: string }[];
  pitfalls: string[];
  sections: {
    heading: string;
    body: string[];
    bullets?: string[];
    callout?: { title: string; text: string };
  }[];
};

export const groups: Record<TopicGroup, string> = {
  sistem: "Sistem",
  ajan: "Ajan",
  zeka: "Zeka",
  arac: "Araç",
};

export const topics: Topic[] = [
  {
    slug: "kurulum",
    chapter: "01",
    group: "sistem",
    title: "Yapay zeka sistemleri kurulumu",
    kicker: "Çalışan bir yığın, şık bir demo değildir.",
    summary: "Bir ajan sistemini ayağa kaldırmak model seçmek değildir. Çalışma zamanı, araç katmanı, bellek, gözlem ve güvenlik aynı anda kurulur.",
    related: ["ajan-mimarileri", "modeller", "baglanma", "hafiza"],
    uses: [
      {
        where: "Üretim uygulaması",
        how: "API modeli + denetimli araçlar + izleme. Önce tek ajan, sonra graf.",
      },
      {
        where: "Yerel laboratuvar",
        how: "Ollama veya llama.cpp, MCP araç sunucusu, küçük bir supervisor.",
      },
      {
        where: "Araştırma",
        how: "Aynı girdiyi birden fazla mimariye koşturan bir harness.",
      },
    ],
    pitfalls: [
      "Önce on ajan yazıp sonra gözlem eklemek — hata görünmez, maliyet görünür.",
      "Bağlam penceresini bellek sanmak. Pencere dolduğunda sistem unutur.",
      "Filtresiz modeli müşteri yüzüne koymak. Filtre üretim politikasıdır.",
    ],
    sections: [
      {
        heading: "Kurulumun dört katmanı",
        body: [
          "Her ciddi yığın dört katmandan oluşur. Model katmanı çıkarım yapar. Araç katmanı dış dünyaya dokunur. Bellek katmanı durum tutar. Denetim katmanı bütçe, izin ve durma koşullarını uygular. Bunlardan biri eksikse sistem ‘çalışıyor’ görünür ama tekrarlanamaz.",
          "Kuruluma model kartından değil, işten başlayın. Soru nedir, hangi araçlara ihtiyaç vardır, hata kabulü nedir, gecikme bütçesi nedir. Bu dört cevap mimariyi belirler.",
        ],
        bullets: [
          "Çıkarım: API (Grok, Claude, GPT) veya yerel (vLLM, llama.cpp, Ollama).",
          "Araçlar: HTTP, veritabanı, tarayıcı, kod çalıştırıcı, MCP sunucuları.",
          "Durum: oturum, vektör bellek, çekirdek bellek, olay günlüğü.",
          "Denetim: token tavanı, izin listesi, insan onayı, izleme.",
        ],
      },
      {
        heading: "Yerel ve bulut",
        body: [
          "Yerel kurulum gizlilik, maliyet kontrolü ve çevrimdışı deneme için uygundur. Küçük modeller planlama ve yönlendirme yapabilir; ağır akıl yürütme hâlâ büyük modellere bırakılır. Bulut kurulumu ise güncel bilgi, yüksek bağlam ve daha az ops yükü verir.",
          "Karışık yığın sıkça en doğrusudur: yönlendirici küçük ve yerelde, uzman model API’de, gömme modeli yerelde. Bu, mikro ajan mantığının altyapıya yansımasıdır.",
        ],
        callout: {
          title: "İlk çalışan sistem",
          text: "Tek bir ReAct ajanı, üç araç, oturum belleği ve bir durma kuralı. Grafı ikinci haftaya bırakın.",
        },
      },
      {
        heading: "Çalışma sırası",
        body: [
          "1) Ortam: anahtarlar sunucuda, istemcide değil. 2) Model uçları ve zaman aşımları. 3) Araç sözleşmeleri (girdi/çıktı şeması). 4) Bellek seçimi. 5) Düğüm grafı. 6) Değerlendirme seti. 7) İzleme. Ters sırayla kurulan sistemler ikinci günde dağılır.",
        ],
      },
    ],
  },
  {
    slug: "ajan-mimarileri",
    chapter: "02",
    group: "ajan",
    title: "Ajan mimarileri ve bağlanma",
    kicker: "Mimari, ajanın düşünme şekli değil; işin akış şeklidir.",
    summary: "ReAct, plan-and-execute, supervisor, sürü ve graf aynı problemi farklı kontrol yapılarıyla çözer. Bağlantı tipi, hangi mimarinin gerçekten çalışacağını belirler.",
    related: ["mikro-ajanlar", "dugumler", "baglanma", "ajan-gorevleri"],
    uses: [
      {
        where: "Kısa görev, az araç",
        how: "Tek ReAct döngüsü. Graf eklemek gecikme ve hata yüzeyi artırır.",
      },
      {
        where: "Çok adımlı iş",
        how: "Plan-and-execute veya LangGraph tipi durum makinesi.",
      },
      {
        where: "Uzmanlık ayrımı",
        how: "Supervisor + mikro ajanlar. Her ajanın tek yetki alanı olsun.",
      },
    ],
    pitfalls: [
      "Her şeyi sürü yapmak. Sürü, belirsiz arama içindir; muhasebe işi değildir.",
      "Ajanları sohbetle bağlamak. Yapılandırılmış mesaj sözleşmesi yoksa bağlam çürür.",
    ],
    sections: [
      {
        heading: "Beş temel topoloji",
        body: [
          "Tek ajan (ReAct): düşün → araç çağır → gözle → tekrarla. Basit, izlenebilir, ucuz. Araç sayısı artınca döngü sapar.",
          "Plan-and-execute: önce plan, sonra adım adım icra, gerekirse yeniden plan. Uzun işlerde ReAct’ten stabildir çünkü hedef görünür kalır.",
          "Supervisor: bir yönetici ajan işi uzmanlara böler. Yönetici yönlendirir, uzmanlar üretir, eleştirmen denetler.",
          "Sürü (swarm): eşler birbirine iş devreder. Keşif ve beyin fırtınası için güçlü, denetim için zayıf.",
          "Graf: düğümler ve kenarlar. Durum makinesi, koşul, paralel fan-out, insan onayı. Üretimde en öngörülebilir biçim.",
        ],
      },
      {
        heading: "Mimariler nasıl bağlanır",
        body: [
          "Bağlanma, ajanların birbirine ‘konuşması’ değil, sözleşmedir. Mesaj şeması, paylaşılan durum, olay kuyruğu veya araç çağrısı. Sözleşme yoksa her ajan kendi bağlamında yaşar ve sistem bütünlük kaybeder.",
        ],
        bullets: [
          "Doğrudan çağrı: A, B’yi fonksiyon gibi çağırır. En sıkı bağ.",
          "Mesaj kuyruğu: asenkron, ölçeklenir, hata ayıklaması zor.",
          "Kara tahta: ortak bellek. Mikro ajanlar buraya yazar, buradan okur.",
          "Graf kenarı: durum nesnesi kenardan kenara taşınır. Tek kaynak gerçek.",
        ],
      },
      {
        heading: "Seçim kuralı",
        body: [
          "Görevin dallanma sayısı düşükse tek ajan. Adımlar biliniyorsa graf. Uzmanlıklar ayrıysa supervisor. Çözüm uzayı bilinmiyorsa sürü — kısa süre, sıkı bütçe ile.",
        ],
        callout: {
          title: "Bağlam sızıntısı",
          text: "Her ajan her şeyi görmesin. Mikro ajan yalnızca kendi görevine yetecek bağlamı alsın. Bu, hem maliyeti hem halüsinasyonu keser.",
        },
      },
    ],
  },
  {
    slug: "ajan-gorevleri",
    chapter: "03",
    group: "ajan",
    title: "Ajan isimleri ve görevleri",
    kicker: "İsim, rol sözleşmesidir. Rol yoksa ajan yok.",
    summary: "Planner, Researcher, Coder, Critic, Router, Memory, Tool ve HITL. Her isim bir yetki sınırı ve bir çıktı sözleşmesi taşır.",
    related: ["ajan-mimarileri", "mikro-ajanlar", "modeller"],
    uses: [
      {
        where: "Yazılım ajanı",
        how: "Planner → Coder → Critic → Test. Coder yazmasın, Critic yazmasın.",
      },
      {
        where: "Araştırma masası",
        how: "Researcher kaynak toplar, Writer sentezler, Critic alıntıyı doğrular.",
      },
    ],
    pitfalls: [
      "‘Asistan’ adlı tek ajan her işi yapsın demek. İsim yok, sınır yok, hata yok gibi görünür.",
      "Aynı modele üç rol verip ‘çok ajan’ sanmak. Ayrım, bağlam ve araç yetkisindedir.",
    ],
    sections: [
      {
        heading: "Çekirdek roller",
        body: [
          "Bir ajanın adı, sistem mesajındaki süs değildir. Ad, hangi araçları göreceğini, hangi çıktı şemasını üreteceğini ve kime devredeceğini belirler.",
        ],
        bullets: [
          "Router / Dispatcher: niyeti sınıflandırır, doğru grafa yollar. Ucuz model yeter.",
          "Planner: hedefi adımlara böler. Araç çağırmaz, plan üretir.",
          "Researcher: arama ve okuma. Yazmaz, iddia etmez; kanıt toplar.",
          "Executor / Coder: planı uygular. Plan değiştirmez.",
          "Critic / Verifier: çıktıyı şemaya, teste ve kaynaklara karşı kontrol eder.",
          "Memory Manager: neyin kalıcı olacağına karar verir, özetler, unutur.",
          "Tool Agent: tek bir sisteme (SQL, tarayıcı, e-posta) sıkı bağlıdır.",
          "HITL: insan onayı. Para, silme, dış mesaj, yasal metin burada durur.",
        ],
      },
      {
        heading: "Görev sözleşmesi",
        body: [
          "Her rol için üç şey yazın: girdi, çıktı, yasak. Örnek: Researcher girdisi soru + kapsam, çıktısı kaynaklı not, yasağı nihai cevap yazmak. Sözleşme ihlali bir sonraki düğümde yakalanır.",
          "İsimlendirme tutarlı olsun. ‘Analist’ bir günde Researcher, ertesi gün Writer olmasın. Takımın kafasındaki harita ile grafın haritası aynı kalmalıdır.",
        ],
      },
    ],
  },
  {
    slug: "modeller",
    chapter: "04",
    group: "sistem",
    title: "Modeller: görev, filtreli ve filtresiz",
    kicker: "Filtre bir sansür süsü değil, ürün sınırıdır.",
    summary: "Sohbet, akıl yürütme, gömme, yeniden sıralama, görü ve ses ayrı işlerdir. Filtreli modeller ürün yüzüdür; filtresiz modeller araştırma ve kırmızı takım içindir.",
    related: ["kurulum", "ajan-gorevleri", "mantik"],
    uses: [
      {
        where: "Müşteri sohbeti",
        how: "Filtreli, kısa cevaplı, araç izni dar model. Reddetme bir özelliktir.",
      },
      {
        where: "İç araştırma / kırmızı takım",
        how: "Daha az hizalı model, izole ortam, günlük, insan denetimi.",
      },
      {
        where: "Yönlendirme",
        how: "Küçük, ucuz, filtreli sınıflandırıcı. Büyük modeli her tokene yakmayın.",
      },
    ],
    pitfalls: [
      "Filtresiz modeli ‘daha zeki’ sanmak. Filtre zekâ değildir; hizalama ve politika katmanıdır.",
      "Tek model ile hem gömme hem akıl yürütme. Ayrı iş, ayrı ağırlık.",
    ],
    sections: [
      {
        heading: "Model görevleri",
        body: [
          "Bir yığında dört ila altı model tipi yaşar. Bunları tek karta sıkıştırmak hem kaliteyi hem maliyeti bozar.",
        ],
        bullets: [
          "Sohbet / genel: diyalog, talimat izleme.",
          "Akıl yürütme: uzun zincir, matematik, plan. Yavaş ve pahalı.",
          "Gömme: vektör bellek ve arama. Üretim yapmaz.",
          "Rerank: adayları yeniden sıralar. RAG kalitesinin gizli kahramanı.",
          "Görü / ses: modalite köprüleri.",
          "Kod / yapılandırılmış çıktı: şema ve araç çağrısı disiplini.",
        ],
      },
      {
        heading: "Filtreli modeller",
        body: [
          "Filtreli (hizalı) modeller politika katmanı taşır: zararlı talimatları reddeder, kişisel veri ve suç konularında sınır çizer, marka riskini düşürür. Üretim, eğitim, kamu yüzü ve çocukların erişebileceği her yüzeyde varsayılan budur.",
          "Özellikleri: yüksek ret oranı bazı uçlarda, daha tutarlı ton, daha iyi talimat izleme, daha az ‘jailbreak’ sızıntısı. Maliyeti: bazı meşru gri alanlarda fazla çekingenlik, yaratıcı uçlarda kısıt.",
        ],
        callout: {
          title: "Nerede kullanılır",
          text: "Destek botu, eğitim asistanı, kamu sitesi, araçları gerçek dünyaya bağlı her ajan. KORTEKS sohbeti de bu sınıftadır.",
        },
      },
      {
        heading: "Filtresiz ve az hizalı modeller",
        body: [
          "‘Filtresiz’ pazarlama dilidir. Gerçekte spektrum vardır: sistem istemi zayıf, güvenlik katmanı ince, veya temel (base) modeller. Araştırma, güvenlik testi, sansürsüz edebiyat analizi ve model davranışını ölçmek için kullanılır.",
          "Özellikleri: daha az ret, daha fazla uç davranış, daha yüksek suiistimal yüzeyi, bazen daha ham bilgi. Nerede kullanılır: izole laboratuvar, kırmızı takım, akademik inceleme. Nerede kullanılmaz: internete açık sohbet, ödeme/araç yetkisi, kişisel veri.",
          "Bu atlas suç, zarar veya atlatma tarifi vermez. Filtresiz model seçmek bir araştırma kararıysa, izolasyon, günlük ve insan sorumluluğu şarttır.",
        ],
      },
      {
        heading: "Karışık yığın",
        body: [
          "Üretimde sık desen: filtreli yönlendirici + filtreli icracı + ayrı bir ‘dürüstlük’ eleştirmeni. Eleştirmen ‘bunu söylemek doğru mu?’ diye değil, ‘kanıt var mı, şema tutuyor mu?’ diye bakar. Politika ile doğruluk karıştırılmamalıdır.",
        ],
      },
    ],
  },
  {
    slug: "dugumler",
    chapter: "05",
    group: "ajan",
    title: "GI düğümleri",
    kicker: "Düğüm, bir düşünce değil; bir sözleşmeli adımdır.",
    summary: "Graph Intelligence düğümleri ajan grafının atomudur: LLM, araç, koşul, bellek, insan, alt-graf. Kenar, kontrolü taşır.",
    related: ["ajan-mimarileri", "baglanma", "mikro-ajanlar"],
    uses: [
      {
        where: "LangGraph / benzeri",
        how: "Durum nesnesi + düğüm fonksiyonları + koşullu kenarlar.",
      },
      {
        where: "n8n / Flowise",
        how: "Görsel düğüm; üretimde şemayı ve yeniden denemeyi kodda kilitleyin.",
      },
    ],
    pitfalls: [
      "Her şeyi LLM düğümü yapmak. Koşul ve doğrulama deterministik olsun.",
      "Düğüm içinde gizli durum. Durum grafın nesnesinde yaşar, kapanışta değil.",
    ],
    sections: [
      {
        heading: "GI nedir",
        body: [
          "GI (Graph Intelligence) düğümü, zekâyı bir sohbetten çıkarıp yönlendirilebilir bir grafa yerleştirmenin birimidir. Bir düğümün tek işi vardır: belirli bir girdiyi belirli bir çıktıya dönüştürmek. Zekâ LLM düğümünde olabilir; kontrol koşul düğümündedir.",
        ],
      },
      {
        heading: "Düğüm katalogu",
        body: [
          "Doğru graf, az LLM ve çok denetim düğümü taşır. Aşağıdaki tipler neredeyse her üretim grafında bulunur.",
        ],
        bullets: [
          "Start / End: giriş sözleşmesi ve durma.",
          "LLM: üret, planla, sınıflandır. Sıcaklık ve şema burada kilitlenir.",
          "Tool: dış çağrı. Zaman aşımı, izin, argüman doğrulama zorunlu.",
          "Router: ucuz sınıflandırıcı. Kenarı seçer.",
          "Condition: kod. ‘Eğer skor < 0.7 ise geri dön’.",
          "Memory: oku/yaz. Pencereye körlemesine dökmez.",
          "Human: onay kapısı.",
          "Map / Fan-out: paralel uzmanlar.",
          "Reduce / Aggregator: parçaları birleştirir.",
          "Subgraph: tekrar kullanılan mini ajan.",
          "Guard: politika, PII, şema. LLM’den önce ve sonra.",
        ],
      },
      {
        heading: "Kenar ve durum",
        body: [
          "Kenar ‘sonraki adım’dır. Koşullu kenar olmadan graf bir zincirdir; zincir dallanan işi taşıyamaz. Durum nesnesi tek gerçektir: mesajlar, araç sonuçları, bütçe, bayraklar. Düğüm durumu gizlice mutasyona uğratırsa hata ayıklama biter.",
        ],
        callout: {
          title: "Mikro ajan = alt-graf",
          text: "Bir mikro ajanı ayrı süreç sanmayın. Çoğu zaman bir subgraph + dar araç seti + dar bellek yeter.",
        },
      },
    ],
  },
  {
    slug: "mikro-ajanlar",
    chapter: "06",
    group: "ajan",
    title: "Mikro ajan sistemleri",
    kicker: "Küçük ajan, küçük yetki, küçük bağlam.",
    summary: "Mikro ajan monolitik ‘her şeyi bilen’ asistana karşı durur. Fark büyüklükte değil; yalıtım, sözleşme ve hata yarıçapındadır.",
    related: ["ajan-mimarileri", "ajan-gorevleri", "hafiza", "dugumler"],
    uses: [
      {
        where: "Üretim iş akışı",
        how: "Her araç ailesi için bir mikro ajan. Supervisor yalnızca yönlendirir.",
      },
      {
        where: "Maliyet kontrolü",
        how: "Sık işleri küçük modele, nadir zor işleri büyük modele verin.",
      },
    ],
    pitfalls: [
      "Onlarca mikro ajan, sıfır sözleşme. Bu, dağıtık karmaşadır.",
      "Mikro ajanı kişilikle doldurmak. Kişilik değil, arayüz.",
    ],
    sections: [
      {
        heading: "Monolit ile fark",
        body: [
          "Monolit ajan tüm araçları, tüm geçmişi, tüm politikayı bir bağlamda taşır. Başlangıçta hızlıdır, ölçekte savurgan ve kırılgandır. Mikro ajan tek bir yetki alanı görür: örneğin yalnızca takvim, yalnızca SQL okuma, yalnızca kaynak tarama.",
          "Farklar: bağlam yalıtımı, daha az halüsinasyon, daha ucuz çağrı, daha net hata, daha fazla orkestrasyon maliyeti. Orkestrasyon maliyeti sözleşmeyle ödenir, sohbetle değil.",
        ],
      },
      {
        heading: "Ne zaman mikro, ne zaman tek",
        body: [
          "Tek ajan: 1–4 araç, kısa oturum, tek kullanıcı niyeti. Mikro sistem: birden fazla sisteme yazma, ayrı güvenlik bölgeleri, paralel uzmanlık, tekrar kullanılabilir alt işler. Şüpheniz varsa tek ajanla ölçün, sonra kesin.",
        ],
        callout: {
          title: "Hata yarıçapı",
          text: "SQL yazan ajanın web’e, web ajanının ödeme API’sine erişmemesi bir güvenlik tasarımıdır, şıklık değil.",
        },
      },
      {
        heading: "Yaşam döngüsü",
        body: [
          "Mikro ajanlar uzun yaşamaz. Görevle doğar, sözleşmeyi doldurur, sonucu kara tahtaya yazar, ölür. Kalıcı olan bellek ve graf tanımıdır, ajan kişiliği değil. Bunu ‘cortex’ katmanı hatırlar, ajan değil.",
        ],
      },
    ],
  },
  {
    slug: "hafiza",
    chapter: "07",
    group: "zeka",
    title: "Hafıza sistemleri",
    kicker: "Pencere bellek değildir. Bellek, neyin unutulacağıdır.",
    summary: "Çalışma, çekirdek, epizodik, anlamsal ve yordamsal bellek. Ajan ve mikro ajan aynı katmanları paylaşmaz; paylaşırlarsa yalıtım biter.",
    related: ["korteks", "baglam", "mikro-ajanlar", "baglanma"],
    uses: [
      {
        where: "Destek ajanı",
        how: "Çekirdek: kullanıcı tercihleri. Epizodik: son biletler. Anlamsal: ürün dokümanı.",
      },
      {
        where: "Kod ajanı",
        how: "Yordamsal: repo kuralları. Epizodik: bu oturumun denemeleri. Anlamsal: API.",
      },
    ],
    pitfalls: [
      "Her turu vektör veritabanına yazmak. Gürültü, gürültüyü getirir.",
      "Mikro ajanlara ortak ham geçmiş vermek. Sızıntı ve sapma.",
    ],
    sections: [
      {
        heading: "Beş bellek katmanı",
        body: [
          "Çalışma belleği: bağlam penceresi. Şimdi işlenen token’lar. Sınırlı, pahalı, geçici.",
          "Çekirdek bellek (core): her zaman yüklü, kısa, kullanıcı veya proje gerçeği. MemGPT / Letta tarzı ‘her zaman hatırla’.",
          "Epizodik: ‘ne oldu’. Oturumlar, olaylar, zaman damgalı.",
          "Anlamsal: ‘ne doğrudur’. Doküman, olgu, vektör + grafik.",
          "Yordamsal: ‘nasıl yapılır’. Araç kullanımı, playbook, beceriler.",
        ],
      },
      {
        heading: "Ajan belleği nasıl bağlanır",
        body: [
          "Okuma: sorgu → rerank → bütçeye sığan parçalar → pencere. Yazma: önem süzgeci → özet veya ham → doğru katman. Unutma: TTL, çelişki çözümü, kullanıcı silme. Unutmayan sistem çürür.",
          "Mikro ajan belleği dar olmalıdır. Researcher anlamsal katmanı okur, çekirdeği yazmaz. Memory Manager yazar. Bu ayrım korteksin işidir.",
        ],
        callout: {
          title: "Bağlantı tipleri",
          text: "Pencereye gömme (kısa), araç olarak bellek (esnek), paylaşılan store (çok ajan), olay günlüğü (denetim). Karıştırın; tek tipe güvenmeyin.",
        },
      },
    ],
  },
  {
    slug: "baglanma",
    chapter: "08",
    group: "sistem",
    title: "Bağlanma tipleri",
    kicker: "Kablo seçimi, zekâ seçiminden önce gelir.",
    summary: "Fonksiyon çağrısı, MCP, A2A, kara tahta, kuyruk, webhook ve alt-graf. Her tip farklı gecikme, yetki ve hata modeli taşır.",
    related: ["dugumler", "ajan-mimarileri", "hafiza"],
    uses: [
      {
        where: "Tek süreç",
        how: "Fonksiyon çağrısı ve graf kenarı. En basit, en izlenebilir.",
      },
      {
        where: "Çok servis",
        how: "MCP araçları + olay kuyruğu. Ajanlar servis sınırında yaşar.",
      },
    ],
    pitfalls: [
      "Her şeyi doğal dil protokolü yapmak. Şema yoksa sözleşme yoktur.",
      "A2A’yı sohbet uygulaması sanmak. Kimlik, yetki ve iz yoksa yalnızca gürültü vardır.",
    ],
    sections: [
      {
        heading: "Katalog",
        body: [
          "Bağlanma, iki birimin nasıl anlaştığıdır. Aşağıdaki tipler pratikte yeter.",
        ],
        bullets: [
          "Function calling: model, JSON şema ile araç seçer. Senkron, dar, üretim standardı.",
          "MCP: araç ve kaynak sunucuları için ortak protokol. Aynı aracı birçok ajana takın.",
          "A2A: ajan-ajan. Kart, yetenek keşfi, görev devri. Organizasyon sınırında.",
          "Kara tahta: ortak bellek nesnesi. Mikro ajanlar yazıp okur.",
          "Mesaj kuyruğu: asenkron iş. Uzun tarama, toplu üretim.",
          "Webhook / HTTP: dış sisteme çıkış. İmzalı, idempotent olsun.",
          "Subgraph çağrısı: aynı çalışma zamanında iç ajan.",
          "Olay akışı: izleme ve tetik. Zekâ değil, sinir sistemi.",
        ],
      },
      {
        heading: "Nerede hangisi",
        body: [
          "Düşük gecikmeli sohbet: function calling. Çok araçlı masaüstü: MCP. Şirketler arası iş: A2A + kimlik. Uzun iş: kuyruk. Ortak gerçek: kara tahta. Karar grafı: kenar. Bu cümleleri ezberleyin; her yeni çerçeve aynı şeyleri yeniden adlandırır.",
        ],
      },
    ],
  },
  {
    slug: "mantik",
    chapter: "09",
    group: "zeka",
    title: "Mantık kavramları",
    kicker: "Zincir, ağaç, döngü, bekçi. Zekâ bunların üzerinde yürür.",
    summary: "Chain-of-thought, tree-of-thought, self-consistency, araç döngüsü ve bekçiler. Hangisinin nerede kullanılacağı model seçiminden önemlidir.",
    related: ["ogrenme", "modeller", "dugumler"],
    uses: [
      {
        where: "Matematik / plan",
        how: "Gizli akıl yürütme veya ToT; sonra şemalı cevap.",
      },
      {
        where: "Araçlı ajan",
        how: "ReAct döngüsü + bütçe + eleştirmen. Sonsuz düşünme yok.",
      },
    ],
    pitfalls: [
      "Her tokene CoT yazdırmak. Basit sınıflandırmada zarar, maliyette zarar.",
      "Bekçiyi LLM’e bırakmak. Şema ve izin kodda olsun.",
    ],
    sections: [
      {
        heading: "Düşünme biçimleri",
        body: [
          "Chain-of-thought: adımları sırayla üret. Tek yol, ucuz, sapmaya açık.",
          "Tree-of-thought: birden fazla dalı dene, budayarak ilerle. Arama problemi için.",
          "Self-consistency: aynı soruyu birkaç kez sor, oy çokluğu. Pahalı, istikrarsız görevlerde işe yarar.",
          "ReAct: düşünce ve eylemi serpiştirir. Dünya değişiyorsa zincir yetmez.",
          "Verifier loop: üretici + bağımsız eleştirmen. Kod ve olgusal iddia için varsayılan.",
        ],
      },
      {
        heading: "Kontrol mantığı",
        body: [
          "Ajan mantığı yalnızca LLM içinde yaşamaz. Durma koşulları, maksimum tur, araç izin listesi, JSON şema, skor eşiği — bunlar deterministik düğümlerdir. ‘Biraz daha düşün’ bir strateji değildir; bir bütçedir.",
        ],
        callout: {
          title: "Nerede kullanılır",
          text: "CoT: iç muhakeme. ToT: tasarım alternatifleri. ReAct: araç. Verifier: para, kod, alıntı. Guard: her çıkışta.",
        },
      },
    ],
  },
  {
    slug: "ogrenme",
    chapter: "10",
    group: "zeka",
    title: "Öğrenme",
    kicker: "Ajanın öğrenmesi çoğunlukla ağırlık güncellemesi değildir.",
    summary: "Bağlam içi öğrenme, RAG, beceri kütüphanesi, ince ayar ve geri bildirim döngüsü. Üretim ajanı önce bellek ve değerlendirme ile ‘öğrenir’.",
    related: ["hafiza", "baglam", "korteks"],
    uses: [
      {
        where: "Şirket asistanı",
        how: "Doküman RAG + onaylı playbook + insan düzeltmelerini belleğe yazma.",
      },
      {
        where: "Dar uzmanlık",
        how: "İnce ayar veya yüksek kaliteli örnekler. Önce örnek, sonra ağırlık.",
      },
    ],
    pitfalls: [
      "Her sohbeti ince ayar sanmak. Ham günlük, modelin kirliliğidir.",
      "Değerlendirme seti olmadan ‘öğrendi’ demek.",
    ],
    sections: [
      {
        heading: "Öğrenme merdiveni",
        body: [
          "1) İstem ve örnekler (in-context). 2) Getir-oku (RAG). 3) Beceriler / playbook. 4) Çekirdek bellek güncellemesi. 5) İnce ayar. 6) RLHF / RLAIF. Yukarı çıktıkça maliyet ve risk artar. Çoğu ürün 1–4’te kalmalıdır.",
          "Mikro ajan ‘öğrenmesi’ genellikle yordamsal belleğe yeni bir beceri kartı eklemektir. Bu, korteks katmanının işidir: neyin genel kural, neyin tek seferlik olay olduğunu ayırmak.",
        ],
      },
    ],
  },
  {
    slug: "baglam",
    chapter: "11",
    group: "zeka",
    title: "Bağlam",
    kicker: "Bağlam mühendisliği, istem yazarlığından büyüktür.",
    summary: "Pencere, sistem / kullanıcı / araç katmanları, sıkıştırma, iğne-samanlık ve bütçe. Ajanın gördüğü dünya, verdiğiniz penceredir.",
    related: ["hafiza", "korteks", "mantik"],
    uses: [
      {
        where: "Uzun belge",
        how: "Özet hiyerarşisi + ilgili parçaları getirme. Tüm PDF’i pencereye dökmeyin.",
      },
      {
        where: "Çok ajan",
        how: "Her ajana görev dilimi. Ortak durum kısa tutulsun.",
      },
    ],
    pitfalls: [
      "Sistem istemini roman yapmak. Çekirdek kural kısa, bilgi bellekten gelir.",
      "Araç çıktısını budamadan eklemek. Gürültü, bir sonraki turu zehirler.",
    ],
    sections: [
      {
        heading: "Katmanlar",
        body: [
          "Sistem: politika, rol, çıktı şeması. Nadir değişir.",
          "Çekirdek bellek: her zaman hazır gerçekler.",
          "Görev: bu turdaki hedef.",
          "Getirilen bilgi: RAG, arama, araç.",
          "Çalışma izi: son düşünce ve eylemler.",
          "Kullanıcı: son mesaj.",
          "Sıra önemlidir. Model sona ve başa daha çok dikkat eder. Kritik kuralı ortadaki araç çöplüğüne gömmeyin.",
        ],
      },
      {
        heading: "Sıkıştırma",
        body: [
          "Pencere dolunca üç seçenek vardır: kes (kaybet), özetle (bozabilir), dış belleğe al (doğru). Üretim sistemleri üçüncüyü varsayılan yapar. Özet, çekirdek gerçeği ezmemeli; çelişide ham kaynak kazanır.",
        ],
      },
    ],
  },
  {
    slug: "korteks",
    chapter: "12",
    group: "zeka",
    title: "Korteks",
    kicker: "Korteks, ajanın kişiliği değil; zaman ölçeklerini ayıran katmandır.",
    summary: "Biyolojik analog: hızlı refleks, yavaş muhakeme, uzun bellek. Yazılımda iç-dış döngü, çekirdek bellek ve mikro ajan orkestrasyonu.",
    related: ["hafiza", "baglam", "ogrenme", "mikro-ajanlar"],
    uses: [
      {
        where: "Uzun ömürlü asistan",
        how: "İç döngü araçları yönetir, dış döngü kullanıcıyla konuşur, korteks neyin kalıcı olduğuna karar verir.",
      },
      {
        where: "Çok ajanlı masa",
        how: "Korteks supervisor değildir; bellek politikası ve bütçedir. Supervisor iş böler.",
      },
    ],
    pitfalls: [
      "Korteksi tek dev modele eşitlemek. Büyük model korteks değil, bir dokudur.",
      "Her şeyi kalıcı yapmak. Korteks aynı zamanda unutur.",
    ],
    sections: [
      {
        heading: "Analogun sınırı",
        body: [
          "Beyin korteksi hiyerarşik, çok zaman ölçekli, öngörücü bir dokudur. Yazılım ‘korteks’i üç işi taklit eder: (1) yavaş ve hızlı yolları ayırmak, (2) neyin çalışma, neyin kalıcı bellek olduğunu seçmek, (3) alt bölgeleri (mikro ajanları) aynı hedefe bağlamak. Analog ilhamdır, kanıt değil.",
        ],
      },
      {
        heading: "İç ve dış döngü",
        body: [
          "MemGPT / Letta çizgisi: dış döngü kullanıcıya cevap verir; iç döngü bellek sayfalarını yükler, araç çağırır, kendini yeniden yazar. Kullanıcı her iç adımı görmez. Bu, refleks (araç) ile muhakeme (plan) ayrımıdır.",
          "KORTEKS’te ‘korteks katmanı’ şu kararları verir: hangi mikro ajan uyanır, hangi bellek sayfası yüklenir, hangi olay yazılır, bütçe bitince ne durur. Bu kararlar mümkünse kod, gerektiğinde küçük bir modeldir.",
        ],
        callout: {
          title: "Pratik kural",
          text: "Hızlı yol: router + araç. Yavaş yol: planner + eleştirmen. Kalıcı yol: bellek yöneticisi. Üçünü tek sohbete yığmayın.",
        },
      },
    ],
  },
  {
    slug: "web-arama",
    chapter: "13",
    group: "arac",
    title: "Web üzerinde arama sistemleri",
    kicker: "Arama bir araçtır. Cevap, kaynakla doğar.",
    summary: "Sorgu planı, çok atlamalı arama, tarayıcı, RAG, alıntı ve taze bilgi. Ajanın ‘bilmesi’ ile ‘bulması’ ayrı işlerdir.",
    related: ["modeller", "hafiza", "mantik", "mikro-ajanlar"],
    uses: [
      {
        where: "Güncel olay",
        how: "Arama zorunlu. Model kesme tarihine güvenmeyin.",
      },
      {
        where: "İç bilgi + web",
        how: "Önce iç RAG, boşsa web, sonra çelişki notu.",
      },
    ],
    pitfalls: [
      "İlk sonucu cevap sanmak. Rerank ve en az iki bağımsız kaynak.",
      "Alıntısız web özeti. Bu, süslenmiş halüsinasyondur.",
    ],
    sections: [
      {
        heading: "Arama yığını",
        body: [
          "Sorgu planı: kullanıcı cümlesini aranabilir sorgulara çevir. Çok atlama: bulunan belge yeni sorgu doğurur. Getirme: API (Brave, Tavily, Bing, Google, xAI search) veya tarayıcı. Rerank: ilgili olanı öne al. Okuma: sayfayı özetle, iddiayı alıntıla. Sentez: çelişen kaynakları gizleme.",
        ],
      },
      {
        heading: "Ne zaman tarayıcı, ne zaman API",
        body: [
          "API hızlı, ucuz, yapılandırılmış. Dinamik sayfa, giriş duvarı, tıklama gerektiren iş akışı için tarayıcı ajanı gerekir — pahalı ve kırılgan. Mikro ajan olarak ayırın: Search API ajanı ve Browser ajanı aynı yetkilere sahip olmasın.",
        ],
        callout: {
          title: "Doğruluk kuralı",
          text: "Bulunamadıysa ‘bulunamadı’ deyin. Eski model bilgisi ile taze aramayı karıştırmayın. Kullanıcıyı menüye, tahmine veya konuya saptırmayın.",
        },
      },
    ],
  },
  {
    slug: "terminal-icra",
    chapter: "14",
    group: "arac",
    title: "Terminal icra, sarmalama ve izolasyon",
    kicker: "Kod çalıştırmak araç değildir. Sarmalanmış bir süreçtir.",
    summary:
      "Open Interpreter, Aider, Cline, Goose, CLI kod ajanları. Sarmalama tipi (REPL, repo, IDE, CLI, kernel) görevi belirler. Docker süreç ayırır; venv paket ayırır. İkisini karıştırmak mantık hatasıdır.",
    related: ["baglanma", "dugumler", "modeller", "mikro-ajanlar"],
    uses: [
      {
        where: "Yerel yazılım onarımı",
        how: "Aider veya CLI ajan + git + test. cwd repo kökü. Docker iyi, venv zorunlu.",
      },
      {
        where: "Veri / REPL",
        how: "Open Interpreter veya Jupyter, ağsız konteyner, onaylı komut, stdout budama.",
      },
      {
        where: "Çok kiracılı icra",
        how: "E2B / microVM. Host Docker’ı yetmez; ayrı kernel.",
      },
    ],
    pitfalls: [
      "venv’i hapishane sanmak. Aynı kullanıcı, aynı kernel, aynı ağ.",
      "Open Interpreter’ı host’a çıplak bağlamak. Her komut ev sahibidir.",
      "Kodun çalışmasını doğruluk sanmak. Test ve critic yoksa sessiz yalan.",
    ],
    sections: [
      {
        heading: "Sistemler ve görevleri",
        body: [
          "Open Interpreter: model kod yazar, yerel yorumlayıcı koşar, stdout’a bakıp devam eder. Görev kısa veri ve dosya işidir. Aider: birim yamadır; git gerçeği taşır, lint/test critic’dir. Continue dar IDE yardımıdır, tam ajan değildir. Cline IDE’den dosya ve terminal yönetir — görünürlük onay değildir. Goose recipe’li yerel CLI’dır. Claude Code / Codex CLI sınıfı: ajan sürecin kendisidir, cwd hapishanesidir. SWE-agent ve OpenHands issue→yama için uzun döngüdür. Jupyter/E2B durumlu kernel’dir; E2B ayrı makine, Jupyter çoğu kurulumda host’tur.",
        ],
        bullets: [
          "REPL: Open Interpreter, Jupyter — gözlem = icra çıktısı.",
          "Repo: Aider — gözlem = diff + test.",
          "IDE: Continue, Cline — gözlem = tampon ve panel.",
          "CLI süreç: Goose, Claude Code, Codex CLI — gözlem = araç JSON’u.",
          "Uzun onarım: SWE-agent, OpenHands — bütçe şart.",
        ],
      },
      {
        heading: "Sarmalama tipleri",
        body: [
          "Sarmalama, modeli kabuğa nasıl bağladığınızdır. REPL sarmalama kodu mesaj sanır. Repo sarmalama yamayı mesaj sanır. IDE sarmalama editörü sahne sanır. CLI sarmalama süreci ajan sanır. MCP sarmalama kabuğu bir araç olarak graf’a takar. Kernel sarmalama değişkenleri turlar arası yaşatır. Hiçbiri tek başına güvenlik değildir.",
          "Üretim sarmalaması çifttir: ajan ⊃ onay kapısı ⊃ konteyner veya microVM ⊃ venv/uv ⊃ süreç. Katman atlamak ‘çalışıyor’ görünür; kaçak sessizdir.",
        ],
        callout: {
          title: "Sıra",
          text: "Önce onay, sonra izolasyon, sonra paket ortamı, en içte komut. Tersi: komut host’ta doğar, venv tiyatro dekorudur.",
        },
      },
      {
        heading: "Docker, konteyner, venv ve diğerleri",
        body: [
          "venv / virtualenv / uv / Poetry: Python yolunu ayırır. Güvenlik sınırı değildir. Conda native kütüphane ekler, aynı zayıflık. Nix tekrarlanabilir araç zinciri verir, sandbox değildir.",
          "Docker ve Podman: süreç, kök dosya sistemi, isteğe bağlı ağ ad alanı. Kernel paylaşılır. network=none, read-only kök, CPU/RAM/pid tavanı, seccomp yoksa konteyner bir etiketdir. Podman rootless daemon kaldırır; kaçışı tek başına kesmez.",
          "gVisor ve Kata sistem çağrısını keser veya hafif VM koyar. Firecracker / microVM ayrı kernel açar — çok kiracılı icranın doğru katmanı. nsjail ve bubblewrap Docker’suz namespace keser.",
          "Seçim: tek geliştirici, güvenilen repo → venv + dar cwd yeter, Docker iyi olur. Kamu veya çok kiracı → microVM. Ajanın pip install ve rastgele ağ hakkı varsa venv’in anlamı biter.",
        ],
      },
    ],
  },
  {
    slug: "araclar",
    chapter: "15",
    group: "arac",
    title: "Araçlar, eklentiler ve izin",
    kicker: "Araç, modelin eli. Eklenti, o eli takan kutu.",
    summary:
      "Bash, dosya, HTTP, web, tarayıcı, SQL, git, kod yorumlayıcı, RAG. Eklenti: MCP, OpenAPI, skill pack, IDE, Slack, çatı tool pack. Görev dar, izin listesi kapı, indirme spec kartından.",
    related: ["baglanma", "dugumler", "terminal-icra", "mikro-ajanlar"],
    uses: [
      {
        where: "Üretim sohbeti",
        how: "HTTP + RAG + izin listesi. Bash yok. Yazma varsa HITL.",
      },
      {
        where: "Yazılım onarımı",
        how: "Git + dosya + kod yorumlayıcı, MCP ile takılı, cwd repo. Force-push kapalı.",
      },
      {
        where: "İç asistan",
        how: "Slack eklentisi uyandırır; araçlar MCP. Kanal yetki vermez.",
      },
    ],
    pitfalls: [
      "‘Tüm araçları yükle’. LangChain varsayılanı sessiz yetki genişlemesidir.",
      "Plugin’i model yüzü sanmak. Auth sunucuda kalır; token istemde olmaz.",
      "Tarayıcı aracını Researcher ile Executor’a aynı anda vermek.",
    ],
    sections: [
      {
        heading: "Araçların görevleri ve nerede kullanıldığı",
        body: [
          "İzin listesi her yığının kapısıdır: hangi araç, hangi argüman. Kabuk derleme ve test içindir, host’ta değil. Dosya aracı cwd’de okur ve yama yapar; silme ayrı onay. HTTP izinli host’a JSON yollar. Web arama taze bilgi getirir, nihai cevap yazmaz. Tarayıcı API’siz sayfa içindir, ayrı mikro ajan. SQL salt okunur rapor içindir. Git, repo sarmalamasının birimidir. Kod yorumlayıcı kısa snippet koşar, kalıcı kabuk değildir. RAG iç doküman getirir, rerank ister.",
        ],
        bullets: [
          "Okuma: RAG, SQL SELECT, dosya oku, web arama.",
          "Yazma: dosya yaz, git commit, HTTP POST — HITL.",
          "İcra: bash ve kod yorumlayıcı — konteyner + tavan.",
          "Etkileşim: tarayıcı, Slack — dar domain, ayrı ajan.",
        ],
      },
      {
        heading: "Eklentiler: nasıl takılır",
        body: [
          "MCP sunucusu aynı aracı birçok ajana standart protokolle takar; izin sunucuda da kesilir. OpenAPI / Actions şemadan araç üretir, host ve method kilitlidir. Skill pack yordamsal bellek ile dar aracı bir kartta taşır, iş bitince kalkar. IDE eklentisi editöre bağlanır; görünürlük onay değildir. Slack/Teams eklentisi kanalı giriş yapar, kanal yetki vermez — prompt injection geçmişten gelir. LangChain ve LlamaIndex pack’i prototiptir; üretimde tek tek allow-list.",
        ],
        callout: {
          title: "İndirme",
          text: "Her araç ve eklentinin spec kartı Katalog’da indirilir. Kart görev, kullanım yeri ve yasağı taşır. Paket yöneticisi kartın yerine geçmez: pip/npm ile gelen pack yine allow-list ister.",
        },
      },
      {
        heading: "Bağlama kuralı",
        body: [
          "Araç düğümü function calling veya MCP ile bağlanır. Eklenti kutuyu getirir, izin listesi içeriği keser, guard şemayı doğrular, HITL yazmayı durdurur. Dördü yoksa ‘plugin çalışıyor’ görünür; yetki sessizce açılır.",
        ],
      },
    ],
  },
  {
    slug: "mcts-protokol",
    chapter: "16",
    group: "zeka",
    title: "MCTS, protokol ve gym",
    kicker: "Arama yöntem, protokol fiş, gym puandır. Üçü mimari değildir.",
    summary:
      "MCTS, ToT, GoT, LATS, RAP, Reflexion, Best-of-N. Protokol: MCP, A2A, ACP, ANP, AG-UI, Agent Protocol. Gym: Gymnasium, BrowserGym, SWE-bench, OSWorld, GEM. GYMCTE tek ürün değil.",
    related: ["ajan-mimarileri", "baglanma", "araclar", "terminal-icra"],
    uses: [
      {
        where: "Kod onarımı",
        how: "LATS veya MCTS + SWE-Gym değer. Aider sarması. MCP git aracı. Bütçe tavanı.",
      },
      {
        where: "Çok ajan",
        how: "A2A veya ACP delege. MCP araç. AG-UI onay. Kimlik çekirdekte.",
      },
      {
        where: "Yöntem denemesi",
        how: "GEM / Gymnasium. Skor laboratuvarda. Kazananı daraltıp üretime taşı.",
      },
    ],
    pitfalls: [
      "MCTS’i mimari sanmak. Arama katmanıdır; graf ve durma ayrıca.",
      "MCP ile A2A’yı eşitlemek. Biri araç fişi, diğeri iş devri.",
      "Gym’i üretim ortamı yazmak. Puan kutusu, müşteri yüzü değil.",
    ],
    sections: [
      {
        heading: "Arama yöntemleri",
        body: [
          "MCTS ağaçta dener, geri yayar, umut vereni genişletir. Ziyaret sayısı doğru cevap değildir; değer test, PRM veya gym’den gelir. Tree of Thoughts dal üretir ve eleyerek iner. Graph of Thoughts dalları birleştirir. LATS, unutulan isim: MCTS + ToT + ReAct + yansıma, ortam geri bildirimi değerdir. RAP dünya modeli ile hayali adım simüle eder. Reflexion başarısız denemeyi kısa karta yazar. Best-of-N ağaç değildir, N aday seçer.",
        ],
        bullets: [
          "Kısa tek adım: Best-of-N.",
          "Dal eleyerek düşünce: ToT.",
          "Araçlı ajan, ortam puanı: LATS.",
          "Pahalı ortam, hayali adım: RAP.",
        ],
      },
      {
        heading: "Protokoller: MCP, A2A ve unutulanlar",
        body: [
          "MCP ajanı araca bağlar. A2A ajanı ajana bağlar. ACP aynı işi çatı-bağımsız mesajla yapar. ANP açık ağda keşif ve kimlik içindir; iç yığında gerekmez. AG-UI ajanı arayüze bağlar — HITL’in olay protokolü. Agent Protocol REST ile ajanı uyandırır, iptal eder. Beşini karıştırmak altı ay yer.",
        ],
        callout: {
          title: "GYMCTE",
          text: "Tek ürün yok. Gymnasium, GEM, BrowserGym, SWE-Gym aynı aile: puanlı ortam. CTE ise ağaç genişlemesi (MCTS/LATS/ToT). İsmi hatırlayamamak normal; aileyi ayır.",
        },
      },
      {
        heading: "Gym nerede kullanılır",
        body: [
          "Gymnasium klasik reset/step/ödül. BrowserGym ve WebArena sayfa görevi ölçer. SWE-bench / SWE-Gym gerçek PR’de fail-to-pass ister. OSWorld masaüstü görevi VM’de koşar. GEM ajan LLM’ler için birleşik gym’dir. Hepsi laboratuvar. Kazanan yöntemi daralt, allow-list ile üretime al. Kartlar Katalog’dan indirilir.",
        ],
      },
    ],
  },
];

export function getTopic(slug: string) {
  return topics.find((t) => t.slug === slug);
}

export function searchTopics(q: string) {
  const n = foldTr(q.trim());
  if (!n) return topics;
  return topics.filter((t) => {
    const blob = foldTr(
      [
        t.title,
        t.summary,
        t.kicker,
        ...t.sections.flatMap((s) => [s.heading, ...s.body, ...(s.bullets ?? [])]),
      ].join(" "),
    );
    return blob.includes(n);
  });
}

export const agents = [
  {
    name: "Router",
    model: "Küçük, filtreli",
    task: "Niyeti sınıflandırır, grafa yollar.",
    tools: "Yok veya minimum",
  },
  {
    name: "Planner",
    model: "Akıl yürütme",
    task: "Hedefi adımlara böler, araç çağırmaz.",
    tools: "Yok",
  },
  {
    name: "Researcher",
    model: "Sohbet + arama",
    task: "Kaynaklı not üretir, nihai cevap yazmaz.",
    tools: "Web, RAG",
  },
  {
    name: "Executor",
    model: "Kod / yapılandırılmış",
    task: "Planı uygular, plan değiştirmez.",
    tools: "Kod, API, tarayıcı",
  },
  {
    name: "Critic",
    model: "Dürüst, filtreli",
    task: "Şema, test ve kanıt denetimi.",
    tools: "Test, şema",
  },
  {
    name: "Memory",
    model: "Küçük",
    task: "Yazar, özetler, unutur.",
    tools: "Store",
  },
  {
    name: "Guard",
    model: "Politika veya kod",
    task: "İzin, PII, zarar sınırı.",
    tools: "Politika motoru",
  },
  {
    name: "HITL",
    model: "İnsan",
    task: "Para, silme, dış mesaj onayı.",
    tools: "Onay kuyruğu",
  },
  {
    name: "Kod icracı",
    model: "Yapılandırılmış / kod",
    task: "Sarmalanmış kabukta planı koşar.",
    tools: "REPL, git, Docker, venv",
  },
];

export const nodeTypes = [
  {
    id: "llm",
    name: "LLM",
    use: "Üret, planla, sınıflandır.",
  },
  {
    id: "tool",
    name: "Tool",
    use: "Dış dünya. İzin ve zaman aşımı.",
  },
  {
    id: "router",
    name: "Router",
    use: "Kenarı seçer. Ucuz model.",
  },
  {
    id: "condition",
    name: "Condition",
    use: "Kod ile dal.",
  },
  {
    id: "memory",
    name: "Memory",
    use: "Oku / yaz / unut.",
  },
  {
    id: "human",
    name: "Human",
    use: "Onay kapısı.",
  },
  {
    id: "map",
    name: "Map",
    use: "Paralel uzmanlar.",
  },
  {
    id: "reduce",
    name: "Reduce",
    use: "Parçaları birleştir.",
  },
  {
    id: "guard",
    name: "Guard",
    use: "Şema ve politika.",
  },
  {
    id: "sub",
    name: "Subgraph",
    use: "Mikro ajan paketi.",
  },
];

export const connections = [
  {
    id: "fn",
    name: "Function calling",
    when: "Tek süreç, senkron araç.",
  },
  {
    id: "mcp",
    name: "MCP",
    when: "Paylaşılan araç sunucuları.",
  },
  {
    id: "a2a",
    name: "A2A",
    when: "Organizasyonlar arası görev.",
  },
  {
    id: "board",
    name: "Kara tahta",
    when: "Mikro ajan ortak gerçeği.",
  },
  {
    id: "queue",
    name: "Kuyruk",
    when: "Uzun ve asenkron iş.",
  },
  {
    id: "http",
    name: "HTTP / webhook",
    when: "Dış sistem sınırı.",
  },
  {
    id: "edge",
    name: "Graf kenarı",
    when: "Durum makinesi.",
  },
];

export const architectures = [
  {
    id: "react",
    name: "ReAct",
    blurb: "Düşün, çağır, gözle. Kısa görev.",
  },
  {
    id: "plan",
    name: "Plan-and-execute",
    blurb: "Önce plan, sonra icra. Uzun iş.",
  },
  {
    id: "supervisor",
    name: "Supervisor",
    blurb: "Yönetici + uzman mikro ajanlar.",
  },
  {
    id: "swarm",
    name: "Sürü",
    blurb: "Eşler devreder. Keşif, sıkı bütçe.",
  },
  {
    id: "graph",
    name: "Graf",
    blurb: "Düğüm, kenar, durum. Üretim.",
  },
];
