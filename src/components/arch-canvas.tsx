import { architectures } from "@/data/catalog";
import { cn } from "@/lib/utils";

const graphs: Record<string, { nodes: { id: string; x: number; y: number; label: string }[]; edges: [string, string][] }> =
  {
    react: {
      nodes: [
        { id: "u", x: 18, y: 50, label: "Kullanıcı" },
        { id: "t", x: 50, y: 50, label: "LLM" },
        { id: "o", x: 82, y: 28, label: "Araç" },
        { id: "g", x: 82, y: 72, label: "Gözlem" },
      ],
      edges: [
        ["u", "t"],
        ["t", "o"],
        ["o", "g"],
        ["g", "t"],
      ],
    },
    plan: {
      nodes: [
        { id: "p", x: 22, y: 36, label: "Plan" },
        { id: "e", x: 50, y: 36, label: "İcra" },
        { id: "c", x: 78, y: 36, label: "Kritik" },
        { id: "r", x: 50, y: 72, label: "Yeniden plan" },
      ],
      edges: [
        ["p", "e"],
        ["e", "c"],
        ["c", "r"],
        ["r", "p"],
      ],
    },
    supervisor: {
      nodes: [
        { id: "s", x: 50, y: 22, label: "Supervisor" },
        { id: "a", x: 22, y: 62, label: "Araştırma" },
        { id: "b", x: 50, y: 78, label: "İcra" },
        { id: "c", x: 78, y: 62, label: "Kritik" },
      ],
      edges: [
        ["s", "a"],
        ["s", "b"],
        ["s", "c"],
        ["a", "s"],
        ["b", "s"],
        ["c", "s"],
      ],
    },
    swarm: {
      nodes: [
        { id: "a", x: 30, y: 32, label: "A" },
        { id: "b", x: 70, y: 32, label: "B" },
        { id: "c", x: 30, y: 70, label: "C" },
        { id: "d", x: 70, y: 70, label: "D" },
      ],
      edges: [
        ["a", "b"],
        ["b", "d"],
        ["d", "c"],
        ["c", "a"],
        ["a", "d"],
      ],
    },
    graph: {
      nodes: [
        { id: "st", x: 14, y: 50, label: "Start" },
        { id: "r", x: 36, y: 50, label: "Router" },
        { id: "l", x: 58, y: 28, label: "LLM" },
        { id: "to", x: 58, y: 72, label: "Tool" },
        { id: "h", x: 80, y: 50, label: "Human" },
      ],
      edges: [
        ["st", "r"],
        ["r", "l"],
        ["r", "to"],
        ["l", "h"],
        ["to", "h"],
      ],
    },
  };

export function ArchCanvas({
  active,
  onPick,
}: {
  active: string;
  onPick: (id: string) => void;
}) {
  const g = graphs[active] ?? graphs.react;
  const node = (id: string) => g.nodes.find((n) => n.id === id);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {architectures.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => onPick(a.id)}
            className={cn(
              "h-10 rounded-sm px-3 text-sm shadow-[0_0_0_1px_var(--color-line)]",
              active === a.id ? "bg-accent text-accent-fg" : "bg-raised text-fg",
            )}
          >
            {a.name}
          </button>
        ))}
      </div>
      <div className="mt-4 overflow-hidden rounded-lg bg-inset shadow-[0_0_0_1px_var(--color-line)]">
        <svg viewBox="0 0 100 100" className="h-64 w-full sm:h-72">
          {g.edges.map(([a, b], i) => {
            const na = node(a);
            const nb = node(b);
            if (!na || !nb) return null;
            return (
              <line
                key={i}
                x1={na.x}
                y1={na.y}
                x2={nb.x}
                y2={nb.y}
                stroke="currentColor"
                className="text-accent"
                strokeWidth="0.45"
                opacity="0.7"
              />
            );
          })}
          {g.nodes.map((n) => (
            <g key={n.id}>
              <circle cx={n.x} cy={n.y} r="4.2" className="fill-raised stroke-line-strong" strokeWidth="0.4" />
              <text
                x={n.x}
                y={n.y + 8.8}
                textAnchor="middle"
                className="fill-fg"
                fontSize="3.4"
                fontFamily="Source Sans 3, sans-serif"
              >
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <p className="mt-3 text-sm text-muted">
        {architectures.find((a) => a.id === active)?.blurb}
      </p>
    </div>
  );
}
