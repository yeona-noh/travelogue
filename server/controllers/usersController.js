const pool = require("../db");
const bcrypt = require("bcrypt");
const { randomBytes } = require("crypto");
const jwt = require("jsonwebtoken");

exports.getAboutPage = async (req, res) => {
  try {
    const userInfo = await pool.query("SELECT name, about FROM users");
    res.json(userInfo.rows);
    console.log(userInfo.rows);
  } catch (error) {
    console.log(error, "user info error");
  }
};

exports.getLoginSuccess = async (req, res) => {
  console.log("line19");
  res.json({ message: "this is a protected route", user: req.user.name });
};

exports.postSignup = async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const { name, email, password } = req.body;

    const newUser = await pool.query(
      "INSERT INTO users (name,email,password) VALUES($1, $2, $3) RETURNING *",
      [name, email, hashPassword]
    );
    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
};

exports.postLogin = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    const user = result.rows[0];
    if (!user) {
      res.status(400).send("email not found");
    } else {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        const newSecret = randomBytes(64).toString("hex");
        await pool.query("UPDATE users SET current_token = $1 WHERE id = $2", [
          newSecret,
          user.id,
        ]);
        const accessToken = jwt.sign({ userId: user.id }, newSecret);

        res.status(200).json({ accessToken });
      } else {
        res.status(400).send("incorrect password");
      }
    }
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
};
