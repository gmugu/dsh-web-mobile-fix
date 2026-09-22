# dsh-web-mobile-fix
[![awesome · DSH plugin](https://awesome-dsh-plugin.com/badge.svg)](https://awesome-dsh-plugin.com)

**English** | [简体中文](README.zh.md)

Mobile layout fixes for the [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web UI.

A pure client-side overlay (CSS plus a few reversible document listeners) that repairs the worst mobile breakages on narrow (≤700px viewport) screens, without touching any product source. Current baseline: **v1.9.8**, targeting dsh **0.1.6-alpha.2** (0.1.5+ hook set).

## Feature list

### CSS fixes (`@media (max-width: 700px)`)

1. **Full-screen settings panel** — stacked column layout instead of a squeezed desktop layout; the settings plugin navigation fits on a single row
2. **Directory-picker footer pinned** — row 1: "new folder" (grows) + "show hidden"; then a zero-height line break; row 2: Cancel / Open split into equal halves. One stable bottom block instead of reflowing buttons
3. **Floating sidebar** — the shell grid keeps a fixed 56px rail in both states, so the conversation column never moves or squeezes; the expanded drawer overflows its column and floats above the content instead. No `transform` on purpose: a transform on the sidebar column would become the containing block for its `position: fixed` descendants — the settings dialog renders inside the sidebar DOM and would be trapped inside the drawer
4. **Wider drawer, always-visible row actions** — the expanded drawer is widened to `min(82vw, 360px)` (the product sets an inline 280px, ~70% of a phone screen), and the session rows' "…" / "+" action buttons — `display: none` until hover on desktop, unreachable on touch — stay always visible with breathing room from the row text
5. **Button tooltips no longer pop by accident** — touch has no hover: tapping a button focuses it, the product Tooltip primitive pops instantly and stays until blur (e.g. the sidebar toggle's "Collapse sidebar" tip). Only **button-triggered** tooltip bubbles are hidden (`aria-label`s kept for screen readers); non-button tooltips remain — e.g. the bottom stats line still pops its full call details on tap
6. **Plan-review card fits phones** — the decision card is a flex item whose `min-width: auto` floor is the widest unbreakable line in the plan text (long selector/code runs), pushing the card past the right screen edge and clipping the approve button. The card shrinks to the viewport (≤100vw), `pre`/`code` inside the plan wraps, and the action buttons wrap onto a second row when tight
7. **Right panel usable on touch** — the dockkit tab strip hard-disables all touch actions (desktop pans it via JS and drags tabs to reorder), leaving an overflowing strip unswipeable on a phone: horizontal panning is re-enabled (`touch-action: pan-x`). The fullscreen/mode toggle and the split-pane control are hidden — fullscreen is the only useful presentation below 700px and split panes are a desktop gesture — while the collapse toggle and the new-tab button stay
8. **No focus auto-zoom** — iOS magnifies the page whenever an input with a computed font-size under 16px is focused. No font sizes are touched: the viewport meta gains `maximum-scale=1`, which suppresses exactly that automatic focus zoom; user pinch-zoom stays available (iOS accessibility always allows it)
9. **Document-level scrolling locked** — the app is a 100%-height shell and every scrollable region scrolls internally, but iOS still lets the page itself rubber-band and can leave it stuck off-position after sheets or the keyboard. `html/body` are locked (`overflow: hidden` + `overscroll-behavior: none`); inner scroll containers (conversation, sidebar, settings) are unaffected, and pinch-zoom is a viewport gesture, not page scrolling, so it also still works
10. **Session-header desktop shortcuts hidden** — the "Open workspace in {app}" split button (hands the session's directory to a local editor/terminal — a desktop hand-off) and the session log's "More actions" menu only crowd the phone header; both utilities-slot entries are hidden at ≤700px. Opening the workspace locally and exporting a session log remain desktop workflows
11. **Background-jobs popover fits the phone** — the session header's "N background jobs" menu is absolutely anchored to its trigger's **left** edge (`left: 0`, 336px wide), and on a phone that trigger is the rightmost header action (the utilities entries beside it are hidden by fix 10), so the panel opens ~230px in and runs ~165px past the right screen edge: the device capture shows each row's status, duration and most of the command label cut off, with no way to pan to them. The panel is re-anchored to the viewport itself — `position: fixed`, 8px gutters, full remaining width. `top: auto` is deliberate: with no top/bottom the panel keeps its **static** position, the flow slot right below its own trigger, so no header geometry is hardcoded and the panel still drops from its button on every header variant. Only the horizontal geometry is taken over; the 5px gap under the trigger comes back as a margin

### JS behaviors

12. **Tap outside collapses the floating sidebar** (≤768px, capture phase) — any click landing outside the open sidebar column collapses it, ahead of product handlers and any `stopPropagation`; the settings dialog renders inside the sidebar DOM and does not collapse it. Tapping a session row, a search result, a "new session" button, or a global-panel entry (插件/Plugins) collapses right after the action, and the composer autofocus that follows is swallowed for 2s — on iOS it invariably pops the keyboard, so **switching sessions never opens it**; tapping the input yourself is unaffected. The rows' "…" buttons and group-fold rows are deliberately excluded
13. **Keyboard never covers the composer** — on iOS and Android Chrome the soft keyboard shrinks only the visual viewport while the layout viewport keeps its height, so the bottom-anchored composer stays hidden behind it. The plugin watches `visualViewport` resize/scroll and mirrors the keyboard inset into `--mobilefix-kb`; the app shell is translated up by that amount, so the composer rides above the keyboard and the message area shortens to match. The lift is only allowed during a live keyboard session — the composer input holds focus — so a system sheet (file picker) that shrinks the viewport resolves the inset to 0 instead of lifting the page behind a floating keyboard, and only while a real conversation view is up (`data-phase="active"`): on the blank-session hero the composer sits near the top and the keyboard never covers it, so the shell does not move. A >100px threshold filters pinch-zoom noise, a small latch filters caret-reveal jitter, and the variable clears when the keyboard closes, the sheet ends, or the window is wider than 700px
14. **Enter is always a newline; sending lives on the ↑ button** — the soft keyboard has no Shift, and its Return key could never insert a line break, so at ≤700px every Enter keypress is prevented and replaced with a synthetic `insertLineBreak` through Lexical's live beforeinput pipeline (the keydown route is unreliable under IME composition). The key is relabeled 换行 via `enterkeyhint="enter"`. Soft keyboards that commit Return as an `insertText` of `"\n "` plus a corrective Backspace (WeChat Input) are retargeted to the same newline, and the corrective Backspace is swallowed within a short window. Key repeat is swallowed (one newline per physical press); IME composition, Ctrl/Meta, an open command menu, and read-only states pass through untouched. After each newline the page scroll is reset and every scrollable ancestor of the composer is pinned back to its bottom, so the input box stays planted above the keyboard instead of floating wherever the caret-reveal scroll left it
15. **Soft keyboard hides after send** — every composer button runs `onMouseDown=keepFocus` (preventDefault + refocus), so focus never leaves the composer across the send tap and the keyboard stays open after sending. A capture click landing on the composer's SEND button (aria-label 发送消息/Send message; the square stop button relabels to 停止生成/Stop generating and never matches, so stopping keeps the keyboard for follow-up typing) is not intercepted: the submit runs untouched and the input is blurred **synchronously inside the gesture** — the blur must land in the user-gesture context or iOS keeps the keyboard up. Timed retries (0/120/300ms) and the composer-focus suppression window guard against asynchronous refocus; window/html/body scroll resets as the keyboard drops and `--mobilefix-kb` clears itself. No change above 700px
16. **"+" opens the command menu — without the keyboard** — toggling the command menu focuses the draft (the product focuses the editor in the button's `onClick` and on `mousedown`), which would pop the soft keyboard on every tap. The plugin ends any keyboard session on that tap and blurs every refocus landing inside a short suppression window (the same mechanism the send flow uses), so the menu opens with the keyboard closed. Tapping the input itself still opens the keyboard normally
17. **First tap on sidebar rows works** — workspace/session rows are HTML5 draggable (drag-to-reorder, a desktop gesture); iOS routes a touch on a draggable element through drag detection and swallows (or doubles) the synthesized click, so the first tap switches nothing. The `draggable` flag is stripped from the row under a touch `pointerdown`, before drag detection starts: the tap then behaves like a plain click. React restores the attribute on re-render; the next pointerdown strips it again. Buttons inside the rows were never affected

## How it works

The plugin ships a browser half (`exports["./client"]`, declared via `dsh.client.platform: "web"`), discovered by the client-modules scanner and loaded from the boot manifest. It injects one `<style>` tag with `@media (max-width: 700px)` overrides and registers capture-phase document listeners, all keyed to the product's stable contracts — stock `data-*` semantics (`data-shell-overlay`, `data-composer-card`, `data-composer-seat`, `data-composer-input`, `data-plan-review-key`, `data-plan-review-scroll`, `data-dockkit-*`, `data-sidebar-*`), CSS-module class suffixes (`rowActions`, `logoRow`, `root`, `footerBar`), and role/aria hooks:

- `click` — tap-outside collapse and collapse after an in-sidebar session action (through the `layout` service's `toggleSidebar()`, fetched via an optional ctx lookup); the "+" keyboard guard; the send-button keyboard hide
- `focusin` / `focusout` — the keyboard session (the lift is only armed while the composer input holds focus); the `enterkeyhint` hint; the composer-focus suppression windows (2s after session actions, 600ms after send and after "+")
- `keydown` — the Enter→newline retarget and the IME corrective-Backspace swallow
- `beforeinput` — the IME Return retarget
- `pointerdown` / `pointerup` — the dockkit tab tap re-dispatch; the sidebar draggable-strip first-tap repair
- `change` / `cancel` — a resolved system file sheet ends the keyboard session
- `visualViewport` resize/scroll — the `--mobilefix-kb` inset mirror
- `window resize` — the viewport meta guard (original meta restored on unload)

The style tag, every listener, and the viewport meta are reverted by the plugin's unload cleanup — fully reversible.

## Requirements

- DeepSeek Harness Web profile (`dsh --profile web`); tested against **0.1.6-alpha.2** and targeting the 0.1.5+ hook set (Lexical composer since 0.1.2-rc.1)
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

Open the Web UI on a phone-width window — the settings panel, sidebar, and popups should be mobile-adapted. In DevTools the injected tag is `style[data-plugin="dsh-web-mobile-fix"]`; its header comment shows the running version.

## Rollback

- Bundle install: `dsh plugin --profile web remove dsh-web-mobile-fix`
- Manual install: delete the `mobile-fix` insert block from `cordis.patch.yml` (the plugin dir can stay or go)

No product source is modified; upgrades do not overwrite it.

## License

MIT
