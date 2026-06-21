---
title: 使用质性软件辅助梳理用户旅程：ATlas.ti实践案例
date: 2023-07-11
category: 设计驱动
tags: []
---

**\## 前言**

用户旅程是用户体验领域最常用的方法之一，它使用可视化的方式呈现用户为了完成某一个目标而经历的过程，包含了丰富的体验信息（如下图所示），能够帮助设计师、产品经理全面了解产品的用户体验，定位问题以及作出符合用户需求的优化。

![](https://mmbiz.qpic.cn/mmbiz_png/2V40UerANibsS3cSYYuol0XWj8yXPHmY0GbWJqECNN2x4BnjZ9ib1074uIMtV0KXZhO81u1qTmXibQ4sV9KM74OFw/640?wx_fmt=png)

（注：图片来自网络，在绘制B端用户旅程时，想法和情绪曲线会省略）

用户旅程的梳理通常基于定性资料，如用户访谈文本。然而定性资料庞大且缺乏结构，不利于总结和发现内部关联；尤其用户的回答可能在不同场景中来回跳跃，导致即便有假设的旅程逻辑顺序收集回来的文本通常也是杂乱无序的。因此，梳理用户旅程图通常非常耗时，且容易遗漏信息。

![](https://mmbiz.qpic.cn/mmbiz_png/2V40UerANibsS3cSYYuol0XWj8yXPHmY0O4D43gDfRwWVQx30xAgVnKLic9jw3ficdr9aUROUCqbsxfaR3dRibI5GA/640?wx_fmt=png)

定性分析工具是指一些辅助定性研究的软件，如Nvivo，MAXQDA，ATLas.ti，它们通常提供文本的编码、注释、内容分析、可视化建模能功能，基于这些功能，能够帮助研究人员更好的理解和分析定性研究数据，例如文本、图片、视频等。梳理用户旅程在用户体验研究中通常属于定性研究的范畴，文本旨在提供一个利用ATLas.ti进行用户旅程图梳理的案例，为运用QDA工具在梳理用户旅程中的应用提供参考。

![](https://mmbiz.qpic.cn/mmbiz_png/2V40UerANibsS3cSYYuol0XWj8yXPHmY0PQOCuzFGLybCjfKwqBXuPUhicdrX5QqtpcVLv3ahDldEftpicuFUBxFQ/640?wx_fmt=png)

ATlas.ti在定性分析软件中，功能的全面性和易用性都不算太好，选用它仅仅是因为在Mac系统上比较容易「安装使用」；此外，ATlas.ti在宣传语中提到了用户体验行业，因此比较有好感。此外需要声明本文不提供软件的安装、基础使用教学，仅提供在梳理用户旅程图时的应用应用Demo。

**\## 应用案例**

**\### 案例背景介绍**

本文案例为某个申请审批类业务流程的梳理，前期进行了两场深度访谈，获得8w+字的原始文本。项目初期目标是基于原文梳理出用户旅程，为业务开发线上化系统提供前期输入。

**\### 分析流程**

\#### step01 旅程预设

基于前期的专家指导和访谈提纲设计，已经列出可能的旅程阶段。在ATLas.ti中建立初始的编码：提单申请、审批、回顾等（见下图中①）。

\#### step02 初始编码

在软件中导入原文文档（见下图中②），快速浏览全文。将提供了关键信息的片段添加为引用，并且把引用拖动到对应的初始编码中，完成编码。如某段话提供在审批阶段的痛点，则可以划选该段话，右键添加引用，然后引用拖动到「审批」编码中。

![](https://mmbiz.qpic.cn/mmbiz_png/2V40UerANibsS3cSYYuol0XWj8yXPHmY0HvysRIR6ytN3qjFebWfQvG0Y3wETYGXtfvOLsH0xESWic8QrnHShjIg/640?wx_fmt=png)

\#### step03 汇总分析

打开「引用管理器」，软件会把标记好的文本段落汇总在一起，你可以就某个阶段的原文，进行分析和处理：

1\. 给引用的片段命名，建议使用「用户行为」命名。

2\. 对应用添加评论，建议的评论的内容可以为「细分场景」「用户需求」「用户痛点」

3\. 根据评论的内容，给引用添加其他编码。如：该片段提供了用户痛点的信息，并且在评论提炼痛点，则可以添加一个编码「用户痛点」

![](https://mmbiz.qpic.cn/mmbiz_png/2V40UerANibsS3cSYYuol0XWj8yXPHmY0sYbHxffr4T2UO7opwMAvyCbDeTBA0nWUzMKhnUBhpNAaKAacJL4lxw/640?wx_fmt=png)

\#### step04 旅程图绘制

在原文分析结束后，可以开始绘制旅程图绘制。使用「引用管理器」进行辅助，通过筛选功能，分别对内容进行筛选。例如在绘制用户痛点内容时，可以筛选出提供痛点信息的片段，根据阶段和行为编码，找到适合的地方安置文本。

![](https://mmbiz.qpic.cn/mmbiz_png/2V40UerANibsS3cSYYuol0XWj8yXPHmY08DyfQ7YEBgzhn40kGyT1FbG6BLDMPOzpElictjCSggrhu4A4FhMfBqg/640?wx_fmt=png)

**\## 小结**

使用QDA工具进行用户旅程梳理时，可能存在如下优势：

1\. QDA工具对片段进行标记、注释更加便利（相对用字体颜色、高亮等方式标记）

2\. QDA工具够快速的整合同类信息以及筛选出所需要信息（而不是花时间调整访谈原文结构和顺序），便于发现大量文本之间的联系，如快速找到某个阶段下关联的用户痛点。

3\. 如果编码彻底而完全，使用QDA进行分析以及辅助绘图时，能够避免对信息的遗漏。

然而，使用QDA工具也增加了编码成本，在定性资料不多的情况下似乎没有必要使用；此外，QDA工具也不利于文档之间的分享和团队协作，因此可能不适合需要频繁同步成果的项目。由于时间精力的限制，文本并没有提供详实的操作说明和讲解，仅作为一个初步沉淀和分享，可待后续完善。
 