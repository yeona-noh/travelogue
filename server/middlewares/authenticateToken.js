const jwt = require("jsonwebtoken");
const pool = require("../db");

module.exports = async (req, res, next) => {
    let currentUserId;
    const token = req.headers["authorization"]?.split(" ")[1];
    // console.log("Received token:", token);
    if (token == null) {
      // console.log("Token missing");
      return res.sendStatus(401);
    }
    try {
      const payload = jwt.decode(token);
      const userResult = await pool.query(
        "SELECT current_token FROM users WHERE id = $1",
        [payload.userId]
      );
      const user = userResult.rows[0];
      const getCurrentUserId = await pool.query(
        "SELECT id,name FROM users WHERE id = $1",
        [payload.userId]
      );
      currentUserId = getCurrentUserId.rows[0];
      // console.log("get currentUserId:",currentUserId);
      if (!user) {
        return res.status(403).send("User not found");
      }
  
      jwt.verify(token, user.current_token, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        req.currentUserId = currentUserId.name

        next();
      });
    } catch (error) {
      console.error(error);
      return res.status(403).send("Token decoding failed");
    }
  };