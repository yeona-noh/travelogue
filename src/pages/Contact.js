import React, { useState,useRef } from 'react';
import emailjs from '@emailjs/browser';
import Header from '../components/Header'
import Intro from '../components/Intro'
import Footer from '../components/Footer'
import './contact.css'



const Contact = () => {
  const SERVICE_ID = process.env.REACT_APP_SERVICE_ID
  const TEMPLATE_ID = process.env.REACT_APP_TEMPLATE_ID
  const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [notification, setNotification] = useState({message:"", type:""})
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
  
    const templateparams = {
      from_name: name,
      user_name: name,
      user_email: email,
      message: message,
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateparams, PUBLIC_KEY).then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
        setNotification({message:"Message sendt successfully!", type:"success"})
      },
      function (error) {
        console.log("FAILED...", error);
        setNotification({message: "Failed to send message. please try again.", type:"error"})
      }
    );
    setName("");
    setEmail("");
    setMessage("");

    setTimeout(() => {
      setNotification("")
    },10000)
    
  };
  

  return (
    <div className='contact'>
        <Header />
        <Intro />
        <div className='contact-container'>
          <h1>Get in Touch</h1>
          <img className='contact-img' src='../img/email.png' />

          <form className='contact-form' ref={form} onSubmit={sendEmail}>
            <input type='text' name='user_name' value={name} placeholder='Name'                  
              onChange={(e) => {
                setName(e.target.value);
                  }}
                  />
            <input type='email' name='user_email' value={email} placeholder='Email address'
            onChange={(e) => {
              setEmail(e.target.value);
                }}
            />
            <textarea name='message' value={message} placeholder='Message'
            onChange={(e) => {
              setMessage(e.target.value);
                }}
            />
            <input className='button' type="submit" value="Send" />
          </form>
                {notification.message && (
                  <div className={`notification ${notification.type}`}>
                    {notification.message}
                  </div>
                )}
        </div>
        <Footer />
    </div>
  )
}

export default Contact
