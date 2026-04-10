# CLAUDE.md

## 프로젝트 개요

GitHub Pages로 호스팅되는 플러그인 가이드 웹사이트. 마크다운 문서를 동적으로 렌더링하며, 여러 플러그인의 문서를 단일 페이지로 제공한다.
우측 상단 KO/EN 버튼으로 언어를 전환할 수 있다. 선택한 언어는 `localStorage`에 저장된다.

## 파일 구조

```
Web/
├── index.html          # 진입점. 상단바(topbar) + 사이드바(aside) + 본문(main) 레이아웃
├── style.css           # 전체 스타일 (Vanilla CSS)
├── script.js           # 마크다운 로드, 라우팅, 언어 전환 로직
├── docs/
│   ├── manifest.json   # 플러그인 목록 및 문서 구성 정의
│   ├── mwcharacterpicker/
│   │   └── intro.md
│   ├── rendertracker/
│   │   ├── ko/         # 한국어 문서
│   │   │   ├── intro.md
│   │   │   ├── app-guide.md
│   │   │   ├── discord.md
│   │   │   └── telegram.md
│   │   └── en/         # 영어 문서
│   │       ├── intro.md
│   │       ├── app-guide.md
│   │       ├── discord.md
│   │       └── telegram.md
│   └── support/
│       ├── ko/support.md
│       └── en/support.md
├── res/
│   └── rendertracker/  # 가이드에 사용되는 이미지 (.webp, .svg)
├── update_docs.py      # manifest.json 자동 생성 스크립트
└── architecture.md     # 아키텍처 문서
```

## 라우팅 방식

URL 해시(`#/plugin-id/file.md`)로 페이지를 구분한다. `script.js`의 `route()` 함수가 해시 변경을 감지하고 해당 마크다운 파일을 fetch해 `#markdown-viewer`에 렌더링한다. 마크다운 파싱은 `marked.js` (CDN) 사용.

## 언어 전환 방식

- `currentLang` 변수가 현재 언어(`ko` / `en`)를 관리
- 언어 버튼 클릭 시 `setLang(lang)` 호출 → `localStorage`에 저장 → 플러그인 선택기 및 메뉴 재빌드 → 동일 플러그인의 첫 번째 문서로 re-route
- `manifest.json`의 `plugins[].langs.{ko|en}.path` 경로에서 문서를 fetch

## manifest.json 구조

```json
{
    "langs": ["ko", "en"],
    "defaultLang": "ko",
    "common": {
        "ko": { "label": "Support", "file": "support/ko/support.md" },
        "en": { "label": "Support", "file": "support/en/support.md" }
    },
    "plugins": [
        {
            "id": "rendertracker",
            "name": "RenderTracker",
            "langs": {
                "ko": { "path": "rendertracker/ko", "docs": [...] },
                "en": { "path": "rendertracker/en", "docs": [...] }
            }
        }
    ]
}
```

## 문서 추가 방법

1. `docs/{plugin_id}/ko/` 또는 `docs/{plugin_id}/en/` 에 `.md` 파일 추가
2. `docs/manifest.json`의 해당 플러그인 `langs.ko.docs` / `langs.en.docs` 배열에 항목 추가

## 이미지 크기 제어

마크다운 이미지 alt 텍스트에 키워드를 포함해 크기를 지정한다.

- `w-200` / `w-300` / `w-400` / `w-600` / `w-800` / `w-1000` / `w-1200` / `w-full`
- `w-icon` : 48×48px 인라인 아이콘

예시: `![설명 w-400](path/to/image.webp)`
