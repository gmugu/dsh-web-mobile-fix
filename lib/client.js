window.__ModuleLoader__.load({
  id: "dsh-web-mobile-fix",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;

    var CSS = [
      "/* dsh-web-mobile-fix 1.13.0 */",
      "/* ── mobile UI fixes (≤700px) ── */",
      "@media (max-width: 700px) {",
      "  /* 0.2.2-rc.1 absorbed these: the settings panel has its own narrow-",
      "        screen grid (ui-settings-general), the directory-picker footer wraps",
      "        natively, the sidebar is a drawer overlay, row actions show under",
      "        (hover: none), the plan-review card clamps to a summary, touch",
      "        tooltips dismiss on pointerdown, and the background-jobs popover is",
      "        a portal positioned by useAnchoredPosition inside the visual",
      "        viewport. Their rules are gone; the numbers kept below are",
      "        historical ids used by cross-references. */",
      "  /* 9. Terminal caret lift: keep the shell's height unchanged and",
      "        translate it up by the live keyboard inset (--mobilefix-kb),",
      "        written only while a right-panel terminal input holds focus and",
      "        the caret is actually covered. A transform applies immediately on",
      "        the compositor; the inset resolves to 0 whenever no keyboard",
      "        session is live. */",
      "  div:has(> [data-shell-overlay]) {",
      "    transform: translateY(calc(-1 * var(--mobilefix-kb, 0px))) !important;",
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
      "  /* 22. Open-in-app splits on touch: desktop-only controls that hand a",
      "        path to a local app, all crowded or meaningless on a phone — the",
      "        session header's 在 {app} 中打开工作目录 entry (a directory",
      "        target), the files tab header's 通过资源管理器打开 split (also",
      "        directory), and the file preview card's 代码 / 更多打开方式 split",
      "        (a compact file split, the only place dsh 0.2.0-rc.2 sets",
      "        data-open-path: kind === \"file\" && !prominent). One rule by kind",
      "        covers all three; the whole split goes — its main button opens",
      "        the default app and the chevron is the 更多打开方式 menu. The",
      "        session log's 更多操作 menu is deliberately untouched: from",
      "        0.2.2-rc.1 it also offers 复制会话为 Markdown. */",
      "  [data-open-target=\"file\"][data-open-path],",
      "  [data-open-target=\"directory\"] {",
      "    display: none !important;",
      "  }",
      "}",
    ].join("\n");

    /* ──────────────────────────────────────────────────────────────
       Terminal key panel (merged from the former dsh-terminal-keys
       plugin). Self-contained section: locale tables, PTY key sequences,
       sticky-modifier rewriting, and the imperative body-level widget
       mounted by applyTerminalKeys(ctx) at the end of apply(). Its
       effects ride this same context, so the whole module still loads
       and unloads as one plugin. */
    const NAMESPACE = "terminalKeys";
    const ZH = {
      title: "终端按键",
      esc: "Esc 键",
      tab: "Tab 键",
      ctrl: "Ctrl 粘滞键",
      alt: "Alt 粘滞键",
      up: "上方向键",
      down: "下方向键",
      left: "左方向键",
      right: "右方向键",
      noTerminal: "当前无激活终端",
      readOnly: "终端暂不可写入",
      drag: "拖动移动"
    };
    const EN = {
      title: "Terminal keys",
      esc: "Escape",
      tab: "Tab",
      ctrl: "Ctrl modifier (sticky)",
      alt: "Alt modifier (sticky)",
      up: "Arrow up",
      down: "Arrow down",
      left: "Arrow left",
      right: "Arrow right",
      noTerminal: "No active terminal",
      readOnly: "Terminal is not writable",
      drag: "Drag to move"
    };

    /** Raw sequences written into the PTY, unchanged. */
    const SEQ = { up: "\x1b[A", down: "\x1b[B", right: "\x1b[C", left: "\x1b[D" };
    /** Modifier-decorated arrows (xterm modifyOtherKeys-style 3=Alt 5=Ctrl 7=Ctrl+Alt). */
    const SEQ_ALT = { up: "\x1b[1;3A", down: "\x1b[1;3B", right: "\x1b[1;3C", left: "\x1b[1;3D" };
    const SEQ_CTRL = { up: "\x1b[1;5A", down: "\x1b[1;5B", right: "\x1b[1;5C", left: "\x1b[1;5D" };
    const SEQ_CTRL_ALT = { up: "\x1b[1;7A", down: "\x1b[1;7B", right: "\x1b[1;7C", left: "\x1b[1;7D" };
    /** 'C'.charCodeAt(0) - 64 === 3, the byte Ctrl+C sends. */
    const ctrlCode = (letter) => String.fromCharCode(letter.charCodeAt(0) - 64);

    const POS_KEY = "terminalKeys:position";
    const DRAG_THRESHOLD = 6;

    const BASE_CSS = [
      "[data-plugin=\"terminal-keys\"]{position:fixed;z-index:2000;font-family:system-ui,\"Segoe UI\",\"Microsoft YaHei\",sans-serif}",
      ".tk-card{display:flex;flex-direction:column;gap:6px;padding:8px;border-radius:12px;background:var(--dsw-alias-bg-overlay);border:1px solid var(--dsw-alias-border-l2);box-shadow:0 10px 30px rgba(0,0,0,.28);width:196px;box-sizing:border-box;touch-action:none}",
      ".tk-head{display:flex;align-items:center;padding:6px 2px;cursor:grab}",
      ".tk-title{color:var(--dsw-alias-label-secondary);font-size:11px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
      ".tk-grip{color:var(--dsw-alias-label-tertiary);font-size:11px;margin-right:4px;flex:none}",
      ".tk-main{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}",
      ".tk-key{min-width:0;height:40px;border-radius:8px;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font-size:14px;font-weight:500;font-family:inherit;touch-action:none;user-select:none;-webkit-user-select:none;-webkit-tap-highlight-color:transparent;cursor:pointer;padding:0}",
      "@media (hover:hover){.tk-key:hover{background:var(--dsw-alias-interactive-bg-hover)}}",
      ".tk-key.tk-off{opacity:.4;pointer-events:none}",
      ".tk-key.tk-on{border-color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-interactive-bg-active);color:var(--dsw-alias-brand-primary)}",
      // pressed keys copy the shared ghost Button's active recipe; a JS class
      // drives it because preventDefault on pointerdown suppresses :active
      ".tk-key.tk-press{background:var(--dsw-alias-interactive-bg-active);border-color:var(--dsw-alias-border-l2)}",
      ".tk-flash{position:absolute;left:0;right:0;bottom:100%;margin-bottom:6px;font-size:11px;color:var(--dsw-alias-state-warn-primary);text-align:center;pointer-events:none}"
    ].join("\n");

    /** Handheld pointer only: coarse pointer or no hover. Desktop windows stay clean. */
    function touchOnly() {
      return (
        (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) ||
        (window.matchMedia && window.matchMedia("(hover: none)").matches)
      );
    }

    /** The seat component: shell.overlay renders it; the real surface is the body-level widget (see apply). */
    function TerminalKeysSeat() {
      return null;
    }

    /**
     * Imperative body-level widget. The shell's overlay layer is z-index 20 while
     * right-sidebar pane cells sit at z-index 40, so a seat-rendered entry is
     * covered whenever a rightbar tab is expanded; mounting at body level with
     * z-index 2000 keeps the keys reachable exactly then.
     *
     * The panel is a fixed 4×2 grid (Esc Tab Ctrl Alt / arrows). Ctrl and Alt are
     * sticky modifiers that compose with the user's own keyboard: armed bare keys
     * are rewritten into control/Meta sequences before the terminal sees them.
     *
     * Visibility refresh is event-driven wherever the platform offers events
     * (mounted session, open-tab membership, pointer mode, the active terminal's
     * state and navigation stores); a slow 1s poll remains only as the fallback
     * for the two pull-only facts — the active tab and sidebar expansion.
     */
    function createWidget(ctx) {
      const t = ctx.locale && ctx.locale.bind ? ctx.locale.bind(NAMESPACE) : (key) => key;
      const styleTag = document.createElement("style");
      styleTag.dataset.plugin = "dsh-web-mobile-fix";
      styleTag.textContent = BASE_CSS;

      const card = document.createElement("div");
      card.dataset.plugin = "terminal-keys";
      card.className = "tk-card";
      card.setAttribute("role", "toolbar");
      card.setAttribute("aria-label", t("title"));

      const flashNode = document.createElement("div");
      flashNode.className = "tk-flash";

      const keyButtons = [];
      let ctrlOn = false;
      let altOn = false;
      let flashTimer = null;
      let repeatDelay = null;
      let repeatInterval = null;
      let pollTimer = null;
      let unsubs = [];
      let dragCleanups = [];
      let pos = null;
      // Live event sources for the current terminal occurrence: its view.state
      // store and its tab-domain navigation store. Swapped by identity whenever
      // the active terminal changes; both torn down in destroy().
      let stateUnsub = null;
      let navUnsub = null;
      let watchedView = null;
      let watchedNav = null;

      const el = (tag, className, text) => {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
      };

      // ---- position: one user-dragged anchor for the panel ----
      const clampTo = (candidate, w, h) => ({
        x: Math.min(Math.max(candidate.x, 4), Math.max(4, window.innerWidth - w - 4)),
        y: Math.min(Math.max(candidate.y, 4), Math.max(4, window.innerHeight - h - 4))
      });
      const boxOf = () => ({ w: Math.max(card.offsetWidth, 44), h: Math.max(card.offsetHeight, 44) });
      const clampPos = (candidate) => {
        const box = boxOf();
        return clampTo(candidate, box.w, box.h);
      };
      const loadPos = () => {
        const box = boxOf();
        try {
          const saved = JSON.parse(window.localStorage.getItem(POS_KEY) ?? "null");
          if (saved && typeof saved.x === "number" && typeof saved.y === "number") {
            return clampTo({ x: saved.x * window.innerWidth, y: saved.y * window.innerHeight }, box.w, box.h);
          }
        } catch {}
        return clampTo({ x: window.innerWidth - box.w - 10, y: (window.innerHeight - box.h) / 2 }, box.w, box.h);
      };
      const savePos = () => {
        try {
          window.localStorage.setItem(
            POS_KEY,
            JSON.stringify({ x: pos.x / window.innerWidth, y: pos.y / window.innerHeight })
          );
        } catch {}
      };
      const applyPos = () => {
        card.style.left = `${pos.x}px`;
        card.style.top = `${pos.y}px`;
      };

      /** Pointer drag with a movement threshold; a press below it counts as a tap. */
      const makeDraggable = (target, getOrigin) => {
        const onPointerDown = (event) => {
          if (event.button !== undefined && event.button !== 0) return;
          // buttons inside a drag handle keep their own behavior
          if (event.target.closest("button") && event.target.closest("button") !== target) return;
          const start = { x: event.clientX, y: event.clientY };
          const origin = getOrigin();
          let moved = false;
          try {
            target.setPointerCapture(event.pointerId);
          } catch {}
          const onMove = (moveEvent) => {
            const dx = moveEvent.clientX - start.x;
            const dy = moveEvent.clientY - start.y;
            if (!moved && Math.sqrt(dx * dx + dy * dy) > DRAG_THRESHOLD) moved = true;
            if (moved) {
              pos = clampPos({ x: origin.x + dx, y: origin.y + dy });
              applyPos();
            }
          };
          const onUp = () => {
            target.removeEventListener("pointermove", onMove);
            target.removeEventListener("pointerup", onUp);
            target.removeEventListener("pointercancel", onUp);
            if (moved) savePos();
          };
          target.addEventListener("pointermove", onMove);
          target.addEventListener("pointerup", onUp);
          target.addEventListener("pointercancel", onUp);
          if (event.cancelable) event.preventDefault();
        };
        target.addEventListener("pointerdown", onPointerDown);
        return () => target.removeEventListener("pointerdown", onPointerDown);
      };

      const flash = (message) => {
        flashNode.textContent = message;
        if (flashTimer) clearTimeout(flashTimer);
        flashTimer = setTimeout(() => {
          flashNode.textContent = "";
        }, 1600);
      };

      const activeTerminalView = () => {
        const sessionId = ctx.sidebarRight.mounted.getSnapshot();
        if (!sessionId) return { hasTerminal: false, view: undefined, nav: undefined };
        const tab = ctx.sidebarRight.active();
        if (!tab || tab.kind !== "terminal") return { hasTerminal: false, view: undefined, nav: undefined };
        try {
          const occurrence = ctx.sidebarRight.tabDomain.occurrence(sessionId, { id: tab.id });
          const navigation = occurrence.navigation.getSnapshot();
          const params = navigation.params;
          const terminalId = params !== undefined && "terminalId" in params ? params.terminalId : undefined;
          const shellPath = params !== undefined && "shellPath" in params ? params.shellPath : undefined;
          const view = ctx.webTerminals.view(sessionId, tab.id, navigation.address, terminalId, shellPath);
          return { hasTerminal: true, view, nav: occurrence.navigation };
        } catch {
          return { hasTerminal: false, view: undefined, nav: undefined };
        }
      };

      // ---- live subscriptions to the active terminal's own stores ----
      // view.state also ticks on every screen frame, so its listener refreshes
      // only when `writable` flips; navigation fires once per real navigation.
      const watchView = (view) => {
        if (view === watchedView) return;
        if (stateUnsub) stateUnsub();
        stateUnsub = null;
        watchedView = view;
        if (view && view.state && view.state.subscribe) {
          let lastWritable = !!view.state.getSnapshot().writable;
          stateUnsub = view.state.subscribe(() => {
            const writable = !!view.state.getSnapshot().writable;
            if (writable !== lastWritable) {
              lastWritable = writable;
              update();
            }
          });
        }
      };
      const watchNavigation = (nav) => {
        if (nav === watchedNav) return;
        if (navUnsub) navUnsub();
        navUnsub = null;
        watchedNav = nav;
        if (nav && nav.subscribe) navUnsub = nav.subscribe(update);
      };

      const send = (sequence, after) => {
        const { view } = activeTerminalView();
        const state = view ? view.state.getSnapshot() : undefined;
        if (!view) {
          flash(t("noTerminal"));
          return;
        }
        if (!state || !state.writable) {
          flash(t("readOnly"));
          return;
        }
        view.write(sequence);
        if (after) after();
      };

      const stopRepeat = () => {
        if (repeatDelay) clearTimeout(repeatDelay);
        if (repeatInterval) clearInterval(repeatInterval);
        repeatDelay = null;
        repeatInterval = null;
      };

      // ---- sticky modifiers ----
      const setCtrl = (value) => {
        ctrlOn = value;
        const entry = keyButtons.find((item) => item.id === "ctrl");
        if (entry) {
          entry.button.classList.toggle("tk-on", ctrlOn);
          entry.button.setAttribute("aria-pressed", String(ctrlOn));
        }
      };
      const setAlt = (value) => {
        altOn = value;
        const entry = keyButtons.find((item) => item.id === "alt");
        if (entry) {
          entry.button.classList.toggle("tk-on", altOn);
          entry.button.setAttribute("aria-pressed", String(altOn));
        }
      };
      const releaseModifiers = () => {
        setCtrl(false);
        setAlt(false);
      };
      const arrowSequence = (id) => {
        if (ctrlOn && altOn) return SEQ_CTRL_ALT[id];
        if (ctrlOn) return SEQ_CTRL[id];
        if (altOn) return SEQ_ALT[id];
        return SEQ[id];
      };
      const letterSequence = (upper) => {
        if (ctrlOn && altOn) return `\x1b${ctrlCode(upper)}`;
        if (ctrlOn) return ctrlCode(upper);
        return `\x1b${upper.toLowerCase()}`;
      };
      const backspaceSequence = () => {
        if (ctrlOn && altOn) return "\x1b\x17";
        if (ctrlOn) return "\x17";
        return "\x1b\x7f";
      };

        /** Pressed-state feedback: the shared ghost Button's active recipe, driven
         *  by a class because preventDefault on pointerdown suppresses :active. */
      const bindPressFeedback = (button) => {
        button.addEventListener("pointerdown", () => button.classList.add("tk-press"));
        const release = () => button.classList.remove("tk-press");
        button.addEventListener("pointerup", release);
        button.addEventListener("pointerleave", release);
        button.addEventListener("pointercancel", release);
      };

      const bindKey = (row, id, label, text, onFire, repeatable) => {
        const button = el("button", "tk-key", text);
        button.type = "button";
        button.setAttribute("aria-label", label);
        // keep the terminal's focus: never take it on press
        button.addEventListener("pointerdown", (event) => event.preventDefault());
        button.addEventListener("contextmenu", (event) => event.preventDefault());
        bindPressFeedback(button);
        if (repeatable) {
          const step = () => send(onFire());
          button.addEventListener("pointerdown", (event) => {
            if (event.cancelable) event.preventDefault();
            stopRepeat();
            step();
            repeatDelay = setTimeout(() => {
              repeatInterval = setInterval(step, 120);
            }, 430);
          });
          const halt = () => stopRepeat();
          button.addEventListener("pointerup", halt);
          button.addEventListener("pointerleave", halt);
          button.addEventListener("pointercancel", halt);
        } else {
          button.addEventListener("click", () => send(onFire()));
        }
        row.appendChild(button);
        keyButtons.push({ id, button });
        return button;
      };

      const bindModifier = (row, id, label, text, toggle) => {
        const button = el("button", "tk-key", text);
        button.type = "button";
        button.setAttribute("aria-label", label);
        button.setAttribute("aria-pressed", "false");
        button.addEventListener("pointerdown", (event) => event.preventDefault());
        bindPressFeedback(button);
        button.addEventListener("click", () => toggle());
        row.appendChild(button);
        keyButtons.push({ id, button });
        return button;
      };

      const build = () => {
        const head = el("div", "tk-head");
        head.title = t("drag");
        head.appendChild(el("span", "tk-grip", "⠿"));
        head.appendChild(el("span", "tk-title", t("title")));
        card.appendChild(head);
        // the whole card is the drag surface; makeDraggable leaves buttons alone
        dragCleanups.push(makeDraggable(card, () => ({ x: card.offsetLeft, y: card.offsetTop })));

        // fixed 4×2 grid: Esc Tab Ctrl Alt / ← ↑ ↓ →
        const main = el("div", "tk-main");
        bindKey(main, "esc", t("esc"), "Esc", () => "\x1b", false);
        bindKey(main, "tab", t("tab"), "Tab", () => "\t", false);
        // mutually exclusive stickies: arming one releases the other
        bindModifier(main, "ctrl", t("ctrl"), "Ctrl", () => {
          setCtrl(!ctrlOn);
          if (ctrlOn) setAlt(false);
        });
        bindModifier(main, "alt", t("alt"), "Alt", () => {
          setAlt(!altOn);
          if (altOn) setCtrl(false);
        });
        bindKey(main, "left", t("left"), "←", () => arrowSequence("left"), true);
        bindKey(main, "up", t("up"), "↑", () => arrowSequence("up"), true);
        bindKey(main, "down", t("down"), "↓", () => arrowSequence("down"), true);
        bindKey(main, "right", t("right"), "→", () => arrowSequence("right"), true);
        card.appendChild(main);
        card.appendChild(flashNode);
      };

      /** Any terminal tab exists for the on-screen session; gates the fallback poll. */
      const anyTerminalTab = () => {
        try {
          const sessionId = ctx.sidebarRight.mounted.getSnapshot();
          if (!sessionId) return false;
          const tabs = ctx.sidebarRight.openTabs.getSnapshot();
          return tabs.some((entry) => entry.sessionId === sessionId && entry.kind === "terminal");
        } catch {
          return true; // fail open: run the full check instead of skipping
        }
      };

      const update = () => {
        const shown = card.style.display !== "none";
        // cheap gate first: a hidden panel in an impossible environment (not a
        // touch device, or no terminal tab at all) skips every store read
        if (!shown && (!touchOnly() || !anyTerminalTab())) return;
        const { hasTerminal, view, nav } = activeTerminalView();
        watchView(view);
        watchNavigation(nav);
        const state = view ? view.state.getSnapshot() : undefined;
        const writable = !!(state && state.writable);
        let expanded = false;
        try {
          expanded = ctx.sidebarRight.isExpanded();
        } catch {}
        // handheld + right sidebar expanded + a terminal tab in front
        const visible = touchOnly() && expanded && hasTerminal;
        if (!visible) {
          releaseModifiers();
          card.style.display = "none";
          return;
        }
        if (card.style.display === "none") {
          // re-entering the terminal context: re-clamp into a possibly rotated viewport
          pos = clampPos(pos);
          applyPos();
        }
        card.style.display = "flex";
        const usable = hasTerminal && writable;
        for (const { id, button } of keyButtons) {
          if (id === "ctrl" || id === "alt") continue;
          button.classList.toggle("tk-off", !usable);
        }
      };

      // ---- sticky modifiers × the user's own keyboard ----
      // Armed bare keys typed into the terminal surface are rewritten before the
      // terminal consumes them: physical keyboards arrive as keydown; many soft
      // keyboards only as beforeinput on the xterm textarea. Both are intercepted
      // in the capture phase; anything unexpected is left untouched (worst case:
      // the key types normally).
      const inTerminalTarget = (target) =>
        target instanceof Element && typeof target.closest === "function" && !!target.closest(".xterm");
      const canSendNow = () => {
        const { view } = activeTerminalView();
        const state = view ? view.state.getSnapshot() : undefined;
        return !!(view && state && state.writable);
      };
      const onKeyDownCapture = (event) => {
        if (!ctrlOn && !altOn) return;
        if (event.ctrlKey || event.metaKey || event.altKey) return;
        if (!inTerminalTarget(event.target)) return;
        const key = typeof event.key === "string" ? event.key : "";
        let sequence = null;
        if (/^[a-z]$/i.test(key)) sequence = letterSequence(key.toUpperCase());
        else if (key === "ArrowUp") sequence = arrowSequence("up");
        else if (key === "ArrowDown") sequence = arrowSequence("down");
        else if (key === "ArrowLeft") sequence = arrowSequence("left");
        else if (key === "ArrowRight") sequence = arrowSequence("right");
        else if (key === "Backspace") sequence = backspaceSequence();
        if (sequence === null || !canSendNow()) return;
        event.preventDefault();
        event.stopPropagation();
        send(sequence, releaseModifiers);
      };
      const onBeforeInputCapture = (event) => {
        if (!ctrlOn && !altOn) return;
        if (!inTerminalTarget(event.target)) return;
        if (event.inputType !== "insertText" || typeof event.data !== "string" || event.data.length !== 1) return;
        if (!/^[a-z]$/i.test(event.data)) return;
        if (!canSendNow()) return;
        event.preventDefault();
        send(letterSequence(event.data.toUpperCase()), releaseModifiers);
      };

      return {
        mount() {
          document.head.appendChild(styleTag);
          document.body.appendChild(card);
          build();
          pos = loadPos();
          applyPos();
          card.style.display = "none";
          if (ctx.sidebarRight.mounted && ctx.sidebarRight.mounted.subscribe) {
            unsubs.push(ctx.sidebarRight.mounted.subscribe(update));
          }
          if (ctx.sidebarRight.openTabs && ctx.sidebarRight.openTabs.subscribe) {
            unsubs.push(ctx.sidebarRight.openTabs.subscribe(update));
          }
          window.addEventListener("resize", onResize);
          document.addEventListener("keydown", onKeyDownCapture, true);
          document.addEventListener("beforeinput", onBeforeInputCapture, true);
          for (const query of ["(pointer: coarse)", "(hover: none)"]) {
            const mq = window.matchMedia(query);
            if (mq.addEventListener) mq.addEventListener("change", onPointerMode);
          }
          // fallback poll: the active tab and sidebar expansion have no public
        // events, so a slow tick re-checks them; update() gates itself off
        // entirely in impossible states
        pollTimer = setInterval(update, 1000);
          update();
        },
        destroy() {
          stopRepeat();
          if (flashTimer) clearTimeout(flashTimer);
          if (pollTimer) clearInterval(pollTimer);
          for (const unsubscribe of unsubs) unsubscribe();
          unsubs = [];
          if (stateUnsub) stateUnsub();
          if (navUnsub) navUnsub();
          stateUnsub = null;
          navUnsub = null;
          watchedView = null;
          watchedNav = null;
          for (const cleanup of dragCleanups) cleanup();
          dragCleanups = [];
          window.removeEventListener("resize", onResize);
          document.removeEventListener("keydown", onKeyDownCapture, true);
          document.removeEventListener("beforeinput", onBeforeInputCapture, true);
          for (const query of ["(pointer: coarse)", "(hover: none)"]) {
            const mq = window.matchMedia(query);
            if (mq.removeEventListener) mq.removeEventListener("change", onPointerMode);
          }
          card.remove();
          styleTag.remove();
        }
      };

      function onResize() {
        pos = clampPos(pos);
        applyPos();
        update();
      }
      function onPointerMode() {
        update();
      }
    }

    /**
     * Register the locale namespace, mount the widget and the shell.overlay seat.
     * @param ctx - Client plugin context with locale, slots, sidebarRight and
     *   webTerminals services (declared by this module's inject).
     */
    function applyTerminalKeys(ctx) {
      if (ctx.locale && ctx.locale.register) {
        ctx.effect(() => ctx.locale.register(NAMESPACE, { zh: ZH, en: EN }), "terminal-keys.locale");
      }
      ctx.effect(
        () => {
          if (!ctx.sidebarRight || !ctx.webTerminals) return () => {};
          const widget = createWidget(ctx);
          widget.mount();
          return () => widget.destroy();
        },
        "terminal-keys.widget"
      );
      ctx.effect(
        () =>
          ctx.slots.inject("shell.overlay", () =>
            ctx.slots.register(
              {
                name: "shell.overlay",
                id: "terminal-keys",
                order: 60,
                label: "Terminal keys"
              },
              TerminalKeysSeat
            )
          ),
        "terminal-keys.overlay"
      );
    }

    function apply(ctx) {
      var tag = document.createElement("style");
      tag.dataset.plugin = "dsh-web-mobile-fix";
      tag.textContent = CSS;
      document.head.append(tag);

      /* Terminal caret lift (≤700px): the right-panel terminal is the one
         surface the product does not keep clear of the soft keyboard. While
         xterm's hidden helper textarea holds focus, compare the caret (xterm
         pins that textarea to the cursor row, so its rect IS the caret
         position in layout coordinates) with the keyboard's top edge: not
         covered → nothing moves (fresh terminal, short output, after clear);
         covered → the shell is translated up by exactly the covered delta
         (capped at the keyboard height) and re-measured every 300ms as output
         scrolls. No resize ever happens: the pty never learns the keyboard
         exists, so buffer history is untouched. The already-applied lift is
         added back when measuring (idempotent re-measure, no oscillation),
         and once the lift reveals the caret there is nothing left for
         WebKit's caret-reveal pan to do. The composer is deliberately not
         lifted. Consumes CSS rule 9's frame transform via --mobilefix-kb. */
      var viewport = window.visualViewport;
      var kbTermActive = false;
      var kbTermTimer = 0;
      /* The lift currently applied by the terminal arm. */
      var kbTermLiftValue = 0;
      var termCaretLift = function () {
        try {
          var ta = document.querySelector("[data-sidebar-terminal] .xterm-helper-textarea");
          if (!ta) return 0;
          var r = ta.getBoundingClientRect();
          if (!r || r.width === 0 || r.x < 0) return 0;
          /* rect is measured under the CURRENT transform — restore the
             unlifted position before comparing against the keyboard top */
          var caretBottom = r.bottom + kbTermLiftValue;
          var keyboardTop = viewport.offsetTop + viewport.height;
          var need = Math.round(caretBottom + 6 - keyboardTop);
          if (need <= 0) return 0;
          var kbH = Math.round(window.innerHeight - viewport.height - viewport.offsetTop);
          return Math.min(need, kbH);
        } catch (e) {
          return 0;
        }
      };
      var onViewportChange = function () {
        var rootStyle = document.documentElement.style;
        if (!viewport || window.innerWidth > 700) {
          rootStyle.removeProperty("--mobilefix-kb");
          kbTermLiftValue = 0;
          if (kbTermTimer) { clearInterval(kbTermTimer); kbTermTimer = 0; }
          return;
        }
        var inset = Math.round(window.innerHeight - viewport.height - viewport.offsetTop);
        /* >100px filters pinch-zoom noise; the lift only applies inside a
           focused terminal session, so a system sheet never moves the shell. */
        if (inset > 100 && kbTermActive) {
          var lift = termCaretLift();
          if (lift > 8) {
            kbTermLiftValue = lift;
            rootStyle.setProperty("--mobilefix-kb", lift + "px");
          } else {
            kbTermLiftValue = 0;
            rootStyle.removeProperty("--mobilefix-kb");
          }
          return;
        }
        kbTermLiftValue = 0;
        rootStyle.removeProperty("--mobilefix-kb");
      };
      if (viewport) {
        viewport.addEventListener("resize", onViewportChange);
        viewport.addEventListener("scroll", onViewportChange);
      }

      /* Focus arms: the terminal lift above, and the Enter-key hint on the
         composer (0.1.2-rc.1 replaced the <textarea> with a Lexical
         contenteditable host that carries data-composer-input). */
      var onCaptureFocusIn = function (event) {
        var target = event.target;
        if (!target || typeof target.closest !== "function") return;
        if (window.innerWidth <= 700 && target.closest("[data-sidebar-terminal]")) {
          kbTermActive = true;
          onViewportChange();
          if (!kbTermTimer) kbTermTimer = setInterval(onViewportChange, 300);
        }
        if (target.closest("[data-composer-seat] [data-composer-input]")) markComposerKeyHint(target);
      };
      var onCaptureFocusOut = function (event) {
        var target = event.target;
        if (!target || typeof target.closest !== "function") return;
        if (!target.closest("[data-sidebar-terminal]")) return;
        kbTermActive = false;
        kbTermLiftValue = 0;
        if (kbTermTimer) { clearInterval(kbTermTimer); kbTermTimer = 0; }
        document.documentElement.style.removeProperty("--mobilefix-kb");
      };
      document.addEventListener("focusin", onCaptureFocusIn, true);
      document.addEventListener("focusout", onCaptureFocusOut, true);

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
           the next few frames: page scroll, and every scrollable ancestor
           of the composer pinned to its bottom, so the input box stays at
           the end of the conversation column instead of floating wherever
           the caret-reveal scroll left it. */
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

      /* The keyboard now drops after a send on its own: 0.2.2-rc.1's
         installDraftKeyboardDismissal moves focus off the mobile editor onto
         the composer card once a submitted draft empties (ui-conversation,
         primitives.focusWithoutRing), for every send path — send, queue and
         steer alike — so the label-specific blur this plugin used is gone. */

      /* Keyboard lift note: only the right-panel terminal arm is active (see
         the Terminal caret lift block above); the composer stays unlifted. */

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

      /* Sidebar rows stay HTML5 draggable (drag-to-reorder), and 0.2.2-rc.1
         adds no touch-side workaround for the iOS first-tap swallow. The
         plugin's old repair scoped the row through frame.firstElementChild,
         which in 0.2.2's drawer DOM is the mask rather than the sidebar
         column, so it was inert and is gone. Reinstate it with a
         [data-sidebar-drawer]-aware scope if the first tap misbehaves again. */

      /* Force everything back to its canonical post-newline state: page
         scroll to top and every scrollable ancestor of the composer (chat
         scrollport, composer scroll area) pinned to its bottom — the composer
         then sits planted at the end of the conversation column, never
         floating mid-column. */
      var repinAfterNewline = function (target) {
        restoreScroll();
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
          document.removeEventListener("focusin", onCaptureFocusIn, true);
          document.removeEventListener("focusout", onCaptureFocusOut, true);
          document.removeEventListener("keydown", onCaptureEnterKeyDown, true);
          document.removeEventListener("keydown", onCaptureImeBackspaceKeydown, true);
          document.removeEventListener("beforeinput", onCaptureImeReturn, true);
          document.removeEventListener("pointerdown", onTabTapPointerDown, true);
          document.removeEventListener("pointerup", onTabTapPointerUp, true);
          tabTapStart = null;
          if (viewport) {
            viewport.removeEventListener("resize", onViewportChange);
            viewport.removeEventListener("scroll", onViewportChange);
          }
          if (kbTermTimer) { clearInterval(kbTermTimer); kbTermTimer = 0; }
          kbTermLiftValue = 0;
          document.documentElement.style.removeProperty("--mobilefix-kb");
          window.removeEventListener("resize", ensureMobileViewport);
          if (viewportMetaOriginal !== null) {
            var meta = document.querySelector('meta[name="viewport"]');
            if (meta) meta.setAttribute("content", viewportMetaOriginal);
          }
        };
      });

      /* Terminal key panel (merged from the former dsh-terminal-keys plugin):
         mounted below as an inlined section of this same module. */
      applyTerminalKeys(ctx);
    }

    exports.apply = apply;
    exports.inject = ["slots", "locale", "sidebarRight", "webTerminals"];
    return module.exports;
  }
});
