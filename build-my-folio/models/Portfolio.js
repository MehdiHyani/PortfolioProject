const mongoose = require("mongoose");

const PortfolioSchema = mongoose.Schema({
  fullName: {
    type: String,
  },
  status: {
    type: String,
  },
  bio: {
    type: String,
  },
  profilePic: {
    type: String,
  },
  linkedIn: {
    type: String,
  },
  github: {
    type: String,
  },
  facebook: {
    type: String,
  },
  twitter: {
    type: String,
  },
  projects: [
    {
      projectName: {
        type: String,
      },
      projectLink: {
        type: String,
      },
    },
  ],
});

const Portfolio = mongoose.model("Portfolio", PortfolioSchema);

module.exports = Portfolio;
