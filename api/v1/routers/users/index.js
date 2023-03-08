const express = require("express");
const usersRouter = express.Router();
const usersController = require("./users.controller");

usersRouter.get("/", (req, res) => {
  res.send("Hello from RUAPIv1 Users!");
});

usersRouter.get("/random", usersController.getARandomUser);
usersRouter.get("/all", usersController.getAllUsers);
usersRouter.post("/save", usersController.saveAUser);
usersRouter.patch("/update", usersController.updateAUser);
usersRouter.patch("/bulk-update", usersController.updateUsers);
usersRouter.delete("/delete", usersController.deleteAUser);

module.exports = usersRouter;
