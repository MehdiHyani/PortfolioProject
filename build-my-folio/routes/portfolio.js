const express = require("express");
const router = express.Router();

const { createPortfolio } = require("../controllers/protfolio.js");

router.route("/create").post(createPortfolio);

module.exports = router;
