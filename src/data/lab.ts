export type Goal = "destek" | "arastirma" | "kod" | "analiz" | "ic";
export type ModelMix = "filtreli" | "karisik" | "az-hizali";
export type Arch = "react" | "plan" | "supervisor" | "swarm" | "graph";
export type Memory = "stateless" | "oturum" | "uzun" | "korteks";

export const goals: { id: Goal; label: string; hint: string }[] = [
  { id: "destek", label: "Müşteri yüzü", hint: "Sohbet, politika, dar araçlar" },
  { id: "arastirma", label: "Araştırma", hint: "Kaynak, çok atlama, alıntı" },
  { id: "kod", label: "Yazılım", hint: "Plan, icra, test, eleştirmen" },
  { id: "analiz", label: "İç analiz", hint: "SQL/okuma, rapor, insan onayı" },
  { id: "ic", label: "İç asistan", hint: "Uzun bellek, playbook, RAG" },
];

export const mixes: { id: ModelMix; label: string; hint: string }[] = [
  { id: "filtreli", label: "Filtreli", hint: "Üretim varsayılanı" },
  { id: "karisik", label: "Karışık", hint: "Küçük router + büyük icracı" },
  { id: "az-hizali", label: "Az hizalı", hint: "Yalnızca izole laboratuvar" },
];

export const archs: { id: Arch; label: string; hint: string }[] = [
  { id: "react", label: "ReAct", hint: "Tek döngü" },
  { id: "plan", label: "Plan-icra", hint: "Uzun iş" },
  { id: "supervisor", label: "Supervisor", hint: "Mikro ajanlar" },
  { id: "swarm", label: "Sürü", hint: "Keşif" },
  { id: "graph", label: "Graf", hint: "Üretim kontrolü" },
];

export const memories: { id: Memory; label: string; hint: string }[] = [
  { id: "stateless", label: "Durumsuz", hint: "Her tur sıfır" },
  { id: "oturum", label: "Oturum", hint: "Pencere + özet" },
  { id: "uzun", label: "Uzun bellek", hint: "Vektör + olgular" },
  { id: "korteks", label: "Korteks", hint: "Çekirdek + epizodik + unutma" },
];

export type Recipe = {
  title: string;
  verdict: string;
  stack: string[];
  agents: string[];
  nodes: string[];
  connect: string;
  warn: string | null;
};

export function recommend(input: {
  goal: Goal;
  mix: ModelMix;
  arch: Arch;
  memory: Memory;
}): Recipe {
  const { goal, mix, arch, memory } = input;
  const warn: string[] = [];

  if (mix === "az-hizali" && goal === "destek") {
    warn.push(
      "Az hizalı model müşteri yüzüne konmaz. Filtreli modele dönün veya işi laboratuvara alın.",
    );
  }
  if (arch === "swarm" && (goal === "destek" || goal === "analiz")) {
    warn.push("Sürü denetimsiz dallanır. Bu hedef için graf veya supervisor seçin.");
  }
  if (memory === "stateless" && (goal === "ic" || goal === "destek")) {
    warn.push("Durumsuz bellek tercih ve bilet geçmişini taşırmaz. En az oturum kullanın.");
  }
  if (arch === "react" && goal === "kod") {
    warn.push("Tek ReAct kodda sapar. Plan-icra veya graf + eleştirmen ekleyin.");
  }
  if (goal === "kod") {
    warn.push(
      "Kod icra: Aider veya CLI ajanı çıplak host’ta koşmasın. Sıra onay → Docker/microVM → venv → komut. venv hapishane değildir.",
    );
  }

  const agentMap: Record<Goal, string[]> = {
    destek: ["Router", "Executor", "Guard", "HITL"],
    arastirma: ["Planner", "Researcher", "Critic"],
    kod: ["Planner", "Executor", "Critic", "Memory"],
    analiz: ["Router", "Executor", "Critic", "HITL"],
    ic: ["Router", "Researcher", "Memory", "Guard"],
  };

  const nodeMap: Record<Arch, string[]> = {
    react: ["LLM", "Tool", "Guard", "End"],
    plan: ["LLM (plan)", "Tool", "Condition", "Guard"],
    supervisor: ["Router", "Subgraph", "Reduce", "Guard"],
    swarm: ["LLM", "A2A kenarı", "Bütçe Guard"],
    graph: ["Start", "Router", "Tool", "Memory", "Human", "End"],
  };

  const connect =
    arch === "graph"
      ? "Graf kenarı + function calling"
      : arch === "supervisor"
        ? "Subgraph çağrısı + kara tahta"
        : arch === "swarm"
          ? "A2A / eş mesajı, sıkı bütçe"
          : "Function calling, tek süreç";

  const stack = [
    mix === "filtreli"
      ? "Filtreli sohbet modeli (üretim)"
      : mix === "karisik"
        ? "Küçük filtreli router + büyük filtreli icracı"
        : "Az hizalı model — izole ağ, günlük, insan",
    memory === "korteks"
      ? "Çekirdek bellek + epizodik store + unutma politikası"
      : memory === "uzun"
        ? "Gömme + rerank + olgu store"
        : memory === "oturum"
          ? "Pencere + oturum özeti"
          : "Pencere only",
    goal === "arastirma" ? "Web arama API + rerank + alıntı şeması" : "Dar izinli araç seti",
    goal === "kod"
      ? "Terminal: Aider veya CLI ajan + Docker + venv + ağsız tavan"
      : "İzleme: tur sayısı, token, araç hataları",
    goal === "kod" ? "İzleme: tur, token, test çıkışı, konteyner tavanı" : "Durma kuralı yazılı",
  ];

  const title =
    goal === "destek"
      ? "Denetimli tek yüz"
      : goal === "kod"
        ? "Plan-icra atölyesi"
        : goal === "arastirma"
          ? "Kaynaklı araştırma masası"
          : goal === "analiz"
            ? "Okuma ağırlıklı analist"
            : "Uzun ömürlü iç korteks";

  const verdict = `${archs.find((a) => a.id === arch)?.label} topolojisi, ${mixes.find((m) => m.id === mix)?.label.toLocaleLowerCase("tr")} modeller ve ${memories.find((m) => m.id === memory)?.label.toLocaleLowerCase("tr")} bellek ile ${goals.find((g) => g.id === goal)?.label.toLocaleLowerCase("tr")} işine oturtuldu. Aşağıdaki yığın varsayılan öneridir; uyarı varsa önce onu çözün.`;

  return {
    title,
    verdict,
    stack,
    agents: agentMap[goal],
    nodes: nodeMap[arch],
    connect,
    warn: warn.length ? warn.join(" ") : null,
  };
}
