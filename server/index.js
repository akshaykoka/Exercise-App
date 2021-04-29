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
  .use(express.static("../docs"))
  .use(cors())
  .use(morgan("dev"))
  .use("/", require("./routes"))
  .use("/uploads", express.static(__dirname + "/uploads"))

  // All the way at the end of the pipeline. Return instead of not found
  .get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../docs/index.html"));
  })

  .use((error, req, res, next) => {
    console.error(error);

    res.status(error.code || 500);
    res.send({ msg: error.toString() });
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
