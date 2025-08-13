import http = require("node:http");
import fs = require("fs");
import path = require("path");
import { IncomingMessage, ServerResponse } from "node:http";

const PORT = 3000;

const nativeServer = http.createServer(
  (req: IncomingMessage, res: ServerResponse): void => {
    const { method, url } = req;
    if (method === "GET" && url === "/") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: "Welcome To My Server!" }));
    } else if (method === "GET" && url === "/about") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: "This is the about route!" }));
    } else if (method === "POST" && url === "/upload") {
      // Check If No File Or Empty
      const length = req.headers["content-length"];
      if (!length || Number(length) === 0) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "No File Uploaded in the Body!" }));
        return;
      }
      // Note: Test this route using raw or binary.
      const filePath = path.join(__dirname, "../test-data/output.json");
      const writeFileStream = fs.createWriteStream(filePath);

      // req.on('data', chunk =>{

      // })

      req.pipe(writeFileStream);

      writeFileStream.on("finish", () => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: "Your File is Uploaded Successfully!",
            path: filePath,
          })
        );
      });
    } else {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: "Route Not Found!" }));
    }
  }
);

nativeServer.listen(PORT, "localhost", () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});
