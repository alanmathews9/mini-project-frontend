import React, { useState } from 'react';
import styles from './login.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8000/login/', {
        email_id: email,
        password: password,
      });
      console.log(response.data);
      if (response.data.status === 'success') {
        localStorage.setItem('session_id', response.data.session_id);
        localStorage.setItem('email_id', response.data.email_id);
        router.push('/chat');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const url =
    'https://t4.ftcdn.net/jpg/04/60/71/01/360_F_460710131_YkD6NsivdyYsHupNvO3Y8MPEwxTAhORh.jpg';

  return (
    <div className={styles.container} style={{ backgroundImage: `url(${url})` }}>
      <nav className={styles.navbar}>
        <ul className={styles.navbarList}>
          <li>
            <button onClick={() => router.push('/')}>Home</button>
          </li>
          <li>
            <button onClick={() => router.push('/login')}>Login</button>
          </li>
          <li>
            <button onClick={() => router.push('/signup')}>Signup</button>
          </li>
        </ul>
      </nav>
      <div className={styles.loginBox}>
        <h1 className={styles.h1}>Login</h1>
        <form onSubmit={handleLogin} className={styles.form}>
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
        {loading && <div className={styles.loader}>Loading...</div>}
      </div>
    </div>
  );
};

export default LoginPage;

