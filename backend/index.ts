import express, { Response, Request } from "express";
import http from "http";
import path from "path";
import { PrismaClient } from "@prisma/client";

const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

const app = express();
const server = http.createServer(app);

app.use(
  express.static(path.join(__dirname, "/../frontend/.next/server/pages"))
);

app.get("*", (_, res: Response) => {
  res.sendFile(
    path.join(__dirname, "/../frontend/.next/server/pages", "index.html")
  );
});

app.post("/createUser", async (_, res: Response) => {
  // const users = await prisma.user.findMany();
  // return users;
  console.log(res);
});

server.listen(port, () => {
  console.log("Listening on port:", port);
});
