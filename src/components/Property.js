import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Context } from '../App';
import Search from './Search';
import Multiselect from 'multiselect-react-dropdown';
import rangeSlider from 'range-slider-input';
import 'range-slider-input/dist/style.css';
import '../styles/property.css'

function Property() {
  const [propertyTypes, setPropertyTypes] = useContext(Context);
  const accessToken = localStorage.getItem("accessToken")
  const user_id = localStorage.getItem("_id")



  const [loading, setLoading] = useState(false);
  const [property, setProperty] = useState([]);
  const [favProperty, setFavProperty] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [location, setLocation] = useState('');
  const [minSquare, setMinSquare] = useState('');
  const [maxSquare, setMaxSquare] = useState('');
  const [rooms, setRooms] = useState('');
  const [minBedrooms, setMinBedrooms] = useState('');
  const [maxBedrooms, setMaxBedrooms] = useState('');
  const [minBathrooms, setMinBathrooms] = useState('');
  const [maxBathrooms, setMaxBathrooms] = useState('');
  const [isFurnitured, setIsFurnitured] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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

  

  const isFavorited = (productId) => {
    return favProperty.some(prop => prop._id === productId);
  };

  useEffect(() => {
      const filtered = propertyTypes.filter((item) => {
        return (
          (minPrice === '' || item.price >= Number(minPrice)) &&
          (maxPrice === '' || item.price <= Number(maxPrice)) &&
          (location === '' || item.location === location) &&
          (minSquare === '' || item.square >= Number(minSquare)) &&
          (maxSquare === '' || item.square <= Number(maxSquare)) &&
          (isFurnitured === '' || item.isFurnitured === isFurnitured) &&
          (rooms === '' || item.rooms === rooms) &&
          (minBedrooms === '' || item.bedrooms >= Number(minBedrooms)) &&
          (maxBedrooms === '' || item.bedrooms <= Number(maxBedrooms)) &&
          (minBathrooms === '' || item.bathrooms >= Number(minBathrooms)) &&
          (maxBathrooms === '' || item.bathrooms <= Number(maxBathrooms))
        );
      }, [minPrice, maxPrice, location, minSquare, maxSquare, minBedrooms, maxBedrooms, minBathrooms, maxBathrooms, rooms, isFurnitured]);
  
      setFilteredItems(filtered);
    })


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    paginate(1)
    switch (name) {
      case 'minPrice':
        setMinPrice(value);
        break;
      case 'maxPrice':
        setMaxPrice(value);
        break;
      case 'location':
        setLocation(value);
        break;
      case 'minSquare':
        setMinSquare(value);
        break;
      case 'maxSquare':
        setMaxSquare(value);
        break;
      case 'minBedrooms':
        setMinBedrooms(value);
        break;
      case 'maxBedrooms':
        setMaxBedrooms(value);
        break;
      case 'minBathrooms':
        setMinBathrooms(value);
        break;
      case 'maxBathrooms':
        setMaxBathrooms(value);
        break;
      case 'rooms':
        setRooms(value);
        break;
      case 'isFurnitured':
        setIsFurnitured(value);
        break;
      default:
        break;
    }
  };

  const handleAddFav = async (e, prop_id) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await axios.post(`https://evac-backend.onrender.com/api/favourite/add/${prop_id}`, { user_id: user_id });
      setFavProperty(prevState => [...prevState, { _id: prop_id }]);
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  };

  const handleRemoveFav = async (e, prop_id) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await axios.post(`https://evac-backend.onrender.com/api/favourite/remove/${prop_id}`, { user_id: user_id });
      setFavProperty(prevState => prevState.filter(prop => prop._id !== prop_id));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const renderPagination = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3; // Adjust this number to control how many page numbers are visible at a time
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    
    // Calculate start and end page numbers based on current page
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust startPage and endPage if necessary to ensure maxVisiblePages is displayed
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <footer className='pagination' aria-label="Page navigation">
        <ul>
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          {pageNumbers.map(number => (
            <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
              <button
                onClick={() => paginate(number)}
                className="page-link"
              >
                {number}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </footer>
    );
  };
  

      const PropertyList = () => {
        return (
          currentItems.map(prop => (
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
                  <></>
                  )}
                  <div className='prop_img'>
                  <img key={prop.main_image} src={`https://evac-backend.onrender.com/${prop.main_image}`} alt="Property" />
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
      )))};

  return (
    <div className='property_body'>
      <Search />
    <div className='property_container'>
    <div className='prop_container'>
      <PropertyList />
      {renderPagination()}
    </div>
    <div className='filter_container'>
        <div className='single_filter'>
        <div className='comp_filter'>
        <label>Min Square</label>
        <input type="number" onChange={handleInputChange} name='minSquare' />
        </div>
        <div className='comp_filter'>
        <label>Max Square</label>
        <input type="number" onChange={handleInputChange} name='maxSquare' />
        </div>
        </div>
        <div className='single_filter'>
        <div className='comp_filter'>
        <label>Min Bedrooms</label>
        <input type="number" onChange={handleInputChange} name='minBedrooms' />
        </div>
        <div className='comp_filter'>
        <label>Max Bedrooms</label>
        <input type="number" onChange={handleInputChange} name='maxBedrooms' />
        </div>
        </div>
        <div className='single_filter'>
        <div className='comp_filter'>
        <label>Min Bathrooms</label>
        <input type="number" onChange={handleInputChange} name='minBathrooms' />
        </div>
        <div className='comp_filter'>
        <label>Mix Bathrooms</label>
        <input type="number" onChange={handleInputChange} name='maxBathrooms' />
        </div>
        </div>

        <div className='location_filter'>
        <label>Furniture</label>
        <select onChange={handleInputChange} name="isFurnitured">
                <option value="" selected>Any</option>
                <option value="Furnitured" >Furnitured</option>
                <option value="Not Furnitured">Not Furnitured</option>
            </select>
        </div>
        {/*<div id="range-slider"></div>*/}
      </div>
    </div>
    </div>
  )
}

export default Property
