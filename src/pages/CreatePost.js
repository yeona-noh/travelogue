import React, { useState, useContext } from "react";
import Header from "../components/Header";
import Intro from "../components/Intro";
import Footer from "../components/Footer";
import { authContext } from "../context/authContext";
import "./createpost.css";
import axios from "axios";

function CreatePost() {
  const [date, setDate] = useState();
  const [place, setPlace] = useState();
  const [post, setPost] = useState();
  const [photos, setPhotos] = useState([]);
  const { authToken } = useContext(authContext);
  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("date", date);
      formData.append("place", place);
      formData.append("post", post);
      Array.from(photos).forEach((photo) => {
        formData.append("photos", photo);
      });
      const res = await axios.post("/posts/post", formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(res.data)
      setDate("");
      setPlace("");
      setPost("");
      setPhotos([]);
    } catch (error) {
      console.log("Error uploading post:", error);
    }
  };

  return (
    <div className="createPost-container">
      <Header />
      <Intro />
      <div className="create-container">
        <h1 className="create-title">Write a post</h1>

        <form className="createPost-form">
          <label className="create-label">Travel Date</label>
          <input
            type="date"
            className="travel-date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <label className="create-label">Travel Place</label>
          <input
            type="text"
            className="travel-place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            required
          />
          {/* 이미지 파일 업로드 기능 더함 */}
          <label className="create-label">Travel Photos</label>
          <input
            type="file"
            className="travel-place"
            name="photos"
            multiple
            onChange={(e) => {
              console.log(e.target.files);
              setPhotos(e.target.files);
            }}
            required
          />

          <label className="create-label">Post</label>
          <textarea
            className="travel-post"
            value={post}
            onChange={(e) => setPost(e.target.value)}
            required
          />

          <button className="create-button" type="submit" onClick={handlePost}>
            Post
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default CreatePost;
