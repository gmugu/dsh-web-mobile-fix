# dsh-web-mobile-fix

[English](README.md) | **简体中文**

[DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web UI 的移动端布局修复插件。

纯客户端覆盖层（CSS + 少量可逆的点击监听），在窄屏（视口 ≤700px）下修复最影响使用的移动端问题，完全不改动产品源码。

## 功能清单

### 原有功能（v1.0.2 及之前）

**CSS 修复**（`@media (max-width: 700px)`）：

1. **设置面板全屏化** — 改为全屏纵向布局，不再被挤成桌面布局；设置页插件导航按钮单行排满
2. **会话日志按钮收成图标** — 头部按钮压成 32px 圆形，文字仅对读屏保留
3. **输入框模型选择器瘦身** — 隐藏模型名/档位文字，只留下拉箭头（点击仍能打开选择器）
4. **弹层居中** — 输入区锚定的下拉菜单/弹层改为屏幕居中弹窗，不再贴边溢出
5. **顶栏面包屑隐藏** — 会话标题面包屑不再占顶栏
6. **目录选择器底栏固定** — 取消/确定等按钮钉在同一底部行，不再换位跳动
7. **侧边栏浮层化** — 栅格固定 56px 栏不挤压对话区，展开后的侧栏悬浮在内容上方；特意不用 `transform`，避免设置弹窗被困在抽屉里

**JS 行为**：

8. **点侧栏外自动收起** — 侧栏浮层展开时，点击侧栏以外任意区域即收起（≤768px，capture 阶段，先于产品处理器；设置弹窗渲染在侧栏 DOM 内，点它不收）

### 本次新增

9. **按钮 tooltip 不再误触弹出**（v1.0.3，v1.5.1 收窄范围）— 触屏没有 hover，点按钮会让它获得焦点，产品 Tooltip 原语立即弹出气泡且焦点不丢就不消失（如右上角「折叠侧边栏」tip）。≤700px 下隐藏**按钮触发**的 tooltip 气泡（`aria-label` 保留，读屏不受影响）；非按钮触发的 tooltip 保留——例如底部统计行点击弹出的完整「调用详情」
10. **侧栏内选会话后自动收起**（v1.1.0，v1.2.1 完善）— 仅 ≤700px 浮层模式：点会话行、搜索结果项或「新会话」按钮（含工作区行「+」）后，侧栏自动收起，省掉一次手动关闭。刻意排除：会话行「…」操作按钮（只弹菜单不开会话）、工作区分组折叠行（只折叠/展开分组）。**>700px 完全不生效**——PC 与平板行为零变化。v1.2.1 起，上述动作后的 2 秒内，产品自动聚焦到输入框的行为会被吞掉（iOS 上必然弹键盘），**切换会话不再自动弹出键盘**；你主动点输入框不受影响
11. **键盘不再挡输入框**（v1.2.0）— iOS 与 Android Chrome 弹软键盘时只缩「可视视口」、布局视口不变，贴底的输入框会整个留在键盘后面（点输入框时、以及带着键盘切会话时都会发生）。插件监听 `visualViewport` 的 resize/scroll，把键盘高度镜像进 `--mobilefix-kb`，≤700px 下把 app 外壳抬升相应高度，输入框始终悬在键盘上方、消息区同步变短；键盘收起、桌面窗口、外接键盘时变量清空，规则等同原样，>100px 的阈值过滤双指缩放噪声
12. **计划待审卡片适配手机**（v1.3.0）— 待审卡片是 flex 项，`min-width: auto` 的下限是计划文本里最宽的不可断行（长选择器/代码串），会把卡片顶出屏幕右缘、裁掉「确认执行」按钮。现在卡片收缩到视口内（≤100vw），计划里的 `pre`/`code` 强制折行，底部按钮行放不下时自动换行
13. **「+」变附件按钮**（v1.4.0，v1.4.1/v1.4.2 修复 Safari）— 手机上产品没有任何文件入口（桌面靠粘贴/拖拽），左下角「+」按钮只会弹命令菜单。≤700px 下「+」原地变成回形针附件按钮：点它弹系统文件选择器（相册/拍照、可多选，仅图片——与产品附件能力一致），选中文件经合成的 paste 事件走产品自己的粘贴管线（数量/大小校验、缩略图原样）。命令菜单不受影响，输入 `/` 照常呼出；busy 时按钮保持禁用。拾取 input 用 fixed 1px 隐身定位（v1.4.1）；打开面板前先让输入框失焦——键盘开着时 Safari 为保光标的视口平移，正是面板弹出后整页被顶死的根源（v1.4.2）——并在面板结束/取消时把 window/html/body 的滚动全部归零。>700px 零变化
14. **命令列表防滚动穿透**（v1.4.0）— 命令弹层的滚动容器没设 `overscroll-behavior`，触屏在列表上滑动到头（或落在弹层壳上）会链式滚到弹层身后的历史记录列表。现在弹层外壳与滚动容器都被 `overscroll-behavior: contain` 圈住
15. **回车轻点=发送、长按=换行**（v1.5.0）— 桌面 Enter=发送 / Shift+Enter=换行，但软键盘没有 Shift，手机上按回车只会把消息发出去、永远无法换行。≤700px 下改为：**轻点回车（<350ms）= 发送**，键盘键面也通过 `enterkeyhint="send"` 显示为「发送」；**长按回车（≥350ms）= 在光标处插入换行**（经 execCommand 编辑管线，草稿正常更新）。中文组合态回车=确认候选、`/` 命令菜单打开时回车=选候选、busy 只读态无动作、Ctrl/Cmd+Enter 插话均保持原行为；>700px 零变化

## 工作原理

插件带一个浏览器端（`exports["./client"]`，通过 `dsh.client.platform: "web"` 声明），由 client-modules 扫描器发现并随启动清单加载。它注入一个 `<style>` 标签，内容是针对产品稳定 `data-slot` / `role` / `aria-*` / `data-*` 语义属性的 `@media (max-width: 700px)` 覆盖；另注册 capture 阶段的 document 监听：`click` 负责点侧栏外收起、侧栏内选会话后收起、「+」按钮的附件拦截与输入框 Enter 的轻点/长按判定（收起通过 `layout` 服务的 `toggleSidebar()`），`focusin` 负责吞掉切会话后落在输入框上的自动聚焦；并监听 `keydown`/`keyup` 实现轻点发送与长按换行，并把 `enterkeyhint` 设为 send；同时监听 `visualViewport` 的 resize/scroll，把软键盘高度镜像进 `--mobilefix-kb` 变量供规则 9 抬升外壳。样式标签与全部监听统一在插件卸载清理中移除——完全可逆。

## 兼容性

- 需要 Harness Web profile（`dsh --profile web`），0.1.x 系列均可
- 选择器针对产品槽位契约，同版本线内稳定；产品大改版后可能需要小幅调整

## 安装

### 方式一：bundle 安装（推荐）

从 npm 安装：

```sh
dsh plugin --profile web add dsh-web-mobile-fix
```

（不走 npm / 本地开发时，可用仓库地址：

```sh
dsh plugin --profile web add github:gmugu/dsh-web-mobile-fix
```

）

重启 `dsh web`（或等 profile 热加载），浏览器硬刷新即可。

### 方式二：手动安装（无 pnpm / 离线）

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

用手机宽度窗口打开 Web UI——设置面板、侧边栏、弹层应已适配移动端。

## 回滚

- bundle 安装：`dsh plugin --profile web remove dsh-web-mobile-fix`
- 手动安装：删掉 `cordis.patch.yml` 里的 `mobile-fix` insert 块（插件目录可留可删）

不修改任何产品源码，升级不覆盖、无残留。

## 许可证

MIT
