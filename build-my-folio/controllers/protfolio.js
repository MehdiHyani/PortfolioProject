const Portfolio = require("../models/Portfolio");
const ErrorResponse = require("../utils/errorResponds.js");

exports.createPortfolio = async (req, res, next) => {
  const {
    fullName,
    status,
    bio,
    profilePic,
    linkedIn,
    github,
    facebook,
    twitter,
    projects,
  } = req.body;

  try {
    const portfolio = await Portfolio.create({
      fullName,
      status,
      bio,
      profilePic,
      linkedIn,
      github,
      facebook,
      twitter,
      projects,
    });

    res.status(201).json({ success: true, id: portfolio.id });
  } catch (error) {
    next(error);
  }
};
