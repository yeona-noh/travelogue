import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { authContext } from "../context/authContext";
import "./contents.css";

function Contents() {
  const [posts, setPosts] = useState([]);
  const { authToken } = useContext(authContext);

  useEffect(() => {
    getContent();
  }, []);

  const getContent = async () => {
    try {
      let res = await axios.get("/posts/mypost", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      // console.log(res.data)
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="eachPost">
        {posts.map((post) => (
          <div className="titlePost" key={post.id}>
            <div className="place-date-photo-box">
              <h2 className="place">{post.place}</h2>
              <h2 className="date">{post.date.split("T")[0]}</h2>
              {post.photos?.map((photo, index) => (
                <img
                  src={photo}
                  className="blog-photo"
                  alt={`${post.place} - ${post.date} - photo ${index + 1}`}
                  key={index}
                />
              ))}
            </div>
            <div
              className="story"
              dangerouslySetInnerHTML={{
                __html: post.post.replace(/\n/g, "<br>"),
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contents;
