const rows = [
  ["Yüzey", "Üretim, kamu, destek", "İzole laboratuvar, kırmızı takım"],
  ["Ret", "Yüksek ve istenen", "Düşük; suiistimal yüzeyi yüksek"],
  ["Talimat", "Daha tutarlı", "Daha ham, daha sapmalı"],
  ["Araç yetkisi", "Dar izin listesi", "Ağır yetki vermeyin"],
  ["Zekâ", "Filtre ≠ zekâ", "Filtresiz ≠ daha zeki"],
  ["Kullanma", "Varsayılan", "Günlük + insan + izolasyon"],
];

export function ModelCompare() {
  return (
    <div className="mb-12 overflow-x-auto rounded-xl shadow-[0_0_0_1px_var(--color-line)]">
      <table className="w-full min-w-[32rem] text-left text-sm">
        <thead className="bg-raised">
          <tr>
            <th className="px-4 py-3 font-medium text-muted">Ölçüt</th>
            <th className="px-4 py-3 font-medium">Filtreli</th>
            <th className="px-4 py-3 font-medium">Az hizalı / filtresiz</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]} className="border-t border-line">
              {r.map((c, i) => (
                <td key={i} className={i === 0 ? "px-4 py-3 text-muted" : "px-4 py-3"}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
