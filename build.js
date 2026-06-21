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

// Parse all markdown files
const posts = [];
const files = fs
  .readdirSync(CONTENT)
  .filter((f) => f.endsWith(".md") && f !== "about.md");

for (const file of files) {
  const raw = fs.readFileSync(path.join(CONTENT, file), "utf8");
  const { data, content } = matter(raw);
  const cat = CATEGORIES.find((c) => c.name === (data.category || ""));
  posts.push({
    slug: slugify(file),
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

const year = new Date().getFullYear();

function navHtml(base) {
  const items = CATEGORIES.map(
    (c) =>
      `<a href="${base}category/${c.slug}.html">${c.name}</a>`
  ).join("\n      ");
  return `<a href="${base}index.html">首页</a>\n      ${items}\n      <a href="${base}about/index.html">关于我</a>`;
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
const listItems = posts
  .map((p) => {
    const dateHtml = p.date
      ? `<time datetime="${p.date}">${p.date}</time>`
      : "";
    const catHtml = p.category
      ? `<a href="category/${p.categorySlug}.html" class="post-cat">${p.category}</a>`
      : "";
    return `<div class="post-item">${dateHtml}${catHtml}<a href="posts/${p.slug}.html">${p.title}</a></div>`;
  })
  .join("\n");

const homeBody = render(homeTpl, {
  posts: listItems || "<p>暂无文章</p>",
});
fs.writeFileSync(
  path.join(OUTPUT, "index.html"),
  render(layout, layoutVars("", "首页", homeBody))
);

// Post pages
for (const post of posts) {
  const catHtml = post.category
    ? `<p class="post-category">分类：<a href="../category/${post.categorySlug}.html">${post.category}</a></p>`
    : "";
  const body = render(postTpl, {
    title: post.title,
    date: post.date,
    category: catHtml,
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
    posts: catList || "<p>该分类暂无文章</p>",
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

// Copy static
const staticFiles = fs.readdirSync(STATIC);
for (const f of staticFiles) {
  fs.copyFileSync(path.join(STATIC, f), path.join(OUTPUT, f));
}

console.log(`Built ${posts.length} post(s), ${CATEGORIES.length} category page(s) → output/`);
