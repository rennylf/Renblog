const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

const SRC = "/Users/renlingfeng/Downloads/微信公众号导出";
const DEST = "/Users/renlingfeng/Library/CloudStorage/OneDrive-个人/Cherry Studio/Renblog/content";
const IMG_DIR = "/Users/renlingfeng/Library/CloudStorage/OneDrive-个人/Cherry Studio/Renblog/static/images";

// Files to skip (indices, placeholders, already-processed)
const SKIP = [
  "2025_文章索引___Index_of_Articles_2025.md",
  "2024年度阅读回顾.md",
  "Coming_Soon____.md",
  "Hello_worldddddd.md",
  "有个新朋友上线啦_.md",
  "hello-world.md",
  "故事的终结.md",
  "about.md",
];

// Category keywords - title based
const CAT_KEYWORDS = {
  "设计驱动": [
    "设计", "产品", "用户", "研究", "汽车", "智能", "HMI", "场景", "竞品",
    "B端", "C端", "可用性", "需求", "功能", "营销", "分析", "方法", "评价",
    "体验", "座椅", "氛围灯", "语音", "香氛", "屏幕", "安全", "数据", "原型",
    "服务", "策略", "流程", "模板", "模型", "案例", "创新", "测试", "规划",
    "调研", "框架", "定位", "传播", "零重力", "概念", "车企", "研发", "产品用研",
    "用户研究", "用户反馈", "用户访谈", "用户价值", "用户思维", "用户场景",
    "感性工学", "适配度", "整车功能", "需求优先级", "BWS", "WTP", "MVP",
    "产品定位", "产品思考", "Redesign", "Rethinking", "SICC", "叙事",
    "双钻设计模型", "功能性", "观影模式", "评价研究",
  ],
  "我辈孤雏": [
    "散记", "游记", "回忆", "情感", "人生", "生活", "日记", "故事", "梦",
    "读后感", "读_", "观后感", "书", "小说", "墓", "葬礼", "雨", "夜",
    "清晨", "岛", "海", "风", "月", "光", "影", "树", "猫", "狗",
    "室友", "朋友", "访友", "归家", "离别", "爱情", "写信", "陪伴", "治愈",
    "成长", "青春", "年华", "岁月", "纪念", "失眠", "理发", "手帐", "旅途",
    "旅行", "车站", "茶馆", "零食", "人间", "关系", "亲密", "小姐", "仁兄",
    "温暖", "拥抱", "一具昆虫", "十二夜", "蓝鲸", "孤岛", "透明", "白驹",
    "散文", "随笔", "小记", "杂记", "散笔", "书信", "二十四", "五里牌",
    "一年了", "第三圈", "翌年", "新年", "我辈孤雏", "写作之于我", "谈文风",
    "人间清欢", "好雨知时节", "所有的温暖", "天空", "光影", "海浪", "风与月",
    "树影在后背", "滴落下", "远去的寒冷", "雨季流经", "昨夜独盏", "夕洛光芒",
    "异城假想", "十一月的清晨", "我骑着小电驴", "小狗猎豹", "亲爱的G",
    "我和他的故事", "他说", "我像爱慕", "我惟愿你", "喝", "西湖",
    "南沙", "汕尾", "潮汕", "成都", "厦门", "皖行", "旅",
    "文本主义", "一具昆虫", "宿舍",
  ],
  "MaloTalk": [
    "AI", "工具", "效率", "笔记", "Zotero", "文献", "知识", "工作流",
    "Stable Diffusion", "SD", "部署", "教程", "语音转文本", "语音识别",
    "Hexo", "博客", "网站", "搭建", "配置", "主题", "文本大数据",
    "质性", "ATLAS", "Scrivener", "Unsplash", "Billfish", "素材",
    "日记系统", "习惯", "戒糖", "有效加速", "Lifenotes", "Mac",
    "Python", "编程", "数据采集", "主题建模", "Notion", "Obsidian",
    "数字工具", "信息管理", "知微见著", "看见声音",
  ],
};

function categorize(title, content) {
  const text = title + " " + content.slice(0, 500);
  const scores = {};

  for (const [cat, keywords] of Object.entries(CAT_KEYWORDS)) {
    scores[cat] = 0;
    for (const kw of keywords) {
      if (text.includes(kw)) scores[cat] += 1;
    }
  }

  // Special handling: "文本主义" with Taylor Swift → MaloTalk (cultural analysis)
  if (title.includes("文本主义") && (title.includes("Taylor") || title.includes("歌词"))) {
    scores["MaloTalk"] += 3;
  }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  if (sorted[0][1] === 0) return "我辈孤雏"; // default for uncategorized
  return sorted[0][0];
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith("https") ? https : http;
    const req = proto.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      const file = fs.createWriteStream(filepath);
      res.pipe(file);
      file.on("finish", () => { file.close(); resolve(); });
      file.on("error", reject);
    });
    req.on("error", reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error("timeout")); });
  });
}

function slugify(text) {
  return text
    .replace(/[^\w\u4e00-\u9fff-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function main() {
  const files = fs.readdirSync(SRC).filter((f) => f.endsWith(".md") && !SKIP.includes(f));

  console.log(`Found ${files.length} files to process\n`);

  // Clean files (keep original remote image URLs)
  const results = [];
  for (const file of files) {
    const raw = fs.readFileSync(path.join(SRC, file), "utf8");
    const lines = raw.split("\n");

    // Extract title from line 3 (after CSS blob on line 1)
    let title = lines[2] ? lines[2].trim() : path.basename(file, ".md");
    if (!title || title === "(unknown)") {
      title = path.basename(file, ".md");
    }

    // Extract date from byline
    let date = "";
    const dateMatch = raw.match(/原创.*?(\d{4}-\d{2}-\d{2})/);
    if (dateMatch) date = dateMatch[1];

    // Find where content starts (after 原文地址 line)
    let contentStart = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim().startsWith("> 原文地址:")) {
        contentStart = i + 1;
        while (contentStart < lines.length && lines[contentStart].trim() === "") {
          contentStart++;
        }
        break;
      }
    }

    let content = lines.slice(contentStart).join("\n").trim();

    // Remove WeChat footer card (author image + SVG icons)
    content = content.replace(/\n\s*!\[\]\([^)]+\)\s*任顾远\s*$/gm, "");
    content = content.replace(/!\[\]\(data:image\/svg\+xml[^)]*\)[^\n]*/g, "");

    // Clean up trailing empty lines
    content = content.replace(/\n{3,}$/, "\n");

    // Categorize
    const category = categorize(title, content);

    // Write cleaned file
    const frontMatter = `---
title: ${title}
date: ${date}
category: ${category}
---

`;
    const destFile = path.join(DEST, file);
    fs.writeFileSync(destFile, frontMatter + content);

    results.push({ file, title, date, category });
    console.log(`  [${category}] ${title} (${date})`);
  }

  console.log(`\nProcessed ${results.length} files`);

  // Summary
  console.log("\n=== Category Summary ===");
  for (const cat of ["设计驱动", "我辈孤雏", "MaloTalk"]) {
    const count = results.filter((r) => r.category === cat).length;
    console.log(`  ${cat}: ${count} articles`);
  }
}

main().catch(console.error);
