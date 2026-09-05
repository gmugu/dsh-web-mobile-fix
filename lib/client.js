window.__ModuleLoader__.load({
  id: "dsh-web-mobile-fix",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;

    var CSS = [
      "/* dsh-web-mobile-fix 1.7.0 */",
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
      "        zh/en aria-label pair 指令/Commands is the complete shipped",
      "        dictionary (zh was 命令 before 0.1.2-rc.1). */",
      "  [data-composer-card] button[aria-haspopup=\"listbox\"][aria-label=\"指令\"] svg,",
      "  [data-composer-card] button[aria-haspopup=\"listbox\"][aria-label=\"Commands\"] svg {",
      "    display: none !important;",
      "  }",
      "  [data-composer-card] button[aria-haspopup=\"listbox\"][aria-label=\"指令\"]::after,",
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
      "        board's own 100vw/100dvh mobile sizing is 56px too wide and its",
      "        left edge hides under the sidebar rail. While an overlay (modal",
      "        backdrop or task detail) exists inside, lift the board view",
      "        itself to a fixed full-viewport layer above the sidebar: the",
      "        containment then measures the real viewport and :has stops",
      "        matching on close with no JS. The height rides rule 9's keyboard",
      "        variable; class-suffix hooks follow rule 13's precedent. The",
      "        detail hook is detailHeader — the overlay's root class is",
      "        detail, but board 0.3.14 also renders a always-present",
      "        detailMeta in the board header, so [class*=detail] would lift",
      "        the board permanently (detailHeader only exists inside the",
      "        open detail overlay). */",
      "  [data-dsh-taskboard-view]:has([class*=\"modalBackdrop\"]),",
      "  [data-dsh-taskboard-view]:has([class*=\"detailHeader\"]) {",
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
        if (Date.now() > suppressComposerFocusUntil) return;
        var focusTarget = event.target;
        if (!focusTarget || typeof focusTarget.closest !== "function") return;
        if (!focusTarget.closest("[data-composer-seat] [data-composer-input]")) return;
        focusTarget.blur();
      };
      document.addEventListener("focusin", onCaptureFocusIn, true);

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

      /* Attach retarget: on phones the "+" button (the command-menu trigger,
         aria-label 指令/Commands) is re-tasked into a file button by rule 11.
         This capture listener fires before React's root delegation and stops
         the event, so the command menu never opens; it then clicks a hidden
         file input (images only — the draft pipeline validates image MIME)
         and feeds the picked files back through the product's own paste
         pipeline: a synthesized ClipboardEvent on the composer input (the
         Lexical contenteditable host, data-composer-input), so validation,
         limits and thumbnails all stay stock. The trigger's zh label is
         指令 since 0.1.2-rc.1 (was 命令). >700px returns early — PCs keep
         the stock + behavior. Disabled buttons dispatch no click, so a busy
         composer naturally stays closed. */
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
        if (plusLabel !== "指令" && plusLabel !== "Commands") return;
        event.preventDefault();
        event.stopPropagation();
        /* Drop composer focus BEFORE presenting the sheet: the product's
           keepFocus handler re-focuses the composer input on mousedown, and,
           with the keyboard up, iOS Safari pans the window to keep the caret
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
            var composerInput = document.querySelector("[data-composer-seat] [data-composer-input]");
            if (picked.length === 0 || !composerInput) return;
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
            composerInput.dispatchEvent(pasteEvent);
            restoreScroll();
          });
          attachInput.addEventListener("cancel", restoreScroll);
        }
        attachInput.click();
        restoreScroll();
      };
      document.addEventListener("click", onCaptureAttach, true);

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
        if (inset > 100) rootStyle.setProperty("--mobilefix-kb", inset + "px");
        else rootStyle.removeProperty("--mobilefix-kb");
      };
      if (viewport) {
        viewport.addEventListener("resize", onViewportChange);
        viewport.addEventListener("scroll", onViewportChange);
      }

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
          document.removeEventListener("click", onCaptureAttach, true);
          document.removeEventListener("click", onCaptureSendBlur, true);
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
