const express = require("express");
const apiV1Router = express.Router();

const usersRouter = require("./routers/users");
apiV1Router.use("/user", usersRouter);

apiV1Router.get("/", (req, res) => {
  res.send("Hello from RUAPIv1!");
});

module.exports = apiV1Router;
