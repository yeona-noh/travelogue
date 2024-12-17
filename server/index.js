const express = require("express");
const app = express();
const cors = require("cors");
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");
const path = require("path")


app.use(express.json());
app.use(cors());


const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use("/posts", postRoutes)
app.use("/users", userRoutes)

app.use(express.static(path.join(__dirname, '../build')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});



const PORT = process.env.PORT || 5001; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});