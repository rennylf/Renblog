---
title: Unsplash to Billfish | 构建本地图片素材库
date: 2023-12-20
category: MaloTalk
tags: []
---

**一、为什么搭建本地图片素材库**     

========================

做设计难免需要用到一些图像素材。以往，我总临时寻找图片，所以常遇到两个问题。

① 首先，寻找图片素材会中断我的设计流程，当找图片花费了过多精力，就没有多余的精力回到设计中。

② 其次，一些图片素材网站访问速度太慢（如 Unsplash，Pexel 等），让人抓狂。

因此，构建一个精心挑选过的本地图片素材库势在必行。

**二、理想的构建方案**  
---------------

为了解决上述问题，我们需要构建一个本地图片素材库。这个库应该具备以下特点：

1.方便浏览和分类：可以自由预览全部照片；照片可以自由分类，同时提供一些自动分类（如颜色维度）

2.Local first：数据完全保存在本地文件夹，使用开放的非专有文件格式，可以长期保存数据。

3.支持云端备份：数据能够保存在自动备份的文件夹中，而不至于产生冲突或不兼容。

4.快速获取图片：图片可以快速、批量地获取，简化收集流程，节省时间。   

**三、Splash to Billfish 方案**  
-----------------------------

为了实现这个目标，我们可以使用以下工具：

① Bulksplash：一个可以批量下载 Unsplash 图片的工具。

② Billfish：一个可以对图片进行管理和浏览的工具。

③ OneDrive：一个可以将数据备份到云端的工具，以防止数据丢失。

![](https://mmbiz.qpic.cn/mmbiz_png/2V40UerANibtXNOmWfgx6ibchxUiajJjVfGBibEhdvaeFDficGbpgkeKbH7ibd2dwcibXOd8QGEqUFKcGYytN5sqdxCDQ/640?wx_fmt=png)

### 1、使用 Bulksplash 批量下载 Unsplash 图片  

Unsplash 是一个高质量的无版权图片分享网站，而 Bulksplash 是一个可以批量下载 Unsplash 图片的工具。使用 Bulksplash 可以快速地下载大量的高质量图片，而不需要一个一个地下载。这样可以大大提高收集效率。

Bulksplash 的使用‍‍

①首先，安装 Node.js：https://nodejs.org/en/download/。   

② 安装完成后，使用以下命令来安装 Bulksplash：npm install bulksplash -g

③ 安装完成后，你可以使用以下命令来下载 Unsplash 图片：npx bulksplash

④ 这将会启动 Bulksplash 工具，并提示你输入 Unsplash API 密钥。你可以在 Unsplash 开发者网站上注册并获取 API 密钥：https://unsplash.com/developers。

⑤ 输入 API 密钥后，Bulksplash 将会提示你输入信息。‍‍‍‍‍

⑥ 输入完毕后，Bulksplash 将会开始下载图片。

![](https://mmbiz.qpic.cn/mmbiz_png/2V40UerANibtXNOmWfgx6ibchxUiajJjVfGmZPtd3mV1yvCoCIeeZw3Hz4QibVp18oYNKFkCRo7D9KoaFyH9RKo3icA/640?wx_fmt=png)   

一些参考的关键词（基于 ChatGPT3.5）

![](https://mmbiz.qpic.cn/mmbiz_png/2V40UerANibtXNOmWfgx6ibchxUiajJjVfG3Ew7y10JjJUxdw1a20picPWNUzb4os9BTL0foFcpxTq7RtiaAM13fOpQ/640?wx_fmt=png)2、使用 Billfish 对图片进行管理和浏览   

Billfish 是一个可以对图片进行管理和浏览的工具，收集完的图片可以统一放入 Billfish 中，然后使用 Billfish 对图片进行分类、搜索和浏览。它支持多种图片格式，包括 JPG、PNG、GIF 等。使用 Billfish 可以让我们更加方便地管理和使用图片。   

![](https://mmbiz.qpic.cn/mmbiz_png/2V40UerANibtXNOmWfgx6ibchxUiajJjVfGmmrRFrsL0Db1b5pUZ9gCeFZeZK7nzoCibKKPWCN2RmKd3gXUIZhPmibQ/640?wx_fmt=png)

### 3、使用 OneDrive 将数据备份到云端  

为了防止数据丢失，我们可以使用 OneDrive 将数据备份到云端。这样即使本地数据丢失，我们也可以轻松地恢复数据。同时，OneDrive 还支持多设备同步，这意味着我们可以在任何设备上访问我们的数据。   

![](https://mmbiz.qpic.cn/mmbiz_png/2V40UerANibtXNOmWfgx6ibchxUiajJjVfGNm46yafxpZRvdwYxXXFu3yUwwJRLEGibvZeIMicUehZ9dJ16WPROD4Ow/640?wx_fmt=png)

  

---

**四、总结**  
----------

本文介绍了如何构建本地图片素材库。我们可以使用 Bulksplash 批量下载 Unsplash 图片，然后使用 Billfish 工具对图片进行管理和浏览。此外，我们还可以使用 OneDrive 将数据备份到云端，以防止数据丢失。当然，素材的收集并不是一蹴而就的，更推荐每天收集一些，累积到一定数量后统一分类/筛选。   
 