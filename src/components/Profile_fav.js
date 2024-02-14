import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/profile.css';

function Profile_fav() {
  const [loading, setLoading] = useState(false);
  const [favProperty, setFavProperty] = useState([]);
  const accessToken = localStorage.getItem("accessToken");
  const user_id = localStorage.getItem("_id");

  const isFavorited = (productId) => {
    return favProperty.some(prop => prop._id === productId);
  };

  const handleAddFav = async (e, prop_id) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await axios.post(`http://localhost:4000/api/favourite/add/${prop_id}`, { user_id: user_id });
      setFavProperty(prevState => [...prevState, { _id: prop_id }]);
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  };

  const handleRemoveFav = async (e, prop_id) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await axios.post(`http://localhost:4000/api/favourite/remove/${prop_id}`, { user_id: user_id });
      setFavProperty(prevState => prevState.filter(prop => prop._id !== prop_id));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  function removeHtmlTagsAndFormat(description) {
    const plainText = description.replace(/<[^>]+>/g, '');
    return plainText.trim();
}

  const DescriptionComponent = ({ description, maxLength }) => {
    const descriptionText = removeHtmlTagsAndFormat(description);
    if (descriptionText.length > maxLength) {
      description = descriptionText.substring(0, maxLength) + "...";
    }

    return <h1 className='desc_info'>{description}</h1>;
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const favResponse = await axios.get(`http://localhost:4000/api/favourite/${user_id}`);
        setFavProperty(favResponse.data);
        console.log(favResponse.data)
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const PropertyList = () => {
    return (
      <>
      {favProperty.length != 0 ? (
        favProperty.map(prop => (
            <a href={`/property/${prop._id}`} className='prop'>
              {accessToken ? (
                <>
                {isFavorited(prop._id) ? (
                 <button onClick={(e) => handleRemoveFav(e,prop._id)} className='fav_remove'><i class="fa-solid fa-heart"></i></button>
                ) : (
                  <button onClick={(e) => handleAddFav(e,prop._id)} className='fav'><i class="fa-solid fa-heart"></i></button>
                )}
              
              </>
              ) : (
              <>
              </>
              )}
              <div className='prop_img'>
              <img key={prop.main_image} src={`http://localhost:4000/${prop.main_image}`} alt="Property" />
              </div>
              <div className='prop_info'>
                <h1 className='price_info'>₺ {prop.price}</h1>
                <h1 className='title_info'>{prop.title}</h1>
                <DescriptionComponent description={prop.description} maxLength={175} />
                <div className='lower_info'>
                <h1 className='location_info'><i class="fa-solid fa-location-dot"></i> {prop.location}</h1>
                <h1 className='type_info'><i class="fa-solid fa-house"></i> {prop.type}</h1>
                <h1 className='square_info'><i class="fa-regular fa-square"></i> {prop.square} m2</h1>
                <h1 className='square_info'><i class="fa-solid fa-cube"></i> {prop.rooms}</h1>
                </div>
        </div>
            </a>
  ))
      ):(
        <>
        <h1 className='no_fav_title'>No Favourites</h1>
        </>
      )}
      </>
      )};

  return (
    <div className='fav_body'>
      <h1 className='profile_title'>Favourite Properties</h1>
    <PropertyList />
    </div>
  );
}

export default Profile_fav;
