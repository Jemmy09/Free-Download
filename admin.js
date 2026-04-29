/* ═══════════════════════════════════════
   admin.js — FreeDownload Admin Panel
   Login: admin / admin123
═══════════════════════════════════════ */

const ADMIN_CREDS   = { user: 'admin', pass: 'admin123' };
const STORE_KEY     = 'fd_software';
const SESSION_KEY   = 'fd_admin_session';
const SESSION_TOKEN = 'fd$2026$auth';

// Timing-safe string comparison — prevents CWE-208 timing attacks
// Compares every character regardless of where a mismatch occurs
function timingSafeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const lenA = a.length;
  const lenB = b.length;
  // Pad shorter string so length itself doesn't leak timing info
  const maxLen = Math.max(lenA, lenB);
  let result = lenA === lenB ? 0 : 1;
  for (let i = 0; i < maxLen; i++) {
    const ca = a.charCodeAt(i % lenA);
    const cb = b.charCodeAt(i % lenB);
    result |= ca ^ cb;
  }
  return result === 0;
}

function isAuthenticated() {
  const stored = sessionStorage.getItem(SESSION_KEY);
  return timingSafeEqual(stored || '', SESSION_TOKEN);
}

/* ── Storage helpers ── */
function getApps() {
  const raw = localStorage.getItem(STORE_KEY);
  if (raw) return JSON.parse(raw);
  localStorage.setItem(STORE_KEY, JSON.stringify(SOFTWARE));
  return JSON.parse(JSON.stringify(SOFTWARE));
}
function saveApps(apps) {
  localStorage.setItem(STORE_KEY, JSON.stringify(apps));
}

/* ══════════════════════════════
   AUTH
══════════════════════════════ */
function doLogin() {
  const u   = document.getElementById('loginUser').value.trim();
  const p   = document.getElementById('loginPass').value;
  const err = document.getElementById('loginError');
  if (u === ADMIN_CREDS.user && p === ADMIN_CREDS.pass) {
    sessionStorage.setItem(SESSION_KEY, SESSION_TOKEN);
    showPanel();
  } else {
    err.textContent = '✕ Incorrect username or password.';
    document.getElementById('loginPass').value = '';
  }
}
function doLogout() {
  sessionStorage.removeItem(SESSION_KEY);
  document.getElementById('adminShell').style.display = 'none';
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('loginUser').value = '';
  document.getElementById('loginPass').value = '';
  document.getElementById('loginError').textContent = '';
}
function showPanel() {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('adminShell').style.display  = 'flex';
  initAdmin();
}

/* Enter key on login */
['loginUser','loginPass'].forEach(id =>
  document.getElementById(id).addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); })
);

/* Restore session only if valid token present.
   Anyone visiting admin.html directly without logging in
   will always see the login screen — panel stays hidden. */
if (isAuthenticated()) {
  showPanel();
} else {
  document.getElementById('adminShell').style.display  = 'none';
  document.getElementById('loginScreen').style.display = 'flex';
}

/* ══════════════════════════════
   SIDEBAR (mobile)
══════════════════════════════ */
function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sidebarOverlay').classList.add('show');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('show');
}

/* ══════════════════════════════
   NAVIGATION
══════════════════════════════ */
const PAGE_TITLES = { dashboard: 'Dashboard', apps: 'Manage Apps', form: 'Add New App' };

function goPage(name) {
  document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
  document.getElementById('page-' + name).style.display = 'block';
  document.querySelectorAll('.snav-btn').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`.snav-btn[data-page="${name}"]`);
  if (btn) btn.classList.add('active');
  document.getElementById('topbarTitle').textContent = PAGE_TITLES[name] || name;
  closeSidebar();
  if (name === 'dashboard') renderDashboard();
  if (name === 'apps')      renderTable();
}

document.querySelectorAll('.snav-btn[data-page]').forEach(btn =>
  btn.addEventListener('click', () => goPage(btn.dataset.page))
);

/* ══════════════════════════════
   INIT
══════════════════════════════ */
function initAdmin() {
  renderDashboard();
  renderTable();
  document.getElementById('fLogo').addEventListener('input', livePreview);
  document.getElementById('fName').addEventListener('input', () => {
    document.getElementById('lpName').textContent = document.getElementById('fName').value || 'App Name';
  });
}

/* ══════════════════════════════
   DASHBOARD
══════════════════════════════ */
function renderDashboard() {
  const apps = getApps();
  const cats = {};
  apps.forEach(a => { cats[a.category] = (cats[a.category] || 0) + 1; });
  const avgRating = apps.length ? (apps.reduce((s, a) => s + a.rating, 0) / apps.length).toFixed(1) : '0';

  document.getElementById('statsGrid').innerHTML = `
    <div class="stat-card">
      <div class="stat-icon" style="background:rgba(108,99,255,.15)">📦</div>
      <div class="stat-info"><strong>${apps.length}</strong><span>Total Apps</span></div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background:rgba(34,197,94,.15)">🗂️</div>
      <div class="stat-info"><strong>${Object.keys(cats).length}</strong><span>Categories</span></div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background:rgba(251,191,36,.15)">⭐</div>
      <div class="stat-info"><strong>${avgRating}</strong><span>Avg Rating</span></div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background:rgba(96,165,250,.15)">🆓</div>
      <div class="stat-info"><strong>${apps.filter(a => a.tags.includes('free')).length}</strong><span>Free Apps</span></div>
    </div>
  `;

  /* Recent 5 */
  const recent = apps.slice(-5).reverse();
  document.getElementById('recentList').innerHTML = recent.length
    ? recent.map(a => `
        <div class="recent-row">
          <div class="recent-logo" style="background:${a.logoBg}">
            <img src="${a.logo}" alt="${a.name}" onerror="this.style.display='none'">
          </div>
          <div class="recent-info">
            <strong>${a.name}</strong>
            <small>${a.version} · ${a.size}</small>
          </div>
          <span class="recent-cat">${a.category}</span>
        </div>
      `).join('')
    : '<div class="empty-state"><p>No apps yet.</p></div>';

  /* Category bars */
  const max = Math.max(...Object.values(cats), 1);
  document.getElementById('catChart').innerHTML = Object.entries(cats)
    .sort((a, b) => b[1] - a[1])
    .map(([cat, n]) => `
      <div class="bar-row">
        <div class="bar-label">
          <span style="text-transform:capitalize">${cat}</span>
          <span>${n}</span>
        </div>
        <div class="bar-track">
          <div class="bar-fill" style="width:${(n / max) * 100}%"></div>
        </div>
      </div>
    `).join('') || '<div class="empty-state"><p>No data.</p></div>';
}

/* ══════════════════════════════
   MANAGE APPS TABLE
══════════════════════════════ */
function renderTable() {
  const q   = (document.getElementById('adminSearch')?.value || '').trim().toLowerCase();
  const cat = document.getElementById('catFilter')?.value || '';
  let apps  = getApps();
  if (q)   apps = apps.filter(a => a.name.toLowerCase().includes(q) || a.category.includes(q));
  if (cat) apps = apps.filter(a => a.category === cat);

  /* Desktop table */
  const tbody = document.getElementById('tableBody');
  if (!apps.length) {
    tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state"><p>No apps match your search.</p></div></td></tr>`;
  } else {
    tbody.innerHTML = apps.map(a => `
      <tr>
        <td>
          <div class="tbl-app">
            <div class="tbl-logo" style="background:${a.logoBg}">
              <img src="${a.logo}" alt="${a.name}" onerror="this.style.display='none'">
            </div>
            <span class="tbl-name">${a.name}</span>
          </div>
        </td>
        <td><span class="tbl-cat">${a.category}</span></td>
        <td style="color:var(--muted);font-size:.8rem">${a.version}</td>
        <td style="color:var(--muted);font-size:.8rem">${a.size}</td>
        <td style="color:#fbbf24;font-size:.8rem">★ ${a.rating}</td>
        <td>${a.tags.map(t => `<span class="tbl-tag tag-${t}">${t}</span>`).join('')}</td>
        <td>
          <div class="tbl-actions">
            <button class="btn-edit"   onclick="openEditForm(${a.id})">✏️ Edit</button>
            <button class="btn-danger" onclick="confirmDelete(${a.id})">🗑️ Delete</button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  /* Mobile cards */
  const mc = document.getElementById('mobileCards');
  if (!apps.length) {
    mc.innerHTML = `<div class="empty-state"><p>No apps match your search.</p></div>`;
  } else {
    mc.innerHTML = apps.map(a => `
      <div class="mob-card">
        <div class="mob-card-top">
          <div class="mob-logo" style="background:${a.logoBg}">
            <img src="${a.logo}" alt="${a.name}" onerror="this.style.display='none'">
          </div>
          <div>
            <div class="mob-name">${a.name}</div>
            <div class="mob-version">${a.version} · ${a.size}</div>
          </div>
        </div>
        <div class="mob-meta">
          <span style="text-transform:capitalize">${a.category}</span>
          <span>★ ${a.rating}</span>
          ${a.tags.map(t => `<span class="tbl-tag tag-${t}">${t}</span>`).join('')}
        </div>
        <div class="mob-actions">
          <button class="btn-edit"   onclick="openEditForm(${a.id})">✏️ Edit</button>
          <button class="btn-danger" onclick="confirmDelete(${a.id})">🗑️ Delete</button>
        </div>
      </div>
    `).join('');
  }
}

function filterTable() { renderTable(); }

/* ══════════════════════════════
   ADD FORM
══════════════════════════════ */
function openAddForm() {
  resetForm();
  document.getElementById('formHeading').textContent = 'Add New App';
  document.getElementById('formSub').textContent     = 'Fill in the details to add a new app';
  document.getElementById('submitBtn').textContent   = '+ Add App';
  goPage('form');
}

/* ══════════════════════════════
   EDIT FORM
══════════════════════════════ */
function openEditForm(id) {
  const a = getApps().find(x => x.id === id);
  if (!a) return;

  resetForm();
  document.getElementById('editId').value        = a.id;
  document.getElementById('fName').value         = a.name;
  document.getElementById('fCategory').value     = a.category;
  document.getElementById('fVersion').value      = a.version;
  document.getElementById('fSize').value         = a.size;
  document.getElementById('fRating').value       = a.rating;
  document.getElementById('fReviews').value      = a.reviews;
  document.getElementById('fLogo').value         = a.logo;
  document.getElementById('fLogoBg').value       = a.logoBg;
  document.getElementById('fLogoBgPicker').value = /^#[0-9a-f]{6}$/i.test(a.logoBg) ? a.logoBg : '#ffffff';
  document.getElementById('fDesc').value         = a.desc;
  document.getElementById('fUrl').value          = a.url || '';
  document.getElementById('fDirectUrl').value    = a.directUrl || '';
  document.getElementById('tagFree').checked     = a.tags.includes('free');
  document.getElementById('tagPopular').checked  = a.tags.includes('popular');
  document.getElementById('tagNew').checked      = a.tags.includes('new');

  document.getElementById('formHeading').textContent = `Edit — ${a.name}`;
  document.getElementById('formSub').textContent     = 'Update the app details below';
  document.getElementById('submitBtn').textContent   = '💾 Save Changes';

  updatePreview(a.logo, a.logoBg, a.name);
  goPage('form');
}

/* ══════════════════════════════
   SUBMIT (Add or Edit)
══════════════════════════════ */
function submitForm() {
  const err = document.getElementById('formError');
  err.textContent = '';

  const name      = document.getElementById('fName').value.trim();
  const category  = document.getElementById('fCategory').value;
  const version   = document.getElementById('fVersion').value.trim();
  const size      = document.getElementById('fSize').value.trim();
  const logo      = document.getElementById('fLogo').value.trim();
  const desc      = document.getElementById('fDesc').value.trim();

  if (!name || !category || !version || !size || !logo || !desc) {
    err.textContent = '✕ Please fill in all required fields (marked with *).';
    return;
  }

  const rating    = Math.min(5, Math.max(0, parseFloat(document.getElementById('fRating').value) || 4.5));
  const reviews   = document.getElementById('fReviews').value.trim() || '0';
  const logoBg    = document.getElementById('fLogoBg').value.trim() || '#ffffff';
  const url       = document.getElementById('fUrl').value.trim();
  const directUrl = document.getElementById('fDirectUrl').value.trim();
  const tags      = ['free','popular','new'].filter(t =>
    document.getElementById('tag' + t[0].toUpperCase() + t.slice(1)).checked
  );

  const apps   = getApps();
  const editId = document.getElementById('editId').value;

  if (editId) {
    const idx = apps.findIndex(a => a.id === parseInt(editId));
    if (idx !== -1) {
      apps[idx] = { ...apps[idx], name, category, version, size, logo, logoBg, desc, rating, reviews, tags, url, directUrl };
      saveApps(apps);
      toast('✅ App updated successfully!', 'success');
    }
  } else {
    const newId = Math.max(0, ...apps.map(a => a.id)) + 1;
    apps.push({ id: newId, name, category, version, size, logo, logoBg, desc, rating, reviews, tags, url, directUrl });
    saveApps(apps);
    toast('✅ App added successfully!', 'success');
  }

  resetForm();
  goPage('apps');
}

function cancelForm() {
  resetForm();
  goPage('apps');
}

/* ══════════════════════════════
   DELETE
══════════════════════════════ */
let _deleteId = null;

function confirmDelete(id) {
  const a = getApps().find(x => x.id === id);
  if (!a) return;
  _deleteId = id;
  document.getElementById('deleteMsg').textContent = `"${a.name}" will be permanently removed.`;
  document.getElementById('deleteModal').classList.add('open');
  document.getElementById('confirmDeleteBtn').onclick = executeDelete;
}

function executeDelete() {
  if (_deleteId === null) return;
  const updated = getApps().filter(a => a.id !== _deleteId);
  saveApps(updated);
  closeDeleteModal();
  renderTable();
  renderDashboard();
  toast('🗑️ App deleted.', 'error');
}

function closeDeleteModal() {
  document.getElementById('deleteModal').classList.remove('open');
  _deleteId = null;
}

document.getElementById('deleteModal').addEventListener('click', e => {
  if (e.target === document.getElementById('deleteModal')) closeDeleteModal();
});

/* ══════════════════════════════
   FORM HELPERS
══════════════════════════════ */
function resetForm() {
  ['fName','fCategory','fVersion','fSize','fRating','fReviews','fLogo','fDesc','fUrl','fDirectUrl','editId']
    .forEach(id => { document.getElementById(id).value = ''; });
  document.getElementById('fLogoBg').value       = '#ffffff';
  document.getElementById('fLogoBgPicker').value = '#ffffff';
  document.getElementById('tagFree').checked     = false;
  document.getElementById('tagPopular').checked  = false;
  document.getElementById('tagNew').checked      = false;
  document.getElementById('formError').textContent = '';
  updatePreview('', '#ffffff', '');
}

/* Live logo preview */
function livePreview() {
  const src  = document.getElementById('fLogo').value.trim();
  const bg   = document.getElementById('fLogoBg').value.trim() || '#ffffff';
  const name = document.getElementById('fName').value.trim();
  updatePreview(src, bg, name);
}

function updatePreview(src, bg, name) {
  const box      = document.getElementById('lpBox');
  const img      = document.getElementById('lpImg');
  const fallback = document.getElementById('lpFallback');
  const label    = document.getElementById('lpName');

  box.style.background = bg || '#ffffff';
  label.textContent    = name || 'App Name';

  if (src) {
    img.src = src;
    img.style.display = 'block';
    fallback.style.display = 'none';
    img.onerror = () => {
      img.style.display = 'none';
      fallback.style.display = 'block';
      fallback.textContent = name ? name[0].toUpperCase() : '?';
    };
  } else {
    img.style.display = 'none';
    fallback.style.display = 'block';
    fallback.textContent = name ? name[0].toUpperCase() : '?';
  }
}

/* Color picker sync */
function syncColor(source) {
  if (source === 'picker') {
    const val = document.getElementById('fLogoBgPicker').value;
    document.getElementById('fLogoBg').value = val;
    document.getElementById('lpBox').style.background = val;
  } else {
    const val = document.getElementById('fLogoBg').value.trim();
    document.getElementById('lpBox').style.background = val;
    if (/^#[0-9a-f]{6}$/i.test(val))
      document.getElementById('fLogoBgPicker').value = val;
  }
}

/* ══════════════════════════════
   TOAST
══════════════════════════════ */
function toast(msg, type = 'success') {
  const wrap = document.getElementById('toastWrap');
  const el   = document.createElement('div');
  el.className = `toast-item ${type}`;
  el.textContent = msg;
  wrap.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateY(8px)'; el.style.transition = 'all .3s'; }, 2500);
  setTimeout(() => el.remove(), 2900);
}
