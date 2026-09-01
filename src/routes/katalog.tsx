import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { useMemo, useState } from "react";
import { SpecCard } from "@/components/spec-card";
import { Button } from "@/components/ui/button";
import {
  kindLabels,
  kindOrder,
  specs,
  specsByKind,
  specsToMarkdown,
  type SpecKind,
} from "@/data/specs";
import { downloadText } from "@/lib/download";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/katalog")({ component: Katalog });

function Katalog() {
  const [kind, setKind] = useState<SpecKind | "hepsi">("hepsi");
  const list = useMemo(
    () => (kind === "hepsi" ? specs : specsByKind(kind)),
    [kind],
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="font-mono text-xs text-accent">KATALOG</p>
      <h1 className="mt-3 max-w-2xl font-display text-4xl leading-tight sm:text-5xl">
        İsim, görev, anlatım.
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Her parça tek kart. Görevi altında, kısa anlatım altında, spec dosyası indirilir.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setKind("hepsi")}
          className={cn(
            "h-10 rounded-sm px-3 text-sm shadow-[0_0_0_1px_var(--color-line)]",
            kind === "hepsi" ? "bg-accent text-accent-fg" : "bg-raised text-fg",
          )}
        >
          Hepsi
        </button>
        {kindOrder.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKind(k)}
            className={cn(
              "h-10 rounded-sm px-3 text-sm shadow-[0_0_0_1px_var(--color-line)]",
              kind === k ? "bg-accent text-accent-fg" : "bg-raised text-fg",
            )}
          >
            {kindLabels[k]}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() =>
            downloadText(
              kind === "hepsi" ? "korteks-katalog.md" : `korteks-${kind}.md`,
              specsToMarkdown(
                list,
                kind === "hepsi" ? "KORTEKS katalog" : kindLabels[kind],
              ),
            )
          }
        >
          <Download className="size-3.5" />
          Görünenleri indir
        </Button>
      </div>

      {kind === "hepsi" ? (
        <div className="mt-10 grid gap-12">
          {kindOrder.map((k) => {
            const group = specsByKind(k);
            return (
              <section key={k}>
                <div className="mb-4 flex items-end justify-between gap-3">
                  <h2 className="font-display text-2xl">{kindLabels[k]}</h2>
                  <button
                    type="button"
                    className="text-sm text-muted hover:text-fg"
                    onClick={() =>
                      downloadText(
                        `korteks-${k}.md`,
                        specsToMarkdown(group, kindLabels[k]),
                      )
                    }
                  >
                    Bölümü indir
                  </button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {group.map((s) => (
                    <SpecCard key={s.id} spec={s} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => (
            <SpecCard key={s.id} spec={s} />
          ))}
        </div>
      )}
    </main>
  );
}
