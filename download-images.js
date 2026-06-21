const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

const IMG_DIR = path.join(__dirname, "static", "images");
fs.mkdirSync(IMG_DIR, { recursive: true });

function download(url, filepath) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith("https") ? https : http;
    const options = {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Referer: "https://mp.weixin.qq.com/",
      },
    };
    const req = proto.get(url, options, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        download(res.headers.location, filepath).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error("HTTP " + res.statusCode));
        return;
      }
      const file = fs.createWriteStream(filepath);
      res.pipe(file);
      file.on("finish", () => {
        file.close();
        resolve();
      });
      file.on("error", reject);
    });
    req.on("error", reject);
    req.setTimeout(20000, () => {
      req.destroy();
      reject(new Error("timeout"));
    });
  });
}

function walk(dir) {
  const result = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === "about.md") continue;
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) result.push(...walk(fp));
    else if (e.name.endsWith(".md")) result.push(fp);
  }
  return result;
}

async function main() {
  const files = walk(path.join(__dirname, "content"));
  const urlMap = {};

  // Collect all mmbiz image URLs
  for (const fp of files) {
    const content = fs.readFileSync(fp, "utf8");
    for (const m of content.matchAll(/!\[.*?\]\((https?:\/\/mmbiz[^)]+)\)/g)) {
      const url = m[1];
      if (!urlMap[url]) {
        const ext = (url.match(/wx_fmt=(\w+)/) || [, "jpg"])[1];
        // Use the full path slug (after qpic.cn/) for uniqueness, take last 40 chars
        const pathPart = url.replace(/^https?:\/\/[^\/]+\//, "").replace(/[^\w]/g, "");
        const hash = pathPart.slice(-40);
        urlMap[url] = hash + "." + ext;
      }
    }
  }

  const urls = Object.keys(urlMap);
  console.log(`Found ${urls.length} unique mmbiz images\n`);

  // Download
  let ok = 0,
    fail = 0;
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const fname = urlMap[url];
    const fp = path.join(IMG_DIR, fname);
    if (fs.existsSync(fp) && fs.statSync(fp).size > 100) {
      ok++;
      process.stdout.write(
        `\r  ${i + 1}/${urls.length}  ok:${ok}  fail:${fail}`
      );
      continue;
    }
    try {
      await download(url, fp);
      ok++;
    } catch (e) {
      fail++;
      delete urlMap[url];
    }
    process.stdout.write(
      `\r  ${i + 1}/${urls.length}  ok:${ok}  fail:${fail}`
    );
    if (i < urls.length - 1) await new Promise((r) => setTimeout(r, 200));
  }
  console.log(`\n\nDownloaded: ${ok}  Failed: ${fail}`);

  // Replace URLs in content files
  let replaced = 0;
  for (const fp of files) {
    let content = fs.readFileSync(fp, "utf8");
    let changed = false;
    content = content.replace(
      /!\[(.*?)\]\((https?:\/\/mmbiz[^)]+)\)/g,
      (match, alt, url) => {
        const local = urlMap[url];
        if (local) {
          changed = true;
          return `![${alt}](../images/${local})`;
        }
        return match;
      }
    );
    if (changed) {
      fs.writeFileSync(fp, content);
      replaced++;
    }
  }
  console.log(`Updated ${replaced} files`);
}

main().catch(console.error);
