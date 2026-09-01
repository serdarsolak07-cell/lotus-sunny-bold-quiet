import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArchCanvas } from "@/components/arch-canvas";
import { MemoryStack } from "@/components/memory-stack";
import { ModelCompare } from "@/components/model-compare";
import { connections, getTopic, groups, nodeTypes, topics } from "@/data/catalog";
import { beatFor, quizFor, stopFor } from "@/data/learn";
import { DefterBeat, PathNext, WrongWhy } from "@/components/learn-ui";

export const Route = createFileRoute("/atlas/$slug")({
  component: Article,
  loader: ({ params }) => {
    const topic = getTopic(params.slug);
    if (!topic) throw notFound();
    return { topic };
  },
  notFoundComponent: () => (
    <main className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="font-display text-3xl">Bölüm yok</h1>
      <Link to="/" className="mt-4 inline-block text-sm text-muted hover:text-fg">
        Atlasa dön
      </Link>
    </main>
  ),
});

function Article() {
  const { topic } = Route.useLoaderData();
  const [arch, setArch] = useState("graph");
  const related = topics.filter((t) => topic.related.includes(t.slug));
  const beat = beatFor(topic.slug);
  const quiz = quizFor(topic.slug);
  const stop = stopFor(topic.slug);

  return (
    <main className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_16rem]">
      <article>
        <p className="font-mono text-xs text-accent">
          {topic.chapter} · {groups[topic.group]}
        </p>
        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">{topic.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{topic.kicker}</p>
        {stop && (
          <p className="mt-3 max-w-2xl font-mono text-xs tracking-wide text-subtle">
            Yol · durak kuralı: {stop.rule}
          </p>
        )}

        {beat && <div className="mt-8"><DefterBeat stage={beat.stage} text={beat.text} adds={beat.adds} /></div>}

        <div className="prose-atlas mt-10 max-w-2xl text-[16.5px] leading-[1.65]">
          {topic.sections.map((s) => (
            <section key={s.heading} className="mb-10">
              <h2 className="mb-3 font-display text-2xl">{s.heading}</h2>
              {s.body.map((p) => (
                <p key={p.slice(0, 48)} className="text-fg/95">
                  {p}
                </p>
              ))}
              {s.bullets && (
                <ul>
                  {s.bullets.map((b) => (
                    <li key={b} className="text-[15.5px] leading-relaxed">
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {s.callout && (
                <aside className="mt-5 rounded-lg bg-raised px-4 py-4 shadow-[0_0_0_1px_var(--color-line)]">
                  <p className="font-mono text-[11px] text-accent">{s.callout.title}</p>
                  <p className="mt-1 text-sm leading-relaxed">{s.callout.text}</p>
                </aside>
              )}
            </section>
          ))}
        </div>

        {topic.slug === "modeller" && <ModelCompare />}
        {topic.slug === "ajan-mimarileri" && (
          <div className="mb-12 max-w-2xl">
            <ArchCanvas active={arch} onPick={setArch} />
          </div>
        )}
        {topic.slug === "hafiza" && (
          <div className="mb-12 max-w-xl">
            <MemoryStack />
          </div>
        )}
        {topic.slug === "dugumler" && (
          <ul className="mb-12 grid max-w-2xl grid-cols-2 gap-2 sm:grid-cols-3">
            {nodeTypes.map((n) => (
              <li key={n.id} className="rounded-lg bg-raised p-3 shadow-[0_0_0_1px_var(--color-line)]">
                <p className="text-sm font-medium">{n.name}</p>
                <p className="mt-1 text-xs text-muted">{n.use}</p>
              </li>
            ))}
          </ul>
        )}
        {topic.slug === "baglanma" && (
          <ul className="mb-12 grid max-w-2xl gap-2">
            {connections.map((c) => (
              <li
                key={c.id}
                className="flex items-baseline justify-between gap-4 rounded-lg bg-raised px-4 py-3 shadow-[0_0_0_1px_var(--color-line)]"
              >
                <span className="text-sm font-medium">{c.name}</span>
                <span className="text-sm text-muted">{c.when}</span>
              </li>
            ))}
          </ul>
        )}

        <section className="max-w-2xl">
          <h2 className="font-display text-2xl">Nerede, nasıl</h2>
          <div className="mt-4 grid gap-3">
            {topic.uses.map((u) => (
              <div key={u.where} className="rounded-lg bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)]">
                <p className="text-sm font-medium">{u.where}</p>
                <p className="mt-1 text-sm text-muted">{u.how}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 max-w-2xl">
          <h2 className="font-display text-2xl">Sık kırılma</h2>
          <ul className="mt-3 grid gap-2">
            {topic.pitfalls.map((p) => (
              <li key={p} className="border-l-2 border-accent/50 pl-3 text-sm leading-relaxed text-muted">
                {p}
              </li>
            ))}
          </ul>
        </section>

        {quiz && <WrongWhy claim={quiz.claim} why={quiz.why} />}
        <PathNext slug={topic.slug} />
      </article>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <p className="font-mono text-[11px] text-subtle">İLGİLİ</p>
        <ul className="mt-3 grid gap-2">
          {related.map((r) => (
            <li key={r.slug}>
              <Link
                to="/atlas/$slug"
                params={{ slug: r.slug }}
                className="block rounded-md px-3 py-2 text-sm hover:bg-raised"
              >
                <span className="font-mono text-[11px] text-subtle">{r.chapter}</span>
                <span className="ml-2">{r.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </main>
  );
}
