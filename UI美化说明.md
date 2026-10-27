# 当前样式与维护说明

本文描述当前实现，不记录阶段流水账。完整运行方式、模块和内容说明见[README](README.md)，真实资料与图片规格见[内容填写清单](内容填写清单.md)。

| 范围 | 对应位置 | 维护原则 |
| --- | --- | --- |
| 字体与颜色 | `:root`、本地`@font-face` | 保留editorial/body/hand三种分工与暖白主色，不改成在线字体 |
| 导航 | `.site-header`、`.nav-link` | 目录式英文主标签、中文副标与细下划线；700px以下折叠 |
| Hero | `.hero-*`、`.variant-blue .hero-*` | 保留已确认的叠放；更换图片后只检查裁切与标题可读性 |
| About | `.about-layout`、`.about-visual`、`.personal-notes` | notebook、装订线与资料区，不使用大色块或反排设计 |
| Pixel Cat | `.pixel-cat`及两层伪元素 | 黑白灰栅格、静态，124/96/66px宽度锁定；不改配色、位置、尺寸或遮挡 |
| My World | `.world-grid`、`.world-item` | 四组兴趣图片，少量差异裁切；hover只轻移 |
| Projects | `.project-row`、`.project-copy`、`.project-facts` | 两项交错；职责/类型、年份、工具分清；所有未知字段保持待填 |
| Archive | `.archive-grid`、`.archive-item` | 一主三中两小，局部聚集与留白；没有圆形城市图或统一卡片边框 |
| Music / Contact | `.music-*`、`.contact-*` | 暖白背景；音乐信息待填，真实外链保留，没有播放器和深色页脚 |
| 详情与看图 | `.detail-*`、`.image-dialog`、`.dialog-*` | 详情正文结构保持；查看器44px按钮、描述性alt、键盘与焦点返回 |
| Motion | 五个motion/easing tokens、reduced-motion规则 | 160/220/360ms，2px链接/图片反馈；无zoom与无限动画 |

## 编辑真实内容

先换个人照片，再填写两个项目和相册。照片可保持原文件名替换；主页正文写在`index.html`，项目名称与简介需要和详情页对应。相册同时修改`href`、`src`、`alt`、`figcaption`和`data-caption`，保持页面与放大说明一致。

原有人物、生活和项目图片全是网络占位，不代表本人、真实经历或正式成果。不得仅删掉占位标识后将例图作为个人内容。

## CSS维护边界

优先在原selector和对应breakpoint修改；共用规则与变体差异不等于重复。伪元素分层、手机菜单状态、reveal状态及reduced-motion仍在使用，不应静态purge。

`[hidden]`与reduced-motion中的三处!important有明确作用，应保留。可用本地HTML直接检查；无需构建、第三方UI或动画库。
