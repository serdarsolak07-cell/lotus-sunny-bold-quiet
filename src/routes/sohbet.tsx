import { createFileRoute } from "@tanstack/react-router";
import { ChatDock } from "@/components/chat-dock";

export const Route = createFileRoute("/sohbet")({ component: ChatPage });

function ChatPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="font-mono text-xs text-accent">SOHBET</p>
      <h1 className="mt-3 font-display text-4xl">Atlasa sorun.</h1>
      <p className="mt-3 max-w-xl text-muted">
        Cevaplar KORTEKS bilgisine bağlıdır. Menü turu yok, sapma yok. Bilinmeyeni uydurmaz.
      </p>
      <div className="mt-8">
        <ChatDock embedded />
      </div>
    </main>
  );
}
