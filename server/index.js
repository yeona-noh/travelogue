const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { randomBytes } = require("crypto");
const { decode } = require("punycode");
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");
const authenticateToken = require("./middlewares/authenticateToken")
// const path = require("path")


app.use(express.json());
app.use(cors());


const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
const path = require("path");

// Serve static files from the React frontend app
// app.use(express.static(path.join(__dirname, "../build")));

// // After defining API routes, add this to handle any other routes
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../build", "index.html"));
// });

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
  });
}

app.use(cors(corsOptions));
app.use("/posts", postRoutes)
app.use("/users", userRoutes)

// app.get("/about", async (req, res) => {
//   try {
//     const userInfo = await pool.query("SELECT name, about FROM users");
//     res.json(userInfo.rows);
//     console.log(userInfo.rows);
//   } catch (error) {
//     console.log(error, "user info error");
//   }
// });


// app.post("/signup", async (req, res) => {
//   try {
//     const hashPassword = await bcrypt.hash(req.body.password, 10);
//     const { name, email, password } = req.body;

//     const newUser = await pool.query(
//       "INSERT INTO users (name,email,password) VALUES($1, $2, $3) RETURNING *",
//       [name, email, hashPassword]
//     );
//     res.status(201).json(newUser.rows[0]);
//   } catch (error) {
//     res.status(400).json(error.message);
//     console.log(error.message);
//   }
// });

// app.post("/login", async (req, res) => {
//   try {
//     const { email, password, name } = req.body;

//     const result = await pool.query("SELECT * FROM users WHERE email = $1", [
//       email,
//     ]);

//     const user = result.rows[0];
//     if (!user) {
//       res.status(400).send("email not found");
//     } else {
//       const isValid = await bcrypt.compare(password, user.password);
//       if (isValid) {
//         const newSecret = randomBytes(64).toString("hex");
//         await pool.query("UPDATE users SET current_token = $1 WHERE id = $2", [
//           newSecret,
//           user.id,
//         ]);
//         const accessToken = jwt.sign({ userId: user.id }, newSecret);

//         res.status(200).json({ accessToken });
//       } else {
//         res.status(400).send("incorrect password");
//       }
//     }
//   } catch (error) {
//     res.status(400).json(error.message);
//     console.log(error.message);
//   }
// });

// let currentUserId;

// const authenticateToken = async (req, res, next) => {
//   const token = req.headers["authorization"]?.split(" ")[1];
//   console.log("Received token:", token);
//   if (token == null) {
//     console.log("Token missing");
//     return res.sendStatus(401);
//   }
//   try {
//     const payload = jwt.decode(token);
//     const userResult = await pool.query(
//       "SELECT current_token FROM users WHERE id = $1",
//       [payload.userId]
//     );
//     const user = userResult.rows[0];
//     const getCurrentUserId = await pool.query(
//       "SELECT id,name FROM users WHERE id = $1",
//       [payload.userId]
//     );
//     currentUserId = getCurrentUserId.rows[0];
//     console.log(currentUserId);
//     if (!user) {
//       return res.status(403).send("User not found");
//     }

//     jwt.verify(token, user.current_token, (err, user) => {
//       if (err) return res.sendStatus(403);
//       req.user = user;
//       next();
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(403).send("Token decoding failed");
//   }
// };

// app.get("/login/success", authenticateToken, async (req, res) => {
//   res.json({ message: "this is a protected route", user: currentUserId.name });
//   // try {
//   //   const currentUserName = await pool.query(
//   //     "SELECT name FROM users JOIN posts ON user_id = users.id WHERE user_id = $1",
//   //     [req.user.userId]
//   //   );
//   //   res.json(currentUserName.rows[0]);
//   //   console.log(currentUserName,"115");
//   // } catch (error) {
//   //   console.error(err.message);
//   // }
// });


app.listen(5001, () => {
  console.log("server has started on port 5001");
});
