---
title: 使用主题美化博客网站 | Hexo系列（三）
date: 2024-01-16
category: MaloTalk
tags: []
---

前言
--

在前文中，我们探索了使用Markdown来写博文内容，通过Hexo生成博客网站，并且对网站的信息结构进行构思和配置。下文将深入讨论Hexo的主题，以达到美化博客网站的目的。

网站主题与模版引擎
---------

网站主题，通常包括了网站的信息布局和视觉风格，它决定了网站最终呈现的外观以及给人的整体感觉。这对网站的用户体验和吸引力有直接影响。在前文梳理的信息架构中可知，博客网站基本有首页、内容页和列表页，后两者通常是主题一致而内容变化。为了方便快捷生成同主题下的网页，Hexo 采用了模版引擎，简单来说，它可以自动按照主题，并结合已有的内容，在本地生成全部的网页，然后就可以发布上线到服务器。

当点开Hexo 的主题时（通常是一个文件夹），我会发现这里存在很多Ejs 、Css 后缀的文件，以及静态资源（如图片）和配置文件。它们相互配合以自动化生成网站，换句话说，也就是把我们的内容转换成本地网站（特定主题），并最终上线。

*   Ejs：定义了网站结构、样式和布局，可以结合内容生成网页。
    
*   Css：定义网站外观，如字体、颜色、边距、背景等。
    
*   静态资源：提供网站所需的素材，如图像等。
    
*   Config.yml：配置文件指定主题的选项和设置。
    
*   JavaScript：实现网站的额外的交互和功能（少见）。
    

![](https://mmbiz.qpic.cn/mmbiz_png/2V40UerANibuDyFmttdo00I6CTBpNF6b7s37y74IE4icYhHiaHQnuyXVnta7e9iaic3mPzz8GdOJNQqRQUmibEVxct5g/640?wx_fmt=png&from=appmsg)

Hexo主题配置流程
----------

### 01 下载与安装

Hexo 官网Themes | Hexo提供了众多的主题可以选择。

![](https://mmbiz.qpic.cn/mmbiz_png/2V40UerANibuDyFmttdo00I6CTBpNF6b7h1l5HgCSmYSHewL0ic8ttoxnPgqcKibyLMvh4VAlkib2fqRCicZvyk35ug/640?wx_fmt=png&from=appmsg)

这些主题的源文件大多放在 Github 上，有两种办法在本地安装这些主题。

*   手动从 github 下载主题源文件，并放入网站文件夹根目录下的themes文件夹中。
    
*   复制主题的 Github 地址，打开终端，使用 `cd <网站文件夹>`，然后使用命令`git clone <link> themes/<name>`自动下载。
    

**注意**阅读主题的说明，某些主题需要安装相关依赖（可以理解为插件），只有安装好才可以使用（一般会提供安装的自动安装代码）。

![](https://mmbiz.qpic.cn/mmbiz_png/2V40UerANibuDyFmttdo00I6CTBpNF6b7B44KgZAayAD8R2iauz1lBJOg9571ibLzqrDKH1eERf74DqcI0dXqBPag/640?wx_fmt=png&from=appmsg)

### 02 切换主题

在网站根目录的总配置文件中，修改 Theme 属性值为主题名称，就可以轻松完成主题的替换。

![](https://mmbiz.qpic.cn/mmbiz_png/2V40UerANibuDyFmttdo00I6CTBpNF6b77nLM89uPTnWJax6urJyfNDetQgXuLN94YxDuOIIe1wsdUyCS5TbS4g/640?wx_fmt=png&from=appmsg)

### 03 配置主题

在主题文件夹中，同样存在 yaml配置文件，可以自定义相关的信息。你可以通过不断地调整属性和值，来测试对最终网页的影响。从而在原有主题的基础上，学会做一些小幅度的修改，使其更加符合需求。

![](https://mmbiz.qpic.cn/mmbiz_png/2V40UerANibuDyFmttdo00I6CTBpNF6b7uAbwkGIZzlI5biaVCSBxqmERYCDUkvAyBmyjljkrfX71Z5xhoXZ9FzQ/640?wx_fmt=png&from=appmsg)

### 04 生成新版本并发布

完成以上步骤后，参考第一篇文章，使用命令`hexo g`来生成本地版本，并使用`hexo d`来部署到服务器，以上线替换主题后的博客网站。

![](https://mmbiz.qpic.cn/mmbiz_png/2V40UerANibuDyFmttdo00I6CTBpNF6b7sfknqheMibuwYwThTMxiaEOFlj7OcuLF4kNbTbzyYAxTt1SUgdyhGKhQ/640?wx_fmt=png&from=appmsg)

总结思考
----

本文是 Hexo 系列的第三篇文章，主要描述了Hexo 的主题如何更换，其流程很简单，我的探索重心放在了了解网站模版引擎之上。在探索的过程中，我意识到概念具体化的重要意义。我找到大部分资料，对于某个概念的解释都停留在抽象的层面，比如解释某物的功能，意义，价值。而缺少说明在现实世界或者数字世界中的具体存在形式是什么，例如Hexo 主题，实际上就是 ejs，css 等文件的集合，每文件都有其作用，这些知识更具有实操性，也更容易理解。然而，由于我并不是计算机专业的技术人员，对技术概念得了理解可能存在偏差，仅供参考。
 