import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './HomePage.module.css';

const HomePage = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('email_id');
    }
    router.push('/');
  };

  useEffect(() => {
    const emailId = localStorage.getItem('email_id');
    setIsLoggedIn(emailId !== null);
  }, []);
  const url="https://img.freepik.com/premium-photo/encephalography-brain-paper-cutout-purple-background-epilepsy-alzheimer-awareness-seizure-disorder-mental-health-concept_49149-1256.jpg"
  return (
    <div className={styles.container} style={{backgroundImage:`url(${url})`}}>
      <nav className={styles.navbar}>
        <ul className={styles.navbarList}>
          <li>
            <button onClick={() => router.push('/')}>Home</button>
          </li>
          <li>
            <button onClick={() => router.push('/chat')}>Chat</button>
          </li>
          {isLoggedIn ? (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <>
              <li>
                <button onClick={() => router.push('/login')}>Login</button>
              </li>
              <li>
                <button onClick={() => router.push('/signup')}>Signup</button>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className={styles.content}>
        <h1 className={styles.heading}>Mental Health AI Assistant</h1>
        <p className={styles.slogan}>Your Companion for Mental Well-being</p>
      </div>
    </div>
  );
};

export default HomePage;
