import React from 'react';
import styles from './signup.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
const SignupPage = () => {
  const router = useRouter();
  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      setloading(true)
      const response = await axios.post('http://localhost:8000/register_user/', {
        name: name,
        email_id: email,
        password: password,
      });
      if(response.data.status==="success"){
        router.push('/login');
      }
    } catch (error) {
      console.error(error);
    }finally{
      setloading(false)
    }
  };

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading,setloading]=React.useState(false);
  const url = "https://t4.ftcdn.net/jpg/04/60/71/01/360_F_460710131_YkD6NsivdyYsHupNvO3Y8MPEwxTAhORh.jpg";

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
      <div className={styles.signupBox}>
        <h1 className={styles.h1}>Signup</h1>
        <form onSubmit={handleSignup} className={styles.form}>
          <input type="text" placeholder="Name" required onChange={(e) => setName(e.target.value)} className={styles.input} />
          <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} className={styles.input} />
          <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} className={styles.input} />
          <button type="submit" className={styles.button}>Signup</button>
        </form>
        {loading && <div className={styles.loader}>Loading...</div>}
      </div>
    </div>
  );
};

export default SignupPage;