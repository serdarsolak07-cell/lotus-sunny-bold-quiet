import { Download } from "lucide-react";
import { kindLabels, specToMarkdown, type Spec } from "@/data/specs";
import { downloadText } from "@/lib/download";
import { Button } from "@/components/ui/button";

export function SpecCard({ spec }: { spec: Spec }) {
  return (
    <article className="flex flex-col rounded-xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)]">
      <p className="font-mono text-[11px] text-subtle">{kindLabels[spec.kind]}</p>
      <h3 className="mt-1 font-display text-xl leading-snug">{spec.name}</h3>
      <p className="mt-3 text-[11px] font-medium tracking-wide text-muted">Görev</p>
      <p className="mt-1 text-sm">{spec.task}</p>
      <p className="mt-3 text-[11px] font-medium tracking-wide text-muted">Kısa anlatım</p>
      <p className="mt-1 flex-1 text-sm leading-relaxed text-muted">{spec.summary}</p>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-4 w-full"
        onClick={() => downloadText(`korteks-${spec.id}.md`, specToMarkdown(spec))}
      >
        <Download className="size-3.5" />
        İndir
      </Button>
    </article>
  );
}
