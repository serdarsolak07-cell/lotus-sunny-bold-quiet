import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as cn } from "./router-D6386i8S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/laboratuvar-cUvhIX-J.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var goals = [
	{
		id: "destek",
		label: "Müşteri yüzü",
		hint: "Sohbet, politika, dar araçlar"
	},
	{
		id: "arastirma",
		label: "Araştırma",
		hint: "Kaynak, çok atlama, alıntı"
	},
	{
		id: "kod",
		label: "Yazılım",
		hint: "Plan, icra, test, eleştirmen"
	},
	{
		id: "analiz",
		label: "İç analiz",
		hint: "SQL/okuma, rapor, insan onayı"
	},
	{
		id: "ic",
		label: "İç asistan",
		hint: "Uzun bellek, playbook, RAG"
	}
];
var mixes = [
	{
		id: "filtreli",
		label: "Filtreli",
		hint: "Üretim varsayılanı"
	},
	{
		id: "karisik",
		label: "Karışık",
		hint: "Küçük router + büyük icracı"
	},
	{
		id: "az-hizali",
		label: "Az hizalı",
		hint: "Yalnızca izole laboratuvar"
	}
];
var archs = [
	{
		id: "react",
		label: "ReAct",
		hint: "Tek döngü"
	},
	{
		id: "plan",
		label: "Plan-icra",
		hint: "Uzun iş"
	},
	{
		id: "supervisor",
		label: "Supervisor",
		hint: "Mikro ajanlar"
	},
	{
		id: "swarm",
		label: "Sürü",
		hint: "Keşif"
	},
	{
		id: "graph",
		label: "Graf",
		hint: "Üretim kontrolü"
	}
];
var memories = [
	{
		id: "stateless",
		label: "Durumsuz",
		hint: "Her tur sıfır"
	},
	{
		id: "oturum",
		label: "Oturum",
		hint: "Pencere + özet"
	},
	{
		id: "uzun",
		label: "Uzun bellek",
		hint: "Vektör + olgular"
	},
	{
		id: "korteks",
		label: "Korteks",
		hint: "Çekirdek + epizodik + unutma"
	}
];
function recommend(input) {
	const { goal, mix, arch, memory } = input;
	const warn = [];
	if (mix === "az-hizali" && goal === "destek") warn.push("Az hizalı model müşteri yüzüne konmaz. Filtreli modele dönün veya işi laboratuvara alın.");
	if (arch === "swarm" && (goal === "destek" || goal === "analiz")) warn.push("Sürü denetimsiz dallanır. Bu hedef için graf veya supervisor seçin.");
	if (memory === "stateless" && (goal === "ic" || goal === "destek")) warn.push("Durumsuz bellek tercih ve bilet geçmişini taşırmaz. En az oturum kullanın.");
	if (arch === "react" && goal === "kod") warn.push("Tek ReAct kodda sapar. Plan-icra veya graf + eleştirmen ekleyin.");
	if (goal === "kod") warn.push("Kod icra: Aider veya CLI ajanı çıplak host’ta koşmasın. Sıra onay → Docker/microVM → venv → komut. venv hapishane değildir.");
	const agentMap = {
		destek: [
			"Router",
			"Executor",
			"Guard",
			"HITL"
		],
		arastirma: [
			"Planner",
			"Researcher",
			"Critic"
		],
		kod: [
			"Planner",
			"Executor",
			"Critic",
			"Memory"
		],
		analiz: [
			"Router",
			"Executor",
			"Critic",
			"HITL"
		],
		ic: [
			"Router",
			"Researcher",
			"Memory",
			"Guard"
		]
	};
	const nodeMap = {
		react: [
			"LLM",
			"Tool",
			"Guard",
			"End"
		],
		plan: [
			"LLM (plan)",
			"Tool",
			"Condition",
			"Guard"
		],
		supervisor: [
			"Router",
			"Subgraph",
			"Reduce",
			"Guard"
		],
		swarm: [
			"LLM",
			"A2A kenarı",
			"Bütçe Guard"
		],
		graph: [
			"Start",
			"Router",
			"Tool",
			"Memory",
			"Human",
			"End"
		]
	};
	const connect = arch === "graph" ? "Graf kenarı + function calling" : arch === "supervisor" ? "Subgraph çağrısı + kara tahta" : arch === "swarm" ? "A2A / eş mesajı, sıkı bütçe" : "Function calling, tek süreç";
	const stack = [
		mix === "filtreli" ? "Filtreli sohbet modeli (üretim)" : mix === "karisik" ? "Küçük filtreli router + büyük filtreli icracı" : "Az hizalı model — izole ağ, günlük, insan",
		memory === "korteks" ? "Çekirdek bellek + epizodik store + unutma politikası" : memory === "uzun" ? "Gömme + rerank + olgu store" : memory === "oturum" ? "Pencere + oturum özeti" : "Pencere only",
		goal === "arastirma" ? "Web arama API + rerank + alıntı şeması" : "Dar izinli araç seti",
		goal === "kod" ? "Terminal: Aider veya CLI ajan + Docker + venv + ağsız tavan" : "İzleme: tur sayısı, token, araç hataları",
		goal === "kod" ? "İzleme: tur, token, test çıkışı, konteyner tavanı" : "Durma kuralı yazılı"
	];
	return {
		title: goal === "destek" ? "Denetimli tek yüz" : goal === "kod" ? "Plan-icra atölyesi" : goal === "arastirma" ? "Kaynaklı araştırma masası" : goal === "analiz" ? "Okuma ağırlıklı analist" : "Uzun ömürlü iç korteks",
		verdict: `${archs.find((a) => a.id === arch)?.label} topolojisi, ${mixes.find((m) => m.id === mix)?.label.toLocaleLowerCase("tr")} modeller ve ${memories.find((m) => m.id === memory)?.label.toLocaleLowerCase("tr")} bellek ile ${goals.find((g) => g.id === goal)?.label.toLocaleLowerCase("tr")} işine oturtuldu. Aşağıdaki yığın varsayılan öneridir; uyarı varsa önce onu çözün.`,
		stack,
		agents: agentMap[goal],
		nodes: nodeMap[arch],
		connect,
		warn: warn.length ? warn.join(" ") : null
	};
}
function ChipGroup({ label, options, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
		className: "mb-2 font-mono text-[11px] tracking-[0.14em] text-subtle",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-2",
		children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => onChange(o.id),
			className: cn("min-h-11 rounded-md px-3 py-2 text-left text-sm shadow-[0_0_0_1px_var(--color-line)]", value === o.id ? "bg-accent text-accent-fg" : "bg-raised text-fg"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block font-medium",
				children: o.label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("block text-xs", value === o.id ? "opacity-80" : "text-muted"),
				children: o.hint
			})]
		}, o.id))
	})] });
}
function Lab() {
	const [goal, setGoal] = (0, import_react.useState)("kod");
	const [mix, setMix] = (0, import_react.useState)("karisik");
	const [arch, setArch] = (0, import_react.useState)("graph");
	const [memory, setMemory] = (0, import_react.useState)("korteks");
	const recipe = (0, import_react.useMemo)(() => recommend({
		goal,
		mix,
		arch,
		memory
	}), [
		goal,
		mix,
		arch,
		memory
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-10 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs text-accent",
				children: "LABORATUVAR"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 max-w-2xl font-display text-4xl leading-tight sm:text-5xl",
				children: "Hedefi söyleyin, yığını kurun."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-muted",
				children: "Dört seçim: iş, model karışımı, topoloji, bellek. Öneri sapmaz; uyarı varsa önce onu okuyun."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-10 lg:grid-cols-[1fr_22rem]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipGroup, {
							label: "Hedef",
							options: goals,
							value: goal,
							onChange: setGoal
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipGroup, {
							label: "Modeller",
							options: mixes,
							value: mix,
							onChange: setMix
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipGroup, {
							label: "Mimari",
							options: archs,
							value: arch,
							onChange: setArch
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipGroup, {
							label: "Bellek",
							options: memories,
							value: memory,
							onChange: setMemory
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "rounded-xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-line)] lg:sticky lg:top-24 h-fit",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] text-subtle",
							children: "ÖNERİ"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-2xl",
							children: recipe.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted",
							children: recipe.verdict
						}),
						recipe.warn && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 rounded-md bg-bg px-3 py-2 text-sm text-danger shadow-[0_0_0_1px_var(--color-line)]",
							children: recipe.warn
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-5 grid gap-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-subtle",
									children: "Ajanlar"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1",
									children: recipe.agents.join(" · ")
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-subtle",
									children: "Düğümler"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1",
									children: recipe.nodes.join(" · ")
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-subtle",
									children: "Bağlantı"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1",
									children: recipe.connect
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-5 grid gap-2",
							children: recipe.stack.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "border-l-2 border-accent/50 pl-3 text-sm text-muted",
								children: s
							}, s))
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { Lab as component };
