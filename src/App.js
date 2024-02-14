import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import CreateAd from './components/CreateAd'
import Property from './components/Property';
import Single_prop from './components/Sigle_prop';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Profile from './components/Profile';
import Profile_fav from './components/Profile_fav';
import Profile_edit from './components/Profile_edit';

function App() {
  const [propertyTypes, setPropertyTypes] = useState();
  
  return (
    <div className="App">
        <Context.Provider value={[propertyTypes,setPropertyTypes]}>
      <Router>
        <Navbar />
        <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateAd />} />
        <Route path="/" element={<Home />} />
        <Route path="/property" element={<Property />} />
        <Route path="/property/:id" element={<Single_prop />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/favourites" element={<Profile content={<Profile_fav/>} />} />
        <Route path="/profile/edit" element={<Profile content={<Profile_edit/>} />} />
        </Routes>
        <Footer />
      </Router>
        </Context.Provider>
    </div>
  );
}

export default App;
export const Context = React.createContext();
