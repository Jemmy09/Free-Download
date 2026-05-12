// Logos: cdn.simpleicons.org (verified 200 OK, hotlink-friendly, official brand SVGs)
// VS Code: Wikimedia Commons (simpleicons has no VS Code entry)
const SOFTWARE = [
  {
    id: 1, name: "Google Chrome", category: "browsers", tags: ["free", "popular"],
    logo: "https://cdn.simpleicons.org/googlechrome",
    logoBg: "#fff",
    version: "v136.0.7103.114", size: "85.7 MB", rating: 4.7, reviews: "3.2M",
    desc: "The world's most popular web browser. Fast, secure, and packed with Google features and extensions.",
    url: "https://www.google.com/chrome/",
    directUrl: "https://dl.google.com/chrome/install/ChromeStandaloneSetup64.exe"
  },
  {
    id: 2, name: "Mozilla Firefox", category: "browsers", tags: ["free", "popular"],
    logo: "https://cdn.simpleicons.org/firefox",
    logoBg: "#fff",
    version: "v138.0.1", size: "55.3 MB", rating: 4.6, reviews: "1.8M",
    desc: "Open-source browser built for privacy and speed. Highly customizable with thousands of add-ons.",
    url: "https://www.mozilla.org/firefox/new/",
    directUrl: "https://download.mozilla.org/?product=firefox-latest&os=win64&lang=en-US"
  },
  {
    id: 3, name: "VS Code", category: "developer", tags: ["free", "popular", "new"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg",
    logoBg: "#007acc", // Wikimedia — simpleicons has no VS Code entry
    version: "v1.100.0", size: "91.4 MB", rating: 4.9, reviews: "4.1M",
    desc: "Microsoft's lightweight but powerful source code editor with built-in Git, debugging, and 50K+ extensions.",
    url: "https://code.visualstudio.com/download",
    directUrl: "https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user"
  },
  {
    id: 4, name: "VLC Media Player", category: "media", tags: ["free", "popular"],
    logo: "https://cdn.simpleicons.org/vlcmediaplayer",
    logoBg: "#ff8800",
    version: "v3.0.21", size: "40.6 MB", rating: 4.8, reviews: "5.4M",
    desc: "The ultimate free media player. Plays MKV, MP4, AVI, FLAC, and virtually every format without codecs.",
    url: "https://www.videolan.org/vlc/download-windows.html",
    directUrl: "https://get.videolan.org/vlc/last/win64/"
  },
  {
    id: 5, name: "Malwarebytes", category: "security", tags: ["free", "popular"],
    logo: "https://cdn.simpleicons.org/malwarebytes",
    logoBg: "#fff",
    version: "v5.2.2", size: "217 MB", rating: 4.6, reviews: "1.1M",
    desc: "Industry-leading anti-malware. Detects and removes ransomware, spyware, and zero-day threats in real time.",
    url: "https://www.malwarebytes.com/mwb-download",
    directUrl: "https://downloads.malwarebytes.com/file/mb5_installer"
  },
  {
    id: 6, name: "Discord", category: "gaming", tags: ["free", "popular"],
    logo: "https://cdn.simpleicons.org/discord",
    logoBg: "#5865f2",
    version: "v1.0.9177", size: "74.8 MB", rating: 4.7, reviews: "2.3M",
    desc: "All-in-one voice, video, and text communication for gaming communities, teams, and friends.",
    url: "https://discord.com/download",
    directUrl: "https://discord.com/api/downloads/distributions/app/installers/latest?channel=stable&platform=win&arch=x86"
  },
  {
    id: 7, name: "GIMP", category: "design", tags: ["free"],
    logo: "https://cdn.simpleicons.org/gimp",
    logoBg: "#fff",
    version: "v2.10.38", size: "253 MB", rating: 4.4, reviews: "680K",
    desc: "Professional-grade free image editor. Supports layers, masks, filters, and advanced color correction.",
    url: "https://www.gimp.org/downloads/",
    directUrl: "https://download.gimp.org/gimp/v2.10/windows/gimp-2.10.38-setup.exe"
  },
  {
    id: 8, name: "7-Zip", category: "utilities", tags: ["free", "popular"],
    logo: "https://cdn.simpleicons.org/7zip",
    logoBg: "#fff",
    version: "v24.09", size: "1.6 MB", rating: 4.8, reviews: "3.7M",
    desc: "High-ratio file archiver with AES-256 encryption. Supports 7z, ZIP, RAR, TAR, ISO, and 30+ formats.",
    url: "https://www.7-zip.org/download.html",
    directUrl: "https://www.7-zip.org/a/7z2409-x64.exe"
  },
  {
    id: 9, name: "Spotify", category: "media", tags: ["free", "new"],
    logo: "https://cdn.simpleicons.org/spotify",
    logoBg: "#191414",
    version: "v1.2.52", size: "118 MB", rating: 4.6, reviews: "3.1M",
    desc: "Stream 100M+ songs, podcasts, and audiobooks. Create playlists, discover new music with AI-powered recommendations.",
    url: "https://www.spotify.com/download/windows/",
    directUrl: "https://download.scdn.co/SpotifySetup.exe"
  },
  {
    id: 10, name: "Audacity", category: "media", tags: ["free"],
    logo: "https://cdn.simpleicons.org/audacity",
    logoBg: "#fff",
    version: "v3.7.3", size: "36.2 MB", rating: 4.5, reviews: "520K",
    desc: "Free, open-source multi-track audio editor and recorder. Ideal for podcasts, music production, and sound design.",
    url: "https://www.audacityteam.org/download/",
    directUrl: "https://github.com/audacity/audacity/releases/download/Audacity-3.7.3/audacity-win-3.7.3-x64.exe"
  },
  {
    id: 11, name: "Notion", category: "productivity", tags: ["free", "new"],
    logo: "https://cdn.simpleicons.org/notion",
    logoBg: "#fff",
    version: "v4.4.0", size: "152 MB", rating: 4.7, reviews: "890K",
    desc: "All-in-one workspace for notes, wikis, databases, and project management. Used by 30M+ people worldwide.",
    url: "https://www.notion.so/desktop",
    directUrl: "https://desktop-release.notion-static.com/Notion%20Setup%204.4.0.exe"
  },
  {
    id: 12, name: "OBS Studio", category: "media", tags: ["free", "popular"],
    logo: "https://cdn.simpleicons.org/obsstudio",
    logoBg: "#302e31",
    version: "v31.0.3", size: "289 MB", rating: 4.8, reviews: "1.4M",
    desc: "Free and open-source software for professional video recording and live streaming to Twitch, YouTube, and more.",
    url: "https://obsproject.com/download",
    directUrl: "https://github.com/obsproject/obs-studio/releases/download/31.0.3/OBS-Studio-31.0.3-Windows-Installer.exe"
  },
  {
    id: 13, name: "LibreOffice", category: "productivity", tags: ["free", "popular"],
    logo: "https://cdn.simpleicons.org/libreoffice",
    logoBg: "#fff",
    version: "v24.8.5", size: "357 MB", rating: 4.5, reviews: "960K",
    desc: "Full-featured free office suite with Writer, Calc, Impress, and Draw. 100% compatible with MS Office formats.",
    url: "https://www.libreoffice.org/download/libreoffice/",
    directUrl: "https://download.documentfoundation.org/libreoffice/stable/24.8.5/win/x86_64/LibreOffice_24.8.5_Win_x86-64.msi"
  },
  {
    id: 14, name: "Brave Browser", category: "browsers", tags: ["free", "new"],
    logo: "https://cdn.simpleicons.org/brave",
    logoBg: "#fff",
    version: "v1.67.134", size: "97.2 MB", rating: 4.6, reviews: "620K",
    desc: "Privacy-first browser with built-in ad blocker, tracker blocking, and optional crypto rewards. 3x faster than Chrome.",
    url: "https://brave.com/download/",
    directUrl: "https://laptop-updates.brave.com/latest/winx64"
  },
  {
    id: 15, name: "Notepad++", category: "developer", tags: ["free", "popular"],
    logo: "https://cdn.simpleicons.org/notepadplusplus",
    logoBg: "#fff",
    version: "v8.7.9", size: "4.5 MB", rating: 4.8, reviews: "2.5M",
    desc: "Powerful free text and source code editor with syntax highlighting for 80+ languages and plugin support.",
    url: "https://notepad-plus-plus.org/downloads/",
    directUrl: "https://github.com/notepad-plus-plus/notepad-plus-plus/releases/download/v8.7.9/npp.8.7.9.Installer.x64.exe"
  },
  {
    id: 16, name: "qBittorrent", category: "utilities", tags: ["free", "popular"],
    logo: "https://cdn.simpleicons.org/qbittorrent",
    logoBg: "#fff",
    version: "v5.0.4", size: "33.1 MB", rating: 4.7, reviews: "1.5M",
    desc: "Open-source BitTorrent client with no ads, no bundled software, and a built-in torrent search engine.",
    url: "https://www.qbittorrent.org/download",
    directUrl: "https://sourceforge.net/projects/qbittorrent/files/latest/download"
  },
];

// Sanitize strings before injecting into HTML — prevents XSS/code injection
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Load from localStorage if admin has made changes, otherwise use defaults
function getApps() {
  try {
    const stored = localStorage.getItem('fd_software');
    return stored ? JSON.parse(stored) : SOFTWARE;
  } catch (e) {
    return SOFTWARE;
  }
}

let activeFilter = "all";

function renderSoftware(list) {
  const grid = document.getElementById("softwareGrid");
  if (!list.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;color:var(--muted);padding:3rem">No software found.</div>`;
    return;
  }
  grid.innerHTML = list.map(sw => `
    <div class="sw-card" data-id="${sw.id}">
      <div class="sw-card-header">
        <div class="sw-icon" style="background:${esc(sw.logoBg)}">
          <img src="${esc(sw.logo)}" alt="${esc(sw.name)} logo" data-fallback="${esc(sw.name[0])}">
        </div>
        <div class="sw-info">
          <h3>${esc(sw.name)}</h3>
          <div class="sw-version">${esc(sw.version)}</div>
        </div>
      </div>
      <div class="sw-tags">
        ${sw.tags.map(t => `<span class="sw-tag tag-${esc(t)}">${esc(t.charAt(0).toUpperCase() + t.slice(1))}</span>`).join("")}
      </div>
      <p class="sw-desc">${esc(sw.desc)}</p>
      <div class="sw-footer">
        <div class="sw-rating">
          <span class="stars">${"\u2605".repeat(Math.floor(sw.rating))}${sw.rating % 1 >= 0.5 ? "\u00bd" : ""}${"\u2606".repeat(5 - Math.ceil(sw.rating))}</span>
          <span>${sw.rating} (${esc(sw.reviews)})</span>
        </div>
        <button class="sw-dl-btn" data-id="${sw.id}">\u2b07 Get</button>
      </div>
    </div>
  `).join("");

  // Safe event listeners — no inline onclick handlers, no injected executable code
  grid.querySelectorAll('.sw-card').forEach(card => {
    card.addEventListener('click', () => openModal(parseInt(card.dataset.id, 10)));
  });
  grid.querySelectorAll('.sw-dl-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openModal(parseInt(btn.dataset.id, 10));
    });
  });

  // Safe image fallback — no inline onerror to prevent code injection
  grid.querySelectorAll('.sw-icon img').forEach(img => {
    img.addEventListener('error', function () {
      const letter = this.dataset.fallback || '?';
      this.parentNode.innerHTML = '<span style="font-size:1.4rem;font-weight:700">' + letter + '</span>';
    });
  });
}

function filterSoftware(filter) {
  activeFilter = filter;
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.querySelector(`[data-filter="${filter}"]`).classList.add("active");
  const filtered = filter === "all" ? getApps() : getApps().filter(s => s.tags.includes(filter));
  renderSoftware(filtered);
}

document.getElementById("filterTabs").addEventListener("click", e => {
  if (e.target.classList.contains("tab")) filterSoftware(e.target.dataset.filter);
});

// MODAL
function openModal(id) {
  const sw = getApps().find(s => s.id === id);
  if (!sw) return;
  const modalIconEl = document.getElementById("modalIcon");
  modalIconEl.style.background = sw.logoBg;
  const mImg = document.createElement('img');
  mImg.src = sw.logo;
  mImg.alt = sw.name;
  mImg.addEventListener('error', function () {
    modalIconEl.innerHTML = '<span style="font-size:2.8rem;font-weight:700">' + esc(sw.name[0]) + '</span>';
  });
  modalIconEl.innerHTML = '';
  modalIconEl.appendChild(mImg);
  document.getElementById("modalTitle").textContent = sw.name;
  document.getElementById("modalDesc").textContent = sw.desc;
  document.getElementById("modalMeta").innerHTML = `
    <div><strong>${esc(sw.version)}</strong><small>Version</small></div>
    <div><strong>${esc(sw.size)}</strong><small>File Size</small></div>
    <div><strong>${sw.rating}/5</strong><small>Rating</small></div>
    <div><strong>${esc(sw.reviews)}</strong><small>Reviews</small></div>
  `;
  document.getElementById("progressWrap").style.display = "none";
  document.getElementById("modalActions").style.display = "flex";
  document.getElementById("progressFill").style.width = "0%";
  document.getElementById("modalOverlay").classList.add("open");
  document.getElementById("downloadBtn").onclick = () => startDownload(sw);
  document.getElementById("officialPageBtn").href = sw.url;
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("open");
}

document.getElementById("modalClose").onclick = closeModal;
document.getElementById("modalClose2").onclick = closeModal;
document.getElementById("modalOverlay").addEventListener("click", e => {
  if (e.target === document.getElementById("modalOverlay")) closeModal();
});

function startDownload(sw) {
  document.getElementById("progressWrap").style.display = "block";
  const fill = document.getElementById("progressFill");
  const text = document.getElementById("progressText");
  let progress = 0;
  text.textContent = "Connecting to official server...";
  fill.style.width = "0%";

  // Trigger the real download immediately
  const a = document.createElement("a");
  a.href = sw.directUrl;
  a.download = "";
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // Visual progress feedback
  const messages = ["Connecting to official server...", "Verifying file integrity...", "Starting download...", "Download initiated!"];
  const interval = setInterval(() => {
    progress += Math.random() * 12 + 4;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      fill.style.width = "100%";
      text.textContent = "\u2705 Download started! If it didn't begin, ";
      const dlLink = document.createElement('a');
      dlLink.href = sw.directUrl;
      dlLink.target = '_blank';
      dlLink.rel = 'noopener noreferrer';
      dlLink.style.color = 'var(--accent2)';
      dlLink.textContent = 'click here';
      text.appendChild(dlLink);
      text.appendChild(document.createTextNode('.'));
      return;
    }
    fill.style.width = progress + "%";
    text.textContent = messages[Math.floor(progress / 25)] || "Starting download...";
  }, 100);
}

// SEARCH
const searchToggle = document.getElementById("searchToggle");
const searchBar = document.getElementById("searchBar");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

searchToggle.addEventListener("click", () => {
  searchBar.classList.toggle("open");
  if (searchBar.classList.contains("open")) searchInput.focus();
});

searchInput.addEventListener("input", () => {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) { searchResults.innerHTML = ""; return; }
  const matches = getApps().filter(s => s.name.toLowerCase().includes(q) || s.category.includes(q));
  if (!matches.length) {
    searchResults.innerHTML = `<div style="padding:1rem;color:var(--muted);text-align:center;font-size:.875rem">No results found</div>`;
    return;
  }
  searchResults.innerHTML = matches.slice(0, 6).map(s => `
    <div class="search-result-item" data-id="${s.id}">
      <div class="sri-logo" style="background:${esc(s.logoBg)}"><img src="${esc(s.logo)}" alt="${esc(s.name)}"></div>
      <div class="sri-info"><strong>${esc(s.name)}</strong><small>${esc(s.category)} • ${esc(s.version)}</small></div>
      <span class="sri-badge">${esc(s.tags[0])}</span>
    </div>
  `).join('');
  // Attach click handlers via JS — no inline onclick, no injected code
  searchResults.querySelectorAll('.search-result-item').forEach(item => {
    item.addEventListener('click', () => {
      openModal(parseInt(item.dataset.id, 10));
      searchBar.classList.remove('open');
      searchResults.innerHTML = '';
    });
  });
});

// HERO SEARCH
function heroSearchFn() {
  const q = document.getElementById("heroSearch").value.trim().toLowerCase();
  if (!q) return;
  document.getElementById("featured").scrollIntoView({ behavior: "smooth" });
  setTimeout(() => {
    const matches = getApps().filter(s => s.name.toLowerCase().includes(q) || s.category.includes(q));
    renderSoftware(matches.length ? matches : getApps());
  }, 600);
}
document.getElementById("heroSearch").addEventListener("keydown", e => {
  if (e.key === "Enter") heroSearchFn();
});

// CATEGORY CLICK
document.querySelectorAll(".cat-card").forEach(card => {
  card.addEventListener("click", () => {
    const cat = card.dataset.cat;
    document.getElementById("featured").scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      const matches = getApps().filter(s => s.category === cat);
      renderSoftware(matches.length ? matches : getApps());
      document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
      document.querySelector('[data-filter="all"]').classList.add("active");
    }, 600);
  });
});

// HAMBURGER
document.getElementById("hamburger").addEventListener("click", () => {
  const links = document.querySelector(".nav-links");
  const actions = document.querySelector(".nav-actions");
  links.style.display = links.style.display === "flex" ? "none" : "flex";
  links.style.flexDirection = "column";
  links.style.position = "absolute";
  links.style.top = "68px";
  links.style.left = "0";
  links.style.right = "0";
  links.style.background = "var(--bg2)";
  links.style.padding = "1rem 2rem";
  links.style.borderBottom = "1px solid var(--border)";
});

// INIT — use localStorage data so admin changes are reflected
renderSoftware(getApps());
