# dsh-web-mobile-fix
[![awesome · DSH plugin](https://awesome-dsh-plugin.com/badge.svg)](https://awesome-dsh-plugin.com)

**English** | [简体中文](README.zh.md)

Mobile fixes for the [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web UI.

A pure client-side overlay (CSS plus a few reversible document listeners) that repairs the worst mobile breakages on narrow (≤700px viewport) screens, without touching any product source. Since **v1.12.0** it also absorbs the former [dsh-terminal-keys](https://github.com/gmugu/dsh-terminal-keys) plugin: a touch key panel for the Web terminal. Current baseline: **v1.13.0**, targeting dsh **0.2.2-rc.1**. Fixes 0.2.2-rc.1 ships natively (settings panel, directory-picker footer, sidebar drawer, always-visible row actions, touch tooltips, plan-review card, tap-outside collapse, keyboard dismissal after send, sidebar first-tap) were removed from this plugin; the composer's soft-keyboard lift and the "+" keyboard guard were removed too, so the only keyboard-driven geometry left is the right-panel terminal caret lift.

## Feature list

### CSS fixes (`@media (max-width: 700px)`)

1. **Right panel usable on touch** — the dockkit tab strip hard-disables all touch actions (desktop pans it via JS and drags tabs to reorder), leaving an overflowing strip unswipeable on a phone: horizontal panning is re-enabled (`touch-action: pan-x`). The fullscreen/mode toggle and the split-pane control are hidden — fullscreen is the only useful presentation below 700px and split panes are a desktop gesture — while the collapse toggle and the new-tab button stay
2. **No focus auto-zoom** — iOS magnifies the page whenever an input with a computed font-size under 16px is focused. No font sizes are touched: the viewport meta gains `maximum-scale=1`, which suppresses exactly that automatic focus zoom; user pinch-zoom stays available (iOS accessibility always allows it)
3. **Document-level scrolling locked** — the app is a 100%-height shell and every scrollable region scrolls internally, but iOS still lets the page itself rubber-band and can leave it stuck off-position after sheets or the keyboard. `html/body` are locked (`overflow: hidden` + `overscroll-behavior: none`); inner scroll containers (conversation, sidebar, settings) are unaffected, and pinch-zoom is a viewport gesture, not page scrolling, so it also still works
4. **Open-in-app controls hidden** — every entry that hands a path to a local app: the session header's "Open workspace in {app}", the files tab header's "Reveal in file manager", and the file preview card's "Code / More ways to open" split. They all carry `data-open-target` (directory entries are `directory`; the compact file split is `file` plus `data-open-path`), so one rule hides them all by kind; the whole split goes — its main button opens the default app and the chevron is the "More ways to open" menu. The session log's "More actions" menu is deliberately kept: from 0.2.2-rc.1 it also offers "Copy session as Markdown", which is useful on a phone

> 0.2.2-rc.1 reworked the right panel's dockkit structure (`data-dockkit-strip*` / `-split-button` became `pane` / `column` / `split-control`). Item 1 above no longer matches on the current version and awaits an update; the rest are unaffected.

### JS behaviors

1. **Enter is always a newline; sending lives on the ↑ button** — the soft keyboard has no Shift, and its Return key could never insert a line break, so at ≤700px every Enter keypress is prevented and replaced with a synthetic `insertLineBreak` through Lexical's live beforeinput pipeline (the keydown route is unreliable under IME composition). The key is relabeled 换行 via `enterkeyhint="enter"`. Soft keyboards that commit Return as an `insertText` of `"\n "` plus a corrective Backspace (WeChat Input) are retargeted to the same newline, and the corrective Backspace is swallowed within a short window. Key repeat is swallowed; IME composition, Ctrl/Meta, an open command menu, and read-only states pass through untouched. After each newline the page scroll is reset and every scrollable ancestor of the composer is pinned back to its bottom
2. **Right-panel terminal follows the caret** — while a terminal input holds focus, compare the caret (xterm pins its hidden helper textarea to the cursor row, so its rect IS the caret position in layout coordinates) with the keyboard's top edge: not covered → nothing moves (fresh terminal, short output, after clear); covered → the shell lifts by exactly the covered delta (capped at the keyboard height) and re-measures every 300ms as output scrolls. No resize — the pty never learns the keyboard exists, so buffer history is untouched. The applied lift is added back when measuring (idempotent re-measure, no oscillation), and once the lift reveals the caret there is nothing left for WebKit's caret-reveal pan to do. The CSS side is fix 9's shell `translateY(var(--mobilefix-kb))`; the composer is not lifted

### Terminal keys (merged from dsh-terminal-keys)

3. **Touch key panel for the Web terminal** — on handheld pointers (coarse pointer / no hover), while a right-sidebar terminal tab is in front, a draggable body-level card offers the keys a phone keyboard lacks: **Esc / Tab / Ctrl / Alt / ← ↑ ↓ →** in a fixed 4×2 grid. Arrows auto-repeat when held. The panel is z-index 2000 at body level, so it stays reachable above the expanded right-panel panes; it hides the moment the terminal tab, the sidebar, or the touch pointer goes away. Its position is one user-dragged anchor stored in `localStorage` (`terminalKeys:position`, proportional — survives rotation), and a flash line reports "no active terminal / not writable" instead of failing silently
4. **Sticky Ctrl/Alt modifiers compose with your own keyboard** — Ctrl and Alt are mutually exclusive stickies: arming one releases the other, and any armed bare key typed into the terminal surface (physical keydown, or a soft keyboard's beforeinput on the xterm textarea) is rewritten into the proper control/Meta sequence before the terminal consumes it — letters become Ctrl+letter / Alt+letter, arrows become modifier-decorated CSI sequences, Backspace becomes Ctrl+Backspace / Alt+Backspace. The modifier releases itself after one use, and disarms whenever the panel hides

## How it works

The plugin ships a browser half (`exports["./client"]`, declared via `dsh.client.platform: "web"`), discovered by the client-modules scanner and loaded from the boot manifest — one module, one file: `lib/client.js` holds the CSS overlay, every document listener, and the inlined terminal key panel (its own locale tables, PTY key sequences, sticky-modifier rewriting, and the body-level widget, mounted by `applyTerminalKeys(ctx)` at the end of `apply`).

The module declares `inject: ["slots", "locale", "sidebarRight", "webTerminals"]` — consumed by the terminal panel (stock Web-app services); the mobile fixes need none. Everything is reverted by the plugin's unload cleanup — fully reversible.

The behaviors hook the product's stable contracts — stock `data-*` semantics (`data-composer-card`, `data-composer-seat`, `data-composer-input`, `data-sidebar-terminal`, `data-dockkit-*`, `data-sidebar-right-*`, `data-open-target`, `data-open-path`):

- `focusin` — arms the terminal keyboard lift (measures at once and starts the 300ms re-measure) and sets the `enterkeyhint` hint on the composer
- `focusout` — disarms the lift and clears `--mobilefix-kb`
- `keydown` — the Enter→newline retarget and the IME corrective-Backspace swallow
- `beforeinput` — the IME Return retarget
- `pointerdown` / `pointerup` — the dockkit tab tap re-dispatch
- `visualViewport` resize/scroll — the `--mobilefix-kb` inset mirror (terminal caret only)
- `window resize` — the viewport meta guard (original meta restored on unload)

The style tag, every listener, and the viewport meta are reverted by the plugin's unload cleanup — fully reversible.

## Requirements

- DeepSeek Harness Web profile (`dsh --profile web`); adapted against **0.2.2-rc.1** (Lexical composer since 0.1.2-rc.1). The settings panel, directory-picker footer, sidebar drawer, always-visible row actions, touch tooltips, plan-review card, background-jobs popover, tap-outside collapse, keyboard dismissal after send and sidebar first-tap are now provided by 0.2.2-rc.1, so the plugin no longer ships them; the composer keyboard lift and the "+" keyboard guard are removed, and the lift now exists only for the right-panel terminal caret (the page-level scroll lock in fix 3 stays); the right-panel strip and the terminal panel still come from here. The merged terminal key panel needs the **0.2.0-rc** line's `sidebarRight` / `webTerminals` client services (baseline packages of the Web app)
- If the standalone `dsh-terminal-keys` plugin was installed before, remove or disable it — this plugin now provides that panel, and running both would duplicate it
- Selectors target stable product contracts (data-* semantics, class suffixes, roles); they are stable within a version line but may need small updates after a major product revamp

## Install

### Bundle install (recommended)

From npm:

```sh
dsh plugin --profile web add dsh-web-mobile-fix
```

Or straight from the GitHub repo:

```sh
dsh plugin --profile web add github:gmugu/dsh-web-mobile-fix
```

Restart `dsh web` (or wait for the profile hot-reload), then hard-refresh the browser.

### Local development install

Point the profile at a local checkout and the code is served live — refresh the page after editing `lib/client.js`. Note: on Windows, installing a local **path** directly (`add D:\...`) is currently broken — pnpm mis-resolves the absolute path in its `link:` spec and leaves a dead junction. Workaround: junction the checkout into the profile and declare a relative link:

```sh
PROFILE="$DSH_HOME/profiles/web"                     # adjust DSH_HOME and profile name
mkdir -p "$PROFILE/local"
# Windows (junction, no admin needed):
#   mklink /J "%DSH_HOME%\profiles\web\local\dsh-web-mobile-fix" D:\path\to\dsh-web-mobile-fix
# POSIX:
#   ln -sfn /path/to/dsh-web-mobile-fix "$PROFILE/local/dsh-web-mobile-fix"
# in "$PROFILE/package.json" dependencies add:
#   "dsh-web-mobile-fix": "link:./local/dsh-web-mobile-fix"
pnpm install --dir "$PROFILE"
# then enable the bundle: add "dsh-web-mobile-fix" to dsh.profile.bundles in
# "$PROFILE/package.json" (or flip it on in the in-app plugin manager)
```

### Manual install (no pnpm / offline)

```sh
PROFILE="$DSH_HOME/profiles/web"                 # adjust DSH_HOME and profile name
mkdir -p "$PROFILE/plugins" "$PROFILE/node_modules/@dsh-profile"
cp -r dsh-web-mobile-fix "$PROFILE/plugins/mobile-fix"
ln -sfn ../../plugins/mobile-fix "$PROFILE/node_modules/@dsh-profile/mobile-fix"
# append to $PROFILE/cordis.patch.yml:
#   - insert:
#       - id: mobile-fix
#         name: '@dsh-profile/mobile-fix'
```

## Verify

Open the Web UI on a phone-width window — Enter should insert a newline instead of sending (the soft-keyboard key reads 换行 / newline), and a focused right-panel terminal should keep its caret clear of the soft keyboard (the shell lifts by the covered delta). In DevTools the injected tag is `style[data-plugin="dsh-web-mobile-fix"]`; its header comment shows the running version. For the terminal panel: open a terminal tab in the right sidebar on a touch (or touch-emulating) window — the key card `.tk-card` appears, arrows write into the pty, and Ctrl/Alt arm exclusively.

## Rollback

- Bundle install: `dsh plugin --profile web remove dsh-web-mobile-fix`
- Manual install: delete the `mobile-fix` insert block from `cordis.patch.yml` (the plugin dir can stay or go)

No product source is modified; upgrades do not overwrite it.

## License

MIT
