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
      "        focus stays (e.g. the sidebar toggle's 折叠侧边栏 tip). Hide the",
      "        bubble on narrow screens; the buttons keep their aria-labels, so",
      "        assistive tech still announces the action. The primitive is the",
      "        only role=\"tooltip\" in the product bundle, so the semantic",
      "        attribute is a stable hook. */",
      "  [role=\"tooltip\"] {",
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
         ([role="treeitem"][aria-selected]) or on a "new session" button
         (aria-label containing 新建会话 / starting with "New session" — the
         zh/en dictionaries are the only ones shipped) opens or starts a
         session, so the floating sidebar collapses right after. Excluded on
         purpose: the rows' "…" action buttons (they stopPropagation — no
         session opens — and their localized labels never match the new-session
         patterns) and workspace group rows ([aria-expanded], no aria-selected,
         they merely fold/unfold the group). */
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
        var sessionRow = target.closest('[role="treeitem"][aria-selected]');
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
        if (Date.now() > suppressComposerFocusUntil) return;
        var focusTarget = event.target;
        if (!focusTarget || typeof focusTarget.closest !== "function") return;
        if (!focusTarget.closest("[data-composer-seat] textarea")) return;
        focusTarget.blur();
      };
      document.addEventListener("focusin", onCaptureFocusIn, true);

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

      ctx.effect(function () {
        return function () {
          tag.remove();
          document.removeEventListener("click", onCaptureClick, true);
          document.removeEventListener("focusin", onCaptureFocusIn, true);
          if (viewport) {
            viewport.removeEventListener("resize", onViewportChange);
            viewport.removeEventListener("scroll", onViewportChange);
          }
          document.documentElement.style.removeProperty("--mobilefix-kb");
        };
      });
    }

    exports.apply = apply;
    return module.exports;
  }
});
