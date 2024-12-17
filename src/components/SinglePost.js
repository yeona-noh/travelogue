import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authContext } from "../context/authContext";
import axios from "axios";
import "./singlepost.css";
import Header from "./Header";
import Footer from "./Footer";

function SinglePost() {
  const { id } = useParams();
  const { authToken } = useContext(authContext);
  const [singlePost, setSinglePost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState();

  useEffect(() => {
    getPost();
    getComments();
  }, [id]);

  const getPost = async () => {
    try {
      const res = await axios.get(`/posts/posts/${id}`);
      setSinglePost(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getComments = async () => {
    try {
      const res = await axios.get(`/posts/comments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      );
      console.log(res.data)
      setComments(res.data);
    } catch (error) {
      console.log("failed to get comments: ", error.message);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/posts/writecomments",
        { 
          post_id: id,
          comment_text: comment },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setComment("");
      getComments();
    } catch (error) {
      console.log("Failed to submit a comment : ", error.message);
    }
  };

  return (
    <div className="SinglePost">
      <Header />
      <div className="singlepost-container">
        <div className="singlepost-contents">
          {singlePost ? (
            <div key={singlePost.id}>
              <h2 className="singlepost-place">{singlePost.place}</h2>
              <h3 className="singlepost-name">{singlePost.name}</h3>
              {singlePost.photos.map((photo) => (
                <img src={photo} className="singlepost-photo"></img>
              ))}
              <h4 className="singlepost-date">
                {singlePost.date.split("T")[0]}
              </h4>
              <div
                className="singlepost-story"
                dangerouslySetInnerHTML={{
                  __html: singlePost.post.replace(/\n/g, "<br>"),
                }}
              />
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div className="comment-box" key={index}>
                    <div className="name-comment">
                    <p className="username">{comment.name} :</p>
                    <p className="comments">"{comment.comment_text}"</p></div>
                    <p className="commneted-time">{comment.created_at.split("T")[0]}</p>
                  </div>
                ))
              ) : (
                <div className="comment-box">
                  <p className="comments">be the first to leave a comment!</p></div>
              )}

              <div className="comment-input-box">
                <textarea
                  type="text"
                  className="comment-input"
                  value={comment}
                  placeholder="Write your comment.."
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  required
                ></textarea>
                <button
                  className="comment-submit"
                  type="submit"
                  onClick={handleComment}
                >
                
                </button>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SinglePost;
