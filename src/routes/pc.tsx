import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CORE } from "@/data/core";
import { makerName } from "@/lib/core-seal";
import { downloadZipFromUrl } from "@/lib/download";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/pc")({ component: PcKur });

function PcKur() {
  const name = makerName(CORE.maker);
  const [status, setStatus] = useState<"idle" | "load" | "ok" | "err">("idle");

  async function save() {
    setStatus("load");
    try {
      await downloadZipFromUrl("/korteks-pc.zip", "korteks-pc.zip");
      setStatus("ok");
    } catch {
      setStatus("err");
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="font-mono text-xs text-accent">PC · OTOKURULUM</p>
      <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
        Bu siteyi bilgisayarda çalıştır.
      </h1>
      <p className="mt-5 text-[17px] leading-relaxed text-muted">
        Aşağıdaki düğme zip’i tarayıcının İndirilenler klasörüne kaydeder. Ubuntu
        24.04: aç, KUR.sh çalıştır. Yapımcı {name}.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button type="button" onClick={() => void save()} disabled={status === "load"}>
          {status === "load" ? "İndiriliyor…" : "korteks-pc.zip indir"}
        </Button>
        {status === "ok" && <p className="text-sm text-muted">İndirilenler’e kaydedildi.</p>}
        {status === "err" && (
          <p className="text-sm text-muted">Düğme tutmazsa sağ tıkla: yedek bağlantı.</p>
        )}
      </div>
      <p className="mt-3">
        <a
          href="/korteks-pc.zip"
          download="korteks-pc.zip"
          target="_blank"
          rel="noreferrer"
          className="text-sm underline-offset-2 hover:underline"
        >
          Yedek bağlantı (yeni sekme)
        </a>
      </p>

      <ol className="mt-12 grid gap-4">
        <li className="rounded-xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-line)]">
          <p className="font-mono text-[11px] text-subtle">UBUNTU 24.04</p>
          <pre className="mt-3 overflow-x-auto rounded-md bg-inset px-3 py-3 font-mono text-xs leading-relaxed">
            {`cd ~/Downloads
unzip korteks-pc.zip
cd KORTEKS
chmod +x KUR.sh
./KUR.sh`}
          </pre>
        </li>
      </ol>
    </main>
  );
}
