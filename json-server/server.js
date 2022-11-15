const path = require("path");
const cors = require("cors");
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  })
);
server.use(cors());

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use(router);
server.listen(port, () => {
  console.log("JSON Server is running on port " + port);
});
