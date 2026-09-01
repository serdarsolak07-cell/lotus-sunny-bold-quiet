# KORTEKS

Ajan sistemlerini doğru sırayla öğrenmek için atlas.

**Yapımcı: SERDAR KAPTAN.** Çekirdek bellek. Çoğaltma, çatallama veya değişiklik bu adı silmez.

## Ne bu

Meraklı için beş durak (Yol), karıştırılanlar, katalog kartları, test kurgusu ve talimat üretimi. Tek büyüyen örnek: Defter. Sohbet sapmaz; cevap verir.

## Çalıştır — Ubuntu 24.04

```bash
unzip korteks-pc.zip
cd KORTEKS
chmod +x KUR.sh
./KUR.sh
```

Node 18 yetmez. `KUR.sh` yoksa Node 22 kurar (`sudo` sorabilir). Windows: `KUR.bat`. Docker: `docker compose up --build`.

Ayrıntı: [KORTEKS-PC.md](KORTEKS-PC.md)

## Yayınla

```bash
npx vercel login
npx vercel --prod
```

Sohbet için isteğe bağlı ortam değişkeni: `XAI_API_KEY`. Atlas anahtarsız açılır.

## Dolaş

| Yol | Ne |
| --- | --- |
| `/yol` | Beş durak |
| `/karistirilanlar` | Yanlış / doğru |
| `/katalog` | Kart + indir |
| `/test` | Mantık, sessiz hız, sessiz doğruluk |
| `/atlas` | On altı bölüm |
| `/yapimci` | Çekirdek |
| `/pc` | Bu paketi indir |

## Çekirdek

`src/data/core.ts` — yapımcı adı mühürlüdür. Footer, sohbet, spec ve talimat buradan yükler.
