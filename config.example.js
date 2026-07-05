// Configuration Example
// Bunu config.js olarak kaydedin ve kendi ayarlarınızı yapın

module.exports = {
  // Server Ayarları
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    env: process.env.NODE_ENV || 'development'
  },

  // API Ayarları
  api: {
    version: '1.0.0',
    prefix: '/api',
    timeout: 30000 // ms
  },

  // CORS Ayarları
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  },

  // Data Kaynakları
  dataSources: {
    discord: {
      path: 'discord/discord_data.sql',
      type: 'sql',
      encoding: 'utf8'
    },
    mail: {
      path: 'mail/merged_database.json',
      type: 'json',
      encoding: 'utf8'
    },
    facebook: {
      path: 'facebook/20mtrfacebook.csv',
      type: 'csv',
      encoding: 'utf8'
    },
    valorant: {
      path: 'valo/valorant.json',
      type: 'json',
      encoding: 'utf8'
    },
    instagram: {
      path: 'İNSTAGRAM DATA/instagram verileri.json',
      type: 'json',
      encoding: 'utf8'
    },
    epicgames: {
      path: 'epicgames/Epicgames veirleri.txt',
      type: 'text',
      encoding: 'utf8'
    },
    crafrise: {
      path: 'crafrise/craftrisedata',
      type: 'text',
      encoding: 'utf8'
    }
  },

  // Cache Ayarları
  cache: {
    enabled: true,
    ttl: 3600 // saniye
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: 'combined'
  },

  // Rate Limiting
  rateLimit: {
    enabled: true,
    windowMs: 15 * 60 * 1000, // 15 dakika
    max: 100 // İsteklerin maksimum sayısı
  }
};
