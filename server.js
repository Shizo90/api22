const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Discord
app.get('/api/discord', (req, res) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'discord', 'discord_data.sql'), 'utf8');
    const lines = data.split('\n').filter(line => line.trim());
    res.json({ success: true, source: 'Discord', totalRecords: lines.length, data: lines.slice(0, 100) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/discord/:id', (req, res) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'discord', 'discord_data.sql'), 'utf8');
    const lines = data.split('\n').filter(line => line.trim());
    const id = parseInt(req.params.id);
    if (id >= 0 && id < lines.length) {
      res.json({ success: true, record: lines[id] });
    } else {
      res.status(404).json({ success: false, error: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Mail
app.get('/api/mail', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'mail', 'merged_database.json'), 'utf8'));
    res.json({ success: true, source: 'Mail', totalRecords: Array.isArray(data) ? data.length : Object.keys(data).length, data: data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/mail/search', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'mail', 'merged_database.json'), 'utf8'));
    const query = req.query.q || '';
    let results = data;
    if (Array.isArray(data)) {
      results = data.filter(item => JSON.stringify(item).toLowerCase().includes(query.toLowerCase()));
    }
    res.json({ success: true, query: query, results: results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Facebook
app.get('/api/facebook', (req, res) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'facebook', '20mtrfacebook.csv'), 'utf8');
    const lines = data.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',');
    const records = lines.slice(1, 101).map(line => {
      const values = line.split(',');
      const obj = {};
      headers.forEach((header, index) => {
        obj[header.trim()] = values[index] ? values[index].trim() : '';
      });
      return obj;
    });
    res.json({ success: true, source: 'Facebook', totalRecords: lines.length - 1, headers: headers, data: records });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/facebook/stats', (req, res) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'facebook', '20mtrfacebook.csv'), 'utf8');
    const lines = data.split('\n').filter(line => line.trim());
    res.json({ success: true, source: 'Facebook', totalRecords: lines.length - 1, headers: lines[0].split(',') });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Valorant
app.get('/api/valorant', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'valo', 'valorant.json'), 'utf8'));
    res.json({ success: true, source: 'Valorant', data: data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/valorant/search', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'valo', 'valorant.json'), 'utf8'));
    const query = req.query.q || '';
    let results = data;
    if (Array.isArray(data)) {
      results = data.filter(item => JSON.stringify(item).toLowerCase().includes(query.toLowerCase()));
    }
    res.json({ success: true, query: query, results: results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Instagram
app.get('/api/instagram', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'İNSTAGRAM DATA', 'instagram verileri.json'), 'utf8'));
    res.json({ success: true, source: 'Instagram', data: data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/instagram/count', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'İNSTAGRAM DATA', 'instagram verileri.json'), 'utf8'));
    res.json({ success: true, source: 'Instagram', totalRecords: Array.isArray(data) ? data.length : Object.keys(data).length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Epic Games
app.get('/api/epicgames', (req, res) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'epicgames', 'Epicgames veirleri.txt'), 'utf8');
    const lines = data.split('\n').filter(line => line.trim());
    const accounts = lines.map(line => {
      const [email, password] = line.split(':');
      return { email: email ? email.trim() : '', password: password ? password.trim() : '' };
    });
    res.json({ success: true, source: 'Epic Games', totalRecords: accounts.length, data: accounts.slice(0, 100) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/epicgames/search', (req, res) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'epicgames', 'Epicgames veirleri.txt'), 'utf8');
    const lines = data.split('\n').filter(line => line.trim());
    const query = req.query.email || '';
    const accounts = lines
      .filter(line => line.toLowerCase().includes(query.toLowerCase()))
      .map(line => {
        const [email, password] = line.split(':');
        return { email: email ? email.trim() : '', password: password ? password.trim() : '' };
      });
    res.json({ success: true, query: query, results: accounts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// CraftRise
app.get('/api/crafrise', (req, res) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'crafrise', 'craftrisedata'), 'utf8');
    res.json({ success: true, source: 'CraftRise', data: data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API Info
app.get('/api/info', (req, res) => {
  res.json({
    success: true,
    message: 'Multi-Source Data API',
    version: '1.0.0',
    endpoints: {
      discord: { list: '/api/discord', single: '/api/discord/:id' },
      mail: { list: '/api/mail', search: '/api/mail/search?q=query' },
      facebook: { list: '/api/facebook', stats: '/api/facebook/stats' },
      valorant: { list: '/api/valorant', search: '/api/valorant/search?q=query' },
      instagram: { list: '/api/instagram', count: '/api/instagram/count' },
      epicgames: { list: '/api/epicgames', search: '/api/epicgames/search?email=query' },
      crafrise: { list: '/api/crafrise' }
    }
  });
});

// Root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Not found' });
});

// Start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
