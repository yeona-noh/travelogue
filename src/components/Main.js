import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../context/userContext";
import { userNameContext } from "../context/userNameContext";
import "./main.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      const res = await axios.get("/posts/mainpreview", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setPreviewContents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const showNotification = (message) => {
    toast(message);
  };

  const handlePreviewContent = (id) => {
    if (isLoggedIn) {
      setSelectedPostId(id);
    } else {
      showNotification("Please sign in or log in to view more contents! ✈️");
    }
  };

  return (
    <div className="main-container">
      <ToastContainer
        position="top-center"
        autoClose={10000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="user-name">
        {isLoggedIn ? (
          <h1 className="main-greeting">Hello, {userName}!</h1>
        ) : (
          <h1 className="main-greeting">Hi, there!</h1>
        )}
      </div>
      <div className="main-preview-container">
        {previewContents.map((previewContent) => (
          <div key={previewContent.id}>
            {isLoggedIn ? (
              <Link
                className="contents-link"
                to={`/posts/${previewContent.id}`}
              >
                <div
                  className="preview-content"
                  onClick={() => handlePreviewContent(previewContent.id)}
                >
                  <h2 className="pre-content name">{previewContent.name}</h2>
                  <h3 className="pre-content place">{previewContent.place}</h3>
                  <h4 className="pre-content">
                    {previewContent.date.split("T")[0]}
                  </h4>
                  <p className="preview-post">{previewContent.post}</p>
                </div>
              </Link>
            ) : (
              <div
                className="preview-content"
                onClick={() => handlePreviewContent(previewContent.id)}
              >
                <h2 className="pre-content name">{previewContent.name}</h2>
                <h3 className="pre-content place">{previewContent.place}</h3>
                <h4 className="pre-content">
                  {previewContent.date.split("T")[0]}
                </h4>
                <p className="preview-post">{previewContent.post}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;
