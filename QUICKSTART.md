# 🚀 Hızlı Başlangıç Rehberi

## 1️⃣ Bağımlılıkları Kur

```bash
npm install
```

Bu komut şu paketleri kuracak:
- `express` - Web framework
- `cors` - Cross-origin resource sharing  
- `body-parser` - Request parsing

## 2️⃣ Sunucuyu Başlat

```bash
npm start
```

Çıktı:
```
╔════════════════════════════════════════╗
║  Multi-Source Data API                 ║
║  Server running on port 3000           ║
║  http://localhost:3000                 ║
╚════════════════════════════════════════╝
```

## 3️⃣ API'yi Test Et

### Tarayıcıda
Basit bir tarayıcıda açın:
```
http://localhost:3000/
```

### cURL ile
```bash
curl http://localhost:3000/api/discord
```

### Node.js Test Script ile
```bash
node test_api.js
```

## 📋 En Sık Kullanılan Endpoints

### Discord
```bash
# Tüm veriler
curl http://localhost:3000/api/discord

# Tek kayıt
curl http://localhost:3000/api/discord/0
```

### Mail
```bash
# Tüm veriler
curl http://localhost:3000/api/mail

# Arama
curl "http://localhost:3000/api/mail/search?q=gmail"
```

### Facebook
```bash
# İstatistikler
curl http://localhost:3000/api/facebook/stats
```

### Valorant
```bash
# Arama
curl "http://localhost:3000/api/valorant/search?q=agent"
```

### Epic Games
```bash
# E-mail arama
curl "http://localhost:3000/api/epicgames/search?email=gmail"
```

## 🔌 Postman ile Test

1. Postman'ı indir: https://www.postman.com/downloads/
2. File → Import
3. `postman_collection.json` dosyasını seç
4. Tüm endpoints'i test et

## 📊 Veri Kaynaklarının Yolu

```
datalar/
├── discord/discord_data.sql
├── mail/merged_database.json
├── facebook/20mtrfacebook.csv
├── valo/valorant.json
├── İNSTAGRAM DATA/instagram verileri.json
├── epicgames/Epicgames veirleri.txt
└── crafrise/craftrisedata
```

## 🛠️ Sorun Giderme

### "Port zaten kullanımda" hatası
```bash
# Port değiştir
set PORT=3001
npm start
```

Windows PowerShell için:
```powershell
$env:PORT=3001
npm start
```

### "Module not found" hatası
```bash
# node_modules silip yeniden kur
del node_modules
npm install
```

### Veri dosyaları bulunamıyor
- Veri klasörlerinin doğru yolda olduğundan emin olun
- Dosya adlarının yazım kontrolü yapın

## 📚 Daha Fazla Bilgi

- **API Dokumentasyonu**: `API_DOCS.md`
- **Detaylı README**: `README.md`
- **Proje Yapısı**: `server.js`

## ✅ Kontrol Listesi

- [ ] Node.js yüklü mü? (`node --version`)
- [ ] npm yüklü mü? (`npm --version`)
- [ ] `npm install` komutu çalıştırıldı mı?
- [ ] Veri dosyaları dizinde mi?
- [ ] `npm start` ile sunucu başlıyor mu?
- [ ] `http://localhost:3000/` açılıyor mu?

## 🎉 Hazırız!

API'yi kullanmaya başlayabilirsin. İlk endpoint'i deneyelim:

```bash
curl http://localhost:3000/
```

Başarılı yanıt alırsan, her şey düzgün çalışıyor! 🎊

---

**Sorular?** README.md'yi oku ya da API_DOCS.md'i kontrol et.
