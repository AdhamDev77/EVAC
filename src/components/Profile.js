import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/profile.css'

function Profile(props) {

  return (
    
    <div className='profile_body'>
                    <div className='profile_nav'>
                    <div className='profile_nav_container'>
                <h1>My EVAÇ</h1>
                <ul className='profile_nav_list'>
                    <li><Link to="/profile/favourites">Favourites</Link></li>
                    <li><Link to="/profile/edit">Profile</Link></li>
                </ul>
            </div>
            </div>
        <div className='profile_container'>
            {props.content}
        </div>
    </div>
    
  )
}

export default Profile
