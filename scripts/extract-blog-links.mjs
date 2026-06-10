import fs from "fs";

const html = fs.readFileSync("temp-blog-index.html", "utf8");
const links = [...new Set([...html.matchAll(/href="(blog\/[^"]+index\.htm)"/g)].map((m) => m[1]))];
console.log(JSON.stringify(links, null, 2));
console.log("Total:", links.length);
