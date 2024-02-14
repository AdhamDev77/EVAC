import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import React, { createContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MultiSelect } from "react-multi-select-component";
import '../styles/Search.css'
import { Context } from '../App';

function Search() {

  let searchResults = document.querySelector('.search_results')

  const navigate = useNavigate();
    const [searchParams, setSearchParams] = useState({});
    const [locationArr, setLocationArr] = useState(Array);
    const [location, setLocation] = useState();
    const [minPrice, setMinPrice] = useState(Number);
    const [maxPrice, setMaxPrice] = useState(100000);
    const [rooms, setRooms] = useState('');
    const [type, setType] = useState('');
    
    const [propertyTypesCount, setPropertyTypesCount] = useState();

    const options = [
        { label: "Istanbul", value: "Istanbul" },
        { label: "Gazi Antep", value: "Gazi Antep" },
        { label: "Antalya", value: "Antalya" },
        { label: "Cyprus", value: "Cuprus" },
        { label: "Other", value: "Other" },
      ];

      useEffect(() => {
        setLocation(locationArr.map(option => option.value))
        setSearchParams({
            location,
            minPrice,
            maxPrice,
            rooms,
            type,
        })
      })


        const [propertyTypes, setPropertyTypes] = useContext(Context);
     

      const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        searchParams.location.forEach(location => {
          formData.append('locationArr', location);
        });
        formData.append('minPrice', searchParams.minPrice);
        formData.append('maxPrice', searchParams.maxPrice);
        formData.append('rooms', searchParams.rooms);
        formData.append('type', searchParams.type);
        try {
            const response = await axios.post('http://localhost:4000/api/property/search', formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            setPropertyTypes(response.data.properties)
            setPropertyTypesCount(response.data.count)
            console.log(propertyTypes)
            searchResults.classList.add("vis");
            navigate('/property');
        } catch (error) {
            console.error(error);
        };
      };
  return (
    <div className='home_search_filter'>
    <div className='search_section'>
      <div class="wrap">
      <h2 className='search_title'>Where do you want to live ?</h2>
      <div class="search">
        <MultiSelect
          options={options}
          value={locationArr}
          onChange={setLocationArr}
          labelledBy="Where do you want to live?"
        />
      <button type="submit" class="searchButton" onClick={handleSubmit}>
        <i class="fa fa-search"></i> Search
    </button>
    </div>
    </div>
    </div>
      <div className='home_search_filter_container'>
    <div className='home_search_filter_item'>
      <label>Property Type</label>
    <select
    value={type}
    onChange={(e) => setType(e.target.value)}
    >
        <option value="" selected>Any</option>
        <option value="House">House</option>
        <option value="Stand Alone">Stand Alone</option>
        <option value="Villa">Villa</option>
        <option value="Land">Land</option>
      </select>
      <p className='search_results'>results: {propertyTypesCount}</p>
      </div>

      <div className='home_search_filter_item'>
        <label>Min Price</label>
        <input
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        placeholder=''></input>
      </div>
      <div className='home_search_filter_item'>
        <label>Max Price</label>
        <input
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        placeholder=''></input>
      </div>
      <div className='home_search_filter_item'>
        <label>Rooms</label>
        <select
        value={rooms}
        onChange={(e) => setRooms(e.target.value)}
        >
          <option value="" >Any</option>
          <option value="1+0" >1+0</option>
          <option value="1+1">1+1</option>
          <option value="2+1">2+1</option>
          <option value="3+2">3+2</option>
          <option value="4+1">4+1</option>
          <option value="more">أكثر</option>
        </select>
      </div>
    </div>
    </div>
  )
}

export default Search
