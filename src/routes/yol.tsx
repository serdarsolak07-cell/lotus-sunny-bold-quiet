import { createFileRoute, Link } from "@tanstack/react-router";
import { EXAMPLE, pathStops } from "@/data/learn";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/yol")({ component: Yol });

function Yol() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="font-mono text-xs text-accent">ÖĞRENME YOLU · 5 DURAK</p>
      <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
        Rastgele dolaşma. Bu sırayı bitir.
      </h1>
      <p className="mt-5 text-[17px] leading-relaxed text-muted">
        Atlas on altı bölümdür; meraklıya beş durak yeter. Gerisi sonra. Tek örnek:{" "}
        <strong className="font-medium text-fg">{EXAMPLE.name}</strong> — {EXAMPLE.what}
      </p>

      <ol className="mt-12 grid gap-4">
        {pathStops.map((s) => (
          <li key={s.n}>
            <Link
              to="/atlas/$slug"
              params={{ slug: s.slug }}
              className="block rounded-xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-line)] hover:shadow-[0_0_0_1px_var(--color-line-strong)]"
            >
              <p className="font-mono text-[11px] text-subtle">DURAK {s.n}</p>
              <h2 className="mt-2 font-display text-2xl">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed">{s.rule}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {EXAMPLE.name}: {s.defter}
              </p>
            </Link>
          </li>
        ))}
      </ol>

      <aside className="mt-12 rounded-xl bg-raised p-5 shadow-[0_0_0_1px_var(--color-line)]">
        <p className="font-mono text-[11px] tracking-[0.14em] text-accent">SONRA</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Beş durak bitmeden korteks, öğrenme kuramı ve laboratuvara girme. Karışan
          cümleler için yanlışlar sayfası. Yığın sınamak için test — o, okuyanı değil
          kurguyu döver.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link to="/karistirilanlar">Karıştırılanlar</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/test">Yığın testi</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/laboratuvar">Laboratuvar</Link>
          </Button>
        </div>
      </aside>
    </main>
  );
}
