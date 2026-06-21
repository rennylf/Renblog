---
title: 发布一篇博客 | Hexo系列（一）
date: 2023-12-22
category: MaloTalk
tags: []
---

**一、为什么研究博客网站‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍**

笔者作为写作爱好者，一直有搭建个人博客网站的想法，但因为存在一定技术门槛，没有找到简单易操作的教程，以及出现问题难以找到解决方案等原因，我屡战屡败。

得益于大语言模型在解决编程问题方面出色的能力，构建博客网站的难度大大降低，甚至可以称得上是个愉快的旅程。然而，在建设过程中，我发现大部分已有的教程可能存在一些问题，比如缺少场景化的指导，部分操作已经过时等，对小白并不友好。

因此，本系列文章旨在总结个人在博客网站方面的尝试和经验，希望梳理出一个适合非专业人士的简单流程。需要指出的是，笔者使用的设备为Macbook air M2，本系列文章仅适用于 Mac OS。

**二、博客探索计划**

本系列的文章安排如下：

1、发布一篇博客：搭建博客网站配置环境；梳理博客发布流程。

2、个性化配置博客网站：搭建博客信息架构；梳理信息配置流程。

3、提升博客网站美观性：尝试第三方主题；梳理主题安装以及修改流程。

4、更多博客需求的落地：媒体文件的文件的插入问题以及其他需求。

**三、最简配置环境**

博客网站属于静态的网站（没有交互功能），主要用于发表文章，通常由多个Html，以及必要的其他格式文件组成。然而网页文件的编写语言对新手并不友好，就博客而言，Markdown是一个更加简单的选择。

因此，我希望存在一个系统，能够 1、自动生成网站所需的文件；2、自动把Markdown文件转换为网页文件；3、能发布到网上，可以在线浏览。想要实现上述需求，一个可行的配置环境如下：

Git：在搭建博客网站时，它相当于一个搬运工，一方面可以从 Github 下载所需要的工具，另一方面又可以把本地的网站代码推送到Github上（即部署），可以在安装器来安装：git-osx-installer download | SourceForge.net。    

Github：作为知名的在线管理代码的平台，它可以用于存放博客网站代码，以便于人们可以通过在线的方式浏览博客网站，你需要前往Github.com注册账号，这是免费的，而且远比申请服务器简单。

Node.js：它是一个运行JavaScript（JS）代码环境，博客网站建设需要用到JS代码，庆幸的是，建立网站并不需要手动编写JS代码，因为有一些工具可以代劳，比如Hexo。建议在官网Node.js (nodejs.org)\](https://nodejs.org/en)下载，并安装。

Hexo：它是基于Node.js编写的，专门用于生成博客网站的工具。它把一些常用的功能代码封装成简单命令。用户可以通过命令快速生成网站，以及把Markdown文件转换成网页。在安装好Node.js后，你可以在终端使用如下命令来安装。

    sudo npm install hexo-cli -g

Visual Studio Code：它是一个轻量级的代码编辑器，可以用来编辑Markdown文件，写作博客；也能用来打开网站代码文件，进行一些配置项修改。你可以在官网下载安装：Visual Studio Code - Code Editing. Redefined  

Terminal：此外，我们需要大量用到终端进行操作，当然这是Mac os自带的，无须下载。

**四、发布一篇博客的旅程**

**4.1 搭建网站**

首先，必须新建一个文件夹用于存放网站文件。在Hexo被安装后，打开终端，使用指令

    hexo init <文件夹>  

![](https://mmbiz.qpic.cn/mmbiz_png/2V40UerANibsqA55yXHeRDSFcrGWptZefSiczNYsFucqk5WWjOf6SMMG4ad09E3nnibTFouBQORsjTqfSEiaicW8T0w/640?wx_fmt=png)

接着需要在文件夹添加博客网站必须的文件，使用命令

    cd <文件夹>

进入文件夹，然后使用指令

    sudo npm install

网站文件将会自动添加到该文件夹。    

![](https://mmbiz.qpic.cn/mmbiz_png/2V40UerANibsqA55yXHeRDSFcrGWptZef6WO4XrxM9Oe9PVowUnHcnVLTw0ia7pH6Dia0icgnicMwT0faZFKhbTCvfQ/640?wx_fmt=png)

这时可以使用如下指令生成一个网站版本。‍‍‍‍‍‍‍‍

    hexo g

此外，使用如下指令可以通过本地服务器(https://localhost:4000)预览网站效果。   ‍‍

    hexo s

![](https://mmbiz.qpic.cn/mmbiz_png/2V40UerANibsqA55yXHeRDSFcrGWptZeflLuehERXeibgKriaSTTsfPcic8fzxLpZLujZOwicjv3daHXS0ictTbzxk9w/640?wx_fmt=png)

**4.2 创作博客**

创建好网站后，下面可以创建第一篇博客。使用指令

    hexo n “文件名”

hexo会在文件夹内容的source子文件中创建一个同名的Markdown文件。    

![](https://mmbiz.qpic.cn/mmbiz_png/2V40UerANibsqA55yXHeRDSFcrGWptZefuPNjSQy4a4foGibD8prSezP8icNCx9YicukETzSCsumAj57G6Xu0JbmCg/640?wx_fmt=png)

使用Visual Studio Code打开网站文件夹（网站文件夹在user文件夹中，可用spotlight搜索文找到它），在source子文件夹中找博客文件，编辑内容并保存。

![](https://mmbiz.qpic.cn/mmbiz_png/2V40UerANibsqA55yXHeRDSFcrGWptZefXymicdJkflJlDhTjUEGzSttuckqMIwiajElV4OduaRxIpIem5iaC1628w/640?wx_fmt=png)    

博客创作好了以后，回到终端窗口，使用指令来清理数据库

    hexo clean 

再使用指令生成新的网站版本。这样博客网站和第一篇博客已经就绪了。

    hexo g 

![](https://mmbiz.qpic.cn/mmbiz_png/2V40UerANibsqA55yXHeRDSFcrGWptZefWYYnzicgJGgzJPCPBrib8TX40Wbz22AibXKtjFN8rLZ7LwNxu8CPNzI2Q/640?wx_fmt=png)

**4.3 在线部署**

为了网站能够在线访问，需要在Github上新建一个仓库，名字必须是

    <你的昵称>.github.io

然后，复制这个仓库的地址。    

![](https://mmbiz.qpic.cn/mmbiz_png/2V40UerANibsqA55yXHeRDSFcrGWptZefrm4IYmMjb8BONq7Pqg1F1uw0Tlt0MfmnZhH7840TCBodyg0E177Pdg/640?wx_fmt=png)

接着，在设置（Settings > Develop setting > Presonal acess tokens > Tokens(classic) > Generate new token）中，创建一个自己的登陆令牌，注意打开全部的权限（下图多选框）。然后复制令牌号码。

![](https://mmbiz.qpic.cn/mmbiz_png/2V40UerANibsqA55yXHeRDSFcrGWptZefVkTfzy78oo52jBMYXTtg231l47HIhfrtAuibsjQGzBvhDDMK2vTlAQA/640?wx_fmt=png)

按照如下的方式组合你的仓库地址和令牌，便可得到一个免费的在线服务器（注意有个符号@）。    

  

    https://<taken>@github.com<username>/<username>.github.io.git

回到Visual Studio Code找到\_config.yml文件，找到最后的deploy部分，修改成如下内容，并保存。

![](https://mmbiz.qpic.cn/mmbiz_png/2V40UerANibsqA55yXHeRDSFcrGWptZef78DmniaZWa3V2dEwtHSGW7Bb2kgPoP25cllAjyXh9dyjdicuib6z6RV2w/640?wx_fmt=png)

在线部署还需要安装一个在线部署的插件，回到终端，使用指令

    sudo npm install --save hexo-deployer-git

安装完毕后，可以使用部署指令

    hexo d

当部署成功后，你可以进入网址<username>.github.io，你的博客网站将会迎来第一个访问。   

![](https://mmbiz.qpic.cn/mmbiz_png/2V40UerANibsqA55yXHeRDSFcrGWptZefQIWmWVzQJ8RzGgF3Zx5I8yuicwdLb41E1q5zy7C3a9F3Ns5n44ribULg/640?wx_fmt=png)

**五、可能存在的问题**

Git 无法访问网址：可能需要配置proxy；检查是否开启了token权限。    
 