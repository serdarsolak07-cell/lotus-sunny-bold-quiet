import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as topics, a as beatFor, c as connections, f as nextStop, g as stopFor, h as quizFor, i as architectures, n as EXAMPLE, p as nodeTypes, u as groups } from "./core-seal-CFaAAZoA.mjs";
import { n as Route, p as cn } from "./router-D6386i8S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/atlas._slug-CoHgtvnO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var graphs = {
	react: {
		nodes: [
			{
				id: "u",
				x: 18,
				y: 50,
				label: "Kullanıcı"
			},
			{
				id: "t",
				x: 50,
				y: 50,
				label: "LLM"
			},
			{
				id: "o",
				x: 82,
				y: 28,
				label: "Araç"
			},
			{
				id: "g",
				x: 82,
				y: 72,
				label: "Gözlem"
			}
		],
		edges: [
			["u", "t"],
			["t", "o"],
			["o", "g"],
			["g", "t"]
		]
	},
	plan: {
		nodes: [
			{
				id: "p",
				x: 22,
				y: 36,
				label: "Plan"
			},
			{
				id: "e",
				x: 50,
				y: 36,
				label: "İcra"
			},
			{
				id: "c",
				x: 78,
				y: 36,
				label: "Kritik"
			},
			{
				id: "r",
				x: 50,
				y: 72,
				label: "Yeniden plan"
			}
		],
		edges: [
			["p", "e"],
			["e", "c"],
			["c", "r"],
			["r", "p"]
		]
	},
	supervisor: {
		nodes: [
			{
				id: "s",
				x: 50,
				y: 22,
				label: "Supervisor"
			},
			{
				id: "a",
				x: 22,
				y: 62,
				label: "Araştırma"
			},
			{
				id: "b",
				x: 50,
				y: 78,
				label: "İcra"
			},
			{
				id: "c",
				x: 78,
				y: 62,
				label: "Kritik"
			}
		],
		edges: [
			["s", "a"],
			["s", "b"],
			["s", "c"],
			["a", "s"],
			["b", "s"],
			["c", "s"]
		]
	},
	swarm: {
		nodes: [
			{
				id: "a",
				x: 30,
				y: 32,
				label: "A"
			},
			{
				id: "b",
				x: 70,
				y: 32,
				label: "B"
			},
			{
				id: "c",
				x: 30,
				y: 70,
				label: "C"
			},
			{
				id: "d",
				x: 70,
				y: 70,
				label: "D"
			}
		],
		edges: [
			["a", "b"],
			["b", "d"],
			["d", "c"],
			["c", "a"],
			["a", "d"]
		]
	},
	graph: {
		nodes: [
			{
				id: "st",
				x: 14,
				y: 50,
				label: "Start"
			},
			{
				id: "r",
				x: 36,
				y: 50,
				label: "Router"
			},
			{
				id: "l",
				x: 58,
				y: 28,
				label: "LLM"
			},
			{
				id: "to",
				x: 58,
				y: 72,
				label: "Tool"
			},
			{
				id: "h",
				x: 80,
				y: 50,
				label: "Human"
			}
		],
		edges: [
			["st", "r"],
			["r", "l"],
			["r", "to"],
			["l", "h"],
			["to", "h"]
		]
	}
};
function ArchCanvas({ active, onPick }) {
	const g = graphs[active] ?? graphs.react;
	const node = (id) => g.nodes.find((n) => n.id === id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2",
			children: architectures.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onPick(a.id),
				className: cn("h-10 rounded-sm px-3 text-sm shadow-[0_0_0_1px_var(--color-line)]", active === a.id ? "bg-accent text-accent-fg" : "bg-raised text-fg"),
				children: a.name
			}, a.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 overflow-hidden rounded-lg bg-inset shadow-[0_0_0_1px_var(--color-line)]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 100 100",
				className: "h-64 w-full sm:h-72",
				children: [g.edges.map(([a, b], i) => {
					const na = node(a);
					const nb = node(b);
					if (!na || !nb) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: na.x,
						y1: na.y,
						x2: nb.x,
						y2: nb.y,
						stroke: "currentColor",
						className: "text-accent",
						strokeWidth: "0.45",
						opacity: "0.7"
					}, i);
				}), g.nodes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: n.x,
					cy: n.y,
					r: "4.2",
					className: "fill-raised stroke-line-strong",
					strokeWidth: "0.4"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: n.x,
					y: n.y + 8.8,
					textAnchor: "middle",
					className: "fill-fg",
					fontSize: "3.4",
					fontFamily: "Source Sans 3, sans-serif",
					children: n.label
				})] }, n.id))]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm text-muted",
			children: architectures.find((a) => a.id === active)?.blurb
		})
	] });
}
var layers = [
	{
		name: "Çalışma",
		desc: "Pencere. Şimdi. Pahalı."
	},
	{
		name: "Çekirdek",
		desc: "Her zaman yüklü gerçekler."
	},
	{
		name: "Epizodik",
		desc: "Oturumlar, olaylar, zaman."
	},
	{
		name: "Anlamsal",
		desc: "Olgular, doküman, vektör."
	},
	{
		name: "Yordamsal",
		desc: "Beceriler ve playbook."
	}
];
function MemoryStack() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "grid gap-2",
		children: layers.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex items-center gap-4 rounded-lg bg-raised px-4 py-3 shadow-[0_0_0_1px_var(--color-line)]",
			style: { marginLeft: `${i * 8}px` },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-xs text-subtle",
				children: String(i + 1).padStart(2, "0")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: l.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: l.desc
			})] })]
		}, l.name))
	});
}
var rows = [
	[
		"Yüzey",
		"Üretim, kamu, destek",
		"İzole laboratuvar, kırmızı takım"
	],
	[
		"Ret",
		"Yüksek ve istenen",
		"Düşük; suiistimal yüzeyi yüksek"
	],
	[
		"Talimat",
		"Daha tutarlı",
		"Daha ham, daha sapmalı"
	],
	[
		"Araç yetkisi",
		"Dar izin listesi",
		"Ağır yetki vermeyin"
	],
	[
		"Zekâ",
		"Filtre ≠ zekâ",
		"Filtresiz ≠ daha zeki"
	],
	[
		"Kullanma",
		"Varsayılan",
		"Günlük + insan + izolasyon"
	]
];
function ModelCompare() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mb-12 overflow-x-auto rounded-xl shadow-[0_0_0_1px_var(--color-line)]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[32rem] text-left text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
				className: "bg-raised",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-3 font-medium text-muted",
						children: "Ölçüt"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-3 font-medium",
						children: "Filtreli"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-3 font-medium",
						children: "Az hizalı / filtresiz"
					})
				] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
				className: "border-t border-line",
				children: r.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: i === 0 ? "px-4 py-3 text-muted" : "px-4 py-3",
					children: c
				}, i))
			}, r[0])) })]
		})
	});
}
function DefterBeat({ stage, text, adds }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "mb-10 max-w-2xl rounded-xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-line)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-[11px] tracking-[0.14em] text-accent",
				children: [
					EXAMPLE.name,
					" · ",
					stage
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed",
				children: text
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-xs text-muted",
				children: ["Bu durakta eklenen: ", adds]
			})
		]
	});
}
function WrongWhy({ claim, why }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-10 max-w-2xl rounded-xl bg-raised p-5 shadow-[0_0_0_1px_var(--color-line)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] tracking-[0.14em] text-accent",
				children: "BU NEDEN YANLIŞ?"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-display text-xl leading-snug",
				children: claim
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setOpen((v) => !v),
				className: "mt-4 min-h-11 rounded-md bg-surface px-4 text-sm shadow-[0_0_0_1px_var(--color-line)] hover:shadow-[0_0_0_1px_var(--color-line-strong)]",
				children: open ? "Gizle" : "Neden"
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm leading-relaxed text-muted",
				children: why
			})
		]
	});
}
function PathNext({ slug }) {
	const n = nextStop(slug);
	if (!n) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mt-8 max-w-2xl text-sm text-muted",
		children: [
			"Yoldaki sonraki durak:",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/atlas/$slug",
				params: { slug: n.slug },
				className: "text-fg underline-offset-2 hover:underline",
				children: [
					n.n,
					" ",
					n.title
				]
			})
		]
	});
}
function Article() {
	const { topic } = Route.useLoaderData();
	const [arch, setArch] = (0, import_react.useState)("graph");
	const related = topics.filter((t) => topic.related.includes(t.slug));
	const beat = beatFor(topic.slug);
	const quiz = quizFor(topic.slug);
	const stop = stopFor(topic.slug);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_16rem]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-xs text-accent",
				children: [
					topic.chapter,
					" · ",
					groups[topic.group]
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl leading-tight sm:text-5xl",
				children: topic.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-lg text-muted",
				children: topic.kicker
			}),
			stop && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 max-w-2xl font-mono text-xs tracking-wide text-subtle",
				children: ["Yol · durak kuralı: ", stop.rule]
			}),
			beat && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DefterBeat, {
					stage: beat.stage,
					text: beat.text,
					adds: beat.adds
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "prose-atlas mt-10 max-w-2xl text-[16.5px] leading-[1.65]",
				children: topic.sections.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mb-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-3 font-display text-2xl",
							children: s.heading
						}),
						s.body.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-fg/95",
							children: p
						}, p.slice(0, 48))),
						s.bullets && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: s.bullets.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-[15.5px] leading-relaxed",
							children: b
						}, b)) }),
						s.callout && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
							className: "mt-5 rounded-lg bg-raised px-4 py-4 shadow-[0_0_0_1px_var(--color-line)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[11px] text-accent",
								children: s.callout.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm leading-relaxed",
								children: s.callout.text
							})]
						})
					]
				}, s.heading))
			}),
			topic.slug === "modeller" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelCompare, {}),
			topic.slug === "ajan-mimarileri" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-12 max-w-2xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchCanvas, {
					active: arch,
					onPick: setArch
				})
			}),
			topic.slug === "hafiza" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-12 max-w-xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemoryStack, {})
			}),
			topic.slug === "dugumler" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mb-12 grid max-w-2xl grid-cols-2 gap-2 sm:grid-cols-3",
				children: nodeTypes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-lg bg-raised p-3 shadow-[0_0_0_1px_var(--color-line)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: n.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: n.use
					})]
				}, n.id))
			}),
			topic.slug === "baglanma" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mb-12 grid max-w-2xl gap-2",
				children: connections.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-baseline justify-between gap-4 rounded-lg bg-raised px-4 py-3 shadow-[0_0_0_1px_var(--color-line)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-medium",
						children: c.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted",
						children: c.when
					})]
				}, c.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "max-w-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Nerede, nasıl"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid gap-3",
					children: topic.uses.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: u.where
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: u.how
						})]
					}, u.where))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10 max-w-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Sık kırılma"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 grid gap-2",
					children: topic.pitfalls.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "border-l-2 border-accent/50 pl-3 text-sm leading-relaxed text-muted",
						children: p
					}, p))
				})]
			}),
			quiz && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WrongWhy, {
				claim: quiz.claim,
				why: quiz.why
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PathNext, { slug: topic.slug })
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "lg:sticky lg:top-24 lg:self-start",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] text-subtle",
				children: "İLGİLİ"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 grid gap-2",
				children: related.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/atlas/$slug",
					params: { slug: r.slug },
					className: "block rounded-md px-3 py-2 text-sm hover:bg-raised",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[11px] text-subtle",
						children: r.chapter
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-2",
						children: r.title
					})]
				}) }, r.slug))
			})]
		})]
	});
}
//#endregion
export { Article as component };
