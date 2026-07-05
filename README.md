# Multi-Source Data API 🚀

Farklı veri kaynaklarından verileri sunmak için oluşturulan RESTful API.

## 📋 Özellikler

- ✅ **Discord Verileri**: Discord SQL verilerini API üzerinden sunma
- ✅ **Mail Veritabanı**: JSON formatında mail verilerine erişim
- ✅ **Facebook Verileri**: CSV formatında Facebook verilerini arama ve listeleme
- ✅ **Valorant Verileri**: JSON formatında Valorant verilerine erişim
- ✅ **Instagram Verileri**: JSON formatında Instagram verilerine erişim
- ✅ **Epic Games Verileri**: E-mail ve şifre kombinasyonlarını sunma
- ✅ **CraftRise Verileri**: CraftRise oyun verilerine erişim

## 🚀 Hızlı Başlangıç

### Gereksinimler
- Node.js >= 12.0.0
- npm >= 6.0.0

### Kurulum

```bash
# 1. Bağımlılıkları kur
npm install

# 2. Sunucuyu başlat
npm start
```

Sunucu `http://localhost:3000` adresinde çalışmaya başlayacak.

## 📚 API Endpoints

### Discord
- `GET /api/discord` - Tüm Discord verilerini listele
- `GET /api/discord/:id` - Spesifik Discord kaydını getir

### Mail
- `GET /api/mail` - Tüm mail verilerini listele
- `GET /api/mail/search?q=query` - Mail verilerinde ara

### Facebook
- `GET /api/facebook` - Tüm Facebook verilerini listele
- `GET /api/facebook/stats` - Facebook istatistikleri

### Valorant
- `GET /api/valorant` - Tüm Valorant verilerini listele
- `GET /api/valorant/search?q=query` - Valorant verilerinde ara

### Instagram
- `GET /api/instagram` - Tüm Instagram verilerini listele
- `GET /api/instagram/count` - Instagram veri sayısı

### Epic Games
- `GET /api/epicgames` - Tüm Epic Games verilerini listele
- `GET /api/epicgames/search?email=query` - E-mail ile ara

### CraftRise
- `GET /api/crafrise` - CraftRise verilerini getir

### Root
- `GET /` - API hakkında bilgi ve tüm endpoints

## 📖 Detaylı Kullanım

Detaylı API dokumentasyonu için `API_DOCS.md` dosyasını inceleyin.

### cURL Örnekleri

```bash
# Discord verileri
curl http://localhost:3000/api/discord

# Mail'de arama
curl "http://localhost:3000/api/mail/search?q=user"

# Facebook istatistikleri
curl http://localhost:3000/api/facebook/stats

# Valorant'ta arama
curl "http://localhost:3000/api/valorant/search?q=agent"

# Epic Games'de e-mail ile ara
curl "http://localhost:3000/api/epicgames/search?email=gmail"
```

### JavaScript Örnekleri

```javascript
// Async/await ile istek yapma
async function getDiscordData() {
  try {
    const response = await fetch('http://localhost:3000/api/discord');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Mail'de arama
async function searchMail(query) {
  const response = await fetch(`http://localhost:3000/api/mail/search?q=${query}`);
  const data = await response.json();
  return data;
}
```

## 📁 Proje Yapısı

```
datalar/
├── discord/
│   └── discord_data.sql
├── mail/
│   └── merged_database.json
├── facebook/
│   └── 20mtrfacebook.csv
├── valo/
│   └── valorant.json
├── İNSTAGRAM DATA/
│   └── instagram verileri.json
├── epicgames/
│   └── Epicgames veirleri.txt
├── crafrise/
│   └── craftrisedata
├── server.js
├── package.json
├── API_DOCS.md
├── README.md
└── postman_collection.json
```

## 🛠️ Postman Collection

Postman ile API'yi test etmek için `postman_collection.json` dosyasını import edin.

1. Postman'ı aç
2. File → Import
3. `postman_collection.json` seç
4. Tüm endpoints'i test et

## 📊 Veri Kaynakları

| Kaynak | Format | Toplam Kayıt |
|--------|--------|-------------|
| Discord | SQL | ~5000+ |
| Mail | JSON | ~10000+ |
| Facebook | CSV | ~20,000,000 |
| Valorant | JSON | ~10000+ |
| Instagram | JSON | ~17,000,000 |
| Epic Games | TXT | ~150,000 |
| CraftRise | Text | Değişken |

## ⚙️ Ortam Değişkenleri

`.env` dosyasında aşağıdaki değişkenleri ayarlayabilirsiniz:

```env
PORT=3000
NODE_ENV=development
```

## 📝 Hata Yönetimi

Tüm hatalı istekler şu formatta yanıt döner:

```json
{
  "success": false,
  "error": "Hata başlığı",
  "message": "Detaylı hata mesajı"
}
```

## 🔧 Teknik Detaylar

- **Framework**: Express.js
- **Middleware**: CORS, Body Parser
- **Veri Formatları**: JSON, CSV, SQL, TXT
- **Arama**: Case-insensitive tam metin arama
- **Limit**: Büyük veri setleri ilk 100 kaydı döndürür

## 📄 Lisans

ISC

## 👨‍💻 Geliştirici

Oluşturulma Tarihi: Aralık 2024

## 🤝 Katkıda Bulunma

Bu projeye katkı yapmak isterseniz:
1. Fork yapın
2. Feature branch oluşturun
3. Değişiklikleri commit edin
4. Pull request gönderin

## 📞 İletişim

Herhangi bir sorunuz olursa lütfen issue açın.

---

**Keyifli kullanımlar! 🎉**
