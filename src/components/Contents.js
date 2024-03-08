import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./contents.css"

function Contents() {

  const [posts, setPosts] = useState([])

useEffect(() => {
    getContent()
  },[])

    const getContent = async () => {
        try {
            let res = await axios.get("http://localhost:5001/")
            console.log(res.data)
            setPosts(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    
  return (
    <div className="container">
      <div className='eachPost'>
      
      {posts.map((post) => (
        <div className='titlePost' key={post.id}>
          <h2 className='place'>{post.place}</h2>
          <h2 className='date'>{post.date.split("T")[0]}</h2>
          <h3 className='story'>{post.post}</h3>
        </div>
        )
      )}
        
      </div>
    </div>
  )
}

export default Contents;
