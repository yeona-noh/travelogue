import axios from "axios";
import React, { useEffect, useState } from "react";
import "./popup.css";

function Popup({ trigger, setTrigger, id }) {
  const [popUpData, setPopUpData] = useState();

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/posts/posts/${id}`);
        setPopUpData(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error, "popup line10");
      }
    };

    getPost(); 
  }, [id]);

  return trigger ? (
    <div>
      <h1>pop up</h1>
      <button onClick={() => setTrigger(false)}>close</button>
      <h2>{popUpData.place}</h2>
      <p>{popUpData.date.split("T")[0]}</p>
      <p>{popUpData.post}</p>
    </div>
  ) : (
    ""
  );
}

export default Popup;
