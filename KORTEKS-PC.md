# KORTEKS — PC otokurulum

Yapımcı: SERDAR KAPTAN. Çekirdek bellek; silinmez.

## Ubuntu 24.04
```
unzip korteks-pc.zip
cd KORTEKS
chmod +x KUR.sh
./KUR.sh
```
Node yoksa veya 18 ise betik Node 22 kurar (`sudo` sorar). Tarayıcı açılır.

Hazır Node 22 varsa yalnızca `./KUR.sh`.

## Windows
Zip’i ayıkla, `KUR.bat` çift tıkla.

## Docker (Ubuntu’da da)
```
sudo apt install -y docker.io docker-compose-v2
cd KORTEKS
sudo docker compose up --build
```

## Not
- Node 22 gerekir (Ubuntu deposundaki 18 yetmez).
- Atlas çevrimdışı çalışır.
- Sohbet için isteğe bağlı: `XAI_API_KEY`.
- Port 8080.
