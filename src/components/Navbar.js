import logo_full from '../assets/logo_full.png'
import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import '../styles/navbar.css'

function Navbar() {
    const [age, setAge] = React.useState('');

  const handleChange = (e) => {
    setAge(e.target.value);
  };

  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken")
  const file = localStorage.getItem("file")
  const isMos = localStorage.getItem("isMos")
  const handleSettingsClick = (e) => {
    const settingsDropdown = document.querySelector('.settings-dropdown');
    settingsDropdown.classList.toggle('toggle');
    };
    const handleProfileLink = (e) => {
      console.log("settings")
      };
      const handleLogout = (e) => {
        navigate("/")
        localStorage.clear()
        window.location.reload()
        };
  return (
      <nav>
      <div className='nav_container'>
        <div className='nav_first'>
        <Link to="/">
        <img src={logo_full}></img>
        </Link>
        <ul className='main_ul'>
            <li><Link to="/property">Lands</Link></li>
            <li><Link to="">Villa</Link></li>
            <li><Link to="">House</Link></li>
        </ul>
        </div>
        <div className='nav_last'>
        {accessToken ? (<>
            <button onClick={handleLogout} className='links'>تسجيل خروج</button>
            <Link className='links' to="/create">اضافة اعلان</Link>
            <Link to="/profile/favourites"><i class="fa-solid fa-user"></i></Link>
            </>
            ) : (
              <>
            <Link className='links' to="/signup">Register</Link>
            </>
            )}
        
        </div>
        
        <div id="menuToggle">
    <input type="checkbox" />
    <span></span>
    <span></span>
    <span></span>
    <ul id="menu">
    <Link to="/property">سكن طلاب</Link>
    <Link to="">شقق</Link>
    <Link to="">فيلا</Link>
    </ul>
    </div>
    </div>
    </nav>
    
)
}

export default Navbar
