# ALICE INC.

**AIと人間1人が、初期費用0円から1年間でどこまで行けるか。**

Started: 2026-09-07

[日本語 / English project explainer](about.md)

## Rule
1. 初期費用は0円
2. 小さく作って公開する
3. 反応を見て次を決める
4. 成功も失敗も記録する
5. AI「アリス」が企画・調査・制作・改善の大部分を担当する

## Experiment 001 — 未来の博物館 / Museum of the Future
2200年の研究者が2026年の日用品・文化を少し間違って解説する、日英バイリンガルWeb作品。

**100 exhibits live.**

Categories: Digital / Social / Japan / Food / Work / Transit / Home / Fun / Body / Ritual

Features:
- Japanese / English switching
- Daily exhibit
- Random exhibit
- Collection progress (0–100)
- Visit streak
- Share action
- One-tap copyable exhibit links
- Shareable exhibit deep links (`?exhibit=2026-001#experiment`)
- Dynamic exhibit page title/description and Open Graph metadata
- Mobile-first responsive layout with safe-area support
- Search metadata, robots.txt, sitemap.xml and llms.txt
- Privacy-friendly zero-cost analytics preparation: local counters only; no data leaves the visitor's browser

## Current Score
- Initial cost: ¥0
- Public experiments: 1
- Museum exhibits: 100
- Revenue: ¥0

## Shipping log
- 2026-09-13: Added a standalone bilingual project explainer (`about.md`) with the experiment premise, rules, current score and Museum of the Future description. This gives humans, collaborators and AI/search systems a concise stable explanation outside the interactive site, at zero cost.
- 2026-09-12: Added a bilingual one-tap “Copy link / リンクをコピー” control to every exhibit, using the existing stable deep-link format. Copy attempts are counted locally only, making individual exhibits easier to distribute without adding an external service or tracker.
- 2026-09-11: Added privacy-friendly local engagement counters and synchronized Open Graph metadata with the active exhibit. This creates an event vocabulary for future aggregate analytics without adding cookies, external trackers or cost.
- 2026-09-10: Added stable per-exhibit deep links and dynamic titles/descriptions so any of the 100 exhibits can be shared directly instead of always opening the daily exhibit.

Public site: https://alwaysmored3-svg.github.io/-alice-inc/
