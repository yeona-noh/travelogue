const axios = require("axios");
const pool = require("../db");
const dotenv = require('dotenv');
dotenv.config()
const { uploadFile } = require("../services/s3Service");
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
      "SELECT posts.id, date, post, place, photos, user_id, name, about FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id = $1",
      [postId]
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
    const files = req.files || [];

    const photos = [];
    for (const file of files) {
      const photoUrls = await uploadFile(file);
      photos.push(photoUrls);
    }

    const newPost = await pool.query(
      "INSERT INTO posts (date, place, post, photos, user_id) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [date, place, post, photos, req.user.userId]
    );
    // console.log("Uploaded files:", req.files);

    res.status(201).json(newPost.rows[0]);
  } catch (err) {
    console.error("Error creating new post", err.message);
    res.status(500).json({ error: "Error creating new post" });
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
    console.log(error.message, "wirteintro error");
  }
};

//코멘트 테이블을 포스트그레스에 따로 만들고, 그거에 맞는 포스트 아이디와 코멘트를 쓰는 유저 아이디를 쿼리와 코멘트를 쿼리

exports.getComments = async (req, res) => {
  try {
    const id = req.params.id;
    const comments = await pool.query(
      `SELECT comments.comment_text, comments.created_at, users.name 
       FROM comments 
       INNER JOIN users ON comments.user_id = users.id 
       WHERE comments.post_id = $1
       ORDER BY comments.created_at DESC`,
      [id]
    )
    // console.log(comments.rows)
    res.json(comments.rows)
  } catch (error) {
    console.error("Failed to get comment: ", error.message);
    res.status(500).json({ error: "Internal server error" });
}
}

exports.postComment = async (req, res) => {
  const { post_id, comment_text } = req.body;
  const user_id = req.user.userId

  if (!post_id || !user_id || !comment_text) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const result = await pool.query(
      "INSERT INTO comments (post_id, user_id, comment_text, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *",
      [post_id, user_id, comment_text]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Failed to post comment: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
