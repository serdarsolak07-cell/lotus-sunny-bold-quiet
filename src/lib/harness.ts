import { getSpec, type Spec } from "@/data/specs";

export type TestKind = "mantik" | "hiz" | "dogruluk";

export type TestResult = {
  id: string;
  kind: TestKind;
  name: string;
  pass: boolean;
  silent: boolean;
  detail: string;
  ms: number;
};

export type StackConfig = {
  specIds: string[];
  face: "ic" | "kamu";
  maxTurns: boolean;
  compress: boolean;
};

export const testKindLabels: Record<TestKind, string> = {
  mantik: "Mantık hataları",
  hiz: "Sessiz hız",
  dogruluk: "Sessiz doğruluk",
};

function has(ids: Set<string>, ...need: string[]) {
  return need.every((id) => ids.has(id));
}
function any(ids: Set<string>, ...need: string[]) {
  return need.some((id) => ids.has(id));
}

function timed(fn: () => Omit<TestResult, "ms">): TestResult {
  const t0 = performance.now();
  const r = fn();
  return { ...r, ms: Math.max(1, Math.round(performance.now() - t0)) };
}

export function runHarness(config: StackConfig): TestResult[] {
  const ids = new Set(config.specIds);
  const selected = config.specIds.map((id) => getSpec(id)).filter(Boolean) as Spec[];
  const kinds = new Set(selected.map((s) => s.kind));

  const out: TestResult[] = [];

  out.push(
    timed(() => {
      const planner = ids.has("ajan-planner");
      const executor = ids.has("ajan-executor");
      const longArch = any(ids, "arch-plan", "arch-graph", "arch-sup");
      const ok = !(longArch && executor && !planner);
      return {
        id: "logic-plan-exec",
        kind: "mantik",
        name: "Plan–icra ayrımı",
        pass: ok,
        silent: false,
        detail: ok
          ? "Uzun mimaride Planner ile Executor ayrı."
          : "Executor planı kendi genişletir. Bu bir mantık hatasıdır: icra, hedefi değiştirir.",
      };
    }),
  );

  out.push(
    timed(() => {
      const react = ids.has("arch-react");
      const cond = ids.has("node-condition") || config.maxTurns || ids.has("kor-butce");
      const ok = !react || cond;
      return {
        id: "logic-stop",
        kind: "mantik",
        name: "Durma koşulu",
        pass: ok,
        silent: false,
        detail: ok
          ? "Döngü tavanı veya condition var."
          : "ReAct durma koşulu yok. Döngü ‘biraz daha düşün’ ile kaçabilir.",
      };
    }),
  );

  out.push(
    timed(() => {
      const write =
        any(ids, "ajan-executor", "node-tool", "node-human") ||
        kinds.has("terminal") ||
        any(ids, "tool-bash", "tool-file", "tool-http", "tool-sql", "tool-git", "tool-code");
      const hitl = ids.has("ajan-hitl") || ids.has("node-human");
      const ok = config.face === "ic" || !write || hitl;
      return {
        id: "logic-hitl",
        kind: "mantik",
        name: "Yazma onayı",
        pass: ok,
        silent: false,
        detail: ok
          ? "Yazma yolu onay kapısından geçiyor veya iç yüzey."
          : "Kamu yüzünde yazma aracı var, HITL yok. Kontrol kırığı.",
      };
    }),
  );

  out.push(
    timed(() => {
      const unaligned = ids.has("az-hizali");
      const ok = !(unaligned && config.face === "kamu");
      return {
        id: "logic-filter",
        kind: "mantik",
        name: "Filtre yüzeyi",
        pass: ok,
        silent: false,
        detail: ok
          ? "Az hizalı model kamu yüzünde değil."
          : "Filtresiz model kamu yüzünde. Politika ve ürün sınırı ihlali.",
      };
    }),
  );

  out.push(
    timed(() => {
      const map = ids.has("node-map");
      const reduce = ids.has("node-reduce");
      const ok = !map || reduce;
      return {
        id: "logic-map-reduce",
        kind: "mantik",
        name: "Fan-out birleşimi",
        pass: ok,
        silent: false,
        detail: ok
          ? "Map varsa Reduce da var."
          : "Paralel uzmanlar var, birleştirici yok. Parçalar sessizce kaybolur.",
      };
    }),
  );

  out.push(
    timed(() => {
      const bigAsRouter = ids.has("akil") && !ids.has("router-model") && !ids.has("ajan-router");
      const ok = !bigAsRouter;
      return {
        id: "speed-router",
        kind: "hiz",
        name: "Yönlendirici maliyeti",
        pass: ok,
        silent: true,
        detail: ok
          ? "Küçük router ayrılmış; büyük model her tokene yanmıyor."
          : "Akıl yürütme modeli yönlendiriyor. Gecikme UI’da ‘düşünüyor’ diye gizlenir — sessiz hız kaybı.",
      };
    }),
  );

  out.push(
    timed(() => {
      const dump =
        kinds.has("baglam") &&
        ids.has("ctx-getiri") &&
        !ids.has("ctx-ozet") &&
        !config.compress;
      const ok = !dump;
      return {
        id: "speed-context-dump",
        kind: "hiz",
        name: "Bağlam dökümü",
        pass: ok,
        silent: true,
        detail: ok
          ? "Getiri budanıyor veya sıkıştırılıyor."
          : "Araç ve RAG çıktısı budanmadan pencereye giriyor. Tur süresi şişer, kimse alarm vermez.",
      };
    }),
  );

  out.push(
    timed(() => {
      const epi = ids.has("mem-epizodik");
      const manager = ids.has("ajan-memory") || ids.has("node-memory") || ids.has("kor-kalici");
      const ok = !epi || manager;
      return {
        id: "speed-memory-bloat",
        kind: "hiz",
        name: "Epizodik şişme",
        pass: ok,
        silent: true,
        detail: ok
          ? "Olay belleğini kimse yazıp unutmuyor; yönetici var."
          : "Her tur epizodiğe yazılıyor, unutma yok. Gecikme oturum 12’de patlar.",
      };
    }),
  );

  out.push(
    timed(() => {
      const swarmish =
        ids.has("conn-a2a") ||
        ids.has("proto-a2a") ||
        ids.has("arch-react") ||
        kinds.has("terminal") ||
        kinds.has("yontem");
      const budget = ids.has("kor-butce") || config.maxTurns;
      const ok = !swarmish || budget;
      return {
        id: "speed-budget",
        kind: "hiz",
        name: "Tur bütçesi",
        pass: ok,
        silent: true,
        detail: ok
          ? "Token/tur tavanı tanımlı."
          : "Bütçe yok. Sistem cevap verene kadar ‘çalışıyor’ görünür; maliyet sessiz birikir.",
      };
    }),
  );

  out.push(
    timed(() => {
      const research = ids.has("ajan-researcher") || ids.has("search-plan");
      const critic = ids.has("ajan-critic") || ids.has("node-guard") || ids.has("ajan-guard");
      const ok = !research || critic;
      return {
        id: "acc-critic",
        kind: "dogruluk",
        name: "Bağımsız eleştirmen",
        pass: ok,
        silent: true,
        detail: ok
          ? "Üretimden ayrı bir doğrulama katmanı var."
          : "Araştırma var, critic yok. Cevap bitmiş görünür; kanıt yoktur — sessiz doğruluk kaybı.",
      };
    }),
  );

  out.push(
    timed(() => {
      const web = any(ids, "ajan-researcher", "search-plan", "search-rerank");
      const cite = ids.has("search-cite");
      const ok = !web || cite;
      return {
        id: "acc-cite",
        kind: "dogruluk",
        name: "Alıntı bağlama",
        pass: ok,
        silent: true,
        detail: ok
          ? "İddia kaynağa bağlı."
          : "Web özeti alıntısız. Kullanıcı doğru sanır.",
      };
    }),
  );

  out.push(
    timed(() => {
      const rag = ids.has("mem-anlamsal") || ids.has("ctx-getiri");
      const rerank = ids.has("rerank") || ids.has("search-rerank");
      const ok = !rag || rerank;
      return {
        id: "acc-rerank",
        kind: "dogruluk",
        name: "Rerank yokluğu",
        pass: ok,
        silent: true,
        detail: ok
          ? "Adaylar yeniden sıralanıyor."
          : "İlk vektör komşusu cevap sanılıyor. Hata yüzeye çıkmaz.",
      };
    }),
  );

  out.push(
    timed(() => {
      const cortex = selected.some((s) => s.kind === "korteks" && s.id !== "cekirdek-yapimci");
      const core = ids.has("mem-cekirdek") || ids.has("ctx-cekirdek") || ids.has("kor-kalici");
      const ok = !cortex || core;
      return {
        id: "acc-core",
        kind: "dogruluk",
        name: "Çekirdek yükleme",
        pass: ok,
        silent: true,
        detail: ok
          ? "Korteks iddiası çekirdek bellek ile tutarlı."
          : "Korteks seçili ama çekirdek bellek yok. Sistem ‘hatırlıyor’ gibi konuşur, her tur sıfırdır.",
      };
    }),
  );

  out.push(
    timed(() => {
      const shell = kinds.has("terminal");
      const box = any(
        ids,
        "env-docker",
        "env-podman",
        "env-microvm",
        "env-gvisor",
        "wrap-cift",
      );
      const ok = !shell || box;
      return {
        id: "logic-shell-sandbox",
        kind: "mantik",
        name: "Çıplak kabuk",
        pass: ok,
        silent: false,
        detail: ok
          ? "Terminal icra konteyner veya microVM içinde."
          : "Open Interpreter / Aider / CLI ajan host’ta çıplak. Her komut ev sahibidir.",
      };
    }),
  );

  out.push(
    timed(() => {
      const aider = ids.has("term-aider");
      const repo = ids.has("wrap-repo") || ids.has("wrap-cift");
      const ok = !aider || repo;
      return {
        id: "logic-aider-repo",
        kind: "mantik",
        name: "Aider repo sarması",
        pass: ok,
        silent: false,
        detail: ok
          ? "Aider git/diff sarmalamasıyla bağlı."
          : "Aider seçili ama repo sarmalaması yok. Yamayı sohbet sanır, dosya ezer.",
      };
    }),
  );

  out.push(
    timed(() => {
      const oi = ids.has("term-oi") || ids.has("term-kernel");
      const repl = ids.has("wrap-repl") || ids.has("wrap-kernel") || ids.has("wrap-cift");
      const ok = !oi || repl;
      return {
        id: "logic-oi-repl",
        kind: "mantik",
        name: "REPL sarması",
        pass: ok,
        silent: false,
        detail: ok
          ? "Yorumlayıcı REPL veya kernel sarmalamasında."
          : "Open Interpreter / Jupyter sarmalanmadan bağlanmış. Stdout ve durum budanmaz.",
      };
    }),
  );

  out.push(
    timed(() => {
      const shell = kinds.has("terminal");
      const lang = any(ids, "env-venv", "env-conda", "env-uv", "env-nix");
      const box = any(ids, "env-docker", "env-podman", "env-microvm", "env-gvisor", "wrap-cift");
      const ok = !shell || !lang || box || config.face === "ic";
      return {
        id: "logic-venv-boundary",
        kind: "mantik",
        name: "venv hapishane değil",
        pass: ok,
        silent: false,
        detail: ok
          ? "Paket ortamı güvenlik iddiası taşımıyor veya konteyner var."
          : "Kamu yüzünde venv/conda tek ‘izolasyon’. Aynı kernel, aynı ağ. Mantık hatası.",
      };
    }),
  );

  out.push(
    timed(() => {
      const docker = ids.has("env-docker") || ids.has("env-podman");
      const harden = ids.has("env-netnone") || ids.has("kor-butce") || config.maxTurns;
      const ok = !docker || harden;
      return {
        id: "speed-container-cap",
        kind: "hiz",
        name: "Konteyner tavanı",
        pass: ok,
        silent: true,
        detail: ok
          ? "Konteynerde ağ/CPU/tur tavanı var."
          : "Docker var, tavan yok. Ajan host’u doldurana kadar ‘çalışıyor’ görünür.",
      };
    }),
  );

  out.push(
    timed(() => {
      const shell = kinds.has("terminal");
      const critic = ids.has("ajan-critic") || ids.has("node-guard") || ids.has("wrap-repo");
      const ok = !shell || critic;
      return {
        id: "acc-code-ran",
        kind: "dogruluk",
        name: "Çalıştı ≠ doğru",
        pass: ok,
        silent: true,
        detail: ok
          ? "İcra çıktısı test veya critic’den geçiyor."
          : "Kod koştu diye kabul. Exit 0 sessiz doğruluk kaybıdır.",
      };
    }),
  );

  out.push(
    timed(() => {
      const writeTools = any(
        ids,
        "tool-bash",
        "tool-file",
        "tool-http",
        "tool-sql",
        "tool-git",
        "tool-code",
      );
      const allow = ids.has("tool-allow") || ids.has("ajan-guard") || ids.has("node-guard");
      const ok = !writeTools || allow;
      return {
        id: "logic-tool-allow",
        kind: "mantik",
        name: "Araç izin listesi",
        pass: ok,
        silent: false,
        detail: ok
          ? "Yazma araçları allow-list veya guard arkasında."
          : "Bash/dosya/HTTP/SQL serbest. Eklenti ‘her şey’ olmuş. Mantık hatası.",
      };
    }),
  );

  out.push(
    timed(() => {
      const plug = kinds.has("eklenti");
      const scoped = ids.has("tool-allow") || ids.has("ajan-guard") || ids.has("node-guard");
      const ok = !plug || scoped;
      return {
        id: "logic-plugin-scope",
        kind: "mantik",
        name: "Eklenti kapsamı",
        pass: ok,
        silent: false,
        detail: ok
          ? "Plugin/MCP izinle sınırlı."
          : "Eklenti yüklü, izin yok. ‘load all tools’ sessiz yetki genişlemesi.",
      };
    }),
  );

  out.push(
    timed(() => {
      const tools = selected.filter((s) => s.kind === "arac" && s.id !== "tool-allow");
      const router = ids.has("ajan-router") || ids.has("router-model") || ids.has("node-router");
      const ok = tools.length < 4 || router;
      return {
        id: "speed-tool-flood",
        kind: "hiz",
        name: "Araç seli",
        pass: ok,
        silent: true,
        detail: ok
          ? "Araç seti dar veya router var."
          : `${tools.length} araç, router yok. Her tur şema şişer — sessiz hız kaybı.`,
      };
    }),
  );

  out.push(
    timed(() => {
      const web = ids.has("tool-web") || ids.has("tool-browser");
      const cite = ids.has("search-cite") || ids.has("ajan-critic");
      const ok = !web || cite;
      return {
        id: "acc-web-tool",
        kind: "dogruluk",
        name: "Web aracı alıntısı",
        pass: ok,
        silent: true,
        detail: ok
          ? "Web/tarayıcı aracı alıntı veya critic ile bağlı."
          : "Arama aracı var, kaynak yok. Özet doğru sanılır.",
      };
    }),
  );

  out.push(
    timed(() => {
      const tree = any(
        ids,
        "search-mcts",
        "search-tot",
        "search-got",
        "search-lats",
        "search-rap",
      );
      const stop = config.maxTurns || ids.has("kor-butce") || ids.has("node-condition");
      const ok = !tree || stop;
      return {
        id: "logic-tree-stop",
        kind: "mantik",
        name: "Ağaç tavanı",
        pass: ok,
        silent: false,
        detail: ok
          ? "MCTS/ToT/LATS dal ve tur tavanı var."
          : "Ağaç arama tavan yok. Ziyaret sonsuza gider. Mantık hatası.",
      };
    }),
  );

  out.push(
    timed(() => {
      const a2a = ids.has("conn-a2a") || ids.has("proto-a2a") || ids.has("proto-acp");
      const who = ids.has("mem-cekirdek") || ids.has("ctx-cekirdek");
      const ok = !a2a || who;
      return {
        id: "logic-a2a-id",
        kind: "mantik",
        name: "A2A kimliği",
        pass: ok,
        silent: false,
        detail: ok
          ? "Ajan devrinde kimlik çekirdekte."
          : "A2A/ACP var, kimlik yok. Devir gürültüdür.",
      };
    }),
  );

  out.push(
    timed(() => {
      const mcp = any(ids, "conn-mcp", "proto-mcp", "plug-mcp");
      const allow = ids.has("tool-allow") || ids.has("ajan-guard") || ids.has("node-guard");
      const ok = !mcp || allow;
      return {
        id: "logic-mcp-allow",
        kind: "mantik",
        name: "MCP izin kapısı",
        pass: ok,
        silent: false,
        detail: ok
          ? "MCP allow-list veya guard arkasında."
          : "MCP takılı, izin yok. Fiş güvenlik sanılmış.",
      };
    }),
  );

  out.push(
    timed(() => {
      const gym = kinds.has("gym");
      const ok = !gym || config.face === "ic";
      return {
        id: "logic-gym-lab",
        kind: "mantik",
        name: "Gym ≠ üretim",
        pass: ok,
        silent: false,
        detail: ok
          ? "Gym laboratuvar yüzünde veya yok."
          : "Gym kamu yüzüne bağlanmış. Puan kutusu müşteri değildir.",
      };
    }),
  );

  out.push(
    timed(() => {
      const tree = any(ids, "search-mcts", "search-lats", "search-rap", "search-tot", "search-got");
      const value =
        kinds.has("gym") ||
        ids.has("ajan-critic") ||
        ids.has("node-guard") ||
        ids.has("search-bon");
      const ok = !tree || value;
      return {
        id: "acc-tree-value",
        kind: "dogruluk",
        name: "Ziyaret ≠ doğru",
        pass: ok,
        silent: true,
        detail: ok
          ? "Ağaç değeri gym, critic veya skordan geliyor."
          : "MCTS/LATS ziyareti cevap sanılıyor. Sessiz doğruluk kaybı.",
      };
    }),
  );

  out.push(
    timed(() => {
      const ok = selected.length >= 4;
      return {
        id: "logic-empty",
        kind: "mantik",
        name: "Yığın boş değil",
        pass: ok,
        silent: false,
        detail: ok
          ? `${selected.length} parça seçili.`
          : "Kurgulama boş. Test edilecek sistem yok.",
      };
    }),
  );

  return out;
}

export function summarize(results: TestResult[]) {
  const fail = results.filter((r) => !r.pass);
  const silentFail = fail.filter((r) => r.silent);
  const byKind = (k: TestKind) => {
    const rs = results.filter((r) => r.kind === k);
    return { total: rs.length, pass: rs.filter((r) => r.pass).length };
  };
  return {
    total: results.length,
    pass: results.filter((r) => r.pass).length,
    fail: fail.length,
    silentFail: silentFail.length,
    ms: results.reduce((a, r) => a + r.ms, 0),
    mantik: byKind("mantik"),
    hiz: byKind("hiz"),
    dogruluk: byKind("dogruluk"),
  };
}

export const presets: { id: string; name: string; hint: string; config: StackConfig }[] = [
  {
    id: "saglam",
    name: "Sağlam üretim",
    hint: "Filtreli, graf, critic, bütçe",
    config: {
      face: "kamu",
      maxTurns: true,
      compress: true,
      specIds: [
        "sohbet-filtreli",
        "router-model",
        "ajan-router",
        "ajan-planner",
        "ajan-executor",
        "ajan-critic",
        "ajan-guard",
        "ajan-hitl",
        "ajan-memory",
        "mem-cekirdek",
        "mem-yordamsal",
        "node-router",
        "node-tool",
        "node-condition",
        "node-guard",
        "node-human",
        "ctx-sistem",
        "ctx-cekirdek",
        "ctx-ozet",
        "kor-hizli",
        "kor-yavas",
        "kor-kalici",
        "kor-butce",
        "conn-fn",
        "arch-graph",
      ],
    },
  },
  {
    id: "kirik",
    name: "Kırık mantık",
    hint: "Executor plansız, HITL yok",
    config: {
      face: "kamu",
      maxTurns: false,
      compress: false,
      specIds: [
        "az-hizali",
        "akil",
        "ajan-executor",
        "arch-plan",
        "node-tool",
        "node-llm",
      ],
    },
  },
  {
    id: "sessiz-yavas",
    name: "Sessiz yavaş",
    hint: "Büyük model router, döküm bağlam",
    config: {
      face: "ic",
      maxTurns: false,
      compress: false,
      specIds: [
        "akil",
        "ajan-executor",
        "mem-epizodik",
        "ctx-getiri",
        "arch-react",
        "node-map",
        "conn-a2a",
      ],
    },
  },
  {
    id: "yalancı",
    name: "Yalancı doğru",
    hint: "Araştırma var, critic ve alıntı yok",
    config: {
      face: "kamu",
      maxTurns: true,
      compress: true,
      specIds: [
        "sohbet-filtreli",
        "ajan-researcher",
        "search-plan",
        "mem-anlamsal",
        "ctx-getiri",
        "kor-hizli",
        "arch-react",
      ],
    },
  },
  {
    id: "ciplak-kabuk",
    name: "Çıplak kabuk",
    hint: "Open Interpreter, Docker yok",
    config: {
      face: "kamu",
      maxTurns: false,
      compress: true,
      specIds: [
        "term-oi",
        "wrap-repl",
        "env-venv",
        "ajan-executor",
        "arch-react",
        "node-tool",
      ],
    },
  },
  {
    id: "saglam-kod",
    name: "Sağlam kod icra",
    hint: "Aider, Docker, venv, onay",
    config: {
      face: "ic",
      maxTurns: true,
      compress: true,
      specIds: [
        "sohbet-filtreli",
        "router-model",
        "yapi",
        "ajan-planner",
        "ajan-executor",
        "ajan-critic",
        "ajan-hitl",
        "ajan-guard",
        "term-aider",
        "wrap-repo",
        "wrap-cift",
        "env-docker",
        "env-venv",
        "env-netnone",
        "mem-cekirdek",
        "kor-kalici",
        "node-tool",
        "node-guard",
        "node-human",
        "node-condition",
        "kor-butce",
        "arch-plan",
      ],
    },
  },
  {
    id: "acik-arac",
    name: "Açık araç çantası",
    hint: "Bash+plugin, izin yok",
    config: {
      face: "kamu",
      maxTurns: true,
      compress: true,
      specIds: [
        "tool-bash",
        "tool-file",
        "tool-http",
        "tool-web",
        "tool-browser",
        "plug-langchain",
        "ajan-executor",
        "arch-react",
      ],
    },
  },
  {
    id: "dar-arac",
    name: "Dar araç seti",
    hint: "HTTP, RAG, MCP, izin",
    config: {
      face: "kamu",
      maxTurns: true,
      compress: true,
      specIds: [
        "sohbet-filtreli",
        "router-model",
        "ajan-router",
        "ajan-guard",
        "ajan-hitl",
        "tool-allow",
        "tool-http",
        "tool-rag",
        "plug-mcp",
        "conn-mcp",
        "node-guard",
        "node-human",
        "node-router",
        "search-cite",
        "rerank",
      ],
    },
  },
  {
    id: "acik-agac",
    name: "Açık ağaç",
    hint: "MCTS+A2A+Gym, tavan yok",
    config: {
      face: "kamu",
      maxTurns: false,
      compress: true,
      specIds: [
        "search-mcts",
        "search-tot",
        "proto-a2a",
        "proto-mcp",
        "gym-nasium",
        "ajan-executor",
        "arch-react",
      ],
    },
  },
  {
    id: "saglam-agac",
    name: "Sağlam LATS",
    hint: "LATS, SWE-Gym, MCP, bütçe",
    config: {
      face: "ic",
      maxTurns: true,
      compress: true,
      specIds: [
        "sohbet-filtreli",
        "router-model",
        "ajan-planner",
        "ajan-critic",
        "ajan-guard",
        "search-lats",
        "proto-mcp",
        "proto-a2a",
        "gym-swe",
        "tool-allow",
        "mem-cekirdek",
        "kor-butce",
        "node-guard",
        "node-condition",
      ],
    },
  },
];
