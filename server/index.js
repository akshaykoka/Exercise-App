const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cors())
  .use(morgan("dev"));

app
  .use("/api", require("./routes"))
  .use("/uploads", express.static(__dirname + "/uploads"));
if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/public"));
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.code || 500);
  res.send({ msg: error.toString() });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
