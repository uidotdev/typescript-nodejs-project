import http, { IncomingMessage, ServerResponse } from "http";
import path from "path";
import fs from "fs/promises";
import url from "url";

async function requestListener(req: IncomingMessage, res: ServerResponse) {
  const parsedUrl = url.parse(req.url || "");

  let data = "";
  try {
    let pathName = parsedUrl.pathname;
    if (pathName === "/") pathName = "/index";
    const filePath = path.join(__dirname, `static${pathName}.html`);
    data = await fs.readFile(filePath, "utf-8");
  } catch {
    data = await fs.readFile(path.join(__dirname, "static/404.html"), "utf-8");
  }

  res.writeHead(200, {
    "Content-Type": "text/html",
    "Content-Length": data.length,
  });
  res.write(data);
  res.end();
}

http.createServer(requestListener).listen(3000, () => {
  console.log("HTTP Server listening on port 3000");
});
