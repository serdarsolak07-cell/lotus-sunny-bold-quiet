import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { TopicMap } from "@/components/topic-map";
import { agents, groups, topics } from "@/data/catalog";
import { CORE } from "@/data/core";
import { makerName } from "@/lib/core-seal";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pt-16">
        <p className="font-mono text-xs tracking-[0.18em] text-accent">ÖĞRENME YOLU · 5 DURAK · ATLAS 16</p>
        <h1 className="mt-4 max-w-3xl font-display text-[2.4rem] leading-[1.08] tracking-[-0.035em] sm:text-5xl md:text-[3.4rem]">
          Ajan sistemlerini doğru sırayla öğren.
        </h1>
        <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-muted">
          Rastgele kart okumak altı ay yer. KORTEKS meraklıya beş durak verir; tek örnek
          Defter her durakta büyür. Atlas derinliğe sonra. Sohbet sapmaz.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/yol">
              Öğrenme yolu
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/karistirilanlar">Karıştırılanlar</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/sohbet">Atlasa sor</Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-2xl">Konu haritası</h2>
          <p className="text-sm text-muted">Düğüme bas, bölüme gir.</p>
        </div>
        <TopicMap />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <h2 className="font-display text-2xl">Bölümler</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((t) => (
            <Link
              key={t.slug}
              to="/atlas/$slug"
              params={{ slug: t.slug }}
              className="group rounded-xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-line)] transition-[box-shadow] duration-150 hover:shadow-[0_0_0_1px_var(--color-line-strong)]"
            >
              <p className="font-mono text-[11px] text-subtle">
                {t.chapter} · {groups[t.group]}
              </p>
              <h3 className="mt-2 font-display text-xl leading-snug">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="font-display text-2xl">Rol sözleşmeleri</h2>
            <p className="mt-2 text-sm text-muted">
              İsim süs değildir. Yetki, araç ve çıktı sınırıdır.
            </p>
            <div className="mt-5 overflow-hidden rounded-xl shadow-[0_0_0_1px_var(--color-line)]">
              <table className="w-full text-left text-sm">
                <thead className="bg-raised text-muted">
                  <tr>
                    <th className="px-4 py-3 font-medium">Ajan</th>
                    <th className="px-4 py-3 font-medium">Model</th>
                    <th className="hidden px-4 py-3 font-medium sm:table-cell">Görev</th>
                  </tr>
                </thead>
                <tbody>
                  {agents.map((a) => (
                    <tr key={a.name} className="border-t border-line">
                      <td className="px-4 py-3 font-medium">{a.name}</td>
                      <td className="px-4 py-3 text-muted">{a.model}</td>
                      <td className="hidden px-4 py-3 text-muted sm:table-cell">{a.task}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <aside className="rounded-xl bg-surface p-6 shadow-[0_0_0_1px_var(--color-line)]">
            <p className="font-mono text-[11px] tracking-[0.14em] text-accent">KURAL</p>
            <h3 className="mt-3 font-display text-2xl leading-snug">
              Kullanıcıyı menüye çekme. Cevabı ver.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Atlas sohbeti konu dışı sapmaz, ürün turu yapmaz, “başka bir şey ister
              misiniz” demez. Bilmiyorsa bilmediğini söyler. Filtreli modeller üretim
              yüzüdür; az hizalı modeller izole laboratuvardır.
            </p>
            <Button asChild variant="outline" className="mt-6">
              <Link to="/atlas/$slug" params={{ slug: "modeller" }}>
                Modellere git
              </Link>
            </Button>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <p className="font-mono text-xs tracking-[0.18em] text-accent">YAPIMCI</p>
        <h2 className="mt-3 font-display text-3xl">{makerName(CORE.maker)}</h2>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-muted">
          Ajan sistemlerini merak edenler doğru sırayla öğrensin diye. Öğrenmesi uzun
          süren şeyi burada parçalamadan okuyasınız. Çekirdek bellek: yapımcı{" "}
          {makerName(CORE.maker)}. Çoğaltma bu olguyu silmez.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link to="/yapimci">Yapımcı bölümü</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/pc">PC’de çalıştır</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
