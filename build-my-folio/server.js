require("dotenv").config({ path: "./config.env" });
const express = require("express");
const connectDB = require("./config/db.js");
const errorHandler = require("./middleware/error.js");
const bodyParser = require("body-parser");
// connect db
connectDB();

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/private", require("./routes/private.js"));
app.use("/api/createportfolio", require("./routes/portfolio.js"));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`logged error: ${err}`);
  server.close(() => process.exit(1));
});
