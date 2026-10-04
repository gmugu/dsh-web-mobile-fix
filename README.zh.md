# dsh-web-mobile-fix

[English](README.md) | **简体中文**

[DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web UI 的移动端布局修复插件。

纯客户端覆盖层（CSS + 少量可逆的 document 监听），在窄屏（视口 ≤700px）下修复最影响使用的移动端问题，完全不改动产品源码。当前基线：**v1.11.0**，针对 dsh **0.2.0-rc.2**（0.1.5+ 钩子组）。

## 功能清单

### CSS 修复（`@media (max-width: 700px)`）

1. **设置面板全屏化** — 改为全屏纵向布局，不再被挤成桌面布局；设置页插件导航按钮单行排满
2. **目录选择器底栏固定** — 第一行：「新建文件夹」（自动撑满）+「显示隐藏」；随后一个零高度换行；第二行：「取消」「打开」对半分。底栏始终是一个稳定的底部区块，按钮不再换位跳动
3. **侧边栏浮层化** — 栅格在两种状态下都固定 56px 栏，对话中列永不移动、不被挤压；展开后的侧栏溢出自身栅格列、悬浮在内容上方。特意不用 `transform`：侧栏列一旦 transform，就会成为其 `position: fixed` 后代的包含块——设置弹窗渲染在侧栏 DOM 内，会被困在抽屉里
4. **抽屉加宽、行操作按钮常显** — 展开抽屉宽度提升到 `min(82vw, 360px)`（产品写死内联 280px，在手机上约占屏宽七成）；会话行的「…」「+」操作按钮桌面端 hover 才出现（触屏永远不可达），现在保持常显并与行文字留出间距
5. **按钮 tooltip 不再误触弹出** — 触屏没有 hover，点按钮会让它获得焦点，产品 Tooltip 原语立即弹出气泡且焦点不丢就不消失（如右上角「折叠侧边栏」tip）。只隐藏**按钮触发**的 tooltip 气泡（`aria-label` 保留，读屏不受影响）；非按钮触发的 tooltip 保留——例如底部统计行点击弹出的完整「调用详情」
6. **计划待审卡片适配手机** — 待审卡片是 flex 项，`min-width: auto` 的下限是计划文本里最宽的不可断行（长选择器/代码串），会把卡片顶出屏幕右缘、裁掉「确认执行」按钮。卡片收缩到视口内（≤100vw），计划里的 `pre`/`code` 强制折行，底部按钮行放不下时自动换行
7. **右栏触屏可用** — dockkit 标签条硬禁了全部触摸动作（桌面靠 JS 平移、拖拽排序），手机上溢出的标签条完全滑不动：重新放开横向平移（`touch-action: pan-x`）。全屏/模式切换按钮与分屏按钮隐藏——≤700px 下全屏是唯一有用的形态、分屏是桌面手势——「收起侧边栏」与「新建标签」保留
8. **限制页面缩放，输入聚焦不再自动放大** — iOS 会对聚焦时计算字号小于 16px 的输入框自动放大页面。不改任何字号：给 viewport meta 追加 `maximum-scale=1`，聚焦输入框的自动放大被抑制；用户双指捏合缩放不受影响（iOS 无障碍策略始终允许捏合）
9. **锁定页面级滚动** — 应用是 100% 高的全屏外壳，所有滚动都应发生在内部区域，但 iOS 仍允许页面本体上下橡皮筋滚动，且在系统面板/键盘弹出后可能卡在错位位置。锁定 `html/body`（`overflow: hidden` + `overscroll-behavior: none`）；内部滚动容器（会话、侧栏、设置页）不受影响，双指捏合缩放属视口手势也不受影响
10. **隐藏头部桌面捷径按钮** — 「在 {app} 中打开工作目录」分体按钮（把工作目录交给本地编辑器/终端，是桌面对接动作）和会话日志的「更多操作」菜单在手机上只会挤占头部空间；≤700px 下隐藏这两个 utilities 槽入口。本地打开工作目录与导出会话日志仍是桌面端工作流

12. **终端键盘跟随光标（网页输入框逻辑）** — 右栏终端输入持有焦点期间，用光标（xterm 把隐藏辅助 textarea 钉在光标行，其 rect 即光标位置）与键盘顶缘做布局坐标比较：没挡住 → 界面完全不动（新终端、输出很短、刚 clear 过）；挡住了 → 外壳只上移被挡住的差值（封顶键盘高度），并以 300ms 间隔随输出滚动复测。无自立 CSS 规则（复用规则 9 的 transform）、零 resize——pty 根本不知道键盘存在，历史零丢失。测量时把已施加的抬升加回（幂等重测、不振荡），且抬升恰好揭示光标后 WebKit 的光标回显平移自然无事可做。
11. **后台任务弹层收进手机屏宽** — 会话头部的「N 个后台任务」菜单以触发按钮的**左缘**为锚点（`left: 0`、宽 336px），而手机上这个按钮正是头部最右侧的动作（旁边的 utilities 入口已被修复 10 隐藏），于是弹层从约 230px 处开始、向右溢出屏幕约 165px：真机截图里每行的状态、耗时和大部分命令文本全被切掉，也无法平移查看。现在把弹层重新锚定到视口本身——`position: fixed`、左右各留 8px、宽度撑满剩余空间。`top: auto` 是刻意为之：不写 top/bottom 时弹层保持**静态位置**，也就是紧贴自身触发按钮下方的那条流内位置，因此不需要写死任何头部尺寸，弹层在任何头部形态下都照旧从按钮下方落下。只接管横向几何；按钮下方那 5px 间距用 margin 补回

### JS 行为

12. **点侧栏外自动收起**（≤768px，capture 阶段）— 侧栏浮层展开时，点击侧栏以外任意区域即收起，先于产品处理器与一切 `stopPropagation`；设置弹窗渲染在侧栏 DOM 内，点它不收。点会话行、搜索结果项、「新会话」按钮或「插件」等全局面板入口后侧栏随即收起，且其后 2 秒内产品的输入框自动聚焦会被吞掉（iOS 上必然弹键盘）——**切换会话不再自动弹出键盘**；你主动点输入框不受影响。行内「…」按钮与分组折叠行刻意排除
13. **键盘不再挡输入框** — iOS 与 Android Chrome 弹软键盘时只缩「可视视口」、布局视口不变，贴底的输入框会整个留在键盘后面。插件监听 `visualViewport` 的 resize/scroll，把键盘高度镜像进 `--mobilefix-kb`，app 外壳按该值整体上移，输入框始终悬在键盘上方、消息区同步变短。抬升只允许发生在键盘会话期间——输入框持有焦点时；系统面板（文件选择器）压缩视口时高度按 0 处理，不会顶着悬空键盘抬页面；且仅当真实会话视图在场时生效（`data-phase="active"`）——空白会话 Hero 页的输入框本来就在屏幕上部、键盘盖不住，外壳保持不动。>100px 阈值过滤双指缩放噪声，小幅锁存过滤光标回显抖动；键盘收起、面板结束、窗口宽于 700px 时变量清空
14. **回车永远是换行，发送只走 ↑ 按钮** — 软键盘没有 Shift，回车键永远无法换行。≤700px 下每次回车按键被拦截，替换为合成的 `insertLineBreak`，经 Lexical 实时 beforeinput 管线插入（keydown 路线在 IME 组合态下不可靠）。键面经 `enterkeyhint="enter"` 显示为「换行」。把回车提交为 `"\n "` insertText 再补一个纠正 Backspace 的软键盘（微信输入法）同样重定向为换行，纠正 Backspace 在短窗口内被吞掉。按键长按重复被吞（每次物理按压一个换行）；中文组合态、Ctrl/Meta、命令菜单打开、只读态全部原样放行。每次换行后页面滚动归位、输入框的所有可滚动祖先回钉到底部，输入框始终稳稳贴在键盘上方，不会漂在光标回显滚动留下的位置
15. **点发送后自动收起软键盘** — 产品的每个输入框按钮都在 `mousedown` 上保焦（防默认 + 回焦），点 ↑ 发送后焦点从不离开输入框，软键盘一直开着。点发送按钮（aria-label 发送消息/Send message；运行中的方形「停止生成」按钮标签不同、永不匹配，停止后键盘保留可继续输入）不拦截事件、提交照常，并在 capture 手势内**同步** blur 输入框收起键盘——blur 必须落在用户手势上下文内，推迟的话 iOS 会无视；另以 0/120/300ms 补刀与输入框聚焦抑制窗兜底。键盘落下后 window/html/body 滚动归零，`--mobilefix-kb` 随之自动回落。>700px 零变化
16. **「+」打开命令菜单，不再弹键盘** — 切换命令菜单时产品会主动聚焦草稿（按钮 `onClick` 与 `mousedown` 上都会聚焦编辑器），每次点「+」都会弹出软键盘。插件在该次点击上结束键盘会话，并把短抑制窗（与发送流程同一机制）内落下的每一次重聚焦立即 blur——菜单照常打开、键盘保持收起。主动点输入框仍正常弹键盘
17. **侧栏行第一次点按即生效** — 工作区/会话行是 HTML5 draggable（拖拽排序，桌面手势）；iOS 会把落在可拖拽元素上的触摸引入拖拽判定，吞掉（或加倍）合成 click，第一次点按毫无反应。触摸 `pointerdown` 时、拖拽判定开始前，先把该行的 `draggable` 标志摘掉：点按即恢复为普通点击。React 重渲染会恢复该属性，下一次 pointerdown 再摘。行内按钮从来不受影响

## 工作原理

插件带一个浏览器端（`exports["./client"]`，通过 `dsh.client.platform: "web"` 声明），由 client-modules 扫描器发现并随启动清单加载。它注入一个 `<style>` 标签（`@media (max-width: 700px)` 覆盖），并注册 capture 阶段的 document 监听，全部挂在产品稳定契约上——原生 `data-*` 语义属性（`data-shell-overlay`、`data-composer-card`、`data-composer-seat`、`data-composer-input`、`data-plan-review-key`、`data-plan-review-scroll`、`data-dockkit-*`、`data-sidebar-*`）、CSS-module 类名后缀（`rowActions`、`logoRow`、`root`、`footerBar`）以及 role/aria 钩子：

- `click` — 点侧栏外收起、侧栏内选会话后收起（经 `layout` 服务的 `toggleSidebar()`，通过可选 ctx 查找获取）；「+」键盘守卫；发送按钮收键盘钩子
- `focusin` / `focusout` — 键盘会话（仅输入框持有焦点时允许抬升）；`enterkeyhint` 提示；输入框聚焦抑制窗（会话动作后 2s、发送与「+」后 600ms）
- `keydown` — 回车重定向为换行、IME 纠正 Backspace 吞除
- `beforeinput` — IME 回车重定向
- `pointerdown` / `pointerup` — dockkit 标签点按补发；侧栏行 draggable 摘除的首点修复
- `change` / `cancel` — 系统文件面板结束键盘会话
- `visualViewport` resize/scroll — `--mobilefix-kb` 高度镜像
- `window resize` — viewport meta 守卫（卸载时恢复原始 meta）

样式标签、全部监听与 viewport meta 统一在插件卸载清理中还原——完全可逆。

## 兼容性

- 需要 Harness Web profile（`dsh --profile web`）；在 **0.1.6-alpha.2** 上测试，针对 0.1.5+ 的钩子组（Lexical 编辑器自 0.1.2-rc.1 起）
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

用手机宽度窗口打开 Web UI——设置面板、侧边栏、弹层应已适配移动端。DevTools 里注入的标签是 `style[data-plugin="dsh-web-mobile-fix"]`，头部注释标有运行版本。

## 回滚

- bundle 安装：`dsh plugin --profile web remove dsh-web-mobile-fix`
- 手动安装：删掉 `cordis.patch.yml` 里的 `mobile-fix` insert 块（插件目录可留可删）

不修改任何产品源码，升级不覆盖、无残留。

## 许可证

MIT
