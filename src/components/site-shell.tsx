import { Link, useRouterState } from "@tanstack/react-router";
import { MessageSquare, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { topics } from "@/data/catalog";
import { confusions, pathStops } from "@/data/learn";
import { specs } from "@/data/specs";
import { CORE } from "@/data/core";
import { makerName } from "@/lib/core-seal";
import { foldTr } from "@/lib/fold";
import { cn } from "@/lib/utils";
import { ChatDock } from "@/components/chat-dock";

const nav = [
  { to: "/", label: "Atlas" },
  { to: "/yol", label: "Yol" },
  { to: "/karistirilanlar", label: "Yanlışlar" },
  { to: "/katalog", label: "Katalog" },
  { to: "/test", label: "Test" },
  { to: "/sohbet", label: "Sohbet" },
  { to: "/yapimci", label: "Yapımcı" },
  { to: "/pc", label: "PC" },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const hits = useMemo(() => {
    const n = foldTr(q.trim());
    if (n.length < 2) {
      return {
        topics: [] as typeof topics,
        specs: [] as typeof specs,
        path: [] as typeof pathStops,
        mix: [] as typeof confusions,
      };
    }
    return {
      topics: topics.filter((t) =>
        foldTr(`${t.title} ${t.summary} ${t.kicker}`).includes(n),
      ),
      specs: specs.filter((s) => foldTr(`${s.name} ${s.task} ${s.kind}`).includes(n)).slice(0, 6),
      path: pathStops.filter((s) => foldTr(`${s.title} ${s.rule} ${s.defter}`).includes(n)),
      mix: confusions.filter((c) => foldTr(`${c.wrong} ${c.right} ${c.why}`).includes(n)),
    };
  }, [q]);

  useEffect(() => {
    setOpen(false);
    setQ("");
  }, [pathname]);

  return (
    <div className="min-h-dvh bg-bg text-fg paper-grain" data-maker={makerName(CORE.maker)}>
      <a
        href="#icerik"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-fg"
      >
        İçeriğe geç
      </a>
      <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:h-16 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <span className="grid size-7 place-items-center rounded-sm bg-raised shadow-[0_0_0_1px_var(--color-line)]">
              <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
                <circle cx="12" cy="12" r="3.2" fill="currentColor" className="text-fg" />
                <circle cx="12" cy="4.2" r="1.2" fill="currentColor" className="text-accent" />
                <circle cx="19.2" cy="16.2" r="1.2" fill="currentColor" className="text-accent" />
                <circle cx="4.8" cy="16.2" r="1.2" fill="currentColor" className="text-accent" />
                <path
                  d="M12 7.4v1.8M17.6 15.2l-2.2-1.3M6.4 15.2l2.2-1.3"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  className="text-muted"
                />
              </svg>
            </span>
            <span className="font-display text-[17px] tracking-tight">KORTEKS</span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {nav.map((item) => {
              const active =
                item.to === "/"
                  ? pathname === "/"
                  : pathname === item.to || pathname.startsWith(`${item.to}/`);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "rounded-sm px-3 py-2 text-sm transition-colors duration-150",
                    active ? "text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="relative ml-auto min-w-0 flex-1 max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
            <input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              placeholder="Konu ara"
              aria-label="Konu ara"
              className="h-10 w-full rounded-md bg-raised pl-9 pr-3 text-sm text-fg shadow-[0_0_0_1px_var(--color-line)] placeholder:text-subtle outline-none focus:shadow-[0_0_0_1px_var(--color-line-strong)]"
            />
            {open &&
              (hits.topics.length > 0 ||
                hits.specs.length > 0 ||
                hits.path.length > 0 ||
                hits.mix.length > 0) && (
              <div className="absolute right-0 top-[calc(100%+6px)] z-50 w-[min(100%,20rem)] overflow-hidden rounded-lg bg-surface shadow-[0_0_0_1px_var(--color-line)]">
                {hits.path.map((s) => (
                  <Link
                    key={s.n}
                    to="/yol"
                    className="block px-3 py-2.5 text-sm hover:bg-raised"
                  >
                    <span className="font-mono text-[11px] text-subtle">yol</span>
                    <span className="ml-2">{s.title}</span>
                  </Link>
                ))}
                {hits.mix.map((c) => (
                  <Link
                    key={c.id}
                    to="/karistirilanlar"
                    className="block px-3 py-2.5 text-sm hover:bg-raised"
                  >
                    <span className="font-mono text-[11px] text-subtle">yanlış</span>
                    <span className="ml-2">{c.right}</span>
                  </Link>
                ))}
                {hits.topics.map((t) => (
                  <Link
                    key={t.slug}
                    to="/atlas/$slug"
                    params={{ slug: t.slug }}
                    className="block px-3 py-2.5 text-sm hover:bg-raised"
                  >
                    <span className="font-mono text-[11px] text-subtle">{t.chapter}</span>
                    <span className="ml-2">{t.title}</span>
                  </Link>
                ))}
                {hits.specs.map((s) => (
                  <Link
                    key={s.id}
                    to="/katalog"
                    className="block px-3 py-2.5 text-sm hover:bg-raised"
                  >
                    <span className="font-mono text-[11px] text-subtle">kart</span>
                    <span className="ml-2">{s.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setChatOpen(true)}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-md bg-raised text-fg shadow-[0_0_0_1px_var(--color-line)] hover:shadow-[0_0_0_1px_var(--color-line-strong)] lg:hidden"
            aria-label="Sohbeti aç"
          >
            <MessageSquare className="size-4" />
          </button>
        </div>
        <div className="flex gap-1 overflow-x-auto border-t border-line px-4 py-1 lg:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="shrink-0 rounded-sm px-3 py-2 text-sm text-muted"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </header>

      <div id="icerik">{children}</div>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="font-display text-fg">{CORE.product}</p>
            <p className="mt-1 text-xs tracking-wide text-subtle">
              {CORE.role}: {makerName(CORE.maker)}
            </p>
          </div>
          <p>
            Ajan mimarisi, bellek ve düğüm atlası. Sohbet sapmaz; cevap verir. Çekirdek
            bellek silinmez.{" "}
            <Link to="/pc" className="text-fg underline-offset-2 hover:underline">
              PC’de çalıştır
            </Link>
          </p>
        </div>
      </footer>

      <ChatDock
        open={chatOpen}
        onOpenChange={setChatOpen}
        hidden={pathname === "/sohbet"}
      />
    </div>
  );
}
