const pool = require("../db");

//join posts and user tables to send the name and contents together
exports.getPreview = async (req, res) => {
  try {
    const mainPreview = await pool.query(
      "SELECT posts.id, date, post,place, user_id, name, about FROM posts JOIN users ON posts.user_id = users.id"
    );
    res.json(mainPreview.rows);
  } catch (error) {
    console.log(error, "mainpreview err");
  }
};

exports.getMypost = async (req, res) => {
  try {
    const myPost = await pool.query("SELECT * FROM posts WHERE user_id = $1", [
      req.user.userId,
    ]);
    res.json(myPost.rows);

  } catch (error) {
    console.error(err.message);
  }
};

exports.getSinglePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await pool.query(
    //   "SELECT * FROM posts WHERE id = $1", 
    //   [
    //   postId,
    // ]
    "SELECT posts.id, date, post,place, user_id, name, about FROM posts JOIN users ON posts.id = $1",
    [postId,]
  );
    if (post) {
      res.status(200).json(post.rows[0]);
    } else {
      res.status(404).send("post not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
};

exports.postNewStory = async (req, res) => {
  try {
    const { post, date, place } = req.body;

    const newPost = await pool.query(
      "INSERT INTO posts (date, place, post, user_id) VALUES($1, $2, $3, $4) RETURNING *",
      [date, place, post, req.user.userId]
    );

    res.status(201).json(newPost.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};

exports.postWriteAbout = async (req, res) => {
  try {
    const { about } = req.body;

    const newIntro = await pool.query(
      "UPDATE users SET about = $1 WHERE id = $2",
      [about, req.user.userId]
    );

    res.status(201).json(newIntro.rows[0]);
  } catch (error) {
    console.log(error, "wirteintro error");
  }
};
