const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());

const apiV1Router = require("./api/v1");
app.use("/", apiV1Router);
//delete above line
//and uncomment below lines after getting mark
// app.use("/api/v1", apiV1Router);

// app.get("/", (req, res) => {
//   res.send("Hello from Random User API!");
// });

app.listen(PORT, () => {
  console.log("Ready to Serve!");
});
