import {useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import '../styles/createad.css'

function Login() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const handlePost = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/users/login', user, {
            });
            localStorage.setItem("accessToken", response.data.token)
            localStorage.setItem("_id", response.data.user._id)
            localStorage.setItem("username", response.data.user.username)
            localStorage.setItem("email", response.data.user.email)
            localStorage.setItem("phone", response.data.user.phone)
            navigate('/property');
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

return (
    <div className="create_body">
        <form onSubmit={handlePost} enctype="multipart/form-data">
        <div className='user_info_section'>
        <h3>تسجيل دخول</h3>
        <div className='sign_element'>
            <label>البريد الالكتروني</label>
            <input onChange={handleChange} name="email" type="email"></input>
        </div>
        <div className='sign_element'>
            <label>كلمة المرور</label>
            <input onChange={handleChange} name="password" type="password"></input>
        </div>
        </div>
        <button className='submit_btn' type='submit'>تسجيل</button>
        <a href='/property'>ليس لديك حساب ؟</a>
        </form>
        <Toaster
  position="top-right"
  reverseOrder={false}
/>
    </div>
)
}

export default Login
