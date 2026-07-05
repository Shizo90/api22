# Multi-Source Data API Dokumentasyon

## Başlangıç

API'yi başlatmak için:

```bash
npm install
npm start
```

Server `http://localhost:3000` adresinde çalışacaktır.

---

## Endpoints

### 1. Discord Endpoint

#### Tüm Discord Verilerini Listele
```
GET /api/discord
```

**Yanıt:**
```json
{
  "success": true,
  "source": "Discord",
  "totalRecords": 5000,
  "data": [...]
}
```

#### Spesifik Discord Kaydını Getir
```
GET /api/discord/:id
```

**Parametreler:**
- `id` (number): Kaydın sıra numarası

**Yanıt:**
```json
{
  "success": true,
  "record": "record_data_here"
}
```

---

### 2. Mail Endpoint

#### Tüm Mail Verilerini Listele
```
GET /api/mail
```

**Yanıt:**
```json
{
  "success": true,
  "source": "Mail Database",
  "totalRecords": 10000,
  "data": {...}
}
```

#### Mail Verilerinde Arama Yap
```
GET /api/mail/search?q=query
```

**Parametreler:**
- `q` (string): Arama sorgusu

**Yanıt:**
```json
{
  "success": true,
  "query": "search_term",
  "results": [...]
}
```

---

### 3. Facebook Endpoint

#### Tüm Facebook Verilerini Listele
```
GET /api/facebook
```

**Yanıt:**
```json
{
  "success": true,
  "source": "Facebook",
  "totalRecords": 20000000,
  "headers": ["column1", "column2", ...],
  "data": [
    {
      "column1": "value1",
      "column2": "value2"
    }
  ]
}
```

#### Facebook Veri İstatistikleri
```
GET /api/facebook/stats
```

**Yanıt:**
```json
{
  "success": true,
  "source": "Facebook",
  "totalRecords": 20000000,
  "headers": [...]
}
```

---

### 4. Valorant Endpoint

#### Tüm Valorant Verilerini Listele
```
GET /api/valorant
```

**Yanıt:**
```json
{
  "success": true,
  "source": "Valorant",
  "data": {...}
}
```

#### Valorant Verilerinde Arama Yap
```
GET /api/valorant/search?q=query
```

**Parametreler:**
- `q` (string): Arama sorgusu

**Yanıt:**
```json
{
  "success": true,
  "query": "search_term",
  "results": [...]
}
```

---

### 5. Instagram Endpoint

#### Tüm Instagram Verilerini Listele
```
GET /api/instagram
```

**Yanıt:**
```json
{
  "success": true,
  "source": "Instagram",
  "data": {...}
}
```

#### Instagram Veri Sayısı
```
GET /api/instagram/count
```

**Yanıt:**
```json
{
  "success": true,
  "source": "Instagram",
  "totalRecords": 17000000
}
```

---

### 6. Epic Games Endpoint

#### Tüm Epic Games Verilerini Listele
```
GET /api/epicgames
```

**Yanıt:**
```json
{
  "success": true,
  "source": "Epic Games",
  "totalRecords": 150000,
  "data": [
    {
      "email": "user@email.com",
      "password": "password123"
    }
  ]
}
```

#### Epic Games Verilerinde E-mail ile Arama Yap
```
GET /api/epicgames/search?email=query
```

**Parametreler:**
- `email` (string): E-mail arama sorgusu

**Yanıt:**
```json
{
  "success": true,
  "query": "search_term",
  "results": [...]
}
```

---

### 7. CraftRise Endpoint

#### CraftRise Verilerini Getir
```
GET /api/crafrise
```

**Yanıt:**
```json
{
  "success": true,
  "source": "CraftRise",
  "data": "..."
}
```

---

### 8. Root Endpoint

#### API Hakkında Bilgi ve Tüm Endpoints
```
GET /
```

**Yanıt:**
```json
{
  "success": true,
  "message": "Multi-Source Data API",
  "version": "1.0.0",
  "endpoints": {
    "discord": {...},
    "mail": {...},
    ...
  }
}
```

---

## Hata Yanıtları

Tüm hatalı istekler şu formatta yanıt döner:

```json
{
  "success": false,
  "error": "Hata açıklaması",
  "message": "Detaylı hata mesajı"
}
```

### Yaygın Hata Kodları
- `404`: Endpoint bulunamadı
- `500`: Sunucu hatası
- `400`: Hatalı istek

---

## Kullanım Örnekleri

### cURL ile İstek Yapma

```bash
# Discord verilerini getir
curl http://localhost:3000/api/discord

# Mail'de arama yap
curl "http://localhost:3000/api/mail/search?q=user"

# Facebook istatistikleri
curl http://localhost:3000/api/facebook/stats

# Epic Games'de e-mail ile ara
curl "http://localhost:3000/api/epicgames/search?email=gmail"
```

### JavaScript ile İstek Yapma

```javascript
// Fetch API ile Discord verileri
fetch('http://localhost:3000/api/discord')
  .then(response => response.json())
  .then(data => console.log(data));

// Mail'de arama yap
fetch('http://localhost:3000/api/mail/search?q=search_term')
  .then(response => response.json())
  .then(data => console.log(data));
```

---

## API Limitleri

- Her istek JSON formatında döner
- Büyük veri setleri ilk 100 kaydı ile sınırlandırılmıştır
- Arama işlemleri tüm veriyi tarar

---

## Gereklilikler

- Node.js >= 12.0.0
- npm >= 6.0.0

## Bağımlılıklar

- `express`: Web framework
- `cors`: Cross-origin resource sharing
- `body-parser`: Request body parsing

---

## Lisans

ISC

---

## Son Güncelleme

Aralık 2024
