window.__ModuleLoader__.load({
  id: "dsh-web-mobile-fix",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;

    var CSS = [
      "/* dsh-web-mobile-fix 1.9.14 */",
      "/* ── mobile UI fixes (≤700px) ── */",
      "@media (max-width: 700px) {",
      "  /* 1. Settings panel: stacked full-screen layout */",
      "  [role=\"dialog\"][aria-modal=\"true\"][aria-labelledby] {",
      "    flex-direction: column !important;",
      "    width: 100vw !important;",
      "    max-width: 100vw !important;",
      "    height: 100vh !important;",
      "    height: 100dvh !important;",
      "    max-height: 100vh !important;",
      "    max-height: 100dvh !important;",
      "    border-radius: 0 !important;",
      "  }",
      "  [role=\"dialog\"][aria-modal=\"true\"][aria-labelledby] > nav {",
      "    flex: none !important;",
      "    flex-direction: column !important;",
      "    width: 100% !important;",
      "    box-sizing: border-box !important;",
      "    padding: 12px 12px 6px !important;",
      "    gap: 8px !important;",
      "  }",
      "  [role=\"dialog\"][aria-modal=\"true\"][aria-labelledby] > nav > div:last-child {",
      "    flex-direction: row !important;",
      "    flex-wrap: nowrap !important;",
      "    gap: 6px !important;",
      "    overflow-x: auto !important;",
      "  }",
      "  [role=\"dialog\"][aria-modal=\"true\"][aria-labelledby] > nav button {",
      "    flex: 0 0 auto !important;",
      "    height: 36px !important;",
      "    padding: 6px 12px !important;",
      "    gap: 6px !important;",
      "    justify-content: center !important;",
      "  }",
      "  /* Keep every tab label visible: the stock label is flex:1 with",
      "        flex-basis 0, which collapses to zero width inside a content-sized",
      "        button; let the text drive the button width instead (0 1 auto). */",
      "  [role=\"dialog\"][aria-modal=\"true\"][aria-labelledby] > nav button > :last-child {",
      "    flex: 0 1 auto !important;",
      "    min-width: 0 !important;",
      "  }",
      "  [role=\"dialog\"][aria-modal=\"true\"][aria-labelledby] > nav button[aria-current=\"true\"] {",
      "    background: var(--dsw-specific-sidebar-nav-item-active, #e8ebf1) !important;",
      "  }",
      "  [role=\"dialog\"][aria-modal=\"true\"][aria-labelledby] > nav + div {",
      "    flex: 1 1 0 !important;",
      "    min-height: 0 !important;",
      "  }",
      "  [role=\"dialog\"][aria-modal=\"true\"][aria-labelledby] > nav + div > div:first-child {",
      "    padding: 12px 12px 6px !important;",
      "  }",
      "  [role=\"dialog\"][aria-modal=\"true\"][aria-labelledby] > nav + div > div:last-child {",
      "    padding: 0 16px 16px !important;",
      "  }",
      "  /* 6. Directory picker footer: pin Cancel/Open to one stable bottom row.",
      "        0.1.2-rc.1 rebuilt the picker on the shared Modal primitive",
      "        (aria-label, not aria-labelledby) and moved the footer INTO the",
      "        editor scope: div.footerBar = [新建文件夹, 显示隐藏(aria-pressed),",
      "        span.footerGap, 取消, 打开]. The old :has(> div:last-child >",
      "        button[aria-pressed]) hook matches nothing now. Flex on the",
      "        footerBar class-suffix (rule 13's precedent): row 1 = 新建文件夹",
      "        (grows) + 显示隐藏, then the desktop spacer span is repurposed as",
      "        a full-width zero-height LINE BREAK, so row 2 = 取消/打开 split",
      "        into equal halves (a stretched grid 1fr made 取消 swallow the",
      "        whole row — real-device feedback). */",
      "  [role=\"dialog\"][aria-modal=\"true\"] [class*=\"footerBar\"] {",
      "    display: flex !important;",
      "    flex-wrap: wrap !important;",
      "    gap: 8px !important;",
      "    align-items: center !important;",
      "    padding: 12px 16px !important;",
      "  }",
      "  [role=\"dialog\"][aria-modal=\"true\"] [class*=\"footerBar\"] > :nth-child(1) {",
      "    flex: 1 1 auto !important;",
      "    min-width: 0 !important;",
      "  }",
      "  [role=\"dialog\"][aria-modal=\"true\"] [class*=\"footerBar\"] > :nth-child(2) {",
      "    flex: 0 0 auto !important;",
      "  }",
      "  [role=\"dialog\"][aria-modal=\"true\"] [class*=\"footerBar\"] > :nth-child(3) {",
      "    flex: 0 0 100% !important;",
      "    height: 0 !important;",
      "  }",
      "  [role=\"dialog\"][aria-modal=\"true\"] [class*=\"footerBar\"] > :nth-child(4),",
      "  [role=\"dialog\"][aria-modal=\"true\"] [class*=\"footerBar\"] > :nth-child(5) {",
      "    flex: 1 1 0 !important;",
      "    min-width: 0 !important;",
      "  }",
      "  /* 7. Left sidebar on narrow screens: keep the grid fixed at 56px rail in",
      "        BOTH states (center column never moves or squeezes) and let the",
      "        expanded sidebar OVERFLOW its 56px column to float over the center",
      "        (z-index 60 on the grid item) instead of positioning it absolutely.",
      "        No transform is applied: a transform on the sidebar column would",
      "        become the containing block for its position:fixed descendants —",
      "        the settings modal renders inside the sidebar DOM and would be",
      "        trapped/positioned relative to the drawer instead of the viewport.",
      "        The product's own wide-sidebar interactions (rail buttons, search",
      "        focus, settings dialog) keep working natively, and the stock",
      "        wide-content fade-in remains the only animation. */",
      "  /* 0.1.5 frame hook: the frame div carries no always-on data attr anymore;",
      "     its overlay layer child (data-shell-overlay) is constant, so :has over",
      "     that child relationship is the stable frame selector. */",
      "  div:has(> [data-shell-overlay]) {",
      "    grid-template-columns: 56px minmax(0, 1fr) 0 !important;",
      "  }",
      "  div:has(> [data-shell-overlay]):not([data-sidebar-collapsed]) > div:first-child {",
      "    overflow: visible !important;",
      "    z-index: 60 !important;",
      "  }",
      "  /* 8. Tooltips: touch has no hover — tapping a button gives it focus and",
      "        the Tooltip primitive pops its bubble at once and keeps it while",
      "        focus stays (e.g. the sidebar toggle's 折叠侧边栏 tip). Hide only",
      "        button-triggered bubbles: the primitive always renders the bubble",
      "        as the trigger's immediate next sibling, so button + [role=tooltip]",
      "        is an exact hook. Non-button tooltips stay visible — e.g. the",
      "        bottom stats line (a div trigger) pops its full 调用详情 on tap. */",
      "  button + [role=\"tooltip\"],",
      "  [role=\"button\"] + [role=\"tooltip\"] {",
      "    display: none !important;",
      "  }",
      "  /* 9. Keyboard lift: keep the shell's height unchanged and translate the",
      "        whole viewport up by the live keyboard inset (transform applies",
      "        immediately on the compositor; a height change waited for the",
      "        newline repin to become visible). Only the live keyboard session",
      "        (composer focusin..focusout) may lift; a system sheet shrinking",
      "        the viewport resolves the inset to 0. */",
      "  div:has(> [data-shell-overlay]) {",
      "    transform: translateY(calc(-1 * var(--mobilefix-kb, 0px))) !important;",
      "  }",
      "  /* 10. Plan-review takeover: the decision card is a flex item whose",
      "        min-width:auto floor is its widest unbreakable markdown line —",
      "        long selector/code runs in a plan text push the card past the",
      "        right screen edge and clip the approve button. Let the card",
      "        shrink to the viewport, force pre/code inside the plan to wrap,",
      "        and let the action buttons wrap onto a second row. The product",
      "        exposes data-plan-review-key (frame) and data-plan-review-scroll",
      "        (body) as stable hooks. */",
      "  [data-plan-review-key] {",
      "    box-sizing: border-box !important;",
      "    width: 100% !important;",
      "    max-width: 100vw !important;",
      "    padding-left: 12px !important;",
      "    padding-right: 12px !important;",
      "  }",
      "  [data-plan-review-key] > section {",
      "    min-width: 0 !important;",
      "    width: 100% !important;",
      "    max-width: 100% !important;",
      "  }",
      "  /* data-plan-review-scroll was removed in dsh 0.1.7-alpha.2: the card",
      "        no longer renders a scrollable plan body (title + first-paragraph",
      "        summary only), so the pre/code wrap rule had no target left. */",
      "  [data-plan-review-key] > section > div:last-child,",
      "  [data-plan-review-key] > section > div:last-child > div:last-child {",
      "    flex-wrap: wrap !important;",
      "    min-width: 0 !important;",
      "  }",
      "  /* 14. No auto-zoom on focus (pairs with the meta guard below): iOS",
      "        magnifies the page when an input with a computed font-size under",
      "        16px is focused, but instead of resizing fields the viewport meta",
      "        gains maximum-scale=1, which suppresses exactly that automatic",
      "        focus zoom. User pinch-zoom stays available (iOS accessibility",
      "        always allows it). Field font sizes are untouched. */",
      "  /* 15. Lock the document itself: the app is a 100%-height shell and every",
      "        scrollable region scrolls internally, but iOS still lets the page",
      "        rubber-band and can leave it stuck off-position after sheets or",
      "        the keyboard. Kill page-level scrolling on phones — inner scroll",
      "        containers (conversation, sidebar, settings) are unaffected, and",
      "        pinch-zoom is a viewport gesture, not page scrolling. */",
      "  html, body {",
      "    height: 100% !important;",
      "    overflow: hidden !important;",
      "    overscroll-behavior: none !important;",
      "  }",
      "  /* 16. Right-panel dockkit tab strip: the stock strip hard-disables all",
      "        touch actions (touch-action:none on the tablist row, the scrolling",
      "        tabs container and every tab) because desktop pans it via JS and",
      "        drags tabs to reorder. On a phone that leaves an overflowing strip",
      "        unswipeable. Re-enable horizontal panning only: vertical swipes",
      "        still do nothing, the product's pointermove handler never calls",
      "        preventDefault, so native pan wins and a drag attempt simply",
      "        pointercancels its reorder gesture. Stock data-* hooks from the",
      "        dockkit bundle: data-dockkit-strip / -strip-tabs / -tab. */",
      "  [data-dockkit-strip],",
      "  [data-dockkit-strip-tabs],",
      "  [data-dockkit-strip-tabs] [data-dockkit-tab] {",
      "    touch-action: pan-x !important;",
      "  }",
      "  /* 17. Right-panel strip chrome on touch: fullscreen is the only useful",
      "        presentation below 700px and split panes are a desktop gesture, so",
      "        drop the mode toggle (退出全屏/全屏) and the split-pane control.",
      "        The + new-tab button stays. Only 收起侧边栏 joins them at the strip",
      "        end. Stock hooks: data-sidebar-right-mode (presentation toggle),",
      "        data-sidebar-right-toggle (collapse, kept), data-dockkit-split-button. */",
      "  [data-sidebar-right-mode],",
      "  [data-dockkit-split-button] {",
      "    display: none !important;",
      "  }",
      "  /* 18. Left sidebar rows (dsh-client-ui-workspace Rows module): the row",
      "        action buttons (\"…\" menu, \"+\" new session) are display:none",
      "        until :hover or an open row menu — unreachable on touch. Keep them",
      "        always visible with breathing room from the row text (the session",
      "        row's left neighbor is the relative time). Scoped to the sidebar",
      "        column so other rowActions-suffix modules elsewhere stay",
      "        hover-driven. */",
      "  div:has(> [data-shell-overlay]) > div:first-child [class*=\"rowActions\"] {",
      "    display: inline-flex !important;",
      "    margin-left: 10px !important;",
      "  }",
      "  /* 19. Sidebar drawer width on touch: the expanded sidebar root carries",
      "        an INLINE width from the layout store (280px default, ~70% of a",
      "        phone screen). A stylesheet !important beats an inline value, so",
      "        widen the expanded drawer for readability. The root is pinned by",
      "        its direct logoRow child and the expanded state by the absence of",
      "        the collapsed class, so the 56px rail (rule 7) and dialogs inside",
      "        the sidebar DOM are untouched. */",
      "  div:has(> [data-shell-overlay]) > div:first-child [class*=\"root\"]:has(> [class*=\"logoRow\"]):not([class*=\"collapsed\"]) {",
      "    width: min(82vw, 360px) !important;",
      "  }",
      "  /* 20. Session-header desktop shortcuts: the open-in-app split button",
      "        (\"在 {app} 中打开工作目录\" — hands the workspace to a local app,",
      "        meaningless on a phone) and the session-log export's \"更多操作\"",
      "        menu are desktop gestures that crowd the phone header. Hide both",
      "        utilities-slot entries (CSS-module suffix hooks, scoped to the",
      "        utilities seat — rule 13's precedent). */",
      "  [data-slot=\"conversation.session.header.utilities\"] [class*=\"split\"],",
      "  [data-slot=\"conversation.session.header.utilities\"] [class*=\"moreButton\"] {",
      "    display: none !important;",
      "  }",
      "  /* 21. Background-jobs popover: the stock panel is absolutely positioned at",
      "        its trigger's LEFT edge (left: 0, width: 336px) and the trigger is",
      "        the rightmost session-header action on a phone (rule 20 hides the",
      "        utilities entries beside it; the agent-preset seat sits to its",
      "        left). On a 402px viewport the panel therefore opens ~230px in and",
      "        hangs ~165px past the right screen edge — the real-device capture",
      "        shows every row's status/duration and most of the command label cut",
      "        off, and the panel cannot be panned to. Re-anchor the panel to the",
      "        viewport itself: fixed, 8px gutters, full remaining width.",
      "        `top: auto` is the point of the rule — with no top/bottom the panel",
      "        keeps its STATIC position, the flow slot right below its own",
      "        trigger, so no header geometry is hardcoded and the panel still",
      "        drops from its button in every header variant (76px header, blank",
      "        hero, a title row of any height). Only the horizontal geometry is",
      "        taken over; the 5px gap under the trigger comes back as margin.",
      "        Cross-rule note (rule 9): the shell frame carries a permanent",
      "        translateY(--mobilefix-kb) transform at ≤700px, so this fixed",
      "        panel is really contained by the FRAME, not the raw viewport.",
      "        That is identical here because the frame IS the viewport box",
      "        (x 0, full width/height) and the variable resolves to 0px",
      "        whenever no keyboard session is live — tapping the trigger",
      "        ends one, since focus leaves the composer. Keep that invariant",
      "        (frame anchored at 0,0 and viewport-sized) if rule 9 ever",
      "        moves off the frame.",
      "        Hook: the panel is the trigger button's immediate next sibling, and",
      "        the seat-scoped selector keeps it exact — the agent-preset seat",
      "        beside it renders a menuAnchor button with no sibling list, and",
      "        every portaled popover (schedule catalog, preset picker) lives",
      "        outside the seat entirely. */",
      "  [data-slot=\"conversation.session.header.actions\"] button[aria-expanded] + ul[aria-label] {",
      "    position: fixed !important;",
      "    left: 8px !important;",
      "    right: 8px !important;",
      "    top: auto !important;",
      "    width: auto !important;",
      "    max-width: none !important;",
      "    margin: 5px 0 0 !important;",
      "  }",
      "  /* 22. Open-in-app splits on touch: desktop-only controls — the file",
      "        preview card's 代码 / 更多打开方式 split and the files tab",
      "        header's 通过资源管理器打开 split (handing a path to a local",
      "        desktop app means nothing on a phone, and they crowd the",
      "        toolbars). dsh 0.2.0-rc.2 sets data-open-path ONLY on the",
      "        compact file split (kind === \"file\" && !prominent), so the old",
      "        [data-open-target=\"file\"][data-open-path] pair no longer matches",
      "        the directory split — hide every split by kind instead. The",
      "        whole split goes: its main button opens the default app and",
      "        the chevron is the 更多打开方式 menu — rule 20's precedent. */",
      "  [data-open-target=\"file\"][data-open-path],",
      "  [data-open-target=\"directory\"] {",
      "    display: none !important;",
      "  }",
      "  /* 23. Model-selector menu's search box (≤700px): the composer model",
      "        menu already scrolls a short grouped list on a phone — the",
      "        搜索模型… row spends a full header line and pulls the soft",
      "        keyboard up on every open for almost no filtering value.",
      "        dsh-client-ui-model-selection renders the row as a searchRow",
      "        wrapper containing a span.search > input[role=searchbox]; the",
      "        input's placeholder/aria-label 搜索模型…/Search models… is the",
      "        only stable, locale-independent hook (row and field classes are",
      "        hashed CSS-module suffixes), so :has over that descendant pair",
      "        is the hook — a direct-child :has misses the span wrapper",
      "        (verified against the live rc.2 DOM). The clear button lives",
      "        inside the row and goes with it. The settings-models page's",
      "        search stays untouched: its input is not a role=searchbox",
      "        inside a menu. */",
      "  div[class*=\"searchRow\"]:has([role=\"searchbox\"][aria-label=\"搜索模型…\"]),",
      "  div[class*=\"searchRow\"]:has([role=\"searchbox\"][aria-label=\"Search models…\"]) {",
      "    display: none !important;",
      "  }",
      "}",
    ].join("\n");

    function apply(ctx) {
      var tag = document.createElement("style");
      tag.dataset.plugin = "dsh-web-mobile-fix";
      tag.textContent = CSS;
      document.head.append(tag);


      /* Tap-outside-to-collapse: on narrow viewports, when the expanded sidebar
         is floating over the center, any click landing outside the sidebar
         column collapses it (same action as the toggle button). Capture phase:
         fires before target handlers and before any stopPropagation, and scroll
         gestures never produce clicks. Clicks inside the sidebar (including the
         settings dialog, which renders inside the sidebar DOM) are ignored.
         The layout service is fetched via ctx.get() (optional lookup) because
         direct ctx.layout access is gated behind the plugin's inject
         declaration by the guarded ctx facade — a plain function-form plugin
         has no declaration site, so ctx.layout would throw.

         Auto-collapse after session actions (≤700px only — exactly the band of
         the floating-sidebar CSS above: >700px the sidebar is not this plugin's
         overlay at all, and >768px nothing here runs, so PCs and tablets keep
         the stock behavior). A click on a session row or search result
         ([role="treeitem"] that is neither a group folder ([aria-expanded], it
         merely folds/unfolds) nor disabled) or on a "new session" button
         (aria-label containing 新建会话 / starting with "New session" — the
         zh/en dictionaries are the only ones shipped), or on a global-panel entry (the panel nav's button, aria-label
         exactly set to the plugins label) - picking a panel swaps the centre
         column, so the drawer closes on the same tap, session-style. All of
         these open or swap the centre view, so the floating sidebar collapses
         right after. The row hook
         is deliberately broad: the installed sidebar (better-sidebar 0.18)
         marks rows role=treeitem with aria-current only — the aria-selected
         this hook used before is gone, and the active-row marker must not be
         required for the collapse. Excluded on purpose: the rows' "…" action
         buttons (they stopPropagation — no session opens — and their localized
         labels never match the new-session patterns) and workspace group rows
         ([aria-expanded], they merely fold/unfold the group). */
      var suppressComposerFocusUntil = 0;
      /* Keyboard session: the --mobilefix-kb lift is only allowed while the
         composer input holds focus. The visual-viewport math cannot tell a
         soft keyboard from a system sheet (file picker); focus can. */
      var kbActive = false;
      var kbLift = 0;
      var onCaptureClick = function (event) {
        if (window.innerWidth > 768) return;
        /* Attach tap: the product's keepFocus re-focuses the composer while a
           system file sheet presents - iOS keeps the visual viewport shrunk
           (phantom keyboard) for as long as that focus lasts. End the keyboard
           session and drop focus first; it re-arms on the next real focusin. */
        var at = event.target;
        /* The + trigger is the only listbox popup inside the composer card (model and workspace triggers are menus); a structural hook survives label rewording.
           0.1.6-alpha.2 regression: onToggleCommandMenu now FOCUSES the draft itself (focusDraftEditor) inside the button's onClick — AFTER this capture
           handler's synchronous blur — and mousedown keepDraftFocus focuses too. Each refocus would pop the soft keyboard (old builds only toggled the
           menu). Arm the same composer-focus suppression window the send flow uses: every refocus focusin inside the window is blurred at once, so the
           editor ends the gesture unfocused and the keyboard stays closed, while the menu itself still opens.
           0.2.0-rc.1: the PRE-click blur kills the menu — the toggle no longer opens its command listbox when the draft lost focus before the click
           (verified headless: full click sequence delivered, aria-expanded never flips, no listbox mounts; at >768px where this handler early-returns
           the listbox opens fine). The listbox also survives a POST-open draft blur, so dropping only the synchronous pre-click blur keeps the
           keyboard-closed goal: the suppression window below still blurs every refocus focusin while the menu is already open. */
      if (at && typeof at.closest === "function" && at.closest('[data-composer-card] button[aria-haspopup="listbox"]')) {
          kbActive = false;
          kbLift = 0;
          document.documentElement.style.removeProperty("--mobilefix-kb");
          suppressComposerFocusUntil = Date.now() + 600;
        }
        var overlayLayer = document.querySelector("[data-shell-overlay]");
      var frame = overlayLayer ? overlayLayer.parentElement : null;
        if (!frame || frame.hasAttribute("data-sidebar-collapsed")) return;
        var sidebarCol = frame.firstElementChild;
        if (!sidebarCol) return;
        var layout = null;
        try {
          layout = ctx.get ? ctx.get("layout") : void 0;
        } catch (e) {
          layout = void 0;
        }
        if (!layout || !layout.toggleSidebar) return;
        if (!sidebarCol.contains(event.target)) {
          layout.toggleSidebar();
          return;
        }
        if (window.innerWidth > 700) return;
        var target = event.target;
        if (!target || typeof target.closest !== "function") return;
        var sessionRow = target.closest('[role="treeitem"]:not([aria-expanded]):not([aria-disabled="true"])');
        if (sessionRow && sidebarCol.contains(sessionRow)) {
          var rowMenu = target.closest("button");
          if (rowMenu && rowMenu !== sessionRow && sessionRow.contains(rowMenu)) return;
          suppressComposerFocusUntil = Date.now() + 2000;
          layout.toggleSidebar();
          return;
        }
        var navButton = target.closest("button[aria-label]");
        if (navButton && sidebarCol.contains(navButton)) {
          var label = navButton.getAttribute("aria-label") || "";
          /* The global-panel entry is the 全局面板 nav's PanelRow button (插件/Plugins —
             the zh/en dictionaries are the only ones shipped; the Cordis badge's
             "Cordis 插件" never exact-matches). Picking a global panel swaps the
             centre column, so the floating drawer closes on the same tap, exactly
             like a session pick. */
          if (/新建会话|^New session/.test(label) || /^插件$|^Plugins$/i.test(label)) {
            suppressComposerFocusUntil = Date.now() + 2000;
            layout.toggleSidebar();
          }
        }
      };
      document.addEventListener("click", onCaptureClick, true);

      /* Composer-focus suppression: the product focuses the composer input on
         every sessionId change (a [locked, sessionId] effect), which on
         iOS pops the soft keyboard right after a sidebar session switch.
         Session actions below arm a short window; any focus landing on the
         composer input inside it is blurred at once, so the keyboard stays
         closed. 0.1.2-rc.1 replaced the <textarea> with a Lexical
         contenteditable host that carries data-composer-input — that
         attribute is the hook now. The queue dock's rename <input> lives
         in the same seat without the attribute and keeps working. */
      var onCaptureFocusIn = function (event) {
        if (window.innerWidth <= 700) {
          var hintTarget = event.target;
          if (hintTarget && typeof hintTarget.closest === "function" && hintTarget.closest("[data-composer-seat] [data-composer-input]")) markComposerKeyHint(hintTarget);
        }
        var focusT = event.target;
        if (focusT && typeof focusT.closest === "function" && focusT.closest("[data-composer-seat] [data-composer-input]")) kbActive = true;
        if (Date.now() > suppressComposerFocusUntil) return;
        var focusTarget = event.target;
        if (!focusTarget || typeof focusTarget.closest !== "function") return;
        if (!focusTarget.closest("[data-composer-seat] [data-composer-input]")) return;
        focusTarget.blur();
      };
      document.addEventListener("focusin", onCaptureFocusIn, true);

      var onComposerFocusOut = function (event) {
        var t = event.target;
        if (!t || typeof t.closest !== "function") return;
        if (!t.closest("[data-composer-seat] [data-composer-input]")) return;
        kbActive = false;
        kbLift = 0;
        document.documentElement.style.removeProperty("--mobilefix-kb");
      };
      document.addEventListener("focusout", onComposerFocusOut, true);

      /* Enter: newline only (≤700px) — the soft keyboard's key is relabeled
         换行 via enterkeyhint="enter" and NEVER sends; sending lives on the
         composer's ↑ button. Every real Enter keypress is prevented (and
         propagation stopped, so no downstream submit path can see it) and
         replaced with a synthetic beforeinput of inputType
         "insertLineBreak" — Lexical's LIVE input pipeline on this phone.
         The keydown route is deliberately NOT used: WeChat Input's
         commit-style typing (kc=229 keydowns whose key is the committed
         text, no clean compositionend) leaves Lexical's composition state
         dangling, and its root keydown listener early-returns while
         isComposing() — a replayed keydown (Shift+Enter included) is
         dropped there, which is exactly why the 1.6.4 replay produced
         nothing. The beforeinput pipeline has no such gate: its handler
         maps "insertLineBreak" straight to INSERT_LINE_BREAK_COMMAND, and
         it is verifiably alive — every committed character on this phone
         arrives through it. Key repeat is swallowed: one newline per
         physical press. Ctrl/Meta, IME composition, an open command
         listbox and read-only states all pass through untouched. */
      var markComposerKeyHint = function (target) {
        if (window.innerWidth > 700) return;
        /* "enter" renders as 换行 on the iOS soft keyboard — on phones the
           key's only job is a newline. */
        if (target.getAttribute("enterkeyhint") !== "enter") target.setAttribute("enterkeyhint", "enter");
      };
      /* One newline, through Lexical's live beforeinput pipeline. */
      var repinTimers = [];
      var dispatchNewline = function (target) {
        var bi;
        try {
          bi = new InputEvent("beforeinput", { inputType: "insertLineBreak", bubbles: true, cancelable: true });
        } catch (e) {
          bi = new Event("beforeinput", { bubbles: true, cancelable: true });
          Object.defineProperty(bi, "inputType", { value: "insertLineBreak" });
        }
        target.dispatchEvent(bi);
        /* iOS pans viewports to reveal the caret after an insertion (and
           IME accessory bars pop in and out) — snap everything back over
           the next few frames: page scroll + keyboard inset, and every
           scrollable ancestor of the composer pinned to its bottom, so the
           input box stays planted above the keyboard instead of floating
           wherever the caret-reveal scroll left it. */
        repinAfterNewline(target);
        /* Tracked so cleanup can cancel them: a repin firing after the
           plugin stopped would re-write the keyboard variable its own
           cleanup just removed. */
        repinTimers.push(setTimeout(repinAfterNewline, 80, target));
        repinTimers.push(setTimeout(repinAfterNewline, 240, target));
      };
      var onCaptureEnterKeyDown = function (event) {
        if (window.innerWidth > 700) return;
        if (event.key !== "Enter" || event.ctrlKey || event.metaKey) return;
        if (event.isComposing || event.keyCode === 229) return;
        var target = event.target;
        if (!target || typeof target.closest !== "function") return;
        if (!target.closest("[data-composer-seat] [data-composer-input]")) return;
        if (target.readOnly || target.disabled) return;
        if (document.querySelector('[data-composer-card] [role="listbox"]')) return;
        if (event.repeat) {
          /* Swallow key repeat: one newline per physical press. */
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        markComposerKeyHint(target);
        event.preventDefault();
        event.stopPropagation();
        dispatchNewline(target);
      };
      document.addEventListener("keydown", onCaptureEnterKeyDown, true);

      /* IME Return retarget: soft keyboards that drive a contenteditable
         through the IME-commit protocol never emit key="Enter" — WeChat
         Input (微信输入法) turns the Return key into an insertText of
         "\n " (kc=229, the committed text lands in the keydown's key) and
         then follows it ~2ms later with its own corrective Backspace to
         strip the trailing space. The visible result is an insert-then-
         delete flicker, and the stock newline handling never runs. The
         hold duration is digested inside the IME, so tap and long-press
         are indistinguishable at page level — the key gets ONE behavior:
         newline. Intercept the composer's insertText containing a newline
         (and its propagation — Lexical's beforeinput handler would
         otherwise insert the "\n " text anyway), then dispatchNewline
         like the keydown retarget above. The
         corrective Backspace is then swallowed twice over: its keydown
         (Lexical's keydown chain deletes on it directly) and its
         deleteContentBackward beforeinput, within a short window — it
         exists only to clean the space we no longer let exist. A
         genuine Backspace inside the same window is swallowed with it:
         a keystroke pair humans do not produce, an accepted cost.
         Keyboards
         that DO emit real Enter events go through the keydown retarget
         above. */
      var imeReturnUntil = 0;
      var onCaptureImeBackspaceKeydown = function (event) {
        if (window.innerWidth > 700) return;
        if (event.key !== "Backspace" || Date.now() > imeReturnUntil) return;
        event.preventDefault();
        event.stopPropagation();
      };
      var onCaptureImeReturn = function (event) {
        if (window.innerWidth > 700) return;
        if (event.inputType === "deleteContentBackward") {
          if (Date.now() <= imeReturnUntil) {
            event.preventDefault();
          }
          return;
        }
        if (event.inputType !== "insertText") return;
        var data = event.data;
        if (typeof data !== "string" || data.indexOf("\n") === -1) return;
        var target = event.target;
        if (!target || typeof target.closest !== "function") return;
        if (!target.closest("[data-composer-seat] [data-composer-input]")) return;
        event.preventDefault();
        event.stopPropagation();
        imeReturnUntil = Date.now() + 150;
        dispatchNewline(target);
      };
      document.addEventListener("keydown", onCaptureImeBackspaceKeydown, true);
      document.addEventListener("beforeinput", onCaptureImeReturn, true);

      var restoreScroll = function () {
        /* iOS Safari turns the keyboard's visual-viewport pan into a stuck
           document scroll once the keyboard or a system sheet has been shown; the
           app is a 100%-height shell, so top is the only home. Different iOS
           builds park the offset on the window, the html or the body element —
           clear all three. */
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      };

      /* Hide the keyboard after send (≤700px): every composer button runs
         onMouseDown=keepFocus (preventDefault + refocus of the input), so focus
         never leaves the composer across the send tap and the soft keyboard
         stays open after sending. On a capture click landing on the composer's
         primary SEND button (aria-label 发送消息/Send message — the complete
         zh/en dictionary; while running with an empty draft the same button
         relabels to 停止生成/Stop generating and never matches, so stopping
         keeps the keyboard for follow-up typing) the event is NOT intercepted:
         the submit runs untouched and the input is blurred SYNCHRONOUSLY
         inside the capture handler — the blur must land inside the user-gesture
         context or iOS keeps the keyboard up (real-device result when the blur
         was deferred to setTimeout(0) after the dispatch; the attach flow's
         proven blur is synchronous for the same reason). Timed retries at
         0/120/300ms and the existing composer-focus suppression window stay as
         belt-and-braces against asynchronous refocus from the submit pipeline.
         iOS can leave the viewport panned once the keyboard drops —
         restoreScroll() snaps it home and the visualViewport listener clears
         --mobilefix-kb so the shell settles back. A deliberate tap into the
         input refocuses normally once the short window expires. */
      var onCaptureSendBlur = function (event) {
        if (window.innerWidth > 700) return;
        var target = event.target;
        if (!target || typeof target.closest !== "function") return;
        if (!target.closest('[data-composer-card] button[aria-label="发送消息"], [data-composer-card] button[aria-label="Send message"]')) return;
        var blurIfComposer = function () {
          var active = document.activeElement;
          if (active && active !== document.body && typeof active.blur === "function" && typeof active.closest === "function" && active.closest("[data-composer-seat] [data-composer-input]")) {
            active.blur();
            restoreScroll();
          }
        };
        blurIfComposer();
        suppressComposerFocusUntil = Date.now() + 600;
        repinTimers.push(setTimeout(blurIfComposer, 0));
        repinTimers.push(setTimeout(blurIfComposer, 120));
        repinTimers.push(setTimeout(blurIfComposer, 300));
      };
      document.addEventListener("click", onCaptureSendBlur, true);

      /* Keyboard lift: mirror the soft-keyboard inset into the
         --mobilefix-kb custom property consumed by CSS rule 9. iOS and
         Chrome 108+ (resizes-visual default) keep window.innerHeight fixed
         while visualViewport shrinks; the inset is what the keyboard covers.
         The >100px threshold ignores pinch-zoom noise, and >700px widths
         clear the variable so only the ≤700px rule ever sees a value —
         PCs and tablets are untouched. */
      var viewport = window.visualViewport;
      var onViewportChange = function () {
        var rootStyle = document.documentElement.style;
        if (!viewport || window.innerWidth > 700) {
          rootStyle.removeProperty("--mobilefix-kb");
          return;
        }
        var inset = Math.round(window.innerHeight - viewport.height - viewport.offsetTop);
        /* Latch: newline caret-reveal pans jitter the measured inset a few px;
           ignore small decreases so the page never dips mid-typing. A real
           keyboard height change (>60px, e.g. accessory bar) still applies.
           Lift only when a real conversation view is up: the conversation root
           publishes data-phase="active" (hero/blank/settling otherwise), and on
           the blank-session hero the composer sits near the top of the screen —
           the keyboard never covers it, so lifting the shell would just push
           the form out of view. */
        if (inset > 100 && kbActive && document.querySelector('[data-phase="active"]')) {
          if (kbLift === 0 || inset >= kbLift || kbLift - inset > 60) kbLift = inset;
          rootStyle.setProperty("--mobilefix-kb", kbLift + "px");
        } else {
          kbLift = 0;
          rootStyle.removeProperty("--mobilefix-kb");
        }
      };
      if (viewport) {
        viewport.addEventListener("resize", onViewportChange);
        viewport.addEventListener("scroll", onViewportChange);
      }

      /* The system file sheet resolved: the keyboard session ended with it. */
      var onFileInputResolved = function (event) {
        var t = event.target;
        if (t && t.tagName === "INPUT" && t.type === "file") {
          kbActive = false;
          kbLift = 0;
          restoreScroll();
          onViewportChange();
        }
      };
      document.addEventListener("change", onFileInputResolved, true);
      document.addEventListener("cancel", onFileInputResolved, true);

      /* Dockkit tab tap activation (right-panel strip): every tab calls
         setPointerCapture in pointerdown (for drag-to-reorder) and iOS WebKit
         then swallows the synthesized click, so a single tap switches nothing
         and a second tap is needed. The dockkit pointer logic itself is a
         no-op below its 4px drag threshold — the click is the only activation
         path — so re-dispatch one directly on a stationary touch pointerup
         (≤700px only). focusTab is idempotent, so when the native click does
         arrive it is a harmless no-op. The per-tab close button is excluded:
         it stops its own propagation and closes the tab; a moved finger
         (>10px) is a swipe/drag, not a tap. */
      var tabTapStart = null;
      var onTabTapPointerDown = function (event) {
        if (event.pointerType !== "touch") { tabTapStart = null; return; }
        var t = event.target;
        var tab = t && typeof t.closest === "function" ? t.closest("[data-dockkit-tab]") : null;
        tabTapStart = tab ? { tab: tab, x: event.clientX, y: event.clientY } : null;
      };
      var onTabTapPointerUp = function (event) {
        var start = tabTapStart;
        tabTapStart = null;
        if (window.innerWidth > 700 || !start || event.pointerType !== "touch") return;
        var t = event.target;
        if (!t || typeof t.closest !== "function") return;
        if (t.closest("[data-dockkit-tab-close]")) return;
        var tab = t.closest("[data-dockkit-tab]");
        if (!tab || tab !== start.tab || !document.contains(tab)) return;
        var dx = event.clientX - start.x;
        var dy = event.clientY - start.y;
        if (dx * dx + dy * dy > 100) return;
        tab.click();
      };
      document.addEventListener("pointerdown", onTabTapPointerDown, true);
      document.addEventListener("pointerup", onTabTapPointerUp, true);

      /* Sidebar first-tap repair: workspace and session rows are HTML5
         draggable (drag-to-reorder, a desktop gesture). iOS Safari routes a
         touch on a draggable element through drag detection and swallows (or
         doubles) the synthesized click, so one clean tap switches nothing
         and a second tap is needed. Strip the draggable flag from the row
         under a touch pointerdown, before drag detection starts: the tap
         then behaves like a plain click. React restores the attribute on
         re-render; the next pointerdown strips it again. Buttons inside the
         row were never affected. Hover styles are left alone — a first
         attempt to also neutralize the sticky touch hover (rule 20) was
         rejected on the real device and stays out. */
      var onSidebarPointerDown = function (event) {
        if (event.pointerType !== "touch") return;
        var t = event.target;
        if (!t || typeof t.closest !== "function") return;
        var overlayLayer = document.querySelector("[data-shell-overlay]");
        var frame = overlayLayer ? overlayLayer.parentElement : null;
        if (!frame) return;
        var sidebarCol = frame.firstElementChild;
        if (!sidebarCol || !sidebarCol.contains(t)) return;
        var row = t.closest('[draggable="true"]');
        if (row) row.draggable = false;
      };
      document.addEventListener("pointerdown", onSidebarPointerDown, true);

      /* Force everything back to its canonical post-newline state: page
         scroll to top, keyboard-inset recompute, and every scrollable
         ancestor of the composer (chat scrollport, composer scroll area)
         pinned to its bottom — the composer then always sits planted
         directly above the keyboard, never floating mid-column. */
      var repinAfterNewline = function (target) {
        restoreScroll();
        onViewportChange();
        var el = target && target.parentElement;
        while (el && el !== document.body) {
          if (el.scrollHeight > el.clientHeight + 1) {
            var overflowY = getComputedStyle(el).overflowY;
            if (overflowY === "auto" || overflowY === "scroll") el.scrollTop = el.scrollHeight;
          }
          el = el.parentElement;
        }
      };

      /* Mobile viewport guard: append maximum-scale=1 to the viewport meta
         (≤700px only; idempotent; original content restored on unload).
         iOS magnifies the page whenever an input with a computed font-size
         under 16px is focused — maximum-scale=1 suppresses exactly that
         automatic focus zoom without touching any field font size, while
         user pinch-zoom stays available (iOS accessibility always allows
         it). Desktop and tablets are untouched. */
      var viewportMetaOriginal = null;
      var ensureMobileViewport = function () {
        if (window.innerWidth > 700) return;
        var meta = document.querySelector('meta[name="viewport"]');
        if (!meta) return;
        if (viewportMetaOriginal === null) viewportMetaOriginal = meta.getAttribute("content");
        var content = meta.getAttribute("content") || "";
        if (content.indexOf("maximum-scale") !== -1) return;
        meta.setAttribute("content", content ? content + ", maximum-scale=1" : "maximum-scale=1");
      };
      ensureMobileViewport();
      window.addEventListener("resize", ensureMobileViewport);

      ctx.effect(function () {
        return function () {
          tag.remove();
          for (var i = 0; i < repinTimers.length; i++) clearTimeout(repinTimers[i]);
          repinTimers.length = 0;
          document.removeEventListener("click", onCaptureClick, true);
          document.removeEventListener("focusin", onCaptureFocusIn, true);
          document.removeEventListener("keydown", onCaptureEnterKeyDown, true);
          document.removeEventListener("keydown", onCaptureImeBackspaceKeydown, true);
          document.removeEventListener("beforeinput", onCaptureImeReturn, true);
          document.removeEventListener("click", onCaptureSendBlur, true);
          document.removeEventListener("focusout", onComposerFocusOut, true);
          document.removeEventListener("change", onFileInputResolved, true);
          document.removeEventListener("cancel", onFileInputResolved, true);
          document.removeEventListener("pointerdown", onTabTapPointerDown, true);
          document.removeEventListener("pointerup", onTabTapPointerUp, true);
          document.removeEventListener("pointerdown", onSidebarPointerDown, true);
          tabTapStart = null;
          if (viewport) {
            viewport.removeEventListener("resize", onViewportChange);
            viewport.removeEventListener("scroll", onViewportChange);
          }
          window.removeEventListener("resize", ensureMobileViewport);
          if (viewportMetaOriginal !== null) {
            var meta = document.querySelector('meta[name="viewport"]');
            if (meta) meta.setAttribute("content", viewportMetaOriginal);
          }
          document.documentElement.style.removeProperty("--mobilefix-kb");
        };
      });
    }

    exports.apply = apply;
    return module.exports;
  }
});
