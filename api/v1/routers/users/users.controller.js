const userHelper = require("./helper");

module.exports.getARandomUser = (req, res) => {
  const users = userHelper.getUsers();
  const randomIndex = userHelper.getARandomInteger(0, users.length - 1);
  res.json(users[randomIndex]);
};

module.exports.getAllUsers = (req, res) => {
  const users = userHelper.getUsers();
  const { limit } = req.query;

  if (limit && users.length > limit) {
    res.json(users.slice(0, +limit));
    return;
  }
  res.json(users);
};

module.exports.saveAUser = (req, res) => {
  const users = userHelper.getUsers();
  const newUser = req.body;

  const requiredKeys = [
    "id",
    "gender",
    "name",
    "contact",
    "address",
    "photoURL",
  ];

  if (requiredKeys.some((key) => !(key in newUser))) {
    res.status(400).send("Not all required properties are provided!");
    return;
  }
  if (users.some((user) => user.id === newUser.id)) {
    res.status(400).send("A user with this id already exists!");
    return;
  }
  users.push(newUser);
  userHelper.setUsers(users);
  res.status(200).send("New User Added Successfully!");
};

module.exports.updateAUser = (req, res) => {
  const users = userHelper.getUsers();
  const requestBody = req.body;
  const { id: targetID } = requestBody;
  let targetUserIndex = users.findIndex((user) => user.id === targetID);
  if (targetUserIndex === -1) {
    res.status(400).send("No user with this id exists!");
    return;
  }
  users[targetUserIndex] = { ...users[targetUserIndex], ...requestBody };
  userHelper.setUsers(users);
  res.status(200).send("User Data Updated Successfully!");
};

module.exports.updateUsers = (req, res) => {
  const users = userHelper.getUsers();
  const requestBody = req.body;
  if (!Array.isArray(requestBody)) {
    res.status(400).send("Request Body must be an array of objects!");
    return;
  }
  const numberOfUpdateRequests = requestBody.length;
  const notFoundIDs = [];

  for (const updateDoc of requestBody) {
    const { id: targetID } = updateDoc;
    let targetUserIndex = users.findIndex((user) => user.id === targetID);
    if (targetUserIndex === -1) {
      notFoundIDs.push(targetID);
      continue;
    }
    users[targetUserIndex] = { ...users[targetUserIndex], ...updateDoc };
  }

  userHelper.setUsers(users);
  res.status(200).send(`Received ${numberOfUpdateRequests} Update Requests.\n
    Successful ${numberOfUpdateRequests - notFoundIDs.length}.\n
    User(s) Not Found for ID: ${notFoundIDs.join(" ")}.
    `);
};

module.exports.deleteAUser = (req, res) => {
  const users = userHelper.getUsers();
  const requestBody = req.body;
  const { id: targetID } = requestBody;
  let targetUserIndex = users.findIndex((user) => user.id === targetID);
  if (targetUserIndex === -1) {
    res.status(400).send("No user with this id exists!");
    return;
  }
  users.splice(targetUserIndex, 1);
  userHelper.setUsers(users);
  res.status(200).send("User Deleted Successfully!");
};
