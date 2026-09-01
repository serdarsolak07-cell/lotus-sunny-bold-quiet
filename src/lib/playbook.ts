import { CORE } from "@/data/core";
import { getSpec, kindLabels, kindOrder, type Spec } from "@/data/specs";
import { makerName } from "@/lib/core-seal";
import type { StackConfig, TestResult } from "@/lib/harness";

export type Target = "genel" | "langgraph" | "crewai" | "n8n" | "letta" | "xai" | "cli";

export const targets: { id: Target; name: string; hint: string }[] = [
  { id: "genel", name: "Genel sözleşme", hint: "Her yığına taşınır" },
  { id: "langgraph", name: "LangGraph", hint: "Durum + düğüm + kenar" },
  { id: "crewai", name: "CrewAI / AutoGen", hint: "Rol ve süreç" },
  { id: "n8n", name: "n8n / Flowise", hint: "Görsel düğüm" },
  { id: "letta", name: "Letta / MemGPT", hint: "Korteks ve bellek" },
  { id: "xai", name: "xAI / Grok", hint: "API + function calling" },
  { id: "cli", name: "Aider / OI / CLI", hint: "Terminal sarmalama" },
];

export type Playbook = {
  ready: boolean;
  blockers: string[];
  title: string;
  parts: Spec[];
  files: Record<Target, string>;
};

function idsOf(config: StackConfig) {
  return new Set(config.specIds);
}
function pick(config: StackConfig) {
  return config.specIds.map((id) => getSpec(id)).filter(Boolean) as Spec[];
}

function named(config: StackConfig, kind: Spec["kind"]) {
  return pick(config)
    .filter((s) => s.kind === kind)
    .map((s) => `${s.name} — ${s.task}`)
    .join("\n- ");
}

function header(config: StackConfig, ready: boolean, blockers: string[]) {
  const parts = pick(config);
  return [
    `# KORTEKS hayata geçirme talimatı`,
    ``,
    `Çekirdek — Yapımcı: ${makerName(CORE.maker)}`,
    ready
      ? `Durum: TEST GEÇTİ. Bu yığın başka bir yapay zeka sistemine taşınabilir.`
      : `Durum: TEST GEÇMEDİ. Talimat kilitlenmez ama üretime alınmaz.`,
    `Yüzey: ${config.face === "kamu" ? "kamu" : "iç"}`,
    `Tur tavanı: ${config.maxTurns ? "açık" : "kapalı"}`,
    `Bağlam sıkıştırma: ${config.compress ? "açık" : "kapalı"}`,
    `Parça sayısı: ${parts.length}`,
    ``,
    blockers.length ? `Blokajlar:\n${blockers.map((b) => `- ${b}`).join("\n")}\n` : "",
    `## Seçilen parçalar`,
    ...kindOrder.map((k) => {
      const g = parts.filter((s) => s.kind === k);
      if (!g.length) return "";
      return `### ${kindLabels[k]}\n${g.map((s) => `- **${s.name}**: ${s.task} ${s.summary}`).join("\n")}`;
    }).filter(Boolean),
  ].join("\n");
}

function genel(config: StackConfig) {
  const id = idsOf(config);
  const agents = named(config, "ajan") || "(ajan seçilmedi)";
  return [
    `## Genel kurulum sırası`,
    `1. Anahtarları sunucuda tut. İstemciye model anahtarı koyma.`,
    `2. Çıkarım: ${id.has("az-hizali") ? "az hizalı model yalnızca izole ağda." : "filtreli sohbet modeli üretim yüzü."} ${id.has("router-model") ? "Yönlendirme için küçük model ayır." : "Küçük router ekle; büyük modeli her tokene yakma."}`,
    `3. Ajan sözleşmeleri (girdi / çıktı / yasak):`,
    `- ${agents}`,
    `4. Graf: Start → Router → (Plan | Tool) → Guard → ${id.has("ajan-hitl") || id.has("node-human") ? "Human → " : ""}End.`,
    `5. Durma: ${config.maxTurns || id.has("kor-butce") || id.has("node-condition") ? "tur tavanı veya condition açık tut." : "tur tavanı ekle — yoksa döngü kaçar."}`,
    `6. Bellek: çalışma penceresi ≠ bellek. ${id.has("mem-cekirdek") || id.has("kor-kalici") ? "Çekirdek gerçeği her tur yükle." : "Çekirdek bellek bloğu tanımla."} Unutma politikası yaz.`,
    `7. Doğrulama: ${id.has("ajan-critic") || id.has("node-guard") ? "Critic/Guard bağımsız çalışsın." : "Bağımsız critic ekle."} ${id.has("search-cite") ? "Alıntı şeması zorunlu." : "Web varsa alıntı şeması koy."}`,
    `8. İzleme: tur, token, araç hatası, sessiz kaçak. Alarmı UI’dan bağımsız tut.`,
    `9. Terminal icra: ${kindsTerminal(config)}`,
    `10. Araç ve eklenti: ${kindsTools(config)}`,
    `11. Arama / protokol / gym: ${kindsSearch(config)}`,
    ``,
    `## Yasak`,
    `- Filtresiz modeli kamu yüzüne bağlama.`,
    `- Executor’a plan değiştirme yetkisi verme.`,
    `- Her ajanın ham geçmiş yazmasına izin verme.`,
    `- Open Interpreter / Aider / CLI ajanı host’ta çıplak koşturma.`,
    `- venv’i hapishane yazma. Paket ≠ süreç izolasyonu.`,
    `- ‘Tüm araçları yükle’. Plugin allow-list olmadan takılmaz.`,
    `- MCTS/LATS’i tavan ve değer (gym/critic) olmadan koşturma.`,
    `- MCP’yi A2A sanma. Gym’i üretim yüzü yazma.`,
    `- Test geçmeden üretime alma.`,
  ].join("\n");
}

function kindsSearch(config: StackConfig) {
  const methods = named(config, "yontem");
  const proto = named(config, "protokol");
  const gym = named(config, "gym");
  if (!methods && !proto && !gym) {
    return "yok. MCTS/LATS eklerken tavan + gym/critic. MCP araç, A2A delege, AG-UI onay.";
  }
  return [
    methods ? `Yöntem: ${methods}` : "",
    proto ? `Protokol: ${proto}` : "",
    gym ? `Gym: ${gym}` : "",
    "MCTS ≠ mimari. MCP ≠ A2A. Gym ≠ müşteri yüzü.",
  ]
    .filter(Boolean)
    .join(" ");
}

function kindsTools(config: StackConfig) {
  const tools = named(config, "arac");
  const plugs = named(config, "eklenti");
  if (!tools && !plugs) {
    return "araç yok. Eklerken izin listesi + guard + (yazmada HITL).";
  }
  return [
    tools ? `Araçlar: ${tools}` : "araç seç.",
    plugs ? `Eklenti: ${plugs}` : "",
    "Kapı: allow-list → guard şema → HITL yazma. MCP izni sunucuda da kes.",
  ]
    .filter(Boolean)
    .join(" ");
}

function kindsTerminal(config: StackConfig) {
  const id = idsOf(config);
  const terms = named(config, "terminal");
  const wraps = named(config, "sarmalama");
  const envs = named(config, "ortam");
  if (!terms && !wraps && !envs) {
    return "kod icra yok. Eklerken sıra: onay → konteyner/microVM → venv → komut.";
  }
  return [
    terms ? `Sistemler: ${terms}` : "icra sistemi seç.",
    wraps ? `Sarmalama: ${wraps}` : "sarmalama tipi seç (REPL / repo / CLI).",
    envs ? `Ortam: ${envs}` : "Docker veya microVM ekle; yalnız venv yetmez.",
    "Sıra: ajan ⊃ onay ⊃ konteyner ⊃ venv ⊃ süreç.",
  ].join(" ");
}

function langgraph(config: StackConfig) {
  const id = idsOf(config);
  return [
    `## LangGraph’e taşı`,
    `1. \`State\` TypedDict: messages, plan, evidence, budget, flags.`,
    `2. Düğüm fonksiyonları:`,
    id.has("ajan-router") || id.has("node-router") ? `- \`router_node\`: niyet → kenar. Küçük model, düşük sıcaklık.` : `- \`router_node\` ekle.`,
    id.has("ajan-planner") ? `- \`planner_node\`: plan şeması üret, araç çağırma.` : `- Uzun işte \`planner_node\` ekle.`,
    id.has("ajan-executor") || id.has("node-tool") ? `- \`tool_node\`: izin listesi, timeout, JSON argüman.` : `- Tool düğümü yok; eklemeden dış dünya yok.`,
    id.has("ajan-critic") || id.has("node-guard") ? `- \`critic_node\` + \`guard_node\`: şema ve kanıt.` : `- \`guard_node\` deterministik olsun.`,
    id.has("ajan-hitl") || id.has("node-human") ? `- \`interrupt()\` human düğümünde. Para/silme burada.` : `- Kamu yazma varsa interrupt ekle.`,
    `3. Kenarlar: router → plan|tool; critic fail → planner; budget=0 → end.`,
    `4. Checkpointer: ${id.has("mem-epizodik") ? "Postgres/SQLite checkpointer (epizodik)." : "MemorySaver ile başla, sonra kalıcı checkpointer."}`,
    `5. Store: ${id.has("mem-anlamsal") ? "vektör store + rerank düğümü." : "gerekirse ayrı retrieval subgraph."}`,
    `6. Çalıştırma: \`graph.invoke(input, config={recursion_limit: N})\` — N tur tavanı.`,
  ].join("\n");
}

function crewai(config: StackConfig) {
  const agents = pick(config).filter((s) => s.kind === "ajan");
  return [
    `## CrewAI / AutoGen’e taşı`,
    `1. Her ajan için \`role\`, \`goal\`, \`backstory\` yazma. Yerine \`role\` + çıktı şeması + tool listesi.`,
    agents.length
      ? `2. Ajanlar:\n${agents.map((a) => `   - ${a.name}: ${a.task} Araçlar dar. Yasak: diğer rollerin işi.`).join("\n")}`
      : `2. En az Router, Executor, Critic tanımla.`,
    `3. Süreç: ${idsOf(config).has("arch-sup") || idsOf(config).has("ajan-router") ? "hierarchical (supervisor)." : idsOf(config).has("arch-plan") ? "sequential: Planner → Executor → Critic." : "sequential, kısa."}`,
    `4. \`max_iter\` ve \`max_execution_time\` ver. Sessiz hız burada kesilir.`,
    `5. Human-in-the-loop: onay bekleyen task’i \`human=True\` yap.`,
    `6. AutoGen ise: UserProxy durma cümlesi + GroupChat manager bütçesi.`,
  ].join("\n");
}

function n8n(config: StackConfig) {
  const id = idsOf(config);
  return [
    `## n8n / Flowise’e taşı`,
    `1. Akış: Webhook → Router (LLM sınıflandırıcı) → Switch.`,
    `2. Dalları seçilen düğümlere map et: ${pick(config).filter((s) => s.kind === "dugum").map((s) => s.name).join(", ") || "LLM, Tool, Guard"}.`,
    `3. Tool düğümlerinde retry=1, timeout açık, hata dalı → Guard. Hatayı yutma.`,
    `4. ${id.has("node-map") ? "SplitInBatches = Map. Merge = Reduce. Merge yoksa akışı durdur." : "Paralel dal açarsan Merge koy."}`,
    `5. Human: Wait / form onayı. ${id.has("ajan-hitl") || id.has("node-human") ? "Yazma bu beklemeye bağlı." : "Kamu yazma varsa Wait ekle."}`,
    `6. Bellek: Postgres + (isteğe bağlı) vektör. Pencereye tüm geçmişi yapıştırma.`,
    `7. Üretimde şemayı kodda kilitle; görsel tuval tek kaynak gerçek olmasın.`,
  ].join("\n");
}

function letta(config: StackConfig) {
  const id = idsOf(config);
  return [
    `## Letta / MemGPT korteksine taşı`,
    `1. Dış döngü: kullanıcı mesajı. İç döngü: bellek sayfası, araç, yeniden yazım.`,
    `2. Core memory blokları: ${id.has("mem-cekirdek") || id.has("ctx-cekirdek") ? "persona + human + proje gerçeği (kısa)." : "persona ve human bloklarını şimdi tanımla."}`,
    `3. Archival: ${id.has("mem-anlamsal") || id.has("mem-epizodik") ? "archival_memory_insert yalnızca Memory Manager yetkisinde." : "archival store bağla, her tur insert etme."}`,
    `4. ${id.has("kor-hizli") ? "Hızlı yol: recall_memory + araç." : "Hızlı yol tanımla: router + tool."} ${id.has("kor-yavas") ? "Yavaş yol: plan + critic." : "Yavaş yolu ayrı agent’e ayır."}`,
    `5. Unutma: core’a çelişen olgu gelirse archival ham kaynak kazansın; özet ezmesin.`,
    `6. Bütçe: inner-loop adım tavanı. Kullanıcı her iç adımı görmesin.`,
  ].join("\n");
}

function xai(config: StackConfig) {
  const id = idsOf(config);
  return [
    `## xAI / Grok API’ye taşı`,
    `1. Sunucu tarafı: \`XAI_API_KEY\`. Tarayıcıdan çağırma.`,
    `2. Model: üretim sohbeti \`grok-4.5\`, sıcaklık düşük. ${id.has("router-model") ? "Router için ayrı, küçük, ucuz çağrı." : "Router’ı ayrı çağrı yap; aynı büyük modele her niyeti sorma."}`,
    `3. Function calling: araçları JSON şema ile bildir. ${id.has("conn-fn") ? "Function calling seçili — senkron araç standardı bu." : "Araç varsa function calling aç."}`,
    `4. Sistem istemi: rol + yasak + çıktı şeması (kısa). Atlas gerçeğini RAG/çekirdekten yükle; romana çevirme.`,
    `5. ${config.face === "kamu" ? "Kamu yüzü: filtreli, dar tool, HITL. Az hizalı model bağlama." : "İç yüzey: günlük ve insan denetimi yine açık olsun."}`,
    `6. max_tokens tavanı, kullanıcı tetikli çağrı, aynı içeriği yeniden üretme.`,
    `7. Critic ayrı bir çağrı olsun (üretici ile aynı mesaj yığınında ‘kendini denetle’ yetmez).`,
  ].join("\n");
}

function cli(config: StackConfig) {
  const id = idsOf(config);
  const sys =
    named(config, "terminal") ||
    "Open Interpreter (REPL) veya Aider (repo) veya CLI kod ajanı seç.";
  return [
    `## Aider / Open Interpreter / CLI ajana taşı`,
    `Seçilen icra:`,
    `- ${sys}`,
    `1. Ajanı host’ta çıplak koşturma.`,
    `2. Sarmalama sırası: onay kapısı → ${id.has("env-microvm") ? "microVM/Firecracker" : id.has("env-docker") || id.has("env-podman") ? "Docker/Podman (network=none, read-only kök, CPU/RAM tavanı)" : "Docker veya microVM ekle"} → ${id.has("env-venv") || id.has("env-uv") || id.has("env-conda") ? "venv/uv/conda" : "venv veya uv"} → komut.`,
    `3. ${id.has("term-aider") || id.has("wrap-repo") ? "Aider: git repo birimdir. Commit öncesi lint/test. .gitignore ve allow-list dosya." : "Repo işi ise Aider veya CLI ajanı git sarmalamasıyla bağla."}`,
    `4. ${id.has("term-oi") || id.has("wrap-repl") ? "Open Interpreter: her komut onay. Stdout budanır, pencereye ham dökülmez. Auto-run kapalı." : "REPL kullanıyorsan auto-run kapalı, stdout tavanı koy."}`,
    `5. CLI ajan (Claude Code / Codex / Goose): cwd = proje kökü. HOME, SSH anahtarı, bulut kimliği bağlama.`,
    `6. ${id.has("env-netnone") ? "Ağ kapalı. Gerekirse ayrı allow-list proxy." : "Konteynerde --network none varsayılan olsun."}`,
    `7. ${id.has("ajan-critic") || id.has("wrap-repo") ? "Critic: test çıktısı. Exit 0 cevap değildir." : "pytest/lint’i critic düğümü yap. Kodun çalışması doğruluk değildir."}`,
    `8. venv paket kilitler; Docker süreç keser. İkisini birden kullan. Yalnız birini ‘izolasyon’ yazma.`,
  ].join("\n");
}

export function buildPlaybook(config: StackConfig, results: TestResult[]): Playbook {
  const fail = results.filter((r) => !r.pass);
  const ready = fail.length === 0 && pick(config).length >= 4;
  const blockers = fail.map((r) => `${r.name}: ${r.detail}`);
  const head = header(config, ready, blockers);
  const files = {
    genel: [head, "", genel(config)].join("\n"),
    langgraph: [head, "", langgraph(config)].join("\n"),
    crewai: [head, "", crewai(config)].join("\n"),
    n8n: [head, "", n8n(config)].join("\n"),
    letta: [head, "", letta(config)].join("\n"),
    xai: [head, "", xai(config)].join("\n"),
    cli: [head, "", cli(config)].join("\n"),
  } satisfies Record<Target, string>;
  return {
    ready,
    blockers,
    title: ready ? "Hayata geçirme talimatı" : "Talimat kilitli",
    parts: pick(config),
    files,
  };
}

export function bundlePlaybook(p: Playbook) {
  return targets.map((t) => `----- ${t.name} -----\n\n${p.files[t.id]}`).join("\n\n");
}
