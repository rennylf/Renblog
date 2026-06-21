const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const MarkdownIt = require("markdown-it");

const ROOT = __dirname;
const CONTENT = path.join(ROOT, "content");
const TEMPLATES = path.join(ROOT, "templates");
const STATIC = path.join(ROOT, "static");
const OUTPUT = path.join(ROOT, "output");

const md = new MarkdownIt({ html: false, breaks: false });

function read(name) {
  return fs.readFileSync(path.join(TEMPLATES, name), "utf8");
}

const layout = read("layout.html");
const homeTpl = read("home.html");
const postTpl = read("post.html");

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

// Parse all markdown files
const posts = [];
const files = fs.readdirSync(CONTENT).filter((f) => f.endsWith(".md"));

for (const file of files) {
  const raw = fs.readFileSync(path.join(CONTENT, file), "utf8");
  const { data, content } = matter(raw);
  posts.push({
    slug: slugify(file),
    title: data.title || "无标题",
    date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
    content: md.render(content),
  });
}

posts.sort((a, b) => (b.date || "").localeCompare(a.date || ""));

// Clean output
fs.rmSync(OUTPUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUTPUT, "posts"), { recursive: true });

const year = new Date().getFullYear();

// Build home page
const listItems = posts
  .map((p) => {
    const dateHtml = p.date ? `<time datetime="${p.date}">${p.date}</time>` : "";
    return `<div class="post-item">${dateHtml}<a href="posts/${p.slug}.html">${p.title}</a></div>`;
  })
  .join("\n");

const homeBody = render(homeTpl, { posts: listItems || "<p>暂无文章</p>" });
const homeHtml = render(layout, {
  title: "首页",
  base: "",
  body: homeBody,
  year,
});
fs.writeFileSync(path.join(OUTPUT, "index.html"), homeHtml);

// Build post pages
for (const post of posts) {
  const body = render(postTpl, {
    title: post.title,
    date: post.date,
    content: post.content,
    base: "../",
  });
  const html = render(layout, {
    title: post.title,
    base: "../",
    body,
    year,
  });
  fs.writeFileSync(path.join(OUTPUT, "posts", `${post.slug}.html`), html);
}

// Copy static
const staticFiles = fs.readdirSync(STATIC);
for (const f of staticFiles) {
  fs.copyFileSync(path.join(STATIC, f), path.join(OUTPUT, f));
}

console.log(`Built ${posts.length} post(s) → output/`);
