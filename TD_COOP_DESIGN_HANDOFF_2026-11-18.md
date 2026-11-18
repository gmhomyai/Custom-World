# Custom World — Co-op Classic TD: Design Handoff (2026-11-18)

Status: **design discussion only; no TD game code implemented yet**. This file captures user-approved rules for the next chat. Do not mistake proposals for confirmed decisions.

## Project
- Private GitHub repository: `gmhomyai/Custom-World`, branch `main`.
- Cloudflare Pages live lobby prototype: https://custom-world-b7s.pages.dev/
- Existing `index.html` is a standalone 2D lobby prototype, **not multiplayer**.
- Project notes: `PROJECT_STATUS.md`, `SESSION_HISTORY_2026-11-18.md`; general game specs `01-` through `06-`.
- Aim: nostalgic Warcraft III custom-map feel, using original assets and implementation.

## Approved Co-op TD rules
1. **Classic fixed-path TD**: creeps follow preset paths; towers placed alongside; no maze/path blocking.
2. **Co-op TD and Versus TD are separate minigames**, not switchable modes of one game. First implementation target: Co-op TD.
3. **Independent lanes and wallets**: each active human player has own lane and gold. No automatic AI fill for empty player slots. Number of active lanes follows actual players and pregame room settings/map limits.
4. **Shared final defense**: leaked creeps leave their owner lane and pass through a common defense zone. Any player who successfully defends their own lane may build towers there with personal gold. Track which lane leaked.
5. **Synchronized waves across lanes**, with a preparation interval between waves.
6. **Realtime building**: players can build, sell, and upgrade towers even during waves.
7. **Shared avatar identity**: each player retains their customized Custom World avatar across games. Map assigns a role and icon above head; in this TD map avatar is a builder. Controls selectable in settings: Warcraft-like click-to-move/click-to-build or WASD + mouse; mobile touch controls intended.
8. **Map-defined content**: tower types, enemies, upgrades and theme belong to each map, not avatar race. Race-specific towers are a *future separate submode*, not a rule for this first map.
9. **Host chooses map when creating room**. Players browse and join rooms for maps they want; no map voting. Host configures player count, public/private, and Easy/Normal/Hard difficulty before starting.
10. **50 waves**, boss rounds every 10 waves (10, 20, 30, 40, 50). Boss types rotate: examples tanky/slow, moderate-HP/fast, flying (ground-only towers cannot target flying). Boss quantity increases each boss round; prior example 1,2,3,4,5 **per lane**. **No advance boss warning**. Win by surviving through all 50 waves and clearing enemies.
11. **Difficulty** modifies creep HP and number, not speed; speed depends on enemy type.
12. **Last-hit gold**: owner of tower landing killing blow gets gold, including kills in shared final defense. Each active player also receives regular income at end of every wave. Gold is personal, no shared bank.
13. **Selling towers refunds 75% of total invested gold**, including upgrades.
14. **Shared lives (not destructible building)**: creeps that pass shared final defense deduct shared lives according to enemy type; bosses deduct more. Lose if lives hit zero before completion of 50 waves. Win if finish wave 50 with lives remaining and all enemies cleared. Initial lives scale with number of active lanes; 25 lives/ lane was **illustrative, not approved numeric constant**. No base repair or physical base attack in this map; destructible-base gameplay belongs to a different future map/minigame.
15. **Disconnects**: AI takes over abandoned human lane; AI intentionally modest/weak so it remains a vulnerable spot. Disconnected player can reconnect and reclaim lane, but **receives no match points after disconnect/AFK**, per user direction. Host kicking a player **does not count** toward hardship bonus. Remaining players who win despite AI lanes earn hardship bonus based on **number of AI lanes and time endured**; exact formula TBD. Need anti-farming/audit of disconnect vs kick/AFK.
16. **Host leaves/disconnects**: match ends immediately, everyone gets **zero points**, no host transfer, no AI host takeover.
17. The wider game's scoring rules should be checked against existing project spec docs before implementation; this design discussion did not establish exact numerical win/loss scores.

## Most recent decision and next open question
- Rule 26 confirmed: **last-hit gold + income each wave**.
- Rule 27 **NOT YET DECIDED**: duration of preparation break between waves. Options previously proposed: A=15 sec, B=30 sec, C=60 sec, D=variable by wave stage. Assistant recommended 30 sec, but user did not choose.
- Continue with **Rule 27**; do not presume an answer. Then proceed to remaining game design decisions before coding.

## Implementation principles
- Keep central avatar/lobby and shared systems modular; separate minigame and map-specific config.
- Preserve clear distinction between confirmed user choices, examples, and assistant suggestions.
- No code or deployment changes were made in this TD design session.
