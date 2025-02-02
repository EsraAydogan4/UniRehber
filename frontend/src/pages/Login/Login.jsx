import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const loginUser = async (e) => {
    e.preventDefault();
    
    const { email, password } = data;
    try {
      const response = await axios.post('http://localhost:8000/login', { 
        email, 
        password
      });

      const result = response.data;

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success('Giriş başarılı');
        localStorage.setItem('user', JSON.stringify(result.user));
        navigate(`/profile/${result.user.id}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Giriş işlemi sırasında bir hata oluştu');
    }
  };

  return (
    <div className='login-box'>
      <form onSubmit={loginUser}>
        <label>Eposta</label>
        <input type="email" placeholder="eposta_adresi@mail.com..." value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })}></input>
        <label>Parola</label>
        <input type="password" placeholder="parola..." value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })}></input>
        <button type="submit">Giriş Yap</button>
      </form>
      <button onClick={() => navigate('/register')}>Kayıt Ol</button>

    </div>
  );
}
