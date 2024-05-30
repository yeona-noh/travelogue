import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function SinglePost() {
  const { id } = useParams();
  const [singlePost, setSinglePost] = useState();
  useEffect(() => {
    getPost();
  }, [id]);

  const getPost = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/posts/posts/${id}`);
      setSinglePost(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error, "single post line 15");
    }
  };

  return (
    <div className="SinglePost">
      <h1>single post</h1>
    </div>
  );
}

export default SinglePost;
