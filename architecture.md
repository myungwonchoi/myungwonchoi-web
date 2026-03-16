# 🌐 RenderTracker Web Guide Architecture

This document describes the structure of the RenderTracker guide website, which is hosted via GitHub Pages.

## 📁 Directory Structure

```text
WebDev/
│
├── index.html          # 🌟 Main HTML entry point
├── style.css           # 🎨 Basic styling (Vanilla CSS)
├── script.js           # 🚀 Basic JavaScript logic
├── docs/               # 📂 Markdown documentation files
│   ├── manifest.json   # 📜 List of plugins and their docs
│   └── [plugin_id]/    # 📂 Documents for each plugin
├── res/                # 🖼️ Static resources (images, icons)
├── update_docs.py      # 🤖 Script to generate manifest.json
└── architecture.md     # 📄 This document
```

## 🛠️ Technology Stack

1. **HTML5**: For semantic structure.
2. **CSS3**: Vanilla CSS for layout and design.
3. **JavaScript**: Modern ES6+ for interactivity.

## 🚀 Deployment

The site is intended to be hosted on **GitHub Pages**.
- Ensure all paths are relative to the root directory for proper loading on the web server.
