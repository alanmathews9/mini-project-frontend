import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import React,{useEffect} from 'react';
export default function Home() {
  const router = useRouter();

  // Redirect to the home page when accessing /home
  useEffect(() => {
    router.replace('/home');
  }, []);

  return (
    <>
    </>
  );
}
