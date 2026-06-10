import fs from "fs";

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, "\n")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/\n{3,}/g, "\n\n")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 20);
}

for (let i = 1; i <= 3; i++) {
  const html = fs.readFileSync(`temp-blog-${i}.html`, "utf8");
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1] ?? "";
  const desc =
    html.match(/name="description" content="([^"]+)"/)?.[1] ??
    html.match(/property="og:description" content="([^"]+)"/)?.[1] ??
    "";
  const lines = stripHtml(html);
  const articleStart = lines.findIndex((l) =>
    l.toLowerCase().includes(title.split("|")[0].trim().toLowerCase().slice(0, 30))
  );
  const content = lines.slice(Math.max(0, articleStart), articleStart + 80);
  console.log(JSON.stringify({ i, title, desc, content }, null, 2));
  console.log("\n---END---\n");
}
