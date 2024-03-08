import React from 'react'
import "./footer.css"

function Footer() {
    const year = new Date().getFullYear()
  return (
    <div className='footerContainer'>
      <p>copyright ⓒ {year} Travelogue</p>
    </div>
  )
}

export default Footer
