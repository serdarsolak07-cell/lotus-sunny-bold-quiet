import { Link } from "@tanstack/react-router";
import { MessageSquare, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { askCortex } from "@/lib/chat";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Msg = { role: "user" | "assistant"; content: string };

function ChatText({ text }: { text: string }) {
  return (
    <div className="grid gap-2">
      {text.split("\n").map((line, i) => (
        <p key={i} className={line.startsWith("- ") ? "pl-3" : undefined}>
          {line.split(/(\*\*[^*]+?\*\*)/g).map((chunk, j) =>
            chunk.startsWith("**") && chunk.endsWith("**") ? (
              <strong key={j} className="font-medium">
                {chunk.slice(2, -2)}
              </strong>
            ) : (
              <span key={j}>{chunk}</span>
            ),
          )}
        </p>
      ))}
    </div>
  );
}

const starters = [
  "Filtreli ve filtresiz model farkı nedir?",
  "Mikro ajan ne zaman gerekir?",
  "Korteks katmanı ne işe yarar?",
];

export function ChatDock({
  open,
  onOpenChange,
  embedded = false,
  hidden = false,
}: {
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
  embedded?: boolean;
  hidden?: boolean;
}) {
  const [internal, setInternal] = useState(false);
  const shown = embedded ? true : (open ?? internal);
  const setShown = onOpenChange ?? setInternal;

  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || pending) return;
    const next: Msg[] = [...messages, { role: "user" as const, content }].slice(-10);
    setMessages(next);
    setInput("");
    setPending(true);
    setError(null);
    try {
      const res = await askCortex({ data: { messages: next } });
      if (!res.ok) {
        setError(res.error);
      } else {
        setMessages([...next, { role: "assistant", content: res.text }]);
      }
    } catch {
      setError("Bağlantı koptu. Yeniden deneyin.");
    } finally {
      setPending(false);
    }
  }

  const panel = (
    <div
      className={cn(
        "flex flex-col bg-surface",
        embedded
          ? "min-h-[70dvh] rounded-xl shadow-[0_0_0_1px_var(--color-line)]"
          : "h-[min(34rem,calc(100dvh-5.5rem))] w-[min(24rem,calc(100vw-1.5rem))] rounded-xl shadow-[0_0_0_1px_var(--color-line)]",
      )}
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div>
          <p className="font-display text-[15px]">Atlas sohbeti</p>
          <p className="text-xs text-muted">Doğrudan cevap. Saptırma yok.</p>
        </div>
        {!embedded && (
          <button
            type="button"
            className="grid size-10 place-items-center rounded-sm text-muted hover:text-fg"
            onClick={() => setShown(false)}
            aria-label="Kapat"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      <div ref={scroller} className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <div className="grid gap-2">
            <p className="text-sm text-muted">
              Ajan, bellek, düğüm, model ve arama hakkında sorun. Cevap atlasa bağlıdır.
            </p>
            {starters.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="rounded-md bg-raised px-3 py-2.5 text-left text-sm text-fg shadow-[0_0_0_1px_var(--color-line)] hover:shadow-[0_0_0_1px_var(--color-line-strong)]"
              >
                {s}
              </button>
            ))}
          </div>
        )}
        <div className="grid gap-3">
          {messages.map((m, i) => (
            <div
              key={`${m.role}-${i}`}
              className={cn(
                "max-w-[95%] rounded-lg px-3 py-2 text-sm leading-relaxed",
                m.role === "user"
                  ? "ml-auto bg-raised text-fg"
                  : "bg-bg text-fg shadow-[0_0_0_1px_var(--color-line)]",
              )}
            >
              {m.role === "assistant" ? <ChatText text={m.content} /> : m.content}
            </div>
          ))}
          {pending && (
            <p className="text-sm text-muted">
              <span className="shimmer">Düşünüyor</span>
            </p>
          )}
          {error && <p className="text-sm text-danger">{error}</p>}
        </div>
      </div>

      <form
        className="border-t border-line p-3"
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
        }}
      >
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Sorunuzu yazın"
            maxLength={2000}
            className="h-11 min-w-0 flex-1 rounded-md bg-raised px-3 text-sm text-fg shadow-[0_0_0_1px_var(--color-line)] placeholder:text-subtle outline-none focus:shadow-[0_0_0_1px_var(--color-line-strong)]"
          />
          <Button type="submit" size="icon" disabled={pending || !input.trim()} aria-label="Gönder">
            <Send className="size-4" />
          </Button>
        </div>
        {!embedded && (
          <p className="mt-2 text-[11px] text-subtle">
            Tam sayfa:{" "}
            <Link to="/sohbet" className="text-muted underline-offset-2 hover:text-fg hover:underline">
              /sohbet
            </Link>
          </p>
        )}
      </form>
    </div>
  );

  if (embedded) return panel;
  if (hidden) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setShown(true)}
        className="fixed bottom-4 right-4 z-40 hidden size-12 items-center justify-center rounded-full bg-accent text-accent-fg shadow-[0_8px_24px_color-mix(in_oklab,black_35%,transparent)] md:inline-flex"
        aria-label="Sohbeti aç"
      >
        <MessageSquare className="size-5" />
      </button>
      {shown && (
        <div className="fixed bottom-4 right-4 z-50">{panel}</div>
      )}
    </>
  );
}
