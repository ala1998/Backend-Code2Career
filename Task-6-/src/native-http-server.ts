// import nodeHttp = require("node:http");
import http = require("node:http");
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
    } else {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: "Route Not Found!" }));
    }
  }
);

nativeServer.listen(PORT, "localhost", () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});
