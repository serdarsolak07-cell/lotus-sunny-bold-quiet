import { createFileRoute, Link } from "@tanstack/react-router";
import { groups, topics } from "@/data/catalog";

export const Route = createFileRoute("/atlas/")({ component: AtlasIndex });

function AtlasIndex() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="font-mono text-xs text-accent">ATLAS</p>
      <h1 className="mt-3 font-display text-4xl">On altı bölüm</h1>
      <p className="mt-3 max-w-xl text-muted">
        Derinlik burada. Meraklıysan önce{" "}
        <Link to="/yol" className="text-fg underline-offset-2 hover:underline">
          öğrenme yolunu
        </Link>{" "}
        bitir. Tek örnek Defter her bölümde bir parça ekler.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {topics.map((t) => (
          <Link
            key={t.slug}
            to="/atlas/$slug"
            params={{ slug: t.slug }}
            className="rounded-xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-line)] hover:shadow-[0_0_0_1px_var(--color-line-strong)]"
          >
            <p className="font-mono text-[11px] text-subtle">
              {t.chapter} · {groups[t.group]}
            </p>
            <h2 className="mt-2 font-display text-2xl">{t.title}</h2>
            <p className="mt-2 text-sm text-muted">{t.summary}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
