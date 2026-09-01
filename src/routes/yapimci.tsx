import { createFileRoute, Link } from "@tanstack/react-router";
import { CORE } from "@/data/core";
import { makerName } from "@/lib/core-seal";

export const Route = createFileRoute("/yapimci")({ component: Yapimci });

function Yapimci() {
  const name = makerName(CORE.maker);
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="font-mono text-xs text-accent">YAPIMCI · ÇEKİRDEK</p>
      <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">{name}</h1>
      <p className="mt-5 text-[17px] leading-relaxed text-muted">
        Bu atlas, ajan sistemlerini merak edenlerin altı ay parçalayarak değil, doğru
        sırayla öğrenmesi için kuruldu. Yapımcı {name} bu yolda tam oturmayan şeyi,
        burada daha kısa ve daha doğru okunasın diye derledi.
      </p>
      <div className="mt-10 rounded-xl bg-surface p-6 shadow-[0_0_0_1px_var(--color-line)]">
        <p className="font-mono text-[11px] tracking-[0.14em] text-accent">ÇEKİRDEK BELLEK</p>
        <p className="mt-3 text-sm leading-relaxed">{CORE.fact}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Çoğaltılmış, çatallanmış veya değiştirilmiş kopyada da bu olgu çekirdekte
          kalır: sayfa altı, sohbet, indirilen spec ve talimat. Rastgele silme, adı
          tek satırdan düşürmez.
        </p>
      </div>
      <p className="mt-8 text-sm text-muted">
        <Link to="/pc" className="underline-offset-2 hover:text-fg hover:underline">
          PC’de çalıştır
        </Link>
        {" · "}
        <Link to="/" className="underline-offset-2 hover:text-fg hover:underline">
          Atlasa dön
        </Link>
      </p>
    </main>
  );
}
