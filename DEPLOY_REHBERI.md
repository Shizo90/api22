# 🚀 API'yi İnternete Deploy Etme Rehberi

## 📍 Seçenek 1: RENDER (En Kolay) ⭐ TAVSİYE EDİLEN

### Adım 1: Hazırlık
```bash
# GitHub'a push et
git init
git add .
git commit -m "API Projesi"
git branch -M main
git remote add origin https://github.com/[KULLANICI]/datalar.git
git push -u origin main
```

### Adım 2: Render'a Deploy Et
1. https://render.com adresine git
2. "New" → "Web Service" tıkla
3. GitHub repo seç
4. Deploy başlasın
5. **URL al**: `https://[adın]-api.onrender.com`

### Adım 3: Kullan
```
GET https://[adın]-api.onrender.com/api/discord
GET https://[adın]-api.onrender.com/api/mail
vb...
```

**AVANTAJ:** Ücretsiz, kolay, otomatik

---

## 📍 Seçenek 2: HEROKU

### Adım 1: Heroku CLI Kur
https://devcenter.heroku.com/articles/heroku-cli

### Adım 2: Deploy Et
```bash
heroku login
heroku create [adın]-api
git push heroku main
heroku open
```

### Adım 3: Kullan
```
GET https://[adın]-api.herokuapp.com/api/discord
```

**AVANTAJ:** Güvenilir, profesyonel

---

## 📍 Seçenek 3: RAILWAY

### Adım 1: Railway'e Git
https://railway.app

### Adım 2: Deploy Et
1. GitHub hesabı ile giriş yap
2. "New Project" → "Deploy from GitHub"
3. Repo seç
4. **URL al**

**AVANTAJ:** Hızlı, modern

---

## 🔗 API ENDPOINTS (Deploy Sonrası)

```
GET https://[API_URL]/api/discord
GET https://[API_URL]/api/discord/:id
GET https://[API_URL]/api/mail
GET https://[API_URL]/api/mail/search?q=query
GET https://[API_URL]/api/facebook
GET https://[API_URL]/api/facebook/stats
GET https://[API_URL]/api/valorant
GET https://[API_URL]/api/valorant/search?q=query
GET https://[API_URL]/api/instagram
GET https://[API_URL]/api/instagram/count
GET https://[API_URL]/api/epicgames
GET https://[API_URL]/api/epicgames/search?email=query
GET https://[API_URL]/api/crafrise
GET https://[API_URL]/api/info
GET https://[API_URL]/
```

---

## 🧪 Test Et

### cURL
```bash
curl https://[API_URL]/api/discord
```

### JavaScript
```javascript
fetch('https://[API_URL]/api/discord')
  .then(r => r.json())
  .then(d => console.log(d))
```

---

## ⚠️ UYARI

- Veri klasörleri deploy'da da olmalı
- `package.json` ve `server.js` gerekli
- NODE_ENV=production olmalı

---

## 📝 Deploy Sonrası

Arkadaşa ver:

```
API URL: https://[adın]-api.onrender.com

Endpoints:
- /api/discord
- /api/mail
- /api/facebook
- /api/valorant
- /api/instagram
- /api/epicgames
- /api/crafrise
```

---

**Tamamlandı! 🎉**
