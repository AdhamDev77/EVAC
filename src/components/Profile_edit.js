import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

function Profile_edit() {
  const navigate = useNavigate();
  const user_id = localStorage.getItem("_id")
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    phone: ''
  });

  const [user, setUser] = useState();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://evac-backend.onrender.com/api/users/${user_id}`);
        setUser(response.data);
        setFormData({
          username: response.data.username,
          phone: response.data.phone
        });
      } catch (error) {
        console.error('Error fetching property:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    console.log(formData)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make API call to update user details
      await axios.patch(`https://evac-backend.onrender.com/api/users/${user_id}`, formData);
      toast.success("Your Details Updated Successfully")
      localStorage.setItem("username", formData.username)
      localStorage.setItem("phone", formData.phone)
    } catch (error) {
      console.error('Error updating user details:', error);
      toast.error("Something Wrong Happened")
    }
  };
  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      // Make API call to update user details
      await axios.delete(`https://evac-backend.onrender.com/api/users/${user_id}`);
      localStorage.clear()
      navigate("/")
    } catch (error) {
      console.error('Error updating user details:', error);
      toast.error("Something Wrong Happened")
    }
  };

  return (
    <div className='fav_body edit'>
      {user ? (
        <>
            <form onSubmit={handleSubmit} className='edit_form'>
            <h1 className='profile_title'>Profile Details</h1>
              <div className='edit_item'>
              <label>Name *</label>
              <input onChange={handleChange} value={formData.username} name="username" type="text"></input>
              </div>
              <div className='edit_item'>
              <label>Mobile Number *</label>
              <input onChange={handleChange} value={formData.phone} name="phone" type="text"></input>
              </div>
              <div className='edit_item'>
              <label>Email Address *</label>
              <p className='edit_email'>{user.email}</p>
              </div>
              <button className='edit_btn' type='submit'>Save Details</button>
            </form>
            <form onSubmit={handleDelete} className='edit_form'>
            <h1 className='profile_title'>Delete Account</h1>
            <h2>If you would like to delete your EVAÇ account, you can start the process here.</h2>
            <button className='edit_btn' type='submit'>Delete Account</button>
            </form>
            <Toaster
            position="top-right"
            reverseOrder={false}
            />
            </>
      ):(
        <>LOADING ...</>
      )}

  </div>
  )
}

export default Profile_edit
