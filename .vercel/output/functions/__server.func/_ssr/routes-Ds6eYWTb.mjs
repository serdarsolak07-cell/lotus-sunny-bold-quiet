import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as topics, d as makerName, r as agents, t as CORE, u as groups } from "./core-seal-CFaAAZoA.mjs";
import { c as ArrowRight } from "../_libs/lucide-react.mjs";
import { i as Button } from "./router-D6386i8S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Ds6eYWTb.js
var import_jsx_runtime = require_jsx_runtime();
var positions = [
	[18, 48],
	[30, 26],
	[48, 20],
	[66, 24],
	[80, 38],
	[82, 58],
	[72, 76],
	[52, 80],
	[34, 76],
	[22, 66],
	[42, 48],
	[58, 44],
	[62, 62],
	[46, 62],
	[70, 50],
	[54, 32]
];
function TopicMap() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative hidden overflow-hidden rounded-xl bg-inset shadow-[0_0_0_1px_var(--color-line)] sm:block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			viewBox: "0 0 100 100",
			preserveAspectRatio: "none",
			className: "h-[22rem] w-full",
			"aria-hidden": true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				stroke: "currentColor",
				className: "text-line-strong",
				strokeWidth: "0.18",
				children: positions.map(([x, y], i) => {
					const [nx, ny] = positions[(i + 1) % positions.length] ?? [x, y];
					const [mx, my] = positions[(i + 4) % positions.length] ?? [x, y];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: x,
						y1: y,
						x2: nx,
						y2: ny
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: x,
						y1: y,
						x2: mx,
						y2: my,
						opacity: "0.4"
					})] }, i);
				})
			})
		}), topics.map((t, i) => {
			const [x, y] = positions[i] ?? [50, 50];
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/atlas/$slug",
				params: { slug: t.slug },
				title: t.title,
				className: "absolute grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-raised font-mono text-[11px] text-fg shadow-[0_0_0_1px_var(--color-accent)] hover:bg-accent hover:text-accent-fg",
				style: {
					left: `${x}%`,
					top: `${y}%`
				},
				children: t.chapter
			}, t.slug);
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid overflow-hidden rounded-xl shadow-[0_0_0_1px_var(--color-line)] sm:hidden",
		children: topics.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/atlas/$slug",
			params: { slug: t.slug },
			className: "flex min-h-11 items-center border-b border-line bg-surface px-4 py-3 last:border-b-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mr-3 font-mono text-[11px] text-subtle",
				children: t.chapter
			}), t.title]
		}, t.slug))
	})] });
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pt-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs tracking-[0.18em] text-accent",
					children: "ÖĞRENME YOLU · 5 DURAK · ATLAS 16"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 max-w-3xl font-display text-[2.4rem] leading-[1.08] tracking-[-0.035em] sm:text-5xl md:text-[3.4rem]",
					children: "Ajan sistemlerini doğru sırayla öğren."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-2xl text-[17px] leading-relaxed text-muted",
					children: "Rastgele kart okumak altı ay yer. KORTEKS meraklıya beş durak verir; tek örnek Defter her durakta büyür. Atlas derinliğe sonra. Sohbet sapmaz."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/yol",
								children: ["Öğrenme yolu", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/karistirilanlar",
								children: "Karıştırılanlar"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/sohbet",
								children: "Atlasa sor"
							})
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 pb-16 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-end justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Konu haritası"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Düğüme bas, bölüme gir."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopicMap, {})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 pb-16 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: "Bölümler"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: topics.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/atlas/$slug",
					params: { slug: t.slug },
					className: "group rounded-xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-line)] transition-[box-shadow] duration-150 hover:shadow-[0_0_0_1px_var(--color-line-strong)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-[11px] text-subtle",
							children: [
								t.chapter,
								" · ",
								groups[t.group]
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-2 font-display text-xl leading-snug",
							children: t.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted",
							children: t.summary
						})
					]
				}, t.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl px-4 pb-20 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 lg:grid-cols-[1.1fr_0.9fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Rol sözleşmeleri"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "İsim süs değildir. Yetki, araç ve çıktı sınırıdır."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 overflow-hidden rounded-xl shadow-[0_0_0_1px_var(--color-line)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "bg-raised text-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 font-medium",
										children: "Ajan"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 font-medium",
										children: "Model"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "hidden px-4 py-3 font-medium sm:table-cell",
										children: "Görev"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: agents.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-t border-line",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 font-medium",
										children: a.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 text-muted",
										children: a.model
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "hidden px-4 py-3 text-muted sm:table-cell",
										children: a.task
									})
								]
							}, a.name)) })]
						})
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "rounded-xl bg-surface p-6 shadow-[0_0_0_1px_var(--color-line)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] tracking-[0.14em] text-accent",
							children: "KURAL"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 font-display text-2xl leading-snug",
							children: "Kullanıcıyı menüye çekme. Cevabı ver."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-muted",
							children: "Atlas sohbeti konu dışı sapmaz, ürün turu yapmaz, “başka bir şey ister misiniz” demez. Bilmiyorsa bilmediğini söyler. Filtreli modeller üretim yüzüdür; az hizalı modeller izole laboratuvardır."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							className: "mt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/atlas/$slug",
								params: { slug: "modeller" },
								children: "Modellere git"
							})
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 pb-20 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs tracking-[0.18em] text-accent",
					children: "YAPIMCI"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 font-display text-3xl",
					children: makerName(CORE.maker)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 max-w-2xl text-[17px] leading-relaxed text-muted",
					children: [
						"Ajan sistemlerini merak edenler doğru sırayla öğrensin diye. Öğrenmesi uzun süren şeyi burada parçalamadan okuyasınız. Çekirdek bellek: yapımcı",
						" ",
						makerName(CORE.maker),
						". Çoğaltma bu olguyu silmez."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/yapimci",
							children: "Yapımcı bölümü"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/pc",
							children: "PC’de çalıştır"
						})
					})]
				})
			]
		})
	] });
}
//#endregion
export { Home as component };
