/** Local verification only. GitHub Pages publishes dist without running this file. */
import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";
import { base as configuredBase } from "../config/site.mjs";
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".xml": "application/xml",
  ".json": "application/json",
};
export function createStaticServer({ directory = "dist", base = configuredBase } = {}) {
  const root = path.resolve(directory);
  const prefix = base.replace(/\/$/, "");
  return http.createServer(async (request, response) => {
    if (!["GET", "HEAD"].includes(request.method)) {
      response.writeHead(405).end();
      return;
    }
    try {
      const url = new URL(request.url, "http://localhost");
      const pathname = decodeURIComponent(url.pathname);
      if (pathname === prefix && prefix) {
        response.writeHead(301, { Location: prefix + "/" + url.search }).end();
        return;
      }
      if (prefix && !pathname.startsWith(prefix + "/")) throw new Error("Outside base");
      let file = path.resolve(root, "." + (pathname.slice(prefix.length) || "/"));
      if (file !== root && !file.startsWith(root + path.sep)) throw new Error("Outside root");
      if ((await fs.stat(file)).isDirectory()) {
        if (!pathname.endsWith("/")) {
          response.writeHead(301, { Location: pathname + "/" + url.search }).end();
          return;
        }
        file = path.join(file, "index.html");
      }
      const data = await fs.readFile(file);
      const compress =
        /gzip/.test(request.headers["accept-encoding"] || "") &&
        /\.(html|js|css|svg|xml)$/.test(file);
      response.writeHead(200, {
        "Content-Type": types[path.extname(file)] || "application/octet-stream",
        ...(compress ? { "Content-Encoding": "gzip", Vary: "Accept-Encoding" } : {}),
      });
      response.end(request.method === "HEAD" ? undefined : compress ? gzipSync(data) : data);
    } catch {
      const html = await fs
        .readFile(path.join(root, "404.html"))
        .catch(() => Buffer.from("Not found"));
      response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      response.end(request.method === "HEAD" ? undefined : html);
    }
  });
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 4322);
  createStaticServer().listen(port, "127.0.0.1", () =>
    console.log(
      `Static preview: http://127.0.0.1:${port}${configuredBase === "/" ? "/" : configuredBase + "/"}`,
    ),
  );
}
