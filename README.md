# dsh-web-mobile-fix
[![awesome · DSH plugin](https://awesome-dsh-plugin.com/badge.svg)](https://awesome-dsh-plugin.com)

**English** | [简体中文](README.zh.md)

Mobile layout fixes for the [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web UI.

A pure client-side overlay (CSS plus a few reversible click listeners) that repairs the worst mobile breakages on narrow (≤700px viewport) screens, without touching any product source.

## Feature list

### Original features (up to v1.0.2)

**CSS fixes** (`@media (max-width: 700px)`):

1. **Full-screen settings panel** — stacked column layout instead of a squeezed desktop layout; settings plugin navigation fits on a single row
2. **Session-log button collapses to an icon** — header button becomes a 32px circle, label kept for screen readers only
3. **Slimmer composer model select** — model name / effort text hidden, chevron only (the click still opens the picker)
4. **Centered popups** — dropdowns / popups anchored to the composer render as centered dialogs instead of clipping off-screen
5. **Top-bar breadcrumbs hidden** — session title breadcrumbs no longer crowd the top bar
6. **Directory-picker footer pinned** — Cancel / Confirm stay on one stable bottom row
7. **Floating sidebar** — the grid keeps a fixed 56px rail so the conversation is never squeezed; the expanded sidebar floats above the content. No `transform` on purpose, so the settings modal is never trapped inside the drawer

**JS behaviors**:

8. **Tap outside to collapse** — with the sidebar floating open, any click landing outside the sidebar column collapses it (≤768px, capture phase, ahead of product handlers; the settings modal renders inside the sidebar DOM and does not collapse it)

### Added in this round

9. **Tooltips hidden** (v1.0.3) — no `role="tooltip"` bubble is shown at ≤700px. Touch has no hover: tapping a button focuses it, the product Tooltip primitive pops instantly and stays until blur (e.g. the sidebar toggle's "Collapse sidebar" tip). Buttons keep their `aria-label`s, so screen readers are unaffected
10. **Sidebar auto-collapses after picking a session** (v1.1.0, refined in v1.2.1) — floating mode only (≤700px): tapping a session row, a search result, or a "new session" button (including the workspace-row "+") collapses the sidebar right after, saving one manual close. Deliberately excluded: the rows' "…" action buttons (they only open a menu) and workspace group rows (they only fold/unfold). **No effect above 700px** — PCs and tablets keep the stock behavior exactly. Since v1.2.1, within 2 seconds of those actions the product's composer autofocus is swallowed (on iOS it invariably pops the keyboard), so **switching sessions no longer opens the keyboard**; tapping the input yourself is unaffected
11. **Keyboard no longer covers the composer** (v1.2.0) — on iOS and Android Chrome the soft keyboard shrinks only the visual viewport while the layout viewport keeps its height, so the bottom-anchored composer stays hidden behind the keyboard (both when tapping the input and when switching sessions with the keyboard already open). The plugin watches `visualViewport` resize/scroll and mirrors the keyboard inset into `--mobilefix-kb`; at ≤700px the app shell is lifted by that amount so the composer rides above the keyboard and the message area shrinks to match. The variable is cleared when the keyboard closes, on desktop windows, and with a hardware keyboard; a >100px threshold filters pinch-zoom noise
12. **Plan-review card fits phones** (v1.3.0) — the decision card is a flex item whose `min-width: auto` floor is the widest unbreakable line in the plan text (long selector/code runs), pushing the card past the right screen edge and clipping the approve button. The card now shrinks to the viewport (≤100vw), `pre`/`code` inside the plan wraps, and the action buttons wrap onto a second row when tight
13. **Composer "+" becomes an attach button** (v1.4.0) — phones have no file entry at all (desktop attaches via paste and drag), and the bottom-left "+" only opens the command menu. At ≤700px the "+" is retasked in place into a paperclip attach button: tapping it opens the system file picker (photo library / camera, multi-select, images only — matching the product's attachment capability), and the picked files flow through a synthesized paste event into the product's own paste pipeline (validation, limits, thumbnails untouched). The command menu is unaffected — typing `/` still opens it; the button stays disabled while busy. No change above 700px

## How it works

The plugin ships a browser half (`exports["./client"]`, declared via `dsh.client.platform: "web"`), discovered by the client-modules scanner and loaded from the boot manifest. It injects one `<style>` tag with `@media (max-width: 700px)` overrides targeting the product's stable `data-slot` / `role` attributes, and registers capture-phase document listeners: `click` handles tap-outside collapse, collapse after an in-sidebar session action, and the "+" button attach retarget (collapse goes through the `layout` service's `toggleSidebar()`), and `focusin` swallows the composer autofocus that follows a session switch; it also watches `visualViewport` resize/scroll and mirrors the soft-keyboard inset into the `--mobilefix-kb` custom property consumed by rule 9. The style tag and all listeners are removed by the plugin's unload cleanup — fully reversible.

## Requirements

- DeepSeek Harness Web profile (`dsh --profile web`), any recent 0.1.x release
- Selectors target product slot contracts; they are stable within a version line but may need small updates after a major product revamp

## Install

### Bundle install (recommended)

Installed from npm:

```sh
dsh plugin --profile web add dsh-web-mobile-fix
```

(No npm / local development — point pnpm at the repo instead:

```sh
dsh plugin --profile web add github:gmugu/dsh-web-mobile-fix
```
)

Restart `dsh web` (or wait for the profile hot-reload), then hard-refresh the browser.

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

Open the Web UI on a phone-width window — the settings panel, sidebar, and popups should be mobile-adapted.

## Rollback

- Bundle install: `dsh plugin --profile web remove dsh-web-mobile-fix`
- Manual install: delete the `mobile-fix` insert block from `cordis.patch.yml` (the plugin dir can stay or go)

No product source is modified; upgrades do not overwrite it.

## License

MIT
