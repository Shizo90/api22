// API Configuration
const API_BASE_URL = 'http://localhost:3000';

// Helper Functions
function showLoading(show = true) {
    const indicator = document.getElementById('loadingIndicator');
    if (show) {
        indicator.classList.add('active');
    } else {
        indicator.classList.remove('active');
    }
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(el => {
        el.classList.remove('active');
    });

    // Remove active from all nav buttons
    document.querySelectorAll('.nav-btn').forEach(el => {
        el.classList.remove('active');
    });

    // Show selected section
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active');
    }

    // Mark nav button as active
    const navBtn = document.querySelector(`[data-source="${sectionId}"]`);
    if (navBtn) {
        navBtn.classList.add('active');
    }
}

function formatJson(obj) {
    return JSON.stringify(obj, null, 2);
}

function displayError(containerId, message) {
    const container = document.getElementById(containerId);
    container.innerHTML = `<div class="error">❌ Hata: ${message}</div>`;
}

function displaySuccess(containerId, message) {
    const container = document.getElementById(containerId);
    container.innerHTML = `<div class="success">✅ ${message}</div>`;
}

// Navigation
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const source = btn.getAttribute('data-source');
        showSection(source);
    });
});

// ==================
// DISCORD FUNCTIONS
// ==================

async function loadDiscord() {
    showLoading();
    try {
        const response = await fetch(`${API_BASE_URL}/api/discord`);
        const data = await response.json();
        
        if (data.success) {
            const result = document.getElementById('discordResult');
            let html = `<div class="success">✅ Discord Verileri Yüklendi (${data.totalRecords} toplam)</div>`;
            html += '<table class="result-table"><tr><th>Sıra</th><th>Veri</th></tr>';
            
            data.data.slice(0, 50).forEach((item, index) => {
                html += `<tr><td>${index + 1}</td><td><pre>${item}</pre></td></tr>`;
            });
            
            html += '</table>';
            result.innerHTML = html;
            showSection('discord');
        }
    } catch (error) {
        displayError('discordResult', error.message);
    } finally {
        showLoading(false);
    }
}

async function loadDiscordById() {
    const id = document.getElementById('discordId').value;
    if (!id) {
        displayError('discordResult', 'Lütfen bir ID girin');
        return;
    }

    showLoading();
    try {
        const response = await fetch(`${API_BASE_URL}/api/discord/${id}`);
        const data = await response.json();
        
        if (data.success) {
            const result = document.getElementById('discordResult');
            result.innerHTML = `<div class="result-item"><pre>${data.record}</pre></div>`;
        } else {
            displayError('discordResult', 'Kayıt bulunamadı');
        }
    } catch (error) {
        displayError('discordResult', error.message);
    } finally {
        showLoading(false);
    }
}

// ==================
// MAIL FUNCTIONS
// ==================

async function loadMail() {
    showLoading();
    try {
        const response = await fetch(`${API_BASE_URL}/api/mail`);
        const data = await response.json();
        
        if (data.success) {
            const result = document.getElementById('mailResult');
            let html = `<div class="success">✅ Mail Verileri Yüklendi (${data.totalRecords} toplam)</div>`;
            html += `<div class="result-item"><pre>${formatJson(data.data)}</pre></div>`;
            result.innerHTML = html;
            showSection('mail');
        }
    } catch (error) {
        displayError('mailResult', error.message);
    } finally {
        showLoading(false);
    }
}

async function searchMail() {
    const query = document.getElementById('mailSearch').value;
    if (!query) {
        displayError('mailResult', 'Lütfen bir arama terimi girin');
        return;
    }

    showLoading();
    try {
        const response = await fetch(`${API_BASE_URL}/api/mail/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        if (data.success) {
            const result = document.getElementById('mailResult');
            let html = `<div class="success">✅ Arama Sonuçları (${data.results.length} bulundu)</div>`;
            html += `<div class="result-item"><pre>${formatJson(data.results)}</pre></div>`;
            result.innerHTML = html;
        }
    } catch (error) {
        displayError('mailResult', error.message);
    } finally {
        showLoading(false);
    }
}

// ==================
// FACEBOOK FUNCTIONS
// ==================

async function loadFacebook() {
    showLoading();
    try {
        const response = await fetch(`${API_BASE_URL}/api/facebook`);
        const data = await response.json();
        
        if (data.success) {
            const result = document.getElementById('facebookResult');
            let html = `<div class="success">✅ Facebook Verileri Yüklendi (${data.totalRecords} toplam)</div>`;
            
            if (data.data && data.data.length > 0) {
                html += '<table class="result-table"><tr>';
                Object.keys(data.data[0]).forEach(key => {
                    html += `<th>${key}</th>`;
                });
                html += '</tr>';

                data.data.slice(0, 20).forEach(item => {
                    html += '<tr>';
                    Object.values(item).forEach(value => {
                        html += `<td>${String(value).substring(0, 50)}...</td>`;
                    });
                    html += '</tr>';
                });

                html += '</table>';
            }
            
            result.innerHTML = html;
            showSection('facebook');
        }
    } catch (error) {
        displayError('facebookResult', error.message);
    } finally {
        showLoading(false);
    }
}

async function loadFacebookStats() {
    showLoading();
    try {
        const response = await fetch(`${API_BASE_URL}/api/facebook/stats`);
        const data = await response.json();
        
        if (data.success) {
            const result = document.getElementById('facebookResult');
            let html = `<div class="result-stats">`;
            html += `<div class="stat-box">
                        <div class="stat-value">${data.totalRecords.toLocaleString()}</div>
                        <div class="stat-label">Toplam Kayıt</div>
                    </div>`;
            html += `<div class="stat-box">
                        <div class="stat-value">${data.headers.length}</div>
                        <div class="stat-label">Sütun Sayısı</div>
                    </div>`;
            html += `</div>`;
            html += `<div class="result-item"><strong>Başlıklar:</strong><pre>${formatJson(data.headers)}</pre></div>`;
            result.innerHTML = html;
        }
    } catch (error) {
        displayError('facebookResult', error.message);
    } finally {
        showLoading(false);
    }
}

// ==================
// VALORANT FUNCTIONS
// ==================

async function loadValorant() {
    showLoading();
    try {
        const response = await fetch(`${API_BASE_URL}/api/valorant`);
        const data = await response.json();
        
        if (data.success) {
            const result = document.getElementById('valorantResult');
            let html = `<div class="success">✅ Valorant Verileri Yüklendi</div>`;
            html += `<div class="result-item"><pre>${formatJson(data.data)}</pre></div>`;
            result.innerHTML = html;
            showSection('valorant');
        }
    } catch (error) {
        displayError('valorantResult', error.message);
    } finally {
        showLoading(false);
    }
}

async function searchValorant() {
    const query = document.getElementById('valorantSearch').value;
    if (!query) {
        displayError('valorantResult', 'Lütfen bir arama terimi girin');
        return;
    }

    showLoading();
    try {
        const response = await fetch(`${API_BASE_URL}/api/valorant/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        if (data.success) {
            const result = document.getElementById('valorantResult');
            let html = `<div class="success">✅ Arama Sonuçları (${data.results.length} bulundu)</div>`;
            html += `<div class="result-item"><pre>${formatJson(data.results)}</pre></div>`;
            result.innerHTML = html;
        }
    } catch (error) {
        displayError('valorantResult', error.message);
    } finally {
        showLoading(false);
    }
}

// ==================
// INSTAGRAM FUNCTIONS
// ==================

async function loadInstagram() {
    showLoading();
    try {
        const response = await fetch(`${API_BASE_URL}/api/instagram`);
        const data = await response.json();
        
        if (data.success) {
            const result = document.getElementById('instagramResult');
            let html = `<div class="success">✅ Instagram Verileri Yüklendi</div>`;
            html += `<div class="result-item"><pre>${formatJson(data.data)}</pre></div>`;
            result.innerHTML = html;
            showSection('instagram');
        }
    } catch (error) {
        displayError('instagramResult', error.message);
    } finally {
        showLoading(false);
    }
}

async function loadInstagramCount() {
    showLoading();
    try {
        const response = await fetch(`${API_BASE_URL}/api/instagram/count`);
        const data = await response.json();
        
        if (data.success) {
            const result = document.getElementById('instagramResult');
            let html = `<div class="result-stats">`;
            html += `<div class="stat-box">
                        <div class="stat-value">${data.totalRecords.toLocaleString()}</div>
                        <div class="stat-label">Toplam Kayıt</div>
                    </div>`;
            html += `</div>`;
            result.innerHTML = html;
        }
    } catch (error) {
        displayError('instagramResult', error.message);
    } finally {
        showLoading(false);
    }
}

// ==================
// EPIC GAMES FUNCTIONS
// ==================

async function loadEpicGames() {
    showLoading();
    try {
        const response = await fetch(`${API_BASE_URL}/api/epicgames`);
        const data = await response.json();
        
        if (data.success) {
            const result = document.getElementById('epicgamesResult');
            let html = `<div class="success">✅ Epic Games Verileri Yüklendi (${data.totalRecords} toplam)</div>`;
            html += '<table class="result-table"><tr><th>E-mail</th><th>Şifre</th></tr>';
            
            data.data.slice(0, 30).forEach((item) => {
                html += `<tr><td>${item.email}</td><td>●●●●●●●●</td></tr>`;
            });
            
            html += '</table>';
            result.innerHTML = html;
            showSection('epicgames');
        }
    } catch (error) {
        displayError('epicgamesResult', error.message);
    } finally {
        showLoading(false);
    }
}

async function searchEpicGames() {
    const query = document.getElementById('epicSearch').value;
    if (!query) {
        displayError('epicgamesResult', 'Lütfen bir e-mail girin');
        return;
    }

    showLoading();
    try {
        const response = await fetch(`${API_BASE_URL}/api/epicgames/search?email=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        if (data.success) {
            const result = document.getElementById('epicgamesResult');
            let html = `<div class="success">✅ Arama Sonuçları (${data.results.length} bulundu)</div>`;
            html += '<table class="result-table"><tr><th>E-mail</th><th>Şifre</th></tr>';
            
            data.results.forEach((item) => {
                html += `<tr><td>${item.email}</td><td>●●●●●●●●</td></tr>`;
            });
            
            html += '</table>';
            result.innerHTML = html;
        }
    } catch (error) {
        displayError('epicgamesResult', error.message);
    } finally {
        showLoading(false);
    }
}

// ==================
// CRAFRISE FUNCTIONS
// ==================

async function loadCrafrise() {
    showLoading();
    try {
        const response = await fetch(`${API_BASE_URL}/api/crafrise`);
        const data = await response.json();
        
        if (data.success) {
            const result = document.getElementById('craftriseResult');
            let html = `<div class="success">✅ CraftRise Verileri Yüklendi</div>`;
            html += `<div class="result-item"><pre>${formatJson(data.data)}</pre></div>`;
            result.innerHTML = html;
            showSection('crafrise');
        }
    } catch (error) {
        displayError('craftriseResult', error.message);
    } finally {
        showLoading(false);
    }
}

// ==================
// API INFO FUNCTION
// ==================

async function loadApiInfo() {
    showLoading();
    try {
        const response = await fetch(`${API_BASE_URL}/`);
        const data = await response.json();
        
        if (data.success) {
            const result = document.getElementById('home');
            let html = `<h2>📊 API Hakkında</h2>`;
            html += `<div class="info-card" style="grid-column: 1 / -1; background: white; color: var(--dark); border: 2px solid var(--primary);">`;
            html += `<pre>${formatJson(data)}</pre>`;
            html += `</div>`;
            result.innerHTML = html;
            showSection('home');
        }
    } catch (error) {
        alert('API sunucusu çalışmıyor: ' + error.message);
    } finally {
        showLoading(false);
    }
}

// Page Load
window.addEventListener('load', () => {
    showSection('home');
    // Sunucu bağlantısını kontrol et
    fetch(`${API_BASE_URL}/`)
        .then(r => r.json())
        .catch(() => {
            alert('⚠️ Uyarı: API sunucusu çalışmıyor!\nLütfen server.js dosyasını çalıştırın:\nnpm start');
        });
});
