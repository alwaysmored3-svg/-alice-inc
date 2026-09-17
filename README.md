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
- Browse all 100 exhibits from a bilingual jump navigator; viewed exhibits are marked locally
- Continue with an unseen exhibit, with remaining count
- Collection progress (0–100)
- Five collection milestone badges (10 / 25 / 50 / 75 / 100), stored locally
- Visit streak
- Share action
- One-tap copyable exhibit links
- Shareable exhibit deep links (`?exhibit=2026-001#experiment`)
- Dynamic exhibit page title/description and Open Graph metadata
- Mobile-first responsive layout with safe-area support
- Search metadata, robots.txt, sitemap.xml and llms.txt
- Atom discovery feed (`feed.xml`) with bilingual exhibit previews and stable deep links, advertised from the HTML head for reader autodiscovery
- Automatically current project-day label derived from the launch date
- Privacy-friendly zero-cost analytics preparation: local counters only; no data leaves the visitor's browser

## Current Score
- Initial cost: ¥0
- Public experiments: 1
- Museum exhibits: 100
- Revenue: ¥0

## Shipping log
- 2026-09-18: Connected the existing Atom feed to the public page with standards-based `<link rel="alternate">` autodiscovery, added Japanese/English Open Graph locale metadata, and replaced the stale hard-coded `DAY 002` hero label with an automatically calculated project day. This improves discovery while preventing the public experiment header from silently going out of date, with no external service or cost.
- 2026-09-16: Published a zero-cost Atom feed (`feed.xml`) with bilingual previews and stable deep links for selected Museum of the Future exhibits. This creates a standards-based distribution surface that RSS/Atom readers, aggregators and other tools can consume without accounts, trackers, APIs or paid infrastructure.
- 2026-09-15: Added a bilingual 100-exhibit jump navigator above the museum card. Visitors can now intentionally browse the full collection instead of relying only on next/random/unseen controls; already-viewed exhibits receive a local check mark and jump usage is measured locally (`jump-selects`). The control is responsive and uses native selection UI for reliable mobile use.
- 2026-09-14: Added five bilingual collection milestone badges at 10 / 25 / 50 / 75 / 100 exhibits. Progress is derived entirely from the existing local collection state, adding a lightweight completion/reward loop without accounts, trackers or cost. The final rank is “2026 Master / 2026年マスター”.
- 2026-09-14: Added a bilingual “Unseen exhibit / 未見の展示へ” control that selects only exhibits the visitor has not viewed yet and shows the remaining count. This turns the existing 0–100 collection counter into a usable completion loop instead of making visitors repeatedly hit random and encounter duplicates. The action is measured locally only (`unseen-clicks`).
- 2026-09-13: Added a standalone bilingual project explainer (`about.md`) with the experiment premise, rules, current score and Museum of the Future description. This gives humans, collaborators and AI/search systems a concise stable explanation outside the interactive site, at zero cost.
- 2026-09-12: Added a bilingual one-tap “Copy link / リンクをコピー” control to every exhibit, using the existing stable deep-link format. Copy attempts are counted locally only, making individual exhibits easier to distribute without adding an external service or tracker.
- 2026-09-11: Added privacy-friendly local engagement counters and synchronized Open Graph metadata with the active exhibit. This creates an event vocabulary for future aggregate analytics without adding cookies, external trackers or cost.
- 2026-09-10: Added stable per-exhibit deep links and dynamic titles/descriptions so any of the 100 exhibits can be shared directly instead of always opening the daily exhibit.

Public site: https://alwaysmored3-svg.github.io/-alice-inc/
