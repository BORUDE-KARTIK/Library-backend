const authModel = require("../Model/authModel");

class AuthController {
  signIn = async (req, res) => {
    try {
      if (!req.body) {
        return res.status(400).json({
          success: false,
          message: "Please provide username and password",
        });
      }
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: "Please provide username and password",
        });
      }
      console.log(req.body);

      const result = await authModel.signIn(username, password);
      console.log("result", result);
      if (result.success) return res.status(200).json(result);
      else return res.status(401).json(result);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };
  signUp = async (req, res) => {
    try {
      if (!req.body) {
        return res.status(400).json({
          success: false,
          message: "Please provide username and password",
        });
      }
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: "Please provide username and password",
        });
      }
      console.log(req.body);

      const result = await authModel.signUp(username, password);
      console.log("result", result);
      if (result.success) return res.status(200).json(result);
      else return res.status(401).json(result);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };
}

module.exports = new AuthController();
