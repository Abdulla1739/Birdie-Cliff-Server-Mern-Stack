require("dotenv").config();

const express = require("express");
const cors = require("cors");

const router = require("./routes/routes");

require("./db/connections");

const server = express();

server.use(cors());
server.use(express.json());
server.use("/uploads", express.static("./uploads"));

server.use(router);

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server started at port : ${PORT}`);
});

server.get("/", (req, res) => {
  res.status(200).send(`<h1>Birdie Cliff started and awaited </h1>`);
});
