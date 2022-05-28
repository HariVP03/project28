const express = require("express");
const http = require("http");
const path = require("path");

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

app.use(
  express.static(path.join(__dirname, "/../frontend/.next/server/pages"))
);

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "/../frontend/.next/server/pages", "index.html")
  );
});

server.listen(port, () => {
  console.log("Listening on port:", port);
});
