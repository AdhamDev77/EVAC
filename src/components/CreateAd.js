import axios from 'axios'
import '../styles/createad.css'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import React, { useRef, useEffect, useState } from 'react';


function CreateAd() {



    const [selectedPhotos, setSelectedPhotos] = useState([])
    const [phoneNumber, setPhoneNumber] = useState("")
    const [value, setValue] = useState('')
    const [property, setProperty] = useState({
        title: '',
        location: 'istanbul',
        type: 'flat',
        square: '',
        rooms: '',
        bedrooms: '',
        bathrooms: '',
        isFurnitured: "Furnitured",
        price: '',
        uploader_name: ''
    });

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedPhotos((prevPhotos) => [...prevPhotos, ...files]);
    };

    const handleDeletePhoto = (e,photo) => {
        e.preventDefault()
        setSelectedPhotos(oldValues => {
            return oldValues.filter(pho => pho !== photo)
          })
          console.log(selectedPhotos)
    }
    

    const handlePost = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
    
            // Append selected photos to formData
            selectedPhotos.forEach((photo) => {
                formData.append(`images`, photo);
            });
    
            // Append other properties to formData
            for (const key in property) {
                formData.append(key, property[key]);
            }
    
            // Append phoneNumber
            formData.append('uploader_number', phoneNumber);
            formData.append('description', value);
            console.log(formData)
            const response = await axios.post('https://evac-backend.onrender.com/api/property/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProperty(prevProperty => ({
            ...prevProperty,
            [name]: value
        }));
        console.log(property)
    };
return (
    <div className="create_body">
        <form onSubmit={handlePost} enctype="multipart/form-data">
            <div className='photo_section'>
                <h3>ارفع صور للعقار</h3>
        <label className='photo_input' htmlFor="fileInput">
            <i class="fa-regular fa-image"></i>
            <span>اختر الصور ( حد أقصي 10 صور )</span>
            <input
                type="file"
                id="fileInput"
                accept="image/*"
                name='images'
                onChange={handleFileChange}
                multiple
            />
            </label>
            <hr/>
            <ul className='photo_list'>
  {selectedPhotos.length === 0 && (
    <h3>لم يتم رفع أي صور بعد</h3>
  )}
  {selectedPhotos.map((photo, index) => (
    <li key={index}>
        <button onClick={(e) => handleDeletePhoto(e,photo)}><i class="fa-solid fa-x"></i></button>
        <img className='preview' src={URL.createObjectURL(photo)} />
    </li>
  ))}
</ul>
        </div>
        <div className='info_section'>
        <h3>بيانات الاعلان</h3>
        <div className='sign_element'>
            <label>عنوان الاعلان</label>
            <input onChange={handleChange} name='title' type="text"></input>
        </div>
        <div className='sign_element'>
            <label>وصف الاعلان</label>
            <ReactQuill theme="snow" value={value} onChange={setValue} />
        </div>
        <div className='row_container'>

            
        <div className='row'>
        <div className='sign_element'>
            <label>عدد غرف النوم</label>
            <input onChange={handleChange} name='bedrooms' type="number"></input>
        </div>
        
        <div className='sign_element'>
            <label>عدد الحمامات</label>
            <input onChange={handleChange} name='bathrooms' type="number"></input>
        </div>
        </div>

        <div className='row'>
        <div className='sign_element'>
            <label>عدد الغرف</label>
            <select onClick={handleChange} name="rooms">
                <option value="1+0" selected>1+0</option>
                <option value="1+1">1+1</option>
                <option value="2+1">2+1</option>
                <option value="3+2">3+2</option>
                <option value="4+1">4+1</option>
                <option value="more">أكثر</option>
            </select>
        </div>
        
        <div className='sign_element'>
            <label>مفروش</label>
            <select onChange={handleChange} name="isFurnitured">
                <option value="Furnitured" selected>نعم</option>
                <option value="Not Furnitured">لا</option>
            </select>
        </div>
        </div>

        <div className='row'>
        <div className='sign_element'>
            <label>المكان</label>
            <select onClick={handleChange} id="city" name="location">
                <option value="istanbul" selected>اسطنبول</option>
                <option value="gaziantep">غازي عنتاب</option>
                <option value="antalya">أنطاليا</option>
                <option value="northern_cyprus">قبرص التركية</option>
                <option value="other">أخري</option>
            </select>
        </div>
        
        <div className='sign_element'>
            <label>نوع العقار</label>
            <select onChange={handleChange} id="type" name="type">
                <option value="flat" selected>شقة</option>
                <option value="stand alone">ستاند ألون</option>
                <option value="villa">فيلا</option>
                <option value="land">أرض</option>
                <option value="other">أخري</option>
            </select>
        </div>
        </div>

        <div className='row'>
        <div className='sign_element'>
            <label>مساحة العقار</label>
            <input onChange={handleChange} name='square' type="number" placeholder='متر مربع'></input>
        </div>
        <div className='sign_element'>
            <label>سعر الايجار الشهري</label>
            <input onChange={handleChange} name='price' type="number" placeholder='₺'></input>
        </div>
        </div>

        </div>
        </div>
        <div className='user_info_section'>
        <h3>بيانات صاحب الاعلان</h3>
        <div className='sign_element'>
            <label>الاسم</label>
            <input onChange={handleChange} name="uploader_name" type="text"></input>
        </div>
        <div className='sign_element'>
            <label>رقم الهاتف</label>
            <PhoneInput
        placeholder="+90"
        value={phoneNumber}
        defaultCountry="TR"
        onChange={setPhoneNumber}/>
        </div>
        </div>
        <button className='submit_btn' type='submit'>أنشي الاعلان</button>
        </form>
    </div>
)
}

export default CreateAd
