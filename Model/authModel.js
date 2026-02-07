const pool = require("../Config/dbConfig");
const bcrypt = require("bcryptjs");
const path = require("path");
const { generateToken } = require("../Utils/jwtHelper");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

class AuthModel {
  constructor() {
    this.papper = process.env.PASSWORD_PAPPER;
  }

  signIn = async (username, password) => {
    const q = `SELECT id, username, role, hashed_password  FROM users WHERE username = ?`;
    try {
      const [rows] = await pool.query(q, [username]);
      console.log(rows);

      if (rows.length === 0) {
        return {
          success: false,
          message: "Invalid credentials",
        };
      }
      const user = rows[0];
      const isPasswordValid = await bcrypt.compare(
        password + this.papper,
        user.hashed_password,
      );

      console.log("isPasswordValid", isPasswordValid);
      if (!isPasswordValid) {
        return {
          success: false,
          message: "Invalid credentials",
        };
      } else {
        const token = generateToken({
          id: user.id,
          username: user.username,
          role: user.role,
        });
        return {
          success: true,
          message: "Login successful",
          user: {
            token,
          },
        };
      }
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Internal server error",
      };
    }
  };

  signUp = async (username, password) => {
    const q = `INSERT INTO users (username,password, hashed_password) VALUES (?, ? , ?)`;
    try {
      let hashed_password = await bcrypt.hash(password + this.papper, 10);
      const [rows] = await pool.query(q, [username, password, hashed_password]);
      console.log("User signed up successfully", rows);
      if (rows.affectedRows === 0) {
        return {
          success: false,
          message: "User not signed up",
        };
      } else {
        const token = generateToken({
          id: rows.insertId,
          username: username,
          role: "student",
        });
        return {
          success: true,
          message: "User signed up successfully",
          user: {
            token,
          },
        };
      }
    } catch (error) {
      console.log(error);
      if (error.code === "ER_DUP_ENTRY") {
        return {
          success: false,
          message: "Username already exists",
        };
      }
      return {
        success: false,
        message: "Internal server error",
      };
    }
  };
}

module.exports = new AuthModel();
