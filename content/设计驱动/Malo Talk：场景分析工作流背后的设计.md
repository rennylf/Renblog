---
title: Malo Talk：场景分析工作流背后的设计
date: 2026-02-09
category: 设计驱动
tags: []
---

![](https://mmbiz.qpic.cn/sz_mmbiz_png/2nmqEIXKCRIQymwUadYwYQMFX8pRfIIaN6zfWLwUXJZJhfk9tdYAy592qEo9dfSsibow0icaJOlusviaDVtMtP9aswuMVvjNUkGt2dwYTdE8yw/640?wx_fmt=png&from=appmsg)

00 为什么做
=======

随着「场景」这一概念在产品设计与工程开发中的流行，场景分析逐渐成为一种通行的方法。然而，在汽车行业中，场景分析并未形成一套被广泛认可的标准流程。在实际工作中我们发现，传统制造业的决策逻辑往往高度重视风险、倾向于前置规避不确定性，因此“是否全了”是对场景分析最常见的挑战\[1\]。为此，工程师被要求不断枚举场景，试图穷尽所有可能。结果是，分析成本不断攀升，却难以形成高效共识； 另一方面，大量精力消耗在枚举层面，反而挤压了对结构、优先级与决策价值的讨论空间，最终影响产品设计与开发推进。

因此，本工作流试图解决的并不是“场景想得够不够多”，而是一个更现实的问题： 在风险厌恶的组织语境下，工程师如何以更低的认知成本，建立一套可讨论、可修正、可用于决策的场景分析结构。并且，我们开始思考如何让 AI 参与进来。

01 需求分析
=======

从实践经验来看，场景分析并不是一次性生成问题，而是一个从抽象到具体、再回到决策的递进过程。基于这一判断，本工作流被拆解为三个连续的能力模块：

① 搭建结构框架
--------

无论是在分析开始之前，还是已经积累了大量零散的场景案例，结构框架都是不可或缺的认知工具。它不仅用于梳理已有信息，更重要的是用于发现遗漏与盲区。以往框架的建立主要有两种路径：一种是先收集资料，再自下而上归纳结构；另一种专家基于经验提出框架假设，并在后续过程中不断修正。显然，后一种方式在效率上更具优势。而在当前阶段，这一“快速提出结构假设”的工作，可以尝试交由 AI 完成。

② 补全局部细分场景
----------

结构框架处于抽象层级，尚不足以直接指导产品设计与工程开发。实际工作中，来自管理层或跨团队的挑战，往往集中在更具体的使用细节，尤其是那些看似低频却可能带来严重后果的极端场景。长期以来，这类细分场景主要依赖经验与直觉进行补充，难免存在遗漏。而借助 AI 的发散与组合能力，可以在既有结构约束下，对局部场景进行更系统的补全，从而显著提升覆盖广度与思考完整度。

③ 识别潜在风险
--------

在涉及硬件投入与系统复杂性的汽车领域，一次错误决策往往意味着高昂的试错成本。因此，相较于“是否有创意”，各方更为关心的是潜在风险是否被充分识别。在结构与细分场景明确的前提下，AI 同样可以协助识别不同场景下可能存在的风险类型，帮助工程与产品团队在更早阶段进行评估与权衡。

02 流程设计
=======

在最初的 1.0 版本中，我设计了一个高度自动化的流程： 用户只需输入功能或技术名称，后续分析将完全由 malolo 在预设指令下自主完成，并输出完整结果。然而，在实际使用中我很快发现，这种模式质量无法把控，时好时坏。与此同时，对于一些我较为熟悉的功能或技术，本身已经具备初步的框架假设，完全交由 AI 推理反而会增加不必要的偏差。

基于上述反思，我对流程进行了 2.0 版本的迭代。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/2nmqEIXKCRJqPlhpkJhn1QC53HIt5sdicX2VOVhsHSWhuJsDOXpNP4GgJmnbwLVAD4yTH8GjvauB5Wnm1B0y9vDx3pt9dSjvbt0eu6JdPFJg/640?wx_fmt=png&from=appmsg)

在 2.0 版本中，流程开始阶段引入了一个关键分支：

用户需要先判断是否已有场景结构的初步思路。

*   若已有假设，则由用户输入；
    
*   若没有，则由大模型进行推理。
    

与 1.0 不同的是，2.0 要求大模型同时给出 3 个可选框架方案，并明确呈现其差异。用户需要在此基础上进行选择、取舍或补充意见。后续的局部补全与风险识别，均建立在这一“人机协同确认后的结构”之上。

![](https://mmbiz.qpic.cn/mmbiz_png/2nmqEIXKCRIvT6wXnhUghRyiaosXwLibcS4DHAtQ7Jl9DQ4bficPqQk1vfdTAC3micDdZJzMibNb7VhPqWP4ZIZVdR39UnxsmMST5YrYzgJnHScc/640?wx_fmt=png&from=appmsg)

在这里，AI 的角色被明确限定为： 框架假设的扩展者，而非最终答案的裁决者。而人的角色，则是对结构进行判断、收敛与修正。

03 流程开发
=======

本工作流基于 Coze 平台搭建，并集成在智能体 malolo 中。为降低使用门槛，原计划部署至小程序端，但由于资质限制，最终选择集成在一个已有的小程序中，并通过公众号菜单栏提供入口。

目前该端口在移动设备上无法完整渲染 Markdown 格式，整体体验仍有不足，因此更推荐在网页端使用与分享。

04 DEMO
=======

本 DEMO 以网页端形式展示。用户可通过 malolo 输入框上方的快捷指令「场景分析」启动工作流。

![](https://mmbiz.qpic.cn/mmbiz_png/2nmqEIXKCRKTd5HINwrYtiaybibN2gWYfMTzI4XYpLicsjgiaD3roLsjVWCIKViaPWpeDsL1fHYiaSGJhyrWbtdLd5wc7BmVDOFsEOv2Lic5vCeQvo/640?wx_fmt=png&from=appmsg)

按照指引输入功能/技术名称，并选择是否已有场景框架假设。

![](https://mmbiz.qpic.cn/mmbiz_png/2nmqEIXKCRIgVJOHAY8sle0DqgVsXKW4kibfCGpYNubDjqnCbYAWEM0IskJfsO4fVkPMgXOf6AnAQN0mDuL9kt5TsOjMVpTUiakIULhicpIDQY/640?wx_fmt=png&from=appmsg)

在无假设的情况下，malolo 将首先分析该功能或技术的基本特征。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/2nmqEIXKCRL2hicbiclRrhfcaEvkE4sA3WRERAGNSbLRmzd0In9FkxjlicEhuh8tCEoTibzb1ACJ7awbSJUA8sTTZanPjQIqZv4en9EaMlS5tys/640?wx_fmt=png&from=appmsg)

随后给出三个不同的框架假设方案，并邀请用户进行决策与补充。

![](https://mmbiz.qpic.cn/mmbiz_png/2nmqEIXKCRJhic0xXnBbYPChPicwm9XF5w1NiaC581XFJXYDh1PgJfL1O0ibyDNzcykIQKDMwiaHnAW5Ieec6geFGHnGvia7yV8InMfiaMkwlflRWo/640?wx_fmt=png&from=appmsg)

在整合用户选择与意见后，流程进入局部场景补全与风险识别阶段，逐步形成场景库。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/2nmqEIXKCRKuXDBTONibY1euGyic5TrxibdWr8Qm4vP8lLpr1ukJnYBcDsuQk2rsDs8bZaITVW7IZVknHGQeFE2ibE4Loia5CmrfALGSJdEIl8pY/640?wx_fmt=png&from=appmsg)

最终，malolo 会基于全过程输出一份结构化的场景分析报告。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/2nmqEIXKCRLZAXfBgf27gPI0Wp2wEjZPZEeicFMic0O12sQp3lnc8nxpf66pPrfI5ia0vHVXtIcm0GgTgAUcAfmj9y5LaAHI0JFa4UQchGKZ4A/640?wx_fmt=png&from=appmsg)

05 优化路线
=======

作为「AI 任工」升级后的首个工作流，当前版本仍处于探索阶段。后续优化将围绕三个层级展开：

1.  可用性层：通过持续调整提示词，提升框架、场景库、风险清单与最终报告的整体质量，使输出结果接近可直接使用的水平；
    
2.  落地性层：引入行业案例与知识库，增强分析结果与真实业务情境之间的连接；
    
3.  体验层：持续优化交互细节与呈现方式，降低理解与使用成本。
    

更多阅读

[聊聊智能汽车的用户场景](https://mp.weixin.qq.com/s?__biz=MzIwNzQyNTEzOQ==&mid=2247484683&idx=1&sn=d070eec93ea966487f9b86dab5fd4995&scene=21#wechat_redirect)
 