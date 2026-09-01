const layers = [
  { name: "Çalışma", desc: "Pencere. Şimdi. Pahalı." },
  { name: "Çekirdek", desc: "Her zaman yüklü gerçekler." },
  { name: "Epizodik", desc: "Oturumlar, olaylar, zaman." },
  { name: "Anlamsal", desc: "Olgular, doküman, vektör." },
  { name: "Yordamsal", desc: "Beceriler ve playbook." },
];

export function MemoryStack() {
  return (
    <ol className="grid gap-2">
      {layers.map((l, i) => (
        <li
          key={l.name}
          className="flex items-center gap-4 rounded-lg bg-raised px-4 py-3 shadow-[0_0_0_1px_var(--color-line)]"
          style={{ marginLeft: `${i * 8}px` }}
        >
          <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <p className="text-sm font-medium">{l.name}</p>
            <p className="text-sm text-muted">{l.desc}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
