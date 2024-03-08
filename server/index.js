const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { randomBytes } = require("crypto");
const { decode } = require("punycode");


app.use(express.json()); 
app.use(cors());

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));


app.post("/", async (req, res) => {
  try {
    console.log(req.body)
    const { post,date,place } = req.body;
    const newPost = await pool.query(
      "INSERT INTO posts (date, place, post) VALUES($1, $2, $3) RETURNING *",
      [date, place, post]
    );


    res.status(201).json(newPost.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});


app.get("/", async(req,res) => {
  try {
    const allPost = await pool.query("SELECT * FROM posts");
    res.json(allPost.rows);
    console.log(res.json)
  } catch (error) {
    console.error(err.message)
  }
});

app.post("/signup", async(req,res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password,10)
    const { email, password } = req.body

    const newUser = await pool.query(
      "INSERT INTO users (email,password) VALUES($1, $2) RETURNING *",
      [email,hashPassword]
    )
    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    res.status(400).json(error.message)
    console.log(error.message)
  }
});

app.post("/login", async(req, res) => {

  try {
    const { email, password } = req.body
    console.log(email)
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    )

    const user = result.rows[0]

    if (!user) { 
      res.status(400).send("email not found")
    } 
    const isValid = await bcrypt.compare(password,user.password)
    if (isValid){

      const newSecret = randomBytes(64).toString("hex")
      await pool.query("UPDATE users SET current_token = $1 WHERE id = $2", [newSecret, user.id])
      const accessToken = jwt.sign({ userId : user.id }, newSecret)

      res.status(200).json({accessToken})
    } else {
      res.status(400).send("incorrect password")
    }
  } catch (error) {
    res.status(400).json(error.message)
    console.log(error.message)
  }
});


const authenticateToken = async (req, res, next) => {

  const token = req.headers["authorization"]?.split(" ")[1]
  console.log("Received token:", token);
  if (token == null) {
    console.log("Token missing");
    return res.sendStatus(401)
  } 
  try {
    const payload = jwt.decode(token)
    const userResult = await pool.query("SELECT current_token FROM users WHERE id = $1", [payload.userId])
    const user = userResult.rows[0]
    if (!user) {
      return res.status(403).send('User not found');
    }


    jwt.verify(token, user.current_token, (err, user) => {
      if (err) return res.sendStatus(403); //Invalid Token
      req.user = user;
      next();
    });


  } catch (error) {
    console.error(error);
    return res.status(403).send('Token decoding failed');
    
  }
}

app.get("/login/success", authenticateToken, (req, res) => {
  console.log(req.user)
  res.json({ message: "this is a protected route", user: req.user });
  
});
 



app.listen(5001, () => {
    console.log("server has started on port 5001");
  });