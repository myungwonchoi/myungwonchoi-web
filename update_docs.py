import os
import json

def generate_manifest():
    docs_dir = 'docs'
    manifest_path = os.path.join(docs_dir, 'manifest.json')
    
    # Configuration
    default_lang = 'ko'
    langs = ['ko', 'en']
    
    # 1. About section
    about_data = {}
    about_dir = os.path.join(docs_dir, 'about')
    if os.path.exists(about_dir):
        for lang in langs:
            lang_path = os.path.join(about_dir, lang)
            if os.path.exists(lang_path):
                files = [f for f in os.listdir(lang_path) if f.endswith('.md')]
                if files:
                    file = files[0] # Use the first md file
                    label = "About" if lang == 'en' else "소개"
                    about_data[lang] = {
                        "label": label,
                        "file": f"about/{lang}/{file}"
                    }

    # 2. Support section
    support_data = {}
    support_dir = os.path.join(docs_dir, 'support')
    if os.path.exists(support_dir):
        for lang in langs:
            lang_path = os.path.join(support_dir, lang)
            if os.path.exists(lang_path):
                files = [f for f in os.listdir(lang_path) if f.endswith('.md')]
                if files:
                    file = files[0]
                    label = "Support" if lang == 'en' else "후원"
                    support_data[lang] = {
                        "label": label,
                        "file": f"support/{lang}/{file}"
                    }

    # 3. Plugins section
    plugins = []
    plugins_root = os.path.join(docs_dir, 'plugins')
    if os.path.exists(plugins_root):
        plugin_dirs = [d for d in os.listdir(plugins_root) if os.path.isdir(os.path.join(plugins_root, d))]
        for p_id in plugin_dirs:
            p_path = os.path.join(plugins_root, p_id)
            plugin_langs = {}
            has_docs = False
            
            for lang in langs:
                lang_path = os.path.join(p_path, lang)
                if os.path.exists(lang_path):
                    md_files = [f for f in os.listdir(lang_path) if f.endswith('.md')]
                    md_files.sort()
                    
                    doc_list = []
                    for file in md_files:
                        # Convert filename to label
                        base = file.replace('.md', '')
                        if '_' in base:
                            label = base.split('_')[-1].capitalize()
                        else:
                            label = base.capitalize()
                        
                        # Custom labels
                        if base == 'intro': label = 'Introduction' if lang == 'en' else '소개'
                        if base == 'discord': label = 'Discord'
                        
                        doc_list.append({
                            "label": label,
                            "file": file
                        })
                    
                    if doc_list:
                        plugin_langs[lang] = {
                            "path": f"plugins/{p_id}/{lang}",
                            "docs": doc_list
                        }
                        has_docs = True
            
            if has_docs:
                # Custom common names for IDs
                name = p_id.capitalize()
                if p_id == 'rendertracker': name = 'RenderTracker'
                elif p_id == 'mwcharacterpicker': name = 'MW Character Picker'
                elif p_id == 'rsnodetools': name = 'RS Node Tools'

                plugins.append({
                    "id": p_id,
                    "name": name,
                    "langs": plugin_langs
                })

    # Sort: rendertracker first, then alphabetical
    plugins.sort(key=lambda p: (p['id'] != 'rendertracker', p['id']))

    manifest_data = {
        "defaultLang": default_lang,
        "langs": langs,
        "about": about_data,
        "support": support_data,
        "plugins": plugins
    }
    
    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(manifest_data, f, indent=4, ensure_ascii=False)
        
    print(f"Successfully generated {manifest_path}")

if __name__ == "__main__":
    generate_manifest()
