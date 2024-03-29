import React,{useState,useContext} from 'react'
import Header from '../components/Header'
import Intro from '../components/Intro'
import Footer from '../components/Footer'
import { authContext } from '../context/authContext'
import './createpost.css'
import axios from 'axios'

function CreatePost() {

    const [date, setDate] = useState()
    const [place, setPlace] = useState()
    const [post, setPost] = useState()
    const {authToken} = useContext(authContext)
    const handlePost = async(e) => {
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:5001/post",    
            {
                date: date,
                place: place,
                post: post,
            },
            {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            }
                
            )
            console.log(res.data)
            setDate("")
            setPlace("")
            setPost("")
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='createPost-container'>
        <Header />
        <Intro />
    <div className='create-container'>
      <h1 className='create-title'>Write a post</h1>

        <form className='createPost-form'>

            <label className='create-label'>Travel Date</label>
            <input type='date' className='travel-date' name='date' value={date} 
                onChange={(e) => setDate(e.target.value)} required
            />

            <label className='create-label' >Travel Place</label>
            <input type='text' className='travel-place' value={place}
                onChange={(e) => setPlace(e.target.value)} required
            />

            <label className='create-label'>Post</label>
            <textarea className='travel-post' value={post}
                onChange={(e) => setPost(e.target.value)} required
            />

            <button className='create-button' type='submit' onClick={handlePost}>Post</button>

        </form>
    </div>
        <Footer />
    </div>
  )
}

export default CreatePost
