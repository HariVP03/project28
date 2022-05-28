import express, { Response, Request } from "express";
import http from "http";
import path from "path";

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

app.use(
  express.static(path.join(__dirname, "/../frontend/.next/server/pages"))
);

app.get("*", (req: Request, res: Response) => {
  res.sendFile(
    path.join(__dirname, "/../frontend/.next/server/pages", "index.html")
  );
});

server.listen(port, () => {
  console.log("Listening on port:", port);
});
