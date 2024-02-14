import {useState} from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/createad.css'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

function Signup() {
    const navigate = useNavigate();

    const [selectedPhotos, setSelectedPhotos] = useState([])
    const [phoneNumber, setPhoneNumber] = useState("")
    const [value, setValue] = useState('')
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        phone: '',
        gender: 'male',
    });

    

    const handlePost = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://evac-backend.onrender.com/api/users/signup', user, {
            });
            localStorage.setItem("accessToken", response.data.token)
            localStorage.setItem("_id", response.data.user._id)
            localStorage.setItem("username", response.data.user.username)
            localStorage.setItem("email", response.data.user.email)
            localStorage.setItem("phone", response.data.user.phone)
            navigate('/');
            //localStorage.setItem("mytime", Date.now());
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
        console.log(user)
    };
    const handlePhoneChange = (e) => {
        console.log(phoneNumber)
    };

return (
    <div className="create_body">
        <form onSubmit={handlePost} enctype="multipart/form-data">
        <div className='user_info_section'>
        <h3>تسجيل مستخدم</h3>
        <div className='sign_element'>
            <label>الاسم</label>
            <input onChange={handleChange} name="username" type="text"></input>
        </div>
        <div className='sign_element'>
            <label>البريد الالكتروني</label>
            <input onChange={handleChange} name="email" type="email"></input>
        </div>
        <div className='sign_element'>
            <label>كلمة المرور</label>
            <input onChange={handleChange} name="password" type="password"></input>
        </div>
        <div className='sign_element'>
            <label>رقم الهاتف</label>
            <input onChange={handleChange} name="phone" type="tel" placeholder='+90'></input>
        </div>
        <div className='sign_element'>
            <label>الجنس</label>
            <select onClick={handleChange} name="gender">
                <option value="male" selected>ذكر</option>
                <option value="female">أنثي</option>
                <option value="other">حاجة تانية</option>
            </select>
        </div>
        </div>
        <button className='submit_btn' type='submit'>تسجيل</button>
        <a href='/login'>هل لديك حساب ؟</a>
        </form>
        <Toaster
  position="top-right"
  reverseOrder={false}
/>
    </div>
)
}

export default Signup
