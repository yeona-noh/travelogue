import React, { useState,useRef } from 'react';
import emailjs from '@emailjs/browser';
import Header from '../components/Header'
import Intro from '../components/Intro'
import Footer from '../components/Footer'
import './contact.css'
import dotenv from 'dotenv';
dotenv.config();


const Contact = () => {
  const SERVICE_ID = process.env.SERVICE_ID
  const TEMPLATE_ID = process.env.TEMPLATE_ID
  const PUBLIC_KEY = process.env.PUBLIC_KEY

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
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
      },
      function (error) {
        console.log("FAILED...", error);
      }
    );
    setName("");
    setEmail("");
    setMessage("");
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

        </div>
        <Footer />
    </div>
  )
}

export default Contact
