import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './Search'
import homepage from '../assets/homepage.jpg'
import Istanbul from '../assets/Istanbul.jpg'
import Gazi from '../assets/Gazi.png'
import Antakya from '../assets/Antakya.jpg'
import Cyprus from '../assets/Cyprus.jpg'
import home_buy from "../assets/home_buy.svg"
import home_sell from "../assets/home_sell.svg"
import home_filter from "../assets/home_filter.svg"
import '../styles/home.css'
import Mobile from './Mobile';

function Home() {

  const [property, setProperty] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const propertyResponse = await axios.get(`http://localhost:4000/api/property`);
        setProperty(propertyResponse.data.slice(0,4));
      } catch (error) {
        console.error('Error fetching property:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    document.title = "HOME - EVAÇ"
  }, [])

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

  const PropertyList = () => {
    return (
      property.map(prop => (
        
            <a href={`/property/${prop._id}`} className='prop'>
              <div className='prop_img'>
              <img key={prop.main_image} src={`http://localhost:4000/${prop.main_image}`} alt="Property" />
              </div>
              <div className='prop_info'>
                <h1 className='title_info'>{prop.title}</h1>
                <h1 className='location_info'>{prop.location}</h1>
                <div className='lower_info'>
                <h1 className='type_info'><i class="fa-solid fa-house"></i> {prop.type}</h1>
                <h1 className='square_info'><i class="fa-regular fa-square"></i> {prop.square} m2</h1>
                <h1 className='square_info'><i class="fa-solid fa-cube"></i> {prop.rooms}</h1>
                </div>
                <h1 className='price_info'>₺ {prop.price}</h1>
        </div>
            </a>
  )))};

  return (
    <>
      <div className='home_body'>
        {property ? (
          <>
                <div style={{ backgroundImage: `url(${homepage})`,backgroundSize: 'cover',backgroundPosition: '0 -60px'}} className='hero_section'>
              <Search />
              </div>
                <div className='home_container'>
                  <div className='intro_body'>
                    <h1 className='home_title'>Newest Properties</h1>
                    <div className='intro_container'>
                      <div className='intro_card'>
                        <img src={home_buy}></img>
                        <h3>Looking to buy?</h3>
                        <p>Get all the information you need when buying a property with our comprehensive property guides.</p>
                        <button>Browse</button>
                      </div>
                      <div className='intro_card'>
                        <img src={home_sell}></img>
                        <h3>Looking to sell?</h3>
                        <p>Get all the information you need when selling a property with our comprehensive property guides.</p>
                        <button>Create Ad</button>
                      </div>
                      <div className='intro_card'>
                        <img src={home_filter}></img>
                        <h3>Searching for home?</h3>
                        <p>Get ability for a smart filter to find your specific dream home.</p>
                        <button>Browse</button>
                      </div>
                    </div>
                  </div>
                  <div className='newest_body'>
                    <h1 className='home_title'>Newest Properties</h1>
                    <div className='newest_container'>
                      <PropertyList />
                    </div>
                    <a className='show_more' href="/property">Show more ...</a>
                  </div>
                  <div className='locations_body'>
                    <h1 className='home_title'>Featured Locations</h1>
                    <div className='locations_container'>
                      <button style={{ backgroundImage: `url(${Istanbul})`, backgroundSize: "cover"}} className='location'><h2>Istanbul</h2></button>
                      <button style={{ backgroundImage: `url(${Gazi})`, backgroundSize: "cover"}} className='location'><h2>Gazi Antep</h2></button>
                      <button style={{ backgroundImage: `url(${Antakya})`, backgroundSize: "cover"}} className='location'><h2>Antakya</h2></button>
                      <button style={{ backgroundImage: `url(${Cyprus})`, backgroundSize: "cover"}} className='location'><h2>Cyprus</h2></button>
                    </div>
                  </div>
                </div>
                </>
        ):(<></>)}
    </div>
    <Mobile />
    </>
  )
}

export default Home
