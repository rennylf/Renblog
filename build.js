const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const MarkdownIt = require("markdown-it");

const ROOT = __dirname;
const CONTENT = path.join(ROOT, "content");
const TEMPLATES = path.join(ROOT, "templates");
const STATIC = path.join(ROOT, "static");
const OUTPUT = path.join(ROOT, "output");

const SITE = {
  title: "任顾远",
  tagline: "设计驱动可持续生活，关注自我发展与人本福祉",
  url: "https://rennylf.github.io/Renblog",
};

const CATEGORIES = [
  { slug: "design", name: "设计驱动" },
  { slug: "solitude", name: "我辈孤雏" },
  { slug: "malotalk", name: "MaloTalk" },
];

const md = new MarkdownIt({ html: false, breaks: false });

function read(name) {
  return fs.readFileSync(path.join(TEMPLATES, name), "utf8");
}

function render(tpl, vars) {
  let out = tpl;
  for (const [k, v] of Object.entries(vars)) {
    out = out.replaceAll(`{{${k}}}`, v);
  }
  return out;
}

function slugify(name) {
  return name
    .replace(/\.md$/, "")
    .replace(/[^\w\u4e00-\u9fff-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const layout = read("layout.html");
const homeTpl = read("home.html");
const postTpl = read("post.html");
const categoryTpl = read("category.html");
const aboutTpl = read("about.html");
const articlesTpl = read("articles.html");

// Recursively collect markdown files from content/ and subdirectories
function collectFiles(dir, base = "") {
  const result = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name === "about.md") continue;
    const full = path.join(dir, e.name);
    const rel = base ? `${base}/${e.name}` : e.name;
    if (e.isDirectory()) {
      result.push(...collectFiles(full, rel));
    } else if (e.name.endsWith(".md")) {
      result.push(rel);
    }
  }
  return result;
}

const posts = [];
const files = collectFiles(CONTENT);

for (const file of files) {
  const raw = fs.readFileSync(path.join(CONTENT, file), "utf8");
  const { data, content } = matter(raw);
  const cat = CATEGORIES.find((c) => c.name === (data.category || ""));
  posts.push({
    slug: slugify(path.basename(file)),
    title: data.title || "无标题",
    date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
    content: md.render(content),
    category: cat ? cat.name : "",
    categorySlug: cat ? cat.slug : "",
  });
}

posts.sort((a, b) => (b.date || "").localeCompare(a.date || ""));

// Clean output
fs.rmSync(OUTPUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUTPUT, "posts"), { recursive: true });
fs.mkdirSync(path.join(OUTPUT, "category"), { recursive: true });
fs.mkdirSync(path.join(OUTPUT, "about"), { recursive: true });
fs.mkdirSync(path.join(OUTPUT, "articles"), { recursive: true });

const year = new Date().getFullYear();

function navHtml(base) {
  return `<a href="${base}index.html"><span class="zh">首页</span><span class="en">Home</span></a>
  <a href="${base}articles/index.html"><span class="zh">文章索引</span><span class="en">Index</span></a>
  <a href="${base}about/index.html"><span class="zh">关于我</span><span class="en">About</span></a>`;
}

function layoutVars(base, title, body) {
  return {
    siteTitle: SITE.title,
    tagline: SITE.tagline,
    title,
    nav: navHtml(base),
    base,
    body,
    year,
  };
}

// Home page
// Category cards
const categoryCards = CATEGORIES.map((cat) => {
  const count = posts.filter((p) => p.categorySlug === cat.slug).length;
  return `<a href="category/${cat.slug}.html" class="cat-card">
    <span class="cat-card-name">${cat.name}</span>
    <span class="cat-card-count">${count} 篇</span>
  </a>`;
}).join("\n");

// Recent 6 posts
const recentPosts = posts
  .slice(0, 6)
  .map((p) => {
    const dateHtml = p.date ? `<time datetime="${p.date}">${p.date}</time>` : "";
    const catHtml = p.category ? `<span class="recent-cat">${p.category}</span>` : "";
    return `<a href="posts/${p.slug}.html" class="recent-item">
      ${dateHtml}
      <span class="recent-title">${p.title}</span>
      ${catHtml}
    </a>`;
  })
  .join("\n");

const homeBody = render(homeTpl, {
  categoryCards,
  recentPosts: recentPosts || '<p class="recent-empty"><span class="zh">暂无文章</span><span class="en">No articles yet</span></p>',
});
fs.writeFileSync(
  path.join(OUTPUT, "index.html"),
  render(layout, layoutVars("", "首页", homeBody))
);

// Post pages
for (const post of posts) {
  const catLabel = post.category
    ? `<a href="../category/${post.categorySlug}.html" class="article-category">${post.category}</a>`
    : "";
  // Estimate reading time: ~400 chars/min for Chinese
  const charCount = post.content.replace(/<[^>]+>/g, "").length;
  const mins = Math.max(1, Math.round(charCount / 400));
  const readTime = `<span class="zh">阅读约 ${mins} 分钟</span><span class="en">${mins} min read</span>`;
  const body = render(postTpl, {
    title: post.title,
    date: post.date,
    categoryName: post.category || "",
    categorySlug: post.categorySlug || "",
    readTime,
    content: post.content,
    base: "../",
  });
  fs.writeFileSync(
    path.join(OUTPUT, "posts", `${post.slug}.html`),
    render(layout, layoutVars("../", post.title, body))
  );
}

// Category pages
for (const cat of CATEGORIES) {
  const catPosts = posts.filter((p) => p.categorySlug === cat.slug);
  const catList = catPosts
    .map((p) => {
      const dateHtml = p.date
        ? `<time datetime="${p.date}">${p.date}</time>`
        : "";
      return `<div class="post-item">${dateHtml}<a href="../posts/${p.slug}.html">${p.title}</a></div>`;
    })
    .join("\n");
  const body = render(categoryTpl, {
    category: cat.name,
    posts: catList || '<p><span class="zh">该分类暂无文章</span><span class="en">No articles yet</span></p>',
  });
  fs.writeFileSync(
    path.join(OUTPUT, "category", `${cat.slug}.html`),
    render(layout, layoutVars("../", cat.name, body))
  );
}

// About page
let aboutHtml = "";
const aboutFile = path.join(CONTENT, "about.md");
if (fs.existsSync(aboutFile)) {
  const raw = fs.readFileSync(aboutFile, "utf8");
  const { content } = matter(raw);
  aboutHtml = md.render(content);
}
const aboutBody = render(aboutTpl, { content: aboutHtml });
fs.writeFileSync(
  path.join(OUTPUT, "about", "index.html"),
  render(layout, layoutVars("../", "关于我", aboutBody))
);

// Article index page
const indexSections = CATEGORIES.map((cat) => {
  const catPosts = posts.filter((p) => p.categorySlug === cat.slug);
  const catItems = catPosts
    .map((p) => {
      const dateHtml = p.date ? `<time datetime="${p.date}">${p.date}</time>` : "";
      return `<li><a href="posts/${p.slug}.html">${p.title}</a>${dateHtml}</li>`;
    })
    .join("\n");
  return `<section class="index-section">
    <h2 class="index-cat-title">${cat.name} <span class="index-cat-count">${catPosts.length} 篇</span></h2>
    <ul class="index-post-list">${catItems}</ul>
  </section>`;
}).join("\n");

const articlesBody = render(articlesTpl, { sections: indexSections });
fs.writeFileSync(
  path.join(OUTPUT, "articles", "index.html"),
  render(layout, layoutVars("../", "文章索引", articlesBody))
);

// Copy static
fs.cpSync(STATIC, OUTPUT, { recursive: true });

console.log(`Built ${posts.length} post(s), ${CATEGORIES.length} category page(s) → output/`);
