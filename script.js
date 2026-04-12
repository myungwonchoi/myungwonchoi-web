const $ = (id) => document.getElementById(id);
let manifest = {};
let currentLang = 'en';
let skipScroll = false;

// Caches
const docCache = new Map();     // Raw markdown text
const htmlCache = new Map();    // Parsed HTML content

function getRouteIntent() {
    const [_, pid] = location.hash.split('/');
    return pid || 'about';
}

function showPluginLoadingShell() {
    const selector = document.querySelector('.plugin-selector');
    if (selector) selector.style.display = 'block';

    updateTopbarNav('plugins');
    closePluginDropdown();

    $('plugin-dropdown-label').textContent = 'Loading plugins...';
    $('plugin-dropdown-menu').innerHTML = `
        <li class="active skeleton-line skeleton-pill"></li>
        <li class="skeleton-line skeleton-pill"></li>
        <li class="skeleton-line skeleton-pill"></li>
    `;

    $('menu-list').innerHTML = `
        <li class="skeleton-line"></li>
        <li class="skeleton-line"></li>
        <li class="skeleton-line short"></li>
    `;

    const viewer = $('markdown-viewer');
    viewer.classList.add('loading-shell');
    viewer.innerHTML = `
        <div class="doc-skeleton" aria-hidden="true">
            <div class="skeleton-line title"></div>
            <div class="skeleton-line"></div>
            <div class="skeleton-line"></div>
            <div class="skeleton-line short"></div>
            <div class="skeleton-block"></div>
            <div class="skeleton-line"></div>
            <div class="skeleton-line medium"></div>
        </div>
    `;
}

function clearLoadingShell() {
    $('markdown-viewer').classList.remove('loading-shell');
}

// ---------- Pre-fetching ----------

async function prefetchDocs() {
    const paths = [];
    
    // Collect all paths from manifest
    if (manifest.about) Object.values(manifest.about).forEach(e => paths.push(`docs/${e.file}`));
    if (manifest.support) Object.values(manifest.support).forEach(e => paths.push(`docs/${e.file}`));
    if (manifest.plugins) {
        manifest.plugins.forEach(p => {
            Object.values(p.langs).forEach(l => {
                l.docs.forEach(d => paths.push(`docs/${l.path}/${d.file}`));
            });
        });
    }

    // Background fetch and preload images
    paths.forEach(async path => {
        if (docCache.has(path)) return;
        try {
            const res = await fetch(path);
            if (res.ok) {
                const text = await res.text();
                docCache.set(path, text);
                
                // Pre-parse and preload images found in markdown
                const html = marked.parse(text);
                htmlCache.set(path, html);
                
                // Extract image sources and preload
                const imgRegex = /<img [^>]*src="([^"]+)"/g;
                let match;
                while ((match = imgRegex.exec(html)) !== null) {
                    const img = new Image();
                    img.src = match[1];
                }
            }
        } catch (e) {
            console.warn(`Failed to prefetch: ${path}`, e);
        }
    });
}

// ---------- Language ----------

function setLang(lang) {
    if (currentLang === lang) return;
    
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    rebuildPluginSelector();

    if (manifest.about) {
        const aboutEntry = manifest.about[currentLang] || manifest.about[manifest.defaultLang];
        const aboutLink = $('nav-about');
        if (aboutLink) aboutLink.href = `#/about/${aboutEntry.file.split('/').pop()}`;
    }

    if (manifest.support) {
        const supportEntry = manifest.support[currentLang] || manifest.support[manifest.defaultLang];
        const supportLink = $('nav-support');
        if (supportLink) supportLink.href = `#/support/${supportEntry.file.split('/').pop()}`;
    }

    skipScroll = true;

    const [_, pid, file, extra] = location.hash.split('/');

    if (pid === 'plugins' && file) {
        const pluginId = file;
        const currentDocFile = extra;
        const plugin = manifest.plugins.find(p => p.id === pluginId) || manifest.plugins[0];
        const langData = plugin.langs[currentLang] || plugin.langs[manifest.defaultLang];
        const sameFile = langData.docs.find(d => d.file === currentDocFile);
        const targetFile = sameFile ? currentDocFile : langData.docs[0].file;
        const newHash = `#/plugins/${plugin.id}/${targetFile}`;
        if (location.hash === newHash) route(); else location.hash = newHash;
        return;
    }

    if (pid === 'about' || pid === 'support') {
        const section = manifest[pid];
        const entry = section[currentLang] || section[manifest.defaultLang];
        const newHash = `#/${pid}/${entry.file.split('/').pop()}`;
        if (location.hash === newHash) route(); else location.hash = newHash;
        return;
    }

    // Default fallback
    if (manifest.about) {
        const entry = manifest.about[currentLang] || manifest.about[manifest.defaultLang];
        location.hash = `#/about/${entry.file.split('/').pop()}`;
    }
}

function rebuildPluginSelector() {
    const currentPid = location.hash.split('/')[1] || (manifest.plugins && manifest.plugins[0].id);
    if (!currentPid) return;

    $('plugin-dropdown-menu').innerHTML = manifest.plugins.map(p =>
        `<li class="${p.id === currentPid ? 'active' : ''}">
            <button data-pid="${p.id}">${p.name}</button>
        </li>`
    ).join('');

    if ((currentPid === 'about' || currentPid === 'support') && manifest[currentPid]) {
        const entry = manifest[currentPid][currentLang] || manifest[currentPid][manifest.defaultLang];
        $('plugin-dropdown-label').textContent = entry.label;
    } else {
        const active = manifest.plugins.find(p => p.id === currentPid) || manifest.plugins[0];
        $('plugin-dropdown-label').textContent = active.name;
    }

    $('plugin-dropdown-menu').querySelectorAll('button').forEach(btn => {
        btn.onclick = () => {
            const p = manifest.plugins.find(p => p.id === btn.dataset.pid);
            const langData = p.langs[currentLang] || p.langs[manifest.defaultLang];
            location.hash = `#/plugins/${p.id}/${langData.docs[0].file}`;
            closePluginDropdown();
        };
    });
}

function openPluginDropdown() {
    $('plugin-dropdown-btn').setAttribute('aria-expanded', 'true');
    $('plugin-dropdown-menu').classList.add('open');
}

function closePluginDropdown() {
    $('plugin-dropdown-btn').setAttribute('aria-expanded', 'false');
    $('plugin-dropdown-menu').classList.remove('open');
}

function updateTopbarNav(pid) {
    document.querySelectorAll('.topbar-nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.nav === pid);
    });
}

// ---------- marked.js config ----------

const renderer = new marked.Renderer();
renderer.link = ({ href, title, text }) =>
    `<a href="${href}"${title ? ` title="${title}"` : ''} target="_blank" rel="noopener noreferrer">${text}</a>`;
marked.use({ renderer });

const CAPTION_TAGS = new Set(['BR', 'EM', 'STRONG']);

function serializeNode(node) {
    if (node.nodeType === Node.TEXT_NODE) return node.textContent;
    if (node.nodeType === Node.ELEMENT_NODE) return node.outerHTML;
    return '';
}

function hasMeaningfulContent(node) {
    return node.nodeType === Node.TEXT_NODE ? node.textContent.trim().length > 0 : (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'BR');
}

function isAllowedCaptionNode(node) {
    return node.nodeType === Node.TEXT_NODE || (node.nodeType === Node.ELEMENT_NODE && CAPTION_TAGS.has(node.tagName));
}

function trimTrailingWhitespace(nodes) {
    const trimmed = [...nodes];
    while (trimmed.length > 0) {
        const last = trimmed.at(-1);
        if (last.nodeType === Node.TEXT_NODE && last.textContent.trim().length === 0) { trimmed.pop(); continue; }
        if (last.nodeType === Node.ELEMENT_NODE && last.tagName === 'BR') { trimmed.pop(); continue; }
        break;
    }
    return trimmed;
}

function parseImageCardParagraph(paragraph) {
    const childNodes = Array.from(paragraph.childNodes);
    const imageIndex = childNodes.findIndex(node => node.nodeType === Node.ELEMENT_NODE && node.tagName === 'IMG');
    if (imageIndex === -1) return null;

    const image = childNodes[imageIndex];
    const beforeNodes = trimTrailingWhitespace(childNodes.slice(0, imageIndex));
    const afterNodes = childNodes.slice(imageIndex + 1);

    if (afterNodes.some(node => !isAllowedCaptionNode(node))) return null;

    return {
        image,
        beforeHtml: beforeNodes.map(serializeNode).join('').trim(),
        captionHtml: afterNodes.map(serializeNode).join('').trim(),
        hasLeadingContent: beforeNodes.some(hasMeaningfulContent),
    };
}

function createImageCard(image, captionHtml) {
    const figure = document.createElement('figure');
    figure.className = 'image-card';
    image.classList.add('image-card-image');
    image.loading = 'lazy'; // Add native lazy loading
    figure.appendChild(image);

    if (captionHtml) {
        const figcaption = document.createElement('figcaption');
        figcaption.className = 'image-card-caption';
        figcaption.innerHTML = captionHtml;
        figure.appendChild(figcaption);
    }
    return figure;
}

function decorateMarkdownImages() {
    const viewer = $('markdown-viewer');
    // Only target paragraphs that actually contain images to reduce DOM load
    viewer.querySelectorAll('p img').forEach((img) => {
        const p = img.closest('p');
        if (!p) return;
        
        const imageCard = parseImageCardParagraph(p);
        if (!imageCard) return;

        const figure = createImageCard(imageCard.image, imageCard.hasLeadingContent ? '' : imageCard.captionHtml);
        if (imageCard.hasLeadingContent) {
            const textParagraph = document.createElement('p');
            textParagraph.innerHTML = imageCard.beforeHtml;
            p.replaceWith(textParagraph, figure);
        } else {
            p.replaceWith(figure);
        }
    });
}

async function renderMarkdownDoc(path) {
    const viewer = $('markdown-viewer');
    clearLoadingShell();
    
    // 1. Check HTML cache first (Fastest)
    if (htmlCache.has(path)) {
        viewer.innerHTML = htmlCache.get(path);
        decorateMarkdownImages();
        return;
    }

    // 2. Check Raw cache and parse
    if (docCache.has(path)) {
        const html = marked.parse(docCache.get(path));
        htmlCache.set(path, html);
        viewer.innerHTML = html;
        decorateMarkdownImages();
        return;
    }

    // 3. Network Fetch
    viewer.classList.add('loading');
    try {
        const res = await fetch(path);
        if (res.ok) {
            const text = await res.text();
            const html = marked.parse(text);
            docCache.set(path, text);
            htmlCache.set(path, html);
            viewer.innerHTML = html;
            decorateMarkdownImages();
        } else {
            viewer.innerHTML = 'File not found.';
        }
    } catch (e) {
        console.error(e);
        viewer.innerHTML = 'Failed to load document.';
    } finally {
        viewer.classList.remove('loading');
    }
}

// ---------- Routing ----------

async function route() {
    let currentSkipScroll = skipScroll;
    skipScroll = false;

    const [_, pid, file, extra] = location.hash.split('/');

    if (!pid && manifest.about) {
        const entry = manifest.about[currentLang] || manifest.about[manifest.defaultLang];
        location.hash = `#/about/${entry.file.split('/').pop()}`;
        return;
    }

    updateTopbarNav(pid);

    // Handle pages
    if (pid === 'about' || pid === 'support') {
        const entry = manifest[pid] && (manifest[pid][currentLang] || manifest[pid][manifest.defaultLang]);
        if (entry) {
            const selector = document.querySelector('.plugin-selector');
            if (selector) selector.style.display = 'none';
            clearLoadingShell();
            $('plugin-dropdown-label').textContent = entry.label;
            $('menu-list').innerHTML = `<li class="active"><a href="#/${pid}/${entry.file.split('/').pop()}">${entry.label}</a></li>`;
            await renderMarkdownDoc(`docs/${entry.file}`);
            if (!currentSkipScroll) window.scrollTo(0, 0);
            return;
        }
    }

    if (pid === 'plugins') {
        const selector = document.querySelector('.plugin-selector');
        if (selector) selector.style.display = 'block';

        const plugin = manifest.plugins.find(p => p.id === file) || manifest.plugins[0];
        const langData = plugin.langs[currentLang] || plugin.langs[manifest.defaultLang];
        const doc = langData.docs.find(d => d.file === extra) || langData.docs[0];

        if (location.hash !== `#/plugins/${plugin.id}/${doc.file}`) {
            location.hash = `#/plugins/${plugin.id}/${doc.file}`;
            return;
        }

        $('plugin-dropdown-label').textContent = plugin.name;
        $('plugin-dropdown-menu').querySelectorAll('li').forEach(li => {
            li.classList.toggle('active', li.querySelector('button')?.dataset.pid === plugin.id);
        });
        $('menu-list').innerHTML = langData.docs.map(d =>
            `<li class="${d.file === doc.file ? 'active' : ''}"><a href="#/plugins/${plugin.id}/${d.file}">${d.label}</a></li>`
        ).join('');

        await renderMarkdownDoc(`docs/${langData.path}/${doc.file}`);
        if (!currentSkipScroll) window.scrollTo(0, 0);
    }
}

// ---------- Init ----------

async function init() {
    try {
        if (getRouteIntent() === 'plugins') {
            showPluginLoadingShell();
        } else {
            updateTopbarNav(getRouteIntent());
        }

        manifest = await (await fetch('docs/manifest.json')).json();

        const saved = localStorage.getItem('lang');
        if (saved && manifest.langs.includes(saved)) {
            currentLang = saved;
            document.documentElement.lang = saved;
            document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === saved));
        }

        rebuildPluginSelector();

        $('plugin-dropdown-btn').onclick = () => {
            const isOpen = $('plugin-dropdown-btn').getAttribute('aria-expanded') === 'true';
            isOpen ? closePluginDropdown() : openPluginDropdown();
        };

        document.onclick = (e) => { if (!$('plugin-dropdown').contains(e.target)) closePluginDropdown(); };

        const pluginsLink = $('nav-plugins');
        if (pluginsLink && manifest.plugins?.length) {
            pluginsLink.onclick = (e) => {
                e.preventDefault();
                showPluginLoadingShell();
                const p = manifest.plugins[0];
                const ld = p.langs[currentLang] || p.langs[manifest.defaultLang];
                location.hash = `#/plugins/${p.id}/${ld.docs[0].file}`;
            };
        }

        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.onclick = () => { if (btn.dataset.lang !== currentLang) setLang(btn.dataset.lang); };
        });

        window.onhashchange = route;
        prefetchDocs();
        route();
    } catch (e) {
        $('markdown-viewer').innerHTML = 'Failed to load manifest.';
        console.error(e);
    }
}

document.addEventListener('DOMContentLoaded', init);
