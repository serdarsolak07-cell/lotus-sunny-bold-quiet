import { createFileRoute, Link } from "@tanstack/react-router";
import { confusions } from "@/data/learn";

export const Route = createFileRoute("/karistirilanlar")({ component: Yanlislar });

function Yanlislar() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="font-mono text-xs text-accent">KARIŞTIRILANLAR</p>
      <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
        Altı ayı yiyen cümleler.
      </h1>
      <p className="mt-5 text-[17px] leading-relaxed text-muted">
        Bunlar araç eksiği değil. Yanlış eşitleme. Birini düzeltmeden atlası okumak,
        aynı dairede dönmektir.
      </p>
      <ul className="mt-12 grid gap-4">
        {confusions.map((c) => (
          <li
            key={c.id}
            className="rounded-xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-line)]"
          >
            <p className="text-sm text-muted line-through decoration-accent/60">{c.wrong}</p>
            <p className="mt-2 font-display text-2xl leading-snug">{c.right}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{c.why}</p>
            <Link
              to="/atlas/$slug"
              params={{ slug: c.slug }}
              className="mt-4 inline-block min-h-11 py-2 text-sm underline-offset-2 hover:underline"
            >
              Bölüme git
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-sm text-muted">
        Sıra için{" "}
        <Link to="/yol" className="text-fg underline-offset-2 hover:underline">
          öğrenme yolu
        </Link>
        .
      </p>
    </main>
  );
}
