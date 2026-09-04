window.__ModuleLoader__.load({
  id: "dsh-web-mobile-fix",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;

    var CSS = [
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
      "  /* 2. Session log header button: compact icon-only circle */",
      "  [data-slot=\"conversation.session.header.utilities\"] button {",
      "    width: 32px !important;",
      "    min-width: 32px !important;",
      "    height: 32px !important;",
      "    padding: 0 !important;",
      "    border-radius: 50% !important;",
      "    justify-content: center !important;",
      "  }",
      "  [data-slot=\"conversation.session.header.utilities\"] button span {",
      "    position: absolute !important;",
      "    width: 1px !important;",
      "    height: 1px !important;",
      "    margin: -1px !important;",
      "    padding: 0 !important;",
      "    border: 0 !important;",
      "    overflow: hidden !important;",
      "    clip: rect(0 0 0 0) !important;",
      "    white-space: nowrap !important;",
      "  }",
      "  /* 3. Composer model select: hide the model name / effort text, keep the",
      "        chevron; the click still opens the model + effort picker */",
      "  [data-slot=\"conversation.input.model\"] > div > button {",
      "    padding: 0 6px !important;",
      "    gap: 0 !important;",
      "  }",
      "  [data-slot=\"conversation.input.model\"] > div > button > span {",
      "    display: none !important;",
      "  }",
      "  /* 4. Anchored dropdowns → centered popups */",
      "  [data-slot=\"conversation.composer.bar\"] [role=\"menu\"],",
      "  [data-slot=\"conversation.composer.bar\"] [role=\"dialog\"],",
      "  [data-slot=\"conversation.session.header.actions\"] ul[aria-label] {",
      "    position: fixed !important;",
      "    left: 50% !important;",
      "    top: 50% !important;",
      "    right: auto !important;",
      "    bottom: auto !important;",
      "    transform: translate(-50%, -50%) !important;",
      "    min-width: 0 !important;",
      "    max-width: calc(100vw - 32px) !important;",
      "    max-height: min(480px, calc(100dvh - 96px)) !important;",
      "    z-index: 1200 !important;",
      "  }",
      "  /* 5. Hide the session title breadcrumbs in the top bar */",
      "  [data-slot=\"conversation.session.header\"] nav {",
      "    display: none !important;",
      "  }",
      "  /* 6. Directory picker footer: pin Cancel/Open to one stable bottom row */",
      "  [role=\"dialog\"]:has(> div:last-child > button[aria-pressed]) > div:last-child {",
      "    display: grid !important;",
      "    grid-template-columns: minmax(0, 1fr) auto auto !important;",
      "    gap: 8px !important;",
      "    align-items: center !important;",
      "  }",
      "  [role=\"dialog\"]:has(> div:last-child > button[aria-pressed]) > div:last-child > :nth-child(1) {",
      "    grid-area: 1 / 1 !important;",
      "    justify-self: start !important;",
      "  }",
      "  [role=\"dialog\"]:has(> div:last-child > button[aria-pressed]) > div:last-child > :nth-child(2) {",
      "    grid-area: 1 / 2 !important;",
      "    justify-self: start !important;",
      "  }",
      "  [role=\"dialog\"]:has(> div:last-child > button[aria-pressed]) > div:last-child > :nth-child(3) {",
      "    grid-area: 2 / 1 !important;",
      "  }",
      "  [role=\"dialog\"]:has(> div:last-child > button[aria-pressed]) > div:last-child > :nth-child(4) {",
      "    grid-area: 2 / 2 !important;",
      "    justify-self: end !important;",
      "  }",
      "  [role=\"dialog\"]:has(> div:last-child > button[aria-pressed]) > div:last-child > :nth-child(5) {",
      "    grid-area: 2 / 3 !important;",
      "    justify-self: end !important;",
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
      "  [data-details-collapsed] {",
      "    grid-template-columns: 56px minmax(0, 1fr) 0 !important;",
      "  }",
      "  [data-details-collapsed]:not([data-sidebar-collapsed]) > div:first-child {",
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
      "  /* 9. Keyboard lift: iOS (and Chrome 108+ by default) shrink only the",
      "        visual viewport when the soft keyboard opens — the layout viewport",
      "        keeps its height, so the composer (sticky/absolute at the bottom",
      "        of a 100%-height shell) stays hidden behind the keyboard. The",
      "        listener below mirrors the keyboard inset into --mobilefix-kb;",
      "        lifting the shell by that amount brings the composer above the",
      "        keyboard. Without the variable this rule is an exact no-op",
      "        (0px = stock height), and the variable is only ever consumed",
      "        inside this ≤700px block. */",
      "  [data-details-collapsed] {",
      "    height: calc(100% - var(--mobilefix-kb, 0px)) !important;",
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
      "  [data-plan-review-key] [data-plan-review-scroll] :is(pre, code) {",
      "    white-space: pre-wrap !important;",
      "    overflow-wrap: anywhere !important;",
      "  }",
      "  [data-plan-review-key] > section > div:last-child,",
      "  [data-plan-review-key] > section > div:last-child > div:last-child {",
      "    flex-wrap: wrap !important;",
      "    min-width: 0 !important;",
      "  }",
      "  /* 11. Composer \"+\" → paperclip: on phones the + only opens the command",
      "        menu (typing \"/\" opens it too) and there is no file entry at all —",
      "        the product attaches images via paste and drag only. Repurpose the",
      "        button: hide the plus glyph and paint a paperclip through a CSS",
      "        mask on ::after (not a React child, so re-renders keep it); the",
      "        click is retargeted to a file picker by the listener below. The",
      "        zh/en aria-label pair is the complete shipped dictionary. */",
      "  [data-composer-card] button[aria-haspopup=\"listbox\"][aria-label=\"命令\"] svg,",
      "  [data-composer-card] button[aria-haspopup=\"listbox\"][aria-label=\"Commands\"] svg {",
      "    display: none !important;",
      "  }",
      "  [data-composer-card] button[aria-haspopup=\"listbox\"][aria-label=\"命令\"]::after,",
      "  [data-composer-card] button[aria-haspopup=\"listbox\"][aria-label=\"Commands\"]::after {",
      "    content: \"\" !important;",
      "    display: block !important;",
      "    width: 14px !important;",
      "    height: 14px !important;",
      "    background-color: currentColor !important;",
      "    -webkit-mask: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48'/%3E%3C/svg%3E\") center / contain no-repeat !important;",
      "    mask: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48'/%3E%3C/svg%3E\") center / contain no-repeat !important;",
      "  }",
      "  /* 12. Command menu scroll-chain: the listbox viewport scrolls but never",
      "        sets overscroll-behavior, so a swipe inside the floating command",
      "        list chains into the history list behind it. Contain the chain on",
      "        both the listbox shell and its scrolling viewport child. */",
      "  [data-composer-card] [role=\"listbox\"],",
      "  [data-composer-card] [role=\"listbox\"] > div {",
      "    overscroll-behavior: contain !important;",
      "  }",
      "  /* 13. Hide the session-log download capsule: the export flow is a",
      "        desktop gesture and the capsule wastes header space on phones.",
      "        Registered by the session-log-export plugin into the utilities",
      "        slot; [class*=…sessionLogButton] is the CSS-module stable suffix. */",
      "  [data-slot=\"conversation.session.header.utilities\"] [class*=\"sessionLogButton\"] {",
      "    display: none !important;",
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
      "  /* 16. Task-board modal takeover: the third-party board view uses",
      "        container-type:inline-size, whose layout containment traps its",
      "        position:fixed modal backdrop inside the center column, so the",
      "        plugin's own 100vw/100dvh mobile sizing is 56px too wide and",
      "        its left edge hides under the sidebar rail. While an overlay",
      "        (modal backdrop or task detail) exists inside, lift the board",
      "        view itself to a fixed full-viewport layer above the sidebar:",
      "        the containment then measures the real viewport, the plugin's",
      "        own mobile CSS becomes correct, and :has stops matching on",
      "        close so the view returns to the center column with no JS.",
      "        The height rides rule 9's keyboard variable; class-suffix",
      "        hooks follow rule 13's precedent. */",
      "  [data-dsh-taskboard-view]:has([class*=\"modalBackdrop\"]),",
      "  [data-dsh-taskboard-view]:has([class*=\"detail\"]) {",
      "    position: fixed !important;",
      "    inset: 0 !important;",
      "    z-index: 1200 !important;",
      "    height: calc(100dvh - var(--mobilefix-kb, 0px)) !important;",
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
         zh/en dictionaries are the only ones shipped) opens or starts a
         session, so the floating sidebar collapses right after. The row hook
         is deliberately broad: the installed sidebar (better-sidebar 0.18)
         marks rows role=treeitem with aria-current only — the aria-selected
         this hook used before is gone, and the active-row marker must not be
         required for the collapse. Excluded on purpose: the rows' "…" action
         buttons (they stopPropagation — no session opens — and their localized
         labels never match the new-session patterns) and workspace group rows
         ([aria-expanded], they merely fold/unfold the group). */
      var suppressComposerFocusUntil = 0;
      var onCaptureClick = function (event) {
        if (window.innerWidth > 768) return;
        var frame = document.querySelector("[data-details-collapsed]");
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
        var newSessionButton = target.closest("button[aria-label]");
        if (newSessionButton && sidebarCol.contains(newSessionButton)) {
          var label = newSessionButton.getAttribute("aria-label") || "";
          if (/新建会话|^New session/.test(label)) {
            suppressComposerFocusUntil = Date.now() + 2000;
            layout.toggleSidebar();
          }
        }
      };
      document.addEventListener("click", onCaptureClick, true);

      /* Composer-focus suppression: the product focuses the composer textarea
         on every sessionId change (a [locked, sessionId] effect), which on
         iOS pops the soft keyboard right after a sidebar session switch.
         Session actions below arm a short window; any focus landing on the
         composer textarea inside it is blurred at once, so the keyboard
         stays closed. Textarea-only on purpose: the queue dock's rename
         <input> lives in the same seat and keeps working. */
      var onCaptureFocusIn = function (event) {
        if (window.innerWidth <= 700) {
          var hintTarget = event.target;
          if (hintTarget && typeof hintTarget.closest === "function" && hintTarget.closest("[data-composer-seat] textarea")) markComposerKeyHint(hintTarget);
        }
        if (Date.now() > suppressComposerFocusUntil) return;
        var focusTarget = event.target;
        if (!focusTarget || typeof focusTarget.closest !== "function") return;
        if (!focusTarget.closest("[data-composer-seat] textarea")) return;
        focusTarget.blur();
      };
      document.addEventListener("focusin", onCaptureFocusIn, true);

      /* Enter: tap = send, hold = newline (≤700px). The product submits on
         plain Enter and only Shift+Enter inserts a newline — the soft
         keyboard has no Shift, so phones could never wrap a line. The key
         is prevented on keydown and adjudicated on keyup: a quick tap
         replays a synthetic Enter keydown through the product's own submit
         path; a ≥350ms hold inserts a newline via execCommand (the editing
         pipeline fires onChange, so the draft store updates normally).
         enterkeyhint="send" relabels the key to match the tap behavior.
         Shift/Ctrl/Meta, IME composition, an open command listbox and
         read-only states all pass through untouched. */
      var enterDownAt = 0;
      var enterTarget = null;
      var replayingEnter = false;
      var markComposerKeyHint = function (target) {
        if (window.innerWidth > 700) return;
        if (target.getAttribute("enterkeyhint") !== "send") target.setAttribute("enterkeyhint", "send");
      };
      var onCaptureEnterKeyDown = function (event) {
        if (replayingEnter || window.innerWidth > 700) return;
        if (event.key !== "Enter" || event.shiftKey || event.ctrlKey || event.metaKey) return;
        if (event.isComposing || event.keyCode === 229) return;
        var target = event.target;
        if (!target || typeof target.closest !== "function") return;
        if (!target.closest("[data-composer-seat] textarea")) return;
        if (target.readOnly || target.disabled) return;
        if (document.querySelector('[data-composer-card] [role="listbox"]')) return;
        markComposerKeyHint(target);
        event.preventDefault();
        event.stopPropagation();
        enterTarget = target;
        enterDownAt = Date.now();
      };
      var onCaptureEnterKeyUp = function (event) {
        if (event.key !== "Enter" || enterDownAt === 0) return;
        var held = Date.now() - enterDownAt;
        var target = enterTarget;
        enterDownAt = 0;
        enterTarget = null;
        if (replayingEnter || !target) return;
        if (held < 350) {
          replayingEnter = true;
          try {
            target.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true }));
          } finally {
            replayingEnter = false;
          }
        } else {
          document.execCommand("insertText", false, "\n");
        }
      };
      document.addEventListener("keydown", onCaptureEnterKeyDown, true);
      document.addEventListener("keyup", onCaptureEnterKeyUp, true);

      /* Attach retarget: on phones the "+" button (the command-menu trigger,
         aria-label 命令/Commands) is re-tasked into a file button by rule 11.
         This capture listener fires before React's root delegation and stops
         the event, so the command menu never opens; it then clicks a hidden
         file input (images only — the draft pipeline validates image MIME)
         and feeds the picked files back through the product's own paste
         pipeline: a synthesized ClipboardEvent on the composer textarea, so
         validation, limits and thumbnails all stay stock. >700px returns
         early — PCs keep the stock + behavior. Disabled buttons dispatch no
         click, so a busy composer naturally stays closed. */
      var attachInput = null;
      var restoreScroll = function () {
        /* iOS Safari turns the keyboard's visual-viewport pan into a stuck
           document scroll once the picker sheet has been shown; the app is a
           100%-height shell, so top is the only home. Different iOS builds
           park the offset on the window, the html or the body element —
           clear all three. */
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      };
      var onCaptureAttach = function (event) {
        if (window.innerWidth > 700) return;
        var target = event.target;
        if (!target || typeof target.closest !== "function") return;
        var plus = target.closest('[data-composer-card] button[aria-haspopup="listbox"]');
        if (!plus) return;
        var plusLabel = plus.getAttribute("aria-label") || "";
        if (plusLabel !== "命令" && plusLabel !== "Commands") return;
        event.preventDefault();
        event.stopPropagation();
        /* Drop composer focus BEFORE presenting the sheet: the product's
           keepFocus handler re-focuses the textarea on mousedown, and with
           the keyboard up iOS Safari pans the window to keep the caret
           visible — that pan is what turns into the stuck "UI pushed to the
           top" state after the picker. Blurring closes the keyboard first,
           which also lets the keyboard-lift variable recompute to 0. */
        var active = document.activeElement;
        if (active && typeof active.blur === "function" && active !== document.body) active.blur();
        if (!attachInput) {
          attachInput = document.createElement("input");
          attachInput.type = "file";
          attachInput.accept = "image/*";
          attachInput.multiple = true;
          /* Fixed 1px box instead of display:none: Safari still opens the
             picker, but the input never extends the document and can never
             become a scroll-into-view target. */
          attachInput.style.cssText = "position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none;margin:0;padding:0;border:0;";
          document.body.appendChild(attachInput);
          attachInput.addEventListener("change", function () {
            var picked = Array.prototype.slice.call(attachInput.files || []);
            attachInput.value = "";
            var textarea = document.querySelector("[data-composer-seat] textarea");
            if (picked.length === 0 || !textarea) return;
            var board;
            try {
              board = new DataTransfer();
              for (var i = 0; i < picked.length; i++) board.items.add(picked[i]);
            } catch (e) {
              return;
            }
            var pasteEvent;
            try {
              pasteEvent = new ClipboardEvent("paste", { clipboardData: board, bubbles: true, cancelable: true });
            } catch (e2) {
              pasteEvent = new Event("paste", { bubbles: true, cancelable: true });
              Object.defineProperty(pasteEvent, "clipboardData", { value: board });
            }
            textarea.dispatchEvent(pasteEvent);
            restoreScroll();
          });
          attachInput.addEventListener("cancel", restoreScroll);
        }
        attachInput.click();
        restoreScroll();
      };
      document.addEventListener("click", onCaptureAttach, true);

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
        if (inset > 100) rootStyle.setProperty("--mobilefix-kb", inset + "px");
        else rootStyle.removeProperty("--mobilefix-kb");
      };
      if (viewport) {
        viewport.addEventListener("resize", onViewportChange);
        viewport.addEventListener("scroll", onViewportChange);
      }

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
          document.removeEventListener("click", onCaptureClick, true);
          document.removeEventListener("focusin", onCaptureFocusIn, true);
          document.removeEventListener("keydown", onCaptureEnterKeyDown, true);
          document.removeEventListener("keyup", onCaptureEnterKeyUp, true);
          document.removeEventListener("click", onCaptureAttach, true);
          if (attachInput) {
            attachInput.remove();
            attachInput = null;
          }
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
