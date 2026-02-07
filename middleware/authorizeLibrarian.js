const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const authorizeLibrarian = (req, res, next) => {
  try {
    //to get the Bearear Token From the Header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Required Token",
      });
    }
    //decode the Token and check the role for the Librarian
    const decodedToken = jwt.verify(token, process.env.PASSWORD_PAPPER);
    //check the role for the Librarian
    if (decodedToken.role !== "librarian") {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to perform this action",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = authorizeLibrarian;
