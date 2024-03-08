import React from 'react'
import Header from '../components/Header'
import Intro from '../components/Intro'
import Footer from '../components/Footer'
import './about.css'
const About = () => {
  return (
    <div className='about'> 
        <Header />
        <Intro />
        <div className='about-container'>
          <h1>About me</h1>
          <div className='about-content'>
            <img className='about-img' src='../../img/Aya Takano.jpeg' />
            <p>Amet sunt deserunt nostrud labore incididunt fugiat Lorem. Duis magna sit do aliqua labore velit ad esse laborum est. Voluptate commodo sit ad nulla commodo enim. Voluptate duis ullamco officia commodo ea sit in et.
              Sint nulla incididunt aliqua ullamco in ullamco labore. Ullamco culpa et dolore quis. Elit enim laborum commodo deserunt irure voluptate deserunt elit. Laborum veniam tempor cupidatat nostrud qui officia voluptate in amet. Sunt esse occaecat occaecat mollit.
              Aliqua veniam et nisi aute anim voluptate. Laborum culpa minim minim quis esse ut id. Et aliquip velit esse proident consequat voluptate incididunt duis commodo. Enim eiusmod nostrud nostrud aliqua eu elit. Eu occaecat nulla ipsum ipsum enim fugiat culpa et est proident. Mollit veniam adipisicing mollit veniam consectetur est aliqua reprehenderit velit amet ipsum deserunt minim.
            </p>
          </div>
        </div>
        <Footer />
    </div>
  )
}

export default About
