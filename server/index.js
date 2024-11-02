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

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build')));

// Catch-all route to serve the React frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});


// Serve static files from the React frontend app
// app.use(express.static(path.join(__dirname, "../build")));

// // After defining API routes, add this to handle any other routes
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../build", "index.html"));
// });

app.use(cors(corsOptions));
app.use("/posts", postRoutes)
app.use("/users", userRoutes)

const PORT = process.env.PORT || 5001; // Default to 5000 if not set (for local development)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});