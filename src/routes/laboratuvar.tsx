import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  type Arch,
  type Goal,
  type Memory,
  type ModelMix,
  archs,
  goals,
  memories,
  mixes,
  recommend,
} from "@/data/lab";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/laboratuvar")({ component: Lab });

function ChipGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: T; label: string; hint: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 font-mono text-[11px] tracking-[0.14em] text-subtle">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => onChange(o.id)}
            className={cn(
              "min-h-11 rounded-md px-3 py-2 text-left text-sm shadow-[0_0_0_1px_var(--color-line)]",
              value === o.id ? "bg-accent text-accent-fg" : "bg-raised text-fg",
            )}
          >
            <span className="block font-medium">{o.label}</span>
            <span className={cn("block text-xs", value === o.id ? "opacity-80" : "text-muted")}>
              {o.hint}
            </span>
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function Lab() {
  const [goal, setGoal] = useState<Goal>("kod");
  const [mix, setMix] = useState<ModelMix>("karisik");
  const [arch, setArch] = useState<Arch>("graph");
  const [memory, setMemory] = useState<Memory>("korteks");
  const recipe = useMemo(
    () => recommend({ goal, mix, arch, memory }),
    [goal, mix, arch, memory],
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="font-mono text-xs text-accent">LABORATUVAR</p>
      <h1 className="mt-3 max-w-2xl font-display text-4xl leading-tight sm:text-5xl">
        Hedefi söyleyin, yığını kurun.
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Dört seçim: iş, model karışımı, topoloji, bellek. Öneri sapmaz; uyarı varsa önce onu okuyun.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_22rem]">
        <div className="grid gap-8">
          <ChipGroup label="Hedef" options={goals} value={goal} onChange={setGoal} />
          <ChipGroup label="Modeller" options={mixes} value={mix} onChange={setMix} />
          <ChipGroup label="Mimari" options={archs} value={arch} onChange={setArch} />
          <ChipGroup label="Bellek" options={memories} value={memory} onChange={setMemory} />
        </div>

        <aside className="rounded-xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-line)] lg:sticky lg:top-24 h-fit">
          <p className="font-mono text-[11px] text-subtle">ÖNERİ</p>
          <h2 className="mt-2 font-display text-2xl">{recipe.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{recipe.verdict}</p>
          {recipe.warn && (
            <p className="mt-4 rounded-md bg-bg px-3 py-2 text-sm text-danger shadow-[0_0_0_1px_var(--color-line)]">
              {recipe.warn}
            </p>
          )}
          <dl className="mt-5 grid gap-3 text-sm">
            <div>
              <dt className="text-subtle">Ajanlar</dt>
              <dd className="mt-1">{recipe.agents.join(" · ")}</dd>
            </div>
            <div>
              <dt className="text-subtle">Düğümler</dt>
              <dd className="mt-1">{recipe.nodes.join(" · ")}</dd>
            </div>
            <div>
              <dt className="text-subtle">Bağlantı</dt>
              <dd className="mt-1">{recipe.connect}</dd>
            </div>
          </dl>
          <ul className="mt-5 grid gap-2">
            {recipe.stack.map((s) => (
              <li key={s} className="border-l-2 border-accent/50 pl-3 text-sm text-muted">
                {s}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </main>
  );
}
