const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const generateToken = (user) => {
  console.log("User in genearete Token ", user);
  console.log("JWT_SECRET", process.env.PASSWORD_PAPPER);

  return jwt.sign(user, process.env.PASSWORD_PAPPER, { expiresIn: "1d" });
};

module.exports = { generateToken };
