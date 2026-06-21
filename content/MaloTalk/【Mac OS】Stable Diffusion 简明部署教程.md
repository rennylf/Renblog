---
title: 【Mac OS】Stable Diffusion 简明部署教程
date: 2023-10-16
category: MaloTalk
tags: []
---

**一、前言**

由于最近在优化作品集，在制作高保真原型的过程中，有大量的图片想要重选，比如虚拟人像、产品封面、营销Banner等。然而，传统的互联网找图方式，难以快速找到符合需求且无版权风险的图片。因此，对AIGC中，文字生成图片产生了兴趣，想要找一款好用免费的文生图工具体验下，于是发现了Stable Diffusion。

**二、什么是Stable Diffusion？**

Stable Diffusion（SD）是2022年发布的深度学习文本到图像生成模型，它主要用于根据文本的描述产生详细图像。相比其他的文生图AI模型，如Midjourney，SD具有开源免费、安全性高、图片内容可控性强以及插件扩展性强等优点。

![](https://mmbiz.qpic.cn/mmbiz_png/2V40UerANibt9oeiaiaTrua8UGY3EKTTzUu3ShsZJswZa8mRicPs1F1FtHnkM10cAj6AsqD5aqkSjqhe2WgSYE2ibWA/640?wx_fmt=png)

然而，SD上手的门槛较高，主要原因在于SD是开源项目，官方只提供了模型，没有代码基础的设计师难以运行，但是可以通过部署SD WebUI的方式来获得一个基于网页的交互界面，大幅降低使用难度。但总体而言，使用门槛还是比较高的。

此外，SD对电脑性能配置要求很高，性能较差的电脑，出图的时间较慢，体验就会很不好。以我的2022年的Macbook Air M2 8g版本为例，出一张简单的图片需要15分钟左右，几乎不具备生产力。因此，其实不建议在Macbook Air的用户本地部署。可以在一些在线的工具，例如Poe中体验。

但如果你和我一样喜欢折腾，那么下文将尝试尽量简单地描述部署过程，仅供参考。

**三、如何部署stable diffusion？**

正如前文所说，我们所需要的东西包括SD模型和SD WebUI，除此之外，其实我们还需要一些程序或组件（称“依赖”），因为模型和WebUI的正常运行还需要依赖它们。整体来说：部署也就是分别下载和配置这三部分内容。1、模型需要我们去网上手动下载；2、WebUI和依赖包含了很多零碎的内容，因此，需要Homebrew（自动化下载工具）和git （代码“搬运工”）来帮忙。具体操作步骤可参考如下。

**第一步：准备SD模型**

简单来说，SD模型具有基础模型、微调模型和美化模型三类。从设计师的养成之路来做类比：起初，设计师通过大量学习已有的设计案例，掌握设计技能，能够独立产出设计作品。后来，他找到了自己的风格，就能产出独树一帜的作品。最后，他的技术变得炉火纯青，作品的细节趋近完美。对应的，「基础模型」便是大量素材累积的结果，使AI掌握了绘画的技能，因而是必备的；「微调模型」是更有针对性训练后的结果，能够使得AI产出具有指定风格的图片；「美化模型」则是不断打磨的结果，能够使得图片的色彩、光影等元素更加完善。关于模型更多知识，有待后续的学习与了解。

你可以从如下渠道查找和下载不同类型的模型。基础模型都是GB级别的，在下载的过程中，可以进行如下的步骤。

Hugging Face：https://huggingface.co/

Civitai：https://civitai.com/

**第二步：通过Homebrew安装必要依赖**

首先安装Homebrew。它只能在「终端」中输入代码来安装。它的官网提供了代码，但在实际使用过程中，可能会遇到网络问题（即使在有“加速”的情况下），因此，建议参考Up主「Nenly同学」提供的代码：

    /bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"

![](https://mmbiz.qpic.cn/mmbiz_png/2V40UerANibt9oeiaiaTrua8UGY3EKTTzUu8nSc1ESfMgNw1OufCpZundKxbicJY1YtRnGmfdZTLSrb4rdKgfEpqmg/640?wx_fmt=png)

在终端窗口中输入代码后，便可以根据提示执行，在执行过程会让你选择镜像源，可默认选择第一个选项即可。

当Homebrew安装完成以后，便可以通过它来自动安装一些依赖了，包括Python，Git等等工具，而你只需要在终端窗口输入代码便可以自动下载安装：

    brew install cmake protobuf rust python@3.10 git wget

当代码执行完成，我们就可以进入下一步，部署SD WebUI了。

**第三步：部署SD WebUI。**

部署SD WebUI简单来说，也就是把它的代码从网络上复制到本地。首先你需要在本地新建一个文件夹，例如Stable diffusion（注意，任何文件夹和文件均不推荐使用中文）。然后你有两种选择：1、手动下载；2、使用Git clone。

手动下载：即登入主页(https://github.com/AUTOMATIC1111/stable-diffusion-webui)，点击「code」按钮，下载Zip包，然后本地解压到你新建的文件夹里。注意解压后的文件夹要改名为「stable diffusion webui」。这样做的好处是可以避免Git网络连接不佳。

Git clone：在访达进入新建的文件夹，右击窗口下方的路径，在弹出的选项中，点「在终端打开」。在终端的窗口中输入代码便可以自动下载SD WebUI。这样做的好处是自动下载，但是网络连接可能失败。

    git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui”

**![](https://mmbiz.qpic.cn/mmbiz_png/2V40UerANibt9oeiaiaTrua8UGY3EKTTzUus5phXbuz982NiaYMIxNUQmrQ7xibg99Bd76nfCuv7GyXxrU4VwXiaR1iag/640?wx_fmt=png)**

**第四步 初始化SD WebUI**

首先，你的模型应该下载好了，请将它们放到「stable diffusion webui」文件夹中子文件夹「model >stable diffusion」中。

然后，回到「stable diffusion webui」文件夹，以Git clone相同操作在此处打开终端，在终端窗口中输入“./webUI.sh” 这是SD WebUI的启动命令，在第一次启动时，它自动调用git clone会联网下载必要的依赖（GB级别的体积）。但在这步很容易因为网络原因而卡死，或者速度极慢，可以参考「四、遇到的问题」。在完成初始化以后，浏览器将会被打开，进入SDWebUI界面，此时就可以在本地体验SD绘图了。注意以后每次运行SD都需要上述在文件夹中进入终端输启动命令的操作。对于SD WebUI具体的使用教程有待后续探索和学习。

**四、遇到的问题**

在Up主「Nenly同学」的视频中，提到了大量可能遇到的问题，但是我所遇到的问题只有在SD WebUI初始化过程中网络不畅的问题，即便是在全局“加速”的情况下。在观察到初始化过程的安装方式全部是是Git clone时，我意识到问题在Git clone没有使用加速通道。因而在网上寻找解决办法。尝试了用户「onsummer」提供的代码解决了问题。参见https://gist.github.com/laispace/666dd7b27e9116faece6

**五、局限**

由于对AIGC的学习还不够深入，因此本人理解可能存在错误。

**六、参考资料**

1、Stable diffusion维基百科2023.10, https://zh.wikipedia.org/zh-cn/Stable\_Diffusion

2、言川Artile，超详细！外婆都能看懂的Stable Diffusion入门教程，2023.04, https://www.uisdc.com/stable-diffusion-3

3、Nenly同学, Mac系统有救了！入门AI绘画，Stable Diffusion详细本地部署教程https://www.bilibili.com/video/BV1Us4y1X75d/?share\_source=copy\_web&vd\_source=6b9f19bdce4a7d6af6fe6cd87b96e565
 