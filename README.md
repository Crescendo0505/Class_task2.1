# Pearl — Personal Visual Archive

## Project Overview

一个使用原生 HTML、CSS、JavaScript 制作的个人作品集，包含一个正式主页与两个可填写的项目详情页。保留原稿个人介绍；未知项目资料继续使用明确的待填字段。网站可离线运行，没有构建步骤。

## Current Design Direction

Minimal Creative Portfolio，结合 Editorial Typography、克制的手绘细节与照片拼贴。暖白为主体，黑线与低饱和局部衬底辅助信息层级。字体为本地 Cormorant Garamond、Manrope、Caveat；中文使用系统 fallback，不以英文手写字体模拟中文。

About 使用双页 notebook、装订线与资料区；右上缘只有一只静态黑白灰像素猫。猫使用两张本地72×60栅格图分层显示，胸口在框后、前爪在框前。显示尺寸为桌面124×103.33px、平板96×80px、手机66×55px。

## Sections

| 模块 | 当前实现 |
| --- | --- |
| Home / Hero | 主照片、风景与生活局部形成拼贴；标题与图像有前后关系 |
| About | 保留两段原有介绍，notebook 与待填学习资料 |
| My World | Music、Tech、Travel、Life 四个兴趣入口式展示，无新增分类功能 |
| Projects | 两个大图交错的案例入口，含 ROLE / TYPE、YEAR、STACK 占位 |
| Archive | 六张网络例图构成个人视觉档案，始终显示图注；可点击放大 |
| Music | R&B 爱好与待填歌手、专辑、歌曲；没有假播放器，背景仍为暖白 |
| Contact | 保留原微博、GitHub 地址，邮箱待补充；没有新增联系资料 |

两个项目页预留背景、过程、成果与复盘。它们是待填模板，不代表已上线产品或真实成绩。

## Homepage

`index.html`是唯一正式主页：主图居中、标题跨图、介绍偏右，局部雾蓝衬底。Projects第一项图右、第二项图左；兴趣图片保留错位节奏。About notebook、静态黑白像素猫、Archive、音乐与页脚均保持既定布局。手机端保留对应图文关系与深色标题。

网站没有版本切换入口，也不依赖查询参数或跳转来显示主页。项目详情统一返回`index.html#projects`。

## Technology / Files

仅 HTML、CSS、JavaScript；无 React、Vue、Tailwind、jQuery、UI 库、动画库、外部字体请求或打包工具。

```text
index.html                   正式主页
project-01.html / project-02.html   两个待填项目页
style.css                    共享样式与motion tokens
script.js                    原生导航、菜单、图片查看器与reveal
assets/                      本地照片、字体/许可证、SVG、像素猫PNG
内容填写清单.md              图片规格与真实资料填写说明
素材来源.md                  网络例图来源、本地字体及装饰素材说明
UI美化说明.md                当前样式与维护位置
README.md                    运行与当前实现说明
```

## Responsive Behavior

桌面保留 editorial index 导航与交错图文。900px以下 About 改为单列 notebook，导航在700px以下折叠。701–760px仅补偿导航间距，维持12px主标签和原有折叠策略。手机 Projects 统一图片在上，Archive 为松散两栏。

主要辅助信息在手机上至少12px；Archive图注12.5px，正文按模块14px左右。桌面导航的中文副标11px，是英文主标签的冗余翻译。原生查看器图像使用contain，避免压缩变形。

## Accessibility

- 语义化 h1/h2/h3、描述性图片alt、跳到主要内容链接与可见2px focus。
- 菜单支持键盘、Esc、状态播报；关闭时菜单链接不进入Tab顺序。
- 原生dialog支持上一张/下一张、左右键、Esc和焦点返回；计数以aria-live播报。
- Viewer切图按钮44×44px，关闭按钮至少52×44px；项目入口、联系入口和详情底部链接至少44px高。
- 支持prefers-reduced-motion；内容立即可读，猫始终静态。
- 无JavaScript时仍可阅读内容、使用导航；图库回退为普通图片链接。

## Interactions

章节追踪保留当前导航下划线；图片与文字均可进入项目。两个项目详情均直接返回正式主页，无版本检测或查询参数。图库使用原生dialog，不依赖插件。

Motion tokens为160 / 220 / 360ms。链接箭头2px、图片轻移2px；无放大zoom、视差、无限浮动或页面转场。Reveal为16px淡入、无stagger；手机菜单只在开启时做160ms轻淡入，关闭即时。减少动态效果下关闭动画。

## Assets / Placeholder Notice

所有人物、风景、生活、项目和音乐照片都是网络占位例图，不代表Pearl本人、真实旅行、个人摄影或正式成果。页面、alt和查看器说明保留“网络例图／待替换／待填写”。不要只删说明而未换入真实内容。

主页正文保存在`index.html`；编辑项目名称与简介时，应与对应详情页保持一致。图片使用共享文件；同一例图也为两个项目复制为独立文件，便于分别替换，不能据重复hash直接合并。建议优先准备个人竖照、两个项目封面/过程/成果图，以及真实名称、职责、年份、工具和图注。详细位置见[内容填写清单](内容填写清单.md)。

像素猫与两枚黑白线稿是装饰，不承担个人照片或项目证据。当前猫只引用`pixel-cat-monochrome.png`和`pixel-cat-monochrome-paws.png`；素材目录中保留的参考/旧迭代文件不参与当前渲染。字体本地加载，分发时保留OFL许可证；照片来源见[素材来源](素材来源.md)。

## How to Run Locally

直接双击`index.html`即可离线查看；也可在VS Code终端进入**包含index.html的目录**（交付包中的`editorial-homepage/`），运行：

```sh
python -m http.server 8766 --bind 127.0.0.1 --directory .
```

保持该终端运行。如果该端口已有自己的预览服务，不要重复启动；可以继续使用现有服务。更换端口时，应同步修改浏览器地址。

## Current Local Preview Example

- 主页：http://127.0.0.1:8766/index.html
- 项目01：http://127.0.0.1:8766/project-01.html

Document Root就是包含index.html的目录，因此这些地址**不添加`/editorial-homepage/`前缀**。`#archive`等片段只定位章节，不改变服务目录。

## Maintenance / Validation

保持四个HTML、style.css、script.js和assets的相对位置。更新真实内容时，同时检查主页、两个项目页与返回路径、alt、图注与查看器data-caption。当前重点检查了320–1920px与本机Edge；其他浏览器和换入后的真实素材需再检查。

微博可能先显示访客或登录验证；保留原始账号链接，不把验证页当作照片或项目内容。不要虚构邮箱或替换成未经确认的社交地址。
