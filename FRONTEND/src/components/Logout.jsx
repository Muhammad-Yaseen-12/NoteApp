import axios from 'axios';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

function Logout() {
  const navigate = useNavigate();
  const { setIsUser } = useContext(AuthContext);
  const [api, contextHolder] = notification.useNotification();

  const logoutUser = async () => {
    try {
      let res = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/logout`, {
        withCredentials: true
      });
      console.log(res);

      // Token remove
      localStorage.removeItem('token');

      setIsUser(false);
      navigate('/login');


    } catch (err) {
      api.error({
        message: 'Logout Failed',
        description: err.response?.data?.message || 'Something went wrong',
        placement: 'topRight',
      });
    }
  };


  return (
    <>
      {contextHolder}
      <button onClick={logoutUser} style={{ color: 'white', fontWeight: 'bold', background: 'transparent', border: 'none', cursor: 'pointer' }}>
        Logout
      </button>
    </>
  );
}

export default Logout;
