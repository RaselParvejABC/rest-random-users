const fs = require("fs");
const path = require("path");

const usersDataPath = path.join(__dirname, "..", "..", "..", "..", "data.json");

module.exports.getUsers = () => {
  const data = fs.readFileSync(usersDataPath);
  return JSON.parse(data);
};

module.exports.setUsers = (data) => {
  fs.writeFileSync(usersDataPath, JSON.stringify(data));
};

module.exports.getARandomInteger = (lowerBound, upperBound) => {
  return Math.floor(Math.random() * (upperBound - lowerBound + 1) + lowerBound);
};
