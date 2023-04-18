# 莘野起始页

**[start.zhaojiakun.com](https://start.zhaojiakun.com)**

欢迎使用莘野起始页，这是一个非常简约的起始页;

### 配置引入

为了不依赖浏览器本地存储（不重新导入的情况下无法在其他地方使用自定义配置），使用 jsDelivr 加载存放在 GitHub 仓库内的配置，路径为`.start-page/config.json`，默认配置为[本仓库书写的配置](./.start-page/config.json)。

自定义配置则可自建仓库，参照默认配置进行书写，在域名后跟随仓库地址即可引入自定义配置。（配置文件的路径不可更改，默认情况下最终拼接为 `https://start.zhaojiakun.com/user/repo` 即可，但因为 CDN 缓存，修改后可能无法及时得到反馈，这时可以[按 jsDelivr 给出的方式](https://www.jsdelivr.com/documentation#id-github)拼接版本信息，即：`https://start.zhaojiakun.com/user/repo@version`）。

### 壁纸

在配置文件中修改 `wallpaper` 字段

-   相对路径：`wallpaper.jpg`
-   网络路径：`https://example.com/wallpaper.jpg`

相对路径的情况下，壁纸文件应放在 `.start-page` 目录下

### 书签

最多显示 8 个书签，超出会被隐藏。

### 搜索引擎

配置内的第一项会被设置为默认的搜索引擎。

### 搜索引擎切换

alias 前缀 + 空格 + 搜索内容

-   _gh hello -> 使用 GitHub 搜索 hello_
-   _bd hello -> 使用 百度 搜索 hello_
