import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./singlepost.css";
import Header from "./Header";
import Footer from "./Footer";

function SinglePost() {
  const { id } = useParams();
  const [singlePost, setSinglePost] = useState(null);
  useEffect(() => {
    getPost();
  }, [id]);

  const getPost = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/posts/posts/${id}`);
      setSinglePost(res.data);
      // console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="SinglePost">
      <Header />
      <div className="singlepost-container">
        <div className="singlepost-contents">
          {singlePost ? (
            <div>
              <h2 className="singlepost-place">{singlePost.place}</h2>
              <h3>{singlePost.name}</h3>
              <h4 className="singlepost-date">
                {singlePost.date.split("T")[0]}
              </h4>
              <p className="singlepost-story">{singlePost.post}</p>
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
