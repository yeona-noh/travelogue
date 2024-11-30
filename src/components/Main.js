import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../context/userContext";
import { userNameContext } from "../context/userNameContext";
import "./main.css";
import axios from "axios";

function Main() {
  const { isLoggedIn } = useContext(userContext);
  const { userName } = useContext(userNameContext);
  const [previewContents, setPreviewContents] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  
  useEffect(() => {
    getPreview();
  }, []);

  const getPreview = async () => {
    try {
      const res = await axios.get("/posts/mainpreview");
      setPreviewContents(res.data);
      console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="main-container"><div className="user-name">
      {isLoggedIn ? (
        
          <h1 className="main-greeting">Hello, {userName}!</h1>
        
      ) : (
        
          <h1 className="main-greeting">Hi, there!</h1>
        
      )}</div>
      <div className="main-preview-container">
        
        {previewContents.map((previewContent) => (
          <Link className="contents-link" to={`/posts/${previewContent.id}`} key={previewContent.id}>
          <div
            className="preview-content"
            onClick={() => {
              setSelectedPostId(previewContent.id);
            }}
            key={previewContent.id}
          >
          
            <h2 className="pre-content name">{previewContent.name}</h2>
            <h3 className="pre-content place">{previewContent.place}</h3>
            <h4 className="pre-content">{previewContent.date.split("T")[0]}</h4>
            <p className="preview-post">{previewContent.post}</p>
          </div></Link>
          ))}
      </div>
    </div>
  );
}

export default Main;
