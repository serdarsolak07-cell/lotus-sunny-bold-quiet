import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteShell } from "@/components/site-shell";
import { CORE } from "@/data/core";
import { makerName } from "@/lib/core-seal";
import appCss from "../styles.css?url";

const APP_NAME = CORE.product;
const MAKER = makerName(CORE.maker);

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Yapay zeka sistemleri, ajan mimarileri, mikro ajanlar, bellek, korteks ve web arama atlası.",
      },
      { name: "author", content: MAKER },
      { name: "creator", content: MAKER },
      { name: "theme-color", content: "#0b0c0b" },
    ],
    links: [
      { rel: "author", href: "/humans.txt" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;1,400&display=swap",
      },
    ],
  }),
  component: Root,
  errorComponent: RootError,
});

function RootError({ error }: { error: Error }) {
  return (
    <html lang="tr">
      <body className="bg-[#0b0c0b] p-8 text-[#ece8df]">
        <p className="text-sm tracking-wide text-[#c4a574]">HATA</p>
        <h1 className="mt-2 text-3xl">Sayfa durdu.</h1>
        <p className="mt-3 max-w-xl text-sm text-[#b7b1a4]">{error.message}</p>
        <p className="mt-6 text-sm">Yapımcı: SERDAR KAPTAN</p>
        <p className="mt-6">
          <a href="/" className="underline">
            Başa dön
          </a>
        </p>
      </body>
    </html>
  );
}

function Root() {
  return (
    <html lang="tr" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="bg-bg text-fg">
        <PreviewHostBridge />
        <AuthProvider>
          <SiteShell>
            <Outlet />
          </SiteShell>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
