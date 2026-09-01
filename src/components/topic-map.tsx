import { Link } from "@tanstack/react-router";
import { topics } from "@/data/catalog";

const positions = [
  [18, 48],
  [30, 26],
  [48, 20],
  [66, 24],
  [80, 38],
  [82, 58],
  [72, 76],
  [52, 80],
  [34, 76],
  [22, 66],
  [42, 48],
  [58, 44],
  [62, 62],
  [46, 62],
  [70, 50],
  [54, 32],
];

export function TopicMap() {
  return (
    <div>
      <div className="relative hidden overflow-hidden rounded-xl bg-inset shadow-[0_0_0_1px_var(--color-line)] sm:block">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-[22rem] w-full" aria-hidden>
          <g stroke="currentColor" className="text-line-strong" strokeWidth="0.18">
            {positions.map(([x, y], i) => {
              const [nx, ny] = positions[(i + 1) % positions.length] ?? [x, y];
              const [mx, my] = positions[(i + 4) % positions.length] ?? [x, y];
              return (
                <g key={i}>
                  <line x1={x} y1={y} x2={nx} y2={ny} />
                  <line x1={x} y1={y} x2={mx} y2={my} opacity="0.4" />
                </g>
              );
            })}
          </g>
        </svg>
        {topics.map((t, i) => {
          const [x, y] = positions[i] ?? [50, 50];
          return (
            <Link
              key={t.slug}
              to="/atlas/$slug"
              params={{ slug: t.slug }}
              title={t.title}
              className="absolute grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-raised font-mono text-[11px] text-fg shadow-[0_0_0_1px_var(--color-accent)] hover:bg-accent hover:text-accent-fg"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {t.chapter}
            </Link>
          );
        })}
      </div>
      <div className="grid overflow-hidden rounded-xl shadow-[0_0_0_1px_var(--color-line)] sm:hidden">
        {topics.map((t) => (
          <Link
            key={t.slug}
            to="/atlas/$slug"
            params={{ slug: t.slug }}
            className="flex min-h-11 items-center border-b border-line bg-surface px-4 py-3 last:border-b-0"
          >
            <span className="mr-3 font-mono text-[11px] text-subtle">{t.chapter}</span>
            {t.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
