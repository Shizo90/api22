// Test API endpoints
// Çalıştırmak için: node test_api.js

const http = require('http');

const BASE_URL = 'http://localhost:3000';

// Test fonksiyonları
function makeRequest(path) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            data: JSON.parse(data)
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: data
          });
        }
      });
    }).on('error', reject);
  });
}

async function runTests() {
  console.log('🧪 API Test Başlıyor...\n');
  
  const tests = [
    {
      name: '📍 Root Endpoint',
      path: '/'
    },
    {
      name: '💬 Discord - Tüm Veriler',
      path: '/api/discord'
    },
    {
      name: '💬 Discord - Tek Kayıt (ID: 0)',
      path: '/api/discord/0'
    },
    {
      name: '📧 Mail - Tüm Veriler',
      path: '/api/mail'
    },
    {
      name: '📧 Mail - Arama (test)',
      path: '/api/mail/search?q=test'
    },
    {
      name: '👥 Facebook - Tüm Veriler',
      path: '/api/facebook'
    },
    {
      name: '📊 Facebook - İstatistikler',
      path: '/api/facebook/stats'
    },
    {
      name: '🎮 Valorant - Tüm Veriler',
      path: '/api/valorant'
    },
    {
      name: '🎮 Valorant - Arama',
      path: '/api/valorant/search?q=agent'
    },
    {
      name: '📸 Instagram - Tüm Veriler',
      path: '/api/instagram'
    },
    {
      name: '📸 Instagram - Sayı',
      path: '/api/instagram/count'
    },
    {
      name: '🎮 Epic Games - Tüm Veriler',
      path: '/api/epicgames'
    },
    {
      name: '🎮 Epic Games - E-mail Arama',
      path: '/api/epicgames/search?email=gmail'
    },
    {
      name: '⛏️ CraftRise - Veriler',
      path: '/api/crafrise'
    }
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      console.log(`📝 Test: ${test.name}`);
      const result = await makeRequest(test.path);
      
      if (result.status === 200 || result.status === 404) {
        console.log(`✅ Başarılı - Status: ${result.status}`);
        if (result.data.success !== undefined) {
          console.log(`   Success: ${result.data.success}`);
        }
        if (result.data.totalRecords) {
          console.log(`   Toplam Kayıt: ${result.data.totalRecords}`);
        }
        passed++;
      } else {
        console.log(`❌ Başarısız - Status: ${result.status}`);
        failed++;
      }
    } catch (error) {
      console.log(`❌ Hata: ${error.message}`);
      failed++;
    }
    console.log('');
  }

  console.log('\n=====================================');
  console.log('📊 Test Sonuçları');
  console.log('=====================================');
  console.log(`✅ Başarılı: ${passed}`);
  console.log(`❌ Başarısız: ${failed}`);
  console.log(`📈 Başarı Oranı: ${Math.round((passed / (passed + failed)) * 100)}%`);
  console.log('=====================================\n');
}

// Sunucu kontrol et
console.log('🔍 Sunucu kontrol ediliyor...\n');
makeRequest('/')
  .then(() => {
    console.log('✅ Sunucu çalışıyor!\n');
    runTests();
  })
  .catch((error) => {
    console.error('❌ Sunucu çalışmıyor!');
    console.error('Lütfen server.js dosyasını çalıştırın:\n');
    console.error('  npm start\n');
    process.exit(1);
  });
