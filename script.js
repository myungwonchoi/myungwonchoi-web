const $ = (id) => document.getElementById(id);
let manifest = {};

async function route() {
    const [_, pid, file] = location.hash.split('/');
    
    // 공통 메뉴 처리 (e.g., Support)
    let isCommon = manifest.common && manifest.common.some(d => d.file === file) && pid === 'common';
    let doc, plugin;

    if (isCommon) {
        doc = manifest.common.find(d => d.file === file);
        
        $('menu-list').querySelectorAll('li').forEach(li => li.classList.remove('active'));
        if ($('common-list')) {
            $('common-list').querySelectorAll('a').forEach(a => {
                if (a.getAttribute('href') === `#/${pid}/${doc.file}`) {
                    a.classList.add('active');
                } else {
                    a.classList.remove('active');
                }
            });
        }
        
        const res = await fetch(`docs/${doc.file}`);
        $('markdown-viewer').innerHTML = res.ok ? marked.parse(await res.text()) : 'File not found.';
        window.scrollTo(0, 0);
        return;
    }

    // 일반 플러그인 메뉴 처리
    plugin = manifest.plugins.find(p => p.id === pid) || manifest.plugins[0];
    doc = plugin.docs.find(d => d.file === file) || plugin.docs[0];

    // URL 보정
    if (location.hash !== `#/${plugin.id}/${doc.file}`) {
        location.hash = `#/${plugin.id}/${doc.file}`;
        return;
    }

    // UI 업데이트
    $('plugin-select').value = plugin.id;
    $('menu-list').innerHTML = plugin.docs.map(d => 
        `<li class="${d.file === doc.file ? 'active' : ''}"><a href="#/${plugin.id}/${d.file}">${d.label}</a></li>`
    ).join('');
    
    // common 영역 활성화 해제
    if ($('common-list')) {
        $('common-list').querySelectorAll('a').forEach(a => a.classList.remove('active'));
    }

    // 문서 로드
    const res = await fetch(`docs/${plugin.id}/${doc.file}`);
    $('markdown-viewer').innerHTML = res.ok ? marked.parse(await res.text()) : 'File not found.';
    window.scrollTo(0, 0);
}

async function init() {
    try {
        manifest = await (await fetch('docs/manifest.json')).json();
        $('plugin-select').innerHTML = manifest.plugins.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
        $('plugin-select').onchange = (e) => {
            const p = manifest.plugins.find(p => p.id === e.target.value);
            location.hash = `#/${p.id}/${p.docs[0].file}`;
        };

        if (manifest.common) {
            $('common-list').innerHTML = manifest.common.map(d => 
                `<a href="#/common/${d.file}">${d.label}</a>`
            ).join('');
        }

        window.onhashchange = route;
        route();
    } catch (e) {
        $('markdown-viewer').innerHTML = 'Failed to load manifest.';
    }
}

document.addEventListener('DOMContentLoaded', init);
