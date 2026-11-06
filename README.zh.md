# dsh-web-mobile-fix

[English](README.md) | **简体中文**

[DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web UI 的移动端修复插件。

纯客户端覆盖层（CSS + 少量可逆的 document 监听），在窄屏（视口 ≤700px）下修复最影响使用的移动端问题，完全不改动产品源码。**v1.12.0** 起并入了原 [dsh-terminal-keys](https://github.com/gmugu/dsh-terminal-keys) 插件：Web 终端的触屏按键面板。当前基线：**v1.13.0**，针对 dsh **0.2.2-rc.1**。0.2.2-rc.1 已原生覆盖的修复（设置面板、目录选择器底栏、侧栏抽屉、行操作常显、触屏 tooltip、计划待审卡片、点外收起、发送后收键盘、侧栏行首点）已从本插件移除；composer 的软键盘抬升与「+」键盘守卫也已删除，键盘驱动的几何改动只剩**右栏终端光标跟随**。

## 功能清单

### CSS 修复（`@media (max-width: 700px)`）

1. **右栏触屏可用** — dockkit 标签条硬禁了全部触摸动作（桌面靠 JS 平移、拖拽排序），手机上溢出的标签条完全滑不动：重新放开横向平移（`touch-action: pan-x`）。全屏/模式切换按钮与分屏按钮隐藏——≤700px 下全屏是唯一有用的形态、分屏是桌面手势——「收起侧边栏」与「新建标签」保留
2. **限制页面缩放，输入聚焦不再自动放大** — iOS 会对聚焦时计算字号小于 16px 的输入框自动放大页面。不改任何字号：给 viewport meta 追加 `maximum-scale=1`，聚焦输入框的自动放大被抑制；用户双指捏合缩放不受影响（iOS 无障碍策略始终允许捏合）
3. **锁定页面级滚动** — 应用是 100% 高的全屏外壳，所有滚动都应发生在内部区域，但 iOS 仍允许页面本体上下橡皮筋滚动，且在系统面板/键盘弹出后可能卡在错位位置。锁定 `html/body`（`overflow: hidden` + `overscroll-behavior: none`）；内部滚动容器（会话、侧栏、设置页）不受影响，双指捏合缩放属视口手势也不受影响
4. **隐藏 open-in-app 打开按钮** — 所有把路径交给本地应用的入口：会话头部的「在 {app} 中打开工作目录」、文件页签头部的「通过资源管理器打开」、文件预览卡的「代码 / 更多打开方式」分体。它们都带 `data-open-target` 标记（目录入口是 `directory`，紧凑文件分体是 `file` + `data-open-path`），一条规则按 kind 全部隐藏；整个分体一起消失——主按钮打开默认应用、箭头是「更多打开方式」菜单。会话日志的「更多操作」菜单刻意保留——0.2.2-rc.1 起它还带「复制会话为 Markdown」，手机上同样有用

> 0.2.2-rc.1 重构了右栏 dockkit 的结构（`data-dockkit-strip*` / `-split-button` 已改为 `pane` / `column` / `split-control` 等），上面第 1 条在当前版本暂不命中，待后续适配；其余条目不受影响。

### JS 行为

1. **回车永远是换行，发送只走 ↑ 按钮** — 软键盘没有 Shift，回车键永远无法换行。≤700px 下每次回车按键被拦截，替换为合成的 `insertLineBreak`，经 Lexical 实时 beforeinput 管线插入（keydown 路线在 IME 组合态下不可靠）。键面经 `enterkeyhint="enter"` 显示为「换行」。把回车提交为 `"\n "` insertText 再补一个纠正 Backspace 的软键盘（微信输入法）同样重定向为换行，纠正 Backspace 在短窗口内被吞掉。按键长按重复被吞（每次物理按压一个换行）；中文组合态、Ctrl/Meta、命令菜单打开、只读态全部原样放行。每次换行后页面滚动归位、输入框的所有可滚动祖先回钉到底部
2. **右栏终端键盘跟随光标** — 右栏终端输入持有焦点期间，用光标（xterm 把隐藏辅助 textarea 钉在光标行，其 rect 即光标位置）与键盘顶缘做布局坐标比较：没挡住 → 界面完全不动（新终端、输出很短、刚 clear 过）；挡住了 → 外壳只上移被挡住的差值（封顶键盘高度），并以 300ms 间隔随输出滚动复测。不做 resize——pty 根本不知道键盘存在，历史零丢失；测量时把已施加的抬升加回（幂等重测、不振荡），抬升恰好揭示光标后 WebKit 的光标回显平移自然无事可做。对应 CSS 为第 9 条的外壳 `translateY(var(--mobilefix-kb))`；composer 不参与抬升。

### 终端按键（并入自 dsh-terminal-keys）

3. **Web 终端触屏按键面板** — 手持指针（粗指针 / 无 hover）且右栏终端标签在前台时，出现一个可拖动的 body 级按键卡片，补足手机键盘缺失的键：**Esc / Tab / Ctrl / Alt / ← ↑ ↓ →**，固定 4×2 网格，方向键长按连发。卡片 z-index 2000 挂在 body 层，右栏面板展开时也始终可点；终端标签、侧栏或触控能力消失的瞬间面板随之隐藏。位置是唯一的用户拖动锚点，存于 `localStorage`（`terminalKeys:position`，按比例保存——旋转屏幕后仍在界内）；「当前无激活终端 / 终端暂不可写入」以闪烁行提示，而不是静默失败
4. **Ctrl/Alt 粘滞键可与自带键盘组合** — Ctrl 与 Alt 互斥：点亮一个自动释放另一个；粘滞期间在终端表面敲下的裸键（实体键盘 keydown，或软键盘落在 xterm textarea 上的 beforeinput）都会在终端消费前改写成对应的控制/Meta 序列——字母变 Ctrl+字母 / Alt+字母，方向键变带修饰的 CSI 序列，Backspace 变 Ctrl+Backspace / Alt+Backspace。修饰键用一次即自释放，面板隐藏时自动解除

## 工作原理

插件带一个浏览器端（`exports["./client"]`，通过 `dsh.client.platform: "web"` 声明），由 client-modules 扫描器发现并随启动清单加载——一个模块一个文件：`lib/client.js` 同时容纳 CSS 覆盖层、全部 document 监听，以及内联的终端按键面板（自带 locale 表、PTY 按键序列、粘滞修饰键改写和 body 级部件，由 `apply()` 末尾调用的 `applyTerminalKeys(ctx)` 挂载）。

模块声明 `inject: ["slots", "locale", "sidebarRight", "webTerminals"]`——终端面板消费这些原生 Web 应用服务；移动修复本身一个都不需要。样式标签、全部监听与 viewport meta 统一在插件卸载清理中还原——完全可逆。

各行为挂在产品稳定契约上——原生 `data-*` 语义属性（`data-composer-card`、`data-composer-seat`、`data-composer-input`、`data-sidebar-terminal`、`data-dockkit-*`、`data-sidebar-right-*`、`data-open-target`、`data-open-path`）：

- `focusin` — 终端键盘抬升的布防（焦点落在右栏终端时立即测量，并启动 300ms 复测）；composer 上则设置 `enterkeyhint` 提示（回车键显示为「换行」）
- `focusout` — 终端失去焦点即撤防并清空 `--mobilefix-kb`
- `keydown` — 回车重定向为换行、IME 纠正 Backspace 吞除
- `beforeinput` — IME 回车重定向
- `pointerdown` / `pointerup` — dockkit 标签点按补发
- `visualViewport` resize/scroll — `--mobilefix-kb` 高度镜像（仅终端光标跟随）
- `window resize` — viewport meta 守卫（卸载时恢复原始 meta）

样式标签、全部监听与 viewport meta 统一在插件卸载清理中还原——完全可逆。

## 兼容性

- 需要 Harness Web profile（`dsh --profile web`）；面向 **0.2.2-rc.1** 适配（Lexical 编辑器自 0.1.2-rc.1 起）。设置面板、目录选择器底栏、侧栏抽屉、行操作常显、触屏 tooltip、计划待审卡片、后台任务弹层、点外收起、发送后收键盘与侧栏行首点这些修复已由 0.2.2-rc.1 原生提供，插件不再包含；composer 的软键盘抬升与「+」键盘守卫已删除，键盘抬升只保留**右栏终端光标跟随**（页面级滚动锁定仍保留）；右栏标签条与终端面板仍需本插件。并入的终端按键面板使用 **0.2.0-rc** 线起的 `sidebarRight` / `webTerminals` 客户端服务（Web 应用的基线包）
- 若此前安装过独立的 `dsh-terminal-keys` 插件，请移除或禁用——本插件已内置该面板，两者同时启用会重复出现
- 选择器针对产品稳定契约（data-* 语义、类名后缀、role），同版本线内稳定；产品大改版后可能需要小幅调整

## 安装

### 方式一：bundle 安装（推荐）

从 npm 安装：

```sh
dsh plugin --profile web add dsh-web-mobile-fix
```

或直接从 GitHub 仓库安装：

```sh
dsh plugin --profile web add github:gmugu/dsh-web-mobile-fix
```

重启 `dsh web`（或等 profile 热加载），浏览器硬刷新即可。

### 方式二：本地开发安装

让 profile 指向本地检出，代码即实时生效——改完 `lib/client.js` 刷新页面即可。注意：Windows 上直接按本地**路径**安装（`add D:\...`）目前是坏的——pnpm 会把 `link:` 规范里的绝对路径当相对路径解析，留下死链接。变通方案：把检出 junction 进 profile，再声明相对 link：

```sh
PROFILE="$DSH_HOME/profiles/web"                     # 按实际修改 DSH_HOME 和 profile 名
mkdir -p "$PROFILE/local"
# Windows（junction，无需管理员）：
#   mklink /J "%DSH_HOME%\profiles\web\local\dsh-web-mobile-fix" D:\path\to\dsh-web-mobile-fix
# POSIX：
#   ln -sfn /path/to/dsh-web-mobile-fix "$PROFILE/local/dsh-web-mobile-fix"
# 在 "$PROFILE/package.json" 的 dependencies 里加：
#   "dsh-web-mobile-fix": "link:./local/dsh-web-mobile-fix"
pnpm install --dir "$PROFILE"
# 然后启用 bundle：把 "dsh-web-mobile-fix" 加进 "$PROFILE/package.json" 的
# dsh.profile.bundles（或在应用内插件管理器里打开）
```

### 方式三：手动安装（无 pnpm / 离线）

```sh
PROFILE="$DSH_HOME/profiles/web"                 # 按实际修改 DSH_HOME 和 profile 名
mkdir -p "$PROFILE/plugins" "$PROFILE/node_modules/@dsh-profile"
cp -r dsh-web-mobile-fix "$PROFILE/plugins/mobile-fix"
ln -sfn ../../plugins/mobile-fix "$PROFILE/node_modules/@dsh-profile/mobile-fix"
# 在 $PROFILE/cordis.patch.yml 追加：
#   - insert:
#       - id: mobile-fix
#         name: '@dsh-profile/mobile-fix'
```

## 验证

用手机宽度窗口打开 Web UI——回车插入换行而不是发送（软键盘键面显示「换行」）；右栏终端聚焦后，光标不会被软键盘挡住（外壳按被挡差值上移）。DevTools 里注入的标签是 `style[data-plugin="dsh-web-mobile-fix"]`，头部注释标有运行版本。终端面板：在触屏（或模拟触屏）窗口于右栏打开终端标签——按键卡片 `.tk-card` 出现，方向键写入 pty，Ctrl/Alt 互斥点亮。

## 回滚

- bundle 安装：`dsh plugin --profile web remove dsh-web-mobile-fix`
- 手动安装：删掉 `cordis.patch.yml` 里的 `mobile-fix` insert 块（插件目录可留可删）

不修改任何产品源码，升级不覆盖、无残留。

## 许可证

MIT
