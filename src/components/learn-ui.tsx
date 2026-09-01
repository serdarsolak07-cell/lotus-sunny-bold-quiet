import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { EXAMPLE, nextStop } from "@/data/learn";

export function DefterBeat({ stage, text, adds }: { stage: string; text: string; adds: string }) {
  return (
    <aside className="mb-10 max-w-2xl rounded-xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-line)]">
      <p className="font-mono text-[11px] tracking-[0.14em] text-accent">
        {EXAMPLE.name} · {stage}
      </p>
      <p className="mt-2 text-sm leading-relaxed">{text}</p>
      <p className="mt-2 text-xs text-muted">Bu durakta eklenen: {adds}</p>
    </aside>
  );
}

export function WrongWhy({ claim, why }: { claim: string; why: string }) {
  const [open, setOpen] = useState(false);
  return (
    <section className="mt-10 max-w-2xl rounded-xl bg-raised p-5 shadow-[0_0_0_1px_var(--color-line)]">
      <p className="font-mono text-[11px] tracking-[0.14em] text-accent">BU NEDEN YANLIŞ?</p>
      <p className="mt-3 font-display text-xl leading-snug">{claim}</p>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mt-4 min-h-11 rounded-md bg-surface px-4 text-sm shadow-[0_0_0_1px_var(--color-line)] hover:shadow-[0_0_0_1px_var(--color-line-strong)]"
      >
        {open ? "Gizle" : "Neden"}
      </button>
      {open && <p className="mt-4 text-sm leading-relaxed text-muted">{why}</p>}
    </section>
  );
}

export function PathNext({ slug }: { slug: string }) {
  const n = nextStop(slug);
  if (!n) return null;
  return (
    <p className="mt-8 max-w-2xl text-sm text-muted">
      Yoldaki sonraki durak:{" "}
      <Link
        to="/atlas/$slug"
        params={{ slug: n.slug }}
        className="text-fg underline-offset-2 hover:underline"
      >
        {n.n} {n.title}
      </Link>
    </p>
  );
}
