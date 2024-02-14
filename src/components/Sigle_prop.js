import {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import '../styles/single_prop.css'


function Sigle_prop() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false)
    const [property, setProperty] = useState()
    const [propertyDes, setPropertyDes] = useState()
    const [phoneDisplay, setPhoneDisplay] = useState("أظهر رقم المعلن")
    const [newImagesArray, setNewImagesArray] = useState([])

    useEffect(() => {
        setLoading(true)
        const fetchData = async (categoryID) => {
            try {
                const response = await axios.get(`http://localhost:4000/api/property/${id}`)
                setProperty(response.data)
                setNewImagesArray(response.data.imagesArray.map(item => 'http://localhost:4000/' + item))
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
            setLoading(false);
        }
        fetchData();
    }, []);
    
    
    const handlePhoneDisplay = (e, number) => {
        e.preventDefault()
        if(phoneDisplay != number){
            setPhoneDisplay(number)
        }else{
            setPhoneDisplay("أظهر رقم المعلن")
        }
        
    }



  return (
    <>
    {property ? (
    <div className='single_body'>
    <div className='single_container'>
        <div className='slider_container'>
            <Slide>
            {newImagesArray.map((image, index) => (
                <div className="each-slide-effect" key={index}>
                <img src={image} alt={`Slide ${index + 1}`} />
                <footer>{index+1}/{newImagesArray.length}</footer>
                </div>
        ))}
        </Slide>
        </div>
        <div className='prop_container_in'>
        <div className='prop_info'>
            <div className='prop_info_1'>
            <h1 className='price_info'>₺ {property.price}</h1>
            <h1 className='title_info'>{property.title}</h1>
            <div className='lower_info'>
                    <h1 className='location_info'><i class="fa-solid fa-location-dot"></i> {property.location}</h1>
                    <h1 className='type_info'><i class="fa-solid fa-house"></i> {property.type}</h1>
                    <h1 className='square_info'><i class="fa-regular fa-square"></i> {property.square} m2</h1>
                    <h1 className='square_info'><i class="fa-solid fa-cube"></i> {property.rooms}</h1>
                    <h1 className='square_info'><i class="fa-solid fa-bed"></i> {property.bedrooms}</h1>
                    <h1 className='square_info'><i class="fa-solid fa-bath"></i> {property.bathrooms}</h1>
                    <h1 className='square_info'><i class="fa-solid fa-chair"></i> {property.isFurnitured}</h1>
                    </div>
            </div>
            <div id='p' className='prop_info_2' dangerouslySetInnerHTML={{ __html: property.description }} >
            </div>
            <div className='prop_info_1 lower'>
        <div className='lower_info'>
                    <h1 className='location_info'><i class="fa-solid fa-location-dot"></i> {property.location}</h1>
                    <h1 className='square_info'><i class="fa-solid fa-cube"></i> {property.rooms}</h1>
                    <h1 className='square_info'><i class="fa-regular fa-square"></i> {property.square} m2</h1>
                    <h1 className='square_info'><i class="fa-solid fa-bed"></i> {property.bedrooms} Bedrooms</h1>
                    <h1 className='square_info'><i class="fa-solid fa-bath"></i> {property.bathrooms} Bathrooms</h1>
                    <h1 className='square_info'><i class="fa-solid fa-chair"></i> {property.isFurnitured}</h1>
                </div>
        </div>

        <div className='prop_photos'>
            
        {newImagesArray.map((image, index) => (
                <div className="prop_photos_photo">
                <img src={image}/>
                </div>
        ))}
        </div>

        </div>
        <div className='prop_contact'>
            <h1>تواصل مع المعلن</h1>
            <h2><span>الاسم: </span>{property.uploader_name}</h2>
            <button onClick={(e) => handlePhoneDisplay(e, property.uploader_number)}><i class="fa-solid fa-phone"></i>{phoneDisplay}</button>
        </div>
        </div>
        </div>
    </div>
    ):(
        <>LOADING</>
    )}
    </>
  )
}

export default Sigle_prop
