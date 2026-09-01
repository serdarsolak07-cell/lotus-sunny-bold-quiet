import { createFileRoute } from "@tanstack/react-router";
import { Download, Play } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { kindLabels, kindOrder, specs } from "@/data/specs";
import { downloadText } from "@/lib/download";
import { enrichPlaybook } from "@/lib/enrich";
import {
  presets,
  runHarness,
  summarize,
  testKindLabels,
  type StackConfig,
  type TestKind,
  type TestResult,
} from "@/lib/harness";
import { buildPlaybook, bundlePlaybook, targets, type Target } from "@/lib/playbook";
import { probeSystem } from "@/lib/probe";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/test")({ component: TestPage });

const empty: StackConfig = {
  specIds: [],
  face: "kamu",
  maxTurns: true,
  compress: true,
};

function TestPage() {
  const [config, setConfig] = useState<StackConfig>(presets[0]?.config ?? empty);
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [live, setLive] = useState<{
    ok: false;
    error: string;
    ms?: number;
  } | {
    ok: true;
    text: string;
    ms: number;
    checks: { mantik: boolean; hiz: boolean; dogruluk: boolean; divert: boolean };
  } | null>(null);
  const [pending, setPending] = useState(false);
  const [livePending, setLivePending] = useState(false);
  const [target, setTarget] = useState<Target>("genel");
  const [enriched, setEnriched] = useState<string | null>(null);
  const [enrichError, setEnrichError] = useState<string | null>(null);
  const [enrichPending, setEnrichPending] = useState(false);
  const outRef = useRef<HTMLElement | null>(null);

  const selected = useMemo(() => new Set(config.specIds), [config.specIds]);
  const summary = results ? summarize(results) : null;
  const playbook = results ? buildPlaybook(config, results) : null;

  function toggle(id: string) {
    setResults(null);
    setEnriched(null);
    setEnrichError(null);
    setConfig((c) => ({
      ...c,
      specIds: c.specIds.includes(id) ? c.specIds.filter((x) => x !== id) : [...c.specIds, id],
    }));
  }

  function run() {
    setPending(true);
    const t0 = performance.now();
    const rs = runHarness(config);
    const wait = Math.max(0, 280 - (performance.now() - t0));
    window.setTimeout(() => {
      setResults(rs);
      setEnriched(null);
      setEnrichError(null);
      setPending(false);
      window.setTimeout(() => {
        outRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 40);
    }, wait);
  }

  async function liveProbe() {
    setLivePending(true);
    setLive(null);
    try {
      setLive(await probeSystem());
    } catch {
      setLive({ ok: false as const, error: "Yoklama kopuk." });
    } finally {
      setLivePending(false);
    }
  }

  function downloadReport() {
    if (!results || !summary) return;
    const lines = [
      `# KORTEKS test raporu`,
      ``,
      `Yüzey: ${config.face}`,
      `Tur tavanı: ${config.maxTurns ? "var" : "yok"}`,
      `Sıkıştırma: ${config.compress ? "var" : "yok"}`,
      `Parça: ${config.specIds.join(", ") || "yok"}`,
      ``,
      `Özet: ${summary.pass}/${summary.total} geçti, sessiz kaçak ${summary.silentFail}, ${summary.ms}ms`,
      ``,
      ...results.map(
        (r) =>
          `## ${r.pass ? "GEÇTİ" : "KALDI"} · ${testKindLabels[r.kind]} · ${r.name}${r.silent ? " (sessiz)" : ""}\n${r.detail}\n`,
      ),
    ];
    downloadText("korteks-test-raporu.md", lines.join("\n"));
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="font-mono text-xs text-accent">TEST · KURGULAMA</p>
      <h1 className="mt-3 max-w-2xl font-display text-4xl leading-tight sm:text-5xl">
        Yığını kurun, sistemin gerçekten çalıştığını görün.
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Dört seçim değil: parçayı seçin, test edin. Geçerse talimat üretilir —
        LangGraph, CrewAI, n8n, Letta veya Grok üzerinde aynı yığını hayata geçirmek için.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {presets.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => {
              setConfig(p.config);
              setResults(null);
              setLive(null);
              setEnriched(null);
              setEnrichError(null);
            }}
            className="rounded-md bg-raised px-3 py-2 text-left text-sm shadow-[0_0_0_1px_var(--color-line)] hover:shadow-[0_0_0_1px_var(--color-line-strong)]"
          >
            <span className="block font-medium">{p.name}</span>
            <span className="block text-xs text-muted">{p.hint}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-8 lg:grid lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setResults(null);
                setEnriched(null);
                setConfig((c) => ({ ...c, face: c.face === "kamu" ? "ic" : "kamu" }));
              }}
              className={cn(
                "h-10 rounded-sm px-3 text-sm shadow-[0_0_0_1px_var(--color-line)]",
                "bg-raised",
              )}
            >
              Yüzey: {config.face === "kamu" ? "kamu" : "iç"}
            </button>
            <button
              type="button"
              onClick={() => {
                setResults(null);
                setEnriched(null);
                setConfig((c) => ({ ...c, maxTurns: !c.maxTurns }));
              }}
              className={cn(
                "h-10 rounded-sm px-3 text-sm shadow-[0_0_0_1px_var(--color-line)]",
                config.maxTurns ? "bg-accent text-accent-fg" : "bg-raised",
              )}
            >
              Tur tavanı
            </button>
            <button
              type="button"
              onClick={() => {
                setResults(null);
                setEnriched(null);
                setConfig((c) => ({ ...c, compress: !c.compress }));
              }}
              className={cn(
                "h-10 rounded-sm px-3 text-sm shadow-[0_0_0_1px_var(--color-line)]",
                config.compress ? "bg-accent text-accent-fg" : "bg-raised",
              )}
            >
              Sıkıştırma
            </button>
          </div>

          <div className="mt-8 grid gap-8">
            {kindOrder.map((k) => (
              <section key={k}>
                <h2 className="font-display text-xl">{kindLabels[k]}</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {specs
                    .filter((s) => s.kind === k)
                    .map((s) => {
                      const on = selected.has(s.id);
                      return (
                        <button
                          key={s.id}
                          type="button"
                          title={s.summary}
                          onClick={() => toggle(s.id)}
                          className={cn(
                            "min-h-11 rounded-md px-3 py-2 text-left text-sm shadow-[0_0_0_1px_var(--color-line)]",
                            on ? "bg-accent text-accent-fg" : "bg-raised text-fg",
                          )}
                        >
                          <span className="block font-medium">{s.name}</span>
                          <span className={cn("block text-xs", on ? "opacity-80" : "text-muted")}>
                            {s.task}
                          </span>
                        </button>
                      );
                    })}
                </div>
              </section>
            ))}
          </div>
        </div>

        <aside className="order-first h-fit rounded-xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-line)] lg:order-last lg:col-span-4">
          <p className="font-mono text-[11px] text-subtle">KOŞU</p>
          <p className="mt-2 text-sm text-muted">{config.specIds.length} parça seçili.</p>
          <Button type="button" className="mt-4 w-full" onClick={run} disabled={pending}>
            <Play className="size-4" />
            {pending ? "Koşuluyor" : "Testleri çalıştır"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="mt-2 w-full"
            onClick={() => void liveProbe()}
            disabled={livePending}
          >
            {livePending ? "Yoklanıyor" : "Canlı yoklama"}
          </Button>

          {summary && (
            <div className="mt-5 grid gap-3">
              <p className="font-display text-2xl">
                {summary.pass}/{summary.total} geçti
              </p>
              <p className="text-sm text-muted">
                Sessiz kaçak: {summary.silentFail} · {summary.ms} ms
              </p>
              {(Object.keys(testKindLabels) as TestKind[]).map((k) => (
                <p key={k} className="text-sm">
                  {testKindLabels[k]}: {summary[k].pass}/{summary[k].total}
                </p>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={downloadReport}>
                <Download className="size-3.5" />
                Raporu indir
              </Button>
              {playbook?.ready && (
                <Button
                  type="button"
                  size="sm"
                  className="w-full"
                  onClick={() =>
                    downloadText(
                      `korteks-talimat-${target}.md`,
                      playbook.files[target],
                    )
                  }
                >
                  <Download className="size-3.5" />
                  Talimatı indir
                </Button>
              )}
            </div>
          )}

          {live && (
            <div className="mt-5 rounded-md bg-bg p-3 shadow-[0_0_0_1px_var(--color-line)]">
              <p className="font-mono text-[11px] text-subtle">CANLI</p>
              {live.ok ? (
                <ul className="mt-2 grid gap-1 text-sm">
                  <li>Mantık: {live.checks.mantik ? "geçti" : "kaldı"}</li>
                  <li>Hız: {live.checks.hiz ? "geçti" : "kaldı"} ({live.ms} ms)</li>
                  <li>Doğruluk: {live.checks.dogruluk ? "geçti" : "kaldı"}</li>
                  <li>Sapma yok: {live.checks.divert ? "geçti" : "kaldı"}</li>
                </ul>
              ) : (
                <p className="mt-2 text-sm text-danger">{live.error}</p>
              )}
            </div>
          )}
        </aside>
      </div>

      {results && (
        <section ref={outRef} className="mt-12 scroll-mt-24">
          <h2 className="font-display text-2xl">Sonuçlar</h2>
          <div className="mt-5 grid gap-6">
            {(Object.keys(testKindLabels) as TestKind[]).map((k) => (
              <div key={k}>
                <h3 className="font-display text-lg">{testKindLabels[k]}</h3>
                <ul className="mt-3 grid gap-2">
                  {results
                    .filter((r) => r.kind === k)
                    .map((r) => (
                      <li
                        key={r.id}
                        className="rounded-lg bg-raised px-4 py-3 shadow-[0_0_0_1px_var(--color-line)]"
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <p className="text-sm font-medium">
                            {r.pass ? "Geçti" : "Kaldı"} · {r.name}
                            {r.silent ? " · sessiz" : ""}
                          </p>
                          <p className="font-mono text-[11px] text-subtle">{r.ms} ms</p>
                        </div>
                        <p className={cn("mt-1 text-sm", r.pass ? "text-muted" : "text-danger")}>
                          {r.detail}
                        </p>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {playbook && (
        <section className="mt-12 mb-8">
          <p className="font-mono text-xs text-accent">HAYATA GEÇİR</p>
          <h2 className="mt-2 font-display text-2xl">{playbook.title}</h2>
          {playbook.ready ? (
            <p className="mt-2 max-w-2xl text-sm text-muted">
              Testler geçti. Aşağıdaki talimat bu yığını LangGraph, CrewAI, n8n, Letta
              veya Grok API üzerinde kurmak içindir. Başka bir yapay zeka sistemine
              olduğu gibi verilebilir.
            </p>
          ) : (
            <div className="mt-3 max-w-2xl rounded-lg bg-raised px-4 py-3 shadow-[0_0_0_1px_var(--color-line)]">
              <p className="text-sm text-danger">
                Sistem henüz doğru çalışmıyor. Talimat üretilmez; önce kaçakları kapatın.
              </p>
              <ul className="mt-2 grid gap-1">
                {playbook.blockers.map((b) => (
                  <li key={b} className="border-l-2 border-accent/50 pl-3 text-sm text-muted">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {playbook.ready && (
            <>
              <div className="mt-5 flex flex-wrap gap-2">
                {targets.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setTarget(t.id);
                      setEnriched(null);
                      setEnrichError(null);
                    }}
                    className={cn(
                      "h-10 rounded-sm px-3 text-sm shadow-[0_0_0_1px_var(--color-line)]",
                      target === t.id ? "bg-accent text-accent-fg" : "bg-raised text-fg",
                    )}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
              <pre className="mt-5 max-h-[28rem] overflow-auto whitespace-pre-wrap rounded-xl bg-inset p-4 font-mono text-[13px] leading-relaxed text-fg shadow-[0_0_0_1px_var(--color-line)]">
                {enriched ?? playbook.files[target]}
              </pre>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  type="button"
                  onClick={() =>
                    downloadText(
                      `korteks-talimat-${target}.md`,
                      enriched ?? playbook.files[target],
                    )
                  }
                >
                  <Download className="size-4" />
                  {targets.find((t) => t.id === target)?.name} talimatını indir
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => downloadText("korteks-talimat-hepsi.md", bundlePlaybook(playbook))}
                >
                  Tüm hedefleri indir
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  disabled={enrichPending}
                  onClick={() => {
                    setEnrichPending(true);
                    setEnrichError(null);
                    void enrichPlaybook({
                      data: { target, playbook: playbook.files[target] },
                    })
                      .then((r) => {
                        if (r.ok) setEnriched(r.text);
                        else setEnrichError(r.error);
                      })
                      .catch(() => setEnrichError("Zenginleştirme kopuk."))
                      .finally(() => setEnrichPending(false));
                  }}
                >
                  {enrichPending ? "Genişletiliyor" : "Hedefe göre genişlet"}
                </Button>
              </div>
              {enrichError && <p className="mt-2 text-sm text-danger">{enrichError}</p>}
            </>
          )}
        </section>
      )}
    </main>
  );
}
