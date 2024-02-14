import React from 'react'
import '../styles/mobile.css'
import phone from '../assets/phone.png'

function Mobile() {
  return (
    <div className='mobile_body'>
        <div className='mobile_container'>
            <img src={phone}></img>
            <h1>The Website will be available for smaller devices</h1>
            <span>SOON</span>
        </div>
    </div>
  )
}

export default Mobile
