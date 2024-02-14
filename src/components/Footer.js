import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import logo_full from '../assets/logo_full_white.png'
import '../styles/footer.css'

function Footer() {
  return (
    <footer className='footer_body'>
    <div className='footer_container'>
        <div className='footer_nav'>
            <img src={logo_full}></img>
            <div className='footer_nav_columns'>
            <ul className='location_column'>
                <li><h2>Locations</h2></li>
                <li><Link to="istanbul">Istanbul</Link></li>
                <li><Link to="gaziantep">Gazi Antep</Link></li>
                <li><Link to="antalya">antalya</Link></li>
                <li><Link to="northern_cyprus">Northen Cyprus</Link></li>
            </ul>
            <ul className='type_column'>
                <li><h2>Properties</h2></li>
                <li><Link to="istanbul">Flat</Link></li>
                <li><Link to="gaziantep">Stand Alone</Link></li>
                <li><Link to="antalya">Villa</Link></li>
                <li><Link to="northern_cyprus">Land</Link></li>
            </ul>
        </div>
        </div>
        <div className='footer_email'>
            <h2>Newsletter</h2>
            <input className='email_input' type="email" placeholder='Your email here'></input>
            <button>Send</button>
            <div className='email_check'>
            <input type="checkbox"></input>
            <p>By checking the box, you agree that you are at least 16 years of age.</p>
            </div>
        </div>
    </div>
    <hr />
    <div className='footer_footer'>
        <div className='footer_footer_list'>
        <Link to="">Website Terms</Link>
        <Link to="">Privacy Policy</Link>
        <Link to="">CA Transparency in Suppy Chains Act</Link>
        <Link to="">Supplier Code of Consuct</Link>
        <Link to="">Marketing to Children</Link>
        <Link to="">Don't Sell my Information</Link>
        </div>
        
        <div className='footer_footer_copyright'>
        <p>&copy; 2024 EVAÇ TR, Inc. All rights reserved.</p>
        </div>
    </div>
    </footer>
  )
}

export default Footer
