const $ = (id) => document.getElementById(id);
let manifest = {};
let currentLang = 'ko';

// ---------- Language ----------

function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;

    // update toggle buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // rebuild plugin selector for new lang
    rebuildPluginSelector();

    // update common (Support) link
    if (manifest.common) {
        const entry = manifest.common[currentLang] || manifest.common[manifest.defaultLang];
        $('common-list').innerHTML = `<a href="#/common/${entry.file.split('/').pop()}">${entry.label}</a>`;
    }

    // re-route: keep current plugin & file, only switch language
    const [_, pid, currentFile] = location.hash.split('/');

    // Support (common) page: switch to the same page in the new language
    if (pid === 'common' && manifest.common) {
        const entry = manifest.common[currentLang] || manifest.common[manifest.defaultLang];
        const newHash = `#/common/${entry.file.split('/').pop()}`;
        if (location.hash === newHash) {
            route();
        } else {
            location.hash = newHash;
        }
        return;
    }

    const plugin = manifest.plugins.find(p => p.id === pid) || manifest.plugins[0];
    const langData = plugin.langs[currentLang] || plugin.langs[manifest.defaultLang];
    const sameFile = langData.docs.find(d => d.file === currentFile);
    const targetFile = sameFile ? currentFile : langData.docs[0].file;
    const newHash = `#/${plugin.id}/${targetFile}`;
    if (location.hash === newHash) {
        route();
    } else {
        location.hash = newHash;
    }
}

function rebuildPluginSelector() {
    const currentPid = location.hash.split('/')[1] || manifest.plugins[0].id;
    const active = manifest.plugins.find(p => p.id === currentPid) || manifest.plugins[0];
    $('plugin-dropdown-label').textContent = active.name;
    $('plugin-dropdown-menu').innerHTML = manifest.plugins.map(p =>
        `<li class="${p.id === active.id ? 'active' : ''}">
            <button data-pid="${p.id}">${p.name}</button>
        </li>`
    ).join('');
    $('plugin-dropdown-menu').querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            const p = manifest.plugins.find(p => p.id === btn.dataset.pid);
            const langData = p.langs[currentLang] || p.langs[manifest.defaultLang];
            location.hash = `#/${p.id}/${langData.docs[0].file}`;
            closePluginDropdown();
        });
    });
}

function openPluginDropdown() {
    const btn = $('plugin-dropdown-btn');
    const menu = $('plugin-dropdown-menu');
    btn.setAttribute('aria-expanded', 'true');
    menu.classList.add('open');
}

function closePluginDropdown() {
    const btn = $('plugin-dropdown-btn');
    const menu = $('plugin-dropdown-menu');
    btn.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
}

// ---------- marked.js config ----------

const renderer = new marked.Renderer();
renderer.link = ({ href, title, text }) =>
    `<a href="${href}"${title ? ` title="${title}"` : ''} target="_blank" rel="noopener noreferrer">${text}</a>`;
marked.use({ renderer });

// ---------- Routing ----------

async function route() {
    const [_, pid, file] = location.hash.split('/');

    // Common (Support) page
    const commonEntry = manifest.common && manifest.common[currentLang];
    const isCommon = pid === 'common' && commonEntry;

    if (isCommon) {
        $('menu-list').querySelectorAll('li').forEach(li => li.classList.remove('active'));
        if ($('common-list')) {
            $('common-list').querySelectorAll('a').forEach(a => {
                a.classList.toggle('active', a.getAttribute('href') === `#/common/${file}`);
            });
        }
        const res = await fetch(`docs/${commonEntry.file}`);
        $('markdown-viewer').innerHTML = res.ok ? marked.parse(await res.text()) : 'File not found.';
        window.scrollTo(0, 0);
        return;
    }

    // Plugin page
    const plugin = manifest.plugins.find(p => p.id === pid) || manifest.plugins[0];
    const langData = plugin.langs[currentLang] || plugin.langs[manifest.defaultLang];
    const doc = langData.docs.find(d => d.file === file) || langData.docs[0];

    // URL correction
    if (location.hash !== `#/${plugin.id}/${doc.file}`) {
        location.hash = `#/${plugin.id}/${doc.file}`;
        return;
    }

    // Update UI
    $('plugin-dropdown-label').textContent = plugin.name;
    $('plugin-dropdown-menu').querySelectorAll('li').forEach(li => {
        li.classList.toggle('active', li.querySelector('button')?.dataset.pid === plugin.id);
    });
    $('menu-list').innerHTML = langData.docs.map(d =>
        `<li class="${d.file === doc.file ? 'active' : ''}"><a href="#/${plugin.id}/${d.file}">${d.label}</a></li>`
    ).join('');

    if ($('common-list')) {
        $('common-list').querySelectorAll('a').forEach(a => a.classList.remove('active'));
    }

    // Load document
    const res = await fetch(`docs/${langData.path}/${doc.file}`);
    $('markdown-viewer').innerHTML = res.ok ? marked.parse(await res.text()) : 'File not found.';
    window.scrollTo(0, 0);
}

// ---------- Init ----------

async function init() {
    try {
        manifest = await (await fetch('docs/manifest.json')).json();

        // Restore saved lang
        const saved = localStorage.getItem('lang');
        if (saved && manifest.langs.includes(saved)) {
            currentLang = saved;
            document.documentElement.lang = saved;
            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.lang === saved);
            });
        }

        rebuildPluginSelector();

        $('plugin-dropdown-btn').addEventListener('click', () => {
            const isOpen = $('plugin-dropdown-btn').getAttribute('aria-expanded') === 'true';
            isOpen ? closePluginDropdown() : openPluginDropdown();
        });

        document.addEventListener('click', (e) => {
            if (!$('plugin-dropdown').contains(e.target)) closePluginDropdown();
        });

        // Common list (Support link)
        if (manifest.common) {
            const entry = manifest.common[currentLang] || manifest.common[manifest.defaultLang];
            $('common-list').innerHTML = `<a href="#/common/${entry.file.split('/').pop()}">${entry.label}</a>`;
        }

        // Lang toggle buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.dataset.lang !== currentLang) setLang(btn.dataset.lang);
            });
        });

        window.onhashchange = route;
        route();
    } catch (e) {
        $('markdown-viewer').innerHTML = 'Failed to load manifest.';
        console.error(e);
    }
}

// ---------- QR Popup ----------

function showQRPopup(src) {
    document.getElementById('qr-popup-img').src = src;
    document.getElementById('qr-popup').style.display = 'flex';
}

function closeQRPopup() {
    document.getElementById('qr-popup').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    init();
    document.getElementById('qr-popup').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeQRPopup();
    });
});
